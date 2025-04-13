<script lang="ts">
  import { Label, Input, Fileupload, Textarea } from "flowbite-svelte"; // Removed Button import

  let fileuploadprops = {
    id: "user_avatar"
  };

  let textareaprops = {
    id: "jobDescription",
    name: "jobDescription",
    label: "Job Description",
    rows: 4,
    placeholder: "Paste the full job description here..."
  };
</script>

<div class="grid grid-cols-2 gap-4">
  <div>
    <Label for="jobTitle" class="block mb-2">Job Title</Label>
    <Input class="w-full" label="Job Title" id="jobTitle" name="jobTitle" required placeholder="e.g. Software Engineer" minlength="1" maxlength="30" />
  </div>
  <div>
    <Label for="company" class="block mb-2">Company</Label>
    <Input class="w-full" label="Company" id="company" name="company" required placeholder="e.g. Google" minlength="1" maxlength="20" />
  </div>
</div>
<div>
  <Label for="user_avatar" class="pb-2 block">Upload CV (Optional)</Label>
  <Fileupload {...fileuploadprops} name="cvFile" accept=".pdf" />
</div>
<div>
  <Label for="jobDescription" class="pb-2 block">Paste job description</Label>
  <Textarea {...textareaprops} required />
</div>