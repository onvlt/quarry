<script lang="ts">
  import { toSpans } from "./helpers";
  import { docState } from "./store";
  import type { TextRange } from "../segments/types";
  import DocSpan from "./DocSpan.svelte";
  import type { Span } from "./types";
  import SelectedSpan from "./SelectedSpan.svelte";
  import { textRangeFromSelection } from "./selection-utils";

  let self: HTMLElement;

  function handleKeyUp(event: KeyboardEvent) {
    if (event.key === "Enter") {
      const selection = document.getSelection();

      if (selection) {
        const selectionRange = textRangeFromSelection(selection, self);
        if (selectionRange) {
          selection.removeAllRanges();
          docState.createSegment(selectionRange);
        }
      }
    }

    if (event.key === "Escape") {
      docState.unselectSegment();
    }
  }

  function separateSelectedSpans(selection: TextRange, spans: Array<Span>) {
    return {
      beforeSelection: spans.filter(
        (span) => span.range.end <= selection.start,
      ),
      selection: spans.filter(
        (span) =>
          span.range.start >= selection.start &&
          span.range.end <= selection.end,
      ),
      afterSelection: spans.filter((span) => span.range.start >= selection.end),
    };
  }

  $: spans = toSpans($docState!);
  $: separatedSpans =
    $docState?.mode === "selection"
      ? separateSelectedSpans($docState.selectedSegment.range, spans)
      : null;
</script>

<svelte:window on:keyup={handleKeyUp} />

<div class="doc" bind:this={self} role="textbox" tabindex="0">
  {#if separatedSpans}
    {#each separatedSpans.beforeSelection as span}<DocSpan
        {span}
      />{/each}<SelectedSpan
      >{#each separatedSpans.selection as span}<DocSpan
          isWithinSelection
          {span}
        />{/each}</SelectedSpan
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
    color: var(--gray-11);
  }
</style>
