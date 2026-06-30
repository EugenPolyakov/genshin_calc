import { debugLog } from "../../Debug";
import { WorkerFactoryPotentialArtifactUsefulness } from "../PotentialArtifactUsefulness";

export class WorkerFactoryByOnePotentialArtifactUsefulness extends WorkerFactoryPotentialArtifactUsefulness {

    terminate() {
        let finishedWorkers = [];

        let terminated = [];
        for (let item of this.workers) {
            if (item.isCompleted) {
                item.result = null;
                finishedWorkers.push(item);
            } else {
                item.worker.terminate();
                terminated.push(item);
            }
        }

        this.workers = finishedWorkers;

        if (terminated.length && this.terminateCallback) {
            this.terminateCallback(terminated.map(x => x.payload.currentArtifact));
        }
    }

    acceptProgress(index, data) {
        this.progressCallback(data);
    }

    checkCompleted(index, data) {
        debugLog(this.constructor.name + ' finished in: ' + (performance.now() - this.workers[index].startedAt));
        this.callback(data);
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

        let terminated = [];
        while (workers.length >= 0 && this.maxThreads <= workers.length) {
            let worker = workers.pop();
            worker.worker.terminate();
            terminated.push(worker);
        }

        if (terminated.length && this.terminateCallback) {
            this.terminateCallback(terminated.map(x => x.payload.currentArtifact));
        }

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
                startedAt: performance.now(),
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
