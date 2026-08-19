from ...template import Template, TemplateList


char_alyosha = TemplateList(
    default_rus=Template(
        names=[
            'Алёш[иа]'
        ],
        skills={
            'skill': ['Молниеносная засада'],
            'burst': ['Наступление охотника'],
        },
    ),
    default_eng=Template(
        names=[
            'Alyosha',
        ],
        skills={
            'skill': ['Thunderbolt Strike'],
            'burst': ["Hunter's Advance"],
        },
    ),
    awakened_by_the_baying_hounds=Template(
        sentences=[
            ['120:'],
        ],
    ),
    suffer_the_winter_wheat_will=Template(
        sentences=[
            ['0.35:', '1:'],
            ['70:'],
        ],
    ),
    harvest_the_spoils=Template(
        sentences=[
            ['60:'],
        ],
    ),
    standard_reclaimed=Template(
        sentences=[
            ['2:ignore'],
            ['2:ignore', '100:mastery'],
        ],
    ),
)
