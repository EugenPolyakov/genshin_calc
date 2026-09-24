import { getRollCombinations } from '../src/js/classes/ArtifactRollCombinations';
import { Artifact } from '../src/js/classes/Artifact';
import { Rotation } from '../src/js/classes/Rotation';
import { Serializer } from '../src/js/classes/Serializer';
import { DB } from '../src/js/db/DB';

function legacyArtifact(art) {
    const data = [3, DB.Artifacts.Sets.getId(art.set), art.rarity, art.level,
        DB.Artifacts.Slots.getId(art.slot), DB.Artifacts.Mainstats.getId(art.mainStat), Object.keys(art.subStats).length];
    for (const [key, stat] of Object.entries(art.subStats)) {
        if (stat.unactivated) data.push(25);
        data.push(DB.Artifacts.Substats.getId(key));
        let value = 0;
        if (stat.values) {
            for (const roll of [...stat.values].reverse()) value = value * 8 + roll + 1;
            value = value * 2 + 1;
        } else {
            value = (DB.Artifacts.Substats.get(key).type == 'percent' ? Math.floor(stat.value * 10) : stat.value) * 2;
        }
        data.push(value, stat.initialValue || 0);
    }
    return data;
}

function makeArt(rarity = 5, level = 20) {
    return new Artifact(rarity, level, 'flower', DB.Artifacts.Sets.getKeyId(1), 'hp');
}

const roundtrip = art => Artifact.deserialize(Serializer.unpack(Serializer.pack(art)));

test('artifact v5 preserves all rarity/level pairs and following data', () => {
    for (let rarity = 1; rarity <= 5; rarity++) {
        for (let level = 0; level <= 20; level++) {
            const art = makeArt(rarity, level);
            const data = [...art.serialize(), 987];
            const restored = Artifact.deserialize(data);
            expect([restored.rarity, restored.level]).toEqual([rarity, level]);
            expect(data).toEqual([987]);
        }
    }
});

test('roll sequences, initial rolls and inactive flags survive v3 and v5', () => {
    for (let rarity = 1; rarity <= 5; rarity++) {
        const radix = DB.Artifacts.Substats.get('atk').rolls[rarity - 1].length;
        for (let length = 1; length <= 6; length++) {
            for (let initial = 0; initial <= radix; initial++) {
                for (const inactive of [false, true]) {
                    const art = makeArt(rarity, 0);
                    art.addStatByProcs('atk', Array.from({length}, (_, i) => i % radix), inactive, initial);
                    const old = legacyArtifact(art);
                    expect(roundtrip(art).serialize()).toEqual(Artifact.deserialize([...old]).serialize());
                    expect(roundtrip(art).subStats.atk).toEqual(art.subStats.atk);
                    expect(Serializer.pack(art).length).toBeLessThanOrEqual(Serializer.packSerialized(old).length);
                }
            }
        }
    }
});

test('manual stat values and all stat IDs survive packing', () => {
    for (const key of DB.Artifacts.Substats.getKeys()) {
        expect(DB.Artifacts.Substats.getId(key)).toBeLessThan(16);
        const art = makeArt();
        art.addStat(key, 123, true, 4);
        expect(roundtrip(art).serialize()).toEqual(Artifact.deserialize(legacyArtifact(art)).serialize());
    }
});

test('artifact v1 and v2 remain readable', () => {
    const art = makeArt();
    art.addStatByProcs('atk', [0, 3], true, 0);
    const v2 = legacyArtifact(art);
    v2[0] = 2;
    v2.pop();
    expect(Artifact.deserialize(v2).serialize()).toEqual(art.serialize());
    expect(Artifact.deserialize([1, 1, 5, 20, 1, 1, 1, 2, 123]).subStats.atk.value).toBe(123);
});

test('rotation v4 packs flags and nested item types; v1-v3 still load', () => {
    for (let flags = 0; flags < 4; flags++) {
        const old = [3, 0, 1, flags & 1, (flags >> 1) & 1, 3, 2, 1, 0, 1, 4, 1, 50, 0];
        const rotation = Rotation.deserialize([...old]);
        const packed = Serializer.pack(rotation);
        expect(packed.length).toBe(Serializer.packSerialized(old).length - 4);
        expect(Rotation.deserialize(Serializer.unpack(packed)).items).toEqual(rotation.items);
    }
    expect(Rotation.deserialize([1, 1, 3, 2, 0]).items[0].count).toBe(2);
    expect(Rotation.deserialize([2, 0, 1, 1, 3, 2, 0]).items[0].disabled).toBe(true);
});

