from ...template import Template, TemplateList


char_razor = TemplateList(
    default_rus=Template(
        names=[
            'Рэйзора', 'Рэйзор',
            'защиту',
        ],
        skills={
            'skill': ['Гром и когти', 'Гром и Когти'],
            'burst': ['Громовой клык'],
        },
    ),
    default_eng=Template(
        names=[
            'Razor',
            'Claw and Thunder',
        ],
        skills={
            'skill': ['Claw and Thunder'],
            'burst': ['Lightning Fang'],
        },
    ),
    awakening=Template(
        sentences=[
            ['text_percent_cd'],
        ],
    ),
    hunger=Template(
        sentences=[
            ['recharge', 'text_percent'],
        ],
    ),
    wolfs_instinct=Template(
        sentences=[
            ['dmg_all', 'ignore'],
        ],
    ),
    suppression=Template(
        sentences=[
            ['text_percent_hp', 'crit_rate_enemy'],
        ],
    ),
    bite=Template(
        sentences=[
            ['enemy_def_reduce', 'ignore'],
        ],
    ),
    lupus_fulguris=Template(
        sentences=[
            ['ignore', 'text_percent_dmg'],
        ],
    ),
    surge_of_lightning_rus=Template(
        replace={
            '<br>': '\n<br>\n',
        },
        sentences=[
            [],
            ['2:ignore'],
            [],
            ['70:text_percent'],
            [],
            [],
            [],
            [],
            [],
            ['150:text_percent', '7:ignore'],
            ['1:ignore', '1:ignore'],
        ],
        results=[
            [0, 1, 2, 3],
            [7, 8, 9, 10],
            [0, 1],
        ],
    ),
    surge_of_lightning_eng=Template(
        replace={
            '<br>': '\n<br>\n',
        },
        sentences=[
            [],
            ['2:ignore'],
            [],
            ['70:text_percent'],
            [],
            [],
            [],
            [],
            [],
            ['150:text_percent', '7:ignore'],
            ['1:ignore'],
        ],
        results=[
            [0, 1, 2, 3],
            [7, 8, 9, 10],
            [0, 1],
        ],
    ),
    lightning_fang_rus=Template(
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
            [],
            [],
            [],
            [],
            [],
            ['10:ignore'],
            [],
            [],
            [],
        ],
        results=[
            list(range(0, 24)),
            [7, 8, 9, 10, 11, 12, 13, 14, 15],
        ],
    ),
    lightning_fang_eng=Template(
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
            [],
            [],
            [],
            [],
            ['10:ignore'],
            [],
            [],
            [],
        ],
        results=[
            list(range(0, 23)),
            [7, 8, 9, 10, 11, 12, 13, 14, 15],
        ],
    ),
    claw_and_thunder=Template(
        names=[
            'символ(ов)? Электро', 'восстановления его энергии',
            'Thunder Wolf Claw', 'Electro Sigils?',
        ],
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
            ['3:ignore'],
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
            list(range(0, 17)),
            [4, 5, 6, 7, 8, 9],
        ],
    ),
)
