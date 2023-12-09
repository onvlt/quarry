<script lang="ts">
  import DocList from "../components/DocList.svelte";
  import TagList from "../components/TagList.svelte";
  import Section from "../ui/Section.svelte";
</script>

<div class="sidebar">
  <Section title="Docs">
    <DocList />
  </Section>
  <Section title="Tags">
    <TagList />
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
  }
</style>
