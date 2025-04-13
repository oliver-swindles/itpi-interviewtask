<script lang="ts">
  import UploadDetails from "$lib/components/index/UploadDetails.svelte";
  import Response from "$lib/components/index/Response.svelte";
  import { enhance } from "$app/forms";
  import type { ActionResult } from '@sveltejs/kit';
  import { Button, Spinner } from "flowbite-svelte"; // Import Button here
  import InterviewImage from "$lib/assets/images/interview.svg";

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

<div class="h-18"></div>
<div class="grid grid-cols-5 gap-4 h-[calc(100svh-4.5rem)]">
  <section class="col-span-2 p-8 flex flex-col m-6 rounded-xl shadow-2xl">
    <form method="POST" use:enhance={handleSubmit} class="flex flex-col gap-6" enctype="multipart/form-data">
      <UploadDetails />
      <Button type="submit" class="cursor-pointer" disabled={submitting}>
        {#if submitting}
          Submitting...
        {:else}
          Get application tips &RightArrow;
        {/if}
      </Button>
    </form>
  </section>

  <section class="col-span-3 p-8">
    {#if submitting}
      <div class="h-full flex flex-col gap-8 items-center justify-center">
        <Spinner class="" size={16} />
        <p>Pressing buttons on big machine... hold tight!</p>
      </div>
    {:else if actionResponse}
      <Response data={{ response: actionResponse }} />
    {:else}
      <div class="h-full flex flex-col items-center justify-center gap-8">
        <img src={InterviewImage} alt="Interview" class="w-36">
        <p>Submit the form on the left to get application tips 😄</p>
      </div>
    {/if}
  </section>
</div>