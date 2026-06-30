from ...template import Template, TemplateList


char_albedo = TemplateList(
    default_rus=Template(
        names=[
            'Альбедо', 'Цветки мимолётности', 'Роковым расчётом', 'Рокового расчёта',
            'Ритуал рождения: Тектоническая волна', 'Цветков неизбежности', 'Цвет(ка|ок|ков|ки) солнца',
            'защиты', 'энергии', 'Цветок серебра',
        ],
        skills={
            'skill': ['Абиогенез: Цветок солнца'],
            'burst': ['Ритуал рождения: Тектоническая волна'],
        },
    ),
    default_eng=Template(
        names=[
            'Albedo', 'Transient Blossoms', 'Fatal Reckoning', 'Fatal Blossoms', 'Silver Isotoma',
            'Abiogenesis: Solar Isotoma', 'Rite of Progeniture: Tectonic Tide', 'Solar Isotomas?',
        ],
        skills={
            'skill': ['Abiogenesis: Solar Isotoma'],
            'burst': ['Rite of Progeniture: Tectonic Tide'],
        },
    ),
    book_of_blinding_light_rus=Template(
        replace={
            '· ': '· \n',
        },
        sentences=[
            [],
            ['2:ignore'],
            [],
            [],
            [],
            [],
            ['20:ignore', '10:ignore'],
            [],
            ['2:ignore'],
            [],
            [],
            ['20:ignore', '4:text_percent', '1000:'],
            ['12:text_percent_max'],
            [],
            [],
            ['20:ignore', '10:text_percent', '1000:'],
            ['30:text_percent_max'],
        ],
        results=[
            [0, 1],
            [3, 4, 6, 7, 8],
            [3, 4, 11, 12],
            [3, 4, 15, 16],
            ['Цветок солнца'],
            ['Цветок серебра'],
        ],
        extracted_names=[4, 5],
    ),
    book_of_blinding_light_eng=Template(
        replace={
            '· ': '· \n',
        },
        sentences=[
            [],
            ['2:ignore'],
            [],
            [],
            [],
            [],
            ['20:ignore', '10:ignore'],
            [],
            [],
            [],
            [],
            ['4:text_percent', '1000:', '20:ignore'],
            ['12:text_percent_max'],
            [],
            [],
            ['10:text_percent', '1000:', '20:ignore'],
            ['30:text_percent_max'],
        ],
        results=[
            [0, 1],
            [3, 4, 6, 7, 8],
            [3, 4, 11, 12],
            [3, 4, 15, 16],
            ['Solar Isotoma'],
            ['Silver Isotoma'],
        ],
        extracted_names=[4, 5],
    ),
    calcite_might_eng=Template(
        sentences=[
            ['dmg_skill_albedo', None],
        ],
    ),
    calcite_might_rus=Template(
        sentences=[
            [None, 'dmg_skill_albedo'],
        ],
    ),
    calcite_might_hex_rus=Template(
        sentences=[
            ['50:dmg_skill_albedo', '25:'],
            [],
            ['240:text_percent'],
        ],
        results=[
            [0],
            [2],
        ],
    ),
    flower_of_eden_hex_rus=Template(
        sentences=[
            ['1.2:ignore'],
            [],
            ['20:ignore', '50:def_percent'],
        ],
        results=[
            [0],
            [2],
        ],
    ),
    flower_of_eden_hex_eng=Template(
        sentences=[
            ['1.2:ignore'],
            [],
            ['50:def_percent', '20:ignore'],
        ],
        results=[
            [0],
            [2],
        ],
    ),
    calcite_might_hex_eng=Template(
        sentences=[
            ['25:', '50:dmg_skill_albedo'],
            [],
            ['240:text_percent'],
        ],
        results=[
            [0],
            [2],
        ],
    ),
    homuncular_nature=Template(
        sentences=[
            ['mastery', 'ignore'],
        ],
    ),
    flower_of_eden=Template(
        sentences=[
            ['ignore'],
        ],
    ),
    opening_of_phanerozoic_rus=Template(
        sentences=[
            ['ignore'],
            [],
            [],
            [],
            ['text_percent_dmg'],
            [],
            ['ignore'],
        ],
    ),
    opening_of_phanerozoic_eng=Template(
        sentences=[
            ['ignore'],
            [],
            [],
            ['text_percent_dmg'],
            [],
            ['ignore'],
        ],
    ),
    opening_of_phanerozoic_hex_rus=Template(
        sentences=[
            ['30:ignore'],
            [],
            [],
            [],
            ['30:text_percent_dmg'],
            [],
            ['4:ignore'],
            [],
            ['4:ignore', '3:ignore', '300:'],
            [],
            ['10:ignore', '125:'],
        ],
    ),
    opening_of_phanerozoic_hex_eng=Template(
        sentences=[
            ['30:ignore'],
            [],
            [],
            ['30:text_percent_dmg'],
            [],
            ['4:ignore'],
            [],
            ['4:ignore'],
            ['3:ignore', '300:'],
            ['125:', '10:ignore'],
        ],
    ),
    descent_of_divinity=Template(
        sentences=[
            ['30:dmg_plunge'],
        ],
    ),
    descent_of_divinity_hex=Template(
        replace={
            '<br>': '\n<br>\n',
        },
        sentences=[
            ['30:dmg_plunge'],
            [],
            ['3:ignore', '30:dmg_plunge'],
            ['0.1:ignore'],
        ],
        results=[
            [0],
            [2, 3],
        ],
    ),
    dust_of_purification=Template(
        sentences=[
            ['dmg_all'],
        ],
    ),
    dust_of_purification_hex_rus=Template(
        replace={
            '<br>': '\n<br>\n',
        },
        patterns=[
            ('\{LINK#TE382}', ''),
            ('\{/LINK}', ''),
        ],
        sentences=[
            ['17:dmg_all'],
            [],
            [],
            ['4:ignore', '20:ignore', '250:text_percent_dmg'],
        ],
        results=[
            [0],
            [2, 3],
        ],
    ),
    dust_of_purification_hex_eng=Template(
        replace={
            '<br>': '\n<br>\n',
        },
        patterns=[
            ('\{LINK#TE382}', ''),
            ('\{/LINK}', ''),
        ],
        sentences=[
            ['17:dmg_all'],
            [],
            ['4:ignore'],
            ['250:text_percent_dmg', '20:ignore'],
        ],
        results=[
            [0],
            [2, 3],
        ],
    ),
)
