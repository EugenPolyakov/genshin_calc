import { DB } from "../../db/DB";
import { debugLog } from "../Debug";
import { WorkerFactory } from "../WorkerFactory";

export class WorkerFactoryPotentialArtifactUsefulness extends WorkerFactory {
    constructor (params) {
        super(params);

        this.maxThreads = params.maxThreads;
    }

    createWorker() {
        return new Worker(new URL('../../workers/PotentialArtifactUsefulness.js', import.meta.url));
    }

    getResult() {
        let result = [];

        for (const item of this.workers) {
            result = result.concat(item.result.profitValues);
        }

        return {
            actualValues: this.workers[0].result.actualValues,
            profitValues: result,
        }
    }

    getWorkersPayload(data) {
        let result = [];
        let one = Math.floor((data.arts.length + this.maxThreads - 1) / this.maxThreads);

        for (let i = 0; i < this.maxThreads; i++) {
            if (one * i < data.arts.length) {
                let threadData = {
                    artSettings: data.artSettings,
                    feature: data.feature,
                    build: data.build,
                    actualValues: data.actualValues,
                    arts: [],
                    returnProgress: data.returnProgress,
                };
                for (let j = one * i, cnt = Math.min(one * (i + 1), data.arts.length); j < cnt; j++) {
                    threadData.arts.push(data.arts[j].getHash());
                }
                result.push(threadData);
            }
        }

        return result;
    }
}
