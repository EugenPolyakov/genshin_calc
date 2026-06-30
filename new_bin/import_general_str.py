import sys
import os
dirname = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, dirname)
import time
start_time = time.time()

import re
from collections import OrderedDict

from lib.genshin.datafiles.char import TeamResonanceExcelConfigData, CharProudSkillData
from lib.genshin.datafiles.lang import LangData
from lib.genshin.strings.templates.names import keywords_eng, keywords_rus, names_eng, names_rus, patterns_eng, postprocess
from lib.genshin.strings.templates import talents
from lib.genshin.strings.templates import resonance as resonance_tpl
from lib.genshin.utils import convert_id, add_array
from lib.genshin.strings.csv import CsvDumper
from lib.genshin.strings.text import TextDumper  # noqa
import lib.static
from lib.static import names_mapping, fix_name
from old_values import old_values
import logging

logger = logging.getLogger(__name__)

proud_data = CharProudSkillData()
resonance = TeamResonanceExcelConfigData()

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

def process_talent_desc(lang_name, skill_descr, talent_short_id, tpl_patterns):
    tpl_names = lang_data[lang_name]['names']
    tpl_keywords = lang_data[lang_name]['keywords']
    # print('default:--------------------------')
    # print(skill_descr)
    skill_descr = tpl_patterns.process(skill_descr)['descr'][0]
    # print('patterns:--------------------------')
    # print(skill_descr)
    # print(tpl_keywords)
    skill_descr = tpl_keywords.process(skill_descr)['descr'][0]
    # print('keywords:--------------------------')
    # print(skill_descr)
    skill_descr = tpl_names.process(skill_descr)['descr'][0]
    # print('names:--------------------------')
    # print(skill_descr)
    tpl_resonance = getattr(resonance_tpl, f'{talent_short_id}_{lang_name}', None) or getattr(resonance_tpl, talent_short_id, None)
    if tpl_resonance:
        skill_descr = tpl_resonance.process(skill_descr)
    # print('char:--------------------------')
    # print(skill_descr)

    if isinstance(skill_descr, str):
        skill_descr = {'descr': [skill_descr], 'names': []}

    for i in range(0, len(skill_descr['descr'])):
        if skill_descr['descr'][i]:
            skill_descr['descr'][i] = postprocess.process(skill_descr['descr'][i])['descr'][0]
    return skill_descr

result_resonance = []
def extract_resonances():
    for item in resonance.get_list():
        skill_name = lang_default.get(item['nameTextMapHash'])
        if not skill_name:
            continue
        talent_short_id = convert_id(skill_name, removeSemicolon=True)

        descItems = {}
        descItems_hex = {}
        nameItems = {}
        err = False
        for lang_name in lang_data:
            try:
                lang = lang_data[lang_name]['lang']
                skill_name = lang.get(item['nameTextMapHash'])
                nameItems[lang_name] = [skill_name]
                tpl_patterns = lang_data[lang_name]['patterns']
                skill_descr = process_talent_desc(lang_name, lang.get(item['descTextMapHash']), talent_short_id, tpl_patterns)
                descItems[lang_name] = skill_descr['descr']
                nameItems[lang_name].extend(skill_descr['names'])
            except Exception as e:
                logger.error(f'error on {talent_short_id} [{item["descTextMapHash"]}]')
                logger.error(e)
                err = True
        if err: continue

        add_array(nameItems, result_resonance, talent_short_id, 'buffs_name')
        add_array(descItems, result_resonance, talent_short_id, 'buffs_descr')

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
                if (skillId, proudId) in old_values:
                    if not name in names_mapping:
                        print(f'text changed [{i}] to {name}')
                    name_idx = old_values[(skillId, proudId)][i]
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
        res_item4 = OrderedDict(
            category='feature_' + skill_type,
            name=name_idx+'_3',
        )

        lang = lang_data['rus']['lang']
        (name, params_str) = lang.get(desc).split('|')
        name = fix_name(name)
        res_item1['rus'] = name
        res_item2['rus'] = res_item1['rus'] + '-1'
        res_item3['rus'] = res_item1['rus'] + '-2'
        res_item4['rus'] = res_item1['rus'] + '-3'

        lang = lang_data['eng']['lang']
        (name, params_str) = lang.get(desc).split('|')
        name = fix_name(name)
        res_item1['eng'] = name
        res_item2['eng'] = res_item1['eng'].replace(repl, '-1' + repl)
        res_item3['eng'] = res_item1['eng'].replace(repl, '-2' + repl)
        res_item4['eng'] = res_item1['eng'].replace(repl, '-3' + repl)

        result_talents.append(res_item1)
        result_talents.append(res_item2)
        result_talents.append(res_item3)
        result_talents.append(res_item4)

def normal_hit(name_idx, desc, types):
    add_hits(name_idx, desc, types, '-Hit')

def dmg_hit(name_idx, desc, types):
    add_hits(name_idx, desc, types, ' DMG')

#ganyu
extract_params(10371, 3731, range(0, 6), normal_hit, ['attack', 'skill', 'burst'])
#ningguang
extract_params(10271, 2731, [0], default_skill, ['attack', 'skill', 'burst'])
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

extract_resonances()
CsvDumper().dump(result_resonance, 'default_resonance.csv')

print("--- %s ms ---" % (int((time.time() - start_time) * 1000)))
