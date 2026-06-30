import re
from ...template import Template, TemplateList


char_traveler_geo = TemplateList(
    default_rus=Template(
        names=[
            'путешественника', 'путешественнику', '[Кк]аменной стены', 'Комет[аы]', 
            'Ударная волна', 'время отката',
        ],
        skills={
            'skill': ['Меч звездопада'],
            'burst': ['Движение земли'],
        },
    ),
    default_eng=Template(
        replace={
            'name{Sword}': 'Sword',
        },
        names=[
            'Traveler', 'The meteorite', 'The barrier', 'CD', 'meteorite',
        ],
        keywords=[
            ('Starfell Sword', 'skill'),
        ],
        skills={
            'skill': ['Starfell Sword'],
            'burst': ['Wake of Earth'],
        },
    ),
    frenzied_rockslide=Template(
        sentences=[
            ['60:text_percent_dmg'],
        ],
    ),
    invincible_stonewall=Template(
        sentences=[
            ['10:crit_rate'],
        ],
    ),
    foreign_adamantine_rus=Template(
        sentences=[
            [],
            [],
            [],
            ['1:ignore'],
            ['3:ignore'],
            ['1:ignore', '1:ignore'],
            ['3:ignore'],
            [],
            [],
            [],
            [],
            ['120:'],
            [],
            ['15:ignore', '20:shield'],
            [],
            ['1:ignore', '15:ignore'],
        ],
        results=[
            list(range(0, 16)),
            [13],
        ],
    ),
    foreign_adamantine_eng=Template(
        sentences=[
            [],
            [],
            [],
            ['1:ignore', '3:ignore'],
            ['1:ignore'],
            ['3:ignore'],
            [],
            [],
            [],
            [],
            ['120:'],
            [],
            ['15:ignore', '20:shield'],
            [],
            ['15:ignore'],
        ],
        results=[
            list(range(0, 15)),
            [12],
        ],
    ),
)
