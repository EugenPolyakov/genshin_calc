import sys
import os
dirname = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, dirname)
import time
start_time = time.time()

import re
from collections import OrderedDict

from lib.genshin.datafiles.char import CharData, CharProudSkillData, CharSkillData, CharSkillDepotData, SKIP_CHARACTERS, CharTalentSkillData
from lib.genshin.datafiles.hyperlinks import HyperLinkData
from lib.genshin.datafiles.lang import LangData
from lib.genshin.strings.templates.names import keywords_eng, keywords_rus, names_eng, names_rus, patterns_eng
from lib.genshin.strings.templates import talents
from lib.genshin.utils import convert_id, add_array
from lib.genshin.strings.csv import CsvDumper
from lib.genshin.strings.text import TextDumper  # noqa
import static
from static import WEAPON_TYPES, shrink_table
from old_values import old_values

generate_char = ''
do_single = False
if len(sys.argv) > 1:
    for arg in sys.argv[1:3]:
        if arg == '-single':
            do_single = True
        else:
            generate_char = arg

if do_single and not generate_char:
    print('error')
    sys.exit()

char_data = CharData()
depot_data = CharSkillDepotData()
char_skill_data = CharSkillData()
talent_data = CharTalentSkillData()
proud_data = CharProudSkillData()
hyperlink_data = HyperLinkData()

lang_data = {
    'rus': {
        'lang': LangData('RU'),
        'patterns': patterns_eng,
        'names': names_rus,
        'talents': talents.templates,
        'keywords': keywords_rus,
    },
    'eng': {
        'lang': LangData('EN'),
        'patterns': patterns_eng,
        'names': names_eng,
        'talents': talents.templates,
        'keywords': keywords_eng,
    },
}

lang_default = lang_data['eng']['lang']

char_keys = {}
uniq_skills = {}
texts = {}

traveler_depot_ids = {
    702: 'pyro',
    703: 'hydro',
    704: 'anemo',
    # 705: 'cryo',
    706: 'geo',
    707: 'electro',
    708: 'dendro',
}

NEED_PASSIVE_TALENTS = [
    'tartaglia',
    'skirk',
    'ineffa',
    'aino',
    'flins',
    'lauma',
    'nefer'
]
names_mapping = {
    '1-Hit DMG': 'normal_hit_1',
    '2-Hit DMG': 'normal_hit_2',
    '3-Hit DMG': 'normal_hit_3',
    '4-Hit DMG': 'normal_hit_4',
    '5-Hit DMG': 'normal_hit_5',
    '6-Hit DMG': 'normal_hit_6',
    'Aimed Shot': 'aimed',
    'Fully-Charged Aimed Shot': 'charged_aimed',
    'Aimed Shot Charge Level 1': 'charged_aimed',
    'Plunge DMG': 'plunge',
    'Low/High Plunge DMG': 'plunge_low/plunge_high',
    'Charged Attack': 'charged_hit',
    'Charged Attack DMG': 'charged_hit',
    'Charged Attack Stamina Cost': 'stamina_cost',
    'Charged Attack Spinning DMG': 'charged_spin',
    'Charged Attack Cyclic DMG': 'charged_spin',
    'Charged Attack Loop DMG': 'charged_spin',
    'Charged Attack Final DMG': 'charged_final',
    'Max Duration': 'max_duration',
    'CD': 'cd',
    'Skill CD': 'cd',
    'Duration': 'duration',
    'Energy Cost': 'energy_cost',
    'Elemental Burst DMG': 'burst_dmg',
    'Burst DMG': 'burst_dmg',
    'Skill DMG': 'skill_dmg',
    'Press CD': 'cd_press',
    'Press DMG': 'press_dmg',
    'Press Skill DMG': 'press_dmg',
    'Hold CD': 'cd_hold',
    'Hold DMG': 'hold_dmg',
    'Hold Skill DMG': 'hold_dmg',
    'Heal': 'heal',
    'Healing': 'heal',
    'Cast Healing': 'heal',
    'Regeneration': 'heal_dot',
    'Continuous Healing': 'heal_dot',
    'Continuous Regeneration': 'heal_dot',
    'Shield Duration': 'shield_duration',
    'HP Cost': 'hp_cost',
    'Shield DMG Absorption': 'shield_absorption',
    'Max CD': 'max_cd',
    'Explosion DMG': 'explosion_dmg',
    'Activation Stamina Consumption': 'sprint_activation_cost',
    'Stamina Drain': 'sprint_stamina_drain',
    'DoT': 'dot_dmg',
    'DMG Reduction': 'dmg_reduction',

    'Spiritbreath Thorn DMG': 'spiritbreath_thorn_dmg',
    'Surging Blade DMG': 'surging_blade_dmg',
    'Surging Blade Interval': 'surging_blade_interval',
    'Spiritbreath Thorn Interval': 'spiritbreath_thorn_interval',
    'Spiritbreath Thorn DMG Interval': 'spiritbreath_thorn_interval',

    'Nightsoul Point Limit': 'nightsoul_point_limit',

# skiped
    'Spiritbreath Thorn/Surging Blade DMG Interval': 'spiritbreath_thorn_surging_blade_dmg',
    'Spiritbreath Thorn/Surging Blade DMG': 'spiritbreath_thorn_surging_blade_dmg_interval',
    'Fiery Passion Low/High Plunge DMG': 'fiery_passion_low_high_plunge_dmg',
    '0/1/2/3 Void Rift Absorption DMG Bonus': '0_1_2_3_void_rift_absorption_dmg_bonus',
}

