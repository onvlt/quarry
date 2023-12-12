<script lang="ts">
  import { docState } from "../../store";
  import Button from "../../ui/Button.svelte";

  $: console.log($docState);

  function handleClose() {
    $docState.mode = "normal";
  }
</script>

{#if $docState.mode === "tagging"}
  <div class="toolbar">
    <div>Tagging</div>
    <div class="close">
      <Button on:click={handleClose}>&times;</Button>
    </div>
  </div>
{/if}

<style>
  .toolbar {
    padding: 0.5rem 1rem;
    border-bottom: var(--border);
    display: flex;
    flex-shrink: 0;
    align-items: center;
    gap: 1rem;
  }

  .close {
    margin-left: auto;
  }
</style>
