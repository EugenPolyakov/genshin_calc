from ...template import Template, TemplateList
from ..names import keywords_eng, keywords_rus


char_kaveh = TemplateList(
    default_rus=Template(
        names=[
            'Кавеха', 'Кавех', 'Кавехом',
            'Свет Пайридаэзы', 'Расписной купол',
        ],
        skills={
            'skill': ['Творческого мастерства'],
            'burst': ['Расписной купол', 'Расписного купола'],
        },
    ),
    default_eng=Template(
        names=[
            'Kaveh',
            'Painted Dome', 'Pairidaeza\'s Light',
        ],
        skills={
            'skill': ['Artistic Ingenuity'],
            'burst': ['Painted Dome'],
        },
    ),
    painted_dome_rus=Template(
        replace={
            '· ': '· \n',
        },
        keywords=keywords_rus.keywords,
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
            [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            [6],
        ],
    ),
    painted_dome_eng=Template(
        replace={
            '· ': '· \n',
        },
        keywords=keywords_eng.keywords,
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
        ],
        results=[
            list(range(0, 14)),
            [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            [6],
        ],
    ),
    an_architects_undertaking=Template(
        sentences=[
            ['text_percent_heal'],
            ['ignore'],
        ],
    ),
    a_craftsmans_curious_conceptions_rus=Template(
        sentences=[
            ['mastery'],
            ['ignore', 'ignore'],
            [],
            [],
        ],
    ),
    a_craftsmans_curious_conceptions_eng=Template(
        sentences=[
            ['mastery'],
            ['ignore'],
            ['ignore'],
            [],
            [],
        ],
    ),
    sublime_salutations=Template(
        sentences=[
            ['ignore', 'res_dendro', 'healing_recv'],
        ],
    ),
    grace_of_royal_roads=Template(
        sentences=[
            ['atk_speed_normal'],
        ],
    ),
    feast_of_apadana=Template(
        sentences=[
            ['dmg_reaction_rupture'],
        ],
    ),
    pairidaezas_dreams=Template(
        sentences=[
            [None],
            ['ignore'],
        ],
    ),
)
