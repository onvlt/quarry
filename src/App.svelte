<script lang="ts">
  import DocView from "./features/docs/DocView.svelte";
  import Sidebar from "./ui/Sidebar.svelte";
  import { selectedDoc } from "./store";
</script>

<main class="container">
  <Sidebar />
  {#if $selectedDoc}
    <DocView doc={$selectedDoc} />
  {/if}
</main>

<style>
  .container {
    display: grid;
    grid-template-columns: 1fr 3fr 2fr;
    height: 100%;
    grid-template-areas: "sidebar title title" "sidebar doc segments";
    grid-template-rows: 3rem 1fr;
  }
</style>