test('five equipped artifacts survive a complete build roundtrip', () => {
    const { CalcSet } = require('../src/js/classes/CalcSet');
    const build = new CalcSet();
    build.setChar(DB.Chars.getFirst());
    build.setEnemy(DB.Enemies.getFirst().getFirst());
    for (const slot of DB.Artifacts.Slots.getKeys()) {
        const art = makeArt();
        art.slot = slot;
        art.mainStat = DB.Artifacts.Slots.get(slot).mainStats[0];
        art.addStatByProcs('recharge', [0, 1, 2, 3], false, 1);
        build.artifacts.artifacts[slot] = art;
    }
    const serialized = build.serialize();
    expect(CalcSet.deserialize(Serializer.unpack(Serializer.pack(build))).serialize()).toEqual(serialized);
});

test('rotation features and conditions preserve their payload', () => {
    const old = [3, 0, 2, 1, 1, 1, 1, 3, 2, 0, 1, 2, 6, 0, 1, 7];
    const rotation = Rotation.deserialize([...old]);
    expect(rotation.items).toHaveLength(2);
    expect(Rotation.deserialize(Serializer.unpack(Serializer.pack(rotation))).items).toEqual(rotation.items);
});

test('representative artifact is shorter than v3', () => {
    const art = makeArt();
    art.addStatByProcs('atk', [0, 1, 2, 3, 3, 3], false, 1);
    art.addStatByProcs('recharge', [0], false, 0);
    art.addStatByProcs('crit_rate', [3], false, 4);
    art.addStatByProcs('crit_dmg', [3], true, 4);
    const oldLength = Serializer.packSerialized(legacyArtifact(art)).length;
    const newLength = Serializer.pack(art).length;
    expect(newLength).toBeLessThan(oldLength);
    console.log(`Artifact example: v3=${oldLength}, v5=${newLength} characters`);
});

function combinations(radix, length, prefix = []) {
    if (!length) return [prefix];
    const result = [];
    for (let roll = prefix.length ? prefix[prefix.length - 1] : 0; roll < radix; roll++) {
        result.push(...combinations(radix, length - 1, [...prefix, roll]));
    }
    return result;
}

test('v5 assigns consecutive IDs to every roll combination and reads v4', () => {
    for (let rarity = 1; rarity <= 5; rarity++) {
        const radix = DB.Artifacts.Substats.get('hp').rolls[rarity - 1].length;
        let id = 0;
        for (let length = 1; length <= 6; length++) {
            for (const rolls of combinations(radix, length)) {
                const art = makeArt(rarity, 0);
                art.addStatByProcs('hp', rolls, false, 0);
                const data = art.serialize();
                expect(data[0]).toBe(5);
                const table = getRollCombinations(radix);
                expect(table.ids.get(rolls.join(''))).toBe(id);
                expect(table.values[id]).toEqual(rolls);
                // Низкие редкости могут нормализовать недопустимое число проков.
                if (data[7] % 2) {
                    expect(table.values[data[7] >> 1]).toEqual(art.subStats.hp.values);
                    expect(roundtrip(art).subStats.hp.values).toEqual(art.subStats.hp.values);
                }
                let v4Value = 0;
                for (const roll of [...rolls].reverse()) v4Value = v4Value * radix + roll + 1;
                const v4 = [...data];
                v4[0] = 4;
                v4[7] = v4Value * 2 + 1;
                const v5 = [...data];
                v5[7] = id * 2 + 1;
                expect(Artifact.deserialize(v4).serialize()).toEqual(Artifact.deserialize(v5).serialize());
                id++;
            }
        }
        expect(id).toBe({2: 27, 3: 83, 4: 209}[radix]);
    }
});

test('v5 rejects nonexistent combination IDs', () => {
    expect(Artifact.deserialize([5, 1, 20, 1, 1, 1, 2, 209 * 2 + 1])).toBeNull();
});
