<script lang="ts">
  import { toFlattenedSpans } from "./helpers";
  import { docState } from "./store";
  import TaggingModal from "../tags/TaggingModal.svelte";
  import type { TextRange } from "../segments/types";
  import DocSpan from "./DocSpan.svelte";

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
        ].sort((a, b) => a - b) as TextRange;

        return selectionRange;
      }
    }
    return null;
  }

  function handleKeyUp(event: KeyboardEvent) {
    if (event.key === "Enter") {
      const selectionRange = getValidSelection();
      if (selectionRange) {
        docState.toSelectionMode(selectionRange);
      }
    }

    if (event.key === "Escape") {
      docState.toNormalMode();
    }
  }

  function handleMouseUp() {
    if ($docState && $docState.mode === "selection") {
      const selectionRange = getValidSelection();
      if (selectionRange) {
        docState.toSelectionMode(selectionRange);
      }
    }
  }

  $: flattenedSpans = toFlattenedSpans($docState!);
</script>

<svelte:window on:keyup={handleKeyUp} />

{#if $docState && $docState.mode === "selection"}
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
