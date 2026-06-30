from ...template import Template, TemplateList


char_illuga = TemplateList(
    default_rus=Template(
        names=[
            'Иллуги', 'Клятвы светоносца', 'Соловьин(ая|ой) трел[ьи]',
        ],
        skills={
            'skill': ['Рассветное пение иволги'],
            'burst': ['Отражение без тени'],
        },
    ),
    default_eng=Template(
        names=[
            'Illuga', 'Lightkeeper\'s Oath', 'Nightingale\'s Song',
        ],
        skills={
            'skill': ['Dawnbearing Songbird'],
            'burst': ['Shadowless Reflection'],
        },
    ),
    torchforgers_covenant=Template(
        replace={
            '<br>': '\n<br>\n',
        },
        sentences=[
            ['20:ignore', '5:crit_rate_geo', '10:crit_dmg_geo'],
            [],
            [],
            [],
            [],
            [],
            ['50:format{text_number_f=2|{value}}:text_mastery'],
        ],
        results=[
            [0, 1, 2, 3, 4],
            [0],
            [4, 5, 6],
        ],
    ),
    demonhunters_dusk_rus=Template(
        sentences=[
            ['1:format{illuga_stacks=1|{value}}:', '2:format{illuga_stacks=2|{value}}:', '3:format{illuga_stacks=3|{value}}:', 
             '7:format{illuga_stacks=1|{value}}:text_geo1_percent', '14:format{illuga_stacks=2|{value}}:text_geo2_percent', '24:format{illuga_stacks=3|{value}}:text_geo3_percent'],
            ['48:format{illuga_stacks=1|{value}}:text_react1_percent', '96:format{illuga_stacks=2|{value}}:text_react2_percent', '160:format{illuga_stacks=3|{value}}:text_react3_percent'],
        ],
    ),
    solarhunting_wolf=Template(
        sentences=[
            ['200:def'],
        ],
    ),
    nightmare_orioles=Template(
        replace={
            '<br>': '\n<br>\n',
        },
        sentences=[
            ['10:text_crit_rate', '30:text_crit_dmg'],
            [],
            [],
            [],
            [],
            [],
            ['80:text_mastery'],
            [],
            [],
        ],
        results=[
            [0, 1, 8],
            [4, 5, 6, 7, 8],
        ],
    ),
    # name=Template(
    #     sentences=[
    #         [],
    #     ],
    # ),
    # name=Template(
    #     sentences=[
    #         [],
    #     ],
    # ),
)
