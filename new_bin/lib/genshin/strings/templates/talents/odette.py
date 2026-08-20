from ...template import Template, TemplateList


char_odette = TemplateList(
    default_rus=Template(
        names=[
            'Одетт([аы]|ой)', 'Весеннее жертвоприношение избранницы',
        ],
        skills={
            'skill': ['Адажио: Призрачные танцоры ночи'],
            'burst': ['Престо: Финал сизых крыльев'],
        },
    ),
    default_eng=Template(
        names=[
            'Odette', 'Spring Rite of the Chosen One',
        ],
        skills={
            'skill': ['Adagio: Phantom Night Dancers'],
            'burst': ['Presto: Bluebird Finale'],
        },
    ),
    pathetique_of_pateticheskaya=Template(
        sentences=[
            ['100:ignore', '1000:ignore', '1.5:'],
            ['30:'],
        ],
    ),
    n11500001 = Template(
        sentences=[[],[],[],[],[],[],[],[],],
        results=[
            [0, 1],
        ],
    ),
    dance_of_aurore=Template(
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
    on_this_danceless_morn_she_gazes_at_her_reflection_rus=Template(
        sentences=[
            [],
            [],
            [],
            ['300:'],
            [],
            ['450:'],
            [],
            ['2:ignore'],
            ['2:ignore'],
        ],
    ),
    on_this_danceless_morn_she_gazes_at_her_reflection_eng=Template(
        sentences=[
            [],
            [],
            ['300:'],
            [],
            ['450:'],
            [],
            ['2:ignore'],
            ['2:ignore'],
        ],
    ),
    i_must_see_the_snow_swans_unseen_dream_for_myself_she_thought=Template(
        sentences=[
            ['7:'],
            [],
            ['20:'],
            [],
            [],
            [],
            [],
        ],
        results=[
            [0],
            [2, 3, 4],
            [2, 5, 6]
        ],
    ),
    up_up_the_long_delirious_burning_blue=Template(
        sentences=[
            ['50:'],
            [],
            [],
            ['3.5:ignore'],
            [],
            ['66:'],
            [],
            ['99:'],
        ],
    ),
    put_out_my_hand_and_touched_the_face_of_the_divine=Template(
        sentences=[
            [],
            [],
            ['25:', '20:'],
        ],
        results=[
            [0, 1, 2],
            [2],
        ],
    ),
)
