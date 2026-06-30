from ...template import Template, TemplateList


char_varka = TemplateList(
    default_rus=Template(
        names=[
            'Варка',
        ],
        skills={
            'skill': ['Казнь встречных ветров'],
            'burst': ['Воплощение северного ветра'],
        },
    ),
    default_eng=Template(
        names=[
            'Varka',
        ],
        skills={
            'skill': ['Windbound Execution'],
            'burst': ['Northwind Avatar'],
        },
    ),
    n11280001_rus=Template(
        names=['обычной', 'обычных'],
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
        ],
        results=[
            [2, 3, 4, 5, 6],
        ],
    ),
    n11280001_eng=Template(
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
        ],
        results=[
            [2, 3, 4, 5, 6, 7],
        ],
    ),
    dawn_winds_march=Template(
        sentences=[
            ['1000:', '10:'],
            ['25:'],
            [],
            ['2:ignore', '2:ignore', '140:format{varka_has_one=1|{value}}:'],
            ['2:ignore', '2:ignore', '220:format{varka_has_all=1|{value}}:'],
        ],
    ),
    winds_vanguard_rus=Template(
        sentences=[
            ['1:ignore', '7.5:dmg_sturm_und_drang'],
            ['8:ignore', '4:ignore'],
            ['1:ignore'],
        ],
    ),
    winds_vanguard_eng=Template(
        sentences=[
            ['7.5:dmg_sturm_und_drang', '8:ignore'],
            ['4:ignore'],
            ['1:ignore'],
        ],
    ),
    dawns_return=Template(
        sentences=[
            [],
            ['2:ignore'],
            [],
            [],
            [],
            ['1:ignore'],
        ],
        results=[
            [0, 1],
            [3, 4, 5],
        ],
    ),
    come_friend_let_us_dance_beneath_the_moons_soft_glow_rus=Template(
        sentences=[
            ['1:ignore'],
            [],
            ['200:'],
        ],
    ),
    come_friend_let_us_dance_beneath_the_moons_soft_glow_eng=Template(
        sentences=[
            [],
            [],
            ['200:'],
        ],
    ),
    when_dawn_breaks_our_journey_shall_take_flight=Template(
        sentences=[
            ['800:'],
        ],
    ),
    for_none_may_take_from_us_our_freedom_of_song_rus=Template(
        sentences=[
            ['10:ignore', '20:'],
        ],
    ),
    for_none_may_take_from_us_our_freedom_of_song_eng=Template(
        sentences=[
            ['20:', '10:ignore'],
        ],
    ),
    beloved_mondstadt_steadfast_you_shall_shine=Template(
        sentences=[
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            ['20:'],
        ],
    ),
)
