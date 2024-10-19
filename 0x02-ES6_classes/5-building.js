export default class Building {
  constructor(sqft) {
    if (typeof sqft !== 'number') throw new Error('sqft must be a number');
    if (this.constructor !== Building && this.evacuationWarningMessage === undefined) {
      throw new Error('Class extending Building must override evacuationWarningMessage');
    }

    this._sqft = sqft;
  }

  set sqft(newSqft) {
    if (typeof newSqft !== 'number') throw new Error('sqft must be a number');
    this._sqft = newSqft;
  }

  get sqft() {
    return this._sqft;
  }
}
