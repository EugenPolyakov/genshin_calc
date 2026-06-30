from ..template import Template

n11220001 = Template(
    replace = {
        '{PARAM#P1223201|3S1}': '3',
    },
)

n11220003 = Template(
    replace={
        '{PARAM#P1222101|6S100}%': 'value{8%}',
        '{PARAM#P1222101|1S1}': '3',
        '{PARAM#P1222101|2S1}': '9',
    },
)

n11260001 = Template(
    replace={
        '{PARAM#P1263201|4S1}': '15',
    },
)

n11310002 = Template(
    replace={
        '{PARAM#P1312101|3S1}': 'value{300}',
        '{PARAM#P1312101|2S1}': '3',
        '{PARAM#P1312201|1S1}': '8',
    },
)
