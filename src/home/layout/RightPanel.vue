<template>
	<div
		class="right-panel--container"
	>
		<header class="right-panel--header">
			<div class="right-panel--header__inner">
				<div class="right-panel--header__top">
					本月平均时长：<span class="right-panel--header__time">10.2 小时</span>
				</div>
				<div class="right-panel--header__bottom">
					距离 A 级总时长还需：<span class="right-panel--header__time">28 小时（当月剩余日平均每天需达到 8.3 个小时）</span>
				</div>
			</div>
		</header>
		<div class="charts-pillar--container">
			<ChartsPillar />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import ChartsPillar from "../../components/echarts/ChartsPillar.vue";

export default defineComponent({
	name: "RightPanel",
	components: {
		ChartsPillar,
	},
	setup() {
		return {};
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

