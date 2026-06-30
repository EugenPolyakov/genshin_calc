import { DbObjectListSerialize } from "../classes/DbObject/List/Serialize";
import { Artifacts } from "./Buffs/Artifacts";
import { ElementalResonance } from "./Buffs/ElementalResonance";
import { Static } from "./Buffs/Static";
import { Weapons } from "./Buffs/Weapons";

//let x = DB.DB.Buffs.getList().reduce((acc, val) => acc.concat(val.getConditions()), []).reduce(
//    (amax, val) => val.params.serializeIds!= null && Array.isArray(val.params.serializeIds) ?
//        (amax >= Math.max(...val.params.serializeIds) ? amax : Math.max(...val.params.serializeIds)) :
//        (amax >= (val.getId()) ? amax : val.getId()), 0)

export const Buffs = new DbObjectListSerialize({
    ElementalResonance: ElementalResonance,
    Artifacts: Artifacts,
    Weapons: Weapons,
    Static: Static,
});
