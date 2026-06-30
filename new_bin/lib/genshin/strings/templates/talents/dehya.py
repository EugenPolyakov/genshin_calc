from ...template import Template, TemplateList


char_dehya = TemplateList(
    default_rus=Template(
        names=[
            'Дэхья', 'Дэхьей', 'Дэхьи',
            'Крови алой гривы', 'Огненное узилище: Непреклонное пламя',
            'Золотой формы', 'Огненного узилища', 'Огненное узилище',
            'Кулаки Пламенной Гривы', 'Сжигающий удар', 'Пылающей львицы', 'Клыков львицы',
            'Крит. урон',
        ],
        skills={
            'skill': ['Сферы пламени Расплавленного пекла', 'Огненное узилище: Непреклонное пламя', 'Расплавленного пекла'],
            'burst': ['Клыков львицы'],
        },
    ),
    default_eng=Template(
        names=[
            'Dehya',
            'Fiery Sanctum', 'Redmane\'s Blood', 'Gold-Forged Form',
            'Flame-Mane\'s Fist', 'Incineration Drive', 'Blazing Lioness',
        ],
        skills={
            'skill': ['Molten Inferno: Ranging Flame', 'Molten Inferno: Indomitable Flame', 'Molten Inferno'],
            'burst': ['Leonine Bite'],
        },
    ),
    unstinting_succor=Template(
        sentences=[
            ['ignore', 'ignore'],
            ['ignore'],
            [],
            ['ignore'],
            [],
            ['ignore'],
        ],
    ),
    stalwart_and_true=Template(
        sentences=[
            ['ignore', None, None, 'ignore', 'ignore'],
            ['ignore'],
        ],
    ),
    the_flame_incandescent_rus=Template(
        sentences=[
            ['20:hp_percent'],
            [],
            [],
            ['3.6:skill_base_hp_percent'],
            [],
            ['6:burst_base_hp_percent'],
        ],
    ),
    the_flame_incandescent=Template(
        sentences=[
            ['20:hp_percent'],
            [],
            ['3.6:skill_base_hp_percent'],
            [],
            ['6:burst_base_hp_percent'],
        ],
    ),
    the_sand_blades_glittering=Template(
        sentences=[
            ['ignore'],
            [],
            ['dmg_skill_dehya'],
        ],
    ),
    an_oath_abiding=Template(
        sentences=[
            ['ignore', 'text_percent_heal'],
            ['ignore'],
        ],
    ),
    the_burning_claws_cleaving_rus=Template(
        sentences=[
            ['crit_rate_burst'],
            [],
            ['crit_dmg_burst', 'ignore'],
            ['ignore'],
            ['ignore'],
            [None],
        ],
        results=[
            [0],
            [2, 3, 4, 5],
        ],
    ),
    the_burning_claws_cleaving_eng=Template(
        sentences=[
            ['crit_rate_burst'],
            [],
            ['crit_dmg_burst', 'ignore'],
            ['ignore'],
            ['ignore', None],
        ],
        results=[
            [0],
            [2, 3, 4],
        ],
    ),
)
