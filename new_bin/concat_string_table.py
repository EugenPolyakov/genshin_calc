import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import csv
import glob
import json
from lib.genshin.strings.csv import CsvDumper

dirname = os.path.dirname(__file__)
input_files = os.path.join(dirname, '../data/strings/**/*.csv')
out_dir = os.path.join(dirname, '../src/js/lang/')
langs = ['eng', 'rus']

files = glob.glob(input_files, recursive=True)
items = []
uniq = set()

for filename in files:
    print(filename)
    with open(filename, encoding='utf-8') as csvfile:
        csv_file = csv.DictReader(
            csvfile,
            escapechar='~',
            quotechar='"',
            delimiter=';',
        )
        for row in csv_file:
            n = f'{row["category"]};{row["name"]}'
            if n in uniq:
                print(n)
            else:
                uniq.add(n)
                items.append(row)
items = sorted(items, key=lambda d: (d["category"],d["name"]))

CsvDumper().dump(items, '../../raw/full.csv')
