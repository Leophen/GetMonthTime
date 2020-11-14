<template>
	<section
		class="date-time--container"
	>
		<DayTime
			v-for="(item,index) in dateData"
			:key="item+index"
			:day="item.day"
			:rest-day="item.restDay"
			:leave-hour="item.leaveHour"
			:leave-min="item.leaveMin"
		/>
	</section>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "@vue/composition-api";
import DayTime from "./DayTime.vue";

export default defineComponent({
	name: "DateTime",
	components: {
		DayTime,
	},
	props: {
		name: {
			type: String,
			default: "name",
		},
	},
	setup(props) {
		// 筛选日期
		function formatDate(date) {
			date = new Date(date);
			// 月
			const currentMonth = date.getMonth() + 1;
			// 日
			const currentDay = date.getDate();
			// 周几
			let weekDay = date.getDay();

			// 法定节假日/调休
			if (currentMonth === 1 && currentDay === 1) {
				weekDay = -1;
			} else if (currentMonth === 1 && currentDay === 2) {
				weekDay = -1;
			} else if (currentMonth === 1 && currentDay === 3) {
				weekDay = -1;
			} else if (currentMonth === 2 && currentDay === 7) {
				weekDay = 1;
			} else if (currentMonth === 2 && currentDay === 11) {
				weekDay = -2;
			} else if (currentMonth === 2 && currentDay === 12) {
				weekDay = -2;
			} else if (currentMonth === 2 && currentDay === 13) {
				weekDay = -2;
			} else if (currentMonth === 2 && currentDay === 14) {
				weekDay = -2;
			} else if (currentMonth === 2 && currentDay === 15) {
				weekDay = -2;
			} else if (currentMonth === 2 && currentDay === 16) {
				weekDay = -2;
			} else if (currentMonth === 2 && currentDay === 17) {
				weekDay = -2;
			} else if (currentMonth === 2 && currentDay === 20) {
				weekDay = 1;
			} else if (currentMonth === 4 && currentDay === 2) {
				weekDay = -3;
			} else if (currentMonth === 4 && currentDay === 3) {
				weekDay = -3;
			} else if (currentMonth === 4 && currentDay === 4) {
				weekDay = -3;
			} else if (currentMonth === 4 && currentDay === 25) {
				weekDay = 1;
			} else if (currentMonth === 4 && currentDay === 28) {
				weekDay = -4;
			} else if (currentMonth === 4 && currentDay === 29) {
				weekDay = -4;
			} else if (currentMonth === 4 && currentDay === 30) {
				weekDay = -4;
			} else if (currentMonth === 5 && currentDay === 1) {
				weekDay = -4;
			} else if (currentMonth === 5 && currentDay === 2) {
				weekDay = -4;
			} else if (currentMonth === 5 && currentDay === 8) {
				weekDay = 1;
			} else if (currentMonth === 6 && currentDay === 12) {
				weekDay = -5;
			} else if (currentMonth === 6 && currentDay === 13) {
				weekDay = -5;
			} else if (currentMonth === 6 && currentDay === 14) {
				weekDay = -5;
			} else if (currentMonth === 9 && currentDay === 18) {
				weekDay = 1;
			} else if (currentMonth === 9 && currentDay === 19) {
				weekDay = -6;
			} else if (currentMonth === 9 && currentDay === 20) {
				weekDay = -6;
			} else if (currentMonth === 9 && currentDay === 21) {
				weekDay = -6;
			} else if (currentMonth === 9 && currentDay === 26) {
				weekDay = 1;
			} else if (currentMonth === 10 && currentDay === 1) {
				weekDay = -7;
			} else if (currentMonth === 10 && currentDay === 2) {
				weekDay = -7;
			} else if (currentMonth === 10 && currentDay === 3) {
				weekDay = -7;
			} else if (currentMonth === 10 && currentDay === 4) {
				weekDay = -7;
			} else if (currentMonth === 10 && currentDay === 5) {
				weekDay = -7;
			} else if (currentMonth === 10 && currentDay === 6) {
				weekDay = -7;
			} else if (currentMonth === 10 && currentDay === 7) {
				weekDay = -7;
			} else if (currentMonth === 10 && currentDay === 9) {
				weekDay = 1;
			}

			if (weekDay === -1) {
				return [currentDay, "元旦节"];
			} else if (weekDay === -2) {
				return [currentDay, "春节"];
			} else if (weekDay === -3) {
				return [currentDay, "清明节"];
			} else if (weekDay === -4) {
				return [currentDay, "劳动节"];
			} else if (weekDay === -5) {
				return [currentDay, "端午节"];
			} else if (weekDay === -6) {
				return [currentDay, "中秋节"];
			} else if (weekDay === -7) {
				return [currentDay, "国庆节"];
			} else if (weekDay === 0) {
				return [currentDay, "周日"];
			} else if (weekDay === 6) {
				return [currentDay, "周六"];
			} else {
				return [currentDay];
			}
		}

		// 获取当前月的天数
		function mGetDate() {
			const date = new Date();
			const year = date.getFullYear();
			const month = date.getMonth() + 1;
			const d = new Date(year, month, 0);
			return d.getDate();
		}

		const dateData: any = reactive([]);

		// 获取当前月的所有日期
		function getNowM() {
			const now = new Date();
			const current_month_num = mGetDate();
			for (let i = 1; i <= current_month_num; i++) {
				const day = now.setDate(i);
				const everyDayArr = formatDate(day);
				if (everyDayArr.length === 1) {
					dateData.push({ day: everyDayArr[0] });
				} else {
					dateData.push({
						day: everyDayArr[0],
						restDay: everyDayArr[1],
					});
				}
			}
			return dateData;
		}

		onMounted(() => {
			console.log(getNowM());
		});

		return {
			props,
			dateData,
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

