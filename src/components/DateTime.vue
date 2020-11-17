<template>
	<section
		class="date-time--container"
	>
		<DayTime
			v-for="(item,index) in props.dateData"
			:key="item+index"
			:index="index"
			:day="item.day"
			:rest-day="item.restDay"
			:come-hour="item.comeHour"
			:come-min="item.comeMin"
			:leave-hour="item.leaveHour"
			:leave-min="item.leaveMin"
			@change="changeData"
		/>
	</section>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import DayTime from "./DayTime.vue";

export default defineComponent({
	name: "DateTime",
	components: {
		DayTime,
	},
	props: {
		dateData: {
			type: Array,
			default() {
				return [];
			},
		},
	},
	setup(props, ctx) {
		return {
			props,
			changeData(
				index: any,
				comeHour,
				comeMin,
				leaveHour,
				leaveMin,
				todayTime: any
			) {
				ctx.emit(
					"change",
					index,
					comeHour,
					comeMin,
					leaveHour,
					leaveMin,
					todayTime
				);
			},
		};
	},
});
</script>

<style lang="stylus">
.date-time--container
	width 100%
	height calc(100% - 340px)
	background #595B61
	box-shadow inset 10px 10px 30px #484A4F, inset -10px -10px 30px #484A4F, 0 0 0 2px #6D7278
</style>

