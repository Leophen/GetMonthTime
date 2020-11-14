<template>
	<section
		class="lp-switch-container"
		:class="{'lp-switch-container__large':props.size==='large','lp-switch-container__larger':props.size==='larger'}"
	>
		<el-switch
			v-model="state.value"
			:width="props.width"
			@change="handleSwitch"
		/>
	</section>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from "@vue/composition-api";

export default defineComponent({
	name: "LpSwitch",
	props: {
		value: {
			type: Boolean,
			default: false,
		},
		width: {
			type: Number,
			default: 40,
		},
		size: {
			type: String,
			default: "normal",
		},
	},
	setup(props, ctx) {
		const state = reactive({
			value: props.value,
		});

		watch(
			() => props.value,
			val => {
				state.value = val;
			},
		);

		const handleSwitch = (val: boolean) => {
			ctx.emit("input", val);
		};

		return {
			props,
			state,
			handleSwitch,
		};
	},
});
</script>

<style lang="stylus">
.lp-switch-container
	.el-switch__core
		border-color #edeff3
		box-shadow 10px 10px 30px #CDCDCF, -10px -10px 30px #FFFFFF
		background-color transparent
		background linear-gradient(145.48deg, #b6b8bb 0%, #e2e3e4 100%)

		&::after
			width 14px
			height 14px
			top 2px
			left 2px
			box-shadow 0px 0px 4px rgba(0, 0, 0, 0.2), 0px 2px 10px rgba(0, 0, 0, 0.1), -1px 2px 2px rgba(0, 0, 0, 0.08)

	.el-switch.is-checked .el-switch__core
		border-color #edeff3
		background linear-gradient(145.48deg, rgba(91, 77, 190, 0.5) 0%, #5B4DBE 100%)

	.el-switch.is-checked .el-switch__core::after
		margin-left -16px

.lp-switch-container__large
	.el-switch__core
		height 24px
		border-radius 36px

		&::after
			width 17px
			height 17px
			top 2.5px
			left 2.5px

	.el-switch.is-checked .el-switch__core::after
		margin-left -19.5px

.lp-switch-container__larger
	.el-switch__core
		height 28px
		border-radius 40px

		&::after
			width 20px
			height 20px
			top 3px
			left 3px

	.el-switch.is-checked .el-switch__core::after
		margin-left -23px
</style>

