<script>
	import { supabase } from '../stores/supabase';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let produkt;
	export let editable = false;

	let opslaan;

	let afbeelding;
	let nieuweAfbeelding;

	const opladenAfbeelding = async (img) => {
		let { data, error } = await supabase.storage.from('produkten').upload('test.jpg', img, {
			cacheControl: '3600',
			upsert: false
		});
		console.log(data);
		console.log(error);
	};

	$: {
		console.log(nieuweAfbeelding);
		if (nieuweAfbeelding) opladenAfbeelding(URL.createObjectURL(nieuweAfbeelding));
	}

	const ophalenAfbeelding = async (afbeelding) => {
		const { data, error } = await supabase.storage.from('produkten').download(afbeelding);
		if (error) console.log('nee');
		else return URL.createObjectURL(data);
	};

	if (produkt.afbeeldingen) {
		afbeelding = ophalenAfbeelding(produkt.afbeeldingen[0]);
	}

	const update = async (wat) => {
		if (wat == 'model') {
			await supabase.from('producten').update({ model: produkt.model }).eq('id', produkt.id);
			return;
		}
		if (wat == 'headline') {
			await supabase.from('producten').update({ headline: produkt.headline }).eq('id', produkt.id);
			return;
		}
		if (wat == 'omschrijving') {
			await supabase
				.from('producten')
				.update({ omschrijving: produkt.omschrijving })
				.eq('id', produkt.id);
			return;
		}

		if (wat == 'categorie') {
			await supabase
				.from('producten')
				.update({ categorie: produkt.categorie })
				.eq('id', produkt.id);

			dispatch('categorie', { text: produkt.categorie });
			return;
		}

		if (wat == 'type') {
			await supabase.from('producten').update({ type: produkt.type }).eq('id', produkt.id);
			return;
		}
		console.log(wat);
	};

	const onFileSelected = (e) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			avatar = e.target.result;
		};
	};
</script>

<div class="container bg-slate-400">
	{#if editable}
		<h2
			title="(model naam)"
			class="font-Oswald text-2xl h-10 w-fit"
			contenteditable="true"
			bind:innerHTML={produkt.model}
			on:keyup={() => {
				if (opslaan) clearTimeout(opslaan);
				opslaan = setTimeout(() => update('model'), 500);
			}}
		/>
	{:else}
		<h2 class="font-Oswald text-2xl h-10">
			{@html produkt.model}
		</h2>
	{/if}

	{#if editable}
		<h3
			title="(headline)"
			class="text-base w-fit"
			contenteditable="true"
			bind:innerHTML={produkt.headline}
			on:keyup={() => {
				if (opslaan) clearTimeout(opslaan);
				opslaan = setTimeout(() => update('headline'), 500);
			}}
		/>
	{:else}
		<h3>{@html produkt.headline}</h3>
	{/if}

	{#if editable}
		<h3
			title="(categorie)"
			class="text-base w-fit"
			contenteditable="true"
			bind:innerHTML={produkt.categorie}
			on:keyup={() => {
				if (opslaan) clearTimeout(opslaan);
				opslaan = setTimeout(() => update('categorie'), 500);
			}}
		/>
	{/if}

	{#if editable}
		<h3
			title="(type)"
			class="text-base w-fit"
			contenteditable="true"
			bind:innerHTML={produkt.type}
			on:keyup={() => {
				if (opslaan) clearTimeout(opslaan);
				opslaan = setTimeout(() => update('type'), 500);
			}}
		/>
	{/if}

	{#if editable}
		<div
			class="border-solid border-2"
			contenteditable="true"
			bind:innerHTML={produkt.omschrijving}
			on:keyup={() => {
				if (opslaan) clearTimeout(opslaan);
				opslaan = setTimeout(() => update('omschrijving'), 500);
			}}
		/>
	{:else}
		<div class="border-solid border-2">
			{@html produkt.omschrijving}
		</div>
	{/if}

	{#each produkt.prijzen as prijs}
		{prijs.prijs} - {prijs.aantal}
	{/each}

	{#if afbeelding}
		{#await afbeelding then afbeelding}
			<img src={afbeelding} />
		{/await}
	{/if}

	<input type="file" bind:value={nieuweAfbeelding} accept="image/*" />
</div>
