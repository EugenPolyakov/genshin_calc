from os import name
from ..template import WeaponTemplate

hope_beyond_the_peaks = WeaponTemplate(
    sentences=[
        ['15:ignore', '12:dmg_skill'],
        ['12:dmg_skill', '8:ignore'],
    ],
    results=[
        [0],
        [1],
    ],
)

trappers_pride = WeaponTemplate(
    sentences=[
        ['15:ignore'],
        ['16:text_percent_dmg'],
        ['18:ignore', '7:ignore'],
    ],
)

the_weight_of_falling_branches = WeaponTemplate(
    patterns=[
        ('; After', '. After'),
    ],
    sentences=[
        ['16:crit_rate_plunge'],
        ['16:dmg_normal', '10:ignore'],
    ],
    results=[
        [0],
        [1],
    ],
)

halcyon_years_unending_rus = WeaponTemplate(
    names=['защиту', 'защиты'],
    sentences=[
        ['8:def_percent', '10:dmg_pyro'],
        ['6:ignore', '2:ignore', '0.1:ignore'],
        ['1000:ignore', '8:text_percent|8', '15:ignore'],
        ['25.6:text_percent_max|25.6'],
    ],
    results=[
        [0, 1],
        [2, 3],
        ['Песнь патруля пиков (Защита)'],
    ],
    extracted_names=[2],
)

halcyon_years_unending_eng = WeaponTemplate(
    sentences=[
        ['8:def_percent', '10:dmg_pyro', '6:ignore'],
        ['2:ignore'],
        ['0.1:ignore'],
        ['2:ignore', '2:ignore', '8:text_percent|8', '1000:ignore', '25.6:text_percent_max|25.6', '15:ignore'],
    ],
    results=[
        [0, 1, 2],
        [3],
        ['Peak Patrol Song (DEF)'],
    ],
    extracted_names=[2],
)

sunset_reignites_the_dawn = WeaponTemplate(
    patterns=[
        ('<br>', '<br>\n'),
    ],
    names=['Палящим сиянием', 'Палящего сияния', 'обычной'],
    sentences=[
        ['20:crit_dmg', '28:atk_percent', '6:ignore'],
        ['1:ignore', '10:ignore'],
        ['2:ignore'],
        ['1:ignore', '1:ignore', '6:ignore'],
        ['75:'],
    ],
    results=[
        [0, 1, 2, 3],
        [4],
    ],
)

sunset_reignites_the_dawn_eng = WeaponTemplate(
    patterns=[
        ('<br>', '<br>\n'),
    ],
    names=['Scorching Brilliance'],
    sentences=[
        ['20:crit_dmg', '28:atk_percent', '6:ignore'],
        ['10:ignore'],
        ['2:ignore'],
        ['6:ignore'],
        ['75:'],
    ],
    results=[
        [0, 1, 2, 3],
        [4],
    ],
)

deathly_pact = WeaponTemplate(
    names=['урон', 'DMG'],
    sentences=[
        ['20:crit_dmg'],
        ['16:dmg_all', '6:ignore'],
        ['3:ignore'],
    ],
    results=[
        [0],
        [1, 2],
    ],
)

oppidan_ambush = WeaponTemplate(
    names=['урон'],
    sentences=[
        ['2:dmg_all'],
        ['20:text_percent_max'],
        ['4:ignore', '4:text_percent_reduce', '0:ignore'],
    ],
)

oppidan_ambush_eng = WeaponTemplate(
    names=['DMG'],
    sentences=[
        ['2:dmg_all', '20:text_percent_max'],
        ['4:ignore', '4:text_percent_reduce', '0:ignore'],
    ],
)

iwakura_succession = WeaponTemplate(
    names=['семя наследия', 'Семя наследия', 'семян наследия'],
    sentences=[
        ['1:ignore'],
        ['1:ignore', '5:ignore'],
        ['30:ignore'],
        ['3:ignore'],
        ['2:ignore', '6:text_decimal'],
    ],
)

iwakura_succession_eng = WeaponTemplate(
    names=['Succession Seed', 'Succession Seeds'],
    sentences=[
        ['1:ignore'],
        ['5:ignore'],
        ['30:ignore'],
        ['3:ignore'],
        ['2:ignore', '6:text_decimal'],
    ],
)

strong_willed = WeaponTemplate(
    names=['урон', 'обычной'],
    sentences=[
        ['12:dmg_normal'],
        ['0.1:ignore', '8:dmg_normal'],
        ['5:ignore'],
    ],
    results=[
        [1, 2],
        [0],
    ],
)

strong_willed_eng = WeaponTemplate(
    names=['DMG'],
    sentences=[
        ['12:dmg_normal'],
        ['8:dmg_normal', '0.1:ignore', '5:ignore'],
    ],
    results=[
        [1],
        [0],
    ],
)

the_cleansing_form = WeaponTemplate(
    names=['урон', 'DMG'],
    sentences=[
        ['16:hp_percent'],
        ['20:dmg_all'], 
        [],
    ],
    results=[
        [0],
        [1, 2],
    ],
)

falcons_defiance_eng = WeaponTemplate(
    sentences=[
        ['20:atk_percent'],
        ['100:text_percent_hp', '200:text_percent_dmg'],
        ['15:ignore'],
    ],
    results=[
        [0],
        [1, 2],
    ],
)

falcons_defiance = WeaponTemplate(
    sentences=[
        ['20:atk_percent'],
        [],
        ['100:text_percent_hp', '200:text_percent_dmg'],
        ['15:ignore'],
    ],
    results=[
        [0],
        [1, 2, 3],
    ],
)

tupacs_grip_eng = WeaponTemplate(
    sentences=[
        ['40:text_percent_dmg'],
        ['15:ignore'],
    ],
)

tupacs_grip = WeaponTemplate(
    sentences=[
        ['40:text_percent_dmg'],
        [],
        ['15:ignore'],
    ],
)

the_moonring_sighted = WeaponTemplate(
    sentences=[
        ['24:atk_percent', '12:ignore'],
        ['1:format{text_number_f=1|{value}}:ignore', '2:format{text_number_f=2|{value}}:ignore', 
         '20:format{text_number_f=1|{value}}:text_percent_1',
         '48:format{text_number_f=2|{value}}:text_percent_2',
         '10:format{text_number_f=1|{value}}:text_percent_3',
         '24:format{text_number_f=2|{value}}:text_percent_4'],
    ],
    results=[
        [0],
        [1],
    ],
)

the_moonring_sighted_eng = WeaponTemplate(
    sentences=[
        ['12:ignore', '24:atk_percent'],
        ['1:format{text_number_f=1|{value}}:ignore', '2:format{text_number_f=2|{value}}:ignore', 
         '20:format{text_number_f=1|{value}}:text_percent_1',
         '48:format{text_number_f=2|{value}}:text_percent_2',
         '10:format{text_number_f=1|{value}}:text_percent_3',
         '24:format{text_number_f=2|{value}}:text_percent_4'],
    ],
    results=[
        [0],
        [1],
    ],
)

whitehills_bestowal = WeaponTemplate(
    names=['энергия'],
    sentences=[
        ['12:ignore', '24:atk_percent'],
        ['0:ignore', '24:atk_percent', '40:crit_dmg'],
    ],
    results=[
        [0],
        [1],
    ],
)

bane_of_flame_and_water = WeaponTemplate(
    names=['урон', 'DMG'],
    patterns=[
        ('врагов', 'tab{enemy:врагов}'),
        ('opponents', 'tab{enemy:opponents}'),
    ],
    sentences=[
        ['20:dmg_all'],
    ],
)

tales_of_the_tundra = WeaponTemplate(
    sentences=[
        ['3:ignore', '120:mastery'],
    ],
)

azure_skies = WeaponTemplate(
    names=['обычной'],
    sentences=[
        ['6:ignore', '8:dmg_normal', '6:dmg_charged'],
        ['3:ignore', '0.3:ignore'],
    ],
)

azure_skies_eng = WeaponTemplate(
    sentences=[
        ['6:ignore', '8:dmg_normal', '6:dmg_charged'],
        ['3:ignore'],
        ['0.3:ignore'],
    ],
)

desert_watch = WeaponTemplate(
    sentences=[
        ['20:atk_percent', '8:ignore'],
        ['20:atk_percent', '8:ignore'],
        [],
        [],
        ['32:hp_percent'],
    ],
    results=[
        [0, 1, 2],
        [3, 4],
    ]
)

desert_watch_eng = WeaponTemplate(
    sentences=[
        ['20:atk_percent', '8:ignore'],
        ['20:atk_percent', '8:ignore'],
        ['2:ignore'],
        ['32:hp_percent'],
    ],
    results=[
        [0, 1, 2],
        [3],
    ]
)

bane_of_the_soft = WeaponTemplate(
    names=['урон', 'DMG', 'слаймам', 'slimes'],
    sentences=[
        ['40:dmg_all'],
    ],
)

diffusing_boundary = WeaponTemplate(
    names=['обычной'],
    sentences=[
        ['20:dmg_normal', '8:crit_rate_normal'],
    ],
)

extinguishing_precept = WeaponTemplate(
    names=['урона всеми элементами', 'Совершенствование', 'Совершенствования', 'атаки', 'Consummation'],
    sentences=[
        ['12:dmg_pyro'],
        ['20:ignore', '3.2:atk_percent'],
        ['6:ignore'],
        []
    ],
    results=[
        [0],
        [1, 2],
        [3],
    ]
)

