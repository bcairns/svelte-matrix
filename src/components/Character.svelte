<script context="module">
    export const width = 26;
    export const height = 26;
</script>

<script type="ts">
    import CharState from "../types/CharState";

    export let x;
    export let y;
    export let state: CharState;
</script>

<div style="color:{state.color}; left:{x*width}px; top:{y*height}px">
    {state.char}
</div>

<style>
    div {
        position: absolute;
        width: 35px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        transform: scaleX(-1);
    }
</style>