from ...template import Template, TemplateList


char_wanderer = TemplateList(
    default_rus=Template(
        names=[
            'Странник', 'Странника',
            'Ханэга: Песнь ветра', 'Избранника ветра', 'куго-рёку', 'Избранника ветра',
            'Куго: Фусёдан', 'Куго: Тофукай', 'Бури грёз', 'Кёгэн: Пять церемониальных актов',
            'Сошествие: ускорение в воздухе', 'стрел ветра', 'Цветок нефрита',
        ],
        skills={
            'skill': ['Ханэга: Песнь ветра', 'Избранника ветра'],
            'burst': ['Кёгэн: Пять церемониальных актов'],
        },
    ),
    default_eng=Template(
        names=[
            'Wanderer',
            'Windfavored', 'Kuugo: Fushoudan', 'Kuugo: Toufukai', 'Descent', 'Kuugoryoku Points', 'Kuugoryoku',
            'Gales of Reverie', 'Kyougen: Five Ceremonial Plays', 'Jade-Claimed Flower',
        ],
        skills={
            'skill': ['Windfavored'],
            'burst': ['Kyougen: Five Ceremonial Plays'],
        },
    ),
    song_of_the_wind_rus=Template(
        names=['уроном обычной', 'Обычные'],
        replace={
            '</p><p>': '</p><p>\n',
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
            [],
            [],
            [],
            [],
            [],
            [],
            [],
        ],
        results=[
            list(range(0, 23)),
            [4, 5, 6],
            [2],
        ],
        extracted_names=[2],
    ),
    song_of_the_wind_eng=Template(
        replace={
            '</p><p>': '</p><p>\n',
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
            [],
            [],
            [],
            [],
            [],
            [],
        ],
        results=[
            list(range(0, 22)),
            [3, 4],
            [1],
        ],
        extracted_names=[2],
    ),
    jade_claimed_flower=Template(
        sentences=[
            [None, None, None, 'ignore'],
            ['ignore', 'ignore'],
        ],
    ),
    gales_of_reverie=Template(
        sentences=[
            ['ignore', 'ignore', 'text_percent_dmg', 'ignore'],
            ['ignore'],
        ],
    ),
    ostentatious_plumage=Template(
        sentences=[
            ['atk_speed_normal', 'text_percent_dmg'],
            [],
        ],
    ),
    isle_amidst_white_waves=Template(
        sentences=[
            [None, None],
        ],
    ),
    set_adrift_into_spring_rus=Template(
        sentences=[
            ['ignore'],
            ['ignore'],
        ],
    ),
    set_adrift_into_spring_eng=Template(
        sentences=[
            [],
            ['ignore'],
        ],
    ),
    the_curtains_melancholic_sway_rus=Template(
        sentences=[
            ['text_percent_dmg'],
            ['ignore', 'ignore'],
            ['ignore', 'ignore'],
            ['ignore'],
        ],
    ),
    the_curtains_melancholic_sway_eng=Template(
        sentences=[
            ['text_percent_dmg'],
            ['ignore', 'ignore'],
            ['ignore'],
            ['ignore'],
        ],
    ),
)
