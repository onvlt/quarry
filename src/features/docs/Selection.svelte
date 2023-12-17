<script lang="ts">
  export let selectionSpan: HTMLSpanElement;
</script>

<span bind:this={selectionSpan} class="selection"><slot /></span>

<style>
  .selection {
    box-decoration-break: clone;
    padding: 0.22em 0;
    border-radius: 0.1em;
    background-color: var(--accent-secondary-10);
    color: black;
    user-select: none;
  }
</style>
