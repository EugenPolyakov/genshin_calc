import re
from .genshin.utils import to_float32

weapon_stamina_cost = {
    'WEAPON_CLAYMORE': 40,
    'WEAPON_POLE': 25,
    'WEAPON_CATALYST': 50,
    'WEAPON_BOW': 0,
    'WEAPON_SWORD_ONE_HAND': 20,
}

WEAPON_TYPES = {
    'WEAPON_SWORD_ONE_HAND': 'sword',
    'WEAPON_CLAYMORE': 'claymore',
    'WEAPON_BOW': 'bow',
    'WEAPON_CATALYST': 'catalyst',
    'WEAPON_POLE': 'polearm',
}

stat_info = {
    'FIGHT_PROP_BASE_HP': {
        'name': 'hp_base',
    },
    'FIGHT_PROP_HP': {
        'name': 'hp',
    },
    'FIGHT_PROP_HP_PERCENT': {
        'name': 'hp_percent',
        'scale': 100,
    },
    'FIGHT_PROP_BASE_DEFENSE': {
        'name': 'def_base',
    },
    'FIGHT_PROP_DEFENSE': {
        'name': 'def',
    },
    'FIGHT_PROP_DEFENSE_PERCENT': {
        'name': 'def_percent',
        'scale': 100,
    },
    'FIGHT_PROP_BASE_ATTACK': {
        'name': 'atk_base',
    },
    'FIGHT_PROP_ATTACK': {
        'name': 'atk',
    },
    'FIGHT_PROP_ATTACK_PERCENT': {
        'name': 'atk_percent',
        'scale': 100,
    },
    'FIGHT_PROP_CRITICAL': {
        'name': 'crit_rate_base',
        'scale': 100,
    },
    'FIGHT_PROP_CRITICAL_HURT': {
        'name': 'crit_dmg_base',
        'scale': 100,
    },
    'FIGHT_PROP_ELEMENT_MASTERY': {
        'name': 'mastery_base',
    },
    'FIGHT_PROP_CHARGE_EFFICIENCY': {
        'name': 'recharge_base',
        'scale': 100,
    },
    'FIGHT_PROP_ICE_ADD_HURT': {
        'name': 'dmg_cryo_base',
        'scale': 100,
    },
    'FIGHT_PROP_WATER_ADD_HURT': {
        'name': 'dmg_hydro_base',
        'scale': 100,
    },
    'FIGHT_PROP_ROCK_ADD_HURT': {
        'name': 'dmg_geo_base',
        'scale': 100,
    },
    'FIGHT_PROP_FIRE_ADD_HURT': {
        'name': 'dmg_pyro_base',
        'scale': 100,
    },
    'FIGHT_PROP_FIRE_SUB_HURT': {
        'name': 'dmg_pyro',
        'scale': 100,
    },
    'FIGHT_PROP_WIND_ADD_HURT': {
        'name': 'dmg_anemo_base',
        'scale': 100,
    },
    'FIGHT_PROP_WIND_SUB_HURT': {
        'name': 'dmg_anemo',
        'scale': 100,
    },
    'FIGHT_PROP_ELEC_ADD_HURT': {
        'name': 'dmg_electro_base',
        'scale': 100,
    },
    'FIGHT_PROP_ELEC_SUB_HURT': {
        'name': 'dmg_electro',
        'scale': 100,
    },
    'FIGHT_PROP_GRASS_ADD_HURT': {
        'name': 'dmg_dendro_base',
        'scale': 100,
    },
    'FIGHT_PROP_PHYSICAL_ADD_HURT': {
        'name': 'dmg_phys_base',
        'scale': 100,
    },
    'FIGHT_PROP_PHYSICAL_SUB_HURT': {
        'name': 'dmg_phys',
        'scale': 100,
    },
    'FIGHT_PROP_HEAL_ADD': {
        'name': 'healing_base',
        'scale': 100,
    },

    'FIGHT_PROP_ADD_HURT': {
        'name': 'dmg_all',
        'scale': 100,
    },
    'FIGHT_PROP_SHIELD_COST_MINUS_RATIO': {
        'name': 'shield',
        'scale': 100,
    },
}