golden_blood_tide = WeaponTemplate(
    sentences=[
        ['16:atk_percent'],
        ['4:ignore', '16:dmg_normal', '14:dmg_charged'],
        ['3:ignore', '1:ignore', '0.3:ignore'],
        ['3:ignore', '8:atk_speed_normal'],
    ],
    results=[
        [0],
        [1, 2],
        [3],
    ]
)

golden_blood_tide_eng = WeaponTemplate(
    sentences=[
        ['16:atk_percent'],
        ['16:dmg_normal', '14:dmg_charged', '4:ignore'],
        ['3:ignore'],
        ['0.3:ignore'],
        ['3:ignore', '8:atk_speed_normal'],
    ],
    results=[
        [0],
        [1, 2, 3],
        [4],
    ]
)

spotless_heart = WeaponTemplate(
    names=['защиты', 'DMG'],
    sentences=[
        ['40:text_percent'],
        ['1.5:ignore', '0.1:ignore'],
    ],
)

crag_chiseled_forge = WeaponTemplate(
    sentences=[
        ['40:mastery'],
        ['18:ignore', '2:ignore'],
    ],
)

crag_chiseled_forge_eng = WeaponTemplate(
    sentences=[
        ['40:mastery', '18:ignore'],
        ['2:ignore'],
    ],
)

infusion_arrow = WeaponTemplate(
    names=['обычной'],
    sentences=[
        ['4:atk_percent', '1.2:atk_speed_normal', '6:ignore'],
        ['4:ignore'],
        ['0.3:ignore'],
    ],
)

bane_of_water_and_ice = WeaponTemplate(
    names=['урон', 'DMG'],
    patterns=[
        ('врагов', 'tab{enemy:врагов}'),
        ('opponents', 'tab{enemy:opponents}'),
    ],
    sentences=[
        ['12:dmg_all'],
    ],
)

cloudfall_axiom = WeaponTemplate(
    sentences=[
        ['28:dmg_plunge|28', '20:ignore'],
        ['2.5:text_decimal|0|2'],
        ['1:ignore', '0.7:ignore'],
        []
    ],
    results=[
        [0],
        [1, 2, 3],
    ]
)

cloudfall_axiom_eng = WeaponTemplate(
    sentences=[
        ['28:dmg_plunge|28', '20:ignore'],
        ['2.5:text_decimal|0|2'],
        ['0.7:ignore'],
        []
    ],
    results=[
        [0],
        [1, 2, 3],
    ]
)

infusion_needle = WeaponTemplate(
    names=['обычные'],
    sentences=[
        ['5:ignore', '20:text_percent'],
    ],
)

infusion_needle_eng = WeaponTemplate(
    sentences=[
        ['20:text_percent', '5:ignore'],
    ],
)

ashen_suns_shadow = WeaponTemplate(
    sentences=[
        ['25:text_percent'],
        [],
        ['14:ignore'],
        ['12:dmg_all'],
        ['30:text_percent'],
        ['24:dmg_all'],
    ],
    results=[
        [0, 1, 2],
        [3],
        [4, 5],
    ]
)

ashen_suns_shadow_eng = WeaponTemplate(
    patterns=[
        ('; if the value', '\nif the value'),
    ],
    sentences=[
        ['25:text_percent'],
        ['14:ignore'],
        ['12:dmg_all'],
        ['30:text_percent', '24:dmg_all'],
    ],
    results=[
        [0, 1],
        [2],
        [3],
    ]
)

overloaded = WeaponTemplate(
    sentences=[
        ['20:atk_percent', '12:ignore'],
    ],
)

gladiator = WeaponTemplate(
    names=[
        'защита',
    ],
    patterns=[
        ('; если рядом', '\nЕсли рядом'),
    ],
    sentences=[
        ['2:ignore', '16:atk_percent'],
        ['2:ignore', '24:atk_percent'],
    ],
    results=[
        [0],
        [1],
        ['Гладиатор (рядом 2 врага и более)'],
        ['Гладиатор (рядом менее 2 врагов)'],
    ],
    extracted_names=[2, 3],
)

gladiator_eng = WeaponTemplate(
    sentences=[
        ['2:ignore', '16:atk_percent', '16:def_percent'],
        ['2:ignore', '24:atk_percent'],
    ],
    results=[
        [0],
        [1],
        ['Gladiator (at least 2 opponents nearby)'],
        ['Gladiator (less than 2 opponents nearby)'],
    ],
    extracted_names=[2, 3],
)

blunt_conclusion = WeaponTemplate(
    names=['Обычные'],
    sentences=[
        ['60:text_percent_dmg', '15:ignore'],
        ['3:ignore'],
    ],
)

blunt_conclusion_eng = WeaponTemplate(
    sentences=[
        ['60:text_percent_dmg'],
        ['15:ignore'],
        ['3:ignore'],
    ],
)

principle_of_equilibrium = WeaponTemplate(
    sentences=[
        ['8:text_number'],
        ['10:ignore'],
    ],
)

dodoventure = WeaponTemplate(
    patterns=[
        (', а попадания', '\nПопадания'),
    ],
    sentences=[
        ['16:dmg_charged', '6:ignore'],
        ['8:atk_percent', '6:ignore'],
    ],
    results=[
        [0],
        [1],
    ]
)

oath_of_qhapaq_nan = WeaponTemplate(
    sentences=[
        ['16:dmg_skill', '8:ignore'],
        []
    ],
)

the_parting_refrain_rus = WeaponTemplate(
    names=[
        'Талисман воспоминаний',
        'Талисмана воспоминаний',
        'Талисманы воспоминаний',
        'Тысячелетняя симфония',
    ],
    replace={'Их name{м':'name{М'},
    sentences=[
        [],
        ['60:mastery'],
        [],
        ['0.2:ignore'],
        ['12:ignore'],
        ['100:text_value|100', '20:text_percent|20'],
        ['20:ignore'],
        [],
    ],
    results=[
        [5, 7],
        [0, 1, '<br>', 2, 3, 4, 6],
        ['Тысячелетняя симфония: Прощальный гимн'],
    ],
    extracted_names=[2],
)

the_parting_refrain_eng = WeaponTemplate(
    names=[
        'Sigils of Remembrance',
        'Sigil of Remembrance',
        'Millennial Movement',
    ],
    replace={
        '. "Millennial Movement: Farewell Song" i': '. I',
    },
    sentences=[
        [],
        ['60:mastery'],
        [],
        ['0.2:ignore'],
        ['4:ignore', '12:ignore'],
        ['100:text_value|100', '20:text_percent|20'],
        ['20:ignore'],
        [],
    ],
    results=[
        [5, 7],
        [0, 1, '<br>', 2, 3, 4, 6],
        ['Millennial Movement: Farewell Song'],
    ],
    extracted_names=[2],
)

rapids = WeaponTemplate(
    sentences=[
        ['20:atk_percent', '12:ignore'],
    ],
)

byakuya_kougetsu = WeaponTemplate(
    names=['Энергию'],
    sentences=[
        ['10:healing', '1:normal_base_hp_percent'],
        [],
        ['12:ignore', '0.6:'],
        ['0.1:ignore'],
    ],
    results=[
        [0, 1],
        [2, 3],
    ]
)

byakuya_kougetsu_eng = WeaponTemplate(
    sentences=[
        ['10:healing', '1:normal_base_hp_percent'],
        ['12:ignore', '0.6:'],
        ['0.1:ignore'],
    ],
    results=[
        [0],
        [1, 2],
    ]
)

echo = WeaponTemplate(
    names=[
        'обычной', 'Око сознания', 'Bolt of Perception',
    ],
    sentences=[
        ['50:text_percent_chance', '240:text_percent_dmg'],
        ['4:ignore'],
        ['12:text_cd'],
    ],
)

windfall = WeaponTemplate(
    names=[
        'Критические атаки', 'CRIT Hits', 'Elemental Particles', 'элементальные частицы',
    ],
    sentences=[
        ['60:text_percent', '6:ignore'],
        ['12:text_cooldown'],
    ],
)

undying_admiration = WeaponTemplate(
    sentences=[
        ['16:dmg_skill', '6:crit_rate_skill'],
    ],
)

gash = WeaponTemplate(
    names=[
        'урона'
    ],
    sentences=[
        ['50:', '240:text_percent_dmg'],
        ['15:ignore'],
    ],
)

an_end_sublime = WeaponTemplate(
    sentences=[
        ['12:atk_percent', '15:ignore', '25:ignore',],
        [],
        ['10:ignore', ],
        ['2.4:text_percent_hp', '150:text_decimal', '15:ignore']
    ],
    results=[
        [0, 1, 2],
        [3],
        ['Долг жизнии'],
    ],
    extracted_names=[2],
)

an_end_sublime_eng = WeaponTemplate(
    sentences=[
        ['12:atk_percent', '15:ignore', '25:ignore',],
        ['10:ignore', ],
        ['150:text_decimal', '2.4:text_percent_hp', '15:ignore']
    ],
    results=[
        [0, 1],
        [2],
        ['Bond of Life'],
    ],
    extracted_names=[2],
)

mind_in_bloom = WeaponTemplate(
    sentences=[
        ['12:text_value', '15:ignore', '60:mastery',],
        ['15:ignore', ],
    ],
)

