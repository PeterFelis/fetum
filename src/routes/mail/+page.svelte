<script>
</script>

<svelte:head>
	<script src="https://smtpjs.com/v3/smtp.js">
	</script>
</svelte:head>

<button
	on:click|preventDefault={() => {
		Email.send({
			Host: 'smtp.elasticemail.com',
			Username: 'verkoop@fetum.nl',
			Password: '02907A2FFE0EC670ED766A6FF7EA031BC7C2',
			To: 'peter@felis.nl',
			From: 'Verkoop@fetum.nl',
			Subject: 'Sending Email using javascript',
			Body: 'Well that was easy!!'
		}).then(function (message) {
			alert(message);
		});
	}}>verstuur mail</button
>
