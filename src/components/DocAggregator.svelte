<script lang="ts">
  import type { Doc, Segment } from "../types";

  export let doc: Doc;

  interface Span {
    start: number;
    end: number;
    segments: Array<number>;
  }

  /**
   * Convert array of possibly overlapping segments into array of non-overlapping
   * "spans", which can be easily expressed as HTML spans.
   */
  function toSpans(doc: Doc): Array<Span> {
    let spans: Array<Span> = [];
    let lastIndex = 0;
    const currentSegments = new Set<number>();

    for (let index = 0; index < doc.content.length; index++) {
      for (let segment of doc.segments) {
        const [segmentStart, segmentEnd] = segment.span;
        const segmentIndex = doc.segments.indexOf(segment);
        if (index === segmentStart) {
          spans.push({
            start: lastIndex,
            end: segmentStart,
            segments: Array.from(currentSegments),
          });
          currentSegments.add(segmentIndex);
          lastIndex = segmentStart;
        }
        if (index === segmentEnd) {
          spans.push({
            start: lastIndex,
            end: segmentEnd,
            segments: Array.from(currentSegments),
          });
          currentSegments.delete(segmentIndex);
          lastIndex = segmentEnd;
        }
      }
    }
    if (lastIndex !== doc.content.length - 1) {
      spans.push({
        start: lastIndex,
        end: doc.content.length - 1,
        segments: [],
      });
    }
    return spans;
  }

  function toHtml(doc: Doc): string {
    let string = "";

    for (let span of toSpans(doc)) {
      const content = doc.content.substring(span.start, span.end);
      if (span.segments.length > 0) {
        string += `<span
          class="segment"
          data-segments="${JSON.stringify(span.segments)}"
        >${content}</span>`;
      } else {
        string += content;
      }
    }

    return string;
  }

  $: html = toHtml(doc);
</script>

<div class="container">
  {@html html}
</div>

<style>
  .container {
    white-space: pre-wrap;
    padding: 1rem;
  }

  :global(.segment) {
    background-color: var(--gray-6);
  }
</style>
