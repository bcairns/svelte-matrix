class CharSet {

    private set:string[] = [];

    constructor() {
        // add kana chars
        for (let ch = 0xFF61; ch <= 0xFF9F; ch++) {
            this.set.push(String.fromCharCode(ch));
        }

        // add some latin chars
        ['Z', '0', '8', '4', '<', '>', ':', '+', '*'].forEach( c => {
            this.set.push(c);
        });
    }

    getRandomChar():string {
        return this.set[Math.floor(Math.random() * this.set.length)];
    }
}

export default new CharSet();