from ...template import Template, TemplateList


char_flins = TemplateList(
    default_rus=Template(
        names=[
            'Флинс',
        ],
        keywords=[('Лунный заряд', 'electro'),],
        skills={
            'skill': ['Древний обряд: Тайный свет'],
            'burst': ['Древний ритуал: Наступает ночь'],
        },
    ),
    default_eng=Template(
        names=[
            'Flins',
        ],
        keywords=[('Lunar-Charged', 'electro'),],
        skills={
            'skill': ['Ancient Rite: Arcane Light'],
            'burst': ['Ancient Ritual: Cometh the Night'],
        },
    ),
    arcane_light_rus = Template(
        replace={'</p><p>': '</p>\n<p>'},
        sentences=[
            [],
            [],
            [],
            ['ignore', 'ignore'],
            [],
        ],
        results=[
            [0, 1, 2, 3, 4],
            [0, 1, 2],
        ],
    ),
    arcane_light_eng = Template(
        replace={'</p><p>': '</p>\n<p>'},
        sentences=[
            [],
            [],
            ['ignore', 'ignore'],
            [],
        ],
        results=[
            [0, 1, 2, 3],
            [0, 1],
        ],
    ),
    symphony_of_winter=Template(
        sentences=[
            ['20:format{text_number_f=2|{value}}:text_percent_value'],
        ],
    ),
    the_burden_of_creative_genius=Template(
        sentences=[
            ['15:ignore', '15:text_number_percent_1', '20:format{text_number_f=2|{value}}:text_number_percent_2'],
        ],
    ),
    the_devils_wall=Template(
        replace={
            '<br>': '\n<br>\n',
        },
        sentences=[
            ['6:ignore', '50:text_percent'],
            [],
            [],
            ['25:enemy_res_electro', '7:ignore'],
        ],
        results=[
            [0, 1],
            [3],
        ],
    ),
    old_world_secrets_rus=Template(
        sentences=[
            ['0,7:text_percent', '100:ignore'],
            ['14:text_percent_max', '1:ignore'],
        ],
    ),
    old_world_secrets_eng=Template(
        sentences=[
            ['100:ignore', '0.7:text_percent', '14:text_percent_max', '1:ignore'],
        ],
    ),
    songs_and_dances_of_death=Template(
        replace={
            '<br>': '\n<br>\n',
        },
        sentences=[
            ['35:text_1_percent'],
            [],
            ['10:format{text_number_f=2|{value}}:text_2_percent'],
        ],
        results=[
            [0, 1, 2],
            [2],
        ],
    ),
)
