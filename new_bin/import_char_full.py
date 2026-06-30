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
from static import WEAPON_TYPES

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
    'Regeneration': 'heal_dot',
    'Shield Duration': 'shield_duration',
    'HP Cost': 'hp_cost',
    'Shield DMG Absorption': 'shield_absorption',
    'Max CD': 'max_cd',
    'Explosion DMG': 'explosion_dmg',
    'Stamina Drain': 'sprint_stamina_drain',
    'DoT': 'dot_dmg',

    'Spiritbreath Thorn DMG': 'spiritbreath_thorn_dmg',
    'Surging Blade DMG': 'surging_blade_dmg',
    'Surging Blade Interval': 'surging_blade_interval',
    'Spiritbreath Thorn Interval': 'spiritbreath_thorn_interval',

    'Nightsoul Point Limit': 'nightsoul_point_limit',
}

skiped_features = set([
    'cd', 'cd_hold', 'max_cd', 'cd_press', 'energy_cost', 'surging_blade_interval',
    'spiritbreath_thorn_interval', 'hp_cost', 'stamina_cost', 'max_duration',
    'shield_duration', 'duration'
])

def shrink_table(data):
    last = None
    for index in reversed(range(len(data))):
        val = data[index]

        if last is None:
            last = val
            continue

        if val == last:
            data.pop()
            continue

        break

    return data

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
    # name = names_mapping.get(name, name)
    return name

def make_tables(data, generate):
    params = {}
    processed = {}
    levels = data['levels'].keys()
    for index in range(0, len(data['levels'][1])):
        params[index+1] = []

        for level in levels:
            params[index+1].append(data['levels'][level][index])

    idx = 0
    for desc in data['desc']:
        if not desc:
            continue
        idx+=1
        (name, params_str) = desc.split('|')
        params_indices = re.findall(r'param(\d+):(\w+)\b', params_str)
        name = fix_name(name)

        for (ind, fmt) in params_indices:
            ind = int(ind)

            if ind in processed:
                continue
            processed[ind] = 1

            out.write('\t\t\t// ' + name + '\n\t\t\t')
            out.write('p%d: [%s],\n' % (ind, ', '.join(
                format_table(params.get(ind, []), fmt)
            )))
            if generate:
                print("            {")
                print(f"                table: new StatTable('{generate['param_name'][idx - 1]}', charTalentTables.{generate['name']}.s{generate['id']}.p{ind}),")
                print("            },")
            del params[ind]

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
                for desc in item['paramDescList']:
                    text = lang_default.get(desc)
                    scaleData['desc'].append(text)
                    if text:
                        (name, params_str) = text.split('|')
                        name_idx=''
                        name = fix_name(name)
                        if not name in names_mapping.keys():
                            name = convert_id(name, True)
                            idx = 0
                            name_idx = name
                            while name_idx in scaleData['customParams']:
                                idx += 1
                                name_idx = f'{name}_{idx}'
                            scaleData['customParams'][name_idx] = desc
                        if generate:
                            if name_idx:
                                scaleData['allParams'].append(f"{generate['local']}_{name_idx}")
                            else:
                                scaleData['allParams'].append(names_mapping[name])
# feature_skill;layout_mobile_tap_layout_pc_press_layout_ps_press_cd;Откат быстрого нажатия;#{LAYOUT_MOBILE#Tap}{LAYOUT_PC#Press}{LAYOUT_PS#Press} CD

            for scale in item['paramList']:
                if skillLevel not in scaleData['levels']:
                    scaleData['levels'][skillLevel] = []
                scaleData['levels'][skillLevel].append(scale)

        out.write(f'\t\ts{index}_id: {skillId},\n')
        out.write("\t\ts" + str(index) + ": {\n")
        if generate:
            generate["param_name"] = scaleData['allParams']
        make_tables(scaleData, generate)
        out.write("\t\t},\n")
    elif generate_char == '':
        print(f'skiped: proudId {proudId} skillId {skillId}')

    return scaleData

