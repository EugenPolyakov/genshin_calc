import { MAX_SET_SIZE } from "../../src/js/classes/ArtifactSet.js";
import { Serializer } from "../../src/js/classes/Serializer.js";
import { Rotation } from "../../src/js/classes/Rotation";
import { toBeEmptyArray } from "../../src/js/test/matchers.js";
import { CalcSet } from "../../src/js/classes/CalcSet.js";

global.window = {};
global.localStorage = {};

function checkDefault(build) {
    var message = '';
    var hasChar = build.getChar() != null;
    if (!hasChar)
        message += 'Char is null; ';
    var hasWeapon = build.getWeapon() != null;
    if (!hasWeapon)
        message += 'Weapon is null; ';
    var hasEnemy = build.getEnemy() != null;
    if (!hasEnemy)
        message += 'Enemy is null; ';
    var hasArtifacts = build.getArtifacts() != null;
    if (!hasArtifacts)
        message += 'Artifacts is null; ';
    var hasBuffs = build.getBuffs() != null;
    if (!hasBuffs)
        message += 'Buffs is null; ';
    var hasPartyChars = build.getPartyChars() != null;
    if (!hasPartyChars)
        message += 'PartyChars is null; ';
    var hasRotation = build.getRotation() != null;
    if (!hasRotation)
        message += 'Rotation is null; ';

    return {
        message: () => message,
        pass: hasChar && hasWeapon && hasEnemy && hasArtifacts && hasBuffs && hasPartyChars && hasRotation,
    };
}

function checkArtifactsLoading(build) {
    var arts = build.getArtifacts();
    if (!arts)
        return {
            message: () => 'Arts is null',
            pass: false,
        };

    var art = arts.flower;
    if (!art)
        return {
            message: () => 'Flower is null',
            pass: false,
        };

    art.tryDoRightSubstats();

    var subStats = art.getSubStats();
    var message = '';
    if (subStats.length != 4)
        message += 'Wrong substats count; ';
    if (subStats[0].stat != 'crit_rate')
        message += 'First substat is ' + subStats[0].stat + '; ';
    if (subStats[0].value.toFixed(1) != '18.7')
        message += 'First substat value is ' + subStats[0].value + '; ';
    if (subStats[0].values.join('') != '13333')
        message += 'First substat procs is ' + subStats[0].values.join('') + '; ';

    if (subStats[1].stat != 'crit_dmg')
        message += 'First substat is ' + subStats[1].stat + '; ';
    if (subStats[1].value.toFixed(1) != '15.5')
        message += 'First substat value is ' + subStats[1].value + '; ';
    if (subStats[1].values.join('') != '33')
        message += 'First substat procs is ' + subStats[1].values.join('') + '; ';

    if (subStats[2].stat != 'atk_percent')
        message += 'First substat is ' + subStats[2].stat + '; ';
    if (subStats[2].value.toFixed(1) != '5.8')
        message += 'First substat value is ' + subStats[2].value + '; ';
    if (subStats[2].values.join('') != '3')
        message += 'First substat procs is ' + subStats[2].values.join('') + '; ';

    if (subStats[3].stat != 'recharge')
        message += 'First substat is ' + subStats[3].stat + '; ';
    if (subStats[3].value.toFixed(1) != '6.5')
        message += 'First substat value is ' + subStats[3].value + '; ';
    if (subStats[3].values.join('') != '3')
        message += 'First substat procs is ' + subStats[3].values.join('') + '; ';


    return {
        message: () => message,
        pass: message == '',
    };
}

expect.extend({ checkDefault, checkArtifactsLoading });

let list = [
    { name: 'default', hash: "bbbaabbbabbabaaabcbabradaadaaa", checkResult: "checkDefault" },
    { name: 'artifactV1', hash: "bbbaabbbabbababbBufubbejHfkFzeCgiCnabcbabradaadaaa", checkResult: "checkArtifactsLoading" },
    { name: 'artifactV2', hash: "bbbaabbbabbababdBufubbejCDKfakCvaejaijaabcbabradaadaaa", checkResult: "checkArtifactsLoading" },
];

for (let value of list) {
    let input = Serializer.unpack(value.hash);
    let build = CalcSet.deserialize(input);
    //let loadedRotation = Rotation.deserialize(input);

    test('wrong serialization for ' + value.name, () => {
        expect(build)[value.checkResult]();
    });
}

//for (const char of DB.Chars.getList(1)) {
//    let items = getItems(char);

//    test('Empty ids for '+ char.name, () => {
//        expect(Object.keys(items)).toBeEmptyArray();
//    });
//}
