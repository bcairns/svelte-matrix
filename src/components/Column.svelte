<script lang="ts">
    import Character from './Character.svelte';
    import CharState from "../types/CharState";

    export let x; // column index
    export let height; // # of characters tall
    export let time; // "clock signal" from parent, increments on each frame

    // "constants"
    let trailLength = 30;
    let halfSpeedChance = 0.05;
    let maxStartDistance = height + trailLength; // this gives an even distribution for the start
    let maxRespawnDistance = 10;

    // state
    let characterStates:CharState[] = getNewCharacterStates(height);
    let leadingPosition;
    let trailingPosition;
    let halfSpeed = false;

    // initialize starting positions
    resetPositions(maxStartDistance);

    // return array of new CharState instances: [new CharState(), new CharState(), ...]
    function getNewCharacterStates(count):CharState[] {
        return Array(count).fill(null, 0, count).map( () => new CharState() );
    }

    // "spawn" the position cursors, offscreen with a random offset between [0..-maxOffset]
    function resetPositions(maxOffset) {
        if (halfSpeedChance > Math.random()) {
            halfSpeed = true;
            maxOffset /= 2; // since we're half the speed, "spawn" at half the distance
        } else {
            halfSpeed = false;
        }
        leadingPosition = Math.floor( Math.random() * -maxOffset );
        trailingPosition = leadingPosition - trailLength;
    }

    // draw & erase column characters, and "age" characters by calling tick() on them
    function updateCharacterStates() {
        // draw leading character
        characterStates[leadingPosition]?.new();

        // erase trailing character
        characterStates[trailingPosition]?.erase();

        // "age" on-screen characters
        for (let i = Math.max(trailingPosition, 0); i < Math.min(leadingPosition + 1, height); i++) {
            characterStates[i].tick();
        }

        // this is a key "Svelte-ism" to know: Svelte only "reacts" to variable assignments
        // (so modifying an object as above will not trigger changes, but we can easily assign-to-self like this after)
        characterStates = characterStates;
    }

    // advance column state to next frame (update positions and character states)
    function tick() {
        leadingPosition++;
        trailingPosition++;

        if (trailingPosition > height) {
            resetPositions(maxRespawnDistance);
        } else {
            updateCharacterStates();
        }
    }

    // executed whenever the value of time changes
    function onTimeChange(time) {
        if (!halfSpeed || time % 2 === 0) {
            tick();
        }
    }

    // $: means "execute this expression when dependent variables have changed"
    $: onTimeChange(time);
</script>

{#each characterStates as state, y}
    <Character {x} {y} char={state.char} color={state.color} />
{/each}