skiped_features = set([
    'cd', 'cd_hold', 'max_cd', 'cd_press', 'energy_cost', 'surging_blade_interval',
    'spiritbreath_thorn_interval', 'hp_cost', 'stamina_cost', 'max_duration',
    'shield_duration', 'duration', 'spiritbreath_thorn_surging_blade_dmg_interval',
    'spiritbreath_thorn_surging_blade_dmg', 'fiery_passion_low_high_plunge_dmg',
    '0_1_2_3_void_rift_absorption_dmg_bonus',
])

def outwrite(s):
    if not do_single:
        out.write(s)

def format_table(data, fmt):
    isPercent = fmt.find('P') >= 0

    def foramt_value(val):
        if isPercent:
            val *= 100
        return static.trimValue(val)

    # data = list(map(foramt_value, data))
    data = [foramt_value(x) for x in data]

    return shrink_table(data)

def fix_name(name):
    name = re.sub(r'\#?{LAYOUT_PC#(.*?)\}', '\g<1>', name)
    name = re.sub(r'\#?{.*?}', '', name)
    return name

def make_tables(data, generate):
    params = {}
    processed = {}
    elements = []
    levels = data['levels'].keys()
    for index in range(0, len(data['levels'][1])):
        params[index+1] = []

        for level in levels:
            params[index+1].append(data['levels'][level][index])

    idx = 0
    for desc in data['desc']:
        if not desc:
            continue
        (name, params_str) = desc.split('|')
        params_indices = re.findall(r'param(\d+):(\w+)\b', params_str)
        name = fix_name(name)
        if generate:
            tmp = generate['param_name'][idx]
            lst = tmp.split('/')
            if len(lst) == len(params_indices):
                for (localIdx, (ind, fmt)) in enumerate(params_indices):
                    elements.append((lst[localIdx], 1))
            else:
                elements.append((tmp, len(params_indices)))
                print("            {")
                print("                type: 'hits',")
                print(f"                name: '{tmp}',")
                print("                table: [")

        for (localIdx, (ind, fmt)) in enumerate(params_indices):
            ind = int(ind)
            if generate:
                if len(lst) == len(params_indices):
                    print("            {")
                    print(f"                table: new StatTable('{lst[localIdx]}', charTalentTables.{generate['name']}.s{generate['id']}.p{ind}),")
                    print("            },")
                else:
                    print(f"                    new StatTable('{tmp}_{localIdx+1}', charTalentTables.{generate['name']}.s{generate['id']}.p{ind}),")

            if ind in processed:
                continue
            processed[ind] = 1

            outwrite('\t\t\t// ' + name + '\n\t\t\t')
            outwrite('p%d: [%s],\n' % (ind, ', '.join(
                format_table(params.get(ind, []), fmt)
            )))
            del params[ind]

        if generate:
            if len(lst) != len(params_indices):
                print("                ],")
                print("            },")

        idx+=1
    return elements if elements else None

def collect_links(txt):
    return re.findall(r'{LINK#N(\d+)}', txt)

