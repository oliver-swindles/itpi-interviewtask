<script>
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
</script>

<Navbar class="shadow-md fixed bg-[#9e2825] text-white">
  <NavBrand href="/">
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">LU CAREERS</span>
  </NavBrand>
  <NavHamburger  />
  <NavUl >
    <NavLi href="https://github.com/oliver-swindles/itpi-interviewtask" target="_blank" class="text-white">Project's GitHub Page</NavLi>
  </NavUl>
</Navbar>