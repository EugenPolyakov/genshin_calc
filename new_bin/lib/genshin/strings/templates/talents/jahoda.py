from ...template import Template, TemplateList


char_jahoda = TemplateList(
    default_rus=Template(
        names=[
            'Ягода',
        ],
        keywords=[
        ],
        skills={
            'skill': ['Хитроумный план: Раздел добычи'],
            'burst': ['Тузы в рукаве: Семь инструментов охотника'],
        },
    ),
    default_eng=Template(
        names=[
            'Jahoda', 'Shadow Pursuit', 'DMG'
        ],
        keywords=[
        ],
        skills={
            'skill': ['Savvy Strategy: Splitting the Spoils'],
            'burst': ["Hidden Aces: Seven Tools of the Hunter"],
        },
    ),
    plan_to_get_paid = Template(
        sentences=[
            [],
            [],
            [],
            [],
            [],
            ['130:text_percent_dmg'],
            [],
            ['120:text_percent_heal'],
            [],
            ['1:'],
            [],
            ['10:'],
            [],
            [],
            [],
        ],
    ),
    plan_to_get_paid_eng = Template(
        sentences=[
            [],
            [],
            [],
            [],
            [],
            ['130:text_percent_dmg'],
            [],
            ['120:text_percent_heal'],
            [],
            [],
            [],
            ['10:'],
            [],
            [],
            [],
        ],
    ),
    sweet_berry_bounty = Template(
        sentences=[
            ['70:', '100:mastery', '6:ignore'],
        ],
    ),
    the_littlest_luck = Template(
        sentences=[
            ['20:ignore', '5:crit_rate', '40:crit_dmg'],
        ],
    ),
    the_littlest_luck_eng = Template(
        sentences=[
            ['5:crit_rate', '40:crit_dmg', '20:ignore'],
        ],
    ),
)
