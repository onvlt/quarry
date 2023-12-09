<button on:click {...$$props}><slot /></button>

<style>
  button {
    display: block;
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    padding: 0.25rem 0.5rem;
    margin: 0 -0.5rem;
    transition: background-color 120ms;
    color: var(--gray-11);
  }

  button.active {
    background-color: var(--accent-3);
    font-weight: 500;
    color: var(--accent-11);
  }

  button:hover {
    background-color: var(--accent-3);
  }
</style>
