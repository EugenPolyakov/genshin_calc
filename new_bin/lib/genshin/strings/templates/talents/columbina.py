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
        replace={
            '<br><br>': '\n'
        },
        sentences=[
            ['3:ignore', '15:ignore'],
            ['1.5:dmg_reaction_lunar_bonus'],
        ],
        results=[
            [1],
        ],
    ),
    silence_tending_one_lone_song=Template(
        replace={
            '<br><br>': '\n'
        },
        sentences=[
            ['3:ignore', '15:ignore'],
            ['1.5:dmg_reaction_lunar_bonus'],
        ],
        results=[
            [1],
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
            [],
            ['7:text_max_percent', '1:ignore'],
        ],
    ),
    moonlight_lent_unto_you_eng=Template(
        sentences=[
            [],
            [],
            ['1000:', '0.2:text_percent', '7:text_max_percent', '1:ignore'],
        ],
    ),
    radiance_over_blossoms_and_peaks_rus=Template(
        replace={
            '<br><br>': '\n<br><br>\n',
        },
        sentences=[
            [],
            ['15:ignore'],
            [],
            ['6:ignore', '8:ignore', '8:ignore', '250:'],
            ['12:text_hp_percent'],
            [],
            [],
            ['1.5:dmg_reaction_lunar_bonus'],
        ],
        results=[
            [0, 1, 2, 7],
            [3, 4, 5],
            [7],
        ],
    ),
    radiance_over_blossoms_and_peaks_eng=Template(
        replace={
            '<br>': '\n<br>\n',
        },
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
            [],
            [],
            ['1.5:dmg_reaction_lunar_bonus'],
        ],
        results=[
            [0, 1, 2, 15, 16],
            [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            [16],
        ],
    ),
    not_in_lone_splendor_rus=Template(
        replace={
            '<br>': '\n<br>\n',
        },
        sentences=[
            ['34:'],
            [],
            [],
            ['40:hp_percent', '8:ignore'],
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
            [],
            [],
            [],
            ['7:dmg_reaction_lunar_bonus'],
        ],
        results=[
            [0, 1, 19, 20],
            [2, 3],
            [5, 6, 7, 8, 9, 10],
            [5, 6, 7, 8, 12, 13],
            [5, 6, 7, 8, 15, 16],
            [20],
        ],
    ),
    not_in_lone_splendor_eng=Template(
        replace={
            '<br>': '\n<br>\n',
        },
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
            [],
            [],
            ['7:dmg_reaction_lunar_bonus'],
        ],
        results=[
            [0, 1, 18, 19],
            [2],
            [4, 5, 6, 7, 8],
            [4, 5, 6, 10, 11],
            [4, 5, 6, 13, 14],
            [19],
        ],
    ),
    cloudveiled_ridges_in_floral_mists_rus=Template(
        replace={
            '<br><br>': '\n<br><br>\n',
        },
        sentences=[
            ['4:ignore', '12.5:', '2.5:', '12.5:'],
            [],
            ['15:ignore'],
            [],
            ['1.5:dmg_reaction_lunar_bonus'],
        ],
        results=[
            [0, 1, 2],
            [4],
        ],
    ),
    cloudveiled_ridges_in_floral_mists_eng=Template(
        replace={
            '<br><br>': '\n<br><br>\n',
        },
        sentences=[
            ['4:ignore', '12.5:', '2.5:', '12.5:'],
            ['15:ignore'],
            [],
            ['1.5:dmg_reaction_lunar_bonus'],
        ],
        results=[
            [0, 1],
            [3],
        ],
    ),
    through_darkness_led_by_moonlight=Template(
        replace={
            '<br><br>': '\n<br><br>\n',
        },
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
