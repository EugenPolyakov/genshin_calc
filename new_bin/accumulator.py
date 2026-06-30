storedData = {}
storedCounter = {}

def listsAreEqual(a, b):
    if len(a) != len(b): return False
    for (v1, v2) in zip(a, b):
        if v1 != v2: return False
    return True

def dictsAreEqual(a, b):
    if not listsAreEqual(a.keys(), b.keys()): return False

    for key in a:
        if a[key] != b[key]: return False

    return True

def get(category):
    return storedData.get(category, [])

def storeList(category, data):
    if not category in storedData:
        storedData[category] = {}
        storedCounter[category] = 0

    matchedKey = None

    for key in storedData[category]:
        if listsAreEqual(storedData[category][key], data):
            matchedKey = key
            break

    if not matchedKey:
        storedCounter[category] += 1
        matchedKey = storedCounter[category]
        storedData[category][matchedKey] = data

    return '%s.n%s' % (category, matchedKey)

def convertStatToKey(stat):
    if stat == "atk_base": return "atk"
    elif stat == "atk_percent": return "atkp"
    elif stat == "crit_dmg_base": return "cdmg"
    elif stat == "def_percent": return "def"
    elif stat == "mastery_base": return "mastery"
    elif stat == "recharge_base": return "recharge"
    elif stat == "dmg_phys_base": return "phys"
    elif stat == "crit_rate_base": return "crit"
    elif stat == "hp_percent": return "hp"
    else: raise f"unk {stat}"

def storeDict(category, data, customKey):
    if not category in storedData:
        storedData[category] = {}
        storedCounter[category] = 0

    matchedKey = None

    for key in storedData[category]:
        if key.startswith(customKey) and dictsAreEqual(storedData[category][key], data):
            matchedKey = key
            break

    if not matchedKey:
        if customKey in storedData[category]:
            storedCounter[category] += 1
            matchedKey = f'{customKey}_{storedCounter[category]}'
        else:
            matchedKey = customKey
        storedData[category][matchedKey] = data

    return '%s.%s' % (category, matchedKey)


