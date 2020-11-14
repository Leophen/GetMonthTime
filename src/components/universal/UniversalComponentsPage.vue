<template>
	<section
		class="components-page"
	>
		<LpSelect
			:options="listData"
			@change="handleChange"
		/>
		<LpSegmentedSelect
			:options="listData"
			@change="handleChange"
		/>
		<LpSwitch
			v-model="state.switchValue"
		/>
		<LpSwitch
			v-model="state.switchValue"
			:width="50"
			size="large"
		/>
		<LpSwitch
			v-model="state.switchValue"
			:width="60"
			size="larger"
		/>
	</section>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@vue/composition-api";
import LpSelect from "./LpSelect.vue";
import { listData } from "./listData";
import LpSegmentedSelect from "./LpSegmentedSelect.vue";
import LpSwitch from "./LpSwitch.vue";

interface PropsItem {
	name: string;
}

export default defineComponent<PropsItem>({
	name: "EdTemplate",
	components: {
		LpSelect,
		LpSegmentedSelect,
		LpSwitch,
	},
	props: {
		name: {
			type: String,
			default: "name",
		},
	},
	setup(props) {
		const state = reactive({
			switchValue: false,
		});

		const handleChange = (val: string) => {
			console.log(val);
		};

		return {
			props,
			state,
			listData,
			handleChange,
		};
	},
});
</script>

<style lang="stylus">
.components-page
	width 1431px
	height 478px
	background linear-gradient(96.37deg, #FFFFFF 0%, #F2F3F4 100%)
	border-radius 20px
	box-shadow inset 20px 20px 60px rgba(24, 39, 75, 0.12), inset -20px -20px 60px #FFFFFF
	position relative
	margin 60px

	.lp-select-container
		position absolute
		left 1100px
		top 80px

	.lp-segmented-select-container
		position absolute
		left 1100px
		top 140px

	.lp-switch-container
		position absolute
		left 1100px
		top 200px

	.lp-switch-container__large
		left 1180px
		top 200px

	.lp-switch-container__larger
		left 1260px
		top 200px
</style>

