<template>
	<section
		class="dialog--container"
	>
		<el-dialog
			title="周六签退时间计算器"
			:visible.sync="state.visible"
			width="30%"
			top="35vh"
			animation="el-zoom-in-center"
		>
			<div class="dialog--input--container">
				<!-- 签到时间 -->
				<div class="dialog--input--container__item">
					<div class="dialog--input--title">
						请输入你的签到时间
					</div>
					<div class="day-time--input--container">
						<input
							type="text"
							class="day-time--input"
							onfocus="this.select()"
							v-model="state.time_come_hour"
							@focus="inputFocus('comeHour')"
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
							ref="comeMinInput"
						>
					</div>
				</div>
				<!-- 签退时间 -->
				<div class="dialog--need--time__item">
					<div class="dialog--input--title">
						满 4 小时所需签退时间 <span class="time">{{ state.hour4 }}:{{ state.min4 }}</span> <span v-show="!state.time4Get&&!state.no4&&!state.tooEarly">还需待<span class="time"> {{ state.hour4_need }} 小时 {{ state.min4_need }} 分</span></span><span v-show="state.time4Get&&!state.no4&&!state.tooEarly">当前已经够 4 小时了</span><span v-show="state.no4&&!state.tooEarly">今天 4 小时也别想了 ...</span><span v-show="state.tooEarly">你来的太早了 ...</span>
					</div>
				</div>
				<div class="dialog--need--time__item">
					<div class="dialog--input--title">
						满 8 小时所需签退时间 <span class="time">{{ state.hour8 }}:{{ state.min8 }}</span> <span v-show="!state.time8Get&&!state.no8&&!state.tooEarly">还需待<span class="time"> {{ state.hour8_need }} 小时 {{ state.min8_need }} 分</span></span><span v-show="state.time8Get&&!state.no8&&!state.tooEarly">当前已经够 8 小时了</span><span v-show="state.no8&&!state.tooEarly">今天 8 小时就别想了 ...</span><span v-show="state.tooEarly">你来的太早了 ...</span>
					</div>
				</div>
			</div>
			<div
				slot="footer"
				class="dialog-footer"
			>
				<div
					class="dialog-footer-button dialog-footer-button__right"
					@click="ok"
				>
					关 闭
				</div>
			</div>
		</el-dialog>
	</section>
</template>

<script lang="ts">
import {
	defineComponent,
	reactive,
	watch,
	ref,
	onMounted,
} from "@vue/composition-api";

