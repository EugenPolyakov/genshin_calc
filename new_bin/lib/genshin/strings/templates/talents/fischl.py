from ...template import Template, TemplateList


char_fischl = TemplateList(
    default_rus=Template(
        names=[
            'Фишль',
            'Озу', 'Оза', 'Оз',
            'заряженной стрелой', 'грозу', 'божественная молния',
        ],
        skills={
            'skill': ['Тень расправленных крыльев'],
            'burst': ['Ночная иллюзия'],
        },
    ),
    default_eng=Template(
        names=[
            'Fischl', 'Oz',
            'Aimed Shot', 'Thundering Retribution',
        ],
        skills={
            'skill': ['Nightrider'],
            'burst': ['Midnight Phantasmagoria'],
        },
    ),
    stellar_predator=Template(
        sentences=[
            ['text_percent_dmg'],
        ],
    ),
    undone_be_thy_sinful_hex=Template(
        sentences=[
            ['text_percent_dmg'],
        ],
    ),
    gaze_of_the_deep=Template(
        sentences=[
            [],
            ['text_percent_dmg'],
        ],
    ),
    devourer_of_all_sins=Template(
        sentences=[
            ['text_percent_dmg', 'ignore'],
        ],
    ),
    her_pilgrimage_of_bleak=Template(
        sentences=[
            ['text_percent_dmg', 'text_percent_hp'],
        ],
    ),
    evernight_raven=Template(
        sentences=[
            ['ignore'],
            ['text_percent_dmg'],
        ],
    ),
    evernight_raven_hex=Template(
        replace={
            '<br>': '\n<br>\n',
        },
        sentences=[
            ['ignore'],
            ['text_percent_dmg'],
            [],
            ['ignore', 'ignore'],
        ],
        results=[
            [0, 1],
            [3],
        ],
    ),
    phantasmal_nocturne_rus=Template(
        replace={
            '· ': '· \n',
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
            [],
            [],
            [],
            [],
            [],
            ['10:ignore', '22.5:atk_percent'],
            [],
            [],
            ['10:ignore', '90:mastery'],
        ],
        results=[
            [0, 1],
            [5, 6, 'Когда name{Оз} на поле.', 12],
            [5, 6, 'Когда name{Оз} на поле.', 15],
            ['Ноктюрн иллюзий (pyro{Перегрузка})'],
            ['Ноктюрн иллюзий (electro{Заряжен})'],
        ],
        extracted_names=[3, 4],
    ),
    phantasmal_nocturne_eng=Template(
        replace={
            '· ': '· \n',
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
            [],
            [],
            [],
            [],
            [],
            [],
            ['22.5:atk_percent', '10:ignore'],
            [],
            [],
            ['90:mastery', '10:ignore'],
        ],
        results=[
            [0, 1],
            [5, 6, 'When name{Oz} is on the field.', 13],
            [5, 6, 'When name{Oz} is on the field.', 16],
            ['Phantasmal Nocturne (pyro{Overloaded})'],
            ['Phantasmal Nocturne (electro{Charged})'],
        ],
        extracted_names=[3, 4],
    ),
)
