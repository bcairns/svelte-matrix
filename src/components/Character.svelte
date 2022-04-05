<script context="module">
    export const width = 26;
    export const height = 26;

    const agingChance = 0.7;
    const flipChance = 0.05;
</script>

<script>
    import characterSet from '../definitions/charSet';
    import colors from '../definitions/colors';

    // props
    export let x;
    export let y;

    // state
    let char = '';
    let age = 0;
    let color;


    function randomizeChar() {
        char = characterSet.getRandomChar();
    }

    // set new character state (random char, age 0)
    export function draw() {
        randomizeChar();
        age = 0;
    }

    // "age" the character
    export function tick() {
        // if a color is set for this age, apply it
        if (colors[age]) {
            color = colors[age];
        }

        if (agingChance > Math.random()) {
            age++;
        }

        if (flipChance > Math.random()) {
            randomizeChar();
        }
    }

    export function erase() {
        char = '';
    }
</script>

<div style="color:{color}; left:{x*width}px; top:{y*height}px;">
    {char}
</div>

<style>
    div {
        position: absolute;
        text-align: center;
        transform: scaleX(-1);
        font-family: monospace;
        font-size: 24px;

        /* These COULD be inline, but they're the same for every instance so we prefer a single declaration.
        These vars are set by <Matrix>. */
        width: var(--char-width);
        height: var(--char-height);
        line-height: var(--char-height);
    }
</style>