for char in char_data.get_list():
    if char['id'] in SKIP_CHARACTERS:
        continue

    char_name = lang_default.get(char['nameTextMapHash'])
    char_id = convert_id(char_name)

    if do_single and char_id != generate_char: continue

    # print([char_id, char['id']])

    depot_ids = char.get('candSkillDepotIds', [])

    if depot_ids:
        for depot_id in depot_ids:
            if depot_id not in traveler_depot_ids.keys():
                continue
            traveler_id = f'{char_id}_{traveler_depot_ids[depot_id]}'
            key = static.getCharById(depot_id, char_name)
            # print(depot_id)
            # print(key)
            # print(char['id'])
            # print(traveler_id)
            char_keys[key] = {
                'char_id': char_id,
                'char_key': traveler_id,
                'id': char['id'],
                'weaponType': WEAPON_TYPES[char['weaponType']],
                'nameTextMapHash': char['nameTextMapHash'],
                'depot_ids': [depot_id],
            }
    else:
        key = static.getCharById(char['id'], char_name)

        char_keys[key] = {
            'char_id': char_id,
            'char_key': char_id,
            'id': char['id'],
            'weaponType': WEAPON_TYPES[char['weaponType']],
            'nameTextMapHash': char['nameTextMapHash'],
            'depot_ids': [char['skillDepotId']],
        }

def scales_and_proud(skillId, proudId, index, generate):
    scaleData = {
        'levels': {},
        'desc': [],
        'customParams': {},
        'allParams': [],
    }
    allLevels = proud_data.get_list_by_field('proudSkillGroupId', proudId)
    if allLevels:
        for item in allLevels:
            skillLevel = item['level']

            if skillLevel == 1:
                if not do_single:
                    updated_values.write(f'    ({skillId}, {proudId}): {{\n')
                for desc in item['paramDescList']:
                    text = lang_default.get(desc)
                    scaleData['desc'].append(text)
                    if text:
                        (name, params_str) = text.split('|')
                        name_idx=''
                        name = fix_name(name)
                        if not name in names_mapping.keys():
                            if (skillId, proudId) in old_values and desc in old_values[(skillId, proudId)]:
                                name_idx = old_values[(skillId, proudId)][desc]
                            else:
                                name = convert_id(name, True)
                                idx = 0
                                name_idx = name
                                while name_idx in scaleData['customParams']:
                                    idx += 1
                                    name_idx = f'{name}_{idx}'
                            scaleData['customParams'][name_idx] = desc
                            if not do_single:
                                updated_values.write(f'        {desc}: "{name_idx}",\n')
                        else:
                            if not do_single:
                                updated_values.write(f'        {desc}: "{names_mapping[name]}",\n')
                        if generate:
                            if name_idx:
                                scaleData['allParams'].append(f"{generate['local']}_{name_idx}")
                            else:
                                scaleData['allParams'].append(names_mapping[name])
                if not do_single:
                    updated_values.write(f'    }},\n')
# feature_skill;layout_mobile_tap_layout_pc_press_layout_ps_press_cd;Откат быстрого нажатия;#{LAYOUT_MOBILE#Tap}{LAYOUT_PC#Press}{LAYOUT_PS#Press} CD

            for scale in item['paramList']:
                if skillLevel not in scaleData['levels']:
                    scaleData['levels'][skillLevel] = []
                scaleData['levels'][skillLevel].append(scale)

        outwrite(f'\t\ts{index}_id: {skillId},\n')
        outwrite("\t\ts" + str(index) + ": {\n")
        if generate:
            generate["param_name"] = scaleData['allParams']
        scaleData['allParams'] = make_tables(scaleData, generate)
        outwrite("\t\t},\n")
    elif generate:
        print(f'skiped: proudId {proudId} skillId {skillId}')

    return scaleData

out_dir = os.path.join(dirname, '../src/js/db/generated/')
if not do_single:
    updated_values = open(dirname + '/new_values.py', 'w', encoding='utf-8')
    updated_values.write('old_values = {\n')


if not do_single:
    out = open(out_dir + 'CharTalentTables.js', 'w', encoding='utf-8')
outwrite('// This file is autogenerated\n')
outwrite('export const charTalentTables = {\n')

