<script lang="ts">
  import { toHtml } from "./helpers";
  import type { Doc } from "./types";
  import { docState } from "../../store";

  export let doc: Doc;
  let self: HTMLElement;

  function handleKeyUp(event: KeyboardEvent) {
    if (event.key === "Enter") {
      const selection = document.getSelection();
      if (
        selection &&
        self.contains(selection.anchorNode) &&
        self.contains(selection.focusNode)
      ) {
        $docState.mode = "tagging";
      }
    }

    if (event.key === "Escape") {
      $docState.mode = "normal";
    }
  }

  $: html = toHtml(doc);
</script>

<svelte:window on:keyup={handleKeyUp} />

<div bind:this={self} class="container">
  {@html html}
</div>

<style>
  .container {
    white-space: pre-wrap;
    padding: 1rem;
  }

  :global(.segment) {
    background-color: var(--gray-6);
  }
</style>
