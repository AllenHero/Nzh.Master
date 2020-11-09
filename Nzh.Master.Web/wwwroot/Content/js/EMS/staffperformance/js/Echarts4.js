//echatrs配置
var myChart = echarts.init($('#main4')[0]);
window.onresize = myChart.resize;
$(function(){
option4 = {
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
		data: ['物料问题', '工艺/品质','设备', '生产', '物料',],
		textStyle: {
			color: '#ccc'
		}
	},

	xAxis: [{
		type: 'category',
		data: ['08:00', '09:00', '10:00', '11:00', '12:00','13:00','14:00','15:00','16:00','17:00'],
		axisPointer: {
			type: 'shadow'
		},
		axisLabel: { //调整x轴的lable  
			textStyle: {
				fontSize: 14, // 让字体变大
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
				fontSize: '18',
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
			max: 10000,
			interval: 2000,
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
		right: '2%',
		bottom: '1%',
		containLabel: true
	},
	
	series: [
	   {
			name: '物料问题',
			type: 'bar',
			barWidth: '12%',
			color: ['#084b84'],
			data: [5000, 1008, 6002, 6005, 7008, 5000, 8008, 5200, 8000, 3008],
			label: { //显示参数
					normal: {
						show: true,
						position: 'top',
						textStyle: {
							color: 'rgba(255,255,255,0.8)',
							fontStyle: 'normal',
							fontSize: 14,
						},
					 },
			     },
		},

		{
			name: '工艺/品质',
			type: 'bar',
			barWidth: '12%',
			color: ['#046698'],
			data: [4000, 2008, 4002, 3005, 38, 60000, 7008, 3002, 8005, 2800],
			label: { //显示参数
					normal: {
						show: true,
						position: 'top',
						textStyle: {
							color: 'rgba(255,255,255,0.8)',
							fontStyle: 'normal',
							fontSize: 14,
						},
					 },
			     },
	    },
		{
			name: '设备',
			type: 'bar',
			barWidth: '12%',
			color: ['#1882b8'],
			data: [5000, 1800, 6002, 7005, 4008, 6000, 8008, 5002, 8000, 3008],
			label: { //显示参数
					normal: {
						show: true,
						position: 'top',
						textStyle: {
							color: 'rgba(255,255,255,0.8)',
							fontStyle: 'normal',
							fontSize: 14,
						},
					 },
			     },
		},
		{
			name: '生产',
			type: 'bar',
			barWidth: '12%',
			color: ['#59c1e8'],
			data: [5000, 1008, 6002, 7005, 4008, 6000, 8008, 5002, 8000, 3008],
			label: { //显示参数
					normal: {
						show: true,
						position: 'top',
						textStyle: {
							color: 'rgba(255,255,255,0.8)',
							fontStyle: 'normal',
							fontSize: 14,
						},
					 },
			     },
		},
		{
			name: '物料',
			type: 'bar',
			barWidth: '12%',
			color: ['#89F7FA'],
			data: [5000, 1008, 6002, 6005, 8008, 6000, 3008, 3002, 4000, 3008],
			label: { //显示参数
				    formatter: '\n',

					normal: {
						
						show: true,
						rotate:-90,
						position: 'inside',
					   verticalAlign: 'bottom',	 
						textStyle: {
							
							color: 'rgba(255,255,255,0.8)',
							fontStyle: 'normal',
							fontSize: 14,
							
						},
						

					 },
			     },
		},
		


	],

},

myChart.setOption(option4);
var width = $(document).width();
$("#main4").width(width - 30);
var main4 = echarts.init(document.getElementById('main4'));
	main4.setOption(option4);
	setTimeout(function (){
	    window.onresize = function () {
	    	main4.resize();
	    }
	},200)
});