mind_in_bloom_eng = WeaponTemplate(
    sentences=[
        ['12:text_value', '60:mastery', '15:ignore',],
        ['15:ignore', ],
    ],
)

ironbone = WeaponTemplate(
    sentences=[
        ['8:crit_rate_skill'],
        ['16:recharge', '5:ignore'],
    ],
    results=[
        [0],
        [1],
    ]
)

unfinished_masterpiece = WeaponTemplate(
    names=['бонус урона всеми элементами'],
    sentences=[
        ['8:dmg_pyro', '15:ignore', '24:ignore'],
        [],
        ['10:ignore'],
        ['15:ignore', '2:text_percent', '1000:text_value_hp'],
        [],
        ['12:text_percent_max'],
    ],
    results=[
        [0, 1, 2],
        [3, 4, 5],
    ]
)

unfinished_masterpiece_eng = WeaponTemplate(
    sentences=[
        ['8:dmg_pyro', '15:ignore', '24:ignore'],
        ['10:ignore'],
        ['1000:text_value_hp', '2:text_percent', '12:text_percent_max'],
        ['15:ignore'],
    ],
    results=[
        [0, 1],
        [2, 3],
    ]
)

revolutionary_chorale_rus = WeaponTemplate(
    names=[
        'Талисман воодушевления',
        'Талисманы воодушевления',
        'Талисмана воодушевления',
        'урон',
        'Тысячелетняя симфония',
        'Тысячелетней симфонии',
    ],
    replace={', который у':'. У'},
    sentences=[
        [],
        ['10:dmg_all'],
        [],
        ['0.5:ignore'],
        ['12:ignore'],
        ['16:text_percent_2|16', '20:text_percent|20'],
        ['20:ignore'],
        [],
    ],
    results=[
        [0, 1, '<br>', 2, 3, 4, 6],
        [5, 7],
        ['Тысячелетняя симфония: Гимн восстания',],
    ],
    extracted_names=[2],
)

revolutionary_chorale_eng = WeaponTemplate(
    names=[
        'Sigils of Rebellion',
        'Sigil of Rebellion',
        'Millennial Movement',
    ],
    replace={'. "Millennial Movement: Song of Resistance" i':'. I'},
    sentences=[
        [],
        ['10:dmg_all'],
        [],
        ['0.5:ignore'],
        ['2:ignore', '12:ignore'],
        ['16:text_percent_2|16', '20:text_percent|20'],
        ['20:ignore'],
        [],
    ],
    results=[
        [0, 1, '<br>', 2, 3, 4, 6],
        [5, 7],
        ['Millennial Movement: Song of Resistance',],
    ],
    extracted_names=[2],
)

heavy = WeaponTemplate(
    sentences=[
        ['160:text_percent_dmg'],
        ['10:ignore'],
    ],
)

vigorous = WeaponTemplate(
    sentences=[
        ['14:crit_rate', '90:'],
    ],
)

vigorous_eng = WeaponTemplate(
    sentences=[
        ['90:', '14:crit_rate'],
    ],
)

secret_wisdoms_favor = WeaponTemplate(
    sentences=[
        ['40:mastery', '6:ignore'],
        ['2:ignore', '0.5:ignore'],
    ],
)

secret_wisdoms_favor_eng = WeaponTemplate(
    sentences=[
        ['40:mastery', '6:ignore'],
        ['2:ignore'],
        ['0.5:ignore'],
    ],
)

infusion_stinger = WeaponTemplate(
    names=['весь наносимый урон', 'all DMG'],
    sentences=[
        ['6:dmg_all', '6:ignore'],
        ['2:ignore'],
        ['1:ignore'],
    ],
)

primordial_jade_regalia = WeaponTemplate(
    names=['Камня воли', 'создаёт щит'],
    sentences=[
        ['3:ignore', '2.5:ignore', '4.5:ignore', '0.3:text_percent|0|2', '1000:ignore'],
        ['12:text_percent_max'],
        [],
    ],
)

primordial_jade_regalia_eng = WeaponTemplate(
    names=['Primordial Jade Regalia', 'creating a shield'],
    sentences=[
        ['3:ignore', '4.5:ignore', '2.5:ignore', '0.3:text_percent|0|2', '1000:ignore', '12:text_percent_max'],
        [],
    ],
)

isshin_art_clarity = WeaponTemplate(
    names=['Секущий ветер', 'Hewing Gale'],
    sentences=[
        ['180:text_percent', '15:atk_percent', '8:ignore'],
        ['8:ignore'],
    ],
)

kagura_dance_of_the_sacred_sakura = WeaponTemplate(
    names=['Танец кагура'],
    sentences=[
        ['12:dmg_skill'],
        ['16:ignore', '3:ignore'],
        ['3:ignore', '12:dmg_pyro']
    ],
    results=[
        [0, 1],
        [2],
    ],
)

kagura_dance_of_the_sacred_sakura_eng = WeaponTemplate(
    names=['Kagura Dance'],
    sentences=[
        ['12:dmg_skill', '16:ignore'],
        ['3:ignore'],
        ['12:dmg_pyro', '3:ignore']
    ],
    results=[
        [0, 1],
        [2],
    ],
)

whitemoon_bristle = WeaponTemplate(
    names=['Лиственного выреза', 'Foliar Incision'],
    sentences=[
        ['4:crit_rate'],
        ['120:text_percent'],
        ['28:ignore', '12:ignore'],
        ['12:ignore'],
    ],
    results=[
        [0],
        [1, 2, 3],
    ],
)

aeon_wave = WeaponTemplate(
    sentences=[
        ['16:hp_percent'],
        ['14:dmg_charged', '4:ignore'],
        ['3:ignore', '1:ignore', '0.3:ignore'],
        ['3:ignore', '3:ignore', '8:text_value'],
        ['1:ignore', '12:ignore'],
    ],
    results=[
        [0],
        [1, 2],
        [3, 4]
    ],
)

aeon_wave_eng = WeaponTemplate(
    sentences=[
        ['16:hp_percent'],
        ['14:dmg_charged', '4:ignore'],
        ['3:ignore'],
        ['0.3:ignore'],
        ['3:ignore', '8:text_value'],
        ['12:ignore'],
    ],
    results=[
        [0],
        [1, 2, 3],
        [4, 5]
    ],
)

itinerant_hero = WeaponTemplate(
    names=['урон', 'DMG'],
    sentences=[
        ['12:dmg_all'],
        ['5:ignore'],
    ],
)

aqua_remembrance = WeaponTemplate(
    names=['Знойного лета'],
    sentences=[
        [],
        ['20:hp_percent'],
        ['15:ignore', '14:ignore', '4:ignore'],
        ['12:dmg_normal'],
        ['1.5:ignore', '1:ignore', '1:ignore', '1.5:ignore', '1:ignore'],
        ['4:ignore'],
    ],
    results=[
        [0, 1],
        [2, 3, 4, 5]
    ],
)

aqua_remembrance_eng = WeaponTemplate(
    names=['Scorching Summer'],
    sentences=[
        ['20:hp_percent'],
        ['15:ignore', '14:ignore', '4:ignore'],
        ['12:dmg_normal'],
        ['1.5:ignore', '1:ignore', '1.5:ignore', '1:ignore'],
        ['4:ignore'],
    ],
    results=[
        [0],
        [1, 2, 3, 4]
    ],
)

arrowless_song = WeaponTemplate(
    sentences=[
        ['24:dmg_burst'],
    ],
)

archers_message = WeaponTemplate(
    sentences=[
        ['100:text_percent_dmg'],
        ['10:ignore'],
    ],
)

at_the_end_of_the_beast_paths = WeaponTemplate(
    names=['Непрестанной охоты'],
    sentences=[
        ['12:dmg_anemo'],
        ['160:text_percent'],
        ['10:ignore', '12:ignore'],
        ['12:ignore'],
    ],
    results=[
        [0],
        [1, 2, 3],
    ],
)

at_the_end_of_the_beast_paths_eng = WeaponTemplate(
    names=['Tireless Hunt'],
    sentences=[
        ['12:dmg_anemo'],
        [],
        ['160:text_percent'],
        ['12:ignore', '10:ignore'],
        ['1:ignore', '12:ignore'],
    ],
    results=[
        [0],
        [1, 2, 3, 4],
    ],
)

bane_of_fire_and_thunder = WeaponTemplate(
    names=['DMG', 'урон'],
    patterns=[
        ('врагов', 'tab{enemy:врагов}'),
        ('opponents', 'tab{enemy:opponents}'),
    ],
    sentences=[
        ['dmg_all'],
    ],
)

bane_of_storm_and_tide = WeaponTemplate(
    names=['DMG', 'урон'],
    patterns=[
        ('врагов', 'tab{enemy:врагов}'),
        ('opponents', 'tab{enemy:opponents}'),
    ],
    sentences=[
        ['dmg_all'],
    ],
)

benthic_pulse = WeaponTemplate(
    names=['DMG', 'урон', 'лечения', 'healed'],
    sentences=[
        ['16:dmg_all', '8:ignore'],
        [],
    ],
)

black_wing = WeaponTemplate(
    names=['обычной',],
    sentences=[
        ['8:crit_rate', '12:atk_speed_normal'],
        ['50:', '40:text_percent'],
        ['2:ignore'],
    ],
    results=[
        [0],
        [1, 2],
    ]
)

