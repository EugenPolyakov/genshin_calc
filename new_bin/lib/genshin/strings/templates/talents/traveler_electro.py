import re
from ...template import Template, TemplateList


char_traveler_electro = TemplateList(
    default_rus=Template(
        names=[
            'путешественника', 'путешественнику', 'элементальную энергию',
            'Амулетом изобилия',
        ],
        skills={
            'skill': ['Клинок молнии'],
            'burst': ['Раскаты грома'],
        },
    ),
    default_eng=Template(
        names=[
            'Traveler', 'Abundance Amulet',
        ],
        skills={
            'skill': ['Lightning Blade'],
            'burst': ['Bellowing Thunder'],
        },
    ),
    lightning_blade_rus=Template(
        replace={
            '<br>': '\n<br>\n',
            '</p><p>': '\n</p><p>\n'
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
            [5],
            [7, 8, 9, 10, 11],
        ],
        extracted_names=[1],
    ),
    lightning_blade_eng=Template(
        replace={
            '<br>': '\n<br>\n',
            '</p><p>': '\n</p><p>\n'
        },
        sentences=[
            [],
            [],
            ['2:'],
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
            [5],
            [7, 8, 9, 10, 11],
        ],
        extracted_names=[1],
    ),
    resounding_roar=Template(
        sentences=[
            ['10:text_percent'],
        ],
    ),
    violet_vehemence=Template(
        sentences=[
            ['15:', '8:ignore'],
        ],
    ),
    fickle_cloudstrike=Template(
        sentences=[
            ['35:text_percent1', '100:text_percent2'],
        ],
    ),
    world_shaker=Template(
        sentences=[
            ['2:ignore', '200:text_percent_dmg'],
        ],
    ),
    world_shaker_eng=Template(
        sentences=[
            ['2:ignore', '200:text_percent_dmg', '1:ignore'],
        ],
    ),
)
