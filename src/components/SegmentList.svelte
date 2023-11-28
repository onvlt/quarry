<script lang="ts">
  import { selectedDoc } from "../store";
  import SegmentView from "./SegmentView.svelte";
</script>

{#if $selectedDoc !== null}
  <ul>
    {#each $selectedDoc.segments as segment}
      <SegmentView {segment} doc={$selectedDoc} />
    {/each}
  </ul>
{/if}
