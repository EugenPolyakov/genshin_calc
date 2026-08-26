from ...template import Template, TemplateList
from ..names import keywords_rus, keywords_eng, names_eng, names_rus


char_yumemizuki_mizuki = TemplateList(
    default_rus=Template(
        names=[
            'Юмэмидзуки Мидзуки', 'Мидзуки',
            'Парящей по сновидениям', 'Двадцать три ночи ожидания', 'Двадцать три ночи',
            'Закуску в стиле юмэми',
        ],
        skills={
            'skill': ['Парящей по сновидениям'],
            'burst': ['Терапия тайных источников анраку'],
        },
    ),
    default_eng=Template(
        names=[
            'Yumemizuki Mizuki', 'Mizuki',
            'Dreamdrifter', 'Twenty-Three Nights\' Awaiting',
        ],
        skills={
            'skill': [],
            'burst': ['Anraku Secret Spring Therapy'],
        },
    ),
    aisa_utamakura_pilgrimage_rus=Template(
        keywords=keywords_rus.keywords,
        patterns=[
            (r'·(\s*)', '·\\1\n'),
        ],
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
        ],
        results=[
            list(range(0, 17)),
            [11],
            [2],
        ],
        extracted_names=[2],
    ),
    aisa_utamakura_pilgrimage_eng=Template(
        keywords=keywords_eng.keywords,
        patterns=[
            (r'·(\s*)', '·\\1\n'),
        ],
        sentences=[
            ['1:ignore'],
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
        ],
        results=[
            list(range(0, 17)),
            [11],
            [2],
        ],
        extracted_names=[2],
    ),
    vast_be_the_dream=Template(
        replace={
            'Кроме того, когда ': 'Когда\nКроме того, когда\n',
            'Additionally, while ': 'While\nAdditionally, while\n',
        },
        sentences=[
            ['1000:'],
            ['2.5:ignore'],
            [],
            ['1000:'],
            [],
            [],
            [],
            [],
            ['10:'],
            [],
            ['8:ignore'],
        ],
        results=[
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            [6, 8],
        ],
    ),
    bright_moons_restless_voice=Template(
        sentences=[
            ['2.5:ignore'],
            ['0.3:ignore', '2:ignore'],
        ],
    ),
    thoughts_by_day_bring_dreams_by_night=Template(
        sentences=[
            ['100:mastery', '4:ignore'],
        ],
    ),
    in_mist_like_waters=Template(
        sentences=[
            ['3:ignore', '3.5:ignore'],
            ['1100:', '550:'],
        ],
    ),
    in_mist_like_waters_hex_rus=Template(
        sentences=[
            ['3.5:ignore', '3:ignore'],
            ['1100:', '550:'],
            ['1000:'],
            [],
            ['400:'],
            [],
        ],
    ),
    in_mist_like_waters_hex_eng=Template(
        sentences=[
            ['3:ignore', '3.5:ignore'],
            ['1100:', '550:'],
            ['1000:'],
            [],
            ['400:'],
            [],
        ],
    ),
    your_echo_i_meet_in_dreams=Template(
        sentences=[
            ['0.04:'],
        ],
    ),
    your_echo_i_meet_in_dreams_hex=Template(
        sentences=[
            ['0.04:'],
            [],
            ['20:enemy_res_cryo'],
        ],
    ),
    buds_warm_lucid_springs=Template(
        sentences=[
            ['5:ignore'],
            ['4:ignore'],
        ],
    ),
    buds_warm_lucid_springs_hex=Template(
        sentences=[
            [],
            ['266:', '5:ignore'],
            ['4:ignore'],
        ],
    ),
    the_heart_lingers_long=Template(
        sentences=[
            ['30:crit_rate_swirl', '100:crit_dmg_swirl'],
            ['10:crit_rate_stellar_swirl', '20:crit_dmg_stellar_swirl'],
        ],
    ),
    the_heart_lingers_long_rus=Template(
        sentences=[
            [],
            ['30:crit_rate_swirl', '100:crit_dmg_swirl'],
            ['10:crit_rate_stellar_swirl', '20:crit_dmg_stellar_swirl'],
        ],
    ),
    the_heart_lingers_long_hex_rus=Template(
        sentences=[
            [],
            ['30:crit_rate_swirl', '100:crit_dmg_swirl'],
            ['10:crit_rate_stellar_swirl', '20:crit_dmg_stellar_swirl'],
            [],
            ['500:', '0.04:', '0.16:'],
            ['20:', '80:'],
        ],
        results=[
            [0, 1, 2, 3],
            [4, 5],
        ],
    ),
    the_heart_lingers_long_hex_eng=Template(
        sentences=[
            ['30:crit_rate_swirl', '100:crit_dmg_swirl'],
            ['10:crit_rate_stellar_swirl', '20:crit_dmg_stellar_swirl'],
            [],
            ['500:', '0.04:', '0.16:'],
            ['20:', '80:'],
        ],
        results=[
            [0, 1, 2],
            [3, 4],
        ],
    ),
)