def prepare_talents(talent_items, generate):
    for talent in talent_items:
        talent_name = lang_default.get(talent['nameTextMapHash'])
        if not talent_name:
            continue
        talent_short_id = convert_id(talent_name, removeSemicolon=True)
        talent_id = char_id + '_' + talent_short_id

        if generate:
            print("        {")
            print("            conditions: [")
            if talent.get('no_descr'):
                print("                new Condition({")
                print("                    settings: {")
                print("                        char_skill_burst_bonus: 3, char_skill_elemental_bonus: 3,")
                print("                    },")
            else:
                print("                new ConditionStatic({")
                print(f"                    name: '{talent_id}',")
                print(f"                    title: 'talent_name.{talent_id}',")
                print(f"                    description: 'talent_descr.{talent_id}',")
            if talent['descTextMapHash_hex'] and lang_default.get(talent['descTextMapHash_hex']):
                print(f"                    condition: new ConditionBoolean({{ name: 'char_hex_{generate}', invert: 1}}),")
                print("                }),")
                if talent.get('no_descr'):
                    print("                new Condition({")
                    print("                    settings: {")
                    print("                        char_skill_burst_bonus: 3, char_skill_elemental_bonus: 3,")
                    print("                    },")
                else:
                    print("                new ConditionStatic({")
                    print(f"                    name: '{talent_id}',")
                    print(f"                    title: 'talent_name.{talent_id}',")
                    print(f"                    description: 'talent_descr.{talent_id}_hex',")
                print(f"                    condition: new ConditionBoolean({{ name: 'char_hex_{generate}'}}),")
            print("                }),")
            print("            ],")
            print("        },")

        if uniq_skills.get(talent_id):
            continue
        uniq_skills[talent_id] = 1
        
        descItems = {}
        descItems_hex = {}
        nameItems = {}

        for lang_name in lang_data:
            lang = lang_data[lang_name]['lang']
            skill_name = lang.get(talent['nameTextMapHash'])
            nameItems[lang_name] = [skill_name]
            tpl_keywords = lang_data[lang_name]['keywords']
            #if not tpl_char: texts[eng_name].append(skill_name)
            texts[eng_name].append(skill_name)
            tpl_talents = lang_data[lang_name]['talents']

            if talent['descTextMapHash']:
                texts[eng_name].append(lang.get(talent['descTextMapHash']))
                skill_descr = process_talent_desc(lang_name, lang.get(talent['descTextMapHash']), talent_short_id, tpl_talents, None, tpl_keywords)
                descItems[lang_name] = skill_descr['descr']
                nameItems[lang_name].extend(skill_descr['names'])

            if talent['descTextMapHash_hex'] and lang.get(talent['descTextMapHash_hex']):
                texts[eng_name].append(lang.get(talent['descTextMapHash_hex']))
                skill_descr = process_talent_desc(lang_name, lang.get(talent['descTextMapHash_hex']), talent_short_id, tpl_talents, talent_short_id + '_hex', tpl_keywords)
                descItems_hex[lang_name] = skill_descr['descr']
                nameItems[lang_name].extend(skill_descr['names'])
            #if not tpl_char: texts[eng_name].append('\n')
            texts[eng_name].append('\n')

        add_array(nameItems, result_hero_strings, talent_id, 'talent_name')

        if not talent.get('no_descr'):
            if descItems:
                add_array(descItems, result_hero_strings, talent_id, 'talent_descr')
            if descItems_hex:
                add_array(descItems_hex, result_hero_strings, talent_id + '_hex', 'talent_descr')


def print_skillmult(elem, name, vals, isChild):
    if vals > 1:
        print("        new FeatureDamageMultihit({")
        print(f"            category: '{elem}',")
        print(f"            damageType: '{'normal' if elem == 'attack' else elem}',")
        print(f"            name: '{name}',")
        print('            items: [');
        for idx in range(1, vals + 1):
            print('                {');
            print("                    multipliers: [")
            print("                        new FeatureMultiplier({")
            print(f"                            leveling: 'char_skill_{'elemental' if elem == 'skill' else elem}',")
            print(f"                            values: Talents.get('{elem}.{name}_{idx}'),")
            print("                        }),")
            print("                    ],")
            print('                },')
        print("            ],")
        print("        }),")
        for idx in range(1, vals + 1):
            print_skillmult(elem, f'{name}_{idx}', 1, True)
    else:
        if elem == 'attack':
            print("        new FeatureDamageNormal({")
        elif elem == 'skill':
            print("        new FeatureDamageSkill({")
        else:
            print("        new FeatureDamageBurst({")
        if isChild:
            print('            isChild: true,')
        print("            multipliers: [")
        print("                new FeatureMultiplier({")
        print(f"                    leveling: 'char_skill_{'elemental' if elem == 'skill' else elem}',")
        print(f"                    values: Talents.get('{elem}.{name}'),")
        print("                }),")
        print("            ],")
        print("        }),")

