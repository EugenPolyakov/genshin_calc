class EmptyCharGenerator:
    def header(self): return

    def set_charName(self, char_id, charVarName: str): return

    def talent_begin(self, char_id, skill_id, index, skill_type): return

    def end_talent(self, char_id): return

    def add_param(self, paramName: str, params_indices): return

    def skillmult(self, elem, name, vals, isChild): return

    def begin_char(self, char_id, skiped_features): return

    def condition(self, char_id, talent_id, needAvatarPromoteLevel): return

    def begin_constellation(self, char_id): return

    def constellation(self, talent_id, noDescr, hasHex): return

    def end_char(self): return

class CharGenerator(EmptyCharGenerator):
    def __init__(self, char_id: str):
        self.char_id = char_id
        self.feature_list = []

    def header(self):
        print('import { Condition } from "../../classes/Condition";')
        print('import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";')
        print('import { ConditionStatic } from "../../classes/Condition/Static";')
        print('import { DbObjectChar } from "../../classes/DbObject/Char";')
        print('import { DbObjectConstellation } from "../../classes/DbObject/Constellation";')
        print('import { DbObjectTalents } from "../../classes/DbObject/Talents";')
        print('import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";')
        print('import { FeatureDamageMultihit } from "../../classes/Feature2/Damage/Multihit";')
        print('import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";')
        print('import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";')
        print('import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";')
        print('import { StatTable } from "../../classes/StatTable";')
        print('import { charTables } from "../generated/CharTables";')
        print('import { charTalentTables } from "../generated/CharTalentTables";')
        print()
        print("const Talents = new DbObjectTalents({")

    def set_charName(self, char_id, charVarName: str):
        if self.char_id == char_id:
            self.charVarName = charVarName

    def talent_begin(self, char_id, skill_id, index, skill_type):
        if self.char_id == char_id:
            print(f"    {skill_type[8:]}: {{")
            print(f"        gameId: charTalentTables.{self.charVarName}.s{index}_id,")
            print(f"        title: 'talent_name.{skill_id}',")
            print(f"        description: 'talent_descr.{skill_id}',")
            print("        items: [")
            self.feature_list.append({'index': index, 'elements': [], 'type': skill_type})

    def end_talent(self, char_id):
        if self.char_id == char_id:
            print("        ],")
            print("    },")

    def add_param(self, paramName: str, params_indices):
        lst = paramName.split('/')
        last = self.feature_list[len(self.feature_list) - 1]
        id = last['index']
        if len(lst) == len(params_indices):
            for (localIdx, (ind, fmt)) in enumerate(params_indices):
                print("            {")
                print(f"                table: new StatTable('{lst[localIdx]}', charTalentTables.{self.charVarName}.s{id}.p{ind}),")
                print("            },")
                last['elements'].append((lst[localIdx], 1))
        else:
            last['elements'].append((paramName, len(params_indices)))
            print("            {")
            print("                type: 'hits',")
            print(f"                name: '{paramName}',")
            print("                table: [")
            for (localIdx, (ind, fmt)) in enumerate(params_indices, 1):
                print(f"                    new StatTable('{paramName}_{localIdx}', charTalentTables.{self.charVarName}.s{id}.p{ind}),")
            print("                ],")
            print("            },")

    def skillmult(self, elem, name, vals, isChild):
        if vals > 1:
            print("        new FeatureDamageMultihit({")
            print(f"            category: '{elem}',")
            print(f"            damageType: '{'normal' if elem == 'attack' else elem}',")
            print(f"            name: '{name}',")
            print('            items: [');
            for idx in range(1, vals + 1):
                print('                {');
                print("                    multipliers: [")
                print("                        new FeatureMultiplier({")
                print(f"                            leveling: 'char_skill_{'elemental' if elem == 'skill' else elem}',")
                print(f"                            values: Talents.get('{elem}.{name}_{idx}'),")
                print("                        }),")
                print("                    ],")
                print('                },')
            print("            ],")
            print("        }),")
            for idx in range(1, vals + 1):
                self.skillmult(elem, f'{name}_{idx}', 1, True)
        else:
            if elem == 'attack':
                print("        new FeatureDamageNormal({")
            elif elem == 'skill':
                print("        new FeatureDamageSkill({")
            else:
                print("        new FeatureDamageBurst({")
            if isChild:
                print('            isChild: true,')
            print("            multipliers: [")
            print("                new FeatureMultiplier({")
            print(f"                    leveling: 'char_skill_{'elemental' if elem == 'skill' else elem}',")
            print(f"                    values: Talents.get('{elem}.{name}'),")
            print("                }),")
            print("            ],")
            print("        }),")

    def begin_char(self, char_id, skiped_features):
        if self.char_id == char_id:
            print(f"    links: charTalentTables.{self.charVarName}.links,")
            print("});")
            print()
            print(f"export const {self.charVarName} = new DbObjectChar({{")
            print(f"    name: '{self.char_id}',")
            print("    serializeId: ?,")
            print(f"    gameId: charTalentTables.{self.charVarName}.char_id,")
            print(f"    iconClass: 'char-icon-{self.char_id}',")
            print("    rarity: ?,")
            print("    element: ?,")
            print(f"    weapon: charTalentTables.{self.charVarName}.char_weapon,")
            print("    origin: ?,")
            print("    talents: Talents,")
            print(f"    statTable: charTables.{self.charVarName},")
            print("    features: [")
            for elem in self.feature_list:
                elem_type = elem['type'][8:]
                for (item, vals) in elem['elements']:
                    if item in skiped_features: continue
                    self.skillmult(elem_type, item, vals, False)
            print("    ],")
            print("    conditions: [")

    def condition(self, char_id, talent_id, needAvatarPromoteLevel):
        if self.char_id == char_id:
            print("        new ConditionStatic({")
            print(f"            name: '{talent_id}',")
            print("            serializeId: 1,")
            print(f"            title: 'talent_name.{talent_id}',")
            print(f"            description: 'talent_descr.{talent_id}',")
            if needAvatarPromoteLevel > 0:
                print(f"            info: {{ascension: {needAvatarPromoteLevel}}},")
                print(f"            condition: new ConditionAscensionChar({{ascension: {needAvatarPromoteLevel}}}),")
            print("        }),")

    def begin_constellation(self, char_id):
        if self.char_id == char_id:
            print("    ],")
            print("    multipliers: [")
            print("    ],")
            print("    constellation: new DbObjectConstellation([")

    def constellation(self, talent_id, noDescr, hasHex):
        print("        {")
        print("            conditions: [")
        if noDescr:
            print("                new Condition({")
            print("                    settings: {")
            print("                        char_skill_burst_bonus: 3, char_skill_elemental_bonus: 3,")
            print("                    },")
        else:
            print("                new ConditionStatic({")
            print(f"                    name: '{talent_id}',")
            print(f"                    title: 'talent_name.{talent_id}',")
            print(f"                    description: 'talent_descr.{talent_id}',")
        if hasHex:
            print("                    condition: new ConditionHexCurrent({ invert: 1}),")
            print("                }),")
            if noDescr:
                print("                new Condition({")
                print("                    settings: {")
                print("                        char_skill_burst_bonus: 3, char_skill_elemental_bonus: 3,")
                print("                    },")
            else:
                print("                new ConditionStatic({")
                print(f"                    name: '{talent_id}',")
                print(f"                    title: 'talent_name.{talent_id}',")
                print(f"                    description: 'talent_descr.{talent_id}_hex',")
            print("                    condition: new ConditionHexCurrent(),")
        print("                }),")
        print("            ],")
        print("        },")

    def end_char(self):
        print("    ]),")
        print("});")