export default defineComponent({
	name: "saturdayDialog",
	props: {
		value: {
			type: Boolean,
			default: false,
		},
	},
	setup(props, ctx) {
		const state = reactive({
			visible: props.value,
			time_come_hour: "9",
			time_come_min: "00",
			hour4: "19",
			min4: "19",
			hour8: "19",
			min8: "19",
			hour4_need: "19",
			min4_need: "19",
			hour8_need: "19",
			min8_need: "19",
			time4Get: false,
			time8Get: false,
			no4: false,
			no8: false,
			tooEarly: false,
		});

		watch(
			() => props.value,
			(val) => {
				state.visible = val;
			},
			{ immediate: true }
		);

		watch(
			() => state.visible,
			(val) => {
				ctx.emit("input", val);
			}
		);

		function computeTime() {
			const comeHour = Number(state.time_come_hour);
			const comeMin = Number(state.time_come_min);
			const comeTime = comeHour * 60 + comeMin;

			let resultHour4 = 0;
			let resultMin4 = 0;
			let resultHour8 = 0;
			let resultMin8 = 0;

			if (comeTime <= 6 * 60 + 30) {
				// < 6:30
				state.tooEarly = true;
			} else if (comeTime > 6 * 60 + 30 && comeTime <= 8 * 60) {
				// 6:30 - 8:00
				resultHour4 = comeHour + 4;
				resultMin4 = comeMin;
				if (comeMin + 30 < 60) {
					resultHour8 = comeHour + 8 + 1;
					resultMin8 = comeMin + 30;
				} else {
					resultHour8 = comeHour + 8 + 2;
					resultMin8 = comeMin - 30;
				}
				state.no4 = false;
				state.no8 = false;
				state.tooEarly = false;
				state.tooEarly = false;
			} else if (comeTime > 8 * 60 && comeTime <= 8 * 60 + 30) {
				// 8:00 - 8:30
				if (comeMin + 30 < 60) {
					resultHour4 = comeHour + 4 + 1;
					resultMin4 = comeMin + 30;
				} else {
					resultHour4 = comeHour + 4 + 2;
					resultMin4 = comeMin - 30;
				}
				if (comeMin + 30 < 60) {
					resultHour8 = comeHour + 8 + 1;
					resultMin8 = comeMin + 30;
				} else {
					resultHour8 = comeHour + 8 + 2;
					resultMin8 = comeMin - 30;
				}
				state.no4 = false;
				state.no8 = false;
				state.tooEarly = false;
			} else if (comeTime > 8 * 60 + 30 && comeTime <= 12 * 60) {
				// 8:30 - 12:00
				if (comeMin + 30 < 60) {
					resultHour4 = comeHour + 4 + 1;
					resultMin4 = comeMin + 30;
				} else {
					resultHour4 = comeHour + 4 + 2;
					resultMin4 = comeMin - 30;
				}
				// 8 小时加上午休
				if (comeMin + 30 < 60) {
					resultHour8 = comeHour + 8 + 1;
					resultMin8 = comeMin + 30;
				} else {
					resultHour8 = comeHour + 8 + 2;
					resultMin8 = comeMin - 30;
				}
				// 8 小时加上晚餐
				if (resultMin8 + 40 < 60) {
					resultMin8 += 40;
				} else {
					resultHour8 += 1;
					resultMin8 -= 20;
				}
				state.no4 = false;
				state.no8 = false;
				state.tooEarly = false;
			} else if (comeTime > 12 * 60 && comeTime <= 13 * 60 + 30) {
				// 12:00 - 13:30
				resultHour4 = 17;
				resultMin4 = 30;
				resultHour8 = 22;
				resultMin8 = 10;
				state.no4 = false;
				state.no8 = false;
				state.tooEarly = false;
			} else if (comeTime > 13 * 60 + 30 && comeTime < 14 * 60) {
				// 13:30 - 14:00
				resultHour4 = comeHour + 4;
				resultMin4 = comeMin;
				resultHour8 = 22;
				resultMin8 = comeMin - 20;
				state.no4 = false;
				state.no8 = false;
				state.tooEarly = false;
			} else if (comeTime >= 14 * 60 && comeTime <= 15 * 60 + 20) {
				// 14:00 - 15:20
				if (comeMin + 40 < 60) {
					resultHour4 = comeHour + 4;
					resultMin4 = comeMin + 40;
				} else {
					resultHour4 = comeHour + 4 + 1;
					resultMin4 = comeMin - 20;
				}
				if (comeMin + 40 < 60) {
					resultHour8 = comeHour + 8;
					resultMin8 = comeMin + 40;
				} else {
					resultHour8 = comeHour + 8 + 1;
					resultMin8 = comeMin - 20;
				}
				state.no4 = false;
				state.no8 = false;
				state.tooEarly = false;
			} else if (comeTime > 15 * 60 + 20 && comeTime <= 18 * 60) {
				// 15:20 - 18:00
				if (comeMin + 40 < 60) {
					resultHour4 = comeHour + 4;
					resultMin4 = comeMin + 40;
				} else {
					resultHour4 = comeHour + 4 + 1;
					resultMin4 = comeMin - 20;
				}
				state.no4 = false;
				state.no8 = true;
				state.tooEarly = false;
			} else if (comeTime > 18 * 60 && comeTime <= 18 * 60 + 40) {
				// 18:00 - 18:40
				resultHour4 = 22;
				resultMin4 = 40;
				state.no4 = false;
				state.no8 = true;
				state.tooEarly = false;
			} else if (comeTime > 18 * 60 + 40 && comeTime <= 20 * 60) {
				// 18:40 - 20:00
				resultHour4 = comeHour + 4;
				resultMin4 = comeMin;
				state.no4 = false;
				state.no8 = true;
				state.tooEarly = false;
			} else {
				state.no4 = true;
				state.no8 = true;
				state.tooEarly = false;
			}

			if (resultHour4 === 0) {
				state.hour4 = "00";
			} else {
				state.hour4 = resultHour4.toString();
			}
			if (resultMin4 === 0) {
				state.min4 = "00";
			} else if (resultMin4 >= 1 && resultMin4 <= 9) {
				state.min4 = "0" + resultMin4.toString();
			} else {
				state.min4 = resultMin4.toString();
			}
			if (resultHour8 === 0) {
				state.hour8 = "00";
			} else {
				state.hour8 = resultHour8.toString();
			}
			if (resultMin8 === 0) {
				state.min8 = "00";
			} else if (resultMin8 >= 1 && resultMin8 <= 9) {
				state.min8 = "0" + resultMin8.toString();
			} else {
				state.min8 = resultMin8.toString();
			}
		}

		watch(
			() => state.time_come_hour,
			(val) => {
				computeTime();
			},
			{
				immediate: true,
			}
		);

		watch(
			() => state.time_come_min,
			(val) => {
				computeTime();
			},
			{
				immediate: true,
			}
		);

		onMounted(() => {
			setInterval(() => {
				const currentHour = new Date().getHours();
				const currentMin = new Date().getMinutes();
				const currentSecond = new Date().getSeconds();

				const need4 =
					Number(state.hour4) * 60 * 60 +
					Number(state.min4) * 60 -
					currentHour * 60 * 60 -
					currentMin * 60 -
					currentSecond;
				const need8 =
					Number(state.hour8) * 60 * 60 +
					Number(state.min8) * 60 -
					currentHour * 60 * 60 -
					currentMin * 60 -
					currentSecond;

				if (need4 > 0) {
					state.hour4_need = (need4 / 3600).toString().split(".")[0];
					state.min4_need = (
						Number("0" + "." + (need4 / 3600).toString().split(".")[1]) * 60
					).toFixed(0);
					state.time4Get = false;
				} else {
					state.time4Get = true;
				}
				if (need8 > 0) {
					state.hour8_need = (need8 / 3600).toString().split(".")[0];
					state.min8_need = (
						Number("0" + "." + (need8 / 3600).toString().split(".")[1]) * 60
					).toFixed(0);
					state.time8Get = false;
				} else {
					state.time8Get = true;
				}
			}, 1000);
		});

		const comeHourInput = ref({} as unknown);
		const comeMinInput = ref({} as unknown);
		function focusKeydown(event) {
			if (event.keyCode === 13) {
				(comeHourInput.value as HTMLElement).blur();
				(comeMinInput.value as HTMLElement).blur();
				window.removeEventListener("keydown", focusKeydown);
			}
		}

		function inputFocus(focusInput) {
			window.addEventListener("keydown", focusKeydown);
		}

		function ok() {
			state.visible = false;
		}

		return {
			props,
			state,
			comeHourInput,
			comeMinInput,
			focusKeydown,
			inputFocus,
			ok,
		};
	},
});
</script>

