from ...template import Template, TemplateList


char_aloy = TemplateList(
    default_rus=Template(
        names=[
            'Элой',
            'Ледяная пустошь', 'Стремительного льда', 'Морозильная бомба', 'Ледяная бомбочка', 'Спирали',
        ],
        skills={
            'skill': ['Ледяная пустошь', 'Морозильная бомба', 'Ледяная бомбочка', 'Спирали'],
            'burst': [],
        },
    ),
    default_eng=Template(
        names=[
            'Aloy',
            'Rushing Ice',
            'Frozen Wilds', 'Freeze Bomb', 'Chillwater Bomblet', 'Coil',
        ],
        skills={
            'skill': ['Frozen Wilds', 'Freeze Bomb', 'Chillwater Bomblet', 'Coil'],
            'burst': [],
        },
    ),
    frozen_wilds = Template(
        sentences=[
            [],
            [],
            [],
            [],
            [],
            ['1:ignore', '0.1:ignore'],
            [],
            [],
            [],
            [],
            [],
            ['4:ignore'],
            [],
            [],
            [],
            ['30:ignore'],
            [],
            [],
        ],
        results=[
            list(range(0, 18)),
            [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        ],
    ),
    frozen_wilds_eng = Template(
        sentences=[
            [],
            [],
            [],
            ['1:ignore'],
            [],
            ['1:ignore', '0.1:ignore'],
            [],
            [],
            [],
            [],
            [],
            ['4:ignore'],
            [],
            [],
            [],
            [],
            ['30:ignore'],
            [],
            [],
        ],
        results=[
            list(range(0, 19)),
            [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        ],
    ),
    combat_override=Template(
        sentences=[
            ['text_percent_1', 'text_percent_2'],
            ['ignore'],
        ],
    ),
    strong_strike_rus=Template(
        sentences=[
            ['dmg_cryo'],
            ['text_percent'],
        ],
    ),
    strong_strike_eng=Template(
        sentences=[
            ['dmg_cryo', 'ignore'],
            ['text_percent'],
        ],
    ),
)
