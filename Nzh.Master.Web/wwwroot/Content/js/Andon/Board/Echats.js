var myChart = echarts.init($('#main2')[0]);
window.onresize = myChart.resize;
$(function(){
option = {
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow',
			label: {
				show: true,
				backgroundColor: '#333'
			}
		}
	},
	legend: {
		show: true,
		data: ['损失工时', '损失工时占比', ],
		textStyle: {
			color: '#ccc'
		}
	},

	xAxis: [{
		type: 'category',
		data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
		axisPointer: {
			type: 'shadow'
		},
		axisLabel: { //调整x轴的lable  
			textStyle: {
				fontSize: 16, // 让字体变大
				color: 'rgba(255,255,255,0.8)',
			}
		},
		axisTick: {
			show: false
		},
		axisLine: {
			show: true,
			onZero: true,
			lineStyle: {
				color: 'rgba(255,255,255,0.8)',
				fontSize: '16',
				width: 0,
				type: 'solid',
			},
		},
		splitLine: {
			show: true,
			interval: 'auto',
			lineStyle: {
				color: ['rgba(198,213,232,0.1)'],
				width: 1,
				type: 'solid',
				shadowOffsetX: 0,
				shadowOffsetY: 0,

			},
		},
	}],
	yAxis: [{
			type: 'value',
			name: '损失工时(min)',
			min: 0,
			max: 250,
			interval: 50,
			axisLabel: {
				formatter: '{value}'
			},
			axisTick: {
				show: false
			},
			axisLabel: { //调整x轴的lable  
				textStyle: {
					fontSize: 14, // 让字体变大
					color: 'rgba(255,255,255,0.8)',
				}
			},
			axisLine: {
				show: true,
				onZero: true,
				lineStyle: {
					color: 'rgba(255,255,255,0.8)',
					width: 0,
				},
			},

			splitLine: {
				show: true,
				interval: 'auto',
				lineStyle: {
					color: ['rgba(198,213,232,0.2)'],
					width: 0,
					type: 'solid',

					shadowOffsetX: 0,
					shadowOffsetY: 0,

				},
			},

		},
		{
			type: 'value',
			name: '损失工时占比',
			min: 0.00,
			max: 100.00,
			interval: 20.00,

			axisLabel: {
				formatter: '{value} %'
			},
			axisTick: {
				show: false
			},
			axisLabel: { //调整x轴的lable  
				textStyle: {
					fontSize: 16, // 让字体变大
					color: 'rgba(255,255,255,0.8)',
				}
			},
			axisLine: {
				show: true,
				onZero: true,
				lineStyle: {
					color: 'rgba(255,255,255,0.8)',
					width: 0,

				},
			},
			splitLine: {
				show: true,
				interval: 'auto',
				lineStyle: {
					color: ['rgba(198,213,232,0.2)'],
					width: 1,
					type: 'solid',

					shadowOffsetX: 0,
					shadowOffsetY: 0,

				},
			},
		}
	],
	grid: {
		top: '30%',
		left: '2%',
		right: '3%',
		bottom: '1%',
		containLabel: true
	},
	series: [

		{
			name: '损失工时',
			type: 'bar',
			barWidth: '35%',
			color: ['rgba(87,188,255,0.9)'],
			data: [80, 90, 50, 88, 86, 80, 90, 50, 88, 86, 80, 90, 50, 88, 86, 80, 90, 50, 88, 86, 80, 90, 50, 88, 86, 80, 90, 50, 88, 86, ],
			itemStyle: {
				normal: {
					barBorderRadius: 0,
					shadowBlur: 0,
					shadowColor: 'rgba(0, 0, 0, 0.14)',
					shadowOffsetX: 4,
					shadowOffsetY: -4,
					color: new echarts.graphic.LinearGradient(
						0, 0, 0, 1, [{
								offset: 0,
								color: '#2390AE'
							},
							{
								offset: 1,
								color: '#2390AE'
							},
						]
					),

				},
				emphasis: {
					color: new echarts.graphic.LinearGradient(
						0, 0, 0, 1, [{
								offset: 0,
								color: '#2390AE'
							},
							{
								offset: 0.7,
								color: '#2390AE'
							},
							{
								offset: 1,
								color: '#2390AE'
							}
						]
					)
				},
				label: { //显示参数
					normal: {
						show: true,
						position: 'inside',
						textStyle: {
							color: 'rgba(255,255,255,0.8)',
							fontStyle: 'normal',
							fontWeight: 'bold',
							fontSize: 16,
						},
					},

				},
			},
			/*label: {  //显示参数
                normal: {
                    show: true,
                    position: 'inside',
                    textStyle: {
					color: '#edfffc',
					fontStyle: 'normal',
					fontWeight: 'normal',
					fontSize: 12,
                    },
                },
				
            },*/
		},

		{
			name: '工时效率',
			type: 'line',

			label: {
				normal: {
					show: true,
					position: 'top',
					formatter: '{c} %',

				}
			},
			itemStyle: {
				normal: {
					color: 'rgba(0,0,0,0.6)',
					borderWidth: 0,
					label: {
						show: true,
						formatter: null,
						textStyle: {
							color: '#f09b21',
							fontWeight: 'normal',
							fontSize: 16,

						},
					},
				},
			},
			lineStyle: {

				normal: {
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [{
							offset: 1,
							color: '#FF6600' // 0% 处的颜色
						}, {
							offset: 0,
							color: '#FF6600' // 100% 处的颜色
						}],
						globalCoord: false // 缺省为 false
					},
					width: 2,
					borderType: 'solid',
					shadowColor: 'rgba(0, 0, 0, 0.2)',
					shadowBlur: 0,
					shadowOffsetX: 0,
					shadowOffsetY: 6,

				},

			},

			yAxisIndex: 1,
			data: [80, 90, 50, 88, 86, 80, 90, 50, 88, 86, 80, 90, 50, 88, 86, 80, 90, 50, 88, 86, 80, 90, 50, 88, 86, 80, 90, 50, 88, 86, ],

			axisLabel: {
				normal: {
					show: true,
					position: 'outside',
					formatter: '{value}%' // 这里是数据展示的时候显示的数据
				}
			},
		},

	],

},


myChart.setOption(option);
var width = $(document).width();
$("#main2").width(width - 30);
var main2 = echarts.init(document.getElementById('main2'));
	main2.setOption(option);
	setTimeout(function (){
	    window.onresize = function () {
	    	main2.resize();
	    }
	},200)
	
})