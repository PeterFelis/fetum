<script>
	import Produkt from '$lib/ProduktKaart.svelte';
	import { supabase } from '../../stores/supabase';
	import settings from '../../stores/instellingen';

	export let data; // data van de serverside load!!

	// op volgorder zetten, server levert gesorteerd aan
	let volgorde = [...data.producten];
	//volgorde.sort((a, b) => parseInt(a.volgnummer) - parseInt(b.volgnummer));
	// categorien maken
	const tijdcat = new Set();
	let cats = volgorde;

	cats.forEach((element) => {
		tijdcat.add(element.categorie);
	});
	let categorien = [...tijdcat];

	$: produkten = volgorde;
	$: cats = categorien;
	$: types = [];
	let typeLijstOpform = [];

	let types = [];
	let produkttype = '';
	let geselecteerdecategorie = $settings.geselecteerdecategorie;

	let editable = false;
	let ingeklapt = false;

	const categorieKeuze = () => {
		let hulp = [];
		produkten.forEach((element) => {
			if (element.categorie == geselecteerdecategorie) hulp.push(element);
		});
		hulp.sort((a, b) => a.prodtypevolg - b.prodtypevolg);
		types = [];
		for (let teller = 0; teller < hulp.length; teller++) types.push(hulp[teller].type);
		hulp = new Set(types);
		types = [...hulp];
	};

	//drag and drop sorteren
	let selected = null;

	function dragOver(e) {
		if (!editable) return;
		if (isBefore(selected, e.target)) {
			e.target.parentNode.insertBefore(selected, e.target);
		} else {
			e.target.parentNode.insertBefore(selected, e.target.nextSibling);
		}
	}

	let opslaan;

	function dragCATEnd() {
		if (!editable) return;
		if (opslaan) clearTimeout(opslaan);
		opslaan = setTimeout(() => aanpassencatVolgnr(), 1000);
		cats = cats;
	}

	function dragTYPEend() {
		if (!editable) return;
		if (opslaan) clearTimeout(opslaan);
		opslaan = setTimeout(() => aanpassentypeVolgnr(), 1000);
	}

	function dragStart(e) {
		if (!editable) return;
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/plain', null);
		selected = e.target;
	}

	function isBefore(el1, el2) {
		if (!editable) return;
		let cur;
		if (el2.parentNode === el1.parentNode) {
			for (cur = el1.previousSibling; cur; cur = cur.previousSibling) {
				if (cur === el2) return true;
			}
		}
		return false;
	}

	let lijst;

	const aanpassencatVolgnr = async () => {
		let cat;
		for (let teller = 0; teller < lijst.childElementCount; teller++) {
			cat = lijst.children[teller].innerHTML.trim();

			const { data, error } = await supabase
				.from('producten')
				.update({ catVolgnr: teller })
				.match({ categorie: cat });
		}
	};

	const aanpassentypeVolgnr = async () => {
		let tijd;
		for (let teller = 0; teller < typeLijstOpform.childElementCount; teller++) {
			tijd = typeLijstOpform.children[teller].innerHTML.trim();

			const { data, error } = await supabase
				.from('producten')
				.update({ prodtypevolg: teller })
				.match({ type: tijd });
		}
	};
</script>

<div class="container mx-auto mt-12">
	editabtle <input type="checkbox" bind:checked={editable} />
	ingeklapt <input type="checkbox" bind:checked={ingeklapt} />
</div>
<div class="container mx-auto flex flex-row">
	<div class="flex flex-col basis-1/4" on:click={() => (produkttype = '')}>
		<div>
			<div>
				<h2 class="font-bold">Categorien</h2>
				<ul class="lijst" bind:this={lijst}>
					{#await cats then cats}
						{#each cats as cat}
							<li
								on:dragstart={dragStart}
								on:dragleave={dragCATEnd}
								on:dragover={dragOver}
								draggable={editable}
								on:click={() => {
									geselecteerdecategorie = cat;
									categorieKeuze();
								}}
							>
								{cat}
							</li>
						{/each}
					{/await}
				</ul>
			</div>
			<div>
				<h2 class="font-bold">Types</h2>
				{#if produkten}
					<ul bind:this={typeLijstOpform}>
						{#each types as type}
							<li
								on:dragstart={dragStart}
								on:dragleave={dragTYPEend}
								on:dragover={dragOver}
								draggable={editable}
								on:click|stopPropagation={() => (produkttype = type)}
							>
								{type}
								<!--categorieKeuze();-->
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		</div>
	</div>

	<div class="basis-3/4">
		<h2 class="font-bold">
			{geselecteerdecategorie}.

			{#if produkttype}
				-->{produkttype}
			{/if}
		</h2>
		{#await produkten then produkten}
			{#each produkten as produkt}
				{#if produkt.categorie == geselecteerdecategorie}
					{#if produkttype == ''}
						<Produkt
							{produkt}
							{editable}
							{ingeklapt}
							on:categorie={(e) => {
								cats[cats.indexOf(geselecteerdecategorie)] = e.detail.text;
								geselecteerdecategorie = e.detail.text;
							}}
							on:typ={(e) => {
								types[types.indexOf(e.detail.text.huidig)] = e.detail.text.nieuw;
								produkttype = e.detail.text.nieuw;
								types = types;
							}}
						/>
					{:else if produkt.type == produkttype}
						<Produkt
							{produkt}
							{editable}
							{ingeklapt}
							on:categorie={(e) => {
								cats[cats.indexOf(geselecteerdecategorie)] = e.detail.text;
								geselecteerdecategorie = e.detail.text;
							}}
							on:typ={(e) => {
								types[types.indexOf(e.detail.text.huidig)] = e.detail.text.nieuw;
								produkttype = e.detail.text.nieuw;
								types = types;
							}}
						/>
					{/if}
				{/if}
			{/each}
		{/await}
	</div>
</div>
