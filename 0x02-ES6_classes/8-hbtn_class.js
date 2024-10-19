export default class HolbertonClass {
  constructor(size, location) {
    if (typeof size !== 'number') throw new Error('Size must be a number');
    if (typeof location !== 'string') throw new Error('Locaion must be a string');

    this._size = size;
    this._location = location;
  }

  set size(newSize) {
    if (typeof size !== 'number') throw new Error('Size must be a number');
    this._size = newSize;
  }

  get size() {
    return this._size;
  }

  set location(newLocation) {
    if (typeof newLocation !== 'string') throw new Error('Locaion must be a string');
    this._location = newLocation;
  }

  get location() {
    return this._location;
  }

  valueOf() {
    return this._size;
  }

  toString() {
    return this._location;
  }
}
