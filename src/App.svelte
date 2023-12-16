<script lang="ts">
  import DocView from "./features/docs/DocView.svelte";
  import { docState } from "./features/docs/store";
  import Sidebar from "./ui/Sidebar.svelte";
</script>

<main>
  <Sidebar />
  {#if $docState}
    <DocView />
  {/if}
</main>

<style>
  main {
    display: grid;
    grid-template-columns: 1fr 3fr 2fr;
    grid-template-areas: "sidebar title title" "sidebar doc segments";
    grid-template-rows: 3rem 1fr;
    height: 100vh;
  }
</style>