def process_talent_desc(lang_name, skill_descr, talent_short_id, tpl_patterns, talent_hex = None, tpl_keywords = None):
    locallinks.update(collect_links(skill_descr))

    tpl_names = lang_data[lang_name]['names']

    # print('default:--------------------------')
    # print(skill_descr)
    skill_descr = tpl_patterns.process(skill_descr)['descr'][0]
    if tpl_keywords:
        skill_descr = tpl_keywords.process(skill_descr)['descr'][0]
    # print('patterns:--------------------------')
    # print(skill_descr)
    skill_descr = tpl_names.process(skill_descr)['descr'][0]
    # print('names:--------------------------')
    # print(skill_descr)
    if tpl_char:
        if talent_hex: # and tpl_char.find(lang_name, talent_hex):
            skill_descr = tpl_char.process(lang_name, talent_hex, skill_descr)
        else:
            skill_descr = tpl_char.process(lang_name, talent_short_id, skill_descr)
        # print('char:--------------------------')
        # print(skill_descr)

    if isinstance(skill_descr, str):
        skill_descr = {'descr': [skill_descr], 'names': []}
    return skill_descr

hyperlinks = set()
if generate_char != '':
    print('import { Condition } from "../../classes/Condition";')
    print('import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";')
    print('import { ConditionStatic } from "../../classes/Condition/Static";')
    print('import { DbObjectChar } from "../../classes/DbObject/Char";')
    print('import { DbObjectConstellation } from "../../classes/DbObject/Constellation";')
    print('import { DbObjectTalents } from "../../classes/DbObject/Talents";')
    print('import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";')
    print('import { FeatureDamageMultihit } from "../../classes/Feature2/Damage/Multihit";')
    print('import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";')
    print('import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";')
    print('import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";')
    print('import { StatTable } from "../../classes/StatTable";')
    print('import { charTables } from "../generated/CharTables";')
    print('import { charTalentTables } from "../generated/CharTalentTables";')
    print()
    print("const Talents = new DbObjectTalents({")
