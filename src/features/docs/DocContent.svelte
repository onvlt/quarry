<script lang="ts">
  import { toFlattenedSpans } from "./helpers";
  import type { Doc } from "./types";
  import { docState, toNormalMode, toSelectionMode } from "./store";
  import TaggingModal from "../tags/TaggingModal.svelte";
  import InlineTaggingModal from "../tags/InlineTaggingModal.svelte";
  import type { TextRange } from "../segments/types";
  import DocSpan from "./DocSpan.svelte";

  export let doc: Doc;
  let self: HTMLElement;

  function getValidSelection(): TextRange | null {
    const selection = document.getSelection();
    if (
      selection &&
      self.contains(selection.anchorNode) &&
      self.contains(selection.focusNode)
    ) {
      if (
        selection.anchorNode?.parentElement instanceof HTMLSpanElement &&
        selection.focusNode?.parentElement instanceof HTMLSpanElement
      ) {
        const anchorSpanOffset = Number(
          selection.anchorNode.parentElement.dataset.start,
        );
        const focusSpanOffset = Number(
          selection.focusNode.parentElement.dataset.start,
        );

        const selectionRange: TextRange = [
          selection.anchorOffset + anchorSpanOffset,
          selection.focusOffset + focusSpanOffset,
        ];

        return selectionRange;
      }
    }
    return null;
  }

  function handleKeyUp(event: KeyboardEvent) {
    if (event.key === "Enter") {
      const selectionRange = getValidSelection();
      if (selectionRange) {
        $docState = toSelectionMode($docState, selectionRange);
      }
    }

    if (event.key === "Escape") {
      $docState = toNormalMode($docState);
    }
  }

  function handleMouseUp() {
    if ($docState.mode === "selection") {
      const selectionRange = getValidSelection();
      if (selectionRange) {
        $docState = toSelectionMode($docState, selectionRange);
      }
    }
  }

  $: flattenedSpans = toFlattenedSpans(doc, $docState);
  $: console.log($docState);
</script>

<svelte:window on:keyup={handleKeyUp} />

{#if $docState.mode === "selection"}
  <TaggingModal />
{/if}

<div
  class="doc"
  bind:this={self}
  on:mouseup={handleMouseUp}
  role="textbox"
  tabindex="0"
>
  {#each flattenedSpans as span}<DocSpan {span} />{/each}
</div>

<style>
  .doc {
    max-width: 600px;
    white-space: pre-wrap;
    padding: 1rem;
  }
</style>
