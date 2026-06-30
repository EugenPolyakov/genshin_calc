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
from lib.genshin.strings.templates.names import keywords_eng, keywords_rus, names_eng, names_rus, patterns_eng, postprocess
from lib.genshin.strings.templates import talents
from lib.genshin.strings.template import SentenceMismatch
from lib.genshin.utils import convert_id, add_array, to_float32
from lib.genshin.strings.csv import CsvDumper
from lib.genshin.strings.text import TextDumper  # noqa
from lib.genshin import char_generator
from lib.genshin.char_generator import CharGenerator, EmptyCharGenerator
from lib.genshin.char_talent_generator import StatGenerator
from lib import static
from lib.static import WEAPON_TYPES, shrink_table, names_mapping, fix_name, extractPramList, trimToVal, trimValue
from old_values import old_values
from lib.genshin.strings.templates import hyperlink
import logging

logger = logging.getLogger(__name__)

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

if generate_char:
    generator = CharGenerator(generate_char)
else:
    generator = EmptyCharGenerator()

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
    503: 'hydro',
    504: 'anemo',
    # 705: 'cryo',
    706: 'geo',
    707: 'electro',
    508: 'dendro',
}

NEED_PASSIVE_TALENTS = [
    'tartaglia',
    'skirk',
    'ineffa',
    'aino',
    'flins',
    'lauma',
    'nefer',
    'columbina',
    'illuga',
    'zibai',
    'linnea',
]

skiped_features = set([
    'cd', 'cd_hold', 'max_cd', 'cd_press', 'energy_cost', 'surging_blade_interval',
    'spiritbreath_thorn_interval', 'hp_cost', 'stamina_cost', 'max_duration',
    'shield_duration', 'duration', 'spiritbreath_thorn_surging_blade_dmg_interval',
    'spiritbreath_thorn_surging_blade_dmg', 'fiery_passion_low_high_plunge_dmg',
    '0_1_2_3_void_rift_absorption_dmg_bonus', 'shield_base_absorption',
    'additional_shield_absorption', 'stone_stele_resonance_dmg',
    'pyro_dmg_bonus', 'electro_trigger_interval_decrease', 'hydro_duration_extension',
    'sword_dance_whirling_steps_1_hit_dmg', 'sword_dance_whirling_steps_2_hit_dmg',
    'luminous_illusion_water_wheel_dmg', 'resolve_bonus'
])

def talenttable(s):
    if not do_single:
        talentfile.write(s)

def format_table(data, fmt):
    isPercent = fmt.find('P') >= 0

    def foramt_value(val):
        return static.trimValue(val, 100 if isPercent else None)

    # data = list(map(foramt_value, data))
    data = [foramt_value(x) for x in data]

    return shrink_table(data)

def make_tables(data):
    params = {}
    processed = {}
    elements = []
    levels = data['levels'].keys()
    for index in range(0, len(data['levels'][1])):
        params[index+1] = []

        for level in levels:
            params[index+1].append(data['levels'][level][index])

    for (desc, tmp) in data['desc']:
        if not desc:
            continue
        (name, params_str) = desc.split('|')
        params_indices = re.findall(r'param(\d+):(\w+)\b', params_str)
        name = fix_name(name)

        for (localIdx, (ind, fmt)) in enumerate(params_indices):
            ind = int(ind)
            if ind in processed:
                continue
            processed[ind] = 1

            talenttable('\t\t\t// ' + name + '\n\t\t\t')
            talenttable('p%d: [%s],\n' % (ind, ', '.join(
                format_table(params.get(ind, []), fmt)
            )))
            del params[ind]

        generator.add_param(tmp, params_indices)

    return

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
                'depot_id': depot_id,
            }
    else:
        key = static.getCharById(char['id'], char_name)

        char_keys[key] = {
            'char_id': char_id,
            'char_key': char_id,
            'id': char['id'],
            'weaponType': WEAPON_TYPES[char['weaponType']],
            'nameTextMapHash': char['nameTextMapHash'],
            'depot_id': char['skillDepotId'],
        }

