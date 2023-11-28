<script lang="ts">
  import { tags } from "../store";
</script>

<ul>
  {#each $tags as tag}
    <li style="background-color: {tag.color}">{tag.name}</li>
  {/each}
</ul>
