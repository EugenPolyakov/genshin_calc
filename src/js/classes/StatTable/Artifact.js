export class StatTableArtifact {
  constructor(values, multy) {
      this.values = values.map(x => Math.fround(x) * multy);
  }

  getValue(level) {
    if (level < this.values.length) {
      return this.values[level];
    }

    return 0;
  }
}
