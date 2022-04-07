<script>
    export let fontSize;
    export let frameDurationMS;
</script>

<section>
    <h1>Controls</h1>

    <p><input bind:value={fontSize} /></p>
    <p><input bind:value={frameDurationMS} /></p>
</section>

<style>
    section {
        background: #888;
        position: absolute;
        top: 10px;
        left: 10px;

        padding: 10px;
    }
</style>