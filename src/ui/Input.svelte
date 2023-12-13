<script lang="ts">
  export let inputElement: HTMLInputElement | undefined;
  export let value: string;
</script>

<input bind:this={inputElement} bind:value {...$$props} />

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
  }
</style>
