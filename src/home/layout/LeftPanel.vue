<template>
	<div
		class="left-panel--container"
	>
		<header class="left-panel--header">
			<div class="left-panel--header__inner">
				<div class="left-panel--header__top">
					11 月 14 日
				</div>
				<div class="left-panel--header__bottom">
					OFF OFF WORK
				</div>
			</div>
		</header>
		<el-scrollbar class="date-time__scroll">
			<DateTime />
		</el-scrollbar>
		<footer class="left-panel--footer">
			<div class="left-panel--footer--button">
				录入当前签退时间
			</div>
			<div class="left-panel--footer--button left-panel--footer--button__save">
				保存并计算
			</div>
		</footer>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@vue/composition-api";
import DateTime from "../../components/DateTime.vue";

export default defineComponent({
	name: "LeftPanel",
	components: {
		DateTime,
	},
	setup() {
		const state = reactive({
			allMoney: 1234567,
		});
		return {
			state,
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
	border-right 2px solid #6D7278

.left-panel--header
	width 100%
	height 120px
	font-size 24px
	color #fff
	font-weight bold
	display flex
	align-items center
	box-shadow 0 0 0 2px #6D7278

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

.left-panel--footer--button
	width 455px
	height 60px
	border-radius 16px
	display flex
	justify-content center
	align-items center
	color #000
	background-color #FFBE21
	cursor pointer
	font-weight bold

.left-panel--footer--button__save
	color #fff
	background-color #4C73FE
	margin-top 30px
</style>

