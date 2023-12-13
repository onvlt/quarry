<script lang="ts">
  import { toHtml } from "./helpers";
  import type { Doc } from "./types";
  import { docState } from "../../store";
  import TaggingModal from "./TaggingModal.svelte";

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
        $docState.selectedRange = [
          selection.anchorOffset,
          selection.focusOffset,
        ];
      }
    }

    if (event.key === "Escape") {
      $docState.mode = "normal";
    }
  }

  $: html = toHtml(doc, $docState);
  $: console.log($docState.selectedRange);
</script>

<svelte:window on:keyup={handleKeyUp} />

<TaggingModal />

<div class="doc" bind:this={self}>
  {@html html}
</div>

<style>
  .doc {
    max-width: 600px;
    white-space: pre-wrap;
    padding: 1rem;
  }

  :global(.segment) {
    background-color: var(--gray-6);
  }
  :global(.selected) {
    background-color: yellow;
    color: black;
  }
</style>
