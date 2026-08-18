from ...template import Template, TemplateList


char_sandrone = TemplateList(
    default_rus=Template(
        names=[
            'Формула явлений: Очевидное заключение',
            'Сандроне',
        ],
        skills={
            'skill': ['Формула явлений: Дифференциальный анализ'],
            'burst': ['Формула явлений: Ч. Т. Д.'],
        },
    ),
    default_eng=Template(
        names=[
            'Formule Phenomenale: Self-Evident Proposition',
            'Sandrone',
        ],
        skills={
            'skill': ['Formule Phenomenale: Differential Analysis'],
            'burst': ['Formule Phenomenale: Q.E.D.'],
        },
    ),
    # self_evident_proposition_rus=Template(
    #     sentences=[
    #         [],
    #         [],
    #         [],
    #         [],
    #         [],
    #         [],
    #         [],
    #         [],
    #         [],
    #         [],
    #         [],
    #         [],
    #         [],
    #         ['100:ignore'],
    #         [],
    #         [],
    #         [],
    #         ['300:ignore'],
    #         [],
    #         ['50:ignore'],
    #         [],
    #         [],
    #         [],
    #         [],
    #         [],
    #     ],
    # ),
    # self_evident_proposition_eng=Template(
    #     sentences=[
    #         [],
    #         [],
    #         ['3:ignore'],
    #         [],
    #         [],
    #         [],
    #         [],
    #         [],
    #         [],
    #         [],
    #         [],
    #         [],
    #         [],
    #         ['100:ignore'],
    #         [],
    #         [],
    #         [],
    #         ['300:ignore'],
    #         [],
    #         ['50:ignore'],
    #         [],
    #         [],
    #         [],
    #         [],
    #     ],
    # ),
    a_ladys_code_of_conduct_rus=Template(
        sentences=[
            ['8:', '100:'],
            ['160:'],
        ],
    ),
    a_ladys_code_of_conduct_eng=Template(
        sentences=[
            [],
            ['100:', '8:'],
            ['160:'],
        ],
    ),
    eternal_speculation_engine=Template(
        sentences=[
            ['50:ignore', '400:'],
            [],
            ['10:ignore', '1:ignore', '60:ignore', '10:ignore'],
            ['100:', '10:'],
        ],
    ),
    light_of_rationalisme=Template(
        sentences=[
            ['8:ignore'],
            [],
            ['0.7:', '100:'],
            ['14:'],
        ],
        results=[
            [0, 1, 2, 3],
            [2, 3],
        ],
    ),
    morrow_after_the_golden_dusk=Template(
        sentences=[
            ['50:ignore', '30:dmg_reaction_stellar_conduct'],
        ],
    ),
    an_heiress_gazed_into_the_looking_glass=Template(
        sentences=[
            ['40:'],
            ['20:crit_dmg_condensed_beam'],
            ['3:ignore'],
        ],
    ),
    in_knowledge_lies_the_worlds_true_ground_rus=Template(
        sentences=[
            ['125:', '187.5:'],
            [],
            ['4:ignore'],
        ],
    ),
    in_knowledge_lies_the_worlds_true_ground_eng=Template(
        sentences=[
            ['125:', '187.5:'],
            ['4:ignore'],
        ],
    ),
    narcissus_wakes_her_eyes_upon_the_dawn=Template(
        sentences=[
            [],
            ['4:ignore', '100:'],
            [],
            ['4:ignore'],
            [],
            ['80:'],
            [],
            ['120:'],
            [],
            ['20:dmg_reaction_stellar_glimmer_bonus'],
        ],
    ),
    narcissus_wakes_her_eyes_upon_the_dawn_eng=Template(
        sentences=[
            [],
            ['4:ignore', '100:'],
            [],
            ['4:ignore'],
            [],
            [],
            ['80:'],
            [],
            ['120:'],
            [],
            ['20:dmg_reaction_stellar_glimmer_bonus'],
        ],
    ),
)
