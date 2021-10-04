<script>
	import Keypad from './Keypad.svelte';
	import Display from './Display.svelte';
</script>

<!-- <div class="outer"> -->
	<div class="container">
		<Display/>
		<Keypad/>
	</div>
<!-- </div> -->

<style lang="scss">
	.container {
	border-radius: 14px;
	background: #e0e0e0;
	box-shadow:  20px 20px 60px #bebebe,
				-20px -20px 60px #ffffff;
	padding: 3em;
	margin: 1em;
	width: 100%;
	max-width: 320px;
	}
	@media screen and (max-width: 600px){
		.container {
			padding: 2em 1em;
		}
	}
</style>