out_dir = os.path.join(dirname, '../src/js/db/generated/')
out = open(out_dir + 'CharTalentTables.js', 'w', encoding='utf-8')
out.write('// This file is autogenerated\n')
out.write('export const charTalentTables = {\n')

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
            print("                }),")
            print("            ],")
            print("        },")

        if uniq_skills.get(talent_id):
            continue
        uniq_skills[talent_id] = 1

        descItems = {}
        nameItems = {}

        for lang_name in lang_data:
            lang = lang_data[lang_name]['lang']
            skill_name = lang.get(talent['nameTextMapHash'])
            nameItems[lang_name] = [skill_name]

            #if not tpl_char: texts[eng_name].append(skill_name)
            texts[eng_name].append(skill_name)

            if talent['descTextMapHash']:
                skill_descr = lang.get(talent['descTextMapHash'])
                locallinks.update(collect_links(skill_descr))
                #if not tpl_char: texts[eng_name].append(skill_descr)
                texts[eng_name].append(skill_descr)

                tpl_names = lang_data[lang_name]['names']
                tpl_keywords = lang_data[lang_name]['keywords']
                tpl_talents = lang_data[lang_name]['talents']

                # skill_name = re.sub(r'^.*?:\s*', '', skill_name)
                # if char_id=="flins": print(skill_descr, '\n-----------------\n')
                skill_descr = tpl_talents.process(skill_descr)['descr'][0]
                # if char_id=="flins": print(skill_descr, '\n-----------------\n')
                skill_descr = tpl_keywords.process(skill_descr)['descr'][0]
                # if char_id=="flins": print(skill_descr, '\n-----------------\n')
                skill_descr = tpl_names. process(skill_descr)['descr'][0]
                # if char_id=="flins": print(skill_descr, '\n-----------------\n')
                if tpl_char:
                    skill_descr = tpl_char.process(lang_name, talent_short_id, skill_descr)
                # if char_id=="flins": print(skill_descr, '\n-----------------\n')

                if isinstance(skill_descr, str):
                    skill_descr = {'descr': [skill_descr], 'names': []}

                descItems[lang_name] = skill_descr['descr']
                nameItems[lang_name].extend(skill_descr['names'])
            #if not tpl_char: texts[eng_name].append('\n')
            texts[eng_name].append('\n')

        add_array(nameItems, result_hero_strings, talent_id, 'talent_name')

        if descItems and not talent.get('no_descr'):
            add_array(descItems, result_hero_strings, talent_id, 'talent_descr')


