<script lang="ts">
  export let inputElement: HTMLInputElement | undefined;
  export let value: string;
</script>

<input on:focus bind:this={inputElement} bind:value {...$$props} />

<style>
  input {
    display: block;
    appearance: none;
    background-color: var(--gray-2);
    padding: 0.25rem 0.75rem;
    border-radius: var(--radius-md);
    color: var(--gray-11);
    border: 1px solid var(--gray-6);
    font-size: var(--font-size-sm);
    transition:
      border-color 120ms,
      box-shadow 120ms;
  }

  input:focus {
    outline: none;
    border-color: var(--gray-12);
    box-shadow: 0 0 0 1px var(--gray-12);
  }
</style>
