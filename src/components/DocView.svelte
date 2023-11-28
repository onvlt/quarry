<script lang="ts">
  import { selectedDoc } from "../store";
</script>

{#if $selectedDoc}
  <div contenteditable bind:innerHTML={$selectedDoc.content} />
{/if}
