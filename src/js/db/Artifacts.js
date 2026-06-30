import { Mainstats } from "./Artifacts/Mainstats";
import { Rarity } from "./Artifacts/Rarity";
import { Sets } from "./Artifacts/Sets";
import { Slots } from "./Artifacts/Slots";
import { Substats } from "./Artifacts/Substats";

//DB.Artifacts.Sets.getList().reduce((acc, v)=> acc.concat(v.getConditions(4)), []).reduce((amax, v)=>amax>=v.getId()?amax:v.getId(), 0)

export const Artifacts = {
    Mainstats: Mainstats,
    Rarity: Rarity,
    Sets: Sets,
    Slots: Slots,
    Substats: Substats,
};
