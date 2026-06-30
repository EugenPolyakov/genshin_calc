import { Artifact } from "../Artifact";
import { ArtifactsSuggestSort } from "../ArtifactsSuggestSort";
import { debugLog } from "../Debug";
import { WorkerFactory } from "../WorkerFactory";

const MAX_WORKERS_CNT = 16;
const MAX_RESULTS = 20;
const MIN_COMBINATIONS_PER_THREAD = 2_000_000;

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
            result = result.concat(item.result);
        }

        for (let item of result) {
            let deserialized = [];
            for (let artData of item.artifacts) {
                if (artData) {
                    deserialized.push(Artifact.deserialize(artData));
                }
            }
            item.artifacts = deserialized;
        }

        debugLog(result.map(x => x.value));
        result = result.sort(function(a,b) {
            return b.value - a.value;
        });
        result = result.splice(0, MAX_RESULTS);
        debugLog(result.map(x => x.value));

        return result;
    }

    acceptProgress(index, data) {
        this.progressCallback(data);
    }

    checkCompleted() {
        this.submitResult();
    }

    onMessage(index, data) {
        if (data.calculating) {
            this.progressCallback(data);
        } else {
            this.callback(data);
        }
    }

    run(data) {
        //другой алгоритм, который новые запросы добавляет к уже имеющимся, а не делит один запрос на возможные потоки
        let finishedWorkers = [];
        let workers = [];
        for (let item of this.workers) {
            if (item.isCompleted) {
                item.result = null;
                finishedWorkers.push(item);
            } else {
                workers.push(item);
            }
        }

        let isClear = false;
        while (workers.length >= 0 && this.maxThreads <= workers.length) {
            let worker = workers.pop();
            worker.worker.terminate();
            isClear = true;
        }

        if (isClear && this.terminateCallback) {
            this.terminateCallback();
        }

        this.startedAt = performance.now();
        this.progress = { completed: 0, total: 0 };

        this.workers = [];

        for (let payload of this.getWorkersPayload(data)) {
            let old = finishedWorkers.pop();
            let worker;

            if (old) {
                worker = old.worker;
            } else {
                worker = this.createWorker();
            }

            let index = this.workers.length;
            this.workers.push({
                isCompleted: false,
                isError: false,
                worker: worker,
                result: {},
                progress: { completed: 0, total: 0 },
                payload: payload,
            });

            worker.onmessage = (data) => { this.onMessage(index, data.data) };
            worker.onerror = (data) => { this.onError(index, data.data) };
        }

        if (this.startCallback) {
            this.startCallback({
                workers: this.workers.length,
            });
        }

        for (let item of this.workers) {
            item.worker.postMessage(item.payload);
        }

        if (finishedWorkers.length > 0 || workers.length > 0)
            this.workers = this.workers.concat(finishedWorkers, workers);
    }
}

function calcCombinations(items) {
    let result = 1;
    for (let slot of Object.keys(items)) {
        result *= items[slot].length || 1;
    }
    return result;
}
