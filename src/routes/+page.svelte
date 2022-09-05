<svelte:head>
	<title>Hoi! start hier | Fetum</title>
</svelte:head>

<div
	class="h-screen w-screen bg-center bg-contain bg-no-repeat lg:bg-cover"
	style="background-image: url('/afbeeldingen/hp-136.jpg')"
>
	<div class="absolute bottom-0 left-0 w-full h-1/6 flex flex-col justify-center">
		<p class="w-full text-donkergroen text-2xl info text-center px-8">
			Hoofdtelefoons en electronica voor zorg, educatie en iedereen die we van dienst kunnen zijn.
		</p>
	</div>
</div>

<div class="w-full bg-paars">
	<div class="px-16 py-32 mx-auto grid grid-rows-3 md:grid-cols-3 md:grid-rows-1 text-center">
		<div class="relative">
			<div class="svgblob bg-white bg-opacity-20 duration-1000 hover:rotate-180">
				<img
					class="p-8 object-contain duration-1000 hover:-rotate-180"
					src="/afbeeldingen/hp188.png"
					alt="hp-188"
				/>
			</div>
			<h2 class="w-full text-center text-2xl text-heeldonkergroen">Hoofdtelefoons</h2>
		</div>

		<div class="relative">
			<div class="svgblob bg-white bg-opacity-20 duration-1000 hover:rotate-180">
				<img
					class="p-20 object-contain duration-1000 hover:-rotate-180"
					src="/afbeeldingen/hp-32.png"
					alt="hp32"
				/>
			</div>
			<h2 class="w-full text-center text-2xl text-heeldonkergroen">Oortjes</h2>
		</div>

		<div class="relative">
			<div class="svgblob bg-white bg-opacity-20 duration-1000 hover:rotate-180">
				<img
					class="p-6 object-contain duration-1000 hover:-rotate-180"
					src="/afbeeldingen/i40.png"
					alt="i-40"
				/>
			</div>
			<h2 class="w-full text-center text-2xl text-heeldonkergroen">Doosjes</h2>
		</div>
	</div>
</div>

<div class="container text-donker flex mx-auto h50 py-28">
	<div class="text-xl basis-1/2 text-heeldonkergroen gap-4 flex flex-col items-center">
		<h2 class="text-7xl xl:text-9xl font-Valera">Hai!</h2>
		<h2 class="text-4xl">Wij zijn Fetum.</h2>
	</div>
	<div class="basis-1/2 text-heeldonkergroen flex flex-col items-start gap-5 px-20">
		<p class="text-2xl">Wij leveren alles rond de computer op school.</p>
		<p class="text-base">
			De nadruk ligt op hoofdtelefoons en oortjes. Van budgetuitvoeringen voor grootverbruikers in
			de zorg tot op maat gemaakt voor het onderwijs.
		</p>
		<p class="mt-2">We zijn u graag van dienst</p>
		<button class="border text-white bg-paars rounded-lg p-4 mt-16">Wat doen wij allemaal</button>
	</div>
</div>

<svg width="0" height="0">
	<defs>
		<clipPath id="clip" clipPathUnits="objectBoundingBox">
			<path
				transform="scale(0.00049, 0.00049)"
				d="M 1000 2000 C 878.802 2000 767.675 1913.755 681.125 1770.278 C 518.075 1810.828 378.145 1793.33 292.282 1707.467 C 206.434 1621.619 188.927 1481.723 229.45 1318.71 C 86.135 1232.184 0 1121.122 0 1000 C 0 881.453 82.513 772.541 220.39 686.84 C 179.055 522.745 196.297 381.846 282.589 295.554 C 369.652 208.491 512.302 191.717 678.279 234.476 C 765.232 88.152 877.469 0 1000 0 C 1121.3 0 1232.512 86.39 1319.093 230.085 C 1481.527 189.995 1620.886 207.642 1706.496 293.253 C 1792.121 378.878 1809.76 518.272 1769.642 680.742 C 1913.501 767.347 2000 878.623 2000 1000 C 2000 1123.918 1909.842 1237.307 1760.534 1324.663 C 1799.893 1486.112 1782.009 1624.562 1696.803 1709.768 C 1612.399 1794.172 1475.75 1812.515 1316.252 1774.595 C 1230.086 1915.484 1119.978 2000 1000 2000 Z"
				style="fill: rgba(216, 216, 216); stroke: rgba(216, 216, 216);"
			/>
		</clipPath>
	</defs>
</svg>

<div class="w-full">
	<img
		class="h-full object-cover object-center w-full "
		src="/afbeeldingen/muis.png"
		alt="oranje draadloze muis"
	/>
</div>

<style>
	.svgblob {
		clip-path: url(#clip);
		width: 100%;
		height: auto;
	}
</style>
