from ...template import Template, TemplateList


char_sangonomiya_kokomi = TemplateList(
    default_rus=Template(
        names=[
            'Сангономии Кокоми', 'Сангономия Кокоми',
            'Бакэ-курагэ', 'Церемониальное одеяние',
        ],
        skills={
            'skill': ['Клятва курагэ'],
            'burst': ['Вознесение нереиды'],
        },
    ),
    default_eng=Template(
        names=[
            'Sangonomiya Kokomi', 'Kokomi',
            'Bake-Kurage', 'Ceremonial Garment',
            'Healing Bonuses',
        ],
        skills={
            'skill': ['Kurage\'s Oath'],
            'burst': ['Nereid\'s Ascension'],
        },
    ),
    nereids_ascension_rus=Template(
        replace={
            '</p><p>': '\n</p><p>\n',
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
            [],
            [],
            [],
            [],
            [],
            [],
        ],
        results=[
            list(range(0, 16)),
            [4, 5, 6, 7, 8, 9, 10, 11, '<br>', 13],
            [2],
        ],
        extracted_names=[2],
    ),
    nereids_ascension_eng=Template(
        replace={
            '</p><p>': '\n</p><p>\n',
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
            [],
            [],
            [],
        ],
        results=[
            list(range(0, 13)),
            [4, 5, 6, 7, 8, '<br>', 10],
            [2],
        ],
        extracted_names=[2],
    ),
    tamakushi_casket=Template(
        sentences=[
            [],
        ],
    ),
    song_of_pearls_rus=Template(
        names=['обычной'],
        sentences=[
            [],
            ['text_percent'],
        ],
    ),
    song_of_pearls_eng=Template(
        sentences=[
            ['text_percent'],
        ],
    ),
    flawless_strategy=Template(
        sentences=[
            ['25:healing', '100:crit_rate'],
        ],
    ),
    at_waters_edge_rus=Template(
        sentences=[
            ['text_percent_dmg'],
            [],
        ],
    ),
    at_waters_edge_eng=Template(
        sentences=[
            ['text_percent_dmg'],
        ],
    ),
    the_clouds_like_waves_rippling_rus=Template(
        names=['Обычные', 'заряженные атаки'],
        sentences=[
            ['ignore', 'text_percent_1'],
            ['text_percent_2'],
            [],
        ],
    ),
    the_clouds_like_waves_rippling_eng=Template(
        sentences=[
            ['ignore', 'text_percent_1', 'text_percent_2'],
        ],
    ),
    the_moon_overlooks_the_waters=Template(
        sentences=[
            ['atk_speed_normal', 'ignore', 'ignore'],
        ],
    ),
    sango_isshin=Template(
        names=['обычные', 'заряженные атаки'],
        sentences=[
            ['dmg_hydro', 'ignore', 'ignore'],
        ],
    ),
)