for charVarName in sorted(char_keys):
    result_hero_strings = []
    char = char_keys[charVarName]
    char_id = char['char_id']
    char_key = char['char_key']
    eng_name = lang_data['eng']['lang'].get(char['nameTextMapHash'])

    res_item = OrderedDict(
        category='char_name',
        name=char_id,
    )
    for lang_name in lang_data:
        lang = lang_data[lang_name]['lang']
        res_item[lang_name] = lang.get(char['nameTextMapHash'])

    result_hero_strings.append(res_item)

    tpl_char = getattr(talents, f'char_{char_key}', None)
    # if not tpl_char:
    #     continue

    #if not tpl_char: texts[eng_name] = []
    texts[eng_name] = []

    outwrite("\t" + charVarName + ': {\n')
    outwrite(f"\t\tchar_id:'{char['id']}',\n")
    outwrite(f"\t\tchar_weapon:'{char['weaponType']}',\n")

    locallinks = set()
    if not do_single:
        updated_values.write(f'#{char_id}\n')
    for depot_id in char['depot_ids']:
        depot = depot_data.get(depot_id)
        if not depot:
            continue
        skill_ids = []
        skill_type = {}
        if depot.get('skills'):
            skill_type[depot.get('skills')[0]] = 'feature_attack'
            skill_type[depot.get('skills')[1]] = 'feature_skill'
            for idx in depot.get('skills'):
                if idx:
                    skill_ids.append(idx)
        if depot.get('energySkill'):
            skill_type[depot.get('energySkill')] = 'feature_burst'
            skill_ids.append(depot.get('energySkill'))

        # if depot.get('SubSkills'):
        #     skill_ids.extend(depot.get('SubSkills'))
        index = 1
        features = []
        for id in skill_ids:
            # print(f'index {index} id {id}')
            if not id:
                continue
            skill = char_skill_data.get(id)
            if not skill:
                continue
            skill_name = lang_default.get(skill['nameTextMapHash'])
            if not skill_name:
                continue
            talent_short_id = convert_id(skill_name, removeSemicolon=True)
            skill_id = char_id + '_' + talent_short_id

            if uniq_skills.get(skill_id):
                continue
            if generate_char == char_id:
                print(f"    {(skill_type[id] if id in skill_type else 'feature_other')[8:]}: {{")
                print(f"        gameId: charTalentTables.{charVarName}.s{index}_id,")
            generate_params=None
            if generate_char == char_id:
                print(f"        title: 'talent_name.{skill_id}',")
                print(f"        description: 'talent_descr.{skill_id}',")
                print("        items: [")
                generate_params={
                    'name': charVarName,
                    'local': char_id,
                    'id': index,
                }
            uniq_skills[skill_id] = 1

            if not do_single:
                updated_values.write(f'    #{talent_short_id}\n')
            proud_params = scales_and_proud(id, skill.get('proudSkillGroupId'), index, generate_params)
            if generate_char == char_id:
                print("        ],")
                print("    },")
                features.append({
                    'type': skill_type[id] if id in skill_type else 'feature_other',
                    'skills': proud_params['allParams']
                })
            if proud_params['desc']:
                index+= 1
                
            descItems = {}
            descItems_hex = {}
            nameItems = {}
            for lang_name in lang_data:
                lang = lang_data[lang_name]['lang']
                skill_name = lang.get(skill['nameTextMapHash'])
                skill_name = re.sub(r'^Normal Attack:\s*', '', skill_name)
                nameItems[lang_name] = [skill_name]
                tpl_patterns = lang_data[lang_name]['patterns']
                skill_descr = process_talent_desc(lang_name, lang.get(skill['descTextMapHash']), talent_short_id, tpl_patterns)
                descItems[lang_name] = skill_descr['descr']
                nameItems[lang_name].extend(skill_descr['names'])
                if skill['IACNAENANDH'] and lang.get(skill['IACNAENANDH']):
                    skill_descr = process_talent_desc(lang_name, lang.get(skill['IACNAENANDH']), talent_short_id, tpl_patterns, talent_short_id + '_hex')
                    descItems_hex[lang_name] = skill_descr['descr']
                    nameItems[lang_name].extend(skill_descr['names'])

            if proud_params['customParams'].keys():
                for param in proud_params['customParams']:
                    values = {}
                    for lang_name in lang_data:
                        lang = lang_data[lang_name]['lang']
                        (name, params_str) = lang.get(proud_params['customParams'][param]).split('|')
                        values[lang_name] = fix_name(name)
                    result_hero_strings.append(
                        OrderedDict(
                            category=skill_type[id] if id in skill_type else 'feature_other',
                            # name=param,
                            name=char_id + '_' + param,
                            rus=values['rus'],
                            eng=values['eng'],
                        )
                    )

            add_array(nameItems, result_hero_strings, skill_id, 'talent_name')
            add_array(descItems, result_hero_strings, skill_id, 'talent_descr')
            if descItems_hex:
                add_array(descItems_hex, result_hero_strings, skill_id + '_hex', 'talent_descr')

        if generate_char == char_id:
            print(f"    links: charTalentTables.{charVarName}.links,")
            print("});")
            print()
            print(f"export const {charVarName} = new DbObjectChar({{")
            print(f"    name: '{char_id}',")
            print("    serializeId: ?,")
            print(f"    gameId: charTalentTables.{charVarName}.char_id,")
            print(f"    iconClass: 'char-icon-{char_id}',")
            print("    rarity: ?,")
            print("    element: ?,")
            print(f"    weapon: charTalentTables.{charVarName}.char_weapon,")
            print("    origin: ?,")
            print("    talents: Talents,")
            print(f"    statTable: charTables.{charVarName},")
            print("    features: [")
            for elem in features:
                for (item, vals) in elem['skills']:
                    if item in skiped_features: continue
                    print_skillmult(elem['type'][8:], item, vals, False)
            print("    ],")
            print("    conditions: [")

        talent_items = []
        const_num = 0

        outwrite('\t\tcons: [\n')
        for const_id in depot.get('talents'):
            const_num += 1
            talent = talent_data.get(const_id)
            if not talent:
                continue
            talent_items.append({
                'nameTextMapHash': talent.get('nameTextMapHash'),
                'descTextMapHash': talent.get('descTextMapHash'),
                'descTextMapHash_hex': talent.get('IACNAENANDH'),
                'no_descr': const_num == 3 or const_num == 5,
            })
            outwrite('\t\t\t')
            outwrite(repr(shrink_table(talent.get('paramList'))))
            outwrite(',\n')
        outwrite('\t\t],\n')

        outwrite('\t\tpasssive: [\n')
        passive_count = 0
        inherentProudSkillOpens = 'FECDDOLDHBL' # 'inherentProudSkillOpens'
        needAvatarPromoteLevel = 'LKJNHHPJKIA' #'needAvatarPromoteLevel'
        for passive in depot.get(inherentProudSkillOpens, []):
            if (passive.get(needAvatarPromoteLevel) > 0 or char_id in NEED_PASSIVE_TALENTS) and passive.get('proudSkillGroupId') > 0:
                passive_count += 1
                passive_id = passive.get('proudSkillGroupId')
                proud = proud_data.get_item_by_field('proudSkillGroupId', passive_id)
                outwrite('\t\t\t')
                outwrite(repr(shrink_table(proud.get('paramList'))))
                outwrite(',\n')
                talent_items.append({
                    'nameTextMapHash': proud.get('nameTextMapHash'),
                    'descTextMapHash': proud.get('descTextMapHash'),
                    'descTextMapHash_hex': proud.get('IACNAENANDH'),
                })
                if generate_char == char_id:
                    talent_name = lang_default.get(proud.get('nameTextMapHash'))
                    if not talent_name:
                        continue
                    talent_short_id = convert_id(talent_name, removeSemicolon=True)
                    talent_id = char_id + '_' + talent_short_id
                    print("        new ConditionStatic({")
                    print(f"            name: '{talent_id}',")
                    print("            serializeId: 1,")
                    print(f"            title: 'talent_name.{talent_id}',")
                    print(f"            description: 'talent_descr.{talent_id}',")
                    if passive.get(needAvatarPromoteLevel) > 0:
                        print(f"            info: {{ascension: {passive.get(needAvatarPromoteLevel)}}},")
                        print(f"            condition: new ConditionAscensionChar({{ascension: {passive.get(needAvatarPromoteLevel)}}}),")
                    print("        }),")
            else: break
        outwrite('\t\t],\n')

        if generate_char == char_id:
            print("    ],")
            print("    multipliers: [")
            print("    ],")
            print("    constellation: new DbObjectConstellation([")

        prepare_talents(talent_items[-passive_count:], None)
        prepare_talents(talent_items[0:-passive_count], char_id if generate_char == char_id else None)
    CsvDumper().dump(result_hero_strings, f'char/{char_key}.csv')
    hyperlinks.update(locallinks)
    outwrite('\t\tlinks: [%s],\n' % (', '.join(sorted(locallinks))))
    outwrite('\t},\n')

