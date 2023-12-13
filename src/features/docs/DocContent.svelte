<script lang="ts">
  import { toFlattenedSpans } from "./helpers";
  import type { Doc } from "./types";
  import { docState, toNormalMode, toSelectionMode } from "./store";
  import TaggingModal from "../tags/TaggingModal.svelte";
  import InlineTaggingModal from "../tags/InlineTaggingModal.svelte";
  import type { TextRange } from "../segments/types";

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
        $docState.mode = "selection";

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

          $docState = toSelectionMode($docState, selectionRange);
        }
      }
    }

    if (event.key === "Escape") {
      $docState = toNormalMode($docState);
    }
  }

  $: flattenedSpans = toFlattenedSpans(doc, $docState);
  $: console.log($docState);
</script>

<svelte:window on:keyup={handleKeyUp} />

{#if $docState.mode === "selection"}
  <TaggingModal />
{/if}

<div class="doc" bind:this={self}>
  {#each flattenedSpans as span}<span
      data-start={span.range[0]}
      class:segment={span.segments.length > 0}
      class:selected={span.selected === "mid" || span.selected === "last"}
      >{span.content}</span
    >{#if span.selected === "last"}<InlineTaggingModal />{/if}{/each}
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
