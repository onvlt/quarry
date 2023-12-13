<script lang="ts">
  import InlineTaggingModal from "../tags/InlineTaggingModal.svelte";
  import type { FlattenedSpan } from "./types";

  export let span: FlattenedSpan;
</script>

<span
  data-start={span.range[0]}
  class:segment={span.segments.length > 0}
  class:selected={span.selected === "mid" || span.selected === "last"}
  >{span.content}</span
>{#if span.selected === "last"}<InlineTaggingModal />{/if}

<style>
  .segment {
    background-color: var(--gray-4);
    outline: 0.125rem solid var(--gray-4);
    border-radius: var(--radius-xs);
  }

  .selected {
    background-color: var(--accent-secondary-10);
    outline: 0.125rem solid var(--accent-secondary-10);
    border-radius: var(--radius-xs);
    color: black;
  }
</style>
