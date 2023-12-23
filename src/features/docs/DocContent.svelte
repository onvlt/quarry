<script lang="ts">
  import { toSpans } from "./helpers";
  import { docState } from "./store";
  import SelectionModal from "../tags/SelectionModal.svelte";
  import type { TextRange } from "../segments/types";
  import DocSpan from "./DocSpan.svelte";
  import type { Span } from "./types";
  import { rangeFromTuple } from "../segments/helpers";
  import Selection from "./Selection.svelte";

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

        const selectionRange = rangeFromTuple([
          selection.anchorOffset + anchorSpanOffset,
          selection.focusOffset + focusSpanOffset,
        ]);

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
    $docState?.mode === "selection" && $docState.selectionRange
      ? separateSelectedSpans($docState.selectionRange, spans)
      : null;
</script>

<svelte:window on:keyup={handleKeyUp} />

<div
  class="doc"
  bind:this={self}
  on:mouseup={handleMouseUp}
  role="textbox"
  tabindex="0"
>
  {#if separatedSpans}
    {#each separatedSpans.beforeSelection as span}<DocSpan
        {span}
      />{/each}<Selection
      >{#each separatedSpans.selection as span}<DocSpan
          {span}
          selected
        />{/each}</Selection
    >{#each separatedSpans.afterSelection as span}<DocSpan {span} />{/each}
  {:else}
    {#each spans as span}<DocSpan {span} />{/each}
  {/if}
</div>

{#if $docState && $docState.mode === "selection"}
  <SelectionModal />
{/if}

<style>
  .doc {
    max-width: 600px;
    white-space: pre-wrap;
    padding: 1rem;
  }
</style>