def scales_and_proud(skillId, proudId, index, char_id):
    scaleData = {
        'levels': {},
        'desc': [],
        'customParams': {},
    }
    allLevels = proud_data.get_list_by_field('proudSkillGroupId', proudId)
    if allLevels:
        for item in allLevels:
            skillLevel = item['level']

            if skillLevel == 1:
                if not do_single:
                    updated_values.write(f'    ({skillId}, {proudId}): {{\n')
                for (cur_desc, desc) in enumerate(item['paramDescList']):
                    text = lang_default.get(desc)
                    if text:
                        (name, params_str) = text.split('|')
                        name_idx=''
                        name = fix_name(name)
                        isDefault = False
                        comments = ''
                        if (skillId, proudId) in old_values and cur_desc in old_values[(skillId, proudId)]:
                            name_idx = old_values[(skillId, proudId)][cur_desc]
                            if not name_idx in names_mapping.values():
                                if name in names_mapping.keys():
                                    comments = f' #ManualFromDefault {names_mapping[name]}: {convert_id(name, True)}'
                                else:
                                    name = convert_id(name, True)
                                    if name != name_idx and f'{char_id}_{name}' != name_idx:
                                        comments = f' #WasChanged from {name}'
                                scaleData['customParams'][name_idx] = str(desc)
                            else:
                                if not name in names_mapping.keys():
                                    comments = f' #ManualToDefault {convert_id(name, True)}'
                                else:
                                    comments = ' #Default'
                                isDefault = True
                        elif not name in names_mapping.keys():
                            name = convert_id(name, True)
                            idx = 0
                            name_idx = name
                            while name_idx in scaleData['customParams']:
                                idx += 1
                                name_idx = f'{name}_{idx}'
                            scaleData['customParams'][name_idx] = str(desc)
                            comments = ' #Custom'
                        else:
                            name_idx = names_mapping[name]
                            isDefault = True
                            comments = ' #Default'
                        if not do_single:
                            updated_values.write(f'        {cur_desc}: "{name_idx}",{comments}\n')

                        if not (isDefault or name_idx.startswith(f"{char_id}_")):
                            name_idx = f"{char_id}_{name_idx}"

                        scaleData['desc'].append((text, name_idx))
                        # if skillId == 10702:
                        #     print(scaleData)
                if not do_single:
                    updated_values.write(f'    }},\n')

            for scale in item['paramList']:
                if skillLevel not in scaleData['levels']:
                    scaleData['levels'][skillLevel] = []
                scaleData['levels'][skillLevel].append(scale)

        talenttable(f'\t\ts{index}_id: {skillId},\n')
        talenttable("\t\ts" + str(index) + ": {\n")
        make_tables(scaleData)
        talenttable("\t\t},\n")
        if statgenerator: statgenerator.processScaleData(scaleData)

    return scaleData

out_dir = os.path.join(dirname, '../src/js/db/generated/')
if not do_single:
    updated_values = open(dirname + '/new_values.py', 'w', encoding='utf-8')
    updated_values.write('old_values = {\n')


statgenerator = None
talentfile = None
if not do_single:
    talentfile = open(out_dir + 'CharTalentTables.js', 'w', encoding='utf-8')
    statgenerator = StatGenerator(out_dir + 'CharTables.js')
    statgenerator.generateHeader()
    #scalefile = open(out_dir + 'CharScale.js', 'w', encoding='utf-8')

talenttable('// This file is autogenerated\n')
talenttable('export const charTalentTables = {\n')

def prepare_talents(talent_items, generate):
    for talent in talent_items:
        talent_name = lang_default.get(talent['nameTextMapHash'])
        if not talent_name:
            continue
        talent_short_id = convert_id(talent_name, removeSemicolon=True)
        talent_id = char_id + '_' + talent_short_id

        if generate:
            generator.constellation(talent_id, talent.get('no_descr'), talent['descTextMapHash_hex'] and lang_default.get(talent['descTextMapHash_hex']))

        if uniq_skills.get(talent_id):
            continue
        uniq_skills[talent_id] = 1
        
        descItems = {}
        descItems_hex = {}
        nameItems = {}

        err = False
        for lang_name in lang_data:
            lang = lang_data[lang_name]['lang']
            skill_name = lang.get(talent['nameTextMapHash'])
            nameItems[lang_name] = [skill_name]
            tpl_keywords = lang_data[lang_name]['keywords']
            #if not tpl_char: texts[eng_name].append(skill_name)
            texts[eng_name].append(skill_name)
            tpl_talents = lang_data[lang_name]['talents']

            if talent['descTextMapHash']:
                try:
                    texts[eng_name].append(lang.get(talent['descTextMapHash']))
                    skill_descr = process_talent_desc(lang_name, lang.get(talent['descTextMapHash']), talent_short_id, tpl_talents, talent['no_descr'], None, tpl_keywords)
                    descItems[lang_name] = skill_descr['descr']
                    nameItems[lang_name].extend(skill_descr['names'])
                except Exception as e:
                    logger.error(f'error on talent {talent_id}  [{talent["descTextMapHash"]}]')
                    logger.error(e)
                    err = True

            if talent['descTextMapHash_hex'] and lang.get(talent['descTextMapHash_hex']):
                try:
                    texts[eng_name].append(lang.get(talent['descTextMapHash_hex']))
                    skill_descr = process_talent_desc(lang_name, lang.get(talent['descTextMapHash_hex']), talent_short_id, tpl_talents, talent['no_descr'], talent_short_id + '_hex', tpl_keywords)
                    descItems_hex[lang_name] = skill_descr['descr']
                    nameItems[lang_name].extend(skill_descr['names'])
                except Exception as e:
                    logger.error(f'error on talent {talent_id}_hex  [{talent["descTextMapHash"]}]')
                    logger.error(e)
                    err = True
            #if not tpl_char: texts[eng_name].append('\n')
            texts[eng_name].append('\n')
        if err: continue

        add_array(nameItems, result_hero_strings, talent_id, 'talent_name')

        if descItems:
            add_array(descItems, result_hero_strings, talent_id, 'talent_descr')
        if descItems_hex:
            add_array(descItems_hex, result_hero_strings, talent_id + '_hex', 'talent_descr')

