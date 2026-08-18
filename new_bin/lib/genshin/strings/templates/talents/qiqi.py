from ...template import Template, TemplateList


char_qiqi = TemplateList(
    default_rus=Template(
        names=[
            'Ци Ци',
            'обычной', 'Вестник стужи',
            'талисман Фортуны', 'талисманом Фортуны',
        ],
        skills={
            'skill': ['Искусство Адепта: Вестник стужи'],
            'burst': ['Искусство Адепта: Хранитель Фортуны'],
        },
    ),
    default_eng=Template(
        names=[
            'Qiqi',
            'Fortune-Preserving Talisman',
            'Charge Attack', 'Herald of Frost',
        ],
        skills={
            'skill': ['Adeptus Art: Herald of Frost'],
            'burst': ['Adeptus Art: Preserver of Fortune'],
        },
    ),
    life_prolonging_methods=Template(
        sentences=[
            ['healing_recv', 'ignore'],
        ],
    ),
    seven_sacred_treasures=Template(
        sentences=[
            ['15:ignore'],
            [],
            [],
            [],
            ['50:dmg_reaction_stellar_conduct'],
            [],
            ['50:dmg_reaction_stellar_swirl'],
            [],
            ['8:ignore'],
        ],
        results=[
            [0],
            [2, 3, 4],
        ],
    ),
    a_glimpse_into_arcanum_hex=Template(
        sentences=[
            ['50:ignore', '6:ignore'],
            ['30:ignore'],
            [],
            ['100:ignore', '15:ignore'],
        ],
        results=[
            [0, 1],
            [3],
        ],
    ),
    ascetics_of_frost=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    frozen_to_the_bone_hex=Template(
        sentences=[
            ['dmg_normal'],
            [],
            ['50:atk_percent'],
        ],
        results=[
            [0],
            [2],
        ],
    ),
    divine_suppression=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    divine_suppression_hex=Template(
        sentences=[
            ['20:ignore'],
            [],
            ['180:'],
        ],
    ),
    rite_of_resurrection=Template(
        sentences=[
            ['ignore'],
            [],
            ['ignore'],
        ],
    ),
    rite_of_resurrection_hex_rus=Template(
        replace= {
            'Кроме того, после': 'Кроме того, после\n',
        },
        sentences=[
            ['50:ignore'],
            [],
            ['15:ignore'],
            [],
            [],
            ['4:ignore'],
            ['1:ignore', '600:'],
            ['12:ignore'],
            [],
        ],
        results=[
            list(range(0, 9)),
            ['После', 5, 6, 7, 8],
        ],
    ),
    rite_of_resurrection_hex_eng=Template(
        replace= {
            'Additionally, after': 'Additionally, after\n',
        },
        sentences=[
            ['50:ignore'],
            [],
            ['15:ignore'],
            [],
            [],
            ['4:ignore', '1:ignore', '600:'],
            ['12:ignore'],
        ],
        results=[
            list(range(0, 7)),
            ['After', 5, 6],
        ],
    ),
)
