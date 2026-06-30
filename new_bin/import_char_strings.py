import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
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
    502: 'pyro',
    503: 'hydro',
    504: 'anemo',
    506: 'geo',
    507: 'electro',
    508: 'dendro',
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

def collect_links(txt):
    return re.findall(r'{LINK#N(\d+)}', txt)

for char in char_data.get_list():
    if char['id'] in SKIP_CHARACTERS:
        continue

    if char['id'] in (10000007,):
        continue

    # if char['id'] not in (10000114,): continue

    char_name = lang_default.get(char['nameTextMapHash'])
    char_id = convert_id(char_name)

    # if char_id!="flins": continue

    # print([char_id, char['id']])

    depot_ids = char.get('candSkillDepotIds', [])

    if depot_ids:
        for depot_id in depot_ids:
            if depot_id not in traveler_depot_ids.keys():
                continue
            traveler_id = f'{char_id}_{traveler_depot_ids[depot_id]}'
            char_keys[traveler_id] = {
                'char_id': char_id,
                'nameTextMapHash': char['nameTextMapHash'],
                'depot_ids': [depot_id],
            }
    else:
        char_keys[char_id] = {
            'char_id': char_id,
            'nameTextMapHash': char['nameTextMapHash'],
            'depot_ids': [char['skillDepotId']],
        }

hyperlinks = set()
for char_key in sorted(char_keys):
    result_hero_strings = []
    char = char_keys[char_key]
    char_id = char['char_id']
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

    for depot_id in char['depot_ids']:
        depot = depot_data.get(depot_id)
        if not depot:
            continue
        skill_ids = []
        burst_id = 0
        attack_id = 0
        if depot.get('energySkill'):
            burst_id = depot.get('energySkill')
            skill_ids.append(burst_id)
        if depot.get('skills'):
            attack_id = depot.get('skills')[0]
            skill_ids.extend(depot.get('skills'))
        # if depot.get('SubSkills'):
        #     skill_ids.extend(depot.get('SubSkills'))

        for id in skill_ids:
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
            uniq_skills[skill_id] = 1

            proud_params = []
            proud = None
            passive_id = skill.get('proudSkillGroupId')
            if passive_id and tpl_char:
                proud = proud_data.get_item_by_field('proudSkillGroupId', passive_id)
                if proud:
                    for lang_name in lang_data:
                        selected = tpl_char.templates.get(f'{talent_short_id}_{lang_name}') or tpl_char.templates.get(talent_short_id)
                        if selected:
                            proud_params = selected.prouds
                            break
                        # else:
                        #     print(skill_id)

            descItems = {}
            nameItems = {}
            for lang_name in lang_data:
                lang = lang_data[lang_name]['lang']
                skill_name = lang.get(skill['nameTextMapHash'])
                skill_descr = lang.get(skill['descTextMapHash'])

                hyperlinks.update(collect_links(skill_descr))

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

            if proud:
                values = {'rus':[], 'eng':[]}
                for idx, param in enumerate(proud_params):
                    for lang_name in lang_data:
                        lang = lang_data[lang_name]['lang']
                        (name, params_str) = lang.get(proud['paramDescList'][param]).split('|')
                        values[lang_name].append(name)
                add_array(values, result_hero_strings, skill_id, 'feature_burst' if id==burst_id else 'feature_attack' if id==attack_id else 'feature_skill')

            add_array(nameItems, result_hero_strings, skill_id, 'talent_name')
            add_array(descItems, result_hero_strings, skill_id, 'talent_descr')

        talent_items = []
        const_num = 0
        used_passive = 0

        for passive in depot.get('inherentProudSkillOpens', []):
            if (passive.get('needAvatarPromoteLevel') > 0 or char_id in NEED_PASSIVE_TALENTS) and passive.get('proudSkillGroupId') > 0:
                passive_id = passive.get('proudSkillGroupId')
                proud = proud_data.get_item_by_field('proudSkillGroupId', passive_id)
                talent_items.append({
                    'nameTextMapHash': proud.get('nameTextMapHash'),
                    'descTextMapHash': proud.get('descTextMapHash'),
                })
            else: break

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

        for talent in talent_items:
            talent_name = lang_default.get(talent['nameTextMapHash'])
            if not talent_name:
                continue
            talent_short_id = convert_id(talent_name, removeSemicolon=True)
            talent_id = char_id + '_' + talent_short_id

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
                    hyperlinks.update(collect_links(skill_descr))
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
    CsvDumper().dump(result_hero_strings, f'char/{char_key}.csv')

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
print("--- %s ms ---" % (int((time.time() - start_time) * 1000)))
