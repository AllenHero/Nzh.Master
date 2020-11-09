
//echatrs配置
var myChart = echarts.init($('#main')[0]);


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
    	orient: 'horizontal',
		show: true,
		              // 左距离
        top:20,        // 上距离
            // 下距离
        width:300,              // 宽度
        itemGap: 20,            // 间隔
        itemWidth: 10,          // 图形宽度。
        itemHeight: 10,         // 图形高度。
        data:['计划产量','实际产量','生产效率'],
        textStyle: {
            color: 'rgba(190,231,254,0.8)'
        }
    },

    xAxis: [
        {
            type: 'category',
            data: ['固晶', '焊线', 'Molding', '喷墨', '切割', 'smt', '模组组装'],
            axisPointer: {
                type: 'shadow'
            },
			axisLabel: { //调整x轴的lable  
                            textStyle: {
                                fontSize: 12,// 让字体变大
                                color: 'rgba(190,231,254,0.8)',
                            }
                        },
		 axisTick: {
           show: false
        },
        axisLine: {
            show: true,
            onZero: true,
            lineStyle: {
                color: 'rgba(255,255,255,0.6)',
				fontSize:'12',
                width: 0,
                type: 'solid',
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
    yAxis: [
        {
            type: 'value',
            name: '产量',
            min: 0,
            max: 500,
            interval: 100,
            axisLabel: {
                formatter: '{value}'
            },
			axisTick: {
              show: false
           },
		   axisLabel: { //调整x轴的lable  
                            textStyle: {
                                fontSize: 12,// 让字体变大
                                color: 'rgba(255,255,255,0.4)',
                            }
                        },
			  axisLine: {
            show: true,
            onZero: true,
            lineStyle: {
                color: 'rgba(255,255,255,0.6)',
				fontSize:'12',
                width: 0,
                type: 'solid',
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
            name: '生产效率',
            min: 0.00,
            max: 100.00,
            interval:20.00,
			
		   axisLabel: { //调整x轴的lable 
		   	
		   	                formatter: '{value} %',
                            textStyle: {
                                fontSize: 12,// 让字体变大
                                color: 'rgba(255,255,255,0.4)',
                            },
                        },
             axisTick: {
           show: false,
           
           },            
			 axisLine: {
                show: true,
                onZero: true,
                lineStyle: {
                   color: 'rgba(255,255,255,0.2)',
                    width: 1,
                    
                },
                
            },
			 splitLine: {
				  show: true,
				  interval: 'auto',
				  lineStyle: {
				  color: ['rgba(198,213,232,0.3)'],
				  width: 1,
				  type: 'solid',
				  
				  shadowOffsetX: 0,
				  shadowOffsetY: 0,

				  },
				  },
        }
    ],
	  grid: {
		top:'30%',
        left: '1%',
        right: '1%',
        bottom: '2%',
        containLabel: true,
    },
    series: [
          
		{
            name:'实际产量',
            type:'bar',
			barWidth: '12%',
			color: ['rgba(87,188,255,0.9)'],
            data:[400, 228, 432, 235, 342, 235, 138],
			itemStyle: {
                normal: {
					barBorderRadius:0,
					shadowBlur: 0,
					shadowColor:'rgba(0, 0, 0, 0.14)',
					shadowOffsetX: 4,
					shadowOffsetY: -4,
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                        {offset: 0, color: '#0066FF'},
                        {offset: 1, color: '#0066FF'},
                        ]
                    ),
					
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#2390AE'},
                            {offset: 0.7, color: '#2390AE'},
                            {offset: 1, color: '#2390AE'}
                        ]
                    )
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
            name:'计划产量',
            type:'bar',
			barWidth: '12%',
			color: ['rgba(87,188,255,0.9)'],
            data:[420, 328, 432, 365, 412, 135, 338],
			itemStyle: {
                normal: {
					barBorderRadius:0,
					shadowBlur: 0,
					shadowColor:'rgba(0, 0, 0, 0.14)',
					shadowOffsetX: 4,
					shadowOffsetY: -4,
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                        {offset: 0, color: '#02BB5F'},
                        {offset: 1, color: '#02BB5F'},
                        ]
                    ),
					
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#2390AE'},
                            {offset: 0.7, color: '#2390AE'},
                            {offset: 1, color: '#2390AE'}
                        ]
                    )
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
            name:'生产效率',
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
					color: '#00FFFF',
					borderWidth:0,
					 label: {
                                    show: true,
                                    formatter: null,
                                    textStyle: {
                                        color: '#00FFFF',
                                        fontWeight: 'none',
                                        fontSize: '14',
        
                                    },
                                },
                                lineStyle: {
                               color: "#00FFFF",
                           },
					},
			   },
		
				
				

						
						 
            yAxisIndex: 1,
            data:[80, 90, 50, 88, 86, 88, 86],
			
			 axisLabel: {
                            normal: {
                                show: false,
                                position: 'outside',
                                formatter: '{value}%'// 这里是数据展示的时候显示的数据
                            }
                        },
						
			/* markLine: {
				 
                silent: true,
                data: [{
                    yAxis: 95,
					
                }],

            },*/
		 /*itemStyle: {
			normal: {
				barBorderRadius:4,

				
				borderWidth:0,
				borderType: 'solid',
				label: {
					show: true,
					formatter: null,
					textStyle: { color: '#fefefe' },
				},
			},
		   },*/
			  
        },
	
    ],

};

myChart.setOption(option); window.onresize = myChart.resize; 


