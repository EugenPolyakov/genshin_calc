from ...template import Template, TemplateList


char_yae_miko = TemplateList(
    default_rus=Template(
        names=[
            'Яэ Мико',
            'Сакура сэссё', 'Сакуры сэссё', 'Сакур сэссё',
            'Небесной кицунэ', 'защиты',
        ],
        skills={
            'skill': ['Прокляти[ея] якан: Сакура сэссё', 'Сакура сэссё', 'Сакуры сэссё', 'Сакур сэссё'],
            'burst': ['Великое тайное искусство: Тэнко кэнсин', 'Великого тайного искусства: Тэнко кэнсин'],
        },
    ),
    default_eng=Template(
        names=[
            'Yae Miko',
            'Sesshou Sakura', 'Tenko Thunderbolt',
        ],
        skills={
            'skill': ['Yakan Evocation: Sesshou Sakura', 'The Sesshou Sakura\'s', 'Sesshou Sakura'],
            'burst': ['Great Secret Art: Tenko Kenshin'],
        },
    ),
    edict_of_cleansing=Template(
        sentences=[
            ['10:ignore'],
            ['80:'],
            ['2.5:ignore'],
            [],
            ['200:'],
            [],
            [],
            [],
        ],
        results=[
            [0, 7],
            [1, 2],
            [4, 5, 6],
        ],
    ),
    the_shrines_sacred_shade_rus=Template(
        sentences=[
            [],
        ],
    ),
    the_shrines_sacred_shade_eng=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    the_shrines_sacred_shade_hex_rus=Template(
        sentences=[
            [],
            [],
            ['3:ignore', '40:'],
            [],
            ['50:'],
        ],
    ),
    the_shrines_sacred_shade_hex_eng=Template(
        sentences=[
            [],
            [],
            ['3:ignore', '40:'],
            [],
            ['50:'],
            [],
        ],
    ),
    enlightened_blessing=Template(
        sentences=[
            ['text_percent|0|2'],
        ],
    ),
    yakan_offering=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    yakan_offering_hex=Template(
        sentences=[
            ['8:ignore'],
            ['10:ignore', '50:text_dmg_electro'],
            [],
        ],
        results=[
            [0, 1, 2],
            [1, 2],
        ],
    ),
    yakan_offering_hex_eng=Template(
        sentences=[
            ['8:ignore'],
            ['50:text_dmg_electro', '10:ignore'],
            [],
        ],
        results=[
            [0, 1, 2],
            [1, 2],
        ],
    ),
    foxs_mooncall_rus=Template(
        sentences=[
            ['2:ignore'],
            ['4:ignore', '60:'],
        ],
    ),
    foxs_mooncall_eng=Template(
        sentences=[
            ['2:ignore', '4:ignore', '60:'],
        ],
    ),
    foxs_mooncall_hex=Template(
        replace= {
            '60/90/120/200': '60',
        },
        sentences=[
            ['2:ignore'],
            ['4:ignore', '60:'],
            ['60:mastery|60'],
        ],
        results=[
            [0, 1, 2],
            [2],
        ],
    ),
    foxs_mooncall_hex_eng=Template(
        replace= {
            '60/90/120/200': '60',
        },
        sentences=[
            ['2:ignore', '4:ignore', '60:'],
            ['60:mastery|60'],
        ],
        results=[
            [0, 1],
            [1],
        ],
    ),
    sakura_channeling=Template(
        sentences=[
            ['dmg_electro', 'ignore'],
        ],
    ),
    sakura_channeling_hex=Template(
        sentences=[
            ['20:dmg_electro', '5:ignore', '8:ignore'],
            ['5:ignore'],
            ['100:'],
        ],
    ),
    daisesshou=Template(
        sentences=[
            ['enemy_def_ignore_skill'],
        ],
    ),
    daisesshou_hex=Template(
        sentences=[
            ['60:enemy_def_ignore_skill'],
            ['200:crit_dmg_stellar_conduct'],
        ],
    ),
)
