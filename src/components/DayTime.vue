<template>
	<section
		class="day-time--container"
		:class="{'day-time--container__today':state.ifToday,'day-time--container__tomorrow':state.ifTomorrow}"
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
					@focus="inputFocus('comeHour')"
					@blur="inputBlur"
					ref="comeHourInput"
				>
				<div class="day-time--o">
					:
				</div>
				<input
					type="text"
					class="day-time--input"
					onfocus="this.select()"
					v-model="state.time_come_min"
					@focus="inputFocus('comeMin')"
					@blur="inputBlur"
					ref="comeMinInput"
				>
			</div>
			<!-- 签退时间 -->
			<div class="day-time--input--container">
				<input
					type="text"
					class="day-time--input"
					onfocus="this.select()"
					v-model="state.time_leave_hour"
					@focus="inputFocus('leaveHour')"
					@blur="inputBlur"
					ref="leaveHourInput"
				>
				<div class="day-time--o">
					:
				</div>
				<input
					type="text"
					class="day-time--input"
					onfocus="this.select()"
					v-model="state.time_leave_min"
					@focus="inputFocus('leaveMin')"
					@blur="inputBlur"
					ref="leaveMinInput"
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
			<div class="day-time--tip--container">
				<div
					class="day-time--tip"
					:class="{'day-time--tip__tomorrow':state.ifTomorrow}"
				>
					{{ props.restDay }}，不计入工时
				</div>
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
	ref,
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
			type: String,
			default: "8",
		},
		comeMin: {
			type: String,
			default: "55",
		},
		leaveHour: {
			type: String,
			default: "22",
		},
		leaveMin: {
			type: String,
			default: "0",
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
			ifTomorrow: false,
			needUpdate: false,
			focusInput: "comeHour",
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
			} else if (leaveTime > 12 * 60 && leaveTime <= 13 * 60 + 30) {
				relaxTime = leaveTime - 12 * 60;
			} else if (leaveTime > 13 * 60 + 30 && leaveTime <= 18 * 60) {
				relaxTime = 90;
			} else if (leaveTime > 18 * 60 && leaveTime <= 18 * 60 + 40) {
				relaxTime = leaveTime - 18 * 60 + 90;
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
			} else if (props.day > today) {
				state.ifTomorrow = true;
			}

			if (props.restDay === "") {
				state.time_come_hour = props.comeHour.toString();
				if (props.comeMin === "0") {
					state.time_come_min = "00";
				} else {
					state.time_come_min = props.comeMin.toString();
				}
				state.time_leave_hour = props.leaveHour.toString();
				if (props.leaveMin === "0") {
					state.time_leave_min = "00";
				} else {
					state.time_leave_min = props.leaveMin.toString();
				}
				computeTime();
				ctx.emit(
					"change",
					props.index,
					state.time_come_hour,
					state.time_come_min,
					state.time_leave_hour,
					state.time_leave_min,
					state.allTime
				);
			}
		});

		watch(
			() => props.leaveHour,
			(val) => {
				state.time_leave_hour = val;
				computeTime();
				ctx.emit(
					"change",
					props.index,
					state.time_come_hour,
					state.time_come_min,
					state.time_leave_hour,
					state.time_leave_min,
					state.allTime
				);
			}
		);

		watch(
			() => props.leaveMin,
			(val) => {
				state.time_leave_min = val;
				computeTime();
				ctx.emit(
					"change",
					props.index,
					state.time_come_hour,
					state.time_come_min,
					state.time_leave_hour,
					state.time_leave_min,
					state.allTime
				);
			}
		);

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
				state.needUpdate = true;
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
				} else if (Number(newVal) > 24) {
					state.time_leave_hour = "24";
				}
				state.needUpdate = true;
			}
		);

		watch(
			() => state.time_come_min,
			(newVal, oldVal) => {
				if (isNaN(Number(newVal)) && oldVal) {
					state.time_come_min = oldVal;
				} else if (Number(newVal) < 0) {
					state.time_come_min = "00";
				} else if (Number(newVal) > 59) {
					state.time_come_min = "59";
				}
				state.needUpdate = true;
			}
		);

		watch(
			() => state.time_leave_min,
			(newVal, oldVal) => {
				if (isNaN(Number(newVal)) && oldVal) {
					state.time_leave_min = oldVal;
				} else if (Number(newVal) < 0) {
					state.time_leave_min = "00";
				} else if (Number(newVal) > 59) {
					state.time_leave_min = "59";
				}
				state.needUpdate = true;
			}
		);

		function inputBlur() {
			if (state.needUpdate) {
				computeTime();
				if (
					Number(state.time_come_min) > 0 &&
					Number(state.time_come_min) < 10
				) {
					state.time_come_min = "0" + state.time_come_min;
				}
				if (
					Number(state.time_leave_min) > 0 &&
					Number(state.time_leave_min) < 10
				) {
					state.time_leave_min = "0" + state.time_leave_min;
				}
				if (Number(state.time_come_min) === 0) {
					state.time_come_min = "00";
				}
				if (Number(state.time_leave_min) === 0) {
					state.time_leave_min = "00";
				}
				ctx.emit(
					"change",
					props.index,
					state.time_come_hour,
					state.time_come_min,
					state.time_leave_hour,
					state.time_leave_min,
					state.allTime
				);
			}
			state.needUpdate = false;
		}

		const comeHourInput = ref({} as unknown);
		const comeMinInput = ref({} as unknown);
		const leaveHourInput = ref({} as unknown);
		const leaveMinInput = ref({} as unknown);
		function focusKeydown(event) {
			if (event.keyCode === 13) {
				(comeHourInput.value as HTMLElement).blur();
				(comeMinInput.value as HTMLElement).blur();
				(leaveHourInput.value as HTMLElement).blur();
				(leaveMinInput.value as HTMLElement).blur();
				window.removeEventListener("keydown", focusKeydown);
			}
		}

		function inputFocus(focusInput) {
			state.focusInput = focusInput;
			window.addEventListener("keydown", focusKeydown);
		}

		return {
			props,
			state,
			computeTime,
			inputBlur,
			inputFocus,
			comeHourInput,
			comeMinInput,
			leaveHourInput,
			leaveMinInput,
		};
	},
});
</script>

