<script lang="ts">
  export let data: { response: string | null };
</script>

<div class="response">
  {#if data.response}
    <div class="response-text">{data.response}</div>
  {:else}
    <p>Loading response...</p>
  {/if}
</div>
