<script>
	import '../app.css';
	import Menu from '$lib/Menu.svelte';
</script>

<svelte:head>
	<title>fetum</title>
</svelte:head>

<div class="font-Roboto overflow-hidden">
	<div class="logo">
		<div class="bg" />
		<img src="../fetumlogo.png" alt="fetum| Hoofdtelefoons" />
		<div class="text-base ">0174 769-132</div>
	</div>
	<Menu />

	<slot />
</div>

<style>
	.logo {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		width: 15vw;
		min-width: 100px;
		height: auto;
		position: absolute;
		right: 5%;
		top: 5%;
	}

	.bg {
		background-color: white;
		opacity: 0.1;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0px;
		left: 0px;
	}
</style>
