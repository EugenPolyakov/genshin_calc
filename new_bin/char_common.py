import json
import os
from lib.genshin.datafiles.char import CharProudSkillData, CharSkillDepotData, CharSkillData
from lib.genshin.datafiles.lang import LangData

dirname = os.path.dirname(__file__)
data_dir = os.path.join(dirname, '../../../AnimeGameData/ExcelBinOutput/')

def parse_scales():
    lang = LangData('EN')
    result = {}

    for item in CharProudSkillData().get_list():
        skillId = item['proudSkillGroupId']
        skillLevel = item['level']

        if skillId not in result:
            result[skillId] = {
                'levels': {},
                'desc': [],
            }

        if skillLevel == 1:
            for desc in item['paramDescList']:
                result[skillId]['desc'].append(lang.get(str(desc)))

        for scale in item['paramList']:
            if skillLevel not in result[skillId]['levels']:
                result[skillId]['levels'][skillLevel] = []
            result[skillId]['levels'][skillLevel].append(scale)

    return result


def parse_skills():
    result = {}
    skills = {}
    gr_to_id = {}

    for item in CharSkillData().get_list():
        gr = item.get('proudSkillGroupId')
        if not gr:
            continue

        skills[item['id']] = gr
        gr_to_id[gr] = item['id']

    for item in CharSkillDepotData().get_list():
        ids = []

        id = skills.get(item.get('energySkill'))
        if id:
            ids.append(id)

        for id in item.get("skills", []):
            id = skills.get(id)
            if id:
                ids.append(id)

        result[item['id']] = ids

    return (result, gr_to_id)
