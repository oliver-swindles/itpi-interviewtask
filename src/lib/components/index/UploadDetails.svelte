<script>
  import { Label, Input, Fileupload, Textarea, Button } from 'flowbite-svelte';
  
  let fileuploadprops = {
    id: 'user_avatar'
  };

  let fileuploadprops2 = {
    id: 'user_avatar2'
  };

  let textareaprops = {
    id: 'message',
    name: 'message',
    label: 'Your message',
    rows: 4,
    placeholder: 'Leave a comment...'
  };
</script>

<form action="" class="flex flex-col gap-4">
  <div class="flex">
    <div>
      <Label class="block mb-2">Job Title</Label>
      <Input label="Job Title" id="job-title" name="job-title" required placeholder="e.g. Software Engineer" minlength="1" maxlength="20" />
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