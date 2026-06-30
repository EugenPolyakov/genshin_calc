from ...template import Template, TemplateList


char_mavuika = TemplateList(
    default_rus=Template(
        names=[
            'Мавуика', 'Мавуики',
            'Боевого духа', 'Всеогненного вооружения', 'Кольцо испепеляющего сияния: Раскалённый образ', 'Кольцо испепеляющего сияния', 'Пламецикл',
            'Кионгози', 'Час пылающих небес', 'Кольца испепеляющего сияния', 'Удара падающего солнца'
        ],
        skills={
            'skill': ['Всеогненного вооружения'],
            'burst': ['Час пылающих небес'],
        },
    ),
    default_eng=Template(
        names=[
            'Mavuika',
            'Fighting Spirit', 'Scorching Ring of Searing Radiance', 'Ring of Searing Radiance', 'Flamestrider', 'Kiongozi',
            'All-Fire Armaments', 'Hour of Burning Skies',
        ],
        skills={
            'skill': ['All-Fire Armaments'],
            'burst': ['Hour of Burning Skies'],
        },
        patterns=[
            ('pyro{Burning}', 'Burning'),
        ]
    ),
    the_named_moment_rus=Template(
        replace={
            'При этом урон ': 'При этом урон\nУрон\n',
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
            [],
        ],
        results=[
            [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15],
            [7, 8, 9],
        ],
    ),
    the_named_moment_eng=Template(
        replace={
            '</p><p>': '\n</p><p>',
            'name{Mavuika}': '\nname{Mavuika}',
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
        ],
        results=[
            list(range(0, 19)),
            [9, 10],
        ],
    ),
    hour_of_burning_skies=Template(
        names=['обычной'],
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
            ['50:ignore'],
            [],
            [],
            [],
            [],
            [],
            ['1.5:ignore'],
            [],
            ['0.1:ignore'],
            [],
            ['10:ignore'],
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
            list(range(0, 27)),
            [21, 22],
            [19],
        ],
        extracted_names=[2],
    ),
    hour_of_burning_skies_eng=Template(
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
            ['50:ignore'],
            [],
            [],
            [],
            [],
            [],
            ['1.5:ignore'],
            ['0.1:ignore'],
            [],
            ['10:ignore'],
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
            list(range(0, 26)),
            [20, 21],
            [18],
        ],
        extracted_names=[2],
    ),
    gift_of_flaming_flowers=Template(
        sentences=[
            ['30:atk_percent', '10:ignore'],
        ],
    ),
    kiongozi_rus=Template(
        sentences=[
            ['0.2:text_percent_dmg'],
            ['40:text_percent_max'],
            ['20:ignore', '0:ignore'],
        ],
    ),
    kiongozi_eng=Template(
        sentences=[
            ['0.2:text_percent_dmg'],
            ['40:text_percent_max', '20:ignore', '0:ignore'],
        ],
    ),
    the_night_lords_explication=Template(
        sentences=[
            ['120:ignore', '25:ignore', '40:atk_percent', '8:ignore'],
        ],
    ),
    the_ashen_price=Template(
        patterns=[
            (r'<br>\s*·\s*', '\\n'),
        ],
        sentences=[
            ['200:atk_base'],
            ['20:text_percent_def'],
            ['60:text_percent_dmg1', '90:text_percent_dmg2', '120:text_percent_dmg3'],
        ],
        results=[
            [0],
            [1],
            [2],
        ],
    ),
    the_leaders_resolve=Template(
        sentences=[
            ['10:dmg_all'],
        ],
    ),
    humanitys_name_unfettered_rus=Template(
        patterns=[
            (r'<br>\s*·\s*', '<br>\\n'),
            (r'<br><br>Кроме того', '\\nКроме того'),
        ],
        sentences=[
            [],
            ['200:text_percent_dmg1'],
            ['20:text_percent_def', '3:ignore', '500:text_percent_dmg2'],
            [],
            ['5:ignore', '80:ignore'],
            ['15:ignore'],
        ],
        results=[
            [1],
            [2, 3],
            [4, 5],
        ],
    ),
    humanitys_name_unfettered_eng=Template(
        patterns=[
            (r'<br>\s*·\s*', '<br>\\n'),
            (r'<br><br>Additionally', '\\nAdditionally'),
        ],
        sentences=[
            [],
            ['200:text_percent_dmg1'],
            ['20:text_percent_def', '500:text_percent_dmg2', '3:ignore'],
            [],
            ['5:ignore', '80:ignore'],
            ['15:ignore'],
        ],
        results=[
            [1],
            [2, 3],
            [4, 5],
        ],
    ),
)
