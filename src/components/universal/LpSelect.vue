<template>
	<section class="lp-select-container">
		<el-select
			v-model="state.selectedValue"
			placeholder="请选择"
			popper-class="LpSelect__dropdown"
			class="LpSelect__fold"
			:class="{'LpSelect__unfold':state.ifUnfold}"
			:style="{width:props.width+'px',height:props.height+'px'}"
			@visible-change="switchFold"
			@change="selectChange"
		> 
			<el-option
				v-for="item in state.options"
				:key="item.value"
				:label="item.label"
				:value="item.value"
			/>
		</el-select>
	</section>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@vue/composition-api";
import { listData } from "./listData";

export default defineComponent({
	name: "LpSelect",
	props: {
		options: {
			type: Array,
			default() {
				return [
					{
						value: "s1",
						label: "选项一",
					},
					{
						value: "s2",
						label: "选项二",
					},
					{
						value: "s3",
						label: "选项三",
					},
				];
			},
		},
		selectedValue: {
			type: String,
			default: "",
		},
		width: {
			type: Number,
			default: 250,
		},
		height: {
			type: Number,
			default: 40,
		},
	},
	setup(props, ctx) {
		const state = reactive({
			selectedValue: props.selectedValue,
			options: props.options,
			ifUnfold: false,
		});

		const switchFold = (ifUnfold: boolean) => {
			state.ifUnfold = ifUnfold;
		};

		const selectChange = (val: string) => {
			ctx.emit("change", val);
		};

		return {
			props,
			state,
			listData,
			switchFold,
			selectChange,
		};
	},
});
</script>

<style lang="stylus">
//折叠状态
.LpSelect__fold
	border-radius 10px
	border 1px solid #EDEFF3
	background linear-gradient(145.48deg, #FFFFFF 0%, #EEF0F3 100%)
	box-shadow 20px 20px 60px #CDCDCF, -20px -20px 60px #FFFFFF
	transition all 0.2s ease-out

	.el-input
		height 100%

	.el-input__inner
		border none
		color #484a4f
		font-size 14px
		background transparent
		user-select none
		height 100%

		&::placeholder
			color #484a4f

		&::selection
			background transparent

	.el-select__caret
		color #484a4f !important

	&:active
		box-shadow inset 4px 4px 12px rgba(24, 39, 75, 0.15), inset -4px -4px 12px #FFFFFF
		background linear-gradient(145.48deg, #EEF0F3 0%, #FFFFFF 100%)

//展开状态
.LpSelect__unfold
	box-shadow inset 5px 5px 15px rgba(24, 39, 75, 0.1), inset -5px -5px 15px #FFFFFF
	background linear-gradient(145.48deg, #EEF0F3 0%, #FFFFFF 100%)

.LpSelect__dropdown
	border 1px solid #EDEFF3
	border-radius 10px
	box-shadow 0px 8px 28px -6px rgba(24, 39, 75, 0.06), 0px 18px 88px 14px rgba(24, 39, 75, 0.07)
	background linear-gradient(145.48deg, #FFFFFF 0%, #EEF0F3 100%)

	.el-scrollbar__wrap
		width 100%
		overflow auto
		margin-bottom 0 !important

	.el-select-dropdown__list
		width 100%
		display flex
		flex-direction column
		align-items center
		padding 10px 0

	.el-select-dropdown__item
		width 92%
		cursor default
		border-radius 6px
		user-select none

		&::selection
			background transparent

	.el-select-dropdown__item.selected
		color #484a4f

	.el-select-dropdown__item.hover, .el-select-dropdown__item:hover
		cursor default
		background #edeff3
</style>
