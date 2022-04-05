<script lang="ts">
    import Character from './Character.svelte';

    // props
    export let x; // column index
    export let height; // # of characters tall
    export let time; // "clock signal" from parent, increments on each frame

    // "constants"
    let trailLength = 30;
    let halfSpeedChance = 0.05;
    let maxStartDistance = height + trailLength; // this gives an even distribution for the start
    let maxRespawnDistance = 10; // get em back sooner on respawn

    // state
    let leadingPosition;
    let trailingPosition;
    let halfSpeed = false;

    // children (bound to `this` in <Children> markup below, see https://svelte.dev/tutorial/bind-this)
    let characters = [];


    // initialize starting positions
    resetPositions(maxStartDistance);

    // "spawn" the position cursors, offscreen with a random offset between [-1..-maxOffset]
    function resetPositions(maxOffset) {
        if (halfSpeedChance > Math.random()) {
            halfSpeed = true;
            maxOffset /= 2; // since we're half the speed, "spawn" at half the distance
        } else {
            halfSpeed = false;
        }
        leadingPosition = Math.min( -1, Math.floor( Math.random() * -maxOffset ) );
        trailingPosition = leadingPosition - trailLength;
    }

    // draw & erase column characters, and "age" characters by calling tick() on them
    function updateCharacters() {
        characters[leadingPosition]?.draw();
        characters[trailingPosition]?.erase();

        // "age" on-screen characters
        for (let i = Math.max(trailingPosition, 0); i < Math.min(leadingPosition + 1, height); i++) {
            characters[i].tick();
        }
    }

    // advance column state to next frame (update characters and positions)
    function tick() {
        updateCharacters();
        leadingPosition++;
        if (trailingPosition++ >= height) {
            resetPositions(maxRespawnDistance);
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

{#each {length: height} as _, y}
    <Character {x} {y} bind:this={characters[y]} />
{/each}