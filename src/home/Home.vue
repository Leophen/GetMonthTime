<template>
	<div
		class="home-page"
	>
		<LeftPanel />
		<RightPanel />
	</div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import LeftPanel from "./layout/LeftPanel.vue";
import RightPanel from "./layout/RightPanel.vue";

export default defineComponent({
	name: "Home",
	components: {
		LeftPanel,
		RightPanel,
	},
	setup() {
		return {};
	},
});
</script>

<style lang="stylus">
.home-page
	display flex
	background #484A4F
</style>

