import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from collections import OrderedDict

from lib.genshin.datafiles.lang import LangData
from lib.genshin.datafiles.weapons import IGNORED_WEAPONS, WeaponData, WeaponSkillData
from lib.genshin.utils import convert_id, add_array
from lib.genshin.strings.templates import weapons as weapons_tpl
from lib.genshin.strings.templates.talents import templates as common_tpl
from lib.genshin.strings.templates.names import names_eng, names_rus, keywords_eng, keywords_rus, color_patterns
from lib.genshin.strings.csv import CsvDumper
from lib.genshin.strings.text import TextDumper

weapon_data = WeaponData()
weapon_skill_data = WeaponSkillData()

lang_data = {
    'rus': {
        'lang': LangData('RU'),
        'patterns': color_patterns,
        'names': names_rus,
        'keywords': keywords_rus,
    },
    'eng': {
        'lang': LangData('EN'),
        'patterns': color_patterns,
        'names': names_eng,
        'keywords': keywords_eng,
    },
}

result_names = []
result_talents = []
existed_talents = {}

weapons = {}
texts = {}

lang_eng = lang_data['eng']['lang']

for weapon in weapon_data.get_list():
    if weapon['id'] in IGNORED_WEAPONS:
        continue

    rank = weapon.get('rankLevel', 0)
    if rank < 3:
        continue

    weapon_id = convert_id(lang_eng.get(weapon['nameTextMapHash']))

    weapons[weapon_id] = {
        'nameTextMapHash': weapon['nameTextMapHash'],
        'skillAffix': weapon['skillAffix'],
    }

for (weapon_id, weapon) in sorted(weapons.items()):
    item = OrderedDict(
        category='weapon_name',
        name=weapon_id,
    )

    for lang_name in lang_data:
        lang = lang_data[lang_name]['lang']
        item[lang_name] = lang.get(weapon['nameTextMapHash'])
    result_names.append(item)

    texts[weapon_id] = []

    for id in weapon['skillAffix']:
        if not id:
            continue

        skill = weapon_skill_data.get_item_by_field('id', id)
        skill_id = convert_id(lang_eng.get(skill['nameTextMapHash']))

        # print(f'["{weapon_id}", "{skill_id}"],')
        texts[weapon_id].append(f'--{skill_id}--')

        if existed_talents.get(skill_id):
            continue
        existed_talents[skill_id] = 1

        talent_name = f'weapon_{skill_id}'
        item_descr = {
            'rus': '',
            'eng': '',
        }
        item_name = {
            'rus': [],
            'eng': [],
        }

        has_tpl = False

        for lang_name in lang_data:
            lang = lang_data[lang_name]['lang']
            item_name[lang_name] = [lang.get(skill['nameTextMapHash'])]
            # item_name[lang_name] = lang.get(skill['nameTextMapHash'])
            item_descr[lang_name] = lang.get(skill['descTextMapHash'])

            texts[weapon_id].append(item_name[lang_name][0])
            texts[weapon_id].append(item_descr[lang_name] + '\n')

            tpl_names = lang_data[lang_name]['names']
            tpl_keywords = lang_data[lang_name]['keywords']
            # tpl_patterns = lang_data[lang_name]['patterns']

            # item_descr[lang_name] = tpl_patterns.process(item_descr[lang_name])
            item_descr[lang_name] = tpl_keywords.process(item_descr[lang_name])['descr'][0]
            item_descr[lang_name] = tpl_names.process(item_descr[lang_name])['descr'][0]
            item_descr[lang_name] = common_tpl.process(item_descr[lang_name])['descr'][0]

            tpl_weapon = getattr(weapons_tpl, f'{weapon_id}_{lang_name}', None) or getattr(weapons_tpl, weapon_id, None) or \
                getattr(weapons_tpl, f'{skill_id}_{lang_name}', None) or getattr(weapons_tpl, skill_id, None)
            if tpl_weapon:
                has_tpl = True

                values = tpl_weapon.process(item_descr[lang_name])
                item_descr[lang_name] = values['descr'];
                item_name[lang_name].extend(values['names']);

            if not isinstance(item_descr[lang_name], list):
                item_descr[lang_name] = [item_descr[lang_name]]

        add_array(item_name, result_talents, talent_name, 'talent_name')

        if has_tpl or len(item_descr['rus']) == len(item_descr['eng']):
            # result_talents.append(item_descr)
            if item_descr:
                add_array(item_descr, result_talents, talent_name, 'talent_descr')
        else:
            result_talents.append(
                OrderedDict(
                    category='talent_descr',
                    name=talent_name,
                    rus=item_descr['rus'][0],
                    eng=item_descr['eng'][0],
                )
            )



CsvDumper().dump(result_names, 'weapon_names.csv')
#CsvDumper().dump(result_names, '../../strings_casino/weapon_names.csv')
if result_talents:
    CsvDumper().dump(result_talents, 'weapon_talents.csv')
TextDumper().dump(texts, 'weapon_texts.txt')
