from os import replace
from ...template import Template, TemplateList


char_yanfei = TemplateList(
    default_rus=Template(
        names=[
            'Янь Фэй',
            'заряженная атака', 'Багровые печати', 'Багровая печать', 'Багровых печатей',
        ],
        skills={
            'skill': [],
            'burst': ['По рукам'],
        },
    ),
    default_eng=Template(
        names=[
            'Yanfei',
            'Scarlet Seals', 'Scarlet Seal',
        ],
        skills={
            'skill': [],
            'burst': ['Done Deal'],
        },
    ),
    done_deal_rus=Template(
        replace={
            '</p><p>': '\n</p><p>\n',
            '<br>': '\n<br>\n',
        },
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
            [],
            [],
            [],
            [],
        ],
        results=[
            list(range(0, 15)),
            [5, 6, 7, 8, 9],
            [3],
        ],
        extracted_names=[2],
    ),
    done_deal_eng=Template(
        replace={
            '</p><p>': '\n</p><p>\n',
            '<br>': '\n<br>\n',
        },
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
            [],
            [],
        ],
        results=[
            list(range(0, 13)),
            [4, 5, 6, 7, 8],
            [2],
        ],
        extracted_names=[2],
    ),
    proviso_rus=Template(
        sentences=[
            ['text_percent_dmg', 'ignore'],
            [],
        ],
    ),
    proviso_eng=Template(
        sentences=[
            ['text_percent_dmg'],
            ['ignore'],
            [],
        ],
    ),
    blazing_eye=Template(
        sentences=[
            ['text_percent_dmg'],
            [],
        ],
    ),
    the_law_knows_no_kindness=Template(
        sentences=[
            ['text_percent'],
        ],
    ),
    right_of_final_interpretation=Template(
        sentences=[
            ['crit_rate_charged', 'text_percent_hp'],
        ],
    ),
    supreme_amnesty_rus=Template(
        sentences=[
            ['ignore', 'text_percent_hp'],
            ['ignore'],
        ],
    ),
    supreme_amnesty_eng=Template(
        sentences=[
            ['text_percent_hp', 'ignore', 'ignore'],
        ],
    ),
    extra_clause=Template(
        sentences=[
            ['ignore'],
        ],
    ),
)
