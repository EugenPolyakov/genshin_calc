from ...template import Template, TemplateList


char_noelle = TemplateList(
    default_rus=Template(
        names=[
            'Ноэлль',
            'защиты', 'обычными',
        ],
        skills={
            'skill': ['Бронефартук'],
            'burst': ['Генеральная уборка'],
        },
    ),
    default_eng=Template(
        names=[
            'Noelle',
        ],
        skills={
            'skill': ['Breastplate'],
            'burst': ['Sweeping Time'],
        },
    ),
    sweeping_time_rus=Template(
        patterns=[
            (r'этого name\{', 'этого\nname{'),
        ],
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
        ],
        results=[
            list(range(0, 12)),
            [3, 4, 5, 6, 7, 8, 9]
        ],
    ),
    sweeping_time_eng=Template(
        patterns=[
            (r', name\{', ',\nname{'),
        ],
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
            [4, 5, 6, 7, 8, 9, 10]
        ],
    ),
    devotion=Template(
        sentences=[
            ['ignore'],
            [],
            ['ignore', 'text_percent'],
            [],
            ['ignore'],
            [],
            ['ignore'],
        ],
    ),
    nice_and_clean=Template(
        sentences=[
            ['ignore', 'ignore'],
            [],
            ['ignore'],
        ],
    ),
    i_got_your_back=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    combat_maid=Template(
        sentences=[
            ['stamina_consume_charged', 'dmg_charged'],
        ],
    ),
    to_be_cleaned=Template(
        sentences=[
            ['text_percent_dmg'],
        ],
    ),
    must_be_spotless_rus=Template(
        sentences=[
            ['text_percent_dmg'],
            [],
            ['ignore'],
            ['ignore'],
        ],
    ),
    must_be_spotless_eng=Template(
        sentences=[
            ['text_percent_dmg'],
            [],
            ['ignore', 'ignore'],
        ],
    ),
)
