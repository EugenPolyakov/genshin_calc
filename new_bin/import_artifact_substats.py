from functools import reduce
from math import floor
import sys
import os
import struct
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from lib.genshin.datafiles.artifacts import ArtifactSubstatData
from decimal import ROUND_DOWN, ROUND_HALF_DOWN, Decimal, getcontext, ROUND_HALF_UP
from lib.genshin.utils import to_float32

def custom_round(v, dig, debug = False):
    t = v
    if debug: print(v)
    # v = round(v, dig)
    for i in range(4, dig - 1, -1):
        v = round(Decimal(v), i)
        if debug: print(v)
    if v == 316: print(t)
    return float(v)

# Округляем по особому до одного знака
# Если произошло изменение целого, то проверяем что оно не из-за округления 2 и 3 разрядов
# 18.649999 -> 18.65 -> 18.7
# 18.65 -> 18.65 -> 18.7
# 18.949999 -> 18.95 -> 19 xxxxxx
# 18.949999 -> 18.94 -> 18.9
def custom_round2(v):
    v2 = round(Decimal(v), 2)
    v1 = round(v2, 1)
    if floor(v) != floor(v1):
        v2_1 = floor(v * 100)
        if v2_1 % 10 <= 4:
            return round(Decimal(v2_1 / 100), 1)
    return v1

# print(to_float32(0.0777) * 100000)
getcontext().rounding = ROUND_HALF_DOWN
# print(round(Decimal(18.9500), 1))
# print(round(Decimal(to_float32(0.1895) * 100), 1))
# getcontext().rounding = ROUND_DOWN
# print(round(Decimal(18.9500), 1))
# print(round(Decimal(to_float32(0.1895) * 100), 1))
getcontext().rounding = ROUND_HALF_UP
# print(round(Decimal(18.9500), 1))
# print(round(Decimal(to_float32(0.1895) * 100), 1))
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
        value = str(custom_round2(value * 100))
    else:
        value = str(round(value))
    stats[stat]['rollsView'][level].append(value)

debug_values = {}

def debug_value(dv):
    val = debug_values[dv]

    roundVal = val['roundVal']
    maxRoll = val['rolls']
    listVal = val['listVal']

    raw = sum(to_float32(maxRoll[int(x)]) for x in listVal)
    resVal = sum(to_float32(maxRoll[int(x)]) for x in listVal) * 100
    value = reduce(lambda res, iter: to_float32(res + float(maxRoll[int(iter)])), listVal, 0)

    print('calc:', roundVal)
    print(dv)
    print(resVal)
    print(to_float32(raw * 100))
    print(value)
    print(floor(value * 10000))
    print(Decimal(Decimal(floor(value * 10000)) / 100))
    print(floor(resVal * 100))
    print(Decimal(Decimal(floor(resVal * 100)) / 100))
    print(float(round(Decimal(Decimal(floor(resVal * 100)) / 100), 1)))
    print(float(round(Decimal(to_float32(resVal)), 1)))
    print(float(round(round(Decimal(to_float32(resVal)), 2), 1)))
    print('   ', to_float32(resVal))
    print('f :', sum(to_float32(maxRoll[int(x)]) for x in listVal))
    print('   ', sum(to_float32(maxRoll[int(x)]) for x in listVal) * 100)
    print('   ', round(Decimal(sum(to_float32(maxRoll[int(x)]) for x in listVal) * 100), 1))
    print('ff:', to_float32(sum(to_float32(maxRoll[int(x)]) for x in listVal)))
    print('   ', to_float32(sum(to_float32(maxRoll[int(x)]) for x in listVal)) * 100)
    print('   ', round(Decimal(to_float32(sum(to_float32(maxRoll[int(x)]) for x in listVal)) * 100), 1))
    print('d :', sum(float(maxRoll[int(x)]) for x in listVal))
    print('   ', sum(float(maxRoll[int(x)]) for x in listVal) * 100)
    print('   ', Decimal(sum(float(maxRoll[int(x)]) for x in listVal) * 100))
    print('   ', round(Decimal(sum(float(maxRoll[int(x)]) for x in listVal) * 100), 1))
    print('df:', to_float32(sum(float(maxRoll[int(x)]) for x in listVal)))
    print('   ', to_float32(sum(float(maxRoll[int(x)]) for x in listVal)) * 100)
    print('   ', round(Decimal(to_float32(sum(float(maxRoll[int(x)]) for x in listVal)) * 100), 1))
    print('D :', sum(Decimal(maxRoll[int(x)]) for x in listVal))
    print('   ', sum(Decimal(maxRoll[int(x)]) for x in listVal) * 100)
    print('   ', round(Decimal(sum(Decimal(maxRoll[int(x)]) for x in listVal) * 100), 1))
    print('Df:', to_float32(sum(Decimal(maxRoll[int(x)]) for x in listVal)))
    print('   ', to_float32(sum(Decimal(maxRoll[int(x)]) for x in listVal)) * 100)
    print('   ', round(Decimal(to_float32(sum(Decimal(maxRoll[int(x)]) for x in listVal)) * 100), 1))

