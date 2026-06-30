import re
import struct
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


def add_array(descItems, result_hero_strings, talent_id, categ, beg_index = 0):
    index = 1 if len(descItems['rus']) > 1 or beg_index >= 1 else 0
    for (rus, eng) in zip(descItems['rus'], descItems['eng']):
        if rus or eng:
            namei = talent_id
            if index >= 1:
                namei = f'{talent_id}_{index}'
            result_hero_strings.append(
                OrderedDict(
                    category=categ,
                    name=namei,
                    rus=rus,
                    eng=eng,
                )
            )
            index += 1
    return index

def to_float32(value):
    # pack в 4 байта как float (f = 32-bit float)
    packed = struct.pack('f', float(value))
    # unpack обратно в Python float (но с 32-bit точностью)
    return struct.unpack('f', packed)[0]

