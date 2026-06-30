from ...template import Template, TemplateList


char_arataki_itto = TemplateList(
    default_rus=Template(
        names=[
            'Аратаки Итто',
            'Аратаки кэсагири', 'скорость атаки', 'защиты', 'защита', 'атака',
            'Яростный король óни', 'Крит. урон', 'Невероятной силы', 'Невероятную силу',
        ],
        skills={
            'skill': [],
            'burst': ['Явления короля: Итто Жестокий!', 'Явление короля: Итто Жестокий!'],
        },
    ),
    default_eng=Template(
        names=[
            'Arataki Itto', 'Itto',
            'Arataki Kesagiri', 'Superlative Superstrength', 'Raging Oni King',
        ],
        skills={
            'skill': [],
            'burst': ['Royal Descent: Behold, Itto the Evil!'],
        },
    ),
    behold_itto_the_evil=Template(
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
            ['20:res_phys|20'],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
        ],
        results=[
            list(range(0, 19)),
            [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
        ],
    ),
    behold_itto_the_evil_eng=Template(
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
            ['1:ignore', '3:ignore', '1:ignore'],
            [],
            ['20:res_phys|20'],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
        ],
        results=[
            list(range(0, 20)),
            [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        ],
    ),
    arataki_ichiban=Template(
        sentences=[
            [],
            [],
            ['atk_speed_charged'],
            ['text_percent_max'],
            [],
            [],
            [],
            [],
        ],
    ),
    bloodline_of_the_crimson_oni=Template(
        sentences=[
            ['text_percent'],
        ],
    ),
    stay_a_while_and_listen_up=Template(
        sentences=[
            ['ignore'],
            [],
            ['ignore', 'ignore'],
            ['ignore', 'ignore'],
        ],
    ),
    stay_a_while_and_listen_up_eng=Template(
        sentences=[
            ['ignore'],
            ['ignore', 'ignore', 'ignore', 'ignore'],
        ],
    ),
    gather_round_its_a_brawl_rus=Template(
        sentences=[
            ['ignore', 'ignore'],
            [],
            ['ignore', 'ignore'],
        ],
    ),
    gather_round_its_a_brawl_eng=Template(
        sentences=[
            ['ignore', 'ignore'],
            [],
            ['ignore'],
            ['ignore'],
        ],
    ),
    jailhouse_bread_and_butter_rus=Template(
        sentences=[
            ['ignore', 'def_percent', 'atk_percent'],
        ],
    ),
    jailhouse_bread_and_butter_eng=Template(
        sentences=[
            ['def_percent', 'atk_percent', 'ignore'],
        ],
    ),
    arataki_itto_present=Template(
        sentences=[
            ['crit_dmg_charged'],
            ['ignore'],
        ],
    ),
)
