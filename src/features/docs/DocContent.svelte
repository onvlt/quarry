<script lang="ts">
  import { toSpans } from "./helpers";
  import type { Doc } from "./types";

  export let doc: Doc;

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
