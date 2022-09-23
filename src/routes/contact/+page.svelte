<svelte:head>
	<title>contact - let's talk | Fetum</title>
</svelte:head>

<div class="grid-2 py8">
	<div>
		<h1 class="groot center">Contact<br />info</h1>
		<h2 class="center">Altijd handig</h2>
	</div>

	<div class="grid-2-col gap1">
		<div class="rechts">Naam</div>
		<div class="links">Fetum bv</div>
		<div class="rechts">Adres</div>
		<div class="links">Grote Waard 36</div>
		<div class="rechts">Postcode</div>
		<div class="links">2675 BX</div>
		<div class="rechts">Plaats</div>
		<div class="links">Honselersdijk</div>
		<div class="rechts">Telefoon:</div>
		<div class="links">+31 (0) 174 769132</div>
		<div class="rechts">Mail</div>
		<div class="links">info@fetum.nl</div>
		<div class="rechts">KvK</div>
		<div class="links">Den Haag 28045481</div>
		<div class="rechts">BTW nummer:</div>
		<div class="links">801462.265.B01</div>
		<div class="rechts">Bank</div>
		<div class="links">NL78 KNAB 0724 8909 47</div>
		<div class="rechts">BIC</div>
		<div class="links">KNABNL2H</div>
	</div>
</div>

<div class="w100 h100">
	<iframe
		class="parentfit "
		title="fetum"
		src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2455.8254131692074!2d4.221463816410517!3d52.010059179720905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5dac3b3643789%3A0x490ecab243450195!2sFetum!5e0!3m2!1sen!2snl!4v1655135966847!5m2!1sen!2snl"
		width="700"
		height="650"
		style="border:0;"
		allowfullscreen="true"
		loading="lazy"
		referrerpolicy="no-referrer-when-downgrade"
	/>
</div>

<button
	on:click={() => {
		console.log('klik');
		info = test();
	}}>test</button
>

{#await info then info}
	--{info}--
{/await}
