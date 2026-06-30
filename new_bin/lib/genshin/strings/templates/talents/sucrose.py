from ...template import Template, TemplateList


char_sucrose = TemplateList(
    default_rus=Template(
        names=[
            'Сахароза', 'Сахарозой', 'Сахарозы',
            'мастерство',
        ],
        skills={
            'skill': ['Эксперимент №6308', '«Эксперимент №6308»'],
            'burst': ['Запретно! Изомер 75 / Тип II', '«Запретно! Изомер 75 / Тип II»'],
        },
    ),
    default_eng=Template(
        names=[
            'Sucrose',
        ],
        skills={
            'skill': ['Astable Anemohypostasis Creation - 6308'],
            'burst': ['Forbidden Creation - Isomer 75 / Type II'],
        },
    ),
    catalyst_conversion=Template(
        sentences=[
            ['text_value', 'ignore'],
        ],
    ),
    mollis_favonius=Template(
        sentences=[
            ['ignore', 'ignore', 'text_percent', 'ignore'],
        ],
    ),
    clustered_vacuum_field=Template(
        sentences=[
            ['ignore', 'ignore'],
        ],
    ),
    unbound_form=Template(
        sentences=[
            ['ignore', 'ignore'],
        ],
    ),
    alchemania=Template(
        sentences=[
            ['ignore', 'ignore', 'ignore', 'ignore'],
            [],
            ['ignore'],
        ],
    ),
    chaotic_entropy=Template(
        sentences=[
            ['ignore', '20:'],
        ],
    ),
    chaotic_entropy_hex=Template(
        sentences=[
            ['ignore', '20:', '8.57142:'],
        ],
    ),
    sevenfold_transmutation_rus=Template(
        replace={
            '· ': '· \n',
        },
        sentences=[
            [],
            ['2:ignore'],
            [],
            [],
            [],
            [],
            ['15:ignore', '5.71428:dmg_normal||5'],
            [],
            [],
            ['20:ignore', '7.14285:dmg_normal||5'],
        ],
        results=[
            [0, 1],
            [3, 4, 6],
            [3, 4, 9],
        ],
    ),
    sevenfold_transmutation_eng=Template(
        replace={
            '· ': '· \n',
        },
        sentences=[
            [],
            ['2:ignore'],
            [],
            [],
            [],
            [],
            ['5.71428:text_percent||5', '15:ignore'],
            [],
            [],
            ['7.14285:text_percent||5', '20:ignore'],
        ],
        results=[
            [0, 1],
            [3, 4, 6],
            [3, 4, 9],
        ],
    ),
)