curve_names_to_stat = {
    'GROW_CURVE_HP_S4':     's4hp',
    'GROW_CURVE_ATTACK_S4': 's4atk',
    'GROW_CURVE_HP_S5':     's5hp',
    'GROW_CURVE_ATTACK_S5': 's5atk',

    'GROW_CURVE_ATTACK_101': 'atk_1_1',
    'GROW_CURVE_ATTACK_102': 'atk_1_2',
    'GROW_CURVE_ATTACK_103': 'atk_1_3',
    'GROW_CURVE_ATTACK_104': 'atk_1_4',
    'GROW_CURVE_ATTACK_105': 'atk_1_5',
    'GROW_CURVE_ATTACK_201': 'atk_2_1',
    'GROW_CURVE_ATTACK_202': 'atk_2_2',
    'GROW_CURVE_ATTACK_203': 'atk_2_3',
    'GROW_CURVE_ATTACK_204': 'atk_2_4',
    'GROW_CURVE_ATTACK_205': 'atk_2_5',
    'GROW_CURVE_ATTACK_301': 'atk_3_1',
    'GROW_CURVE_ATTACK_302': 'atk_3_2',
    'GROW_CURVE_ATTACK_303': 'atk_3_3',
    'GROW_CURVE_ATTACK_304': 'atk_3_4',
    'GROW_CURVE_ATTACK_305': 'atk_3_5',

    'GROW_CURVE_CRITICAL_101': 'crt_1_1',
    'GROW_CURVE_CRITICAL_201': 'crt_2_1',
    'GROW_CURVE_CRITICAL_301': 'crt_3_1',
}

names_mapping = {
    '1-Hit DMG': 'normal_hit_1',
    '2-Hit DMG': 'normal_hit_2',
    '3-Hit DMG': 'normal_hit_3',
    '4-Hit DMG': 'normal_hit_4',
    '5-Hit DMG': 'normal_hit_5',
    '6-Hit DMG': 'normal_hit_6',
    'Normal Attack DMG': 'normal_hit',
    'Aimed Shot': 'aimed',
    'Fully-Charged Aimed Shot': 'charged_aimed',
    #'Aimed Shot Charge Level 1': 'charged_aimed',
    'Party Heal on Hit': 'party_heal_on_hit',
    'Plunge DMG': 'plunge',
    'Low/High Plunge DMG': 'plunge_low/plunge_high',
    'Charged Attack': 'charged_hit',
    'Charged Attack DMG': 'charged_hit',
    'Charged Attack Stamina Cost': 'stamina_cost',
    'Charged Attack Spinning DMG': 'charged_spin',
    'Charged Attack Cyclic DMG': 'charged_spin',
    'Charged Attack Loop DMG': 'charged_spin',
    'Charged Attack Final DMG': 'charged_final',
    'Charge Level 1 DMG': 'charge_level_1',
    'Charge Level 2 DMG': 'charge_level_2',
    'Additional Elemental DMG': 'anemoskill_dmg',
    'Max Duration': 'max_duration',
    'CD': 'cd',
    'Skill CD': 'cd',
    'Duration': 'duration',
    'Energy Cost': 'energy_cost',
    'Elemental Burst DMG': 'burst_dmg',
    'Burst DMG': 'burst_dmg',
    'Skill DMG': 'skill_dmg',
    'Press CD': 'cd_press',
    'Press DMG': 'press_dmg',
    'Press Skill DMG': 'press_dmg',
    'Hold CD': 'cd_hold',
    'Hold DMG': 'hold_dmg',
    'Hold Skill DMG': 'hold_dmg',
    'Heal': 'heal',
    'Healing': 'heal',
    'Cast Healing': 'heal',
    'Regeneration': 'heal_dot',
    'Continuous Healing': 'heal_dot',
    'Continuous Regeneration': 'heal_dot',
    'HP Regeneration Over Time': 'heal_dot',
    'Continuous Regeneration Per Sec': 'heal_dot',
    'Shield Duration': 'shield_duration',
    'HP Cost': 'hp_cost',
    'DMG Absorption': 'shield_absorption',
    'Shield DMG Absorption': 'shield_absorption',
    'Max Shield DMG Absorption': 'shield_max_absorption',
    'Max CD': 'max_cd',
    'Explosion DMG': 'explosion_dmg',
    'Activation Stamina Consumption': 'sprint_activation_cost',
    'Stamina Drain': 'sprint_stamina_drain',
    'DoT': 'dot_dmg',
    'DMG Reduction': 'dmg_reduction',
    'Continuous Field DMG': 'field_dmg',

    'Spiritbreath Thorn DMG': 'spiritbreath_thorn_dmg',
    'Surging Blade DMG': 'surging_blade_dmg',
    'Surging Blade Interval': 'surging_blade_interval',
    'Spiritbreath Thorn Interval': 'spiritbreath_thorn_interval',
    'Spiritbreath Thorn DMG Interval': 'spiritbreath_thorn_interval',

    'Nightsoul Point Limit': 'nightsoul_point_limit',

# skiped
    'Spiritbreath Thorn/Surging Blade DMG Interval': 'spiritbreath_thorn_surging_blade_dmg',
    'Spiritbreath Thorn/Surging Blade DMG': 'spiritbreath_thorn_surging_blade_dmg_interval',
    'Fiery Passion Low/High Plunge DMG': 'fiery_passion_low_high_plunge_dmg',
    '0/1/2/3 Void Rift Absorption DMG Bonus': '0_1_2_3_void_rift_absorption_dmg_bonus',
    'Shield Base Absorption': 'shield_base_absorption',
    'Additional Shield Absorption': 'additional_shield_absorption',
    'Stone Stele/Resonance DMG': 'stone_stele_resonance_dmg',
    'Pyro: DMG Bonus': 'pyro_dmg_bonus',
    'Electro: Trigger Interval Decrease': 'electro_trigger_interval_decrease',
    'Hydro: Duration Extension': 'hydro_duration_extension',
    'Sword Dance/Whirling Steps 1-Hit DMG': 'sword_dance_whirling_steps_1_hit_dmg',
    'Sword Dance/Whirling Steps 2-Hit DMG': 'sword_dance_whirling_steps_2_hit_dmg',
    'Luminous Illusion/Water Wheel DMG': 'luminous_illusion_water_wheel_dmg',
    'Resolve Bonus': 'resolve_bonus',
}

