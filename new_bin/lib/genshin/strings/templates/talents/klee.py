from ...template import Template, TemplateList


char_klee = TemplateList(
    default_rus=Template(
        names=[
            'Кли',
            'Взрывную искру', 'Взрывная искра',
        ],
        skills={
            'skill': ['Прыг-скок бомба'],
            'burst': ['Грохот и искры'],
        },
    ),
    default_eng=Template(
        names=[
            'Klee',
            'Explosive Spark',
        ],
        skills={
            'skill': ['Jumpy Dumpty'],
            'burst': ['Sparks \'n\' Splash'],
        },
    ),
    sparkborne_magic_rus=Template(
        sentences=[
            [],
            ['2:ignore'],
            [],
            [],
            [],
            ['20:ignore'],
            [],
            [],
            ['1:ignore', '2:ignore', '3:ignore', '115:', '130:', '150:'],
        ],
        results=[
            [0, 1],
            [3, 4, 5, 6, 7, 8],
        ],
    ),
    sparkborne_magic_eng=Template(
        sentences=[
            [],
            ['2:ignore'],
            [],
            [],
            [],
            ['1:ignore', '20:ignore'],
            ['1:ignore',],
            ['1:ignore', '2:ignore', '3:ignore', '115:', '130:', '150:'],
        ],
        results=[
            [0, 1],
            [3, 4, 5, 6, 7],
        ],
    ),
    pounding_surprise=Template(
        names=['заряженной атаке'],
        sentences=[
            ['ignore'],
            [],
            ['dmg_charged'],
        ],
    ),
    pounding_surprise_hex_rus=Template(
        names=['заряженной атаке'],
        sentences=[
            ['50:ignore'],
            ['1:ignore'],
            ['3:ignore'],
            [],
            ['1:ignore', '50:dmg_charged'],
            [],
            [],
            [],
            [],
            [],
        ],
        results=[
            [0, 1, 2, 3, 4],
            [6, 7, 8, 9],
        ],
    ),
    pounding_surprise_hex_eng=Template(
        names=['заряженной атаке'],
        sentences=[
            ['50:ignore'],
            ['1:ignore'],
            ['3:ignore'],
            [],
            ['1:ignore', '50:dmg_charged'],
            [],
            [],
            [],
            [],
            ['1:ignore'],
        ],
        results=[
            [0, 1, 2, 3, 4],
            [6, 7, 8, 9],
        ],
    ),
    sparkling_burst=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    chained_reactions=Template(
        sentences=[
            ['text_percent_dmg'],
        ],
    ),
    chained_reactions_hex=Template(
        sentences=[
            ['120:text_percent_dmg'],
            [],
            ['12:ignore', '60:atk_percent'],
        ],
    ),
    explosive_frags=Template(
        sentences=[
            ['23:enemy_def_reduce', '10:ignore'],
        ],
    ),
    explosive_frags_hex=Template(
        sentences=[
            ['23:enemy_def_reduce', '10:ignore'],
        ],
    ),
    sparkly_explosion=Template(
        sentences=[
            ['text_percent_dmg'],
        ],
    ),
    blazing_delight=Template(
        sentences=[
            ['ignore', 'ignore'],
            [],
            ['dmg_pyro', 'ignore'],
        ],
    ),
    blazing_delight_hex=Template(
        sentences=[
            ['3:ignore', '3:ignore'],
            [],
            ['25:ignore', '10:', '50:dmg_pyro'],
            [],
            [],
            [],
            ['50:ignore'],
            ['40:ignore'],
        ],
        results=[
            [0, 1, 2],
            [4, 5, 6, 7],
        ],
    ),
)
