from ...template import Template, TemplateList


char_yoimiya = TemplateList(
    default_rus=Template(
        names=[
            'Ёимии', 'Ёимия', 'Вспышка фейерверка',
            'Трюки нарушителя порядка', 'Камнеломка Рюкин', 'Взрыва золотого сияния', 'Взрыв золотого сияния',
            'Зажигательны(е|ми) стрел(ы|ами)',
        ],
        skills={
            'skill': ['Огненный танец Ниваби'],
            'burst': ['Камнеломка Рюкин', 'Взрыв золотого сияния'],
        },
    ),
    default_eng=Template(
        names=[
            'Yoimiya', 'Kindling Arrows', 'Firework Flare-Up',
            'ATK Bonus', 'Tricks of the Trouble-Maker', 'Aurous Blaze', 'Blazing Arrows?', 'Ryuukin Saxifrage',
        ],
        skills={
            'skill': ['Niwabi Fire-Dance'],
            'burst': ['Ryuukin Saxifrage', 'Aurous Blaze'],
        },
    ),
    niwabi_fire_dance_rus=Template(
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
            [4, 5, 6, 7],
            [2],
        ],
        extracted_names=[2],
    ),
    niwabi_fire_dance_eng=Template(
        sentences=[
            [],
            [],
            [],
            [],
            [],
            ['2:ignore'],
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
            [4, 5, 6, 7],
            [2],
        ],
        extracted_names=[2],
    ),
    tricks_of_the_trouble_maker=Template(
        sentences=[
            ['dmg_pyro'],
            ['ignore', 'ignore'],
        ],
    ),
    summer_nights_dawn=Template(
        sentences=[
            ['text_percent', 'ignore'],
            [],
            ['text_percent_2'],
        ],
        results=[
            [0, 1, 2],
            [0],
            [1, 2],
        ]
    ),
    agate_ryuukin=Template(
        sentences=[
            ['ignore'],
            [],
            ['atk_percent', 'ignore'],
        ],
    ),
    a_procession_of_bonfires=Template(
        sentences=[
            ['dmg_pyro', 'ignore'],
            [],
            [],
        ],
    ),
    pyrotechnic_professional=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    naganohara_meteor_swarm=Template(
        sentences=[
            ['text_percent_chance', 'text_percent_dmg'],
            [],
        ],
    ),
)
