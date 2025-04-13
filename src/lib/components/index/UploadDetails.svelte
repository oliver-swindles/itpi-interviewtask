<script>
  import { responseText, loading } from "$lib/stores/response";
  import { Label, Input, Fileupload, Textarea, Button } from "flowbite-svelte";
  
  let fileuploadprops = {
    id: "user_avatar"
  };

  let textareaprops = {
    id: "jobDescription",
    name: "jobDescription",
    label: "Your message",
    rows: 4,
    placeholder: "Leave a comment..."
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    loading.set(true);
    responseText.set("");

    const formData = new FormData(e.target);
    const res = await fetch("/?/_action=default", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    responseText.set(data.response);
    loading.set(false);
  };
</script>

<form on:submit={handleSubmit} class="flex flex-col gap-4">
  <div class="flex">
    <div>
      <Label class="block mb-2">Job Title</Label>
      <Input label="Job Title" id="jobTitle" name="jobTitle" required placeholder="e.g. Software Engineer" minlength="1" maxlength="30" />
    </div>
    <div>
      <Label class="block mb-2">Company</Label>
      <Input label="Company" id="company" name="company" required placeholder="e.g. ISS" minlength="1" maxlength="20" />
    </div>
  </div>
  <div>
    <Label class="pb-2">Upload CV</Label>
    <Fileupload {...fileuploadprops} accept=".pdf" required />
  </div>
  <div>
    <Label class="pb-2">Paste job description</Label>
    <Textarea {...textareaprops} required/>
  </div>
  <Button type="submit">Get application tips &RightArrow;</Button>
</form>