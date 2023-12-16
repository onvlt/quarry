<script lang="ts">
  import { docState } from "../docs/store";
  import { tags } from "./store";
  import Button from "../../ui/Button.svelte";
  import NavList from "../../ui/NavList.svelte";
  import { createSegment } from "../segments/helpers";
  import type { Tag } from "./types";
  import TagListItem from "./TagListItem.svelte";
  import Input from "../../ui/Input.svelte";
  import { fade } from "svelte/transition";

  let searchInput: HTMLInputElement | undefined;
  let tagSearch = "";

  $: {
    if ($docState!.mode === "selection" && searchInput) {
      searchInput.focus();
    }
  }

  function onTagClick(tag: Tag) {
    docState.toggleTag(tag);
  }

  function handleClose() {
    docState.toNormalMode();
  }

  $: filteredTags = $tags.filter((tag) =>
    tag.name.toLowerCase().includes(tagSearch.toLowerCase()),
  );
</script>

<div class="container" transition:fade={{ duration: 120 }}>
  <div class="toolbar">
    <div class="input-wrapper">
      <Input
        type="text"
        bind:inputElement={searchInput}
        bind:value={tagSearch}
      />
    </div>
    <div class="close">
      <Button on:click={handleClose}>&times;</Button>
    </div>
  </div>
  <NavList>
    {#each filteredTags as tag}
      <TagListItem {tag} on:click={() => onTagClick(tag)} />
    {/each}
  </NavList>
</div>

<style>
  .container {
    padding: 0.5rem 1rem;
    border-bottom: var(--border);
    position: sticky;
    top: 0;
    background-color: var(--gray-1);
  }

  .input-wrapper {
    margin-bottom: 0.25rem;
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
