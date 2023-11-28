<script lang="ts">
  import DocList from "./components/DocList.svelte";
  import DocView from "./components/DocView.svelte";
  import SegmentList from "./components/SegmentList.svelte";
  import TagList from "./components/TagList.svelte";
  import { selectedDoc } from "./store";
</script>

<main class="container">
  <div class="tag-pane">
    <section>
      <h2>Docs</h2>
      <DocList />
    </section>
    <section>
      <h2>Tags</h2>
      <TagList />
    </section>
  </div>
  <div class="doc-title">
    <h2>{$selectedDoc?.title ?? ""}</h2>
  </div>
  <div class="segment-pane"><SegmentList /></div>
  <div class="doc-pane"><DocView /></div>
</main>

<style>
  .container {
    display: grid;
    grid-template-columns: 1fr 2fr 3fr;
    height: 100%;
    grid-template-areas: "sidebar title title" "sidebar segments doc";
    grid-template-rows: 3rem 1fr;
  }

  .doc-title {
    grid-area: title;
    border-bottom: 1px solid hsl(0 0% 100% / 20%);
    display: flex;
    align-items: center;
    padding: 1rem;
  }

  .tag-pane {
    grid-area: sidebar;
  }

  .segment-pane {
    grid-area: segments;
  }

  .doc-pane {
    grid-area: doc;
  }

  .tag-pane,
  .segment-pane {
    border-right: 1px solid hsl(0 0% 100% / 20%);
  }

  .tag-pane,
  .segment-pane,
  .doc-pane {
    padding: 1rem;
  }
</style>
