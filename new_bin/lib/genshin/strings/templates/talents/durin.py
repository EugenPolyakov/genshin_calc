from ...template import Template, TemplateList


char_durin = TemplateList(
    default_rus=Template(
        names=[
            'Дурин[а]?',
        ],
        skills={
            'skill': ['Дуализм: Слияние и разделение'],
            'burst': ['Принцип чистоты: Когда меняется свет', 'Принцип тьмы: Когда тлеют звёзды'],
        },
    ),
    default_eng=Template(
        names=[
            'Durin',
        ],
        skills={
            'skill': ['Binary Form: Convergence and Division'],
            'burst': ['Principle of Purity: As the Light Shifts', 'Principle of Darkness: As the Stars Smolder'],
        },
    ),
    convergence_and_division_rus=Template(
        replace={
            '<br>': '\n<br>\n',
            '</p><p>': '</p><p>\n',
        },
        sentences=[
            [],
            [],
            [],
            [],
            ['30:ignore'],
            [],
            [],
            ['30:ignore'],
            [],
            ['6:ignore'],
            [],
            [],
        ],
        results=[
            list(range(0, 12)),
            [5],
        ],
        extracted_names=[1],
    ),
    convergence_and_division_eng=Template(
        replace={
            '<br>': '\n<br>\n',
            '</p><p>': '</p><p>\n',
        },
        sentences=[
            [],
            [],
            [],
            [],
            ['1:ignore', '30:ignore'],
            [],
            [],
            ['3:ignore', '30:ignore'],
            [],
            ['6:ignore'],
            [],
            [],
        ],
        results=[
            list(range(0, 12)),
            [2],
            [5],
        ],
        extracted_names=[1, 2],
    ),
    ode_to_ascension=Template(
        replace={
            '<br>': '\n<br>\n'
        },
        sentences=[
            [],
            ['2:ignore'],
            [],
            [],
            [],
            [],
            [],
            ['75:'],
        ],
        results=[
            [0, 1],
            [5, 6, 7],
        ],
    ),
    light_manifest_of_the_divine_calculus_rus=Template(
        replace={
            '<br>': '\n<br>\n'
        },
        sentences=[
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            ['20:enemy_res_pyro', '6:ignore'],
            [],
            [],
            [],
            [],
            [],
            ['40:dmg_reaction_vaporize'],
        ],
        results=[
            [5, 6, 7],
            [11, 12, 13],
        ],
    ),
    light_manifest_of_the_divine_calculus_eng=Template(
        replace={
            '<br>': '\n<br>\n'
        },
        sentences=[
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            ['20:enemy_res_pyro', '6:ignore'],
            [],
            [],
            [],
            [],
            [],
            ['40:dmg_reaction_vaporize', '40:dmg_reaction_melt'],
        ],
        results=[
            [5],
            [7],
            [11],
            [13],
        ],
        extracted_names=[0, 2],
    ),
    adamahs_redemption=Template(
        replace={
            '<br>': '\n<br>\n'
        },
        sentences=[
            [],
            [],
            ['20:ignore', '20:ignore'],
            ['1:ignore', '60:'],
            [],
            [],
            ['20:ignore', '20:ignore'],
            ['2:ignore', '150:'],
            [],
            [],
            [],
            [],
        ],
        results=[
            list(range(0, 12)),
            list(range(0, 5)),
        ],
    ),
    unground_visions=Template(
        sentences=[
            ['20:ignore', '50:dmg_pyro', '6:ignore'],
        ],
    ),
    emanares_source=Template(
        sentences=[
            ['40:dmg_burst'],
            ['30:ignore'],
        ],
    ),
    dual_birth=Template(
        replace={
            '<br>': '\n<br>',
            '· ': '· \n',
        },
        sentences=[
            ['30:enemy_def_ignore_burst'],
            [],
            [],
            ['30:', '6:ignore'],
            [],
            ['40:'],
        ],
        results=[
            list(range(0, 6)),
            [3],
        ],
    ),
)
