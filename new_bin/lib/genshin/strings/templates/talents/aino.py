from ...template import Template, TemplateList


char_aino = TemplateList(
    default_rus=Template(
        names=[
            'Айно',
        ],
        skills={
            'skill': ['Ловец вдохновения'],
            'burst': ['Точный водоохладитель'],
        },
    ),
    default_eng=Template(
        names=[
            'Aino',
        ],
        skills={
            'skill': ['Musecatcher'],
            'burst': ['Precision Hydronic Cooler'],
        },
    ),
    musecatcher = Template(
        prouds=[1]
    ),
    structured_power_booster=Template(
        sentences=[
            ['50:dmg_burst_bonus_percent'],
        ],
    ),
    the_theory_of_ashfield_equilibrium=Template(
        sentences=[
            ['80:mastery'],
            ['80:mastery', '15:ignore'],
        ],
    ),
    butter_and_cats_and_the_law_of_energy_supply=Template(
        sentences=[
            ['10:'],
            ['10:ignore'],
        ],
    ),
    the_principle_of_transference_in_gear_differentials=Template(
        sentences=[
            ['1:ignore', '25:dmg_atk', '100:dmg_mastery'],
            ['5:ignore'],
        ],
    ),
    the_principle_of_transference_in_gear_differentials_eng=Template(
        sentences=[
            ['25:dmg_atk', '100:dmg_mastery'],
            [],
            ['5:ignore'],
        ],
    ),
    the_burden_of_creative_genius=Template(
        sentences=[
            ['15:ignore', '15:text_number_percent_1', '20:format{text_number_f=2|{value}}:text_number_percent_2'],
        ],
    ),
)
