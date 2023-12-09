<script lang="ts">
  import type { Doc } from "../types";
  import Button from "../ui/Button.svelte";
  import DocAggregator from "./DocAggregator.svelte";
  import Editor from "./Editor.svelte";

  export let doc: Doc;

  $: editMode = false;

  function toggleEditMode() {
    editMode = !editMode;
  }
</script>

<div class="toolbar">
  <Button active={editMode} on:click={toggleEditMode}>Edit</Button>
</div>

<div>
  {#if editMode}
    <Editor content={doc.content} />
  {:else}
    <DocAggregator {doc} />
  {/if}
</div>

<style>
  .toolbar {
    border-bottom: 1px solid var(--gray-4);
    padding: 0.5rem;
  }
</style>