boundless_blessing = WeaponTemplate(
    sentences=[
        ['10:ignore'],
        ['8:dmg_pyro', '4:ignore'],
        ['4:ignore'],
        [],
    ],
)

bright_dawn_overture = WeaponTemplate(
    sentences=[
        ['15:atk_percent'],
        ['18:dmg_all'],
        ['8:ignore', '2:ignore'],
        ['2:ignore', '2:ignore', '12:text_value_energy'],
        ['1:ignore', '12:ignore'],
        ['2:ignore'],
    ],
    results=[
        [0],
        [1, 2, 3, 4, 5]
    ],
)

bright_dawn_overture_eng = WeaponTemplate(
    sentences=[
        ['15:atk_percent'],
        ['18:dmg_all'],
        ['8:ignore', '2:ignore'],
        ['2:ignore', '2:ignore', '12:text_value_energy'],
        ['12:ignore'],
        ['2:ignore'],
    ],
    results=[
        [0],
        [1, 2, 3, 4, 5]
    ],
)

brocade_bloom_shrine_sword = WeaponTemplate(
    names=['защита'],
    sentences=[
        ['16:dmg_normal', '24:dmg_skill'],
        ['100:ignore','15:ignore'],
        ['20:def_percent'],
    ],
    results=[
        [0],
        [1],
        [2]
    ],
)

bygone_azure_teardrop = WeaponTemplate(
    sentences=[
        ['10:atk_speed_normal'],
        ['4.8:dmg_normal','14:ignore'],
        ['9.6:text_percent_1'],
        ['0.3:ignore'],
        ['48:text_percent_2'],
        [],
    ],
    results=[
        [0],
        [1, 2, 3, 4, 5],
    ],
)

chord = WeaponTemplate(
    names=['обычной', 'музыкальную ноту', 'нот', 'сила музыки', 'Ноты', 'ноту'],
    sentences=[
        [],
        ['5:ignore','100:text_percent_dmg'],
        ['30:ignore'],
        ['0.5:ignore'],
    ],
)

chord_eng = WeaponTemplate(
    names=['Harmonic', 'Harmonics', 'power of music'],
    sentences=[
        [],
        ['5:ignore','100:text_percent_dmg'],
        ['30:ignore', '1:ignore', '0.5:ignore'],
    ],
)

composed = WeaponTemplate(
    names=['урон', 'damaging'],
    sentences=[
        ['40:text_percent'],
        ['30:text_cooldown'],
    ],
)

courage = WeaponTemplate(
    names=['обычной'],
    sentences=[
        ['6:atk_percent', '6:ignore'],
        ['4:ignore'],
        ['0.5:ignore'],
    ],
)

crush = WeaponTemplate(
    names=['обычной'],
    sentences=[
        ['50:text_percent_chance', '240:text_percent_dmg'],
        ['15:ignore'],
    ],
)

cull_the_weak = WeaponTemplate(
    sentences=[
        ['8:text_percent'],
    ],
)

dawn_and_dusk_by_the_lake = WeaponTemplate(
    sentences=[
        ['8:dmg_skill', '6:ignore'],
        ['1:ignore', '0.2:ignore', '3:ignore'],
        [],
        ['14:hp_percent', '6:ignore'],
        ['1:ignore', '0.2:ignore', '2:ignore'],
        [],
    ],
    results=[
        [0, 1],
        [2, 3, 4, 5],
    ],
)

dawn_and_dusk_by_the_lake_eng = WeaponTemplate(
    sentences=[
        ['8:dmg_skill', '6:ignore'],
        ['3:ignore'],
        ['0.2:ignore'],
        ['14:hp_percent', '6:ignore'],
        ['2:ignore'],
        ['0.2:ignore'],
        [],
    ],
    results=[
        [0, 1, 2],
        [3, 4, 5, 6],
    ],
)

daylights_augury = WeaponTemplate(
    names=['Звезда полярной ночи'],
    patterns=[
        ('1/2/3/4 ур.', 'действии'),
        ('10/20/30/48%', '48%'),
    ],
    sentences=[
        ['12:dmg_burst'],
        ['1:ignore', '12:ignore'],
        ['48:atk_percent'],
        [],
    ],
    results=[
        [0],
        [1, 2, 3],
    ],
)

daylights_augury_eng = WeaponTemplate(
    names=['Ashen Nightstar'],
    patterns=[
        ('1/2/3/4 stacks', 'effect'),
        ('10/20/30/48%', '48%'),
    ],
    sentences=[
        ['12:dmg_burst'],
        ['1:ignore', '12:ignore'],
        ['48:atk_percent'],
        [],
    ],
    results=[
        [0],
        [1, 2, 3],
    ],
)

debut = WeaponTemplate(
    patterns=[
        ('; ', '.\n'),
        (': у', '\nУ'),
        (': ', '\n'),
    ],
    sentences=[
        ['10:ignore'],
        ['30:ignore'],
        [],
        ['60:atk_percent'],
        [],
        ['48:dmg_pyro'],
        [],
        ['240:mastery'],
    ],
    results=[
        [0, 1],
        [3],
        [5],
        [7],
        [2],
        [4],
        [6],
    ],
    extracted_names=[4, 5, 6],
)

descension = WeaponTemplate(
    names=[
        'путешественник',
        'Мечом нисхождения',
        'обычными',
    ],
    patterns=[
        ('<br>', '<br>\n'),
    ],
    sentences=[
        [],
        [],
        ['50:text_percent_chance', '200:text_percent_dmg'],
        ['1:ignore', '10:ignore'],
        ['66:atk'],
    ],
    results=[
        [4],
        [2, 3],
    ],
)

descension_eng = WeaponTemplate(
    names=[
        'Traveler',
        'Sword of Descension',
    ],
    patterns=[
        ('<br>', '<br>\n'),
        ('name{Sword}', 'Sword'),
    ],
    sentences=[
        [],
        [],
        ['50:text_percent_chance', '200:text_percent_dmg'],
        ['10:ignore'],
        ['66:atk'],
    ],
    results=[
        [4],
        [2, 3],
    ],
)

desert_pavilion = WeaponTemplate(
    sentences=[
        ['10:ignore', '24:text_percent|24', '12:ignore'],
        ['30:ignore'],
        [],
        [],
    ],
    results=[
        [0,1,2,3],
        ['Чертоги в пустыне (Всего МС)'],
    ],
    extracted_names=[1],
)

desert_pavilion_eng = WeaponTemplate(
    sentences=[
        ['10:ignore', '24:text_percent|24', '12:ignore', '30:ignore'],
        [],
        [],
    ],
    results=[
        [0,1,2],
        ['Desert Pavilion (Total EM)'],
    ],
    extracted_names=[1],
)

wildling_nightstar = WeaponTemplate(
    sentences=[
        ['10:ignore', '24:text_percent', '12:ignore'],
        ['30:ignore'],
        [],
        [],
    ],
)

wildling_nightstar_eng = WeaponTemplate(
    sentences=[
        ['10:ignore', '24:text_percent', '12:ignore', '30:ignore'],
        [],
        [],
    ],
)

determination = WeaponTemplate(
    sentences=[
        ['12:atk_percent', '15:ignore'],
    ],
)

dryass_nocturne = WeaponTemplate(
    names=[
        'Снадобья'
    ],
    patterns=[
        ('12%/24%/40%', '40%')
    ],
    sentences=[
        [],
        ['1:ignore','2:ignore', '3:ignore'],
        ['40:hp_percent', '1:ignore', '25:ignore', '25:ignore', '20:ignore'],
        [],
        [],
        ['3:ignore', '28:crit_rate_burst'],
        ['4:ignore', '3:ignore']
    ],
    results=[
        [0, 1, 2, 3, 4],
        [5, 6],
    ],
)

dryass_nocturne_eng = WeaponTemplate(
    names=[
        'Remedy'
    ],
    patterns=[
        ('12%/24%/40%', '40%')
    ],
    sentences=[
        [],
        ['1:ignore','2:ignore', '3:ignore', '40:hp_percent', '1:ignore', '1:ignore', '25:ignore', '1:ignore', '25:ignore', '1:ignore', '20:ignore'],
        [],
        [],
        ['3:ignore', '28:crit_rate_burst'],
        ['4:ignore', '3:ignore']
    ],
    results=[
        [0, 1, 2, 3],
        [4, 5],
    ],
)

eagle_spear_of_justice = WeaponTemplate(
    names=['урон'],
    sentences=[
        ['3.2:atk_percent', '6:ignore'],
        ['7:ignore','0.3:ignore'],
        ['7:ignore', '12:dmg_all'],
    ],
    results=[
        [0, 1],
        [2],
    ],
)

eagle_spear_of_justice_eng = WeaponTemplate(
    names=['DMG'],
    sentences=[
        ['3.2:atk_percent', '6:ignore'],
        ['7:ignore'],
        ['0.3:ignore'],
        ['12:dmg_all'],
    ],
    results=[
        [0, 1, 2],
        [3],
    ],
)

echoing_ballad = WeaponTemplate(
    sentences=[
        ['20:crit_dmg'],
        ['60:text_percent_chance', '125:text_percent_dmg'],
        ['4:text_decimal_cd'],
    ],
    results=[
        [0],
        [1, 2],
    ],
)

energy_shower = WeaponTemplate(
    sentences=[
        ['1:text_percent_hp|1|2'],
    ],
)

