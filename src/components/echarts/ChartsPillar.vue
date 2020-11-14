<template>
	<section class="charts-pillar">
		<ECharts
			class="charts-pillar__canvas"
			:option="option"
		/>
	</section>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import echarts from "echarts";
import { createComponent } from "echarts-for-vue";

interface PropsItem {
	name: string;
}

export default defineComponent<PropsItem>({
	name: "ChartsPillar",
	components: {
		ECharts: createComponent({ echarts }),
	},
	props: {
		name: {
			type: String,
			default: "name",
		},
	},
	setup(props) {
		const currentData = {
			xData: [
				"1号",
				"2号",
				"3号",
				"4号",
				"5号",
				"6号",
				"7号",
				"8号",
				"9号",
				"10号",
				"11号",
				"12号",
				"13号",
				"14号",
				"15号",
				"16号",
				"17号",
				"18号",
				"19号",
				"20号",
			],
			leftData: [
				10.8,
				10.8,
				10.8,
				10.8,
				10.8,
				10.8,
				10.8,
				10.8,
				10.8,
				10.8,
				10.8,
				10.8,
				10.8,
				10.8,
				10.8,
				10.8,
				10.8,
				10.8,
				10.8,
				10.8,
				10.8,
				10.8,
			],
			rightData: [
				10.2,
				10.2,
				10.2,
				10.2,
				10.2,
				10.2,
				10.2,
				10.2,
				10.2,
				10.2,
				10.2,
				10.2,
				10.2,
				10.2,
				10.2,
				10.2,
				10.2,
				10.2,
				10.2,
				10.2,
				10.2,
				10.2,
			],
		};

		const option = {
			// 整体布局
			grid: {
				left: "10%",
				right: "10%",
				bottom: "10%",
				top: "40%",
			},
			// 右上角标识
			legend: {
				right: "10%",
				top: "36%",
				itemGap: 16,
				itemWidth: 18,
				itemHeight: 10,
				data: [
					{
						name: "实际时长",
					},
					{
						name: "A级时长",
					},
				],
				textStyle: {
					color: "#fff",
					fontStyle: "normal",
					fontFamily: "微软雅黑",
					fontSize: 12,
					fontWeight: 600,
				},
			},
			// 鼠标悬浮效果
			tooltip: {
				//提示框组件
				trigger: "axis",
				formatter: "{b}<br />{a0}: {c0}<br />{a1}: {c1}",
				axisPointer: {
					type: "shadow",
					label: {
						backgroundColor: "#e6e6e6",
					},
				},
				textStyle: {
					color: "#fff",
					fontStyle: "normal",
					fontFamily: "微软雅黑",
					fontSize: 12,
				},
			},
			// X轴
			xAxis: [
				{
					type: "category",
					data: currentData.xData,
					axisLabel: {
						//坐标轴刻度标签的相关设置。
						margin: 15,
						textStyle: {
							color: "#fff",
							fontStyle: "normal",
							fontFamily: "微软雅黑",
							fontSize: 12,
							fontWeight: 600,
						},
					},
					axisTick: {
						//坐标轴刻度相关设置。
						show: false,
					},
					axisLine: {
						//坐标轴轴线相关设置
						lineStyle: {
							color: "#000",
							opacity: 0.2,
						},
					},
					splitLine: {
						//坐标轴在 grid 区域中的分隔线
						show: false,
					},
				},
			],
			// Y轴
			yAxis: [
				{
					type: "value",
					splitNumber: 11,
					axisLabel: {
						textStyle: {
							color: "#fff",
							fontStyle: "normal",
							fontFamily: "微软雅黑",
							fontSize: 12,
							fontWeight: 600,
						},
					},
					axisLine: {
						show: false,
					},
					axisTick: {
						show: false,
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: ["#fff"],
							opacity: 0.1,
						},
					},
				},
			],
			// 数据
			series: [
				{
					name: "实际时长",
					type: "bar",
					data: currentData.leftData,
					barWidth: 15,
					barGap: 0, //柱间距离
					itemStyle: {
						normal: {
							show: true,
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
								{
									offset: 0,
									color: "#ffbe21",
								},
								{
									offset: 1,
									color: "#ffbe21",
								},
							]),
							barBorderRadius: 10,
							borderWidth: 0,
						},
					},
				},
				{
					name: "A级时长",
					type: "bar",
					data: currentData.rightData,
					barWidth: 15,
					barGap: 0.2, //柱间距离
					itemStyle: {
						normal: {
							show: true,
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
								{
									offset: 0,
									color: "#4c73fe",
								},
								{
									offset: 1,
									color: "#4c73fe",
								},
							]),
							barBorderRadius: 10,
							borderWidth: 0,
						},
					},
				},
			],
		};

		return {
			props,
			option,
		};
	},
});
</script>

<style lang="stylus">
.charts-pillar
	width 1300px
	height 772px
	overflow hidden
	background-color #595B61
	box-shadow inset 10px 10px 30px #484A4F, inset -10px -10px 30px #484A4F
	border-radius 20px
	border 2px solid #6D7278

.charts-pillar__canvas
	width 1450px !important
	height 1070px !important
	margin-top -280px
	margin-left -64px
</style>

