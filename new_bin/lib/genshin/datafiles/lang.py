from .base import DictParser
from ..config import DATA_FILES_PATH
import os.path
import json

class LangData(DictParser):
    path = 'TextMap'

    def __init__(self, lang: str = 'EN'):
        self.lang = lang.upper()
        super().__init__()

    @property
    def filename(self):
        return f'TextMap{self.lang}.json'

    def parse(self):
        name = f'{DATA_FILES_PATH}/{self.path}/TextMap{self.lang}'
        if os.path.isfile(name + '.json'):
            file = open(name + '.json', 'r', encoding='utf-8')
            self.data = json.load(file)
        elif os.path.isfile(name + '_0.json'):
            self.data = {}
            for i in range(10):
                n = f'{name}_{i}.json'
                if os.path.isfile(n):
                    file = open(n, 'r', encoding='utf-8')
                    f = json.load(file)
                    for (idx, val) in f.items():
                        self.data[idx] = val
                else:
                    break
        else:
            raise FileExistsError(name)