ever_changing = WeaponTemplate(
    sentences=[
        ['14:text_percent', '5:ignore'],
        ['20:atk_percent', '5:ignore'],
    ],
)

evernight_duet = WeaponTemplate(
    patterns=[
        (', а п', '\nП'),
    ],
    sentences=[
        ['20:dmg_skill','5:ignore'],
        ['20:dmg_normal','5:ignore'],
    ],
    results=[
        [0],
        [1],
    ],
)

fangs_flying_to_and_fro = WeaponTemplate(
    sentences=[
        ['15:ignore'],
        [],
        ['20:hp_percent','10:ignore'],
        [],
        ['12:text_percent'],
        ['24:text_percent_max'],
        ['15:ignore'],
    ],
    results=[
        [0],
        [1, 2, 6],
        [3, 4, 5, '(%{text_number_f})'],
    ],
)

fangs_flying_to_and_fro_eng = WeaponTemplate(
    sentences=[
        ['15:ignore'],
        ['10:ignore','20:hp_percent'],
        ['12:text_percent','24:text_percent_max'],
        ['15:ignore'],
    ],
    results=[
        [0],
        [1, 3],
        [2, '(%{text_number_f})'],
    ],
)

focus = WeaponTemplate(
    names=[
        'урона',
        'damaging',
        'крит. попаданием',
        'CRIT Hit',
    ],
    sentences=[
        ['8:crit_rate'],
        ['5:ignore'],
        [],
    ],
)

forest_sanctuary = WeaponTemplate(
    names=['Семя сознания', 'Семени сознания'],
    sentences=[
        ['10:ignore'],
        ['60:mastery', '12:ignore'],
        ['20:ignore'],
        [],
        [],
    ],
)

forest_sanctuary_eng = WeaponTemplate(
    names=['Leaf of Consciousness', 'Leaf'],
    sentences=[
        ['10:ignore'],
        ['60:mastery', '12:ignore'],
        ['1:ignore', '20:ignore'],
        [],
        [],
    ],
)

frost_burial = WeaponTemplate(
    names=['обычной'],
    patterns=[
        ('противник', 'tab{enemy:противник}'),
    ],
    sentences=[
        ['60:text_percent_chance', '80:text_percent_dmg'],
        ['200:text_percent_dmg'],
        ['10:ignore'],
    ],
    results=[
        [0, 2],
        [1]
    ],
)

frost_burial_eng = WeaponTemplate(
    patterns=[
        ('Opponents', '\ntab{enemy:Opponents}'),
    ],
    sentences=[
        ['60:text_percent_chance', '80:text_percent_dmg'],
        ['200:text_percent_dmg'],
        ['10:ignore'],
    ],
    results=[
        [0, 2],
        [1]
    ],
)

full_circle = WeaponTemplate(
    names=['Роста и убыли'],
    sentences=[
        ['24:mastery', '5:atk_percent'],
        ['0.3:ignore', '5:ignore'],
        ['6:ignore'],
        [],
    ],
)

full_circle_eng = WeaponTemplate(
    names=['Wax and Wane'],
    sentences=[
        ['24:mastery', '5:atk_percent'],
        ['0.3:ignore', '1:ignore'],
        ['5:ignore', ],
        ['6:ignore', '1:ignore'],
        [],
    ],
)

full_draw = WeaponTemplate(
    sentences=[
        ['16:dmg_normal', '12:dmg_charged'],
        ['100:', '100:'],
    ],
    results=[
        [0],
        [1],
    ],
)

gilding = WeaponTemplate(
    sentences=[
        ['6:ignore', '4:text_decimal', '2:ignore', '4:text_percent', '2:ignore'],
    ],
)

gilding_eng = WeaponTemplate(
    sentences=[
        ['4:text_decimal', '2:ignore', '6:ignore'],
        ['4:text_percent', '2:ignore'],
    ],
)

gokadaiou_otogibanashi = WeaponTemplate(
    names=['Защита', 'обычных', 'защиты'],
    sentences=[
        ['28:def_percent', '40:normal_base_def_percent'],
    ],
)

gokadaiou_otogibanashi_eng = WeaponTemplate(
    names=['Защита', 'обычных', 'защиты'],
    sentences=[
        ['28:def_percent'],
        ['40:normal_base_def_percent'],
    ],
)

golden_majesty = WeaponTemplate(
    names=['защитой щита'],
    sentences=[
        ['20:shield'],
        ['4:atk_percent', '8:ignore'],
        ['5:ignore', '0.3:ignore'],
        ['100:'],
    ],
    results=[
        [1,2],
        [0],
        [3],
    ]
)

golden_majesty_eng = WeaponTemplate(
    names=['protected by a shield'],
    sentences=[
        ['20:shield'],
        ['4:atk_percent', '8:ignore'],
        ['5:ignore'],
        ['0.3:ignore'],
        ['100:'],
    ],
    results=[
        [1,2,3],
        [0],
        [4],
    ]
)

guerilla_tactics = WeaponTemplate(
    sentences=[
        ['12:atk_percent', '15:ignore'],
    ],
)

heat_haze_at_horizons_end = WeaponTemplate(
    names=['Сном алых песков', 'атаки', 'Dream of the Scarlet Sands'],
    sentences=[
        ['52:text_percent'],
        ['10:ignore', '28:text_percent'],
        ['3:ignore'],
    ],
    results=[
        [0],
        [1, 2],
    ],
)

heros_blade = WeaponTemplate(
    names=['архэ', 'Меча Нарциссенкрейца', 'пневмы', 'усии', 'Arkhe', 'Pneuma', 'Ousia', 'Sword of Narzissenkreuz'],
    replace={'name{Sword}':'Sword'},
    sentences=[
        ['160:text_percent_dmg'],
        ['12:ignore'],
        [],
    ],
)

honed_flow = WeaponTemplate(
    names=['урона всеми элементами', 'Волны-шипа'],
    sentences=[
        ['12:dmg_pyro'],
        ['1:ignore'],
        ['0.3:ignore'],
        ['2:ignore'],
        [],
        ['20:dmg_normal', '8:ignore'],
    ],
    results=[
        [0],
        [1, 2, 3, 4, 5],
        ['Хаос волн'],
    ],
    extracted_names=[2],
)

honed_flow_eng = WeaponTemplate(
    names=['Wavespike'],
    sentences=[
        ['12:dmg_pyro'],
        ['1:ignore'],
        ['2:ignore'],
        ['0.3:ignore'],
        ['20:dmg_normal', '8:ignore'],
    ],
    results=[
        [0],
        [1, 2, 3, 4],
        ['Rippling Upheaval'],
    ],
    extracted_names=[2],
)

inflorescence_unattainable = WeaponTemplate(
    sentences=[
        ['15:text_percent'],
        ['6:dmg_charged', '0.5:ignore'],
        ['6:ignore', '10:ignore'],
    ],
    results=[
        [0],
        [1, 2],
    ]
)

infusion_blade = WeaponTemplate(
    sentences=[
        ['6:atk_percent', '6:ignore'],
        ['4:ignore'],
        ['1:ignore','0.5:ignore'],
    ],
)

infusion_blade_eng = WeaponTemplate(
    sentences=[
        ['6:atk_percent', '6:ignore'],
        ['4:ignore'],
        ['0.5:ignore'],
    ],
)

infusion_scroll = WeaponTemplate(
    sentences=[
        ['10:ignore', '8:dmg_pyro'],
        ['2:ignore'],
    ],
)

infusion_scroll_eng = WeaponTemplate(
    sentences=[
        ['8:dmg_pyro', '10:ignore'],
        ['2:ignore'],
    ],
)

journey = WeaponTemplate(
    sentences=[
        ['1:text_percent_hp|1|2'],
    ],
)

justice = WeaponTemplate(
    names=['DMG'],
    sentences=[
        ['20:dmg_normal'],
        ['60:text_percent'],
        ['5:ignore'],
    ],
)

magic_affinity = WeaponTemplate(
    sentences=[
        ['8:dmg_normal', '12:ignore'],
        ['2:ignore'],
    ],
)

many_oaths_of_dawn_and_dusk = WeaponTemplate(
    names=['Печать', 'Печати'],
    sentences=[
        ['20:atk_percent'],
        ['1:ignore', '18:dmg_skill'],
        ['15:ignore'],
        ['2:ignore'],
        ['0.2:ignore'],
    ],
    results=[
        [0],
        [1, 2, 3, 4],
    ],
)

many_oaths_of_dawn_and_dusk_eng = WeaponTemplate(
    names=['Seal', 'Seals'],
    sentences=[
        ['20:atk_percent'],
        ['1:ignore', '18:dmg_skill'],
        ['15:ignore', '2:ignore'],
        ['0.2:ignore'],
    ],
    results=[
        [0],
        [1, 2, 3],
    ],
)

masons_ditty = WeaponTemplate(
    names=['Меткой единства', 'Меток', 'Метки', 'Отпора', 'Метку', 'Метки единства'],
    sentences=[
        ['30:ignore'],
        ['3:ignore'],
        ['10:ignore', '3:atk_percent', '7:dmg_pyro'],
        ['15:ignore'],
        [],
    ],
)

