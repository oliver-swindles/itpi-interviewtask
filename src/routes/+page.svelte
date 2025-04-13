<script lang="ts">
  import UploadDetails from "$lib/components/index/UploadDetails.svelte";
  import Response from "$lib/components/index/Response.svelte";
  import { enhance } from "$app/forms";
  import type { ActionResult } from '@sveltejs/kit';
  import { Button } from "flowbite-svelte"; // Import Button here

  let actionResponse: string | null = null;
  let submitting = false;

  const handleSubmit = () => {
    submitting = true;
    actionResponse = null;

    return async ({ result }: { result: ActionResult }) => {
      if (result.type === 'success' && result.data?.response) {
        actionResponse = result.data.response as string;
      } else if (result.type === 'error') {
        console.error("Form action error:", result.error);
        actionResponse = `Error: ${result.error.message || 'Unknown error occurred'}`;
      } else if (result.type === 'failure') {
         console.log("Form action failure:", result.data);
         actionResponse = "Submission failed. Please check your input.";
      }
      submitting = false;
    };
  };

</script>

<div class="grid grid-cols-5 m-4 gap-4">
  <section class="col-span-2 p-4">
    <form method="POST" use:enhance={handleSubmit} class="flex flex-col gap-6" enctype="multipart/form-data">
      <UploadDetails />
      <Button type="submit" disabled={submitting}>
        {#if submitting}
          Submitting...
        {:else}
          Get application tips &RightArrow;
        {/if}
      </Button>
    </form>
  </section>

  <section class="col-span-3 border-l-2 p-4">
    {#if submitting}
      <p>Generating tips...</p>
    {:else if actionResponse}
      <Response data={{ response: actionResponse }} />
    {:else}
      <p>Submit the form on the left to get application tips.</p>
    {/if}
  </section>
</div>