char_ids = {
    # 10000001
    10000002: 'Ayaka',
    10000003: 'Jean',
    # 10000005: 'Traveler', # Boy
    10000006: 'Lisa',
    # 10000007: 'Traveler', # Girl
    702: 'TravelerPyro',
    503: 'TravelerHydro',
    504: 'TravelerAnemo',
    # 705: 'TravelerCryo',
    706: 'TravelerGeo',
    707: 'TravelerElectro',
    508: 'TravelerDendro',
    10000014: 'Barbara',
    10000015: 'Kaeya',
    10000016: 'Diluc',
    10000020: 'Razor',
    10000021: 'Amber',
    10000022: 'Venti',
    10000023: 'Xiangling',
    10000024: 'Beidou',
    10000025: 'Xingqiu',
    10000026: 'Xiao',
    10000027: 'Ningguang',
    10000029: 'Klee',
    10000030: 'Zhongli',
    10000031: 'Fischl',
    10000032: 'Bennett',
    10000033: 'Tartaglia',
    10000034: 'Noelle',
    10000035: 'Qiqi',
    10000036: 'Chongyun',
    10000037: 'Ganyu',
    10000038: 'Albedo',
    10000039: 'Diona',
    10000041: 'Mona',
    10000042: 'Keqing',
    10000043: 'Sucrose',
    10000044: 'Xinyan',
    10000045: 'Rosaria',
    10000046: 'Hutao',
    10000047: 'Kazuha',
    10000048: 'YanFei',
    10000049: 'Yoimiya',
    10000050: 'Thoma',
    10000051: 'Eula',
    10000052: 'RaidenShogun',
    10000053: 'Sayu',
    10000054: 'Kokomi',
    10000055: 'Gorou',
    10000056: 'Sara',
    10000057: 'Itto',
    10000058: 'YaeMiko',
    10000059: 'Heizou',
    10000060: 'Yelan',
    10000061: 'Kirara',
    10000062: 'Aloy',
    10000063: 'Shenhe',
    10000064: 'YunJin',
    10000065: 'Kuki',
    10000066: 'Ayato',
    10000067: 'Collei',
    10000068: 'Dori',
    10000069: 'Tighnari',
    10000070: 'Nilou',
    10000071: 'Cyno',
    10000072: 'Candace',
    10000073: 'Nahida',
    10000074: 'Layla',
    10000075: 'Wanderer',
    10000076: 'Faruzan',
    10000077: 'Yaoyao',
    10000078: 'Alhaitham',
    10000079: 'Dehya',
    10000080: 'Mika',
    10000081: 'Kaveh',
    10000082: 'Baizhu',
    10000083: 'Lynette',
    10000084: 'Lyney',
    10000085: 'Freminet',
    10000086: 'Wriothesley',
    10000087: 'Neuvillette',
    10000088: 'Charlotte',
    10000089: 'Furina',
    10000090: 'Chevreuse',
    10000091: 'Navia',
    10000092: 'Gaming',
    10000093: 'Xianyun',
    10000094: 'Chiori',
    10000095: 'Sigewinne',
    10000096: 'Arlecchino',
    10000097: 'Sethos',
    10000098: 'Clorinde',
    10000099: 'Emilie',
    10000100: 'Kachina',
    10000101: 'Kinich',
    10000102: 'Mualani',
    10000103: 'Xilonen',
    10000104: 'Chasca',
    10000105: 'Ororon',
    10000106: 'Mavuika',
    10000107: 'Citlali',
    10000108: 'LanYan',
    10000109: 'Mizuki',
    10000110: 'Iansan',
    10000111: 'Varesa',
    10000112: 'Escoffier',
    10000113: 'Ifa',
    10000114: 'Skirk',
    10000115: 'Dahlia',
    10000116: 'Ineffa',
    10000117: 'MannequinBoy',
    10000118: 'MannequinGirl',
    10000119: 'Lauma',
    10000120: 'Flins',
    10000121: 'Aino',
    10000122: 'Nefer',
    10000124: 'Jahoda',
}

