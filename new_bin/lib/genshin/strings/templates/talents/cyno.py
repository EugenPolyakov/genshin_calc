from ...template import Template, TemplateList


char_cyno = TemplateList(
    default_rus=Template(
        names=[
            'Сайно',
            'Поклявшегося прокладывать путь', 'Свидетеля истины', 'Вынесения приговора',
            'Молни[ийю] бедствия: Звёздный союз',
            'Молни[ийю] бедствия', 'Суд пера', 'Вынесение приговора',
            'Жертвоприношения шакала', 'Жертвоприношения шакала', 'Жертвоприношение шакала',
            'Тайного обряда: Переправляющий души', 'Священного обряда: Проворство шакала',
        ],
        skills={
            'skill': ['Тайного обряда: Переправляющий души'],
            'burst': ['Священного обряда: Проворство шакала'],
        },
    ),
    default_eng=Template(
        names=[
            'Cyno',
            'Pactsworn Pathclearer', 'Endseer', 'Judication',
            'Duststalker Bolts - Starsame',
            'Duststalker Bolts', 'Duststalker Bolt', 'Featherfall Judgment',
            'Day of the Jackal',
            'Secret Rite: Chasmic Soulfarer', 'Sacred Rite: Wolf\'s Swiftness'
        ],
        skills={
            'skill': ['Secret Rite: Chasmic Soulfarer'],
            'burst': ['Sacred Rite: Wolf\'s Swiftness'],
        },
    ),
    a_star_with_which_to_start_the_journey=Template(
        sentences=[
            ['6:ignore'],
            [],
            [],
        ],
    ),
    featherfall_judgment=Template(
        sentences=[
            [],
            ['35:dmg_skill_cyno', '3:ignore', '100:'],
            [],
            [],
        ],
    ),
    featherfall_judgment_hex=Template(
        sentences=[
            [],
            ['35:dmg_skill_cyno', '3:ignore', '100:'],
            [],
            [],
            ['3:ignore', '200:'],
            [],
        ],
        results=[
            [0, 1, 2],
            [4, 5],
        ],
    ),
    authority_over_the_nine_bows=Template(
        sentences=[
            [],
            [],
            ['150:'],
            [],
            ['250:'],
        ],
    ),
    authority_over_the_nine_bows_hex=Template(
        sentences=[
            [],
            [],
            ['150:'],
            [],
            ['250:'],
            [],
            ['600:'],
        ],
    ),
    unceasing_vigil=Template(
        sentences=[
            ['20:atk_speed_normal', '10:ignore'],
            [],
            [],
            [],
        ],
    ),
    unceasing_vigil_hex=Template(
        sentences=[
            ['20:atk_speed_normal', '10:ignore'],
            [],
            [],
            [],
            [],
            ['200:mastery'],
            [],
        ],
        results=[
            [0, 1, 2, 3],
            [5, 6],
        ],
    ),
    homecoming_of_spirits_rus=Template(
        sentences=[
            ['dmg_electro', 'ignore'],
            ['ignore', 'ignore', 'ignore'],
        ],
    ),
    homecoming_of_spirits_eng=Template(
        sentences=[
            ['dmg_electro', 'ignore'],
            ['ignore'],
            ['ignore'],
        ],
    ),
    homecoming_of_spirits_hex_rus=Template(
        names=['обычной'],
        sentences=[
            ['10:dmg_electro', '4:ignore'],
            ['1:ignore', '0.1:ignore', '5:ignore'],
            [],
            ['16:dmg_reaction_stellar_conduct'],
            ['0.1:ignore', '5:ignore'],
        ],
        results=[
            [0, 1],
            [3, 4],
        ],
    ),
    homecoming_of_spirits_hex_eng=Template(
        sentences=[
            ['10:dmg_electro', '4:ignore'],
            ['0.1:ignore'],
            ['5:ignore'],
            [],
            ['16:dmg_reaction_stellar_conduct'],
            ['0.1:ignore'],
            ['5:ignore'],
        ],
        results=[
            [0, 1, 2],
            [4, 5, 6],
        ],
    ),
    forbidding_guard=Template(
        sentences=[
            ['ignore'],
            [],
            ['ignore'],
        ],
    ),
    just_scales_rus=Template(
        sentences=[
            ['ignore'],
            ['ignore'],
            [],
            ['ignore', 'ignore'],
            [],
            [],
            ['ignore'],
            [],
            [],
        ],
    ),
    just_scales_eng=Template(
        sentences=[
            ['ignore'],
            ['ignore'],
            [],
            ['ignore'],
            ['ignore'],
            [],
            [],
            ['ignore', 'ignore'],
            [],
            [],
        ],
    ),
)
