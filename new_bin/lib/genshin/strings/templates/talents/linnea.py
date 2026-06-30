from ...template import Template, TemplateList


char_linnea = TemplateList(
    default_rus=Template(
        names=[
            'Линнеи',
        ],
        skills={
            'skill': ["Контрмера: Боевой клич Луми!"],
            'burst': ["Памятка: Руководство по выживанию в экстремальных условиях"],
        },
    ),
    default_eng=Template(
        names=[
        ],
        skills={
            'skill': ["Countermeasure: Lumi's Battle Cry!"],
            'burst': ["Memo: Survival Guide in Extreme Conditions"],
        },
    ),
    field_observation_notes=Template(
        sentences=[
            ['15:enemy_res_geo'],
            [],
            [],
            ['15:enemy_res_geo'],
        ],
        results=[
            [0],
            [2, 3],
        ],
    ),
    universal_naturalist_archive_rus=Template(
        sentences=[
            ['5:'],
            [],
            [],
            [],
            [],
            [],
        ],
        results=[
            list(range(0, 6)),
            list(range(0, 4)),
        ],
    ),
    universal_naturalist_archive_eng=Template(
        sentences=[
            [],
            ['5:'],
            [],
            [],
            [],
            [],
            [],
        ],
        results=[
            list(range(0, 7)),
            list(range(0, 5)),
        ],
    ),
    habitat_survey_rus=Template(
        sentences=[
            ['0,7:', '100:'],
            ['14:'],
            [],
            ['1:ignore'],
        ],
    ),
    habitat_survey_eng=Template(
        sentences=[
            ['100:', '0.7:', '14:'],
            [],
            ['1:ignore'],
        ],
    ),
    provisional_classification_rus=Template(
        names=['Каталога наблюдений'],
        sentences=[
            ['6:ignore'],
            ['10:ignore', '18:ignore'],
            ['75:'],
            [],
            ['5:ignore', '150:'],
        ],
        results=[
            list(range(0, 5)),
            list(range(0, 3)),
        ],
    ),
    provisional_classification_eng=Template(
        names=['Field Catalog'],
        sentences=[
            ['6:ignore', '10:ignore'],
            ['18:ignore'],
            ['1:ignore'],
            ['75:'],
            [],
            ['5:ignore'],
            ['150:'],
        ],
        results=[
            list(range(0, 7)),
            list(range(0, 4)),
        ],
    ),
    tidings_of_joy_and_sorrow_rus=Template(
        sentences=[
            ['8:ignore', '40:crit_dmg', '150:crit_dmg_c2_lumi|150'],
            [],
            [],
        ],
        results=[
            [0],
            [2],
        ],
    ),
    tidings_of_joy_and_sorrow_eng=Template(
        sentences=[
            ['8:ignore', '40:crit_dmg'],
            ['150:crit_dmg_c2_lumi|150'],
            [],
            [],
            [],
        ],
        results=[
            [0, 1],
            [3, 4],
        ],
    ),
    expert_instinct=Template(
        sentences=[
            ['5:ignore', '25:def_percent'],
            [],
        ],
        results=[
            [0, 1],
            [0],
        ],
    ),
    golden_beagles_dream=Template(
        sentences=[
            [],
            ['150:'],
            [],
            ['25:dmg_reaction_lunarcrystallize_bonus'],
        ],
        results=[
            [0, 1],
            [3],
        ],
    ),
)
