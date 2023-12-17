<script lang="ts">
  import { docState } from "./store";
  import type { Span } from "./types";

  export let span: Span;
  export let selected: boolean = false;

  $: content = $docState!.doc.content.substring(...span.range);
  $: active =
    $docState &&
    $docState.selectedSegmentKey !== null &&
    span.segments.has($docState.selectedSegmentKey);
</script>

<span
  data-start={span.range[0]}
  data-segments={JSON.stringify(Array.from(span.segments))}
  class:segment={span.segments.size > 0}
  class:active
  class:selected>{content}</span
>

<style>
  span {
    box-decoration-break: clone;
    padding: 0.22em 0;
    border-radius: 0.1em;
  }

  :not(.selected).segment {
    background-color: var(--gray-5);
  }

  :not(.selected).active {
    background-color: var(--accent-3);
    color: var(--accent-11);
  }
</style>
