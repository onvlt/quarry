<script lang="ts">
  import { rangeToTuple } from "../segments/helpers";
  import { docState } from "./store";
  import type { Span } from "./types";

  export let span: Span;
  export let isWithinSelection: boolean = false;

  $: content = $docState!.doc.content.substring(...rangeToTuple(span.range));
  $: isInteractive = span.segments.size > 0;
  $: isPartOfHoveredSegment =
    $docState?.hoveredSegmentId &&
    span.segments.has($docState.hoveredSegmentId);

  function handleClick() {
    if (!$docState) {
      return;
    }
    if (span.segments.size > 0) {
      const segmentId = Array.from(span.segments)[0];
      const segment = $docState.doc.segments.get(segmentId);

      if (segment) {
        docState.selectSegment(segment);
      }
    }
  }

  function handleMouseOver() {
    $docState!.hoveredSegmentId = Array.from(span.segments)[0];
  }

  function handleMouseLeave() {
    $docState!.hoveredSegmentId = null;
  }

  // TODO: fix accesibility
</script>

<span
  role={isInteractive ? "button" : undefined}
  tabindex={isInteractive ? 0 : undefined}
  on:click={isInteractive ? handleClick : undefined}
  on:mouseover={handleMouseOver}
  on:mouseleave={handleMouseLeave}
  data-start={span.range.start}
  class:hover={isPartOfHoveredSegment}
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
    transition:
      background-color 200ms ease,
      border-color 200ms ease;

    &.hover {
      background-color: var(--accent-secondary-4);
      border-bottom: 2px solid var(--accent-secondary-8);
    }
  }

  [role="button"] {
    cursor: pointer;
  }
</style>
