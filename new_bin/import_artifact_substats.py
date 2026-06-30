from math import floor
import sys
import os
import struct
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from lib.genshin.datafiles.artifacts import ArtifactSubstatData
from decimal import ROUND_DOWN, ROUND_HALF_DOWN, Decimal, getcontext, ROUND_HALF_UP
from lib.genshin.utils import to_float32

def custom_round(v, dig):
    t = v
    # v = round(v, dig)
    for i in range(4, dig - 1, -1):
        v = round(Decimal(v), i)
    if v == 316: print(t)
    return float(v)

# print(to_float32(0.0777) * 100000)
# getcontext().rounding = ROUND_HALF_DOWN
# getcontext().rounding = ROUND_DOWN
# print(round(Decimal(5.5), 0))
# print(round(Decimal(4.5), 0))
getcontext().rounding = ROUND_HALF_UP
# print(round(Decimal(5.5), 0))
# print(round(Decimal(4.5), 0))
# print(custom_round(Decimal(18.648), 1))

TYPES_TO_STATS = {
    'FIGHT_PROP_HP': 'hp',
    'FIGHT_PROP_ATTACK': 'atk',
    'FIGHT_PROP_DEFENSE': 'def',
    'FIGHT_PROP_ATTACK_PERCENT': 'atk_percent',
    'FIGHT_PROP_DEFENSE_PERCENT': 'def_percent',
    'FIGHT_PROP_HP_PERCENT': 'hp_percent',
    'FIGHT_PROP_ELEMENT_MASTERY': 'mastery',
    'FIGHT_PROP_CHARGE_EFFICIENCY': 'recharge',
    'FIGHT_PROP_CRITICAL': 'crit_rate',
    'FIGHT_PROP_CRITICAL_HURT': 'crit_dmg',
}

NORMAL_STATS = ['hp', 'atk', 'mastery', 'def']
MAX_LEVEL = {
    1: 2,
    2: 3,
    3: 4,
    4: 5,
    5: 6,
}

LEVEL_COEF = {
    1: [0.8, 1],
    2: [0.7, 0.85, 1],
    3: [0.7, 0.8, 0.9, 1],
    4: [0.7, 0.8, 0.9, 1],
    5: [0.7, 0.8, 0.9, 1],
}

goods_id = {
    'hp': 'hp',
    'atk': 'atk',
    'atk_percent': 'atk_',
    'def': 'def',
    'def_percent': 'def_',
    'hp_percent':  'hp_',
    'mastery':     'eleMas',
    'recharge':    'enerRech_',
    'crit_rate':   'critRate_',
    'crit_dmg':    'critDMG_',
}

stats = {}

for item in ArtifactSubstatData().data:
    rank = item.get('depotId')
    if not rank:
        continue
    level = int(rank) // 100

    if level > 5:
        continue

    stat = TYPES_TO_STATS.get(item['propType'])
    if stat not in stats:
        stats[stat] = {'rolls': {1:[], 2:[], 3:[], 4:[], 5:[]}, 'rollsView': {1:[], 2:[], 3:[], 4:[], 5:[]}, 'values': []}

    value = item['propValue']
    stats[stat]['rolls'][level].append(str(value))#to_float32(value)))
    value = item['propValue']
    if stat not in NORMAL_STATS:
        value *= 100
    stats[stat]['rollsView'][level].append(str(round(value, 2)))

