<template>
	<div id="app"> 
		<Home />
	</div>
</template>

<script>
import Home from "./home/Home.vue";

export default {
	name: "App",
	components: {
		Home,
	},
	data() {
		return {
			visible: false,
		};
	},
	methods: {
		onClick() {
			this.visible = true;
		},
	},
};
</script>

<style lang="stylus">
*
	margin 0
	padding 0
</style>