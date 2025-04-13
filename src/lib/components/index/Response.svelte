<script lang="ts">
  import { responseText } from "$lib/stores/response";
  let response: string | null;
  responseText.subscribe((value) => response = value);
</script>

{#if response}
  <p>{response}</p><script lang="ts">
    import { responseText, loading } from '$lib/stores';
    import { onDestroy } from 'svelte';
    let response = '';
    let isLoading = false;
  
    const unsub = responseText.subscribe(val => response = val);
    const unsubLoad = loading.subscribe(val => isLoading = val);
  
    onDestroy(() => {
      unsub();
      unsubLoad();
    });
  </script>
  
  {#if isLoading}
    <div class="animate-pulse text-gray-500">Generating tips...</div>
  {:else if response}
    <div class="whitespace-pre-line">{response}</div>
  {:else}
    <div class="text-gray-400">Submit to see results here.</div>
  {/if}
  
{:else}
  <p>No response yet.</p>
{/if}