option2 = {
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
    	orient: 'horizontal',
		show: true,
		              // 左距离
        top:20,        // 上距离
            // 下距离
        width:300,              // 宽度
        itemGap: 20,            // 间隔
        itemWidth: 10,          // 图形宽度。
        itemHeight: 10,         // 图形高度。
        data:['计划产量','实际产量','生产效率'],
        textStyle: {
            color: 'rgba(190,231,254,0.8)'
        }
    },

    xAxis: [
        {
            type: 'category',
            data: ['固晶', '焊线', 'Molding', '喷墨', '切割', 'smt', '模组组装'],
            axisPointer: {
                type: 'shadow'
            },
			axisLabel: { //调整x轴的lable  
                            textStyle: {
                                fontSize: 12,// 让字体变大
                                color: 'rgba(190,231,254,0.8)',
                            }
                        },
		 axisTick: {
           show: false
        },
        axisLine: {
            show: true,
            onZero: true,
            lineStyle: {
                color: 'rgba(255,255,255,0.6)',
				fontSize:'12',
                width: 0,
                type: 'solid',
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
    yAxis: [
        {
            type: 'value',
            name: '产量',
            min: 0,
            max: 500,
            interval: 100,
            axisLabel: {
                formatter: '{value}'
            },
			axisTick: {
              show: false
           },
		   axisLabel: { //调整x轴的lable  
                            textStyle: {
                                fontSize: 12,// 让字体变大
                                color: 'rgba(255,255,255,0.4)',
                            }
                        },
			  axisLine: {
            show: true,
            onZero: true,
            lineStyle: {
                color: 'rgba(255,255,255,0.6)',
				fontSize:'12',
                width: 0,
                type: 'solid',
            },
        },
			
			  splitLine: {
				  show: true,
				  interval: 'auto',
				  lineStyle: {
				   color: ['rgba(198,213,232,0.1)'],
				  width: 0,
				  type: 'solid',
				  shadowOffsetX: 0,
				  shadowOffsetY: 0,

				  },
				  },
			
        },
        {
            type: 'value',
            name: '生产效率',
            min: 0.00,
            max: 100.00,
            interval:20.00,
			
		   axisLabel: { //调整x轴的lable 
		   	
		   	                formatter: '{value} %',
                            textStyle: {
                                fontSize: 12,// 让字体变大
                                color: 'rgba(255,255,255,0.4)',
                            },
                        },
             axisTick: {
           show: false,
           
           },            
			 axisLine: {
                show: true,
                onZero: true,
                lineStyle: {
                   color: 'rgba(255,255,255,0.2)',
                    width: 1,
                    
                },
                
            },
			 splitLine: {
				  show: true,
				  interval: 'auto',
				  lineStyle: {
				  color: ['rgba(198,213,232,0.3)'],
				  width: 1,
				  type: 'solid',
				  
				  shadowOffsetX: 0,
				  shadowOffsetY: 0,

				  },
				  },
        }
    ],
	  grid: {
		top:'30%',
        left: '1%',
        right: '1%',
        bottom: '2%',
        containLabel: true,
    },
    series: [
          
		{
            name:'实际产量',
            type:'bar',
			barWidth: '12%',
			color: ['rgba(87,188,255,0.9)'],
            data:[400, 228, 432, 235, 342, 235, 138],
			itemStyle: {
                normal: {
					barBorderRadius:0,
					shadowBlur: 0,
					shadowColor:'rgba(0, 0, 0, 0.14)',
					shadowOffsetX: 4,
					shadowOffsetY: -4,
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                        {offset: 0, color: '#0066FF'},
                        {offset: 1, color: '#0066FF'},
                        ]
                    ),
					
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#2390AE'},
                            {offset: 0.7, color: '#2390AE'},
                            {offset: 1, color: '#2390AE'}
                        ]
                    )
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
            name:'计划产量',
            type:'bar',
			barWidth: '12%',
			color: ['rgba(87,188,255,0.9)'],
            data:[420, 328, 432, 365, 412, 135, 338],
			itemStyle: {
                normal: {
					barBorderRadius:0,
					shadowBlur: 0,
					shadowColor:'rgba(0, 0, 0, 0.14)',
					shadowOffsetX: 4,
					shadowOffsetY: -4,
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                        {offset: 0, color: '#02BB5F'},
                        {offset: 1, color: '#02BB5F'},
                        ]
                    ),
					
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#2390AE'},
                            {offset: 0.7, color: '#2390AE'},
                            {offset: 1, color: '#2390AE'}
                        ]
                    )
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
            name:'生产效率',
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
					color: '#00FFFF',
					borderWidth:0,
					 label: {
                                    show: true,
                                    formatter: null,
                                    textStyle: {
                                        color: '#00FFFF',
                                        fontWeight: 'none',
                                        fontSize: '14',
        
                                    },
                                },
                                lineStyle: {
                               color: "#00FFFF",
                           },
					},
			   },
		
				
				

						
						 
            yAxisIndex: 1,
            data:[80, 90, 50, 88, 86, 88, 86],
			
			 axisLabel: {
                            normal: {
                                show: false,
                                position: 'outside',
                                formatter: '{value}%'// 这里是数据展示的时候显示的数据
                            }
                        },
						
			/* markLine: {
				 
                silent: true,
                data: [{
                    yAxis: 95,
					
                }],

            },*/
		 /*itemStyle: {
			normal: {
				barBorderRadius:4,

				
				borderWidth:0,
				borderType: 'solid',
				label: {
					show: true,
					formatter: null,
					textStyle: { color: '#fefefe' },
				},
			},
		   },*/
			  
        },
	
    ],

};

myChart2 = echarts.init(document.getElementById('main2'));
myChart2.setOption(option2);
 window.onresize = myChart2.resize; 


