import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import json
import re
import static # type: ignore

dirname  = os.path.dirname(__file__)
data_dir = os.path.join(dirname, '../../../AnimeGameData/ExcelBinOutput/')

# rounded_stats = ['atk', 'hp', 'def', 'mastery']
# stats = ['atk', 'atk_percent', 'def', 'def_percent', 'hp', 'hp_percent', 'mastery', 'recharge', 'crit_rate', 'crit_dmg']

def parse_rolls():
    file   = open(data_dir + 'ReliquaryLevelExcelConfigData.json', 'r')
    result = {}

    for item in json.load(file):
        result[item['level']] = {}

        for prop in item['addProps']:
            type  = prop['propType']
            stat  = static.getStatByName(type)
            value = static.getStatValue(type, prop['value'])

            stat = re.sub(r'_base', '', stat)

            result[item['level']][stat] = static.trimValue(value)

    print(result)
    return result

parse_rolls()
