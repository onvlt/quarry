<script lang="ts">
  export let focused: boolean = false;
  export let active: boolean = false;
  export let highlighted: boolean = false;
</script>

<li>
  <button
    on:click
    on:mouseenter
    on:mouseleave
    class:focused
    class:active
    class:highlighted
    {...$$props}><slot /></button
  >
</li>

<style>
  button {
    display: block;
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    padding: 0.25rem 0.5rem;
    transition:
      background-color 120ms,
      color 120ms;
    color: var(--gray-11);
    width: 100%;
  }

  button.focused {
    background-color: var(--gray-3);
    color: var(--gray-12);
  }

  button.active {
    background-color: var(--accent-3);
    font-weight: 500;
    color: var(--accent-11);
  }

  button.highlighted {
    background-color: var(--accent-2);
    color: var(--accent-11);
  }

  button:not(.active):hover {
    background-color: var(--gray-3);
  }
</style>
