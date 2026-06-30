from unittest import result
from ...template import Template, TemplateList


char_zibai = TemplateList(
    default_rus=Template(
        names=[
            'Цзы Бай',
        ],
        skills={
            'skill': ['Когда небо и земля стали единым'],
            'burst': ['Величие трёх сфер'],
        },
    ),
    default_eng=Template(
        names=[
            'Zibai',
        ],
        skills={
            'skill': ['Heaven and Earth Made Manifest'],
            'burst': ['Tri-Sphere Eminence'],
        },
    ),
    n11260001_rus=Template(
        replace={
            ':': '\n:',
        },
        names=['Обычные'],
        sentences=[
            [],
            ['4:ignore'],
            [],
            [],
            [],
            [],
            [],
            ['70:ignore'],
            ['70:ignore'],
            [],
            [],
            [],
            ['100:ignore'],
            [],
            [],
            [],
            [],
            ['10:ignore'],
            [],
            [],
            ['5:ignore'],
            [],
            ['1:ignore', '0.5:ignore'],
            [],
            [],
            [],
            ['35:ignore'],
            [],
            ['1:ignore', '4:ignore'],
            [],
            [],
            ['4:ignore'],
        ],
        results=[
            [4, 5, 6],
        ],
    ),
    n11260001_eng=Template(
        replace={
            ':': '\n:',
        },
        sentences=[
            [],
            ['4:ignore'],
            [],
            [],
            [],
            [],
            [],
            ['70:ignore', '70:ignore'],
            [],
            [],
            ['100:ignore'],
            [],
            [],
            ['10:ignore'],
            [],
            ['5:ignore'],
            ['0.5:ignore'],
            [],
            [],
            [],
            [],
            ['35:ignore'],
            ['4:ignore'],
            [],
            [],
            ['4:ignore'],
        ],
        results=[
            [4, 5, 6],
        ],
    ),
    the_selenic_adeptus_descends_rus=Template(
        sentences=[
            ['4:ignore', '60:text_percent'],
        ],
    ),
    the_selenic_adeptus_descends_eng=Template(
        sentences=[
            ['4:ignore', '2:ignore', '60:text_percent'],
        ],
    ),
    layered_peaks_pierce_the_clouds=Template(
        sentences=[
            ['15:text_def_percent'],
            ['60:text_mastery'],
        ],
    ),
    the_coursing_sun_and_moon_rus=Template(
        sentences=[
            ['0,7:text_percent', '100:ignore'],
            ['14:text_percent_max'],
            [],
            ['1:ignore'],
        ],
    ),
    the_coursing_sun_and_moon_eng=Template(
        sentences=[
            ['100:ignore', '0.7:text_percent', '14:text_percent_max'],
            [],
            ['1:ignore'],
        ],
    ),
    burst_forth_with_vigor_but_enter_in_silence_rus=Template(
        sentences=[
            ['100:ignore', '5:ignore'],
            [],
            ['220:text_percent'],
        ],
    ),
    burst_forth_with_vigor_but_enter_in_silence_eng=Template(
        sentences=[
            ['100:ignore', '5:ignore'],
            [],
            ['2:ignore', '220:text_percent'],
        ],
    ),
    at_birth_are_souls_born_and_in_death_leave_but_husks_rus=Template(
        sentences=[
            ['30:dmg_reaction_lunarcrystallize'],
            [],
            ['550:text_percent'],
            [],
        ],
        results=[
            [0],
            [2, 3],
        ],
    ),
    at_birth_are_souls_born_and_in_death_leave_but_husks_eng=Template(
        sentences=[
            ['30:dmg_reaction_lunarcrystallize'],
            [],
            ['2:ignore', '550:text_percent'],
            [],
        ],
        results=[
            [0],
            [2, 3],
        ],
    ),
    the_spirit_passes_then_form_follows_rus=Template(
        sentences=[
            ['250:text_percent'],
        ],
    ),
    the_spirit_passes_then_form_follows_eng=Template(
        sentences=[
            ['4:ignore', '250:text_percent'],
        ],
    ),
    # the_world_a_journey_in_passing=Template(
    #     sentences=[
    #         [],
    #     ],
    # ),
)
