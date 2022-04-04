<script>
	import {width as charWidth, height as charHeight} from './Character.svelte';
	import Column from "./Column.svelte";

	const frameDurationMS = 100;

	let width = Math.floor( innerWidth / charWidth );
	let height = Math.floor( innerHeight / charHeight );
	let time = 0

	function tick() {
		time++;
	}

	setInterval(tick, frameDurationMS);
</script>

{#each {length: width} as _, x}
	<Column {x} {height} {time} />
{/each}

<style>
	:global(body) {
		background: black;
		padding: 0;
	}
</style>