from ...template import Template, TemplateList


char_venti = TemplateList(
    default_rus=Template(
        names=[
            'Венти',
            'физ. сопротивление'
        ],
        skills={
            'attack': ['прицельный выстрел'],
            'skill': ['Небесная поэзия'],
            'burst': ['Великая ода ветру'],
        },
    ),
    default_eng=Template(
        names=[
            'Venti',
            'Physical RES',
        ],
        skills={
            'attack': ['Aimed Shot'],
            'skill': ['Skyward Sonnet'],
            'burst': ['Wind\'s Grand Ode'],
        },
    ),
    temporal_winds_eulogy=Template(
        replace={
            '<br>': '\n<br>\n',
        },
        sentences=[
            [],
            ['2:ignore'],
            [],
            [],
            [],
            [],
            [],
            ['4:ignore', '50:dmg_all', '135:text_percent'],
        ],
        results=[
            [0, 1],
            [5, 6, 7],
        ],
    ),
    embrace_of_winds=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    stormeye=Template(
        sentences=[
            ['ignore', 'ignore'],
        ],
    ),
    splitting_gales_rus=Template(
        sentences=[
            [],
            ['text_percent_dmg'],
        ],
    ),
    splitting_gales_eng=Template(
        sentences=[
            ['ignore', 'text_percent_dmg'],
        ],
    ),
    breeze_of_reminiscence=Template(
        patterns=[
            (r'<br>', '\\n'),
        ],
        sentences=[
            ['enemy_res_anemo', 'ignore'],
            ['enemy_res_anemo'],
        ],
        results=[
            [0],
            [1],
        ],
    ),
    breeze_of_reminiscence_hex=Template(
        patterns=[
            (r'<br>', '\\n'),
        ],
        sentences=[
            ['24:enemy_res_anemo', '10:ignore'],
            [],
            ['25:'],
            [],
            [],
            ['300:text_percent'],
            ['15:ignore'],
        ],
        results=[
            [0],
            [1, 2, '<br>', 5, 6],
            [4],
        ],
        extracted_names=[2],
    ),
    hurricane_of_freedom=Template(
        sentences=[
            ['25:dmg_anemo', '10:ignore'],
        ],
    ),
    hurricane_of_freedom_hex_rus=Template(
        sentences=[
            ['10:ignore', '25:dmg_anemo'],
        ],
    ),
    hurricane_of_freedom_hex_eng=Template(
        sentences=[
            ['25:dmg_anemo', '10:ignore'],
        ],
    ),
    storm_of_defiance=Template(
        patterns=[
            (r'<br>', '\\n'),
        ],
        sentences=[
            ['enemy_res_anemo'],
            [None],
        ],
        results=[
            [0],
            [1],
        ],
    ),
    storm_of_defiance_hex=Template(
        patterns=[
            (r'<br>', '\\n'),
        ],
        sentences=[
            ['20:enemy_res_anemo'],
            ['20:'],
            ['100:crit_dmg'],
        ],
        results=[
            [0, '<br>', 2],
            [1],
        ],
    ),
)
