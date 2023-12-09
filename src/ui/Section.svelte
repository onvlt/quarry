<script lang="ts">
  export let title: string;
</script>

<section>
  <h2 class="title">{title}</h2>
  <slot />
</section>

<style>
  .title {
    font-weight: 700;
    font-size: var(--font-size-sm);
    margin-bottom: 0.5rem;
  }
</style>
