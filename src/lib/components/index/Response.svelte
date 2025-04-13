<script lang="ts">
  export let data: { response: string | null };
  import { marked } from "marked";
  $: htmlResponse = data.response ? marked.parse(data.response) : '';
  import { Spinner } from "flowbite-svelte";
</script>

<div class="response">
  {#if data.response}
    <article class="max-w-70ch">
      {@html htmlResponse}
    </article>
  {:else}
    <Spinner />
  {/if}
</div>
