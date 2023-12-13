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
  span {
    box-decoration-break: clone;
    padding: 0.15em 0;
    border-radius: 2px;
  }

  .segment {
    background-color: var(--gray-5);
  }

  .selected {
    background-color: var(--accent-secondary-10);
    color: black;
    z-index: 2;
  }
</style>
