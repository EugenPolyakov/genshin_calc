from ...template import Template, TemplateList


char_vesna = TemplateList(
    default_rus=Template(
        names=[
            'Весн(а|ы|ой)', 'Вооружённый караул', 'Обряд: Весенняя процессия',
        ],
        skills={
            'skill': ['Искусство побеждать'],
            'burst': ['За Царицу'],
        },
    ),
    default_eng=Template(
        names=[
            'Vesna', 'Armed for Action', "Rite of Spring's Procession",
        ],
        skills={
            'skill': ['The Art of Victory'],
            'burst': ['For the Tsaritsa!'],
        },
    ),
    the_art_of_victory_rus=Template(
        sentences=[
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            ['1:ignore', '3:ignore'],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
        ],
        results=[
            list(range(0, 22)),
            [2],
        ],
        extracted_names=[1],
    ),
    the_art_of_victory_eng=Template(
        sentences=[
            ['2:ignore'],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            ['1:ignore', '3:ignore'],
            ['2:ignore', '3:ignore'],
            [],
            ['3:ignore'],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
        ],
        results=[
            list(range(0, 21)),
            [2],
        ],
        extracted_names=[1],
    ),
    rite_of_springs_procession_rus=Template(
        sentences=[
            ['1:ignore'],
            ['20:ignore', '6:ignore'],
            [],
            [],
            ['100:', '10:'],
            [],
        ],
    ),
    rite_of_springs_procession_eng=Template(
        sentences=[
            ['1:ignore', '20:ignore'],
            ['6:ignore'],
            [],
            ['100:', '10:'],
            [],
        ],
    ),
    truth_prevails=Template(
        sentences=[
            [],
            [],
            ['6:'],
            [],
            ['25:'],
        ],
    ),
    splendid_prelude_rus=Template(
        sentences=[
            ['0.7:', '100:'],
            ['14:'],
            [],
            ['8:ignore'],
        ],
    ),
    splendid_prelude_eng=Template(
        sentences=[
            [],
            ['100:', '0.7:'],
            ['14:'],
            [],
            ['8:ignore'],
        ],
    ),
    winters_farewell_feast_rus=Template(
        sentences=[
            [],
            [],
            [],
            ['20:dmg_reaction_stellar_swirl'],
        ],
    ),
    winters_farewell_feast_eng=Template(
        sentences=[
            ['4:ignore', '3:ignore'],
            [],
            [],
            ['20:dmg_reaction_stellar_swirl'],
        ],
    ),
    kolo_of_springs_arrival=Template(
        sentences=[
            [],
            ['40:'],
            [],
            [],
        ],
    ),
    glory_to_our_forebears=Template(
        sentences=[
            ['3:ignore'],
        ],
    ),
    unwavering_ardor=Template(
        sentences=[
            ['5:ignore', '150:', '200:'],
            [],
            [],
            ['20:dmg_reaction_stellar_swirl_bonus'],
        ],
    ),
)
