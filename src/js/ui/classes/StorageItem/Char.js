import { CalcSet } from "../../../classes/CalcSet";
import { Serializer } from "../../../classes/Serializer";
import { UI } from "../../../ui";
import { StorageItem } from "../StorageItem";

export class StorageItemChar extends StorageItem {
    constructor() {
        super('char');
    }

    decodeItem(string) {
        let input = Serializer.unpack(string);
        if (!input) return null;

        return CalcSet.deserialize(input);
    }

    itemHash(item) {
        return item.data +'-'+ (item.title || '');
    }

    savedHashes() {
        let result = {};

        for (let item of this.listDecoded(1)) {
            let char = item.data.getChar().object;

            for (const [slot, art] of Object.entries(item.data.getArtifacts())) {
                if (art) {
                    let hash = art.getHash();
                    if (!result[hash]) {
                        result[hash] = []
                    }

                    let icon = char.getIcon();
                    if (!result[hash].includes(icon)) {
                        result[hash].push(icon);
                    }
                }
            }
        }

        return result;
    }

    add(char, meta, refreshArtProcs) {
        super.add(char, meta);

        if (refreshArtProcs) {
            let chars = this.listDecoded(1);
            let newArts = char.getArtifacts();
            let existedHashes = UI.Layout.app.storage.artifacts.storageLexHashes();
            for (let art of Object.entries(newArts))
                if (art[1]) {
                    let lex = art[1].getLexHash();
                    let hash = art[1].getHash();
                    let storedArtifact = existedHashes[lex];
                    if (storedArtifact && storedArtifact.hash != hash) {
                        UI.Layout.app.storage.artifacts.replace(storedArtifact.index, art[1]);

                        for (var c of chars) {
                            let checkedArt = c.data.getArtifacts()[art[0]];
                            let upd = false;
                            if (checkedArt.getLexHash() == lex && checkedArt.hash != hash) {
                                c.data.setArtifact(art[1]);
                                upd = true;
                            }
                            if (upd)
                                this.replace(c.index, c.data);
                        }
                    }
                }
        }
    }

    addChars(items) {
        let hashes = {};

        for (let char of this.items) {
            hashes[char.data] = 1;
        }

        for (let data of items) {
            let char = data.set;
            let hash = char.getHash();

            if (hash && !hashes[hash]) {
                this.add(char, {});
            }
        }
    }
}
