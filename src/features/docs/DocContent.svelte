<script lang="ts">
  import { toFlattenedSpans } from "./helpers";
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

          $docState.selectedRange = [
            selection.anchorOffset + anchorSpanOffset,
            selection.focusOffset + focusSpanOffset,
          ];
        }
      }
    }

    if (event.key === "Escape") {
      $docState.mode = "normal";
    }
  }

  $: flattenedSpans = toFlattenedSpans(doc, $docState);
</script>

<svelte:window on:keyup={handleKeyUp} />

<TaggingModal />

<div class="doc" bind:this={self}>
  {#each flattenedSpans as span}<span
      data-start={span.range[0]}
      class:segment={span.segments.length > 0}
      class:selected={span.selected}>{span.content}</span
    >{/each}
</div>

<style>
  .doc {
    max-width: 600px;
    white-space: pre-wrap;
    padding: 1rem;
  }

  .segment {
    background-color: var(--gray-9);
  }

  .selected {
    background-color: var(--accent-secondary-10);
    outline: 0.125rem solid var(--accent-secondary-10);
    border-radius: var(--radius-xs);
    color: black;
  }
</style>
