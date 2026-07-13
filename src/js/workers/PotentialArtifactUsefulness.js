import { Artifact } from "../classes/Artifact";
import { CalcSet } from "../classes/CalcSet";
import { Serializer } from "../classes/Serializer";
import { chanceCalculator } from "./PotentialArtifactUsefulness/Calculator";

self.onmessage = function (input) {
    let build = CalcSet.deserialize(input.data.build);
    let artsResult = [];

    self.postMessage({
        progress: {
            total: input.data.arts.length,
        }
    });

    chanceCalculator.prototype.sendProgress = input.data.returnProgress ? function () {
        if (this.progress - this.lastProcess > 200) {
            self.postMessage({
                progress: {
                    currentArtifact: this.packed,
                    value: this.progress / this.fullProgressCount * 100,
                }
            });
            this.lastProcess = this.progress;
        }
    } : function () { };

    let calc = new chanceCalculator({
        build,
        artifacts: input.data.arts.map(x => Artifact.deserialize(Serializer.unpack(x))),
        featureName: input.data.feature,
        actualValues: input.data.actualValues,
        settings: {
            setMinValues: {},
            setMaxValues: {},
            stats: input.data.stats || {},
        },
    });

    calc.prepare();

    for (let i = 0, cnt = calc.artifacts.length; i < cnt; i++) {
        calc.initArt(i);
        artsResult.push(calc.doCalculate());

        self.postMessage({
            progress: {
                inc: 1,
            }
        });
    }
    self.postMessage({
        actualValues: input.data.actualValues,
        profitValues: artsResult,
    });
}
