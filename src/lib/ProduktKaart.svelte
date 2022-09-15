<script>
	// met opladen afbeelding naar bucket
	import { supabase } from '../stores/supabase';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let produkt;

	export let editable = false;
	export let ingeklapt = false;

	let opslaan;

	let afbeelding;
	
	let files;

	let huidigeType = produkt.type;

	const bijwerkenAfbeelding = async () =>{
		let { data, error } = await supabase.storage.from('produkten').upload(files[0].name, files[0]);
		if (error) {
			console.log('bijwerkenAfbeelding->storage afbeelding',error);
			return;
		}

		let result= data;
		produkt.afbeeldingen=result.Key;
		let {data2,error2} = await supabase.from('producten')
		.update({afbeeldingen: [produkt.afbeeldingen] })
		.eq('id', produkt.id);
		if (error2) {
			console.log('bijwerkenAfbeelding-> bijwerken produkt in database',error);
			return
		}
		afbeelding = URL.createObjectURL(files[0]);
	}
		

	const ophalenAfbeelding = async (afbeelding) => {
		let split = afbeelding.split("/");
		const { data, error } = await supabase.storage.from(split[0]).download(split[1]);
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

			dispatch('typ', { text: { huidig: huidigeType, nieuw: produkt.type } });
			huidigeType = produkt.type;
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

<div class="container flex flex-col">
	{#if editable}
		<div class="flex">
			<h2
				class="font-Oswald text-2xl h-10 w-4/5"
				contenteditable="true"
				bind:innerHTML={produkt.model}
				on:keyup={() => {
					if (opslaan) clearTimeout(opslaan);
					opslaan = setTimeout(() => update('model'), 500);
				}}
			/>
			<div class="w-1/5">(model type nummer)</div>
		</div>
	{:else}
		<h2 class="font-Oswald text-2xl h-10 w-fitt">
			{@html produkt.model}
		</h2>
	{/if}

	{#if editable}
		<div class="flex">
			<h3
				class="text-base w-4/5"
				contenteditable="true"
				bind:innerHTML={produkt.headline}
				on:keyup={() => {
					if (opslaan) clearTimeout(opslaan);
					opslaan = setTimeout(() => update('headline'), 500);
				}}
			/>
			<div class="w-1/5">(headline)</div>
		</div>
	{:else}
		<h3>{@html produkt.headline}</h3>
	{/if}

	{#if editable}
		<div class="flex">
			<h3
				title="(categorie)"
				class="text-base w-4/5"
				contenteditable="true"
				bind:innerHTML={produkt.categorie}
				on:keyup={() => {
					if (opslaan) clearTimeout(opslaan);
					opslaan = setTimeout(() => update('categorie'), 500);
				}}
			/>
			<div class="w-1/5">(categorie)</div>
		</div>
	{/if}

	{#if editable}
		<div class="flex">
			<h3
				title="(type)"
				class="text-base w-4/5"
				contenteditable="true"
				bind:innerHTML={produkt.type}
				on:keyup={() => {
					if (opslaan) clearTimeout(opslaan);
					opslaan = setTimeout(() => update('type'), 500);
				}}
			/>
			<div class="w-1/5">(type)</div>
		</div>
	{/if}

	{#if !ingeklapt}
		{#if editable}
			<div class="flex">
				<div
					class="w-4/5"
					contenteditable="true"
					bind:innerHTML={produkt.omschrijving}
					on:keyup={() => {
						if (opslaan) clearTimeout(opslaan);
						opslaan = setTimeout(() => update('omschrijving'), 500);
					}}
				/>
				<div class="w-1/5">(omschrijving)</div>
			</div>
		{:else}
			<div>
				{@html produkt.omschrijving}
			</div>
		{/if}
	{/if}

	{#each produkt.prijzen as prijs}
		{prijs.prijs} - {prijs.aantal}
	{/each}

	{#if afbeelding}
		{#await afbeelding then afbeelding}
			<img src={afbeelding} />
		{/await}
	{/if}

	<input
		type="file"
		bind:files
		on:change={() => {
			bijwerkenAfbeelding();
		}}
		accept="image/*"
	/>
</div>
