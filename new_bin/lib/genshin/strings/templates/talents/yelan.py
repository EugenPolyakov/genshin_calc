from ...template import Template, TemplateList


char_yelan = TemplateList(
    default_rus=Template(
        names=[
            'Е Лань',
            'Изысканных игральных костей', 'Стратега', 'Прорывными стрелами', 'Прорывных стрел',
        ],
        skills={
            'skill': ['Переплетённая нить жизни', 'Нити жизни'],
            'burst': ['Изысканный бросок', 'Изысканные игральные кости'],
        },
    ),
    default_eng=Template(
        names=[
            'Yelan',
            'Exquisite Throw', 'Lifeline', 'Mastermind', 'Breakthrough Barbs', 'Depth-Clarion Dice',
        ],
        skills={
            'skill': ['Lingering Lifeline', 'Lifeline'],
            'burst': ['Exquisite Throw', 'Depth-Clarion Dice'],
        },
    ),
    turn_control_rus=Template(
        sentences=[
            ['1:format{text_number=1|{value}}:ignore', '2:format{text_number=2|{value}}:ignore', '3:format{text_number=3|{value}}:ignore',
                '4:format{text_number=4|{value}}:ignore',
                '6:format{text_number=1|{value}}:ignore', '12:format{text_number=2|{value}}:ignore', '18:format{text_number=3|{value}}:ignore',
                '30:format{text_number=4|{value}}:ignore'],
        ],
    ),
    turn_control_eng=Template(
        sentences=[
            ['1:format{text_number=1|{value}}:ignore', '2:format{text_number=2|{value}}:ignore', '3:format{text_number=3|{value}}:ignore',
                '4:format{text_number=4|{value}}:ignore',
                '6:format{text_number=1|{value}}:ignore', '12:format{text_number=2|{value}}:ignore', '18:format{text_number=3|{value}}:ignore',
                '30:format{text_number=4|{value}}:ignore'],
        ],
    ),
    adapt_with_ease_rus=Template(
        sentences=[
            [None, None],
            ['ignore'],
            [],
            [],
        ],
    ),
    adapt_with_ease_eng=Template(
        sentences=[
            [None],
            [None],
            ['ignore'],
            [],
            [],
        ],
    ),
    enter_the_plotters=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    taking_all_comers=Template(
        sentences=[
            ['text_percent'],
            [],
            ['ignore'],
        ],
    ),
    bait_and_switch_rus=Template(
        sentences=[
            ['ignore', 'hp_percent'],
            ['text_percent_max'],
        ],
    ),
    bait_and_switch_eng=Template(
        sentences=[
            ['hp_percent', 'ignore'],
            ['text_percent_max'],
        ],
    ),
    winner_takes_all=Template(
        sentences=[
            [],
            [],
            [],
            ['text_percent'],
            [],
            ['ignore', 'ignore'],
        ],
    ),
)
