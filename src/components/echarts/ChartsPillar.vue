<template>
	<section class="charts-pillar">
		<ECharts
			class="charts-pillar__canvas"
			:option="option"
		/>
	</section>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "@vue/composition-api";
import echarts from "echarts";
import { createComponent } from "echarts-for-vue";

export default defineComponent({
	name: "ChartsPillar",
	components: {
		ECharts: createComponent({ echarts }),
	},
	props: {
		xData: {
			type: Array,
			default() {
				return [
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
				];
			},
		},
		leftData: {
			type: Array,
			default() {
				return [
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
				];
			},
		},
		rightData: {
			type: Array,
			default() {
				return [
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
				];
			},
		},
	},
	setup(props) {
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
				itemGap: 30,
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
					fontSize: 16,
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
					fontSize: 16,
				},
			},
			// X轴
			xAxis: [
				{
					type: "category",
					data: props.xData,
					axisLabel: {
						//坐标轴刻度标签的相关设置。
						margin: 15,
						textStyle: {
							color: "#fff",
							fontStyle: "normal",
							fontFamily: "微软雅黑",
							fontSize: 14,
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
							fontSize: 14,
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
					data: props.leftData,
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
					data: props.rightData,
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
	//width 1300px
	width 100%
	//height 772px
	height calc(100vh - 165px)
	overflow hidden
	background linear-gradient(145deg, #414347, #4d4f55)
	box-shadow inset 10px 10px 30px #242528, inset -10px -10px 30px #6c6f77
	border-radius 20px
	//inset 10px 10px 30px #6c6f77, inset -10px -10px 30px #242528
	//border 2px solid #3f4045

.charts-pillar__canvas
	width 108% !important
	height 142% !important
	margin-top -23%
	margin-left -3.5%
</style>

