from ...template import Template, TemplateList


char_mualani = TemplateList(
    default_rus=Template(
        names=[
            'Муалани',
            'Разрывающий укус акулки', 'Разрывающего укуса акулки',
            'иглобрюхов', 'иглобрюха', 'Акулкиных ракет', 'Импульса волн',
            'Постижения наездника волн', 'Зубастого бабаха', 'Жаростойкий пресноводный иглобрюх',
            'Беззаботные «Мецтли»...', 'Укус акулки'
        ],
        skills={
            'skill': ['Волнорезная сёрф-акула'],
            'burst': ['Зубастый бабах', 'Зубастого бабаха'],
        },
    ),
    default_eng=Template(
        names=[
            'Mualani',
            'Heat-Resistant Freshwater Floater', 'The Leisurely \'Meztli\'...',
            'Sharky\'s Surging Bite', 'Puffers', 'Puffer', 'Wave Momentum',
            'Sharky\'s Bite', 'Marked as Prey', 'Marks',
            'Wavechaser\'s Exploits', 'Shark Missiles', 'Boomsharka-laka',
        ],
        skills={
            'skill': ['Surfshark Wavebreaker'],
            'burst': ['Boomsharka-laka'],
        },
    ),
    surfshark_wavebreaker_rus=Template(
        sentences=[
            [],
            [],
            ['60:ignore'],
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
            ['1:ignore'],
            ['3:ignore'],
            ['1:ignore', '0.7:ignore'],
            [],
            [],
            [],
            [],
            ['3:ignore'],
            [],
            ['5:ignore'],
            [],
            ['1:ignore'],
            ['72:', '3:ignore'],
            [],
            [],
            [],
        ],
        results=[
            list(range(0, 33)),
            [23, 24],
            [26, 27, 28, 29],
        ],
    ),
    surfshark_wavebreaker_eng=Template(
        sentences=[
            [],
            [],
            ['60:ignore'],
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
            ['1:ignore'],
            ['3:ignore', '1:ignore', '0.7:ignore'],
            [],
            [],
            [],
            [],
            ['3:ignore'],
            [],
            ['5:ignore'],
            ['1:ignore', '72:', '3:ignore'],
            [],
            [],
            [],
        ],
        results=[
            list(range(0, 30)),
            [22, 23],
            [25, 26],
        ],
    ),
    heat_resistant_freshwater_puffer_rus=Template(
        sentences=[
            [],
            ['20:ignore'],
            ['2:ignore'],
        ],
    ),
    heat_resistant_freshwater_puffer_eng=Template(
        sentences=[
            ['20:ignore'],
            ['2:ignore'],
        ],
    ),
    natlans_greatest_guide=Template(
        sentences=[
            ['1:ignore', '20:ignore'],
            ['3:ignore'],
            ['15:text_percent_1', '30:text_percent_2', '45:text_percent_3'],
        ],
    ),
    the_leisurely_meztli=Template(
        sentences=[
            ['66:text_percent_dmg'],
            [],
            [],
            ['30:ignore'],
        ],
    ),
    mualani_going_all_out_rus=Template(
        sentences=[
            ['2:ignore'],
            ['1:ignore'],
            [],
            ['12:ignore', '2:ignore', '2:ignore'],
            [],
            [],
        ],
    ),
    mualani_going_all_out_eng=Template(
        sentences=[
            ['2:ignore'],
            ['1:ignore'],
            [],
            ['2:ignore', '12:ignore', '2:ignore'],
            [],
        ],
    ),
    sharky_eats_puffies=Template(
        sentences=[
            ['8:ignore'],
            [],
            [],
            ['75:dmg_burst_mualani'],
        ],
    ),
    spirit_of_the_springs_people=Template(
        sentences=[
            [],
        ],
    ),
)