masons_ditty_eng = WeaponTemplate(
    names=["Unity's Symbol", 'Symbols', 'Struggle'],
    sentences=[
        ['30:ignore', '3:ignore'],
        ['10:ignore'],
        ['3:atk_percent', '7:dmg_pyro'],
        ['15:ignore'],
    ],
)

melussistance = WeaponTemplate(
    sentences=[
        ['12:atk_percent'],
        ['12:text_percent'],
    ],
    results=[
        [0],
        [1],
    ],
)

jade_circulation = WeaponTemplate(
    sentences=[
        ['5:ignore'],
        ['32:hp_percent', '40:mastery'],
        ['10:ignore']
    ],
)

jade_circulation_eng = WeaponTemplate(
    sentences=[
        ['5:ignore', '32:hp_percent', '40:mastery'],
        ['10:ignore']
    ],
)

labyrinth_lords_instruction = WeaponTemplate(
    names=['Наставлений лесов'],
    sentences=[
        ['60:mastery', '12:ignore'],
        [],
        ['100:text_percent_dmg'],
        ['20:ignore'],
    ],
)

labyrinth_lords_instruction_eng = WeaponTemplate(
    names=['Teachings of the Forest'],
    sentences=[
        ['60:mastery', '12:ignore'],
        [],
        ['100:text_percent_dmg', '1:ignore'],
        ['20:ignore'],
    ],
)

lithic_axiom_unity = WeaponTemplate(
    replace={'4':'4 (%{weapon_lithic_stacks})'},
    sentences=[
        ['7:atk_percent', '3:crit_rate'],
        ['4:ignore'],
    ],
)

mistsplitters_edge = WeaponTemplate(
    replace={
        ': ': ':<br>•',
        '; ': '<br>•',
        '. Продолжительность': '.<br>Продолжительность',
    },
    names=['Эмблемы рассекателя тумана'],
    patterns=[
        ('8%, 16% или 28%', '28%'),
    ],
    sentences=[
        ['12:dmg_pyro'],
        ['1:ignore', '2:ignore', '3:ignore', '28:dmg_own'],
        ['1:ignore', '5:ignore', '10:ignore', '100:'],
    ],
    results=[
        [0],
        [1, 2],
    ],
)

mistsplitters_edge_eng = WeaponTemplate(
    replace={
        ': ': ':<br>•',
        '; ': '<br>•',
        ', casting': '<br>casting',
        '. Each stack': '.<br>Each stack',
    },
    names=['Mistsplitter\'s Emblem'],
    patterns=[
        ('8/16/28%', '28%'),
    ],
    sentences=[
        ['12:dmg_pyro'],
        ['1:ignore', '2:ignore', '3:ignore', '28:dmg_own'],
        ['1:ignore', '5:ignore', '10:ignore', '100:'],
    ],
    results=[
        [0],
        [1, 2],
    ],
)

net_snapper = WeaponTemplate(
    names=['Плывущего по течению'],
    sentences=[
        ['80:text_percent_dmg'],
        ['15:ignore', '3:ignore'],
        ['2:ignore', '12:ignore'],
    ],
)

net_snapper_eng = WeaponTemplate(
    names=['Flowrider'],
    sentences=[
        ['80:text_percent_dmg'],
        ['15:ignore', '3:ignore'],
        ['1:ignore', '2:ignore'],
        ['12:ignore'],
    ],
)

bathhouses_hawks_and_narukami = WeaponTemplate(
    sentences=[
        ['6:ignore', '120:mastery'],
        ['9:ignore', '96:mastery'],
        ['30:ignore', '32:mastery'],
    ],
    results=[
        [0],
        [1],
        [2],
    ],
)

bathhouses_hawks_and_narukami_eng = WeaponTemplate(
    sentences=[
        ['120:mastery', '6:ignore', ],
        ['96:mastery', '9:ignore', ],
        ['32:mastery', '30:ignore', ],
    ],
    results=[
        [0],
        [1],
        [2],
    ],
)

northwind_wolf = WeaponTemplate(
    sentences=[
        ['16:dmg_skill', ],
        ['2:crit_rate_skill', ],
        ['2:crit_rate_burst'],
        [],
        ['10:ignore', '4:ignore', '0.1:ignore'],
    ],
    results=[
        [0],
        [1, 4],
        [2, 4],
    ],
)

northwind_wolf_eng = WeaponTemplate(
    sentences=[
        ['16:dmg_skill', ],
        ['2:crit_rate_skill', ],
        ['2:crit_rate_burst'],
        ['10:ignore', '4:ignore', '0.1:ignore'],
    ],
    results=[
        [0],
        [1, 3],
        [2, 3],
    ],
)

oceanic_victory = WeaponTemplate(
    names=['Титанический тунец', 'huge onrush of tuna'],
    sentences=[
        ['12:dmg_burst', ],
        ['100:', '100:text_percent_dmg'],
        ['15:ignore'],
    ],
)

offering_unto_wind_and_sun = WeaponTemplate(
    names=['Зеркала ночи', 'Mirror of Night'],
    sentences=[
        ['100:mastery', ],
        ['15:ignore', '28:dmg_all|28'],
        ['14:ignore'],
    ],
    results=[
        [0],
        [1, 2],
    ],
)

parsifal_the_great = WeaponTemplate(
    names=['Уловки', 'Актёрского мастерства'],
    sentences=[
        ['16:dmg_charged', ],
        ['1:ignore'],
        ['1:ignore'],
        ['1:format{text_number_f=1|{value}}:ignore',
         '2:format{text_number_f=2|{value}}:ignore',
         '3:format{text_number_f=3|{value}}:ignore',
         '16:format{text_number_f=1|{value}}:text_number_percent_1',
         '32:format{text_number_f=2|{value}}:text_number_percent_2',
         '48:format{text_number_f=3|{value}}:text_number_percent_3',],
        ['1:format{text_number_f=1|{value}}:ignore',
         '2:format{text_number_f=2|{value}}:ignore',
         '3:format{text_number_f=3|{value}}:ignore',
         '4:format{text_number_f=1|{value}}:text_number_percent_1',
         '7:format{text_number_f=2|{value}}:text_number_percent_2',
         '10:format{text_number_f=3|{value}}:text_number_percent_3',],
    ],
    results=[
        [0],
        [1, 3],
        [2, 4],
        ['Уловка'],
        ['Актёрское мастерство'],
    ],
    extracted_names=[3, 4],
)

parsifal_the_great_eng = WeaponTemplate(
    sentences=[
        ['16:dmg_charged', ],
        ['1:ignore'],
        ['1:ignore'],
        ['1:format{text_number_f=1|{value}}:ignore',
         '2:format{text_number_f=2|{value}}:ignore',
         '3:format{text_number_f=3|{value}}:ignore',
         '16:format{text_number_f=1|{value}}:text_number_percent_1',
         '32:format{text_number_f=2|{value}}:text_number_percent_2',
         '48:format{text_number_f=3|{value}}:text_number_percent_3',],
        ['1:format{text_number_f=1|{value}}:ignore',
         '2:format{text_number_f=2|{value}}:ignore',
         '3:format{text_number_f=3|{value}}:ignore',
         '4:format{text_number_f=1|{value}}:text_number_percent_1',
         '7:format{text_number_f=2|{value}}:text_number_percent_2',
         '10:format{text_number_f=3|{value}}:text_number_percent_3',],
    ],
    results=[
        [0],
        [1, 3],
        [2, 4],
        ['Gimmick'],
        ['Theatrics'],
    ],
    extracted_names=[3, 4],
)

people_of_the_faltering_light = WeaponTemplate(
    sentences=[
        ['24:recharge', '10:ignore'],
    ],
)

press_the_advantage = WeaponTemplate(
    sentences=[
        ['12:atk_percent'],
        ['30:ignore'],
        ['3:ignore'],
        [],
    ],
)

press_the_advantage_eng = WeaponTemplate(
    sentences=[
        ['12:atk_percent', '30:ignore'],
        ['3:ignore'],
    ],
)

protectors_virtue = WeaponTemplate(
    names=['атаки'],
    sentences=[
        ['20:hp_percent'],
        ['1.2:text_percent', ],
        [],
    ],
)

protectors_virtue_eng = WeaponTemplate(
    sentences=[
        ['20:hp_percent'],
        ['1.2:text_percent', ],
    ],
)

purifying_crown = WeaponTemplate(
    names=['Электризующего эдикта', 'Electrifying Edict'],
    sentences=[
        ['24:atk_percent', '20:ignore'],
        ['20:ignore', '40:dmg_reaction_lunarcharged|40'],
    ],
    results=[
        [0],
        [1],
    ],
)

falling_rainbows_wish = WeaponTemplate(
    names=['Первых цветов зари', 'Сияния сумерек'],
    sentences=[
        ['28:atk_percent'],
        ['28:crit_dmg_plunge'],
        ['40:crit_dmg_plunge'],
        ['15:ignore', '0.1:ignore'],
    ],
    results=[
        [0],
        [1, 3],
        [2, 3],
        ['Первые цветы зари'],
        ['Сияние сумерек'],
    ],
    extracted_names=[3, 4],
)

falling_rainbows_wish_eng = WeaponTemplate(
    sentences=[
        ['28:atk_percent'],
        ['28:crit_dmg_plunge'],
        ['40:crit_dmg_plunge'],
        ['15:ignore', '0.1:ignore'],
    ],
    results=[
        [0],
        [1, 3],
        [2, 3],
        ['Dawn\'s First Hue'],
        ['Twilight\'s Splendor'],
    ],
    extracted_names=[3, 4],
)

