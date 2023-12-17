<script lang="ts">
  import { toSpans } from "./helpers";
  import { docState } from "./store";
  import TaggingModal from "../tags/TaggingModal.svelte";
  import type { TextRange } from "../segments/types";
  import DocSpan from "./DocSpan.svelte";
  import type { Span } from "./types";

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

  function separateSelectedSpans(selection: TextRange, spans: Array<Span>) {
    return {
      beforeSelection: spans.filter((span) => span.range[1] <= selection[0]),
      selection: spans.filter(
        (span) =>
          span.range[0] >= selection[0] && span.range[1] <= selection[1],
      ),
      afterSelection: spans.filter((span) => span.range[0] >= selection[1]),
    };
  }

  $: spans = toSpans($docState!);
  $: separatedSpans =
    $docState?.mode === "selection" && $docState.selectionRange
      ? separateSelectedSpans($docState.selectionRange, spans)
      : null;
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
  {#if separatedSpans}
    {#each separatedSpans.beforeSelection as span}<DocSpan {span} />{/each}<span
      class="selected"
      >{#each separatedSpans.selection as span}<DocSpan
          {span}
          selected
        />{/each}</span
    >{#each separatedSpans.afterSelection as span}<DocSpan {span} />{/each}
  {:else}
    {#each spans as span}<DocSpan {span} />{/each}
  {/if}
</div>

<style>
  .doc {
    max-width: 600px;
    white-space: pre-wrap;
    padding: 1rem;
  }

  .selected {
    box-decoration-break: clone;
    padding: 0.22em 0;
    border-radius: 0.1em;
    background-color: var(--accent-secondary-10);
    color: black;
  }
</style>
