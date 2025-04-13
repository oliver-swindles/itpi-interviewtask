<script lang="ts">
  import { Label, Input, Textarea, FloatingLabelInput, Helper, Dropzone } from "flowbite-svelte"; // Removed Button import

  let fileuploadprops = {
    id: "cvFile"
  };

  let textareaprops = {
    id: "jobDescription",
    name: "jobDescription",
    label: "Job Description",
    rows: 4,
    placeholder: "Paste the full job description here..."
  };
  
  let value = [];
  const dropHandle = (event) => {
    value = [];
    event.preventDefault();
    if (event.dataTransfer.items) {
      [...event.dataTransfer.items].forEach((item, i) => {
        if (item.kind === 'file') {
          const file = item.getAsFile();
          value.push(file.name);
          value = value;
        }
      });
    } else {
      [...event.dataTransfer.files].forEach((file, i) => {
        value = file.name;
      });
    }
  };

  const handleChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      value.push(files[0].name);
      value = value;
    }
  };

  const showFiles = (files) => {
    if (files.length === 1) return files[0];
    let concat = '';
    files.map((file) => {
      concat += file;
      concat += ',';
      concat += ' ';
    });

    if (concat.length > 40) concat = concat.slice(0, 40);
    concat += '...';
    return concat;
  };
</script>

<div class="grid grid-cols-2 gap-4">
  <div>
    <!-- <FloatingLabelInput style="outlined" id="jobTitle" name="jobTitle" type="text">Job Title</FloatingLabelInput> -->
    <Label for="jobTitle" class="block mb-2">Job Title</Label>
    <Input class="w-full" label="Job Title" id="jobTitle" name="jobTitle" required placeholder="e.g. Junior Front End Developer" minlength="1" maxlength="30" />
  </div>
  <div>
    <!-- <FloatingLabelInput style="outlined" id="company" name="company" type="text">Company</FloatingLabelInput> -->
    <Label for="company" class="block mb-2">Company</Label>
    <Input class="w-full" label="Company" id="company" name="company" required placeholder="e.g. ISS" minlength="1" maxlength="20" />
  </div>
</div>
<div>
  <Label for="cvFile" class="pb-2 block">Upload CV</Label>
  <Dropzone
    id="dropzone"
    name="pdf"
    class="h-36"
    accept=".pdf"
    on:drop={dropHandle}
    on:dragover={(event) => {
      event.preventDefault();
    }}
    on:change={handleChange}>
    <svg aria-hidden="true" class="mb-3 w-10 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
    {#if value.length === 0}
      <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
      <p class="text-xs text-gray-500 dark:text-gray-400">( .pdf )</p>
    {:else}
      <p>{showFiles(value)}</p>
    {/if}
  </Dropzone>
</div>
<div>
  <Label for="jobDescription" class="pb-2 block">Paste job description</Label>
  <Textarea {...textareaprops} required />
</div>