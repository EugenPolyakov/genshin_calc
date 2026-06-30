from ...template import Template, TemplateList


char_xiao = TemplateList(
    default_rus=Template(
        names=[
            'Сяо',
            'Лемниската ветра',
        ],
        skills={
            'skill': ['Лемниската ветра'],
            'burst': ['Истребление всего зла'],
        },
    ),
    default_eng=Template(
        names=[
            'Xiao',
            'Lemniscatic Wind Cycling',
        ],
        skills={
            'skill': ['Lemniscatic Wind Cycling'],
            'burst': ['Bane of All Evil'],
        },
    ),
    bane_of_all_evil_rus=Template(
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
            [],
            [],
        ],
        results=[
            list(range(0, 18)),
            [4, 5, 6, 7, 8, 9],
        ],
    ),
    bane_of_all_evil_eng=Template(
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
            [],
        ],
        results=[
            list(range(0, 17)),
            [4, 5, 6, 7, 8],
        ],
    ),
    tamer_of_demons=Template(
        sentences=[
            ['dmg_all'],
            ['dmg_all', 'ignore'],
            [],
            ['ignore'],
        ],
    ),
    heaven_fall_rus=Template(
        sentences=[
            ['ignore', 'dmg_skill_xiao'],
            [],
            ['ignore'],
            [],
        ],
    ),
    heaven_fall_eng=Template(
        sentences=[
            ['dmg_skill_xiao'],
            [],
            ['ignore', 'ignore'],
            [],
        ],
    ),
    destroyer_of_worlds=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    blossom_of_kaleidos=Template(
        sentences=[
            ['recharge'],
        ],
    ),
    extinction_of_suffering=Template(
        sentences=[
            ['text_percent_hp', 'def_percent'],
        ],
    ),
    guardian_yaksha_rus=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    guardian_yaksha_eng=Template(
        sentences=[
            ['ignore', 'ignore', 'ignore'],
        ],
    ),
)
