import re
from unicodedata import normalize
from collections import OrderedDict


def convert_name(name: str):
    result = re.sub(r'[^a-z0-9 ]', '', name, flags=re.IGNORECASE)
    result = result.title()
    return re.sub(r'\s+', '', result)


def convert_id(name: str, removeSemicolon=False):
    result = normalize('NFKD', name).encode('ASCII', 'ignore').decode("utf-8")

    if removeSemicolon:
        result = re.sub(r'^.*:\s*', '', result)
    result = re.sub(r'[\']', '', result, flags=re.IGNORECASE)
    result = re.sub(r'[^a-z0-9 ]', ' ', result, flags=re.IGNORECASE)
    result = result.lower()
    result = re.sub(r'\s+', '_', result)
    result = re.sub(r'^_+', '', result)
    result = re.sub(r'_+$', '', result)
    return result


def add_array(descItems, result_hero_strings, talent_id, categ):
    index = 0
    for (rus, eng) in zip(descItems['rus'], descItems['eng']):
        if rus or eng:
            index += 1
            namei = talent_id
            if len(descItems['rus']) > 1:
                namei = f'{talent_id}_{index}'
            result_hero_strings.append(
                OrderedDict(
                    category=categ,
                    name=namei,
                    rus=rus,
                    eng=eng,
                )
            )