def process_talent_desc(lang_name, skill_descr, talent_short_id, tpl_patterns, no_descr, talent_hex = None, tpl_keywords = None):
    locallinks.update(collect_links(skill_descr))

    tpl_names = lang_data[lang_name]['names']

    # print('default:--------------------------')
    # print(skill_descr)
    skill_descr = tpl_patterns.process(skill_descr)['descr'][0]
    # print('patterns:--------------------------')
    # print(skill_descr)
    # print(tpl_keywords)
    if tpl_keywords:
        skill_descr = tpl_keywords.process(skill_descr)['descr'][0]
    # print('keywords:--------------------------')
    # print(skill_descr)
    skill_descr = tpl_names.process(skill_descr)['descr'][0]
    # print('names:--------------------------')
    # print(skill_descr)
    if tpl_char:
        if no_descr and not tpl_char.find(lang_name, talent_short_id):
            skill_descr = ''
        else:
            if talent_hex: # and tpl_char.find(lang_name, talent_hex):
                skill_descr = tpl_char.process(lang_name, talent_hex, skill_descr)
            else:
                skill_descr = tpl_char.process(lang_name, talent_short_id, skill_descr)
        # print('char:--------------------------')
        # print(skill_descr)
    elif no_descr:
        skill_descr = ''

    if isinstance(skill_descr, str):
        skill_descr = {'descr': [skill_descr], 'names': []}

    for i in range(0, len(skill_descr['descr'])):
        if skill_descr['descr'][i]:
            skill_descr['descr'][i] = postprocess.process(skill_descr['descr'][i])['descr'][0]
    return skill_descr

hyperlinks = {}
generator.header()

def processPassiveTalent(proud, paramList):
    talenttable('\t\t\t')

    paramList.extend([trimToVal(x) for x in proud.get('paramList')])
    talenttable(repr(shrink_table(paramList)))
    talenttable(',\n')
    talent_name = lang_default.get(proud.get('nameTextMapHash'))
    if not talent_name:
        return
    talent_items.append({
        'nameTextMapHash': proud.get('nameTextMapHash'),
        'descTextMapHash': proud.get('descTextMapHash'),
        'descTextMapHash_hex': proud.get(hex_descr_fld),
        'no_descr': False
    })
    talent_short_id = convert_id(talent_name, removeSemicolon=True)
    talent_id = char_id + '_' + talent_short_id
    generator.condition(char_id, talent_id, passive.get(needAvatarPromoteLevel_fld) or 0)

inherentProudSkillOpens_fld = 'inherentProudSkillOpens'
hexProudSkillOpens_fld = 'DAEIJGCFNLL'
needAvatarPromoteLevel_fld = 'needAvatarPromoteLevel'
hex_descr_fld = 'POMMPOECOFA'#'JDKOMPNCEMO'#'HCAOGPJPGLM' # 'IACNAENANDH'
extra_descr_fld = 'extraDescTextMapHash'

