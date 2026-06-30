from ...template import Template, TemplateList


char_traveler_anemo = TemplateList(
    default_rus=Template(
        names=[
            'путешественника', 'путешественнику',
        ],
        skills={
            'skill': ['Ладонь вихря'],
            'burst': ['Взрывное торнадо'],
        },
    ),
    default_eng=Template(
        names=[
            'Traveler',
        ],
        skills={
            'skill': ['Palm Vortex'],
            'burst': ['Gust Surge'],
        },
    ),
    slitting_wind=Template(
        sentences=[
            ['60:text_percent_dmg'],
        ],
    ),
    second_wind_rus=Template(
        sentences=[
            ['2:text_percent_hp', '5:ignore'],
            ['5:ignore'],
        ],
    ),
    second_wind_eng=Template(
        sentences=[
            ['2:text_percent_hp', '5:ignore'],
            [],
            ['5:ignore'],
        ],
    ),
    uprising_whirlwind=Template(
        sentences=[
            ['16:recharge'],
        ],
    ),
    cherishing_breezes=Template(
        sentences=[
            ['10:text_percent_reduce'],
        ],
    ),
    intertwined_winds=Template(
        sentences=[
            ['20:enemy_res_anemo'],
            [],
            ['20:'],
        ],
        results=[
            [0],
            [2],
        ],
    ),
    foreign_windwrath_rus=Template(
        sentences=[
            [],
            [],
            [],
            ['1:ignore'],
            ['1:ignore'],
            ['2:ignore'],
            [],
            [],
            [],
            [],
            ['60:'],
            [],
            ['50:'],
            [],
            [],
            ['1:ignore', '15:ignore'],
            [],
            [],
        ],
    ),
    foreign_windwrath_eng=Template(
        sentences=[
            [],
            [],
            [],
            ['1:ignore'],
            ['1:ignore'],
            ['2:ignore'],
            [],
            [],
            [],
            [],
            ['60:'],
            [],
            ['50:'],
            [],
            [],
            ['15:ignore'],
            [],
            [],
        ],
    ),
)
