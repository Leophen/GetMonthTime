<template>
	<section
		class="day-time--container"
		:class="{'day-time--container__today':state.ifToday}"
	>
		<div
			class="day-time__work-day"
			v-if="props.restDay===''"
		>
			<div class="day-time--day">
				{{ props.day }}号
			</div>
			<!-- 签到时间 -->
			<div class="day-time--input--container">
				<input
					type="text"
					class="day-time--input"
					onfocus="this.select()"
					v-model="state.time_come_hour"
				>
				<div class="day-time--o">
					:
				</div>
				<input
					type="text"
					class="day-time--input"
					onfocus="this.select()"
					v-model="state.time_come_min"
				>
			</div>
			<!-- 签退时间 -->
			<div class="day-time--input--container">
				<input
					type="text"
					class="day-time--input"
					onfocus="this.select()"
					v-model="state.time_leave_hour"
				>
				<div class="day-time--o">
					:
				</div>
				<input
					type="text"
					class="day-time--input"
					onfocus="this.select()"
					v-model="state.time_leave_min"
				>
			</div>
			<div class="day-time--time">
				{{ state.allTime }} 小时
			</div>
		</div>
		<div
			class="day-time__rest-day"
			:class="{'day-time__rest-day__today':state.ifToday}"
			v-else
		>
			<div class="day-time--day">
				{{ props.day }}号
			</div>
			<div class="day-time--tip">
				今天{{ props.restDay }}，不计入在内
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import {
	defineComponent,
	reactive,
	onMounted,
	watch,
} from "@vue/composition-api";

export default defineComponent({
	name: "DayTime",
	props: {
		index: {
			type: Number,
			default: -1,
		},
		day: {
			type: Number,
			default: -1,
		},
		restDay: {
			type: String,
			default: "",
		},
		comeHour: {
			type: Number,
			default: 9,
		},
		comeMin: {
			type: Number,
			default: 0,
		},
		leaveHour: {
			type: Number,
			default: 22,
		},
		leaveMin: {
			type: Number,
			default: 0,
		},
	},
	setup(props, ctx) {
		const state = reactive({
			time_come_hour: "9",
			time_come_min: "00",
			time_leave_hour: "21",
			time_leave_min: "00",
			allTime: "0",
			ifToday: false,
		});

		function computeTime() {
			const comeTime =
				Number(state.time_come_hour) * 60 + Number(state.time_come_min);
			const leaveTime =
				Number(state.time_leave_hour) * 60 + Number(state.time_leave_min);
			// 12:00 ~ 13:30 --> 90min
			// 18:00 ~ 18:40 --> 40min
			let relaxTime = 0;
			if (Number(state.time_leave_hour) <= 12) {
				relaxTime = 0;
			} else if (
				Number(state.time_leave_hour) > 12 &&
				Number(state.time_leave_hour) <= 18
			) {
				relaxTime = 90;
			} else {
				relaxTime = 130;
			}

			const computedTime = (leaveTime - comeTime - relaxTime) / 60;
			state.allTime = computedTime.toFixed(2);
		}

		onMounted(() => {
			const today = new Date().getDate();
			if (props.day === today) {
				state.ifToday = true;
			}

			if (props.restDay === "") {
				state.time_come_hour = props.comeHour.toString();
				if (props.comeMin === 0) {
					state.time_come_min = "00";
				} else {
					state.time_come_min = props.comeMin.toString();
				}
				state.time_leave_hour = props.leaveHour.toString();
				if (props.leaveMin === 0) {
					state.time_leave_min = "00";
				} else {
					state.time_leave_min = props.leaveMin.toString();
				}
				computeTime();
				ctx.emit("change", props.index, state.allTime);
			}
		});

		watch(
			() => state.time_come_hour,
			(newVal, oldVal) => {
				if (isNaN(Number(newVal)) && oldVal) {
					state.time_come_hour = oldVal;
				}
				if (Number(newVal) < 0) {
					state.time_come_hour = "0";
				}
				if (Number(newVal) > 24) {
					state.time_come_hour = "24";
				}
				computeTime();
				ctx.emit("change", props.index, state.allTime);
			}
		);

		watch(
			() => state.time_leave_hour,
			(newVal, oldVal) => {
				if (isNaN(Number(newVal)) && oldVal) {
					state.time_leave_hour = oldVal;
				}
				if (Number(newVal) < 0) {
					state.time_leave_hour = "0";
				}
				if (Number(newVal) > 24) {
					state.time_leave_hour = "24";
				}
				computeTime();
				ctx.emit("change", props.index, state.allTime);
			}
		);

		watch(
			() => state.time_come_min,
			(newVal, oldVal) => {
				if (isNaN(Number(newVal)) && oldVal) {
					state.time_come_min = oldVal;
				}
				if (Number(newVal) === 0) {
					state.time_come_min = "00";
				}
				if (Number(newVal) < 0) {
					state.time_come_min = "00";
				}
				if (Number(newVal) > 59) {
					state.time_come_min = "59";
				}
				computeTime();
				ctx.emit("change", props.index, state.allTime);
			}
		);

		watch(
			() => state.time_leave_min,
			(newVal, oldVal) => {
				if (isNaN(Number(newVal)) && oldVal) {
					state.time_leave_min = oldVal;
				}
				if (Number(newVal) === 0) {
					state.time_come_min = "00";
				}
				if (Number(newVal) < 0) {
					state.time_leave_min = "00";
				}
				if (Number(newVal) > 59) {
					state.time_leave_min = "59";
				}
				computeTime();
				ctx.emit("change", props.index, state.allTime);
			}
		);

		return {
			props,
			state,
			computeTime,
		};
	},
});
</script>

<style lang="stylus">
.day-time--container
	width 100%
	height 70px

.day-time--container__today
	color #ffbe21

	.day-time--day, .day-time--time
		color #ffbe21

.day-time__work-day
	width 100%
	height 100%
	display grid
	grid-template-columns 1fr 1fr 1fr 1fr
	align-items center

.day-time--day
	margin-left 40px

.day-time--day, .day-time--time
	font-size 18px
	font-weight bold
	color #fff
	cursor default

.day-time--input--container
	width 100px
	height 40px
	background linear-gradient(145.48deg, #EEF0F3 0%, #FFFFFF 100%)
	box-shadow inset 10px 10px 30px #CDCDCF, inset -10px -10px 30px #FFFFFF
	border-radius 20px
	display flex
	justify-content center
	align-items center

.day-time--o
	font-size 20px
	font-weight bold
	margin 0 -10px
	margin-top -6px
	color #595b61

.day-time--input
	width 50%
	outline none
	text-align center
	border none
	font-size 18px
	background transparent

	&::selection
		background-color #BAD6FB

.day-time__rest-day
	height 100%
	font-size 18px
	font-weight bold
	color #fff
	display grid
	grid-template-columns 1fr 2fr 0.5fr 0.5fr
	align-items center
	background-color #3f4045

.day-time__rest-day__today
	color #ffbe21
</style>

