<script lang="ts">
  import { onMount } from "svelte";
  import { toSpans } from "./helpers";
  import type { Doc } from "./types";
  import { computePosition } from "@floating-ui/dom";
  import Toolbar from "./Toolbar.svelte";

  export let doc: Doc;
  let container: HTMLElement;
  let toolbarContainer: HTMLElement;
  let toolbar: Toolbar;

  onMount(() => {
    document.addEventListener("selectstart", handleSelectStart);
    return () => {
      document.removeEventListener("selectstart", handleSelectStart);
    };
  });

  function handleSelectStart() {
    toolbarContainer.style.display = "none";
  }

  function handleMouseup(event: MouseEvent) {
    const selection = document.getSelection();
    console.log("mouseup");
    if (
      selection &&
      container.contains(selection.anchorNode) &&
      container.contains(selection.focusNode) &&
      selection.toString().length > 0
    ) {
      const range = selection.getRangeAt(0);
      computePosition(range, toolbarContainer).then(({ x, y }) => {
        Object.assign(toolbarContainer.style, {
          display: "block",
          left: `${x}px`,
          top: `${y}px`,
        });
      });
      toolbar.focusSearch();
    }
  }

  function toHtml(xdoc: Doc): string {
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

<div bind:this={toolbarContainer} class="toolbar">
  <Toolbar bind:this={toolbar} />
</div>

<div bind:this={container} class="container" on:mouseup={handleMouseup}>
  {@html html}
</div>

<style>
  .container {
    white-space: pre-wrap;
    padding: 1rem;
  }

  .toolbar {
    background-color: red;
    width: max-content;
    position: absolute;
    display: none;
    background: var(--gray-2);
    padding: 0.5rem;
    border: var(--border);
    border-radius: var(--radius-md);
  }

  :global(.segment) {
    background-color: var(--gray-6);
  }
</style>
