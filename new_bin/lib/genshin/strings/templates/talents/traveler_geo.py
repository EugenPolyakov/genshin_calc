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
)