for charVarName in sorted(char_keys):
    result_hero_strings = []
    char = char_keys[charVarName]
    char_id = char['char_id']
    char_key = char['char_key']
    eng_name = lang_data['eng']['lang'].get(char['nameTextMapHash'])
    generator.set_charName(char_id, charVarName)

    res_item = OrderedDict(
        category='char_name',
        name=char_key,
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

    talenttable("\t" + charVarName + ': {\n')
    talenttable(f"\t\tchar_id:'{char['id']}',\n")
    talenttable(f"\t\tchar_weapon:'{char['weaponType']}',\n")

    locallinks = set()
    if not do_single:
        updated_values.write(f'#{char_key}\n')
    depot_id = char['depot_id']
    depot = depot_data.get(depot_id)
    if not depot:
        continue
    if statgenerator: statgenerator.prepareChar(char_data.get(char['id']))
    skill_ids = []
    if depot.get('skills'):
        skill_ids.append((depot.get('skills')[0], 'feature_attack'))
        skill_ids.append((depot.get('skills')[1], 'feature_skill'))
        for idx in depot.get('skills')[2:]:
            if idx:
                skill_ids.append((idx, 'feature_other'))
    if depot.get('energySkill'):
        skill_ids.append((depot.get('energySkill'), 'feature_burst'))

    # if depot.get('SubSkills'):
    #     skill_ids.extend(depot.get('SubSkills'))
    index = 1
    features = []
    for (id, skill_type) in skill_ids:
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
        generator.talent_begin(char_id, skill_id, index, skill_type)
        if statgenerator and skill_type == 'feature_burst':
            statgenerator.processBurst(skill)
        uniq_skills[skill_id] = 1

        if not do_single:
            updated_values.write(f'    #{talent_short_id}\n')
        proud_params = scales_and_proud(id, skill.get('proudSkillGroupId'), index, char_id)
        generator.end_talent(char_id)
        if proud_params['desc']:
            index+= 1

        descItems = {}
        descItems_hex = {}
        nameItems = {}
        err = False
        for lang_name in lang_data:
            try:
                lang = lang_data[lang_name]['lang']
                skill_name = lang.get(skill['nameTextMapHash'])
                skill_name = re.sub(r'^Normal Attack:\s*', '', skill_name)
                nameItems[lang_name] = [skill_name]
                tpl_patterns = lang_data[lang_name]['patterns']
                tpl_keywords = None # lang_data[lang_name]['keywords']
                extraDescr = lang.get(skill[extra_descr_fld]) or ''
                skill_descr = process_talent_desc(lang_name, lang.get(skill['descTextMapHash']) + extraDescr, talent_short_id, tpl_patterns, False, None, tpl_keywords)
                descItems[lang_name] = skill_descr['descr']
                nameItems[lang_name].extend(skill_descr['names'])
                if skill[hex_descr_fld] and lang.get(skill[hex_descr_fld]):
                    skill_descr = process_talent_desc(lang_name, lang.get(skill[hex_descr_fld]) + extraDescr, talent_short_id, tpl_patterns, False, talent_short_id + '_hex', tpl_keywords)
                    descItems_hex[lang_name] = skill_descr['descr']
                    nameItems[lang_name].extend(skill_descr['names'])
            except Exception as e:
                logger.error(f'error on {skill_id} [{skill["descTextMapHash"]}]')
                logger.error(e)
                err = True
        if err: continue

        if proud_params['customParams'].keys():
            for param in proud_params['customParams']:
                values = {}
                for lang_name in lang_data:
                    lang = lang_data[lang_name]['lang']
                    name_hash = proud_params['customParams'][param]
                    (name, params_str) = lang.get(name_hash).split('|')
                    values[lang_name] = fix_name(name)
                result_hero_strings.append(
                    OrderedDict(
                        category=skill_type,
                        name=param if param.startswith(f"{char_id}_") else char_id + '_' + param,
                        rus=values['rus'],
                        eng=values['eng'],
                    )
                )

        add_array(nameItems, result_hero_strings, skill_id, 'talent_name')
        add_array(descItems, result_hero_strings, skill_id, 'talent_descr')
        if descItems_hex:
            add_array(descItems_hex, result_hero_strings, skill_id + '_hex', 'talent_descr')

    generator.begin_char(char_id, skiped_features)

    talent_items = []
    const_num = 0

    talenttable('\t\tcons: [\n')
    for const_id in depot.get('talents'):
        const_num += 1
        talent = talent_data.get(const_id)
        if not talent:
            continue
        talent_items.append({
            'nameTextMapHash': talent.get('nameTextMapHash'),
            'descTextMapHash': talent.get('descTextMapHash'),
            'descTextMapHash_hex': talent.get(hex_descr_fld),
            'no_descr': const_num == 3 or const_num == 5,
        })
        talenttable('\t\t\t')
        talenttable(repr(shrink_table(talent.get('paramList'))))
        talenttable(',\n')
    talenttable('\t\t],\n')

    talenttable('\t\tpasssive: [\n')
    passive_count = 0
    needed = char_id in NEED_PASSIVE_TALENTS
    for passive in depot.get(inherentProudSkillOpens_fld, []):
        passive_id = passive.get('proudSkillGroupId')
        if passive_id > 0:
            proud = proud_data.get_item_by_field('proudSkillGroupId', passive_id)
            paramList = extractPramList(proud)
            if passive[needAvatarPromoteLevel_fld] > 0 or needed or len(paramList) > 0:
                passive_count += 1
                processPassiveTalent(proud, paramList)
            elif needed: break
            else: continue
        elif needed: break
        else: continue
    for passive in depot.get(hexProudSkillOpens_fld, []):
        passive_id = passive.get('proudSkillGroupId')
        if passive_id > 0:
            proud = proud_data.get_item_by_field('proudSkillGroupId', passive_id)
            passive_count += 1
            processPassiveTalent(proud, [])
    talenttable('\t\t],\n')

    generator.begin_constellation(char_id)

    prepare_talents(talent_items[-passive_count:], False)
    prepare_talents(talent_items[0:-passive_count], True)

    for hl_id in locallinks:
        if not hyperlinks.get(hl_id):
            hyperlinks[hl_id] = 1
        skill_id = f'n{hl_id}'
        if tpl_char and tpl_char.find('eng', skill_id):
            hl_item = hyperlink_data.get(int(hl_id))
            descItems = {}
            nameItems = {}
            err = False
            for lang_name in lang_data:
                nameItems[lang_name] = []
                try:
                    lang = lang_data[lang_name]['lang']
                    tpl_patterns = lang_data[lang_name]['patterns']
                    tpl_keywords = None # lang_data[lang_name]['keywords']
                    skill_descr = process_talent_desc(lang_name, lang.get(hl_item['descTextMapHash']), skill_id, tpl_patterns, False, None, tpl_keywords)
                    descItems[lang_name] = skill_descr['descr']
                    nameItems[lang_name].extend(skill_descr['names'])
                except Exception as e:
                    logger.error(f'error on {char_id} {skill_id} [{hl_item["descTextMapHash"]}]')
                    logger.error(e)
                    err = True
            if err: continue
            n_idx = add_array(nameItems, result_hero_strings, skill_id, 'talent_name', hyperlinks[hl_id])
            d_idx = add_array(descItems, result_hero_strings, skill_id, 'talent_descr', hyperlinks[hl_id])

            hyperlinks[hl_id] = max(n_idx, d_idx)


    if statgenerator: statgenerator.generateChar(charVarName)
    CsvDumper().dump(result_hero_strings, f'char/{char_key}.csv')
    talenttable('\t\tlinks: [%s],\n' % (', '.join(sorted(locallinks))))
    talenttable('\t},\n')

if statgenerator: statgenerator.generateFooter()
generator.end_char()

if not do_single:
    result_talents = []
    for hl_id in sorted(hyperlinks.keys()):
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
                tpl_names = lang_data[lang_name]['names']
                skill_descr = tpl_patterns.process(skill_descr)['descr'][0]
                skill_descr = tpl_names.process(skill_descr)['descr'][0]
                tpl_hyper = getattr(hyperlink, f"{skill_id}_{lang_name}", None) or getattr(hyperlink, skill_id, None)
                if tpl_hyper:
                    skill_descr = tpl_hyper.process(skill_descr)['descr'][0]
                res_item1[lang_name] = skill_name
                res_item2[lang_name] = postprocess.process(skill_descr)['descr'][0]

            result_talents.append(res_item1)
            result_talents.append(res_item2)

    if len(result_talents) > 0:
        CsvDumper().dump(result_talents, 'char_skills.csv')

    TextDumper().dump(texts, 'chat_texts.txt')

    updated_values.write('}\n')

talenttable('};\n')

if not do_single:
    updated_values.close()
    os.remove(dirname + '/old_values.py')
    os.rename(dirname + '/new_values.py', dirname + '/old_values.py')

if generate_char == '':
    print("--- %s ms ---" % (int((time.time() - start_time) * 1000)))
