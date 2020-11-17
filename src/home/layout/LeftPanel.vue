<template>
	<div
		class="left-panel--container"
	>
		<header class="left-panel--header">
			<div class="left-panel--header__inner">
				<div class="left-panel--header__top">
					{{ new Date().getMonth() + 1 }} 月 {{ new Date().getDate() }} 日
				</div>
				<div class="left-panel--header__bottom">
					OFF OFF WORK
				</div>
			</div>
		</header>
		<el-scrollbar
			class="date-time__scroll"
		>
			<DateTime
				:date-data="dateData"
				@change="changeData"
				v-if="state.ifUpdate"
			/>
		</el-scrollbar>
		<footer class="left-panel--footer">
			<header class="left-panel--footer__top">
				<div
					class="left-panel--footer--button left-panel--footer--button__top"
					@mousedown="openAllTimeSet"
				>
					统一签到签退时间
				</div>
				<div
					class="left-panel--footer--button left-panel--footer--button__top"
					@mousedown="importToday"
				>
					录入当前时间签退
				</div>
			</header>
			<div
				class="left-panel--footer--button left-panel--footer--button__save"
				@mousedown="handleClear"
			>
				计算周六签退时间
			</div>
		</footer>
		<allTimeSetDialog
			v-model="state.allTimeSet"
			@compute="importAllTime"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "@vue/composition-api";
import DateTime from "../../components/DateTime.vue";
import allTimeSetDialog from "../../components/allTimeSetDialog.vue";

export default defineComponent({
	name: "LeftPanel",
	components: {
		DateTime,
		allTimeSetDialog,
	},
	setup(props, ctx) {
		const state = reactive({
			allTimeArr: [],
			allTimeSet: false,
			ifUpdate: true,
		});

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
			const worktimeArr = JSON.parse(
				localStorage.getItem("worktime") as string
			);
			if (worktimeArr) {
				worktimeArr.forEach((item) => {
					dateData.push(item);
				});
			} else {
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
			}
		}

		onMounted(() => {
			getNowM();
		});

		function importToday() {
			const today = new Date().getDate();
			let currentIndex = -1;
			dateData.forEach((item, index) => {
				if (item.day === today) {
					// item.leaveHour = new Date().getHours();
					// item.leaveMin = new Date().getMinutes();
					currentIndex = index;
				}
			});
			if (currentIndex !== -1) {
				// vue3 如何使用 vue.set/this.$set
				ctx.root.$set(
					dateData[currentIndex],
					"leaveHour",
					new Date().getHours().toString()
				);
				ctx.root.$set(
					dateData[currentIndex],
					"leaveMin",
					new Date().getMinutes().toString()
				);
			}
		}

		function importAllTime(come_hour, come_min, leave_hour, leave_min) {
			for (let i = 0; i < dateData.length; i++) {
				ctx.root.$set(dateData[i], "comeHour", come_hour);
				ctx.root.$set(dateData[i], "comeMin", come_min);
				ctx.root.$set(dateData[i], "leaveHour", leave_hour);
				ctx.root.$set(dateData[i], "leaveMin", leave_min);
			}
			state.ifUpdate = false;
			setTimeout(() => {
				state.ifUpdate = true;
			}, 10);
		}

		function changeData(
			index: any,
			comeHour,
			comeMin,
			leaveHour,
			leaveMin,
			todayTime: any
		) {
			ctx.root.$set(dateData[index], "comeHour", comeHour);
			ctx.root.$set(dateData[index], "comeMin", comeMin);
			ctx.root.$set(dateData[index], "leaveHour", leaveHour);
			ctx.root.$set(dateData[index], "leaveMin", leaveMin);
			ctx.root.$set(dateData[index], "allTime", todayTime);
			const worktime = JSON.stringify(dateData);
			localStorage.setItem("worktime", worktime);
			ctx.emit("update");
		}

		function openAllTimeSet() {
			state.allTimeSet = true;
		}

		function handleClear() {
			alert("不知道呀");
		}

		return {
			state,
			dateData,
			importToday,
			importAllTime,
			changeData,
			openAllTimeSet,
			handleClear,
		};
	},
});
</script>

<style lang="stylus">
*
	-ms-overflow-style none
	overflow -moz-scrollbars-none

	&::-webkit-scrollbar
		display none

.date-time__scroll
	width 100%
	height calc(100vh - 340px)

>>>.el-scrollbar__wrap
	overflow-y scroll
	overflow-x hidden

.left-panel--container
	width 525px
	height calc(100vh)
	border-right 2px solid #3f4045

.left-panel--header
	width 100%
	height 120px
	font-size 24px
	color #fff
	font-weight bold
	display flex
	align-items center

.left-panel--header__inner
	padding-left 40px

.left-panel--header__bottom
	margin-top 8px
	font-family Montserrat

.left-panel--footer
	width 100%
	height 220px
	display flex
	flex-direction column
	justify-content center
	align-items center

.left-panel--footer__top
	width 455px
	display flex
	justify-content space-between
	align-items center

.left-panel--footer--button
	width 455px
	height 60px
	border-radius 16px
	display flex
	justify-content center
	align-items center
	color #000
	background #ffbe21
	cursor pointer
	font-weight bold

.left-panel--footer--button__top
	width 47%

.left-panel--footer--button__save
	color #fff
	background #4C73FE
	margin-top 30px
</style>

