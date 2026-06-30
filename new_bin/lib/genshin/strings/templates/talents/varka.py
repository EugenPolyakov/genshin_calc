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
        ],
        results=[
            ['<p>', 2, 3, 4, 5, 6],
        ],
    ),
    n11280001_eng=Template(
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
        ],
        results=[
            ['<p>', 2, 3, 4, 5, 6, 7],
        ],
    ),
    dawn_winds_march=Template(
        # replace={
        #     '<br><br>': '\n<br><br>\n',
        # },
        sentences=[
            ['1000:', '10:'],
            ['25:', '2:ignore', '2:ignore', '140:format{varka_has_one=1|{value}}:'],
            ['2:ignore', '2:ignore', '220:format{varka_has_all=1|{value}}:'],
            # [],
        ],
    ),
    # winds_vanguard=Template(
    #     sentences=[
    #         [],
    #     ],
    # ),
    # dawns_return=Template(
    #     sentences=[
    #         [],
    #     ],
    # ),
    # come_friend_let_us_dance_beneath_the_moons_soft_glow=Template(
    #     sentences=[
    #         [],
    #     ],
    # ),
    # come_friend_let_us_dance_beneath_the_moons_soft_glow=Template(
    #     sentences=[
    #         [],
    #     ],
    # ),
    # when_dawn_breaks_our_journey_shall_take_flight=Template(
    #     sentences=[
    #         [],
    #     ],
    # ),
    # for_none_may_take_from_us_our_freedom_of_song=Template(
    #     sentences=[
    #         [],
    #     ],
    # ),
    # beloved_mondstadt_steadfast_you_shall_shine=Template(
    #     sentences=[
    #         [],
    #     ],
    # ),
)
