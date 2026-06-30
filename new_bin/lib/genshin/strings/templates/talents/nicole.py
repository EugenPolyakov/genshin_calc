from ...template import Template, TemplateList


char_nicole = TemplateList(
    default_rus=Template(
        names=[
            'Николь',
        ],
        skills={
            'skill': ['Откровение: Несотворённый свет'],
            'burst': ['Откровение: Лествица Божественного восхождения'],
        },
    ),
    default_eng=Template(
        names=[
            'Nicole',
        ],
        skills={
            'skill': ['Revelation: Uncreated Light'],
            'burst': ['Revelation: Ladder of Divine Ascent'],
        },
    ),
    light_in_the_darkness=Template(
        sentences=[
            [],
            ['2:ignore'],
            [],
            [],
            [],
            ['300:'],
        ],
        results=[
            [0, 1],
            [4, 5],
        ],
    ),
    methexis=Template(
        sentences=[
            ['20:ignore'],
            ['3:ignore', '300:'],
            [],
            [],
            [],
        ],
    ),
    philokalia=Template(
        sentences=[
            ['8:ignore'],
        ],
    ),
    do_not_be_afraid_child_who_is_loved_rus=Template(
        names=['Проекция священного таинства: Единство'],
        sentences=[
            ['600:'],
            [],
            ['6:ignore'],
        ],
    ),
    do_not_be_afraid_child_who_is_loved_eng=Template(
        names=['Arcane Projection: Unity'],
        sentences=[
            ['600:'],
            [],
            [],
            ['6:ignore'],
        ],
    ),
    i_will_guide_you_and_show_you_the_path_you_should_tread=Template(
        sentences=[
            ['300:', '25:'],
            [],
            [],
            [],
        ],
    ),
    whether_left_or_right_no_matter_which_way_you_turn=Template(
        sentences=[
            ['20:ignore'],
            ['16:ignore'],
            [],
            ['70:'],
            ['8:ignore'],
            [],
            [],
            [],
        ],
    ),
    this_is_the_path_walk_it_without_delay=Template(
        sentences=[
            [],
            [],
            [],
            ['40:enemy_def_ignore'],
        ],
    ),
)
