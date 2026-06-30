from ...template import Template, TemplateList


char_chiori = TemplateList(
    default_rus=Template(
        names=[
            'Тиори',
            'Узорную ткань', 'Покрой', 'Покроя', 'Поймав мгновение', 'Тамото', 'Кину',
            'Сшито на заказ', 'Украшенная парча', 'Порхания хасодэ',
        ],
        skills={
            'skill': ['Порхание хасодэ'],
            'burst': ['Хиёку: Парные клинки'],
        },
    ),
    default_eng=Template(
        names=[
            'Chiori',
            'Tapestry', 'Tailoring', 'Seize the Moment', 'Tailor-Made',
            'Tamoto', 'Kinu', 'Fluttering Hasode', 'The Finishing Touch',
        ],
        skills={
            'skill': ['Fluttering Hasode'],
            'burst': ['Hiyoku: Twin Blades'],
        },
    ),
    tailor_made_rus=Template(
        replace={
            '<br>': '\n<br>\n',
        },
        sentences=[
            # [],
            # ['100:text_percent_dmg'],
            # ['8:ignore'],
            # ['1:ignore', '2:ignore', '2:ignore'],
            # ['5:ignore'],
            # [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            ['100:text_percent_dmg'],
            [],
            [],
            ['8:ignore'],
            ['1:ignore', '2:ignore', '2:ignore'],
            [],
            [],
            [],
            [],
            [],
            ['5:ignore'],
            [],
            [],
            [],
            [],
        ],
        results=[
            [0, 1, 22],
            [6, 7, 8, 9, 10, 11, 12],
            [18],
            [4],
            [16],
        ],
        extracted_names=[3, 4],
    ),
    tailor_made_eng=Template(
        replace={
            '<br>': '\n<br>\n',
        },
        sentences=[
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            ['100:text_percent_dmg'],
            [],
            [],
            ['8:ignore', '1:ignore', '2:ignore', '2:ignore'],
            [],
            [],
            [],
            [],
            [],
            ['5:ignore'],
            [],
            [],
            [],
            [],
        ],
        results=[
            [0, 1, 2, 3, 23],
            [8, 9, 10, 11, 12, 13],
            [19],
            [6],
            [17],
        ],
        extracted_names=[3, 4],
    ),
    the_finishing_touch_rus=Template(
        sentences=[
            ['20:ignore', '20:dmg_geo'],
        ],
    ),
    the_finishing_touch_eng=Template(
        sentences=[
            ['20:dmg_geo', '20:ignore'],
        ],
    ),
    six_paths_of_sage_silkcraft_rus=Template(
        sentences=[
            ['50:ignore'],
            ['1:ignore'],
            [],
        ],
    ),
    six_paths_of_sage_silkcraft_eng=Template(
        sentences=[
            ['50:ignore'],
            [],
        ],
    ),
    in_five_colors_dyed=Template(
        sentences=[
            ['10:ignore', '3:ignore'],
            ['170:text_percent_dmg'],
            ['1:ignore', '3:ignore'],
        ],
    ),
    a_tailors_three_courtesies=Template(
        sentences=[
            ['8:ignore'],
            ['1:ignore', '1:ignore', '3:ignore'],
            ['15:ignore'],
        ],
    ),
    sole_principle_pursuit=Template(
        names=[
            'защиты'
        ],
        sentences=[
            ['12:ignore'],
            ['235:text_percent_dmg'],
        ],
    ),
)
