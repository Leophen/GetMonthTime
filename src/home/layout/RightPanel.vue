<template>
	<div
		class="right-panel--container"
	>
		<header class="right-panel--header">
			<div class="right-panel--header__inner">
				<div class="right-panel--header__top">
					本月累计平均时长：<span class="right-panel--header__time">{{ props.aveTime }} 小时</span>
				</div>
				<div class="right-panel--header__bottom">
					累计总时长：<span class="right-panel--header__time">{{ props.allTime.toFixed(2) }} 小时，距离 A 级还需：{{ props.toAHour.toFixed(2) }} 小时（从今天起每日平均需达到 {{ props.toAEveryDayHour.toFixed(2) }} 小时，相当于 9 点签到，{{ state.aveLeaveHour }}:{{ state.aveLeaveMin }} 点签退）</span>
				</div>
			</div>
		</header>
		<div class="charts-pillar--container">
			<ChartsPillar
				:x-data="state.xDataArr"
				:left-data="state.leftData"
				v-if="state.ifUpdate"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, watch, reactive } from "@vue/composition-api";
import ChartsPillar from "../../components/echarts/ChartsPillar.vue";

export default defineComponent({
	name: "RightPanel",
	components: {
		ChartsPillar,
	},
	props: {
		aveTime: {
			type: Number,
			default: 0,
		},
		allTime: {
			type: Number,
			default: 0,
		},
		toAHour: {
			type: Number,
			default: 0,
		},
		toAEveryDayHour: {
			type: Number,
			default: 0,
		},
		workDayArr: {
			type: Array,
			default() {
				[];
			},
		},
	},
	setup(props) {
		const state = reactive({
			aveLeaveHour: "0",
			aveLeaveMin: "0",
			xDataArr: [],
			leftData: [],
			ifUpdate: true,
		});

		function computeTime() {
			let leaveTime = 9 + props.toAEveryDayHour;
			if (leaveTime > 12 && leaveTime <= 18) {
				leaveTime += 1.5;
			} else if (leaveTime > 18 && leaveTime <= 18 + 40 / 60) {
				leaveTime += 1.5 + 40 / 60;
			}
			const leaveTimeArr = leaveTime.toString().split(".");

			state.aveLeaveHour = leaveTimeArr[0];
			if (leaveTimeArr[1]) {
				state.aveLeaveMin = (Number(0 + "." + leaveTimeArr[1]) * 60).toFixed(0);
			} else {
				state.aveLeaveMin = "00";
			}
		}

		watch(
			() => props.toAEveryDayHour,
			(val) => {
				computeTime();
			},
			{ immediate: true }
		);

		watch(
			() => props.workDayArr,
			(val) => {
				state.xDataArr = [];
				state.leftData = [];
				val.forEach((item) => {
					(state.xDataArr as any).push(item.day + "号");
				});
				const hasWorkDayArr = val.filter((item) => {
					return item.day < new Date().getDate();
				});
				hasWorkDayArr.forEach((item) => {
					(state.leftData as any).push(item.allTime);
				});
				state.ifUpdate = false;
				setTimeout(() => {
					state.ifUpdate = true;
				}, 10);
			},
			{ immediate: true, deep: true }
		);

		return {
			props,
			state,
		};
	},
});
</script>

<style lang="stylus">
.right-panel--container
	width calc(100% - 525px)
	display flex
	flex-direction column
	align-items center

.right-panel--header
	width 100%
	height 120px
	display flex
	align-items center
	color #fff

.right-panel--header__inner
	padding-left 45px

.right-panel--header__top
	font-size 24px
	font-weight bold

.right-panel--header__bottom
	margin-top 8px
	font-size 18px

.right-panel--header__time
	color #ffbe21

.charts-pillar--container
	width calc(100% - 90px)
	padding 0 45px
</style>