<style lang="stylus">
.day-time--container
	width 100%
	height 70px

.day-time__work-day
	width 100%
	height 100%
	display grid
	grid-template-columns 1fr 1fr 1fr 1fr
	align-items center
	background-color #3f4045

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
	//background linear-gradient(145.48deg, #EEF0F3 0%, #FFFFFF 100%)
	background #595b61
	//box-shadow inset 10px 10px 30px #CDCDCF, inset -10px -10px 30px #FFFFFF
	border-radius 20px
	display flex
	justify-content center
	align-items center

.day-time--o
	font-size 20px
	font-weight bold
	margin 0 -10px
	margin-top -6px
	//color #595b61
	color #fff

.day-time--input
	width 50%
	outline none
	text-align center
	border none
	font-size 18px
	background transparent
	cursor text
	color #fff

	&::selection
		background-color #BAD6FB

.day-time__rest-day
	height 100%
	font-size 18px
	font-weight bold
	color #fff
	display grid
	grid-template-columns 1fr 3fr
	align-items center
	background-color #3f4045

.day-time__rest-day__today
	color #ffbe21

.day-time--tip--container
	width 100%
	height 100%
	display flex
	align-items center

.day-time--tip
	width 90%
	height 40px
	border-radius 50px
	display flex
	justify-content center
	align-items center
	color rgba(255, 255, 255, 0.8)
	background #595b61

.day-time--container__today
	color #ffbe21

	.day-time--day, .day-time--time
		color #ffbe21

.day-time--container__tomorrow
	color rgba(255, 255, 255, 0.2)

	.day-time--day, .day-time--time
		color rgba(255, 255, 255, 0.2)

	.day-time--input--container
		opacity 0.2

.day-time--tip__tomorrow
	color rgba(255, 255, 255, 0.2)
</style>

