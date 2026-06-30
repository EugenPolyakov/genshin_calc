from ...template import Template, TemplateList


char_kamisato_ayato = TemplateList(
    default_rus=Template(
        names=[
            'Камисато Аято', 'Аято', 'Намисэн',
            'Искусство Камисато: Кёка', 'Искусство Камисато: Суйю', 'Сюнсуйкэн',
            'энергия',
        ],
        skills={
            'skill': ['Искусство Камисато: Кёка', 'Искусства Камисато: Кёка', 'Сюнсуйкэн', 'Намисэн'],
            'burst': ['Искусство Камисато: Суйю', 'Искусства Камисато: Суйю'],
        },
    ),
    default_eng=Template(
        names=[
            'Kamisato Ayato', 'Ayato', 'Namisen',
            'Kamisato Art: Kyouka', 'Kamisato Art: Suiyuu', 'Shunsuiken',
        ],
        skills={
            'skill': ['Kamisato Art: Kyouka', 'Shunsuiken', 'Namisen'],
            'burst': ['Kamisato Art: Suiyuu'],
        },
    ),
    kyouka_rus=Template(
        names=['Клинки водных цветов', 'Такимэгури канка'],
        replace={
            '</p><p>': '\n</p><p>\n',
            '<br>': '\n<br>\n',
            ' увеличивает ': ' увеличивает \n',
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
            ['4:ignore'],
            ['0.1:ignore'],
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
            list(range(0, 32)),
            [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, '<br>', 24],
            [5],
            ['Увеличивает', 14, 15],
        ],
        extracted_names=[2],
    ),
    kyouka_eng=Template(
        names=['Takimeguri Kanka'],
        replace={
            '</p><p>': '\n</p><p>\n',
            '<br>': '\n<br>\n',
            'increasing': 'increasing\n',
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
            ['4:ignore', '1:ignore', '0.1:ignore'],
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
            list(range(0, 27)),
            [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, '<br>', 21],
            [5],
            ['Increase', 13],
        ],
        extracted_names=[2],
    ),
    suiyuu=Template(
        names=['Клинки водных цветов', 'Bloomwater Blades'],
        replace={
            '<p>': '<p>\n',
            '</p><p>': '\n</p><p>',
        },
        sentences=[
            [],
            [],
            [],
            [],
            [],
        ],
        results=[
            [0, 1, 2, 3, 4],
            [1, 2],
        ],
    ),
    mine_wo_matoishi_kiyotaki_rus=Template(
        sentences=[],
    ),
    mine_wo_matoishi_kiyotaki_eng=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    michiyuku_hagetsu=Template(
        sentences=[
            ['ignore', 'ignore'],
        ],
    ),
    kyouka_fuushi=Template(
        sentences=[
            ['dmg_normal_ayato', 'ignore'],
        ],
    ),
    world_source_rus=Template(
        sentences=[
            ['ignore'],
            ['ignore'],
            ['hp_percent'],
        ],
        results=[
            [0],
            [1, 2],
        ]
    ),
    world_source_eng=Template(
        sentences=[
            ['ignore'],
            ['ignore', 'hp_percent'],
        ],
        results=[
            [0],
            [1],
        ]
    ),
    endless_flow=Template(
        sentences=[
            ['atk_speed_normal', 'ignore'],
        ],
    ),
    boundless_origin=Template(
        sentences=[
            ['ignore', 'text_percent_dmg'],
        ],
    ),
)
