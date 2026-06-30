from ...template import Template, TemplateList


char_columbina = TemplateList(
    default_rus=Template(
        names=[
        ],
        skills={
            'skill': [],
            'burst': [],
        },
    ),
    default_eng=Template(
        names=[
        ],
        skills={
            'skill': [],
            'burst': [],
        },
    ),
    dreamlike_glow_across_tranquil_waters=Template(
        sentences=[
            ['3:ignore'],
            [],
            ['15:ignore'],
            [],
            ['1.5:dmg_reaction_lunar_bonus'],
        ],
        results=[
            [4],
        ],
    ),
    silence_tending_one_lone_song=Template(
        sentences=[
            ['3:ignore'],
            [],
            ['15:ignore'],
            [],
            ['1.5:dmg_reaction_lunar_bonus'],
        ],
        results=[
            [4],
        ],
    ),
    lunacys_lurer_rus=Template(
        sentences=[
            ['10:ignore', '5:'],
            ['3:ignore'],
        ],
    ),
    lunacys_lure_eng=Template(
        sentences=[
            ['5:', '10:ignore'],
            ['3:ignore'],
        ],
    ),
    moonlight_lent_unto_you_rus=Template(
        sentences=[
            ['0.2:text_percent', '1000:'],
            ['7:text_percent_max'],
            [],
            ['1:ignore'],
        ],
    ),
    moonlight_lent_unto_you_eng=Template(
        sentences=[
            [],
            [],
            ['1000:', '0.2:text_percent', '7:text_percent_max'],
            [],
            ['1:ignore'],
        ],
    ),
    radiance_over_blossoms_and_peaks_rus=Template(
        sentences=[
            [],
            ['15:ignore'],
            [],
            [],
            [],
            [],
            [],
            ['6:ignore'],
            [],
            ['8:ignore'],
            [],
            ['8:ignore', '250:'],
            ['12:text_hp_percent'],
            [],
            ['1.5:dmg_reaction_lunar_bonus'],
        ],
        results=[
            [0, 1, 2, 14],
            list(range(3, 13)),
            [14],
        ],
    ),
    radiance_over_blossoms_and_peaks_eng=Template(
        sentences=[
            [],
            ['15:ignore'],
            [],
            [],
            [],
            [],
            [],
            ['6:ignore'],
            [],
            ['8:ignore'],
            [],
            [],
            ['12:text_hp_percent', '250:', '8:ignore'],
            [],
            ['1.5:dmg_reaction_lunar_bonus'],
        ],
        results=[
            [0, 1, 2, 14],
            list(range(3, 13)),
            [14],
        ],
    ),
    not_in_lone_splendor_rus=Template(
        sentences=[
            ['34:'],
            [],
            ['40:hp_percent', '8:ignore'],
            [],
            [],
            [],
            [],
            [],
            ['1:text_atk_percent'],
            [],
            ['0.35:text_mastery_percent'],
            [],
            ['1:text_def_percent'],
            [],
            ['7:dmg_reaction_lunar_bonus'],
        ],
        results=[
            [0, 1, 13, 14],
            [2],
            [4, 5, 6, 7, 8],
            [4, 5, 6, 7, 10],
            [4, 5, 6, 7, 12],
            [14],
        ],
    ),
    not_in_lone_splendor_eng=Template(
        sentences=[
            ['34:'],
            [],
            ['40:hp_percent', '8:ignore'],
            [],
            [],
            [],
            [],
            [],
            [],
            ['1:text_atk_percent'],
            [],
            [],
            ['0.35:text_mastery_percent'],
            [],
            [],
            ['1:text_def_percent'],
            [],
            ['7:dmg_reaction_lunar_bonus'],
        ],
        results=[
            [0, 16, 17],
            [2],
            [4, 5, 6, 7, 8, 9],
            [4, 5, 6, 11, 12],
            [4, 5, 6, 14, 15],
            [17],
        ],
    ),
    cloudveiled_ridges_in_floral_mists=Template(
        sentences=[
            ['4:ignore'],
            [],
            ['12.5:', '2.5:', '12.5:'],
            ['15:ignore'],
            [],
            ['1.5:dmg_reaction_lunar_bonus'],
        ],
        results=[
            [0, 1, 2, 3],
            [5],
        ],
    ),
    through_darkness_led_by_moonlight=Template(
        sentences=[
            ['8:ignore', '80:'],
            [],
            [],
            ['7:dmg_reaction_lunar_bonus'],
        ],
        results=[
            [0, 1],
            [3],
        ],
    ),
)
