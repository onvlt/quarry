<script lang="ts">
  export let active: boolean = false;
  export let size: ButtonSize = "md";

  type ButtonSize = "sm" | "md" | "lg";
</script>

<button on:click class:active class="size-{size}" {...$$props}><slot /></button>

<style>
  button {
    display: block;
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    transition: background-color 120ms;
    color: var(--gray-11);
  }

  button.active {
    background-color: var(--accent-3);
    font-weight: 600;
    color: var(--accent-11);
  }

  button.size-md {
    padding: 0.25rem 0.75rem;
  }

  button:hover {
    background-color: var(--accent-3);
    color: var(--accent-11);
  }
</style>
