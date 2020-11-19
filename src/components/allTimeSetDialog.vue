<template>
	<section
		class="dialog--container"
	>
		<el-dialog
			title="统一签到签退时间设置"
			:visible.sync="state.visible"
			width="30%"
			top="35vh"
			animation="el-zoom-in-center"
		>
			<div class="dialog--input--container">
				<!-- 签到时间 -->
				<div class="dialog--input--container__item">
					<div class="dialog--input--title">
						设置所有签到时间为
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
				<div class="dialog--input--container__item">
					<div class="dialog--input--title">
						设置所有签退时间为
					</div>
					<div class="day-time--input--container">
						<input
							type="text"
							class="day-time--input"
							onfocus="this.select()"
							v-model="state.time_leave_hour"
							@focus="inputFocus('leaveHour')"
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
							ref="leaveMinInput"
						>
					</div>
				</div>
			</div>
			<div
				slot="footer"
				class="dialog-footer"
			>
				<div
					class="dialog-footer-button dialog-footer-button__left"
					@click="state.visible = false"
				>
					取 消
				</div>
				<div
					class="dialog-footer-button dialog-footer-button__right"
					@click="ok"
				>
					确 定
				</div>
			</div>
		</el-dialog>
	</section>
</template>

<script lang="ts">
import { defineComponent, reactive, watch, ref } from "@vue/composition-api";

export default defineComponent({
	name: "allTimeSetDialog",
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
			time_leave_hour: "22",
			time_leave_min: "00",
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
			window.addEventListener("keydown", focusKeydown);
		}

		function ok() {
			state.visible = false;
			ctx.emit(
				"compute",
				state.time_come_hour,
				state.time_come_min,
				state.time_leave_hour,
				state.time_leave_min
			);
		}

		return {
			props,
			state,
			comeHourInput,
			comeMinInput,
			leaveHourInput,
			leaveMinInput,
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
	margin-top 10px

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

