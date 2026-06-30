from ...template import Template, TemplateList


char_prune = TemplateList(
    default_rus=Template(
        names=[
            'Прюн', 'колокольчик-приманка',
        ],
        skills={
            'skill': ['Динь-дилинь: Звон охоты на ведьм'],
            'burst': ['Грянул звон, началась охота'],
        },
    ),
    default_eng=Template(
        names=[
            'Prune', 'Witchlure Bell',
        ],
        skills={
            'skill': ['Ring-A-Ding-Ding! Hexhunter Chime'],
            'burst': ['The Bell Tolls! The Hunt Is On!'],
        },
    ),
    witchseekers_vow=Template(
        sentences=[
            [],
            ['2:ignore'],
            [],
            [],
            [],
            ['60:', '5:ignore'],
            ['30:', '5:ignore'],
        ],
        results=[
            [0, 1],
            [5, 6],
        ],
    ),
    verdict_and_punishment=Template(
        sentences=[
            ['150:'],
            [],
        ],
    ),
    tolling_synchronicity_rus=Template(
        sentences=[
            #0025 вместо 0.025 т.к. мы не может отличить 0.025 от 0,025 как 0025
            ['5:ignore', '0025:', '2000:'],
            ['50:'],
        ],
    ),
    tolling_synchronicity_eng=Template(
        sentences=[
            ['5:ignore', '2000:'],
            ['0.025:', '50:'],
        ],
    ),
    with_a_vow_to_rescue_the_journey_begins=Template(
        sentences=[
            ['2:ignore'],
            ['1.8:ignore'],
        ],
    ),
    useful_for_cleaning_messy_baggage_elemental_powers_are_indeed=Template(
        replace={
            ', а когда ' : '. Когда ',
            ', and when ' : '. When ',
        },
        sentences=[
            ['10:atk_percent'],
            ['5:atk_percent'],
            ['40:'],
            [],
            [],
        ],
        results=[
            [0,],
            [1, 2, 3, 4],
        ],
    ),
    looking_back_following_the_wind_ones_shadow_still_halved=Template(
        sentences=[
            ['80:'],
        ],
    ),
    and_thats_the_story_share_it_with_your_friends=Template(
        sentences=[
            ['4:ignore'],
            [],
            ['350:', '5:ignore'],
        ],
        results=[
            [0],
            [2],
        ],
    ),
)
