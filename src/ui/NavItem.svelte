<script lang="ts">
  export let active: boolean = false;
</script>

<li><button on:click class:active {...$$props}><slot /></button></li>

<style>
  button {
    display: block;
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    padding: 0.25rem 0.5rem;
    margin: 0 -0.5rem;
    transition: background-color 120ms;
  }

  button.active {
    background-color: var(--accent-2);
    font-weight: 500;
    color: var(--accent-11);
  }

  button:hover {
    background-color: var(--accent-3);
  }
</style>
