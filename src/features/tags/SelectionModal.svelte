<script lang="ts">
  import { docState } from "../docs/store";
  import Button from "../../ui/Button.svelte";
  import { fade } from "svelte/transition";
  import Combobox from "../../ui/Combobox.svelte";
  import type { Tag } from "./types";
  import { tags } from "./store";

  let tagInput: Combobox<Tag>;

  $: selectedSegment =
    $docState!.selectedSegmentKey &&
    $docState!.doc.segments.get($docState!.selectedSegmentKey);
  $: selectedTags = selectedSegment?.tags;

  $: {
    if ($docState!.mode === "selection") {
      tagInput?.focus();
    }
  }

  function handleSelect(tag: Tag) {
    docState.toggleTag(tag);
  }

  function handleClose() {
    docState.toNormalMode();
  }
</script>

<div class="container" transition:fade={{ duration: 120 }}>
  <div class="toolbar">
    <Combobox
      bind:this={tagInput}
      items={$tags}
      itemToString={(tag) => tag.name}
      itemActive={(tag) => selectedTags?.has(tag) ?? false}
      onSelect={handleSelect}
    >
      <div slot="item" let:item>
        {item.name}
      </div>
    </Combobox>
    <div class="close">
      <Button on:click={handleClose}>&times;</Button>
    </div>
  </div>
</div>

<style>
  .container {
    padding: 0.5rem 1rem;
    border-bottom: var(--border);
    position: sticky;
    top: 0;
    background-color: var(--gray-1);
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
