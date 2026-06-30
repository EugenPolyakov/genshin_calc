from os import name
from ..template import Template

fervent_flames = Template(
    sentences=[
        ['40:'],
        ['25:atk_percent'],
    ],
)

soothing_water = Template(
    sentences=[
        ['40:'],
        ['25:hp_percent'],
    ],
)

high_voltage = Template(
    sentences=[
        ['40:'],
        ['100:ignore', '5:ignore'],
    ],
)

impetuous_winds = Template(
    sentences=[
        ['15:stamina_consume'],
        ['10:move_speed'],
        ['5:recovery'],
    ],
)

sprawling_greenery = Template(
    sentences=[
        ['50:mastery'],
        ['30:mastery', '6:ignore'],
        ['20:mastery', '6:ignore'],
        [],
    ],
    results=[
        [0],
        [1, '<>', 3],
        [2, '<>', 3],
    ],
)

shattering_ice = Template(
    replace={
        'врагам': 'tab{enemy:врагам}',
        'opponents': 'tab{enemy:opponents}',
    },
    sentences=[
        ['40:'],
        ['15:crit_rate_enemy'],
    ],
    results=[
        [0],
        [1],
    ],
)

enduring_rock = Template(
    replace={
        ', dealing ': '. Dealing ',
        ', а при ': '. При ',
    },
    sentences=[
        ['15:shield'],
        ['15:dmg_all'],
        ['20:enemy_res_geo', '15:ignore'],
    ],
    results=[
        [0],
        [1],
        [2],
    ],
)

protective_canopy = Template(
    sentences=[
        ['15:res_phys', '15:res_phys'],
    ],
)
