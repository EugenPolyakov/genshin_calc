from ...template import Template, TemplateList


char_nefer = TemplateList(
    default_rus=Template(
        names=[
            'Нефер',
        ],
        skills={
            'skill': ['Стратегия сенета: Танец тысячи ночей'],
            'burst': ['Священная клятва: Химера истинного взора'],
        },
    ),
    default_eng=Template(
        names=[
            'Nefer',
        ],
        skills={
            'skill': ['Senet Strategy: Dance of a Thousand Nights'],
            'burst': ["Sacred Vow: True Eye's Phantasm"],
        },
    ),
    a_wager_of_moonlight_rus = Template(
        sentences= [
            [],
            [],
            ['15:ignore'],
            [],
            [],
            [],
            ['1:ignore'],
            ['3:ignore', '3:ignore', '100:', '8:ignore'],
        ],
    ),
    a_wager_of_moonlight_eng = Template(
        sentences= [
            [],
            [],
            ['15:ignore'],
            [],
            [],
            ['1:ignore'],
            ['3:ignore', '100:', '8:ignore'],
        ],
    ),
    daughter_of_the_dust_and_sand_rus = Template(
        sentences= [
            ['5:ignore'],
            ['100:', '500:', '10:ignore', '50:ignore'],
        ],
    ),
    daughter_of_the_dust_and_sand_eng = Template(
        sentences= [
            ['5:ignore'],
            ['100:', '500:', '10:ignore'],
            ['50:ignore'],
        ],
    ),
    dusklit_eaves_rus = Template(
        sentences= [
            ['0.0175:'],
            ['14:'],
            [],
            ['1:ignore'],
        ],
    ),
    dusklit_eaves_eng = Template(
        sentences= [
            ['0.0175:', '14:'],
            [],
            ['1:ignore'],
        ],
    ),
    planning_breeds_success = Template(
        sentences= [
            ['60:'],
            [],
        ],
    ),
    observation_feeds_strategy_rus = Template(
        sentences= [
            ['5:ignore', '5:ignore', '140:'],
            ['2:ignore'],
            ['5:ignore', '5:ignore', '200:', '8:ignore'],
            [],
            [],
        ],
    ),
    observation_feeds_strategy_eng = Template(
        sentences= [
            ['5:ignore', '5:ignore', '140:'],
            ['2:ignore'],
            ['5:ignore', '200:', '8:ignore'],
            [],
            [],
        ],
    ),
    delusion_ensnares_reason = Template(
        sentences= [
            ['25:ignore'],
            [],
            ['20:enemy_res_dendro'],
            ['4.5:ignore'],
        ],
    ),
    victory_flows_from_the_turning_of_tides = Template(
        sentences= [
            ['85:'],
            ['120:'],
            [],
            [],
            [],
            [],
            ['15:'],
        ],
    ),
)
