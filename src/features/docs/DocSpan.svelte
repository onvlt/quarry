<script lang="ts">
  import { rangeToTuple } from "../segments/helpers";
  import { docState } from "./store";
  import type { Span } from "./types";

  export let span: Span;
  export let isWithinSelection: boolean = false;

  $: content = $docState!.doc.content.substring(...rangeToTuple(span.range));

  function handleClick() {
    if (!$docState) {
      return;
    }
    if (span.segments.size !== 0) {
      const segmentId = Array.from(span.segments)[0];
      const segment = $docState.doc.segments.get(segmentId);

      if (segment) {
        docState.selectSegment(segment);
      }
    }
  }

  // TODO: fix accesibility
</script>

<span
  on:click={handleClick}
  data-start={span.range.start}
  data-segments={JSON.stringify(Array.from(span.segments))}
  class:segment={span.segments.size > 0}
  class:within-selection={isWithinSelection}>{content}</span
>

<style>
  .segment:not(.within-selection) {
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
    padding: 0.12em 0;
    border-radius: 0.1em;
    background-color: var(--accent-secondary-2);
    border-bottom: 2px solid var(--accent-secondary-6);
  }
</style>
