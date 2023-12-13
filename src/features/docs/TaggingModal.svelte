<script lang="ts">
  import { docState, selectedDoc } from "../../store";
  import { tags } from "../tags/store";
  import Button from "../../ui/Button.svelte";
  import NavItem from "../../ui/NavItem.svelte";
  import NavList from "../../ui/NavList.svelte";
  import { createSegment } from "../segments/helpers";
  import type { Tag } from "../tags/types";

  let searchInput: HTMLInputElement;
  let tagSearch = "";

  $: {
    if ($docState.mode === "tagging") {
      searchInput.focus();
    }
  }

  function assignTag(tag: Tag) {
    if (
      $selectedDoc &&
      $docState.mode === "tagging" &&
      $docState.selectedRange
    ) {
      $selectedDoc.segments = [
        ...$selectedDoc.segments,
        createSegment($selectedDoc, $docState.selectedRange, [tag.id]),
      ];
    }
  }

  function handleClose() {
    $docState.mode = "normal";
  }

  $: filteredTags = $tags.filter((tag) =>
    tag.name.toLowerCase().includes(tagSearch.toLowerCase()),
  );
</script>

<div class="container">
  <div class="toolbar">
    <div>
      <input type="text" bind:this={searchInput} bind:value={tagSearch} />
    </div>
    <div class="close">
      <Button on:click={handleClose}>&times;</Button>
    </div>
  </div>
  <NavList>
    {#each filteredTags as tag}
      <NavItem on:click={() => assignTag(tag)}>{tag.name}</NavItem>
    {/each}
  </NavList>
</div>

<style>
  .container {
    padding: 0.5rem 1rem;
    border-bottom: var(--border);
  }

  .toolbar {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    gap: 1rem;
  }

  .close {
    margin-left: auto;
  }
</style>
