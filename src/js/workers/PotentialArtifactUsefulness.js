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
            stats: {},
        },
    });

    calc.prepare();

    for (let i = calc.artifacts.length - 1; i >= 0; i--) {
        calc.initArt(i);
        artsResult.push(calc.doCalculate());
        //artsResult.push({
        //    currentArtifact: packed,
        //    values: {
        //        normal: 0,
        //        crit: 0,
        //        average: 0,
        //    },
        //    goodCount: {
        //        normal: 0,
        //        crit: 0,
        //        average: 0,
        //    },
        //    combCount: 0,
        //});

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
