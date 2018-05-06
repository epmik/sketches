class RandomGenerator {
    
    // taken from https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript#answer-19301306
    
    constructor (seed) {
        this._seed = 123456789;
        this._step = 987654321;
        this.seed = seed;
    }
    
    get seed() {
        return this._seed;
    }

    set seed(seed){
        this._seed = seed === undefined || seed === null ? this._ticks() : seed;
        this._step = 987654321;
    }
        
    _ticks(date){
        date = date === undefined || date === null ? new Date() : date;
        return (621355968e9 + date.getTime() * 1e4);
    }
    
    value (min = 0, max = 1) {
        
        this._step = (36969 * (this._step & 65535) + (this._step >> 16)) & RandomGenerator.mask;
        this._seed = (18000 * (this._seed & 65535) + (this._seed >> 16)) & RandomGenerator.mask;
        
        var result = ((this._step << 16) + this._seed) & RandomGenerator.mask;
        
        result /= 4294967296;
        
        return min + ((max - min) * (result + 0.5));
    }
}

Object.defineProperty(RandomGenerator, 'mask', {
    // taken from https://stackoverflow.com/questions/32647215/declaring-static-constants-in-es6-classes#answer-32647583
    value: 0xffffffff,
    writable : false,
    enumerable : true,
    configurable : false
});