rebellious_guardian = WeaponTemplate(
    names=['защитой щита', 'урон', 'щит'],
    sentences=[
        ['10:ignore', '20:text_percent_hp'],
        [],
        ['45:ignore'],
        ['12:dmg_all']
    ],
    results=[
        [3],
        [0, 1, 2],
    ],
)

rebellious_guardian_eng = WeaponTemplate(
    names=['protected by the shield', 'shield', 'DMG'],
    sentences=[
        ['20:text_percent_hp'],
        ['10:ignore', '45:ignore'],
        ['12:dmg_all']
    ],
    results=[
        [2],
        [0, 1],
    ],
)

rebels_banner_hymn_rus = WeaponTemplate(
    names=['Печать шёпота', 'Тысячелетней симфонии', 'Печати шёпота'],
    replace={'сек. «Тысячелетняя симфония: Гимн знамени» у':'сек. У'},
    sentences=[
        [],
        ['16:atk_percent'],
        ['0.3:ignore'],
        ['4:ignore', '12:ignore'],
        ['12:text_percent_2|12', '20:text_percent|20'],
        ['20:ignore'],
        []
    ],
    results=[
        [0, 1, 2, 3, 5, ],
        [4, 6],
        ['Тысячелетняя симфония: Гимн знамени'],
    ],
    extracted_names=[2],
)

rebels_banner_hymn_eng = WeaponTemplate(
    names=['Millennial Movement', 'Sigils of Whispers'],
    replace={'12s. "Millennial Movement: Banner-Hymn" i':'12s. I'},
    sentences=[
        [],
        ['16:atk_percent'],
        ['0.3:ignore'],
        ['4:ignore', '12:ignore'],
        ['12:text_percent_2|12', '20:text_percent|20'],
        ['20:ignore'],
        []
    ],
    results=[
        [0, 1, 2, 3, 5, ],
        [4, 6],
        ['Millennial Movement: Banner-Hymn'],
    ],
    extracted_names=[2],
)

reckless_cinnabar = WeaponTemplate(
    sentences=[
        ['20:hp_percent'],
        ['0.8:text_percent'],
        [],
        ['50:', '1:text_percent'],
        [],
    ],
    results=[
        [0, 1, 2 ],
        [3, 4],
    ],
)

reckless_cinnabar_eng = WeaponTemplate(
    sentences=[
        ['20:hp_percent'],
        ['0.8:text_percent'],
        ['50:', '1:text_percent'],
    ],
    results=[
        [0, 1],
        [2],
    ],
)

rule_by_thunder = WeaponTemplate(
    names=['Громовой эмблемы'],
    patterns=[
        ('12%, 24% или 40%', '40%'),
        (': ', ':<br>\n• '),
        ('; ', '<br>\n• '),
        ('. Продолжительность', '.<br> Продолжительность')
    ],
    sentences=[
        ['20:atk_percent'],
        ['1:ignore', '2:ignore', '3:ignore', '40:dmg_normal'],
        ['1:ignore'],
        ['5:ignore'],
        ['10:ignore'],
        ['100:'],
    ],
    results=[
        [0],
        [1, 2, 3, 4, 5],
    ],
)

rule_by_thunder_eng = WeaponTemplate(
    names=['Thunder Emblem'],
    patterns=[
        ('12/24/40%', '40%'),
        (': ', ':<br>\n• '),
        (', casting', '<br>\n• Casting'),
        ('; ', '<br>\n• '),
        ('\\). Each', ').<br>Each'),
    ],
    sentences=[
        ['20:atk_percent'],
        ['1:ignore', '2:ignore', '3:ignore', '40:dmg_normal'],
        ['1:ignore'],
        ['5:ignore'],
        ['10:ignore'],
        ['100:'],
    ],
    results=[
        [0],
        [1, 2, 3, 4, 5],
    ],
)

rapid_firing = WeaponTemplate(
    sentences=[
        ['40:dmg_normal', '10:text_percent'],
    ],
)

samurai_conduct = WeaponTemplate(
    names=['энергии'],
    sentences=[
        ['6:dmg_skill'],
        ['3:', '3:text_decimal', '2:ignore', '6:ignore'],
        ['10:ignore'],
        [],
    ],
    results=[
        [0],
        [1, 2, 3],
    ],
)

sea_shanty = WeaponTemplate(
    names=['Символом стойкости', 'Символы', 'Символов', 'Воодушевления', 'Символ'],
    sentences=[
        ['30:ignore'],
        ['3:ignore'],
        ['10:ignore', '40:mastery', '2:ignore', '2:text_decimal'],
        ['15:ignore'],
        [],
    ],
)

sea_shanty_eng = WeaponTemplate(
    names=['Stoic\'s Symbol', 'Symbols', 'Symbol', 'Roused'],
    sentences=[
        ['30:ignore', '3:ignore'],
        ['10:ignore'],
        ['40:mastery', '2:ignore', '2:text_decimal'],
        ['15:ignore'],
    ],
)

seasoned_symphony = WeaponTemplate(
    names=['Сладких эхо', 'Sweet Echoes'],
    sentences=[
        ['12:atk_percent'],
        ['12:atk_percent'],
        ['32:atk_percent', '3:ignore'],
        [],
    ],
    results=[
        [0],
        [1],
        [2, 3],
    ],
)

shanty = WeaponTemplate(
    sentences=[
        ['16:dmg_burst', '6:crit_rate_burst'],
    ],
)

sharp = WeaponTemplate(
    sentences=[
        ['24:dmg_normal'],
    ],
)

precise = WeaponTemplate(
    replace={
        '.': '.<br>Попадание в слабое место включается на вкладке tab{enemy:Противник}.'},
    sentences=[
        ['24:dmg_weak'],
    ],
)

precise_eng = WeaponTemplate(
    replace={
        '.': '.<br>Shots to weak spots can be activated at tab{enemy:Enemy} tab.'},
    sentences=[
        ['24:dmg_weak'],
    ],
)

silent_trigger = WeaponTemplate(
    sentences=[
        ['40:text_percent_dmg'],
        [],
        ['15:ignore'],
    ],
)

silent_trigger_eng = WeaponTemplate(
    sentences=[
        ['40:text_percent_dmg'],
        ['15:ignore'],
    ],
)

sky_piercing_fang = WeaponTemplate(
    sentences=[
        ['4:crit_rate'],
        ['10:atk_speed_normal', '20:text_percent'],
        ['12:ignore'],
    ],
    results=[
        [0],
        [1, 2],
    ],
)

sky_piercing_fang_eng = WeaponTemplate(
    sentences=[
        ['4:crit_rate'],
        ['10:move_speed', '10:atk_speed_normal', '20:text_percent'],
        ['12:ignore'],
    ],
    results=[
        [0],
        [1, 2],
    ],
)

slingshot = WeaponTemplate(
    sentences=[
        ['0.3:ignore', '36:text_percent'],
        ['10:'],
    ],
)

smashed_stone = WeaponTemplate(
    sentences=[
        ['4:atk_percent', '6:ignore'],
        ['4:ignore', '0.3:ignore'],
    ],
)

smashed_stone_eng = WeaponTemplate(
    sentences=[
        ['4:atk_percent', '6:ignore'],
        ['4:ignore'],
        ['0.3:ignore'],
    ],
)

solar_shine = WeaponTemplate(
    sentences=[
        ['20:dmg_burst', '6:ignore'],
        ['20:dmg_normal', '6:ignore'],
    ],
    results=[
        [0],
        [1],
    ],
)

stillwood_moonshadow = WeaponTemplate(
    names=['Лист оживления'],
    sentences=[
        ['10:ignore'],
        ['16:atk_percent', '12:ignore'],
        ['20:ignore'],
        [],
    ],
)

stillwood_moonshadow_eng = WeaponTemplate(
    names=['Leaf of Revival', 'Leaf'],
    sentences=[
        ['10:ignore'],
        ['16:atk_percent', '12:ignore'],
        ['1:ignore', '20:ignore'],
        [],
    ],
)

strong_strike = WeaponTemplate(
    names=['Элой', 'Хищником', 'Aloy', 'Predator'],
    replace={
        '<br>': '\n'
    },
    sentences=[
        [],
        [],
        ['10:dmg_normal', '6:ignore'],
        ['2:ignore'],
        ['66:atk'],
    ],
    results=[
        [4],
        [2, 3],
        [0, 1],
    ],
)

sunken_song_of_the_sands = WeaponTemplate(
    names=['Великое сказание'],
    sentences=[
        ['20:hp_percent'],
        ['20:ignore', '0.12:text_percent'],
        [],
        ['1:ignore', '0.3:ignore', '3:ignore'],
        ['3:ignore', '3:ignore', '0.2:text_percent'],
        ['20:ignore'],
    ],
    results=[
        [0],
        [1, 2, 3],
        [4, 5],
    ],
)

sunken_song_of_the_sands_eng = WeaponTemplate(
    names=['Grand Hymn'],
    sentences=[
        ['20:hp_percent'],
        ['20:ignore'],
        ['0.12:text_percent'],
        ['0.3:ignore'],
        ['3:ignore'],
        ['3:ignore', '0.2:text_percent', '20:ignore'],
    ],
    results=[
        [0],
        [1, 2, 3],
        [4, 5],
    ],
)

