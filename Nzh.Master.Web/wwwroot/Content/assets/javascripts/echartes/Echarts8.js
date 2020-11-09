//echatrs配置
var myChart = echarts.init($('#main8')[0]);
option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
   
    legend: {
        data:['不良数量','累计占比']
    },
    xAxis: [
        {
            type: 'category',
            data: ['端子装错','高温不良','插口面压伤','表面破损','包装规格错误'],
            axisPointer: {
                type: 'shadow'
            },
             axisTick: {
           show: false
        },
        axisLine: {
            show: true,
            onZero: true,
            lineStyle: {
                color: '#999',
                width: 0,
                type: 'solid',
            },
        },
		
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '不良数量',
            min: 0,
            max: 100,
            interval: 20,
             axisLabel: {
                formatter: '{value}'
            },
			axisTick: {
              show: false
           },
			 axisLine: {
                show: true,
                onZero: true,
                lineStyle: {
                    color: '#999',
                    width: 0,
                },
            },
            
        },
        {
            type: 'value',
            name: '累计占比',
            min: 0,
            max: 100,
            interval: 20,
             axisLabel: {
                formatter: '{value}%'
            },
			axisTick: {
              show: false
           },
			 axisLine: {
                show: true,
                onZero: true,
                lineStyle: {
                    color: '#999',
                    width: 0,
                },
            },
        },
        
    ],
     grid: {
		top:'20%',
        left: '3%',
        right: '1%',
        bottom: '8%',
        containLabel: true
    },
    dataZoom: [{
            type: 'slider',
            show: true,
            height: 15,
            left: '1%',
            right: '1%',
            bottom: '0%',
            start: 0,
            end: 100,
            textStyle: {
                color: '#222',
                fontSize: 11,
            },
        }, {
            type: 'inside'
        }

    ],
    series: [
        {
            name:'不良数量',
            type:'bar',
            barWidth: '15%',
			color: ['rgba(87,188,255,0.9)'],
            data:[32.0, 4.9, 67.0, 83.2, 65.6,],
            itemStyle: {
                normal: {
					barBorderRadius:10,
					shadowBlur: 0,
					
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                        {offset: 0, color: '#36affe'},
                        {offset: 1, color: '#1b8fff'},
                        ]
                    ),
					
                },
               
				label: {  //显示参数
                            normal: {
                                show: true,
                                position: 'inside',
                                textStyle: {
                                    color: 'rgba(255,255,255,0.8)',
                                    fontStyle: 'normal',
                                    fontWeight: 'bold',
                                    fontSize: 20,
                                },
                            },
        
                        },
            },
        },
        
        {
            name:'累计占比',
            type:'line',
            itemStyle: {
					normal: {					
					color: '#ffcc2f',
					borderWidth:0,
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
							offset: 0, color: '#f5a623' // 0% 处的颜色
						}, {
							offset: 0, color: '#f5a623' // 100% 处的颜色
						}],
						globalCoord: false // 缺省为 false
						  }, 
						  width:3,
						  borderType: 'solid',
						 
	  
						  },
						  
						  },
            yAxisIndex: 1,
            data:[2.0, 82.2, 63.3, 4.5, 6.3]
        }
    ]
};

myChart.setOption(option); window.onresize = myChart.resize; 