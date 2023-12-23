<script lang="ts">
  import DocList from "../features/docs/DocList.svelte";
  import TagList from "../features/tags/TagList.svelte";
  import { tags } from "../features/tags/store";
  import Section from "./Section.svelte";

  export let offsetWindowControls: boolean = false;
</script>

<div class="sidebar" class:sidebar--offset-controls={offsetWindowControls}>
  <Section title="Docs">
    <DocList />
  </Section>
  <Section title="Tags">
    <TagList tags={$tags} />
  </Section>
</div>

<style>
  .sidebar {
    grid-area: sidebar;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    border-right: var(--border);
    padding: 1rem;
    overflow-y: auto;
  }

  .sidebar--offset-controls {
    padding-top: 3rem;
  }
</style>
