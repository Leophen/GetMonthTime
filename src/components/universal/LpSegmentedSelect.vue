<template>
	<section
		class="lp-segmented-select-container"
		:style="{ width:props.width+'px',height:props.height+'px'}"
	>
		<div
			class="lp-segmented-select-option"
			:class="{'lp-segmented-select-option__active':state.selectedValue === item.value}"
			:style="{ width:optionWidth+'px',height:optionHeight+'px'}"
			v-for="(item,index) in props.options"
			:key="item+index"
			@mousedown="clickOption(item.value)"
		>
			{{ item.label }}
		</div>
		<div
			class="lp-segmented-select-option__block"
			v-show="state.selectedValue"
			:style="{ width:optionWidth+'px',height:optionHeight+'px',left:optionBlockLeft+'px'}"
		/>
	</section>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "@vue/composition-api";

export default defineComponent({
	name: "LpSegmentedSelect",
	props: {
		selectedValue: {
			type: String,
			default: "",
		},
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
		});

		const optionWidth = computed(() => {
			return props.width / props.options.length - 12;
		});

		const optionHeight = computed(() => {
			return props.height - 12;
		});

		const selectedIndex = computed(() => {
			for (let i = 0, len = props.options.length; i < len; i++) {
				if (props.options[i].value === state.selectedValue) {
					return i;
				}
			}
			return 0;
		});

		const optionBlockLeft = computed(() => {
			if (selectedIndex.value === 0) {
				return 6;
			} else {
				return 6 + (optionWidth.value + 2 * 6) * selectedIndex.value;
			}
		});

		const clickOption = (val: string) => {
			state.selectedValue = val;
			ctx.emit("change", val);
		};

		return {
			props,
			state,
			optionWidth,
			optionHeight,
			selectedIndex,
			optionBlockLeft,
			clickOption,
		};
	},
});
</script>

<style lang="stylus">
.lp-segmented-select-container
	border-radius 100px
	background linear-gradient(145.48deg, #fff 0%, #eef0f3 100%)
	box-shadow 20px 20px 60px #cdcdcf, -20px -20px 60px #fff
	display flex
	justify-content space-between
	align-items center
	color #484a4f
	font-size 12px
	position relative
	border 1px solid #edeff3

.lp-segmented-select-option
	margin 0 6px
	color #484a4f
	display flex
	justify-content center
	align-items center
	border-radius 100px
	cursor default
	user-select none
	z-index 1
	transition all 0.2s ease-in
	cursor pointer

.lp-segmented-select-option__active
	color #fff

.lp-segmented-select-option__block
	position absolute
	background linear-gradient(145.48deg, rgba(91, 77, 190, 0.5) 0%, #5B4DBE 100%)
	border-radius 100px
	z-index 0
	transition all 0.2s ease-out
</style>

