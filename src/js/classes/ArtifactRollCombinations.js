// Нумерация по длине (1..6), затем лексикографически внутри каждой длины.
// Порядок фиксирован форматом и не зависит от порядка записей в БД.
const rollCombinations = new Map();

export function getRollCombinations(rollsCount) {
    if (!rollCombinations.has(rollsCount)) {
        const values = [];
        const ids = new Map();
        function append(prefix, length, minRoll) {
            if (prefix.length == length) {
                ids.set(prefix.join(''), values.length);
                values.push(prefix);
                return;
            }
            for (let roll = minRoll; roll < rollsCount; roll++) {
                append([...prefix, roll], length, roll);
            }
        }
        for (let length = 1; length <= 6; length++) append([], length, 0);
        rollCombinations.set(rollsCount, {values, ids});
    }
    return rollCombinations.get(rollsCount);
}

