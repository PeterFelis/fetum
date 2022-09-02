<script>
	import Produkt from '$lib/ProduktKaart.svelte';
	import Layout from './+layout.svelte';

	export let data; // data van de serverside load!!
	// op volgorder zetten, server levert op id aan
	let volgorde = [...data.producten];
	volgorde.sort((a, b) => parseInt(a.volgnummer) - parseInt(b.volgnummer));

	// categorien maken
	const tijdcat = new Set();
	let cats = volgorde;

	cats.forEach((element) => {
		tijdcat.add(element.categorie);
	});
	let categorien = [...tijdcat];

	$: produkten = volgorde;
	$: cats = categorien;

	let types = [];
	let produkttype = '';
	let geselecteerdecategorie;
	let editable = false;

	const categorieKeuze = () => {
		let hulp = [];
		produkten.forEach((element) => {
			if (element.categorie == geselecteerdecategorie) hulp.push(element.type);
		});
		hulp = new Set(hulp);
		types = [...hulp];
	};
</script>

<div class="container mx-auto">
	editabtle <input type="checkbox" bind:checked={editable} />
</div>
<div class="container mx-auto flex flex-row">
	<div class="flex flex-col basis-1/4" on:click={() => (produkttype = '')}>
		<div>
			<div>
				<h2 class="font-bold">categorien</h2>
				{#await cats then cats}
					{#each cats as cat}
						<p
							on:click={() => {
								geselecteerdecategorie = cat;
								categorieKeuze();
							}}
						>
							{cat}
						</p>
					{/each}
				{/await}
			</div>
			<div>
				<h2 class="font-bold">types</h2>
				{#if produkten}
					{#each types as type}
						<p on:click|stopPropagation={() => (produkttype = type)}>{type}</p>
					{/each}
				{:else}
					<p>jammer, mislukt</p>
				{/if}
			</div>
		</div>
	</div>

	<div class="basis-3/4">
		<h2 class="font-bold">producten</h2>
		{#await produkten then produkten}
			{#each produkten as produkt}
				{#if produkt.categorie == geselecteerdecategorie}
					{#if produkttype == ''}
						<Produkt
							{produkt}
							{editable}
							on:categorie={(e) => {
								cats[cats.indexOf(geselecteerdecategorie)] = e.detail.text;
								geselecteerdecategorie = e.detail.text;
							}}
						/>
					{:else if produkt.type == produkttype}
						<Produkt
							{produkt}
							{editable}
							on:categorie={(e) => {
								cats[cats.indexOf(geselecteerdecategorie)] = e.detail.text;
								geselecteerdecategorie = e.detail.text;
							}}
						/>
					{/if}
				{/if}
			{/each}
		{/await}
	</div>
</div>