def debug_value_save(roundVal, stat, listVal, maxRoll, level):
    key = stat + ' ' + ''.join(sorted(listVal)) + ' l: ' + str(level)
    if key not in debug_values:
        debug_values[key] = {
            'rolls': maxRoll,
            'roundVal': roundVal,
            'listVal': list(listVal),
        }

def deep(rolsCount, maxRoll, value, comb, isPercent, level, listVal, stat):
    if rolsCount:
        # for roll in LEVEL_COEF[level]:
        #     deep(rolsCount - 1, maxRoll, value + float(maxRoll) * roll, comb, isPercent, level, listVal + [float(maxRoll) * roll])
        for idx, roll in enumerate(maxRoll):
            deep(rolsCount - 1, maxRoll, to_float32(value + float(roll)), comb, isPercent, level, listVal + [str(idx)], stat)

    if value > 0:
        if isPercent:
            resVal = sum(to_float32(maxRoll[int(x)]) for x in listVal) * 100 # round(value, 4)
        else:
            resVal = sum(to_float32(maxRoll[int(x)]) for x in listVal) # round(value, 4)
        if isPercent:
            roundVal = float(round(Decimal(Decimal(floor(value * 10000)) / 100), 1))
            roundVal = float(round(Decimal(Decimal(floor(to_float32(resVal) * 100)) / 100), 1))
            roundVal = float(round(Decimal(to_float32(resVal)), 1))
            #roundVal = float(round(round(Decimal(to_float32(resVal)), 2), 1))
            roundVal = float(custom_round2(resVal))
            # if level == 5:
            #     if roundVal in [18.9, 19] and stat=="def_percent":
            #     #if roundVal in [18.6, 18.7] and stat=="crit_dmg":
            #         debug_value_save(roundVal, stat, listVal, maxRoll, level)
        else:
            roundVal = float(round(Decimal(to_float32(value)), 0))
        if roundVal.is_integer():
            roundVal = int(roundVal)
        roundVal = str(roundVal)
        if roundVal in comb:
            if len(comb[roundVal]['stacks'][0]) > len(listVal):
                comb[roundVal]['preciseValues'] = resVal
            comb[roundVal]['stacks'].append(listVal)
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
                'stacks': [listVal],
                'comb': { ''.join(sorted(listVal)): 1},
            }

def prcessPrecise(stat, level):
    rolls = stats[stat]['rolls'][level];
    comb = {}
    deep(level + 1, rolls, 0, comb, 0 if stat in NORMAL_STATS else 1, level, [], stat)
    stats[stat]['values'].append(comb)

for stat in TYPES_TO_STATS.values():
    for lvl in MAX_LEVEL.keys():
        prcessPrecise(stat, lvl)
#DB.Artifacts.Substats.get('crit_dmg').preciseValues.reduce((acc, r)=>acc + "{" + Object.keys(r).sort((a, b) => parseFloat(a) - parseFloat(b)).map(x => x + ': ' + r[x]).join(', ') + '},\n', "")
#prcessPrecise('crit_dmg', 5)

for dv in debug_values:
    debug_value(dv)

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
            a = ''
            for z in sorted(v[k]['comb'].keys(), key=len):
                a += f"[{', '.join(list(z))}], "
            s += f"{k}: [{a}], "
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
    print('        testValues: [')
    for v in stats[stat]['values']:
        print('           ', sorted(v.keys(), key=float), ',')
    print('        ],')
    print('    }),')
print('});')
