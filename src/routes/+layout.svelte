<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/shared/Header.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>Oliver Swindles Task for ITPI Interview</title>
	<meta name="description" content="">

  <meta property="og:type" content="website" />
	<meta property="og:description" content="Alison Swindles Jewellery Design sells beautiful handmade jewellery, from necklaces & cufflinks to stunning rings using vibrant vitreous enamel and solid silver." />

	<meta name="twitter:description" content="Alison Swindles Jewellery Design sells beautiful handmade jewellery, from necklaces & cufflinks to stunning rings using vibrant vitreous enamel and solid silver." />
</svelte:head>

<Header />
{@render children()}
