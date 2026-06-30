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
from lib.genshin.strings.template import SentenceMismatch
from lib.genshin.utils import convert_id, add_array
from lib.genshin.strings.csv import CsvDumper
from lib.genshin.strings.text import TextDumper  # noqa
import static
from static import WEAPON_TYPES, shrink_table, names_mapping, fix_name
from old_values import old_values
import logging

logger = logging.getLogger(__name__)

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

def extract_params(skillId, proudId, lrange, do_process, types):
    item = proud_data.get_item_by_filter(lambda x: x['proudSkillGroupId'] == proudId and x['level'] == 1)

    if item:
        for i in lrange:
            desc = item['paramDescList'][i]
            text = lang_default.get(desc)
            if text:
                (name, params_str) = text.split('|')
                name = fix_name(name)
                cur_desc = desc
                if (skillId, proudId) in old_values and cur_desc in old_values[(skillId, proudId)]:
                    if not name in names_mapping:
                        print(f'text changed {cur_desc} to {name}')
                    name_idx = old_values[(skillId, proudId)][cur_desc]
                    do_process(name_idx, desc, types)
                else:
                    raise Exception(f'Skill not found ({skillId}, {proudId})[{i}] in old_values')
            else:
                raise Exception(f'Skill text not found ({skillId}, {proudId})[{i}]')
    else:
        raise Exception(f'Skill not found ({skillId}, {proudId})')

out_dir = os.path.join(dirname, '../src/js/db/generated/')

result_talents = []
def default_skill(name_idx, desc, types):
    for skill_type in types:
        res_item = OrderedDict(
            category='feature_' + skill_type,
            name=name_idx,
        )
        for lang_name in lang_data:
            lang = lang_data[lang_name]['lang']
            (name, params_str) = lang.get(desc).split('|')
            name = fix_name(name)
            res_item[lang_name] = name

        result_talents.append(res_item)

def add_hits(name_idx, desc, types, repl):
    for skill_type in types:
        res_item1 = OrderedDict(
            category='feature_' + skill_type,
            name=name_idx,
        )
        res_item2 = OrderedDict(
            category='feature_' + skill_type,
            name=name_idx+'_1',
        )
        res_item3 = OrderedDict(
            category='feature_' + skill_type,
            name=name_idx+'_2',
        )
        
        lang = lang_data['rus']['lang']
        (name, params_str) = lang.get(desc).split('|')
        name = fix_name(name)
        res_item1['rus'] = name
        res_item2['rus'] = res_item1['rus'] + '-1'
        res_item3['rus'] = res_item1['rus'] + '-2'

        lang = lang_data['eng']['lang']
        (name, params_str) = lang.get(desc).split('|')
        name = fix_name(name)
        res_item1['eng'] = name
        res_item2['eng'] = res_item1['eng'].replace(repl, '-1' + repl)
        res_item3['eng'] = res_item1['eng'].replace(repl, '-2' + repl)

        result_talents.append(res_item1)
        result_talents.append(res_item2)
        result_talents.append(res_item3)
        
def normal_hit(name_idx, desc, types):
    add_hits(name_idx, desc, types, '-Hit')

def dmg_hit(name_idx, desc, types):
    add_hits(name_idx, desc, types, ' DMG')

#ganyu
extract_params(10371, 3731, range(0, 6), normal_hit, ['attack', 'skill', 'burst'])
#venti
extract_params(10221, 2231, range(6, 9), default_skill, ['attack', 'skill', 'burst'])
#bennett
extract_params(10321, 3231, [5], default_skill, ['attack', 'skill', 'burst'])
extract_params(10322, 3232, [0, 3, 4], default_skill, ['attack', 'skill', 'burst'])
extract_params(10322, 3232, [1, 2], dmg_hit, ['attack', 'skill', 'burst'])
extract_params(10323, 3239, [0, 1, 3, 5], default_skill, ['attack', 'skill', 'burst'])
#noelle
extract_params(10341, 3431, [4, 5, 6, 7], default_skill, ['attack', 'skill', 'burst'])
# не стоит делать авто импорт, т.к. в руской версии урон взрыва стихий переведён как просто урон от взрыва из-за чего название сливается с другими параметрами
#extract_params(10343, 3439, [0], default_skill, ['attack', 'skill', 'burst'])

CsvDumper().dump(result_talents, 'default_features.csv')

print("--- %s ms ---" % (int((time.time() - start_time) * 1000)))
