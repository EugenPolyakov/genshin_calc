from ...template import Template, TemplateList


char_varesa = TemplateList(
    default_rus=Template(
        names=[
            'Вареса', 'Варесы',
            'Радужное крушение', 'Радужного крушения', 'Пылающего воодушевления',
            'Трёхкратный командный прыжок', 'Громогласное вулканическое торнадо',
            'Внезапного натиска', 'Предельный импульс',
        ],
        skills={
            'skill': ['Верхом на ночной радуге'],
            'burst': ['Ослепительное сошествие!'],
        },
    ),
    default_eng=Template(
        names=[
            'Varesa',
            'Rainbow Crash', 'Fiery Passion', 'Sudden Onrush', 'Apex Drive',
            'Tag-Team Triple Jump!', 'Thunderous Tornado Eruption',
        ],
        skills={
            'skill': ['Riding the Night-Rainbow'],
            'burst': ['Guardian Vent!'],
        },
    ),
    tag_team_triple_jump=Template(
        sentences=[
            ['5:ignore'],
            [],
            ['50:text_percent'],
            ['180:text_percent'],
            [],
            [],
        ],
        results=[
            [0, 1, 2, 4, 5],
            [3],
        ],
    ),
    the_hero_twice_returned=Template(
        sentences=[
            ['35:atk_percent', '12:ignore'],
            ['2:ignore'],
            [],
        ],
    ),
    undying_passion=Template(
        sentences=[
            [],
            [],
            ['5:ignore'],
            [],
            ['180:text_percent'],
            [],
            [],
            ['30:ignore'],
        ],
    ),
    beyond_the_edge_of_light=Template(
        sentences=[
            [],
            [],
            [],
            [],
            ['11.5:ignore'],
        ],
    ),
    the_courage_to_press_on_rus=Template(
        sentences=[
            [],
            [],
            [],
            ['15:ignore', '500:text_percent', '20000:text_value_max'],
            [],
            [],
            ['100:dmg_burst_varesa'],
        ],
        results=[
            [0, 1, 2, 3, 4],
            [0, 1, 5, 6],
        ],
    ),
    the_courage_to_press_on_eng=Template(
        sentences=[
            [],
            [],
            ['15:ignore', '500:text_percent', '20000:text_value_max'],
            [],
            [],
            ['100:dmg_burst_varesa'],
        ],
        results=[
            [0, 1, 2, 3],
            [0, 4, 5],
        ],
    ),
    a_hero_of_justices_triumph=Template(
        sentences=[
            ['30:ignore'],
            [],
            ['10:crit_rate_plunge', '100:crit_dmg_plunge'],
            [],
            [],
        ],
    ),
)
