from ...template import Template, TemplateList


char_traveler_cryo = TemplateList(
    default_rus=Template(
        names=[
            '[пП]утешественника?',
        ],
        skills={
            'skill': ['Меч ледяного тумана'],
            'burst': ['Морозное копьё'],
        },
    ),
    default_eng=Template(
        names=[
            'Traveler',
        ],
        skills={
            'skill': ['Ice Fog Piercer'],
            'burst': ['Frostbound Javelin'],
        },
    ),
    ice_fog_piercer_rus=Template(
        sentences=[
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            ['0.2:ignore'],
            [],
            ['1:ignore'],
            ['8:ignore'],
            [],
            ['30:ignore'],
            [],
            [],
        ],
        results=[
            list(range(0, 15)),
            [2],
            [4, 5, 6, 7, 8, 9, 10, 11, 12],
        ],
        extracted_names=[1],
    ),
    ice_fog_piercer_eng=Template(
        sentences=[
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            ['0.2:ignore'],
            [],
            ['1:ignore', '8:ignore'],
            [],
            ['30:ignore'],
            [],
            [],
        ],
        results=[
            list(range(0, 15)),
            [3],
            [5, 6, 7, 8, 9, 10, 11, 12],
        ],
        extracted_names=[1],
    ),
    ever_keen_frost_rus=Template(
        sentences=[
            [],
            ['80:'],
        ],
    ),
    ever_keen_frost_eng=Template(
        sentences=[
            ['80:'],
        ],
    ),
    lucent_ice=Template(
        sentences=[
            ['8:'],
            ['160:'],
        ],
    ),
    illusory_frostmirror=Template(
        sentences=[
            ['8:ignore'],
            [],
            ['0.35:', '100:'],
            ['7:'],
        ],
        results=[
            [0, 1, 2, 3],
            [2, 3],
        ],
    ),
    foreign_permafrost=Template(
        sentences=[
            [],
            [],
            [],
            ['1:ignore'],
            ['2:ignore'],
            ['3:ignore'],
            ['3:ignore'],
            [],
            [],
            [],
            ['140:', '2:ignore'],
            [],
            ['1:ignore', '15:ignore'],
            [],
            [],
            [],
        ],
    ),
    foreign_permafrost_eng=Template(
        sentences=[
            [],
            [],
            ['1:ignore', '1:ignore', '2:ignore', '3:ignore'],
            ['3:ignore'],
            [],
            [],
            [],
            ['140:', '2:ignore'],
            [],
            ['15:ignore'],
            [],
            [],
            [],
        ],
    ),
    frostfall_reverberation=Template(
        sentences=[
            ['60:mastery', '5:ignore'],
            [],
            ['120:'],
        ],
        results=[
            [0],
            [2],
        ],
    ),
    brumal_grimfrost=Template(
        sentences=[
            ['5:', '15:ignore'],
            ['40:'],
        ],
    ),
)
