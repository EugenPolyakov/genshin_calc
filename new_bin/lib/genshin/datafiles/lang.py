from .base import DictParser
from ..config import DATA_FILES_PATH
import os.path
import json

class LangData(DictParser):
    path = 'TextMap'
    def_name = 'TextMap'
    def_name2 = 'TextMap_Medium'

    def __init__(self, lang: str = 'EN'):
        self.lang = lang.upper()
        super().__init__()

    @property
    def filename(self):
        return f'TextMap_Medium{self.lang}.json'

    def addDataFromFile(self, name):
        if os.path.isfile(name):
            file = open(name, 'r', encoding='utf-8')
            f = json.load(file)
            for (idx, val) in f.items():
                self.data[idx] = val
            return False
        return True

    def parse(self):
        name = f'{DATA_FILES_PATH}/{self.path}/{self.def_name}{self.lang}'
        self.data = {}
        if self.addDataFromFile(name + '.json'):
            if os.path.isfile(name + '_0.json'):
                for i in range(10):
                    n = f'{name}_{i}.json'
                    if self.addDataFromFile(n):
                        break
            else:
                raise FileExistsError(name)
        name = f'{DATA_FILES_PATH}/{self.path}/{self.def_name2}{self.lang}'
        if self.addDataFromFile(name + '.json'):
            if os.path.isfile(name + '_0.json'):
                for i in range(10):
                    n = f'{name}_{i}.json'
                    if self.addDataFromFile(n):
                        break
            else:
                raise FileExistsError(name)
