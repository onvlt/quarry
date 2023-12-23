<script lang="ts" generics="T">
  import NavItem from "./NavItem.svelte";

  import Input from "./Input.svelte";
  import NavList from "./NavList.svelte";

  export let items: Array<T>;
  export let onSelect: ((item: T) => void) | undefined = undefined;
  export let itemToString: (item: T) => string;
  export let itemActive: ((item: T) => boolean) | undefined = undefined;

  let input: HTMLInputElement | undefined;
  let search = "";
  let hasFocus = false;
  let focusedIndex = 0;

  function handleKeyUp(event: KeyboardEvent) {
    if (hasFocus) {
      if (event.key === "ArrowDown") {
        focusedIndex = Math.min(focusedIndex + 1, items.length - 1);
      }
      if (event.key === "ArrowUp") {
        focusedIndex = Math.max(focusedIndex - 1, 0);
      }
      if (event.key === "Enter") {
        handleSelect(items[focusedIndex], focusedIndex);
      }
    }
  }

  function handleSelect(item: T, index: number) {
    onSelect?.(item);
    focusedIndex = index;
  }

  export function focus() {
    input?.focus();
  }

  function handleFocus() {
    hasFocus = true;
  }

  $: filteredItems = items.filter((item) =>
    itemToString(item).toLocaleLowerCase().includes(search.toLocaleLowerCase()),
  );
</script>

<svelte:window on:keyup={handleKeyUp} />

<div>
  <div class="input-wrapper">
    <Input
      type="text"
      bind:inputElement={input}
      bind:value={search}
      on:focus={handleFocus}
    />
  </div>
  <NavList>
    {#each filteredItems as item, index}
      <NavItem
        focused={index === focusedIndex}
        active={itemActive?.(item)}
        on:click={() => handleSelect(item, index)}
      >
        <slot name="item" {item} />
      </NavItem>
    {/each}
  </NavList>
</div>

<style>
  .input-wrapper {
    margin-bottom: 0.5rem;
  }
</style>
