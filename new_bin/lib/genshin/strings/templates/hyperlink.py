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
