<script lang="ts">
	import "../app.css";
	import Header from "$lib/components/shared/Header.svelte";

	let { children } = $props();
</script>

<svelte:head>
	<title>Oliver Swindles Task for ITPI Interview</title>
	<meta name="description" content="Student career and job application assistant">
  <meta property="og:type" content="website" />
</svelte:head>

<Header />
{@render children()}
