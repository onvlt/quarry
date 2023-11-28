<script lang="ts">
  import { selectedDoc } from "../store";
</script>

{#if $selectedDoc !== null}
  <ul>
    {#each $selectedDoc.segments as segment}
      <li>{segment.span[0]} – {segment.span[1]}</li>
    {/each}
  </ul>
{/if}