the_silver_tongue = WeaponTemplate(
    sentences=[
        ['16:atk_percent', '15:ignore'],
        ['12:ignore'],
        ['15:ignore', '12:dmg_pyro'],
        ['12:ignore'],
    ],
    results=[
        [0, 1],
        [2, 3],
    ],
)

the_silver_tongue_eng = WeaponTemplate(
    sentences=[
        ['16:atk_percent', '15:ignore'],
        ['12:ignore'],
        ['12:dmg_pyro', '15:ignore'],
        ['12:ignore'],
    ],
    results=[
        [0, 1],
        [2, 3],
    ],
)

the_way_of_sunfire = WeaponTemplate(
    names=['Стрелу слепящего солнца', 'Стрелы слепящего солнца', 'Пылающего сердца', 'Стрела слепящего солнца'],
    sentences=[
        ['60:text_percent_dmg'],
        ['10:ignore'],
        ['28:dmg_charged_enemy'],
        ['10:ignore'],
    ],
    results=[
        [0, 1, 3],
        [2],
        ['Пылающее сердце'],
    ],
    extracted_names=[2],
)

the_way_of_sunfire_eng = WeaponTemplate(
    names=['Sunfire Arrow'],
    sentences=[
        ['60:text_percent_dmg', '10:ignore'],
        ['28:dmg_charged_enemy'],
        ['10:ignore'],
    ],
    results=[
        [0, 2],
        [1],
        ['Heartsearer'],
    ],
    extracted_names=[2],
)

the_wind_unattained = WeaponTemplate(
    sentences=[
        ['10:ignore', '12:atk_percent', '48:mastery'],
    ],
)

timeless_dream_eternal_stove = WeaponTemplate(
    sentences=[
        ['28:text_percent', '100:'],
        ['80:text_percent_max'],
        ['30:recharge', '12:ignore']
    ],
    results=[
        [0, 1],
        [2],
    ],
)

tip_of_the_spear = WeaponTemplate(
    sentences=[
        ['8:text_number'],
        ['10:ignore'],
    ],
)

turquoise_hunt = WeaponTemplate(
    names=['Благоволения Крон', 'Благоволение Крон'],
    sentences=[
        ['1:ignore'],
        ['1:ignore', '0.5:ignore'],
        ['3:ignore'],
        ['1:ignore', '2:ignore'],
        ['10:dmg_skill', '6:ignore', '6:ignore'],
        [],
    ],
)

turquoise_hunt_eng = WeaponTemplate(
    names=['Canopy\'s Favor'],
    sentences=[
        ['1:ignore'],
        ['0.5:ignore'],
        ['3:ignore'],
        ['2:ignore'],
        ['10:dmg_skill', '6:ignore'],
        ['6:ignore'],
        [],
    ],
)

unbending = WeaponTemplate(
    sentences=[
        ['70:text_percent_hp'],
        ['30:dmg_charged'],
    ],
)

unbending_eng = WeaponTemplate(
    sentences=[
        ['70:text_percent_hp', '30:dmg_charged'],
    ],
)

unreturning = WeaponTemplate(
    names=['weak points'],
    sentences=[
        ['10:move_speed', '36:atk_percent', '10:ignore'],
    ],
)

wandering_clouds = WeaponTemplate(
    sentences=[
        ['12:dmg_pyro'],
        ['50:ignore', '15:ignore', '160:ignore'],
        ['30:ignore'],
    ],
)

watatsumi_wavewalker = WeaponTemplate(
    sentences=[
        ['0.12:text_percent_bonus'],
        ['40:text_percent_cap'],
    ],
)

wavesplitter = WeaponTemplate(
    names=['DMG'],
    sentences=[
        ['4:ignore', '6:dmg_all', '3:dmg_recieved'],
        ['5:ignore', '1:ignore'],
    ],
)

whispers_of_wind_and_flower = WeaponTemplate(
    sentences=[
        ['8:ignore', '12:atk_percent', '48:mastery'],
    ],
)

white_cruising_wave = WeaponTemplate(
    sentences=[
        ['24:atk_percent', '8:ignore'],
        [],
    ],
)

windblume_wish = WeaponTemplate(
    sentences=[
        ['16:atk_percent', '6:ignore'],
    ],
)

wolfish_tracker = WeaponTemplate(
    sentences=[
        ['20:atk_percent'],
        ['30:', '40:atk_percent|40', '12:ignore'],
        ['1:ignore', '30:ignore'],
    ],
    results=[
        [0],
        [1, 2],
    ],
)

wolfish_tracker_eng = WeaponTemplate(
    sentences=[
        ['20:atk_percent'],
        ['30:', '40:atk_percent|40', '12:ignore'],
        ['30:ignore'],
    ],
    results=[
        [0],
        [1, 2],
    ],
)

busybodys_running_light = WeaponTemplate(
    sentences=[
        ['10:ignore', '20:atk_percent', '10:move_speed'],
    ],
)

busybodys_running_light_eng = WeaponTemplate(
    sentences=[
        ['20:atk_percent', '10:move_speed', '10:ignore'],
    ],
)

echoes_of_the_plentiful_land = WeaponTemplate(
    names=['Нефритовой короны'],
    sentences=[
        ['0.6:text_percent', '1000:ignore'],
        ['10:ignore'],
        ['16:text_percent_max'],
    ],
)

echoes_of_the_plentiful_land_eng = WeaponTemplate(
    names=['Jade-Forged Crown'],
    sentences=[
        ['1000:ignore', '0.6:text_percent', '10:ignore'],
        ['16:text_percent_max'],
    ],
)

smoke_and_mirror_mystery = WeaponTemplate(
    sentences=[
        ['16:def_percent', '15:ignore'],
    ],
)

pact_of_flowing_springs = WeaponTemplate(
    sentences=[
        ['16:def_percent', '15:ignore'],
    ],
)

flower_feather_song = WeaponTemplate(
    sentences=[
        ['4.8:atk_percent'],
        ['3:ignore', '24:mastery'],
    ],
    results=[
        [0, '(%{weapon_shattered_chains_stacks})'],
        [1],
    ],
)

sky_ripping_dragon_spine = WeaponTemplate(
    names=['урон', 'all DMG'],
    sentences=[
        ['8:dmg_all'],
        ['80:'],
        ['20:', '8:'],
    ],
    results=[
        [0],
        [1, 2],
    ],
)

kaidan_rainfall_earthbinder = WeaponTemplate(
    names=['Проклятый зонт', 'Проклятым зонтом', 'Cursed Parasol'],
    sentences=[
        ['10:ignore'],
        ['15:ignore'],
        [],
        ['16:dmg_all']
    ],
)

jinnis_whisper = WeaponTemplate(
    sentences=[
        ['10:ignore', '0,036:text_percent|0.036|3', '12:ignore'],
        ['30:ignore'],
        [],
        []
    ],
    results=[
        [0, 1, 2, 3],
        ['Шёпот джинна (Всего МС)']
    ],
    extracted_names=[1],
)

jinnis_whisper_eng = WeaponTemplate(
    sentences=[
        ['10:ignore', '0.036:text_percent|0.036|3', '12:ignore', '30:ignore'],
        [],
        []
    ],
    results=[
        [0, 1, 2],
        ['Whisper of the Jinn (Total EM)']
    ],
    extracted_names=[1],
)

a_thousand_nights_dawnsong = WeaponTemplate(
    names=['бонус урона'],
    sentences=[
        [],
        ['32:text_mastery|32'],
        ['10:dmg_own_text|10'],
        ['3:ignore'],
        ['40:mastery|40'],
        [],
    ],
    results=[
        [2, '(%{dreams_elements_different|0})'],
        [4, 5],
        [1, '(%{dreams_elements_same|0})'],
        [0, 3],
    ],
)

heritage = WeaponTemplate(
    sentences=[
        ['24:text_percent|24', '10:ignore'],
        ['20:ignore'],
    ],
)

verdant_wind = WeaponTemplate(
    names=['Циклон', 'обычной', 'Cyclone'],
    sentences=[
        ['50:text_percent_chance', '40:text_percent_dmg', '0.5:ignore', '4:ignore'],
        ['14:text_number_cd'],
    ],
)

sakura_saiguu = WeaponTemplate(
    names=['Элементальные бонусы урона','элемент', 'урона', 'Elemental Type'],
    sentences=[
        ['10:dmg_own|10', '6:ignore'],
        [],
    ],
)

radiance_of_the_deeps_rus = WeaponTemplate(
    names=['урон'],
    replace={
        ' на 6%/10%/14% соответственно':'',
    },
    sentences=[
        ['3:ignore'],
        ['7:ignore'],
        [],
    ],
    results=[
        [0,1,2],
        ['Увеличивает наносимый урон на %{dmg_all}'],
        ['Закат'],
        ['Туман'],
        ['Заря'],
    ],
    extracted_names=[2,3,4],
)

radiance_of_the_deeps_eng = WeaponTemplate(
    names=['DMG'],
    replace={
        ' by 6%/10%/14% respectively':'',
    },
    sentences=[
        [],
        [],
        ['7:ignore'],
        [],
    ],
    results=[
        [0,1,2,3],
        ['Increase DMG dealt by %{dmg_all}'],
        ['Evengleam'],
        ['Afterglow'],
        ['Dawnblaze'],
    ],
    extracted_names=[2,3,4],
)
