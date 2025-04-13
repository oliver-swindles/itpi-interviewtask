<script lang="ts">
  import UploadDetails from "$lib/components/index/UploadDetails.svelte";
  import Response from "$lib/components/index/Response.svelte";
</script>

<div class="grid grid-cols-5 m-4">
  <section class="col-span-2 p-4">
    <UploadDetails />
  </section>
  <section class="col-span-3 border-l-2 p-4">
    <Response />
  </section>
</div>