import sys
import os
from unittest import result
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from collections import OrderedDict

from lib.genshin.datafiles.lang import LangData
from lib.genshin.datafiles.weapons import IGNORED_WEAPONS, WeaponData, WeaponSkillData, WeaponPromoteData
from lib.genshin.utils import convert_id, add_array
from lib.genshin.strings.templates import weapons as weapons_tpl
from lib.genshin.strings.templates.talents import templates as common_tpl
from lib.genshin.strings.templates.names import names_eng, names_rus, keywords_eng, keywords_rus, postprocess
from lib.genshin.strings.csv import CsvDumper
from lib.genshin.strings.text import TextDumper
import lib.static as static
from lib.static import WEAPON_TYPES, shrink_table
import accumulator

dirname  = os.path.dirname(__file__)
out_dir  = os.path.join(dirname, '../src/js/db/generated/')

weapon_data = WeaponData()
weapon_skill_data = WeaponSkillData()

lang_data = {
    'rus': {
        'lang': LangData('RU'),
        'names': names_rus,
        'keywords': keywords_rus,
    },
    'eng': {
        'lang': LangData('EN'),
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

weapon_names = {
    #SWORDS
    11301: 'CoolSteel',
    11302: 'HarbingerofDawn',
    11303: 'TravelersHandySword',
    11304: 'DarkIronSword',
    11305: 'FilletBlade',
    11306: 'SkyriderSword',
    11401: 'FavoniusSword',
    11402: 'Flute',
    11403: 'SacrificialSword',
    11404: 'RoyalLongsword',
    11405: 'LionsRoar',
    11406: 'PrototypeRancour',
    11407: 'IronSting',
    11408: 'BlackcliffLongsword',
    11409: 'BlackSword',
    11410: 'AlleyFlash',
    # 11411: "",
    11412: "SwordofDescension",
    11413: "FesteringDesire",
    11414: "AmenomaKageuchi",
    11415: "CinnabarSpindle",
    11416: "KagotsurubeIsshin",
    11417: "SapwoodBlade",
    11418: "XiphosMoonlight",
    11422: 'ToukabouShigure',
    11424: 'WolfFang',
    11425: 'FinaleOfTheDeep',
    11426: 'FleuveCendreFerryman',
    11427: 'TheDockhandsAssistant',
    11428: 'SwordOfNarzissenkreuz',
    11430: 'SturdyBone',
    11431: 'FlamebreathFlute',
    11432: 'CalamityOfEshu',
    11433: 'serenitys_call',
    11434: 'moonweavers_dawn',
    11501: "AquilaFavonia",
    11502: "SkywardBlade",
    11503: "FreedomSworn",
    11504: "SummitShaper",
    11505: "PrimordialJadeCutter",
    # 11506: "PrimordialJadeCutter",
    # 11507: "One Side",
    # 11508: "",
    11509: "MistsplitterReforged",
    11510: 'HaranGeppakuFutsu',
    11511: "KeyofKhajNisut",
    11512: "LightofFoliarIncision",
    11513: "SplendorOfStillWaters",
    11514: "UrakuMisugiri",
    11515: "Absolution",
    11516: "PeakPatrolSong",
    11517: "Azurelight",
    11518: "athame_artis",
    11519: "lightbearing_moonshard",

    #CLAYMORES
    12301: "FerrousShadow",
    12302: "BloodtaintedGreatsword",
    12303: "WhiteIronGreatsword",
    # 12304: "Quartz",
    12305: "DebateClub",
    12306: "SkyriderGreatsword",
    12401: "FavoniusGreatsword",
    12402: "Bell",
    12403: "SacrificialGreatsword",
    12404: "RoyalGreatsword",
    12405: "Rainslasher",
    12406: "PrototypeArchaic",
    12407: "Whiteblind",
    12408: "BlackcliffSlasher",
    12409: "SerpentSpine",
    12410: "LithicBlade",
    12411: "SnowTombedStarsilver",
    12412: "LuxuriousSeaLord",
    12414: "KatsuragikiriNagamasa",
    12415: "MakhairaAquamarine",
    12416: "Akuoumaru",
    12417: "ForestRegalia",
    12418: 'MailedFlower',
    12424: 'TalkingStick',
    12425: 'TidalShadow',
    12426: 'MegaMagicSword',
    12427: 'PortablePowerSaw',
    12430: 'FruitfulHook',
    12431: 'Earthshaker',
    12432: 'FlameForgedInsight',
    12433: 'master_key',
    12501: "SkywardPride",
    12502: "WolfsGravestone",
    12503: "SongofBrokenPines",
    12504: "Unforged",
    # 12505: "PrimordialJadeGreatsword",
    # 12506: "The Other Side",
    # 12508: "",
    # 12509: "",
    12510: "RedhornStonethresher",
    12511: 'BeaconOfTheReedSea',
    12512: 'Verdict',
    12513: 'MountainKingsFang',
    12514: 'AThousandBlazingSuns',
    12515: 'gest_of_the_mighty_wolf',

    #POLEARMS
    13301: "WhiteTassel",
    13302: "Halberd",
    13303: "BlackTassel",
    # 13304: "The Flagstaff",
    13401: "DragonsBane",
    13402: "PrototypeStarglitter",
    13403: "CrescentPike",
    13404: "BlackcliffPole",
    13405: "Deathmatch",
    13406: "LithicSpear",
    13407: "FavoniusLance",
    13408: "RoyalSpear",
    13409: "DragonspineSpear",
    13414: "KitainCrossSpear",
    13415: "Catch",
    13416: "WavebreakersFin",
    13417: "Moonpiercer",
    13419: "MissiveWindspear",
    13424: "BalladOfTheFjords",
    13425: "RightfulReward",
    13426: "DialoguesOfTheDesertSages",
    13427: 'ProspectorsDrill',
    13430: 'MountainBracingBolt',
    13431: 'RainbowsTrail',
    13432: 'BriefPavilionChatter',
    13433: 'prospectors_shovel',
    13434: 'sacrificers_staff',
    13501: "StaffofHoma",
    13502: "SkywardSpine",
    # 13503: "",
    13504: "VortexVanquisher",
    13505: "PrimordialJadeWingedSpear",
    # 13506: "Deicide",
    13507: "CalamityQueller",
    13509: "GrasscuttersLight",
    13511: "StaffOfScarletSands",
    13512: "CrimsonMoonsSemblance",
    13513: 'LumidouceElegy',
    13514: 'SymphonistofScents',
    13515: 'FracturedHalo',
    13516: 'bloodsoaked_ruins',
    13517: 'disaster_and_remorse',

    #CATALYSTS
    14301: "MagicGuide",
    14302: "ThrillingTalesofDragonSlayers",
    14303: "OtherworldlyStory",
    14304: "EmeraldOrb",
    14305: "TwinNephrite",
    # 14306: "Amber Bead",
    14401: "FavoniusCodex",
    14402: "Widsith",
    14403: "SacrificialFragments",
    14404: "RoyalGrimoire",
    14405: "SolarPearl",
    14406: "PrototypeAmber",
    14407: "MappaMare",
    14408: "BlackcliffAgate",
    14409: "EyeofPerception",
    14410: "WineandSong",
    # 14411: "",
    14412: "Frostbearer",
    14413: "DodocoTales",
    14414: "HakushinRing",
    14415: "OathswornEye",
    14416: "WanderingEvenstar",
    14417: "FruitOfFulfillment",
    14424: "SacrificialJade",
    14425: "FlowingPurity",
    14426: 'BalladoftheBoundlessBlue',
    14427: 'AshGravenDrinkingHorn',
    14430: 'WaveridingWhirl',
    14431: 'RingOfCeiba',
    14432: 'etherlight_spindlelute',
    14433: 'blackmarrow_lantern',
    14434: 'dawning_frost',
    14501: "SkywardAtlas",
    14502: "LostPrayer",
    # 14503: "Lost Ballade",
    14504: "MemoryofDust",
    14505: "JadefallsSplendor",
    14506: "EverlastingMoonglow",
    # 14508: "",
    14509: "KagurasVerity",
    14511: "ThousandFloatingDreams",
    14512: "TulaytullahsRemembrance",
    14513: 'CashflowSupervision',
    14514: 'TomeoftheEternalFlow',
    14515: 'CranesEchoingCall',
    14516: 'SurfingTime',
    14517: 'StarcallersWatch',
    14518: 'MorningHibernation',
    14519: 'VividNotions',
    14520: 'nightweavers_looking_glass',
    14521: 'reliquary_of_truth',
    14522: 'nocturnes_curtain_call',
    14523: "angelos_heptades",

    #BOWS
    15301: "RavenBow",
    15302: "SharpshootersOath",
    15303: "RecurveBow",
    15304: "Slingshot",
    15305: "Messenger",
    # 15306: "Ebony Bow",
    15401: "FavoniusWarbow",
    15402: "Stringless",
    15403: "SacrificialBow",
    15404: "RoyalBow",
    15405: "Rust",
    15406: "PrototypeCrescent",
    15407: "CompoundBow",
    15408: "BlackcliffWarbow",
    15409: "ViridescentHunt",
    15410: "AlleyHunter",
    15411: "FadingTwilight",
    15412: "MitternachtsWaltz",
    15413: "WindblumeOde",
    15414: "Hamayumi",
    15415: "Predator",
    15416: "MouunsMoon",
    15417: "KingsSquire",
    15418: "EndOfTheLine",
    15419: "IbisPiercer",
    15424: "ScionOfTheBlazingSun",
    15425: "SongOfStillness",
    15426: "Cloudforged",
    15427: 'RangeGauge',
    15430: 'FlowerWreathedFeathers',
    15431: 'ShatteredChains',
    15432: 'SequenceofSolitude',
    15433: 'snare_hook',
    15434: 'rainbow_serpents_rain_bow',
    15501: "SkywardHarp",
    15502: "AmosBow",
    15503: "ElegyfortheEnd",
    # 15504: "Kunwu's Wyrmbane",
    # 15505: "Primordial Jade Vista",
    # 15506: "Mirror Breaker",
    15507: "PolarStar",
    15508: "AquaSimulacra",
    15509: "ThunderingPulse",
    15511: "HuntersPath",
    15512: "TheFirstGreatMagic",
    15513: "SilvershowerHeartstrings",
    15514: "AstralVulturesCrimsonPlumage",
    15515: 'the_daybreak_chronicles',
    15516: "golden_frostbound_oath",
    # 20001: "",
}

def parse_ascension():
    table = {}
    result = {}

    for item in WeaponPromoteData().get_list():
        values = {}
        level = item.get('promoteLevel', 0)

        for prop in item['addProps']:
            type = prop.get('propType')

            values[static.getStatByName(type)] = static.getStatValue(type, prop.get('value', 0))

        if not item['weaponPromoteId'] in table:
            table[item['weaponPromoteId']] = {}
        table[item['weaponPromoteId']][level] = values

    for id in table:
        result[id] = {}
        first = table[id][0]
        for stat in first:
            result[id][stat] = []

            for level in range(1, 7):
                item = table[id].get(level)
                if item:
                    result[id][stat].append(float(item.get(stat)))
                else:
                    result[id][stat].append(0)

            if not sum(result[id][stat]):
                del result[id][stat]

    return result

def extractPramList(proud):
    paramList = {}
    for prop in proud['addProps']:
        type = prop.get('propType')
        if type != "FIGHT_PROP_NONE" and prop.get('value', 0):
            tmp = static.getStatByName(type)
            if tmp in paramList:
                print(f'Param already exists <{tmp}>')
            paramList[tmp]= float(static.getStatValue(type, prop.get('value', 0)))
    return paramList

def prepare_data():
    result = {}

    skills_byName= {}
    skills_byOpenConfig= []

    # нужно найти все навыки оружия, проверить их названия и описание, если названия совпадают, то объединить
    # если при совпадающих названиях описание расходится, то разделить

    tpl_names = lang_data['eng']['names']
    tpl_keywords = lang_data['eng']['keywords']
    ascensions = parse_ascension()

    for weapon in weapon_data.get_list():
        if weapon['id'] in IGNORED_WEAPONS:
            continue

        rarity = weapon.get('rankLevel', 0)
        if rarity < 3:
            continue

        # print('%s: "%s",' % (item['Id'], lang.get(str(item['NameTextMapHash']))))

        # name = '%s_%s' % (re.sub(r'UI_EquipIcon_', '', item['Icon']), str(item['Id']))
        wrong_name = False
        name = weapon_names.get(weapon['id'])
        if not name:
            name = convert_id(lang_eng.get(weapon['nameTextMapHash']))
            print(f"weapon ID not found: {weapon['id']} used: {name}")
            print(f"       icon name: {weapon['icon']}.png")
            wrong_name = True

        resultItem = {
            'id': name,
            'rarity': rarity,
            'gameId': weapon['id'],
            'weapon': WEAPON_TYPES[weapon['weaponType']],
            'stats': [],
            'refines': [],
            'nameTextMapHash': weapon['nameTextMapHash'],
        }
        values = {}
        grows = {}

        for prop in weapon.get('weaponProp', []):
            if not 'initValue' in prop: continue

            prop_type = prop.get('propType')
            if not prop_type: continue

            stat = static.getStatByName(prop_type)
            value = static.getStatValue(prop_type, prop.get('initValue'))

            values[stat] = value
            grow = static.getCurveName(prop.get('type'))
            if grow: grows[stat] = grow

        ascension = ascensions.get(weapon.get('weaponPromoteId'), {})

        stats = set(values.keys())
        stats = stats.union(list(ascension.keys()))

        for stat in sorted(stats):
            resStat = {
                'stat': stat,
                'base': static.trimValue(values.get(stat, 0)),
            }

            if stat in ascension:
                ascList = [static.trimValue(x) for x in ascension[stat]]
                ascId = accumulator.storeList('enumAscensionTables', ascList)
                resStat['ascension'] = ascId


            if stat in grows:
                resStat['scale'] = 'weaponStatScales.'+ grows[stat]

            resultItem['stats'].append(accumulator.storeDict('enumStatTables', resStat, accumulator.convertStatToKey(stat) + str(round(float(resStat['base'])))))

        for id in weapon['skillAffix']:
            if not id: continue
            #if id in affixSet: continue
            try:
                affixList = weapon_skill_data.get_list_by_field('id', id)
                affixList = sorted(affixList, key=lambda d: d['level'])

                skill_id = convert_id(lang_eng.get(affixList[0]['nameTextMapHash']))

                elem = {
                    'skill_name': f'{name.lower()}',
                    'skill_title': skill_id,
                    'skillAffix': id,
                    'params': {}
                }
                tpl_weapon = getattr(weapons_tpl, f'{skill_id}_eng', None) or getattr(weapons_tpl, skill_id, None)
                if tpl_weapon:
                    # если есть описание навыка, то проверим совпадает ли оно с другими навыками
                    item_descr = lang_eng.get(affixList[0]['descTextMapHash'])
                    item_descr = tpl_keywords.process(item_descr)['descr'][0]
                    item_descr = common_tpl.process(item_descr)['descr'][0]
                    item_descr = tpl_names.process(item_descr)['descr'][0]
                    item_descr = tpl_weapon.process(item_descr)['descr'][0]
                    elem['descr'] = item_descr
                    if not skill_id in skills_byName:
                        skills_byName[skill_id] = []
                    skills_byName[skill_id].append(elem)
                else:
                    skills_byOpenConfig.append(elem)

                valList = []
                namedList = []
                for i in affixList:
                    namedList.append(extractPramList(i))
                    valList.append(i['paramList'])

                tmpCount = 1
                for i in range(len(valList[0])):
                    l = []
                    for v in valList:
                        l.append(v[i])
                    if all(x == 0 for x in l): continue
                    elem['params'][f'param{tmpCount}'] = l
                    tmpCount+= 1
                for i in namedList[0]:
                    l = []
                    for v in namedList:
                        l.append(v[i])
                    if all(x == 0 for x in l): continue
                    elem['params'][i] = l

                for idx in elem['params']:
                    elem['params'][idx] = shrink_table(elem['params'][idx])

                resultItem["refines"].append(elem)
            except Exception as e:
                print(f'error on talent {skill_id}')
                print(e)

        # if wrong_name:
        #     print(resultItem["refines"])

        weapon_id = convert_id(lang_eng.get(weapon['nameTextMapHash']))

        result[weapon_id] = resultItem

    for obj in skills_byOpenConfig:
        obj['skill'] = obj['skill_name']
        print(obj['skill'])
    print(f'not found skill name: {len(skills_byOpenConfig)}')

    for (key, lst) in skills_byName.items():
        if len(lst) > 1:
            prc = {}
            for v in lst:
                if v['descr'] in prc:
                    prc[v['descr']]+=1
                else:
                    prc[v['descr']] = 1
            if len(prc.keys()) > 1:
                if len(prc.keys()) == len(lst):
                    for v in lst:
                        v['skill'] = v['skill_name']
                        print(f"{v['skill_name']} -> {v['skill_title']}")
                else:
                    k = max(prc.items(), key=lambda item: item[1])
                    print(f"{lst[0]['skill_title']} = {k[1]}")
                    second = False
                    for v in lst:
                        if v['descr'] == k[0]:
                            v['skill'] = v['skill_title']
                            v['notneed'] = second
                            second = True
                        else:
                            v['skill'] = v['skill_name']
                            print(f"     broken: {v['skill_name']}")
            else:
                print(f"{lst[0]['skill_title']} = {len(lst)}")
                lst[0]['skill'] = lst[0]['skill_title']
                for v in lst[1:]:
                    v['skill'] = v['skill_title']
                    v['notneed'] = True
        else:
            lst[0]['skill'] = lst[0]['skill_title']
            print(f"{lst[0]['skill_name']} -> {lst[0]['skill_title']}")

    return result

def print_StatTables(result):
    out  = open(out_dir + 'WeaponStatTables.js', 'w', encoding='utf-8')
    out.write('// This file is auto generated\n')
    out.write('import { StatTable } from "../../classes/StatTable";\n')
    out.write('import { StatTableAscensionScale } from "../../classes/StatTable/Ascension/Scale";\n')
    out.write('import { weaponStatScales } from "./WeaponScale";\n\n')
    ascTables = accumulator.get('enumAscensionTables')
    scaleTables = accumulator.get('enumStatTables')

    out.write('const enumAscensionTables = {\n')
    for tableName in ascTables:
        out.write("\tn"+ str(tableName) +": new StatTable('', ["+ ', '.join(ascTables[tableName]) +"]),\n")
    out.write("};\n\n")

    out.write('const enumStatTables = {\n')
    for scaleName in scaleTables:
        scaleItem = scaleTables[scaleName]
        out.write("\t"+ scaleName +": new StatTableAscensionScale({\n")
        out.write("\t\tstat: '%s',\n" % (scaleItem['stat']))
        out.write("\t\tbase: %s,\n" % (scaleItem['base']))

        if 'ascension' in scaleItem:
            out.write("\t\tascension: %s,\n" % scaleItem['ascension'])

        if 'scale' in scaleItem:
            out.write("\t\tscale: %s,\n" % scaleItem['scale'])

        out.write("\t}),\n")
    out.write("};\n\n")

    out.write('export const weaponStatTables = {\n')
    for item in result:
        out.write('\t%s: [\n' % item['id'])
        for table in item['stats']:
            if isinstance(table, str):
                out.write("\t\t%s,\n" % table)
                continue
        out.write("\t],\n")
    out.write("};\n")

    out.write('export const weaponDataTable = {\n')
    for item in result:
        out.write('\t%s: {\n' % item['id'])
        out.write(f'\t\trarity: {item["rarity"]},\n')
        out.write(f'\t\tweapon: "{item["weapon"]}",\n')
        out.write(f'\t\tgameId: {item["gameId"]},\n')
        for table in item['refines']:
            out.write(f"\t\t{table['skill']}: {{\n")
            for idx in table['params']:
                out.write(f"\t\t\t{idx}: {table['params'][idx]},\n")
            out.write("\t\t},\n")
        out.write("\t},\n")
    out.write("};\n")

def print_Texts(weapons):
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

        for v in weapon['refines']:
            id = v['skillAffix']
            if not id:
                continue

            try:
                skill = weapon_skill_data.get_item_by_field('id', id)
                # skill_id = convert_id(lang_eng.get(skill['nameTextMapHash']))
                skill_id = v['skill']
                skill_title = v['skill_title']

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
                    item_descr[lang_name] = common_tpl.process(item_descr[lang_name])['descr'][0]
                    item_descr[lang_name] = tpl_names.process(item_descr[lang_name])['descr'][0]

                    tpl_weapon = getattr(weapons_tpl, f'{weapon_id}_{lang_name}', None) or getattr(weapons_tpl, weapon_id, None) or \
                        getattr(weapons_tpl, f'{skill_title}_{lang_name}', None) or getattr(weapons_tpl, skill_title, None)
                    if tpl_weapon:
                        has_tpl = True

                        values = tpl_weapon.process(item_descr[lang_name])
                        item_descr[lang_name] = values['descr'];
                        for i in range(0, len(item_descr[lang_name])):
                            if item_descr[lang_name][i]:
                                item_descr[lang_name][i] = postprocess.process(item_descr[lang_name][i])['descr'][0]

                        for i in values['names']:
                            item_name[lang_name].append(i.replace('$$$name$$$', item_name[lang_name][0]));

                    if not isinstance(item_descr[lang_name], list):
                        item_descr[lang_name] = [postprocess.process(item_descr[lang_name])['descr'][0]]

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
            except Exception as e:
                print(f'error on talent {skill_id}')
                print(e)



    CsvDumper().dump(result_names, 'weapon_names.csv')
    #CsvDumper().dump(result_names, '../../strings_casino/weapon_names.csv')
    if result_talents:
        CsvDumper().dump(result_talents, 'weapon_talents.csv')
    TextDumper().dump(texts, 'weapon_texts.txt')

def out_all():
    data = prepare_data()
    print_Texts(data)
    print_StatTables(sorted(data.values(), key= lambda k: k['gameId']))

out_all()

