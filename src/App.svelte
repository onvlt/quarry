<script lang="ts">
  import DocList from "./components/DocList.svelte";
  import DocView from "./components/DocView.svelte";
  import SegmentList from "./components/SegmentList.svelte";
  import TagList from "./components/TagList.svelte";
  import { selectedDoc } from "./store";
  import Section from "./ui/Section.svelte";
</script>

<main class="container">
  <div class="tag-pane">
    <Section title="Docs">
      <DocList />
    </Section>
    <Section title="Tags">
      <TagList />
    </Section>
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
    --border-color: var(--gray-5);
  }

  .doc-title {
    grid-area: title;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    padding: 1rem;
  }

  .tag-pane {
    grid-area: sidebar;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .segment-pane {
    grid-area: segments;
  }

  .doc-pane {
    grid-area: doc;
    max-width: 600px;
  }

  .tag-pane,
  .segment-pane {
    border-right: 1px solid var(--border-color);
  }

  .tag-pane,
  .segment-pane,
  .doc-pane {
    padding: 1rem;
  }
</style>
