from ...template import Template, TemplateList


char_mona = TemplateList(
    default_rus=Template(
        names=[
            'Моны',
            'Омен', 'фантома', 'фантом',
        ],
        skills={
            'skill': ['Отражение фатума'],
            'burst': [],
            'other': ['Иллюзорный поток'],
        },
    ),
    default_eng=Template(
        names=[
            'Mona',
            'Omen', 'Phantom',
        ],
        skills={
            'skill': ['Mirror Reflection of Doom'],
            'burst': [],
            'other': ['Illusory Torrent'],
        },
    ),
    genesis_of_starsigns_rus=Template(
        names=[
            'обычная', 'Мерцания водных светил'
        ],
        sentences=[
            [],
            ['2:ignore'],
            [],
            [],
            [],
            ['1:ignore'],
            ['8:ignore', '3:ignore', '0.1:ignore'],
            ['5:'],
            [],
            ['2:ignore'],
            ['1:ignore', '0.5:ignore', '8:ignore'],
        ],
        results=[
            [0, 1],
            [3, 4, 5, 6, 7],
            [3, 4, 9, 10],
            ['Мерцания водных светил'],
        ],
        extracted_names=[3],
    ),
    genesis_of_starsigns_eng=Template(
        names=[
            'Astral Glow of Mercury'
        ],
        sentences=[
            [],
            ['2:ignore'],
            [],
            [],
            [],
            ['1:ignore', '8:ignore'],
            ['3:ignore'],
            ['0.1:ignore'],
            [],
            ['5:'],
            [],
            ['2:ignore'],
            ['0.5:ignore', '8:ignore'],
        ],
        results=[
            [0, 1],
            [3, 4, 5, 6, 7, 8, 9],
            [3, 4, 11, 12],
            ['Astral Glow of Mercury'],
        ],
        extracted_names=[3],
    ),
    come_n_get_me_hag=Template(
        sentences=[
            ['ignore'],
            [],
            ['ignore', 'text_percent_dmg'],
        ],
    ),
    waterborne_destiny=Template(
        sentences=[
            ['text_percent'],
        ],
    ),
    prophecy_of_submersion_rus=Template(
        sentences=[
            ['ignore'],
            [],
            ['dmg_reaction_electrocharged'],
            [],
            ['duration_frozen'],
        ],
    ),
    prophecy_of_submersion_eng=Template(
        sentences=[
            ['ignore'],
            [],
            ['dmg_reaction_electrocharged', 'dmg_reaction_lunarcharged', 'dmg_reaction_vaporize', 'dmg_reaction_swirl_hydro', 'dmg_reaction_lunarcrystallize'],
            [],
            ['duration_frozen'],
        ],
    ),
    prophecy_of_submersion_hex_rus=Template(
        sentences=[
            ['8:ignore'],
            [],
            ['15:dmg_reaction_electrocharged'],
            [],
            ['15:duration_frozen'],
            [],
            ['160:text_percent'],
        ],
        results=[
            [0, 1, 2, 3, 4],
            [6],
        ],
    ),
    prophecy_of_submersion_hex_eng=Template(
        sentences=[
            ['8:ignore'],
            [],
            ['15:dmg_reaction_electrocharged', '15:dmg_reaction_lunarcharged', '15:dmg_reaction_vaporize', '15:dmg_reaction_swirl_hydro', '15:dmg_reaction_lunarcrystallize'],
            [],
            ['15:duration_frozen'],
            [],
            ['160:text_percent'],
        ],
        results=[
            [0, 1, 2, 3, 4],
            [6],
        ],
    ),
    lunar_chain=Template(
        sentences=[
            ['text_percent_chance'],
            [],
            ['ignore'],
        ],
    ),
    lunar_chain_hex=Template(
        sentences=[
            ['20:text_percent_chance'],
            ['5:ignore'],
            [],
            ['5:ignore'],
            [],
            ['80:mastery', '12:ignore'],
        ],
        results=[
            [0, 1, 2, 3],
            [5],
        ],
    ),
    prophecy_of_oblivion=Template(
        sentences=[
            ['crit_rate'],
        ],
    ),
    prophecy_of_oblivion_hex=Template(
        sentences=[
            ['15:crit_rate'],
            [],
            ['15:crit_dmg'],
        ],
        results=[
            [0, 1, 2],
            [0],
            [2],
        ],
    ),
    rhetorics_of_calamitas=Template(
        sentences=[
            ['dmg_charged'],
            [],
            [None],
            ['ignore'],
        ],
    ),
    rhetorics_of_calamitas_hex=Template(
        sentences=[
            ['60:dmg_charged'],
            ['180:'],
            ['8:ignore'],
            [],
            ['200:'],
        ],
        results=[
            [0, 1, 2],
            [4],
        ],
    ),
)
