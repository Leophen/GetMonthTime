<template>
	<section
		class="template"
	/>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
	name: "EdTemplate",
	props: {
		name: {
			type: String,
			default: "name",
		},
	},
	setup(props) {
		return {
			props,
		};
	},
});
</script>

<style lang="stylus"></style>

