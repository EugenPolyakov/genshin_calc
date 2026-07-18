import { ValueTable } from "../ValueTable";

export class StatTableArtifact extends ValueTable {
  getValue(level) {
    if (level < this.values.length) {
      return this.values[level];
    }

    return 0;
  }
}