if generate_char != '':
    print("    ]),")
    print("});")

if not do_single:
    result_talents = []
    for hl_id in sorted(hyperlinks):
        hl_item = hyperlink_data.get(int(hl_id))
        skill_id = f'n{hl_id}'

        if hl_item:
            res_item1 = OrderedDict(
                category='talent_name',
                name=skill_id,
            )

            res_item2 = OrderedDict(
                category='talent_descr',
                name=skill_id,
            )

            for lang_name in lang_data:
                lang = lang_data[lang_name]['lang']
                skill_name = lang.get(hl_item['nameTextMapHash'])
                skill_descr = lang.get(hl_item['descTextMapHash'])

                tpl_patterns = lang_data[lang_name]['patterns']
                skill_descr = tpl_patterns.process(skill_descr)['descr'][0]

                res_item1[lang_name] = skill_name
                res_item2[lang_name] = skill_descr

            result_talents.append(res_item1)
            result_talents.append(res_item2)

    if len(result_talents) > 0:
        CsvDumper().dump(result_talents, 'char_skills.csv')

    TextDumper().dump(texts, 'chat_texts.txt')

    updated_values.write('}\n')

outwrite('};\n')

if generate_char == '':
    print("--- %s ms ---" % (int((time.time() - start_time) * 1000)))
