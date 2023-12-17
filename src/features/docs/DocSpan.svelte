<script lang="ts">
  import InlineTaggingModal from "../tags/InlineTaggingModal.svelte";
  import { docState } from "./store";
  import type { FlattenedSpan } from "./types";

  export let span: FlattenedSpan;

  $: active =
    $docState &&
    $docState.selectedSegmentKey !== null &&
    span.segments.has($docState.selectedSegmentKey);
</script>

<span
  data-start={span.range[0]}
  class:active
  class:segment={span.segments.size > 0}
  class:selected={span.selected === "mid" || span.selected === "last"}
  >{span.content}</span
>{#if span.selected === "last"}<InlineTaggingModal />{/if}

<style>
  span {
    box-decoration-break: clone;
    padding: 0.22em 0;
    border-radius: 2px;
  }

  .segment {
    background-color: var(--gray-5);
  }

  .active {
    background-color: var(--accent-3);
    color: var(--accent-11);
  }

  .selected {
    background-color: var(--accent-secondary-10);
    color: black;
    z-index: 2;
  }
</style>
