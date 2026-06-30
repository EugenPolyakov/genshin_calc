import sys
import os
dirname = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, dirname)
import time
start_time = time.time()

out_dir = os.path.join('', dirname, '../src/js/generated/');
os.makedirs(out_dir, exist_ok= True)

def processFiles(dr, rel, outfile):
    for d in os.scandir(dr):
        if d.is_dir():
            processFiles(d.path + '/', rel + d.name + '/', outfile)
        elif d.is_file():
            outfile.write(f'export * from "../{rel}{d.name}";\n')

def generateLibrary(name):
    outfile = open(out_dir + name + '.js', 'w', encoding='utf-8')
    processFiles(os.path.join('', dirname, '../src/js/classes/'), 'classes/', outfile)
    outfile.write(f'export * from "../db/DB.js";\n')
    #processFiles(os.path.join('', dirname, '../src/js/', name + '/'), name + '/', outfile)

# generateLibrary('classes')
generateLibrary('db')

print("--- %s ms ---" % (int((time.time() - start_time) * 1000)))
