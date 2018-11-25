module.exports = class Star {
    constructor(name, story, ra, dec, mag) {
        this._name = name;
        this._story = story;
        this._ra = ra;
        this._dec = dec;
        this._mag = mag;
    }

    get name() {
        return this._name;
    }

    get story() {
        return this._story;
    }

    get rightAscend() {
        return this._ra;
    }

    get declination() {
        return this._dec;
    }

    get magnitude() {
        return this._mag;
    }
};