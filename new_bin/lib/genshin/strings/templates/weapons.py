from ..template import Template

hope_beyond_the_peaks = Template(
    sentences=[
        ['15:ignore', '12:dmg_skill'],
        ['12:dmg_skill', '8:ignore'],
    ],
    results=[
        [0],
        [1],
    ],
)

trappers_pride = Template(
    sentences=[
        ['15:ignore'],
        ['16:normal_base_atk_percent'],
        ['18:ignore', '7:ignore'],
    ],
)

the_weight_of_falling_branches = Template(
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

halcyon_years_unending_rus = Template(
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
    ],
)

halcyon_years_unending_eng = Template(
    sentences=[
        ['8:def_percent', '10:dmg_pyro', '6:ignore'],
        ['2:ignore'],
        ['0.1:ignore'],
        ['2:ignore', '2:ignore', '8:text_percent|8', '1000:ignore', '25.6:text_percent_max|25.6', '15:ignore'],
    ],
    results=[
        [0, 1, 2],
        [3],
    ],
)

sunset_reignites_the_dawn = Template(
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

sunset_reignites_the_dawn_eng = Template(
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

deathly_pact = Template(
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

oppidan_ambush = Template(
    names=['урон'],
    sentences=[
        ['2:dmg_all'],
        ['20:text_percent_max'],
        ['4:ignore', '4:text_percent_reduce', '0:ignore'],
    ],
)

oppidan_ambush_eng = Template(
    names=['DMG'],
    sentences=[
        ['2:dmg_all', '20:text_percent_max'],
        ['4:ignore', '4:text_percent_reduce', '0:ignore'],
    ],
)

iwakura_succession = Template(
    names=['семя наследия', 'Семя наследия', 'семян наследия'],
    sentences=[
        ['1:ignore'],
        ['1:ignore', '5:ignore'],
        ['30:ignore'],
        ['3:ignore'],
        ['2:ignore', '6:text_decimal'],
    ],
)

iwakura_succession_eng = Template(
    names=['Succession Seed', 'Succession Seeds'],
    sentences=[
        ['1:ignore'],
        ['5:ignore'],
        ['30:ignore'],
        ['3:ignore'],
        ['2:ignore', '6:text_decimal'],
    ],
)

strong_willed = Template(
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

strong_willed_eng = Template(
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

the_cleansing_form = Template(
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

falcons_defiance_eng = Template(
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

falcons_defiance = Template(
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

tupacs_grip_eng = Template(
    sentences=[
        ['40:text_percent_dmg'],
        ['15:ignore'],
    ],
)

tupacs_grip = Template(
    sentences=[
        ['40:text_percent_dmg'],
        [],
        ['15:ignore'],
    ],
)

the_moonring_sighted = Template(
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

the_moonring_sighted_eng = Template(
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

whitehills_bestowal = Template(
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

bane_of_flame_and_water = Template(
    names=['урон', 'DMG'],
    patterns=[
        ('врагов', 'tab{enemy:врагов}'),
        ('opponents', 'tab{enemy:opponents}'),
    ],
    sentences=[
        ['20:dmg_all'],
    ],
)

tales_of_the_tundra = Template(
    sentences=[
        ['3:ignore', '120:mastery'],
    ],
)

azure_skies = Template(
    names=['обычной'],
    sentences=[
        ['6:ignore', '8:dmg_normal', '6:dmg_charged'],
        ['3:ignore', '0.3:ignore'],
    ],
)

azure_skies_eng = Template(
    sentences=[
        ['6:ignore', '8:dmg_normal', '6:dmg_charged'],
        ['3:ignore'],
        ['0.3:ignore'],
    ],
)

desert_watch = Template(
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

desert_watch_eng = Template(
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

bane_of_the_soft = Template(
    names=['урон', 'DMG', 'слаймам', 'slimes'],
    sentences=[
        ['40:dmg_all'],
    ],
)

diffusing_boundary = Template(
    names=['обычной'],
    sentences=[
        ['20:dmg_normal', '8:crit_rate_normal'],
    ],
)

extinguishing_precept = Template(
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

golden_blood_tide = Template(
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

golden_blood_tide_eng = Template(
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

spotless_heart = Template(
    names=['защиты', 'DMG'],
    sentences=[
        ['40:text_percent'],
        ['1.5:ignore', '0.1:ignore'],
    ],
)

crag_chiseled_forge = Template(
    sentences=[
        ['40:mastery'],
        ['18:ignore', '2:ignore'],
    ],
)

crag_chiseled_forge_eng = Template(
    sentences=[
        ['40:mastery', '18:ignore'],
        ['2:ignore'],
    ],
)

infusion_arrow = Template(
    names=['обычной'],
    sentences=[
        ['4:atk_percent', '1.2:atk_speed_normal', '6:ignore'],
        ['4:ignore'],
        ['0.3:ignore'],
    ],
)

bane_of_water_and_ice = Template(
    names=['урон', 'DMG'],
    patterns=[
        ('врагов', 'tab{enemy:врагов}'),
        ('opponents', 'tab{enemy:opponents}'),
    ],
    sentences=[
        ['12:dmg_all'],
    ],
)

cloudfall_axiom = Template(
    sentences=[
        ['28:dmg_plunge', '20:ignore'],
        ['2.5:text_decimal'],
        ['1:ignore', '0.7:ignore'],
        []
    ],
    results=[
        [0],
        [1, 2, 3],
    ]
)

cloudfall_axiom_eng = Template(
    sentences=[
        ['28:dmg_plunge', '20:ignore'],
        ['2.5:text_decimal'],
        ['0.7:ignore'],
        []
    ],
    results=[
        [0],
        [1, 2, 3],
    ]
)

infusion_needle = Template(
    names=['обычные'],
    sentences=[
        ['5:ignore', '20:text_percent'],
    ],
)

infusion_needle_eng = Template(
    sentences=[
        ['20:text_percent', '5:ignore'],
    ],
)

ashen_suns_shadow = Template(
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

ashen_suns_shadow_eng = Template(
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

overloaded = Template(
    sentences=[
        ['20:atk_percent', '12:ignore'],
    ],
)

gladiator = Template(
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
    ]
)

gladiator_eng = Template(
    sentences=[
        ['2:ignore', '16:atk_percent', '16:def_percent'],
        ['2:ignore', '24:atk_percent'],
    ],
    results=[
        [0],
        [1],
    ]
)

blunt_conclusion = Template(
    names=['Обычные'],
    sentences=[
        ['60:text_percent_dmg', '15:ignore'],
        ['3:ignore'],
    ],
)

blunt_conclusion_eng = Template(
    sentences=[
        ['60:text_percent_dmg'],
        ['15:ignore'],
        ['3:ignore'],
    ],
)

principle_of_equilibrium = Template(
    sentences=[
        ['8:text_number'],
        ['10:ignore'],
    ],
)

dodoventure = Template(
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

oath_of_qhapaq_nan = Template(
    sentences=[
        ['16:dmg_skill', '8:ignore'],
        []
    ],
)

the_parting_refrain = Template(
    names=[
        'Талисман воспоминаний',
        'Талисмана воспоминаний',
    ],
    sentences=[
        [],
        ['60:mastery'],
        [],
        ['0.2:ignore'],
        ['12:ignore'],
        ['100:text_value', '20:text_percent'],
        ['20:ignore'],
        [],
    ],
    results=[
        [5, 6, 7],
        [0, 1, 2, 3, 4],
    ]
)

the_parting_refrain_eng = Template(
    names=[
        'Sigils of Remembrance',
        'Sigil of Remembrance',
    ],
    patterns=[
        (r'\. "', '.\n"')
    ],
    sentences=[
        [],
        ['60:mastery'],
        [],
        ['0.2:ignore'],
        ['4:ignore', '12:ignore'],
        ['100:text_value', '20:text_percent'],
        ['20:ignore'],
        [],
    ],
    results=[
        [5, 6, 7],
        [0, 1, 2, 3, 4],
    ]
)

rapids = Template(
    sentences=[
        ['20:atk_percent', '12:ignore'],
    ],
)

byakuya_kougetsu = Template(
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

byakuya_kougetsu_eng = Template(
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

echo = Template(
    names=[
        'обычной', 'Око сознания', 'Bolt of Perception',
    ],
    sentences=[
        ['50:text_percent_chance', '240:text_percent_dmg'],
        ['4:ignore'],
        ['12:text_cd'],
    ],
)

windfall = Template(
    names=[
        'Критические атаки', 'CRIT Hits', 'Elemental Particles', 'элементальные частицы',
    ],
    sentences=[
        ['60:text_percent', '6:ignore'],
        ['12:text_cooldown'],
    ],
)

undying_admiration = Template(
    sentences=[
        ['16:dmg_skill', '6:crit_rate_skill'],
    ],
)

gash = Template(
    names=[
        'урона'
    ],
    sentences=[
        ['50:', '240:text_percent_dmg'],
        ['15:ignore'],
    ],
)

an_end_sublime = Template(
    sentences=[
        ['12:atk_percent', '15:ignore', '25:ignore',],
        [],
        ['10:ignore', ],
        ['2.4:text_percent_hp', '150:text_decimal', '15:ignore']
    ],
    results=[
        [0, 1, 2],
        [3],
    ],
)

an_end_sublime_eng = Template(
    sentences=[
        ['12:atk_percent', '15:ignore', '25:ignore',],
        ['10:ignore', ],
        ['150:text_decimal', '2.4:text_percent_hp', '15:ignore']
    ],
    results=[
        [0, 1],
        [2],
    ],
)

mind_in_bloom = Template(
    sentences=[
        ['12:text_value', '15:ignore', '60:mastery',],
        ['15:ignore', ],
    ],
)

mind_in_bloom_eng = Template(
    sentences=[
        ['12:text_value', '60:mastery', '15:ignore',],
        ['15:ignore', ],
    ],
)

ironbone = Template(
    sentences=[
        ['8:crit_rate_skill'],
        ['16:recharge', '5:ignore'],
    ],
    results=[
        [0],
        [1],
    ]
)

unfinished_masterpiece = Template(
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

unfinished_masterpiece_eng = Template(
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

revolutionary_chorale_rus = Template(
    names=[
        'Талисман воодушевления',
        'Талисманы воодушевления',
        'урон',
    ],
    sentences=[
        [],
        ['10:dmg_all'],
        [],
        ['0.5:ignore'],
        ['12:ignore', '16:text_percent_2', '20:text_percent'],
        ['20:ignore'],
        [],
    ],
    results=[
        [2, 3, 4, 5, 6],
        [0, 1],
    ]
)

revolutionary_chorale = Template(
    names=[
        'Sigils of Rebellion',
        'Sigil of Rebellion',
    ],
    sentences=[
        [],
        ['10:dmg_all'],
        [],
        ['0.5:ignore'],
        ['2:ignore', '12:ignore', '16:text_percent_2', '20:text_percent'],
        ['20:ignore'],
        [],
    ],
    results=[
        [2, 3, 3, 4, 5, 6],
        [0, 1],
    ]
)

heavy = Template(
    sentences=[
        ['160:text_percent_dmg'],
        ['10:ignore'],
    ],
)

vigorous = Template(
    sentences=[
        ['14:crit_rate', '90:'],
    ],
)

vigorous_eng = Template(
    sentences=[
        ['90:', '14:crit_rate'],
    ],
)

secret_wisdoms_favor = Template(
    sentences=[
        ['40:mastery', '6:ignore'],
        ['2:ignore', '0.5:ignore'],
    ],
)

secret_wisdoms_favor_eng = Template(
    sentences=[
        ['40:mastery', '6:ignore'],
        ['2:ignore'],
        ['0.5:ignore'],
    ],
)

infusion_stinger = Template(
    names=['урон', 'DMG'],
    sentences=[
        ['6:dmg_all', '6:ignore'],
        ['2:ignore'],
        ['1:ignore'],
    ],
)

primordial_jade_regalia = Template(
    names=['Камня воли', 'создаёт щит'],
    sentences=[
        ['3:ignore', '2.5:ignore', '4.5:ignore', '0.3:text_percent', '1000:ignore'],
        ['12:text_percent_max'],
        [],
    ],
)

primordial_jade_regalia_eng = Template(
    names=['Primordial Jade Regalia', 'creating a shield'],
    sentences=[
        ['3:ignore', '4.5:ignore', '2.5:ignore', '0.3:text_percent', '1000:ignore', '12:text_percent_max'],
        [],
    ],
)

isshin_art_clarity = Template(
    names=['Секущий ветер', 'Hewing Gale'],
    sentences=[
        ['180:text_percent', '15:atk_percent', '8:ignore'],
        ['8:ignore'],
    ],
)

kagura_dance_of_the_sacred_sakura = Template(
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

kagura_dance_of_the_sacred_sakura_eng = Template(
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

whitemoon_bristle = Template(
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