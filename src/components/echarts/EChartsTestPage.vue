<template>
	<div class="echarts-page">
		<ChartsPillar />
	</div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import ChartsPillar from "./ChartsPillar.vue";

export default defineComponent({
	name: "EChartsTestPage",
	components: {
		ChartsPillar,
	},
});
</script>

<style lang="stylus">
.lp-template
	color #333
	margin 40px 0
</style>
