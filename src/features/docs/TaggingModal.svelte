<script lang="ts">
  import { docState } from "../../store";
  import Button from "../../ui/Button.svelte";
  import Input from "../../ui/Input.svelte";

  let searchInput: HTMLInputElement;
  let tagSearch = "";

  $: {
    if ($docState.mode === "tagging") {
      searchInput.focus();
    }
  }

  function handleClose() {
    $docState.mode = "normal";
  }
</script>

<div class="toolbar">
  <div>
    <Input type="text" bind:inputElement={searchInput} bind:value={tagSearch} />
  </div>
  <div class="close">
    <Button on:click={handleClose}>&times;</Button>
  </div>
</div>

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
