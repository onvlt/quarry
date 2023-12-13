<script lang="ts">
  import DocList from "../features/docs/DocList.svelte";
  import TagList from "../features/tags/TagList.svelte";
  import { tags } from "../features/tags/store";
  import Section from "./Section.svelte";
</script>

<div class="sidebar">
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
</style>
