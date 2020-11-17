<template>
	<div
		class="home-page"
	>
		<LeftPanel @update="updateTime" />
		<RightPanel
			:ave-time="state.aveTime"
			:all-time="state.allTime"
			:to-a-hour="state.toAHour"
			:to-a-every-day-hour="state.toAEveryDayHour"
			:work-day-arr="state.workDayArr"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from "@vue/composition-api";
import { filter } from "vue/types/umd";
import LeftPanel from "./layout/LeftPanel.vue";
import RightPanel from "./layout/RightPanel.vue";

export default defineComponent({
	name: "Home",
	components: {
		LeftPanel,
		RightPanel,
	},
	setup() {
		const state = reactive({
			allDayArr: [],
			workDayArr: [],
			allTime: 0,
			aveTime: 0,
			toAHour: 0,
			toAEveryDayHour: 0,
		});

		function computeAllTime(arr) {
			let result = 0;
			for (let i = 0; i < arr.length; i++) {
				if (arr[i].day < new Date().getDate()) {
					result += Number(arr[i].allTime);
				}
			}
			return result;
		}

		function updateTime() {
			state.allDayArr = JSON.parse(localStorage.getItem("worktime") as string);
		}

		watch(
			() => state.allDayArr,
			(val) => {
				// 本月所有工作日
				state.workDayArr = (val as any).filter((item) => {
					return !item.restDay;
				});
				// 本月已工作天数
				const hasWorkDayArr = (val as any).filter((item) => {
					return !item.restDay && item.day < new Date().getDate();
				});
				// 已工作时长
				state.allTime = computeAllTime(state.workDayArr);
				// 平均工时
				state.aveTime = Number(
					(state.allTime / hasWorkDayArr.length).toFixed(2)
				);
				// 距离 A 总工时
				state.toAHour = state.workDayArr.length * 10.2 - state.allTime;
				// 剩余周末/节假日
				const stillRestDayArr = (val as any).filter((item) => {
					return !!item.restDay && item.day >= new Date().getDate();
				});
				// 距离 A 平均工时
				state.toAEveryDayHour =
					state.toAHour /
					(state.allDayArr.length -
						new Date().getDate() +
						1 -
						stillRestDayArr.length);
			},
			{
				immediate: true,
				deep: true,
			}
		);

		return {
			state,
			updateTime,
		};
	},
});
</script>

<style lang="stylus">
*
	cursor default
	user-select none

.home-page
	display flex
	background #484A4F
</style>

