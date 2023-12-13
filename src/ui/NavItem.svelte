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
    transition: background-color 120ms;
    color: var(--gray-11);
    width: 100%;
  }

  button.active {
    background-color: var(--accent-3);
    font-weight: 500;
    color: var(--accent-11);
  }

  button:not(.active):hover {
    background-color: var(--gray-2);
  }
</style>
