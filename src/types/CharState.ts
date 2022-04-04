import characterSet from '../definitions/charSet';
import colors from '../definitions/colors';

/**
 * Represents the state of a single character. Column manages an array of these, and Character renders them.
 * TODO: Feels like this could be part of Character, and then Column just manages the Character components.
 * TODO: Learn more about Svelte client-side API (https://svelte.dev/docs#run-time-client-side-component-api)
 */
export default class CharState {

    static agingChance = 0.7;
    static flipChance = 0.05;

    public age = 0;
    public color;
    public char = '';

    // set new character state (random char, age 0)
    new() {
        this.randomizeChar();
        this.age = 0;
    }

    randomizeChar() {
        this.char = characterSet.getRandomChar();
    }

    tick() {
        // if a color is set for this age
        if (colors[this.age]) {
            this.color = colors[this.age];
        }

        if (CharState.agingChance > Math.random()) {
            this.age++;
        }

        if (CharState.flipChance > Math.random()) {
            this.randomizeChar();
        }
    }

    erase() {
        this.char = '';
    }

}