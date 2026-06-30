import re
from .. import static
from .datafiles.char import PromoteData

def parse_ascension():
    file = PromoteData()
    table = {}
    result = {}

    for item in file.get_list():
        values = {}
        level = item.get('promoteLevel', 0)

        for prop in item['addProps']:
            type = prop.get('propType')

            values[static.getStatByName(type)] = static.getStatValue(type, prop.get('value', 0))

        if not item['avatarPromoteId'] in table:
            table[item['avatarPromoteId']] = {}
        table[item['avatarPromoteId']][level] = values

    for id in table:
        result[id] = {}
        first = table[id][0]
        for stat in first:
            result[id][stat] = []

            for level in range(1, 7):
                item = table[id].get(level)
                if item:
                    result[id][stat].append(static.trimValue(item.get(stat)))
                else:
                    result[id][stat].append("0")

    return result

class StatGenerator:
    def __init__(self, fileName):
        self.values = {}
        self.ascensions = parse_ascension()
        self.out = open(fileName, 'w', encoding='utf-8')

    def prepareChar(self, jsonData):
        self.values['hp_base'] = static.trimValue(jsonData["hpBase"])
        self.values['atk_base'] = static.trimValue(jsonData["attackBase"])
        self.values['def_base'] = static.trimValue(jsonData["defenseBase"])
        self.values['mastery_base'] = static.trimValue(jsonData["elementMastery"])
        self.values['crit_rate_base'] = static.trimValue(jsonData["critical"], 100)
        self.values['crit_dmg_base'] = static.trimValue(jsonData["criticalHurt"], 100)
        self.values['recharge_base'] = static.trimValue(jsonData["chargeEfficiency"], 100)
        self.grows = {}
        for grow in jsonData.get('propGrowCurves', []):
            stat = static.getStatByName(grow.get('type'))
            self.grows[stat] = static.getCurveName(grow.get('growCurve'))
        self.ascension = self.ascensions.get(jsonData.get('avatarPromoteId'), {})

    def processScaleData(self, scaleData):
        for (desc, tmp) in scaleData['desc']:
            if not desc:
                continue
            if 'Charged Attack Stamina Cost' in desc or 'Saichimonji Slash Stamina' in desc:
                m = re.search(r'param(\d+)', desc)
                self.values['charged_stamina_cost'] = scaleData['levels'][1][int(m[1]) - 1]
                return

    def processBurst(self, skill):
        self.values['burst_energy_cost'] = skill.get('costElemVal')

    def generateHeader(self):
        self.out.write('// This file is auto generated\n')
        self.out.write('import { StatTable } from "../../classes/StatTable";\n')
        self.out.write('import { StatTableAscensionScale } from "../../classes/StatTable/Ascension/Scale";\n')
        self.out.write('import { charScales } from "./CharScale";\n\n')
        self.out.write('export const charTables = {\n')

    def generateChar(self, charName):
        self.out.write('\t' + charName + ': [\n')
        stats = set(self.values.keys())
        stats = stats.union(list(self.ascension.keys()))

        for stat in sorted(stats):
            self.out.write("\t\tnew StatTableAscensionScale({\n")
            self.out.write("\t\t\tstat: '%s',\n" % (stat))
            self.out.write("\t\t\tbase: %s,\n" % (self.values.get(stat, 0)))

            if stat in self.ascension:
                self.out.write("\t\t\tascension: new StatTable('', [" + ', '.join(self.ascension[stat]) + "]),\n")

            if stat in self.grows:
                self.out.write("\t\t\tscale: charScales." + self.grows[stat] + ",\n")
            self.out.write("\t\t}),\n")

        self.out.write("\t],\n")

    def generateFooter(self):
        self.out.write("};\n")