<style lang="stylus">
.el-dialog
	border-radius 20px
	background #3f4045
	box-shadow 0px 8px 28px -6px rgba(24, 39, 75, 0.12), 0px 18px 88px 14px rgba(24, 39, 75, 0.14)

.el-dialog__header
	padding-top 15px

.el-dialog__title
	font-weight bold
	color #fff

.el-dialog__headerbtn:hover .el-dialog__close
	color #909399
	cursor pointer

.el-dialog__body
	padding 0 20px
	padding-bottom 10px

.v-modal
	opacity 0.7

.dialog--input--container
	display flex
	flex-direction column
	margin-top 10px

.dialog--input--title
	color #fff
	font-size 16px
	margin-right 30px

	.time
		padding 10px
		margin 0 10px
		border-radius 10px
		background-color #000
		color #ffbe21

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
	transition all 0.2s ease-out

.dialog--input--container__item
	display flex
	align-items center

.dialog--need--time__item
	margin-top 30px

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

.dialog-footer
	display flex
	align-items center
	justify-content flex-end

.dialog-footer-button
	width 100px
	height 40px
	display flex
	justify-content center
	align-items center
	cursor pointer
	font-size 16px
	border-radius 40px

.dialog-footer-button__left
	background-color #fff
	color #000
	margin-right 20px

.dialog-footer-button__right
	background-color #4c73fe
	color #fff
</style>

