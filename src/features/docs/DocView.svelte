<script lang="ts">
  import Button from "../../ui/Button.svelte";
  import DocContent from "./DocContent.svelte";
  import SegmentList from "../segments/SegmentList.svelte";
  import type { Doc } from "./types";
  import { docState } from "./store";

  $: doc = $docState!.doc;
  $: editMode = false;

  function toggleEditMode() {
    editMode = !editMode;
  }
</script>

<div class="title">
  <h2>{doc.title}</h2>
  <Button active={editMode} on:click={toggleEditMode}>Edit</Button>
</div>

<div class="doc-pane">
  <DocContent />
</div>

<div class="segment-pane">
  <SegmentList />
</div>

<style>
  .title {
    grid-area: title;
    border-bottom: var(--border);
    display: flex;
    align-items: center;
    padding: 1rem;
  }

  .doc-pane {
    grid-area: doc;
    overflow-y: auto;
  }

  .segment-pane {
    grid-area: segments;
    border-left: var(--border);
    padding: 1rem;
    overflow-y: auto;
  }
</style>
