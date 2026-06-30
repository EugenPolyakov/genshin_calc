from ...template import Template, TemplateList


char_shenhe = TemplateList(
    default_rus=Template(
        names=[
            'Шэнь Хэ',
            'Призыв духа', 'Мантра морозных небес', 'Ледяное перо', 'Ледяного пера',
        ],
        skills={
            'skill': ['Призыв духа', 'Ледяное перо'],
            'burst': ['Таинство освобождения'],
        },
    ),
    default_eng=Template(
        names=[
            'Shenhe',
            'Icy Quill', 'Skyfrost Mantra', 'Spring Spirit Summoning',
        ],
        skills={
            'skill': ['Spring Spirit Summoning', 'Icy Quill'],
            'burst': ['Divine Maiden\'s Deliverance'],
        },
    ),
    spring_spirit_summoning_rus=Template(
        replace={
            '<br>': '<br>\n',
            '</p><p>': '\n</p><p>',
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
            [7],
        ],
    ),
    spring_spirit_summoning_eng=Template(
        replace={
            '<br>': '<br>\n',
            '</p><p>': '\n</p><p>',
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
        ],
        results=[
            list(range(0, 14)),
            [7],
        ],
    ),
    deific_embrace=Template(
        sentences=[
            ['dmg_cryo'],
        ],
    ),
    spirit_communion_seal=Template(
        patterns=(
            ('<br>', '\\n<br>'),
        ),
        sentences=[
            [],
            ['dmg_skill', 'ignore'],
            ['dmg_normal', 'ignore'],
        ],
        results=[
            [0, 1],
            [0, 2],
        ],
    ),
    clarity_of_heart=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    centered_spirit=Template(
        sentences=[
            ['ignore'],
            ['crit_dmg_cryo'],
        ],
    ),
    centered_spirit_rus=Template(
        sentences=[
            ['ignore'],
            ['crit_dmg_cryo'],
            [],
        ],
    ),
    insight_rus=Template(
        sentences=[
            [None, 'ignore', 'ignore'],
        ],
    ),
    insight_eng=Template(
        sentences=[
            [None, 'ignore'],
            ['ignore'],
        ],
    ),
    mystical_abandon=Template(
        sentences=[
            [],
        ],
    ),
)
