from ...template import Template, TemplateList


char_diona = TemplateList(
    default_rus=Template(
        names=[
            'Дионе', 'Дионы',
        ],
        skills={
            'skill': ['Морозные коготочки'],
            'burst': ['Авторский коктейль'],
        },
    ),
    default_eng=Template(
        names=[
            'Diona',
            'DMG Absorption',
        ],
        skills={
            'skill': ['Icy Paws'],
            'burst': ['Signature Mix'],
        },
    ),
    cats_tail_secret_menu=Template(
        sentences=[
            ['move_speed', 'stamina_consume'],
        ],
    ),
    drunkards_farce=Template(
        sentences=[
            ['text_percent_dmg', 'ignore'],
        ],
    ),
    a_lingering_flavor=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    shaken_not_purred_rus=Template(
        sentences=[
            ['dmg_skill_diona'],
            [],
            ['ignore', 'text_percent'],
        ],
    ),
    shaken_not_purred_eng=Template(
        sentences=[
            ['dmg_skill_diona', 'diona_shield'],
            [],
            ['text_percent', 'ignore'],
        ],
    ),
    wine_industry_slayer=Template(
        sentences=[
            ['text_percent'],
        ],
    ),
    cats_tail_closing_time_rus=Template(
        sentences=[
            [],
            [],
            ['50:ignore', '30:healing_recv'],
            [],
            ['50:ignore', '200:mastery'],
        ],
        results=[
            [0, 1, 4],
            [0, 1, 2],
        ],
    ),
    cats_tail_closing_time_eng=Template(
        sentences=[
            [],
            [],
            ['30:healing_recv', '50:ignore'],
            [],
            ['200:mastery', '50:ignore'],
        ],
        results=[
            [0, 1, 4],
            [0, 1, 2],
        ],
    ),
    cats_tail_closing_time_hex=Template(
        sentences=[
            [],
            [],
            ['50:ignore', '30:healing_recv'],
            [],
            ['50:ignore', '200:mastery'],
            [],
            ['25:hp_percent'],
            [],
            [],
            [],
            ['40:dmg_reaction_superconduct'],
            [],
            ['40:dmg_reaction_swirl_cryo'],
        ],
        results=[
            [0, 1, 4],
            [0, 1, 2],
            [6],
            [8, 10],
            [8, 12],
        ],
    ),
    cats_tail_closing_time_hex_eng=Template(
        sentences=[
            [],
            [],
            ['30:healing_recv', '50:ignore'],
            [],
            ['200:mastery', '50:ignore'],
            [],
            ['25:hp_percent'],
            [],
            [],
            [],
            ['40:dmg_reaction_superconduct'],
            [],
            ['40:dmg_reaction_swirl_cryo'],
        ],
        results=[
            [0, 1, 4],
            [0, 1, 2],
            [6],
            [8],
            [8, 10],
            [8, 12],
        ],
    ),
)