hyperlinks = set()
if generate_char != '':
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

    out.write("\t" + charVarName + ': {\n')
    out.write(f"\t\tchar_id:'{char['id']}',\n")
    out.write(f"\t\tchar_weapon:'{char['weaponType']}',\n")

    locallinks = set()
    for depot_id in char['depot_ids']:
        depot = depot_data.get(depot_id)
        if not depot:
            continue
        skill_ids = []
        burst_id = 0
        attack_id = 0
        if depot.get('skills'):
            attack_id = depot.get('skills')[0]
            for idx in depot.get('skills'):
                if idx:
                    skill_ids.append(idx)
        if depot.get('energySkill'):
            burst_id = depot.get('energySkill')
            skill_ids.append(burst_id)

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
                if attack_id == id:
                    print("    attack: {")
                    print(f"        gameId: charTalentTables.{charVarName}.s1_id,")
                elif burst_id == id:
                    print("    burst: {")
                    print(f"        gameId: charTalentTables.{charVarName}.s3_id,")
                else:
                    print("    skill: {")
                    print(f"        gameId: charTalentTables.{charVarName}.s2_id,")
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

            proud_params = scales_and_proud(id, skill.get('proudSkillGroupId'), index, generate_params)
            if generate_char == char_id:
                print("        ],")
                print("    },")
                features.append({
                    'type': 'feature_burst' if id==burst_id else 'feature_attack' if id==attack_id else 'feature_skill',
                    'skills': proud_params['allParams']
                })
            if proud_params['desc']:
                index+= 1

            descItems = {}
            nameItems = {}
            for lang_name in lang_data:
                lang = lang_data[lang_name]['lang']
                skill_name = lang.get(skill['nameTextMapHash'])
                skill_descr = lang.get(skill['descTextMapHash'])

                locallinks.update(collect_links(skill_descr))

                tpl_names = lang_data[lang_name]['names']
                tpl_keywords = lang_data[lang_name]['keywords']
                tpl_patterns = lang_data[lang_name]['patterns']

                skill_name = re.sub(r'^Normal Attack:\s*', '', skill_name)
                # print('default:--------------------------')
                # print(skill_descr)
                skill_descr = tpl_patterns.process(skill_descr)['descr'][0]
                # skill_descr = tpl_keywords.process(skill_descr)
                # print('patterns:--------------------------')
                # print(skill_descr)
                skill_descr = tpl_names.process(skill_descr)['descr'][0]
                # print('names:--------------------------')
                # print(skill_descr)
                if tpl_char:
                    skill_descr = tpl_char.process(lang_name, talent_short_id, skill_descr)
                    # print('char:--------------------------')
                    # print(skill_descr)

                if isinstance(skill_descr, str):
                    skill_descr = {'descr': [skill_descr], 'names': []}

                nameItems[lang_name] = [skill_name]
                descItems[lang_name] = skill_descr['descr']
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
                            category='feature_burst' if id==burst_id else 'feature_attack' if id==attack_id else 'feature_skill',
                            # name=param,
                            name=char_id + '_' + param,
                            rus=values['rus'],
                            eng=values['eng'],
                        )
                    )

            add_array(nameItems, result_hero_strings, skill_id, 'talent_name')
            add_array(descItems, result_hero_strings, skill_id, 'talent_descr')

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
                for item in elem['skills']:
                    if item in skiped_features: continue
                    if elem['type'] == 'feature_attack':
                        print("        new FeatureDamageNormal({")
                    elif elem['type'] == 'feature_skill':
                        print("        new FeatureDamageSkill({")
                    else:
                        print("        new FeatureDamageBurst({")
                    print(f"            name: '{item}',")
                    print("            multipliers: [")
                    print("                new FeatureMultiplier({")
                    if elem['type'] == 'feature_attack':
                        print("                    leveling: 'char_skill_attack',")
                        print(f"                    values: Talents.get('attack.{item}'),")
                    elif elem['type'] == 'feature_skill':
                        print("                    leveling: 'char_skill_elemental',")
                        print(f"                    values: Talents.get('skill.{item}'),")
                    else:
                        print("                    leveling: 'char_skill_burst',")
                        print(f"                    values: Talents.get('burst.{item}'),")
                    print("                }),")
                    print("            ],")
                    print("        }),")
            print("    ],")
            print("    conditions: [")

        talent_items = []
        const_num = 0

        out.write('\t\tcons: [\n')
        for const_id in depot.get('talents'):
            const_num += 1
            talent = talent_data.get(const_id)
            if not talent:
                continue
            talent_items.append({
                'nameTextMapHash': talent.get('nameTextMapHash'),
                'descTextMapHash': talent.get('descTextMapHash'),
                'no_descr': const_num == 3 or const_num == 5,
            })
            out.write('\t\t\t')
            out.write(repr(shrink_table(talent.get('paramList'))))
            out.write(',\n')
        out.write('\t\t],\n')

        out.write('\t\tpasssive: [\n')
        passive_count = 0
        for passive in depot.get('inherentProudSkillOpens', []):
            if (passive.get('needAvatarPromoteLevel') > 0 or char_id in NEED_PASSIVE_TALENTS) and passive.get('proudSkillGroupId') > 0:
                passive_count += 1
                passive_id = passive.get('proudSkillGroupId')
                proud = proud_data.get_item_by_field('proudSkillGroupId', passive_id)
                out.write('\t\t\t')
                out.write(repr(shrink_table(proud.get('paramList'))))
                out.write(',\n')
                talent_items.append({
                    'nameTextMapHash': proud.get('nameTextMapHash'),
                    'descTextMapHash': proud.get('descTextMapHash'),
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
                    if passive.get('needAvatarPromoteLevel') > 0:
                        print(f"            info: {{ascension: {passive.get('needAvatarPromoteLevel')}}},")
                        print(f"            condition: new ConditionAscensionChar({{ascension: {passive.get('needAvatarPromoteLevel')}}}),")
                    print("        }),")
            else: break
        out.write('\t\t],\n')

        if generate_char == char_id:
            print("    ],")
            print("    multipliers: [")
            print("    ],")
            print("    constellation: new DbObjectConstellation([")

        prepare_talents(talent_items[-passive_count:], False)
        prepare_talents(talent_items[0:-passive_count], generate_char == char_id)
    CsvDumper().dump(result_hero_strings, f'char/{char_key}.csv')
    hyperlinks.update(locallinks)
    out.write('\t\tlinks: [%s],\n' % (', '.join(locallinks)))
    out.write('\t},\n')

if generate_char != '':
    print("    ]),")
    print("});")

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
# CsvDumper().dump(result_names, '../../strings_casino/char_names.csv')
# CsvDumper().dump(result_names, '../../strings_draft/char_names.csv')
TextDumper().dump(texts, 'chat_texts.txt')

out.write('};\n')

if generate_char == '':
    print("--- %s ms ---" % (int((time.time() - start_time) * 1000)))
