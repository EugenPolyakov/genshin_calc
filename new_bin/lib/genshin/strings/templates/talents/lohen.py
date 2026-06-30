from ...template import Template, TemplateList


char_lohen = TemplateList(
    default_rus=Template(
        names=[
            'Лоэн[а]?',
        ],
        skills={
            'skill': ['Непредвиденный удар'],
            'burst': ['Вынесение приговора'],
        },
    ),
    default_eng=Template(
        names=[
            'Lohen',
        ],
        skills={
            'skill': ['Unforeseen Strike'],
            'burst': ['Manifest Judgment'],
        },
    ),
    unhealing_thorn=Template(
        sentences=[
            [],
            ['2:ignore'],
            [],
            [],
            [],
            ['50:', '40:dmg_normal', '6:ignore'],
        ],
        results=[
            [0, 1],
            [3, 4, 5],
        ],
    ),
    flippant_masterpiece_rus=Template(
        sentences=[
            ['8:ignore', '15:atk_percent'],
        ],
    ),
    flippant_masterpiece_eng=Template(
        sentences=[
            ['8:ignore', '15:atk_percent', '15:atk_percent'],
        ],
    ),
    in_flight_i_strike_whatever_flies_rus=Template(
        names=['обычная'],
        sentences=[
            ['4:ignore', '500:', '8:ignore', '200:'],
            ['4:ignore'],
        ],
    ),
    in_flight_i_strike_whatever_flies_eng=Template(
        sentences=[
            ['4:ignore', '500:', '200:', '8:ignore'],
            ['4:ignore'],
        ],
    ),
    to_drown_to_sink_unconscious_supreme_joy=Template(
        sentences=[
            [],
            ['1.25:ignore'],
            ['7:ignore'],
            [],
            ['175:crit_dmg_skill', '2:ignore'],
        ],
    ),
)