def deep(rolsCount, maxRoll, value, comb, isPercent, level, listVal):
    if rolsCount:
        # for roll in LEVEL_COEF[level]:
        #     deep(rolsCount - 1, maxRoll, value + float(maxRoll) * roll, comb, isPercent, level, listVal + [float(maxRoll) * roll])
        for idx, roll in enumerate(maxRoll):
            deep(rolsCount - 1, maxRoll, value + to_float32(roll), comb, isPercent, level, listVal + [str(idx)])

    if value > 0:
        if isPercent:
            resVal = value * 100 # round(value, 4)
        else:
            resVal = value # round(value, 4)
        if isPercent:
            roundVal = custom_round(to_float32(value), 4)
            roundVal = float(custom_round(Decimal(roundVal * 100), 1))
            # if roundVal == 3.1:
            #     print(custom_round(to_float32(value), 4))
            #     print(float(custom_round(Decimal(custom_round(to_float32(value), 4) * 100), 1)))
            #     print(resVal)
        else:
            roundVal = float(round(Decimal(to_float32(value)), 0))
        if roundVal.is_integer():
            roundVal = int(roundVal)
        roundVal = str(roundVal)
        #if float(roundVal) != resVal:
        if roundVal in comb:
            if len(comb[roundVal]['stacks']) > len(listVal):
                comb[roundVal]['preciseValues'] = resVal
                comb[roundVal]['stacks'] = listVal
            cmb = ''.join(sorted(listVal))
            comb[roundVal]['comb'][cmb] = 1

                # if roundVal == "82":
                #     print(listVal)
                #     print(value)
                #     print(resVal)
                #     print(roundVal)
                #     print("changed")
            if comb[roundVal] != resVal:
                # print(f"same combination with different values {roundVal} ({comb[roundVal]} != {resVal}) [{value}] evaluated - {rolsCount}")
                # print(listVal)
                None
        else:
            comb[roundVal] = {
                'preciseValues': resVal,
                'stacks': listVal,
                'comb': { ''.join(sorted(listVal)): 1},
            }

def prcessPrecise(stat, level):
    rolls = stats[stat]['rolls'][level];
    comb = {}
    deep(level + 1, rolls, 0, comb, 0 if stat in NORMAL_STATS else 1, level, [])
    stats[stat]['values'].append(comb)

for stat in TYPES_TO_STATS.values():
    for lvl in MAX_LEVEL.keys():
        prcessPrecise(stat, lvl)
#DB.Artifacts.Substats.get('crit_dmg').preciseValues.reduce((acc, r)=>acc + "{" + Object.keys(r).sort((a, b) => parseFloat(a) - parseFloat(b)).map(x => x + ': ' + r[x]).join(', ') + '},\n', "")
#prcessPrecise('crit_dmg', 5)
print('import { DbObjectListSerializeStats } from "../../classes/DbObject/List/Serialize/Stats";')
print('import { DbObjectSubstat } from "../../classes/DbObject/Substat";')
print('')
print('export const Substats = new DbObjectListSerializeStats({')
idx=0
for key, stat in TYPES_TO_STATS.items():
    print('    ' + stat + ': new DbObjectSubstat({')
    idx+=1
    print('        serializeId: ' + str(idx) + ',')
    print("        goodId: '" + goods_id[stat] + "',")
    print("        gameId: '" + key + "',")
    print('        type: "' + ("decimal" if stat in NORMAL_STATS else "percent") + '",')
    print('        rolls: [')
    for rolls in sorted(stats[stat]['rollsView'].keys()):
        data = stats[stat]['rollsView'][rolls]
        print('            [' + ', '.join(data) + '],')
    print('        ],')
    print('        preciseValues: [')
    for v in stats[stat]['values']:
        s = ''
        for k in sorted(v.keys(), key=float):
            s += f"{k}: {v[k]['preciseValues']}, "
        print('            {' + s + '},')
    print('        ],')
    print('        stacks: [')
    for v in stats[stat]['values']:
        s = ''
        for k in sorted(v.keys(), key=float):
            s += f"{k}: [{', '.join(v[k]['stacks'])}], "
        print('            {' + s + '},')
    print('        ],')
    print('        rollsToValue: [')
    for v in stats[stat]['values']:
        s = ''
        for k in sorted(v.keys(), key=float):
            for z in v[k]['comb'].keys():
                s += f"'{z}': {k}, "
        print('            {' + s + '},')
    print('        ],')
    print('        rollsReal: [')
    for rolls in sorted(stats[stat]['rolls'].keys()):
        data = stats[stat]['rolls'][rolls]
        print('            [' + ', '.join(data) + '],')
    print('        ],')
    print('    }),')
print('});')