def shrink_table(data):
    last = None
    for index in reversed(range(len(data))):
        val = data[index]

        if last is None:
            last = val
            continue

        if val == last:
            data.pop()
            continue

        break

    return data

def trimValue(value, scale = None):
    value = to_float32(float(value))
    if scale: value *= scale
    #value = '%.8f' % value
    value = str(value)
    if value.find('.') >= 0:
        return re.sub(r"\.?0+$", '', value)
    return value

def trimToVal(value, scale = None):
    val = float(trimValue(value, scale))
    if val.is_integer():
        return int(val)
    return val

def getStaminaCost(weapon_type):
    return weapon_stamina_cost.get(weapon_type, 0);

def getStatByName(name):
    if name in stat_info:
        return stat_info[name]['name']
    print('Unknown stat '+ name)
    return ''

def getStatValue(name, value):
    stat = getStatByName(name)
    if stat == '':
        return 0

    scale = stat_info[name].get('scale', 1)
    return trimValue('%.10f' % (to_float32(value) * scale))

def getCurveName(type):
    name = curve_names_to_stat.get(type)
    if not name:
        print(type)
    return name

from unicodedata import normalize

def getCharById(id, name):
    result = char_ids.get(id)
    if not result and name:
        result = normalize('NFKD', name).encode('ASCII', 'ignore').decode("utf-8")

        result = re.sub(r' +', '', result, flags=re.IGNORECASE)
        return result
    return result

def fix_name(name):
    name = re.sub(r'\#?{LAYOUT_PC#(.*?)\}', '\g<1>', name)
    name = re.sub(r'\#?{.*?}', '', name)
    return name

def extractPramList(proud):
    paramList = []
    for prop in proud['addProps']:
        type = prop.get('propType')
        if type != "FIGHT_PROP_NONE" and prop.get('value', 0):
            paramList.append(trimToVal(prop.get('value', 0)))
    return paramList

