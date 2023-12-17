<script lang="ts">
  import {
    autoPlacement,
    computePosition,
    inline,
    offset,
  } from "@floating-ui/dom";
  import { docState } from "./store";

  export let selectionSpan: HTMLSpanElement;
  let self: HTMLDivElement;

  docState.subscribe(() => {
    if (self && selectionSpan) {
      computePosition(selectionSpan, self, {
        middleware: [inline(), autoPlacement(), offset(8)],
      }).then(({ x, y }) => {
        Object.assign(self.style, {
          left: `${x}px`,
          top: `${y}px`,
        });
      });
    }
  });
</script>

<div bind:this={self} class="popover">Popover</div>

<style>
  .popover {
    background-color: var(--gray-2);
    border: var(--border);
    padding: 0.75rem 1rem;
    width: max-content;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: var(--radius-md);
  }
</style>
