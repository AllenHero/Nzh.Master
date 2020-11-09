
function dayanalysis(xdata, ydata, zdata) {
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
        xAxis: [
            {
                type: 'category',
                data: xdata,
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel: { //调整x轴的lable  
                    textStyle: {
                        fontSize: 16,// 让字体变大
                        color: 'rgba(0,0,0,0.8)',
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    onZero: true,
                    lineStyle: {
                        color: '#333',
                        fontSize: '18',
                        width: 0,
                        type: 'solid',
                    },
                },
                splitLine: {
                    show: true,
                    interval: 'auto',
                    lineStyle: {
                        color: ['rgba(198,213,232,0.4)'],
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
                name: '损失工时/min',
                //min: 0,
                //interval: 10,
                axisLabel: {
                    formatter: '{value}'
                },
                axisTick: {
                    show: false
                },
                axisLabel: { //调整x轴的lable  
                    textStyle: {
                        fontSize: 16,// 让字体变大
                        color: 'rgba(0,0,0,0.8)',
                    }
                },
                axisLine: {
                    show: true,
                    onZero: true,
                    lineStyle: {
                        color: 'rgba(0,0,0,0.8)',
                        width: 0,
                    },
                },

                splitLine: {
                    show: true,
                    interval: 'auto',
                    lineStyle: {
                        color: ['rgba(198,213,232,0.9)'],
                        width: 1,
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
                interval: 20.00,
                max:100,
                axisLabel: {
                    formatter: '{value} %'
                },
                axisTick: {
                    show: false
                },
                axisLabel: { //调整x轴的lable  
                    textStyle: {
                        fontSize: 16,// 让字体变大
                        color: 'rgba(0,0,0,0.8)',
                    }
                },
                axisLine: {
                    show: true,
                    onZero: true,
                    lineStyle: {
                        color: 'rgba(0,0,0,0.8)',
                        width: 0,

                    },
                },
                splitLine: {
                    show: true,
                    interval: 'auto',
                    lineStyle: {
                        color: ['rgba(198,213,232,0.4)'],
                        width: 1,
                        type: 'solid',

                        shadowOffsetX: 0,
                        shadowOffsetY: 0,

                    },
                },
            }
        ],
        grid: {
            top: '12%',
            left: '1%',
            right: '1%',
            bottom: '4%',
            containLabel: true
        },
        series: [

            {
                name: '损失工时/min',
                type: 'bar',
                barWidth: '28%',
                color: ['rgba(87,188,255,0.9)'],
                data: ydata,
                itemStyle: {
                    normal: {
                        barBorderRadius: 8,
                        shadowBlur: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.14)',
                        shadowOffsetX: 4,
                        shadowOffsetY: -4,
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                { offset: 0, color: 'rgba(87,188,255,1)' },
                                { offset: 1, color: 'rgba(87,188,255,0.87)' },
                            ]
                        ),

                    },
                    emphasis: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                { offset: 0, color: 'blue' },
                                { offset: 0.7, color: '#2378f7' },
                                { offset: 1, color: '#83bff6' }
                            ]
                        )
                    },
                    //label: {  //显示参数
                    //    normal: {
                    //        show: true,
                    //        position: 'inside',
                    //        textStyle: {
                    //            color: 'rgba(255,255,255,0.8)',
                    //            fontStyle: 'normal',
                    //            fontWeight: 'bold',
                    //            fontSize: 20,
                    //            formatter: '{c}',
                    //        },
                    //    },
                    //},
                },
                label: {  //显示参数
                   normal: {
                       show: true,
                       position: 'inside',
                       textStyle: {
                       color: '#edfffc',
                       fontStyle: 'bold',
                       fontWeight: 'normal',
                       fontSize: 12,
                       },
                   },
               	
               },
            },

            {
                name: '损失工时占比',
                type: 'line',
                borderwidth: '8',
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
                                fontWeight: 'bold',
                                fontSize: 18,

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
                                offset: 1, color: '#FFFF00' // 0% 处的颜色
                            }, {
                                offset: 0, color: '#00FF66' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                        width: 6,
                        borderType: 'solid',
                        shadowColor: 'rgba(0, 0, 0, 0.2)',
                        shadowBlur: 0,
                        shadowOffsetX: 0,
                        shadowOffsetY: 6,

                    },


                },

                yAxisIndex: 1,
                data: zdata,

                axisLabel: {
                    normal: {
                        show: true,
                        position: 'outside',
                        formatter: '{value}%'// 这里是数据展示的时候显示的数据
                    }
                },

                //markLine: {

                //    silent: true,
                //    data: [{
                //        yAxis: 95,

                //    }],

                //},
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
}
function monthnalysis(xdata, ydata, zdata) {
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
            show: true,
            data: [],
            textStyle: {
                color: '#ccc'
            }
        },

        xAxis: [
            {
                type: 'category',
                data: xdata,
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel: { //调整x轴的lable  
                    textStyle: {
                        fontSize: 16,// 让字体变大
                        color: 'rgba(0,0,0,0.8)',
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    onZero: true,
                    lineStyle: {
                        color: '#333',
                        fontSize: '18',
                        width: 0,
                        type: 'solid',
                    },
                },
                splitLine: {
                    show: true,
                    interval: 'auto',
                    lineStyle: {
                        color: ['rgba(198,213,232,0.4)'],
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
                name: '损失工时/min',
                //min: 0,
                //max:200,
                //interval: 10,
                axisLabel: {
                    formatter: '{value}'
                },
                axisTick: {
                    show: false
                },
                axisLabel: { //调整x轴的lable  
                    textStyle: {
                        fontSize: 16,// 让字体变大
                        color: 'rgba(0,0,0,0.8)',
                    }
                },
                axisLine: {
                    show: true,
                    onZero: true,
                    lineStyle: {
                        color: 'rgba(0,0,0,0.8)',
                        width: 0,
                    },
                },

                splitLine: {
                    show: true,
                    interval: 'auto',
                    lineStyle: {
                        color: ['rgba(198,213,232,0.9)'],
                        width: 1,
                        type: 'solid',

                        shadowOffsetX: 0,
                        shadowOffsetY: 0,

                    },
                },

            },
            {
                type: 'value',
                name: '损失工时占比',
                //min: 0.00,
                //max: 100.00,
                //interval: 20.00,

                axisLabel: {
                    formatter: '{value} %'
                },
                axisTick: {
                    show: false
                },
                axisLabel: { //调整x轴的lable  
                    textStyle: {
                        fontSize: 16,// 让字体变大
                        color: 'rgba(0,0,0,0.8)',
                    }
                },
                axisLine: {
                    show: true,
                    onZero: true,
                    lineStyle: {
                        color: 'rgba(0,0,0,0.8)',
                        width: 0,

                    },
                },
                splitLine: {
                    show: true,
                    interval: 'auto',
                    lineStyle: {
                        color: ['rgba(198,213,232,0.4)'],
                        width: 1,
                        type: 'solid',

                        shadowOffsetX: 0,
                        shadowOffsetY: 0,

                    },
                },
            }
        ],
        grid: {
            top: '12%',
            left: '1%',
            right: '1%',
            bottom: '4%',
            containLabel: true
        },
        series: [
            {
                name: '损失工时/min',
                type: 'bar',
                barWidth: '28%',
                color: ['rgba(87,188,255,0.9)'],
                data: ydata,
                itemStyle: {
                    normal: {
                        barBorderRadius: 8,
                        shadowBlur: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.14)',
                        shadowOffsetX: 4,
                        shadowOffsetY: -4,
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                { offset: 0, color: 'rgba(87,188,255,1)' },
                                { offset: 1, color: 'rgba(87,188,255,0.87)' },
                            ]
                        ),
                        //lable: {
                        //    show: true,
                        //    formatter: '{c}',
                        //}
                    },
                    emphasis: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                { offset: 0, color: 'blue' },
                                { offset: 0.7, color: '#2378f7' },
                                { offset: 1, color: '#83bff6' }
                            ]
                        )
                    },
                    //label: {  //显示参数
                    //    normal: {
                    //        show: true,
                    //        position: 'top',
                    //        textStyle: {
                    //            color: 'rgba(255,255,255,0.8)',
                    //            fontStyle: 'normal',
                    //            fontWeight: 'bold',
                    //            fontSize: 20,
                    //        },
                    //    },

                    //},
                },
                label: {  //显示参数
                   normal: {
                       show: true,
                       position: 'inside',
                       textStyle: {
                       color: '#edfffc',
                       fontStyle: 'bold',
                       fontWeight: 'normal',
                       fontSize: 12,
                       },
                   },
               },
            },

            {
                name: '损失工时占比',
                type: 'line',
                borderwidth: '8',
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
                                fontWeight: 'bold',
                                fontSize: 18,

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
                                offset: 1, color: '#FFFF00' // 0% 处的颜色
                            }, {
                                offset: 0, color: '#00FF66' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                        width: 6,
                        borderType: 'solid',
                        shadowColor: 'rgba(0, 0, 0, 0.2)',
                        shadowBlur: 0,
                        shadowOffsetX: 0,
                        shadowOffsetY: 6,

                    },


                },

                yAxisIndex: 1,
                data: zdata,

                axisLabel: {
                    normal: {
                        show: true,
                        position: 'outside',
                        formatter: '{value}%'// 这里是数据展示的时候显示的数据
                    }
                },

                //markLine: {

                //    silent: true,
                //    data: [{
                //        yAxis: 95,

                //    }],

                //},
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
    myChart2 = echarts.init(document.getElementById('main'));
    myChart2.setOption(option2);
    window.onresize = myChart2.resize;
}


option3 = {
    
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
        data:['总量','效率'],
        textStyle: {
            color: '#ccc'
        }
    },

    xAxis: [
        {
            type: 'category',
            data: ['设备A','设备B','设备C','设备D','设备E'],
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
                color: '#6AB0EA',
                width: 0,
                type: 'solid',
            },
        },
		 splitLine: {
				  show: true,
				  interval: 'auto',
				  lineStyle: {
				  color: ['rgba(198,213,232,0.5)'],
				  width: 1,
				  type: 'solid',
				  
				  shadowOffsetX: 0,
				  shadowOffsetY: 0,
				  opacity:0.3,
				  },
				  },
		   
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '产量',
            min: 0,
            max: 50,
            interval: 10,
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
                    color: '#6AB0EA',
                    width: 0,
                },
            },
			 splitLine: {
				  show: true,
				  interval: 'auto',
				  lineStyle: {
				  color: ['rgba(198,213,232,0.5)'],
				  width: 1,
				  type: 'solid',
				  
				  shadowOffsetX: 0,
				  shadowOffsetY: 0,
				  opacity:0.3,
				  },
				  },
			
        },
       
    ],
	  grid: {
		top:'24%',
        left: '2%',
        right: '2%',
        bottom: '22%',
        containLabel: true
    },
    series: [
          
		{
            name:'产量',
            type:'bar',
			barWidth: '20%',
			color: ['rgba(87,188,255,0.9)'],
            data:[40, 28, 42, 35, 38,],
			itemStyle: {
                normal: {
					barBorderRadius:8,
					shadowBlur: 0,
					shadowColor:'rgba(0, 0, 0, 0.2)',
					shadowOffsetX: -4,
					shadowOffsetY: -1,
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                        {offset: 0, color: 'rgba(87,188,255,1)'},
                        {offset: 1, color: 'rgba(87,188,255,0.87)'},
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: 'blue'},
                            {offset: 0.7, color: '#2378f7'},
                            {offset: 1, color: '#83bff6'}
                        ]
                    )
                }
            },
			 label: {  //显示参数
                normal: {
                    show: true,
                    position: 'top',
                    textStyle: {
					color: '#edfffc',
					fontStyle: 'normal',
					fontWeight: 'normal',
					fontSize: 12,
                    },
                },
				
            },
        },
       
      
			  
        
		
    ],


};
myChart3 = echarts.init(document.getElementById('main3'));
myChart3.setOption(option3);
 window.onresize = myChart3.resize; 
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
        data:['总量','效率'],
        textStyle: {
            color: '#ccc'
        }
    },

    xAxis: [
        {
            type: 'category',
            data: ['设备','物料','品质','人力','其它'],
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
                color: '#6AB0EA',
                width: 0,
                type: 'solid',
            },
        },
		 splitLine: {
				  show: true,
				  interval: 'auto',
				  lineStyle: {
				  color: ['rgba(198,213,232,0.6)'],
				  width: 1,
				  type: 'solid',
				  
				  shadowOffsetX: 0,
				  shadowOffsetY: 0,
				  opacity:0.3,
				  },
				  },
		   
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '产量',
            min: 0,
            max: 50,
            interval: 10,
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
                    color: '#6AB0EA',
                    width: 0,
                },
            },
			 splitLine: {
				  show: true,
				  interval: 'auto',
				  lineStyle: {
				  color: ['rgba(198,213,232,0.6)'],
				  width: 1,
				  type: 'solid',
				  
				  shadowOffsetX: 0,
				  shadowOffsetY: 0,
				  opacity:0.3,
				  },
				  },
			
        },
       
    ],
	  grid: {
		top:'24%',
        left: '2%',
        right: '2%',
        bottom: '18%',
        containLabel: true
    },
    series: [
          
		{
            name:'产量',
            type:'bar',
			barWidth: '22%',
			color: ['rgba(87,188,255,0.9)'],
            data:[40, 28, 42, 35, 38,],
			itemStyle: {
                normal: {
					barBorderRadius:8,
					shadowBlur: 0,
					shadowColor:'rgba(0, 0, 0, 0.2)',
					shadowOffsetX: -4,
					shadowOffsetY: -1,
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                        {offset: 0, color: 'rgba(87,188,255,1)'},
                        {offset: 1, color: 'rgba(87,188,255,0.87)'},
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: 'blue'},
                            {offset: 0.7, color: '#2378f7'},
                            {offset: 1, color: '#83bff6'}
                        ]
                    )
                }
            },
			 label: {  //显示参数
                normal: {
                    show: true,
                    position: 'top',
                    textStyle: {
					color: '#edfffc',
					fontStyle: 'normal',
					fontWeight: 'normal',
					fontSize: 12,
                    },
                },
				
            },
        },
       
      
			  
        
		
    ],

};
myChart4 = echarts.init(document.getElementById('main4'));
myChart4.setOption(option4);
 window.onresize = myChart4.resize; 

option5 = {
      
    xAxis: [
        {
            type: 'category',
            data: ['6月1日','6月2日','6月3日','6月4日','6月5日','6月6日'],
            axisPointer: {
                type: 'shadow'
            },
		
        axisLine: {
            show: true,
            onZero: true,
            lineStyle: {
                color: '#899098',
                width: 1,
                type: 'solid',
            },
        },
		splitLine: {
				  show: true,
				  interval: 'auto',
				  lineStyle: {
				  color: ['#ccc'],
				  width: 1,
				  type: 'dashed',
				  
				  shadowOffsetX: 0,
				  shadowOffsetY: 0,
				  opacity:0.3,
				  },
				  },
		
        }
    ],
    yAxis: [
        {
            type: 'value',

           min: 0.00,
            max: 120.00,
            interval:40.00,
       
            axisLabel: {
                formatter: '{value} %'
            },
			 axisLine: {
                show: true,
                onZero: true,
                lineStyle: {
                    color: '#899098',
                    width: 0,
                },
            },
			 splitLine: {
				  show: true,
				  interval: 'auto',
				  lineStyle: {
				  color: ['#ccc'],
				  width: 1,
				  type: 'dashed',
				  
				  shadowOffsetX: 0,
				  shadowOffsetY: 0,
				  opacity:0.3,
				  },
				  },
			
        },
        {
            type: 'value',
            min: 0.00,
            max: 120.00,
            interval:40.00,
            axisLabel: {
                formatter: '{value} %',
            },
			 axisLine: {
                show: true,
                onZero: true,
                lineStyle: {
                    color: '#899098',
                    width: 0,
                    
                },
            },
			 splitLine: {
				  show: true,
				  interval: 'auto',
				  lineStyle: {
				  color: ['#ccc'],
				  width: 1,
				  type: 'dashed',
				  
				  shadowOffsetX: 0,
				  shadowOffsetY: 0,
				  opacity:0.3,
				  },
				  },
        }
    ],
	  grid: {
		top:'16%',
        left: '2%',
        right: '2%',
        bottom: '4%',
        containLabel: true
    },
    series: [
	      
	       {
            name: '焊接1',
            type: 'line',
            smooth: true,
            smoothness:0.2,
			yAxisIndex: 1,
           itemStyle: {
					normal: {
					
					color: '#b4fe53',
					borderWidth: 1,
					
					
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
							offset: 1, color: '#b4fe53' // 0% 处的颜色
						}, {
							offset: 0, color: '#07FA6F' // 100% 处的颜色
						}],
						globalCoord: false // 缺省为 false
						  }, 
						  width:4,
						  borderType: 'solid',
						  shadowColor: 'rgba(0, 0, 0, 0.5)',
						  shadowBlur:3,
						   shadowOffsetX: 0,
						  shadowOffsetY: 6,
	  
						  },
						  
						  },
		 
           data:[78.00, 98.00, 100.00, 89.06, 89.00, 90.00],
			 axisLabel: {
                formatter: '{value} %'
            },
			  
            //柱状样式
           
            //显示最大和最小值
           
            //显示平均值横线
           // markLine: {
                //data: [
                   // { type: 'average', name: '平均值' }
               // ]

           // }
        },
		
		 {
            name: '焊接2',
            type: 'line',
            smooth: true,
            smoothness:0.2,
			yAxisIndex: 1,
           itemStyle: {
					normal: {
					
					color: '#1a7dec',
					borderWidth: 1,
					
					
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
							offset: 1, color: '#1a7dec' // 0% 处的颜色
						}, {

							offset: 0, color: '#1a7dec' // 100% 处的颜色
						}],
						globalCoord: false // 缺省为 false
						  }, 
						  width:4,
						  borderType: 'solid',
						  shadowColor: 'rgba(0, 0, 0, 0.5)',
						  shadowBlur:3,
						   shadowOffsetX: 0,
						  shadowOffsetY: 6,
	  
						  },
						  
						  },
            data:[98.00, 68.00, 80.08, 94.06, 78.00, 80.00],
			 axisLabel: {
                formatter: '{value} %'
            },
			
     
            //柱状样式
           
          
        },
	       {
            name: '焊接3',
            type: 'line',
            smooth: true,
            smoothness:0.2,
			yAxisIndex: 1,
           itemStyle: {
					normal: {
					
					color: '#ffcc2f',
					borderWidth: 1,
					
					
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
							offset: 1, color: '#ffcc2f' // 0% 处的颜色
						}, {

							offset: 0, color: '#ffcc2f' // 100% 处的颜色
						}],
						globalCoord: false // 缺省为 false
						  }, 
						  width:4,
						  borderType: 'solid',
						  shadowColor: 'rgba(0, 0, 0, 0.5)',
						  shadowBlur:3,
						   shadowOffsetX: 0,
						  shadowOffsetY: 6,
	  
						  },
						  
						  },
            data:[68.00, 108.00, 50.08, 96.06, 68.00, 83.80],
			 axisLabel: {
                formatter: '{value} %'
            },
			
 
            //柱状样式
           
          
        },
			       {
            name: '焊接4',
            type: 'line',
            smooth: true,
            smoothness:0.2,
			yAxisIndex: 1,
           itemStyle: {
					normal: {
					
					color: '#cdd7dd',
					borderWidth: 1,
					
					
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
							offset: 1, color: '#cdd7dd' // 0% 处的颜色
						}, {

							offset: 0, color: '#cdd7dd' // 100% 处的颜色
						}],
						globalCoord: false // 缺省为 false
						  }, 
						  width:4,
						  borderType: 'solid',
						  shadowColor: 'rgba(0, 0, 0, 0.5)',
						  shadowBlur:3,
						   shadowOffsetX: 0,
						  shadowOffsetY: 6,
	  
						  },
						  
						  },
            data:[98.80, 78.08, 60.88, 106.06, 78.00, 103.80],
			 axisLabel: {
                formatter: '{value} %'
            },
			
   
            //柱状样式
           
          
        },
			 {
            name: '焊接5',
            type: 'line',
            smooth: true,
            smoothness:0.2,
			yAxisIndex: 1,
           itemStyle: {
					normal: {
					
					color: '#ff1811',
					borderWidth: 1,
					
					
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
							offset: 1, color: '#ff1811' // 0% 处的颜色
						}, {

							offset: 0, color: '#ff1811' // 100% 处的颜色
						}],
						globalCoord: false // 缺省为 false
						  }, 
						  width:4,
						  borderType: 'solid',
						  shadowColor: 'rgba(0, 0, 0, 0.5)',
						  shadowBlur:3,
						   shadowOffsetX: 0,
						  shadowOffsetY: 6,
	  
						  },
						  
						  },
            data:[112.80, 118.08, 90.88, 36.06, 68.00, 79.80],
			 axisLabel: {
                formatter: '{value} %'
            },
			
     
            //柱状样式
           
          
        },
		{
            name: '焊接6',
            type: 'line',
            smooth: true,
            smoothness:0.2,
			yAxisIndex: 1,
           itemStyle: {
					normal: {
					
					color: '#f96941',
					borderWidth: 1,
					
					
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
							offset: 1, color: '#f96941' // 0% 处的颜色
						}, {

							offset: 0, color: '#f96941' // 100% 处的颜色
						}],
						globalCoord: false // 缺省为 false
						  }, 
						  width:4,
						  borderType: 'solid',
						  shadowColor: 'rgba(0, 0, 0, 0.5)',
						  shadowBlur:3,
						   shadowOffsetX: 0,
						  shadowOffsetY: 6,
	  
						  },
						  
						  },
            data:[82.80, 98.08, 58.88, 58.06, 110.00, 112.80],
			 axisLabel: {
                formatter: '{value} %'
            },
			
           
            //柱状样式
           
          
        },

       
              
		
    ],

};
myChart5 = echarts.init(document.getElementById('main5'));
myChart5.setOption(option5);
 window.onresize = myChart5.resize; 
option6 = {
xAxis: [
        {
            type: 'category',
		    boundaryGap: false,
            data: ['X9','X7','X9E','X10','X12'],
            axisTick: {
                alignWithLabel: true,
            },
		
        axisLine: {
            show: true,
            onZero: true,
            lineStyle: {
                color: '#899098',
                width: 1,
                type: 'solid',
            },
        },
		
        }
    ],
    yAxis: [

       {
            type: 'value',
            min: 0.00,
            max: 100.00,
            interval:20.00,
            axisLabel: {
                formatter: '{value} %'
            },
			 axisLine: {
                show: true,
                onZero: true,
                lineStyle: {
                    color: '#899098',
                    width: 0,
                    
                },
            },
			 splitLine: {
				  show: true,
				  interval: 'auto',
				  lineStyle: {
				  color: ['#ccc'],
				  width: 1,
				  type: 'dashed',
				  
				  shadowOffsetX: 0,
				  shadowOffsetY: 0,
				  opacity:0.3,
				  },
				  },
        }
    ],
	  grid: {
		top:'18%',
        left: '2%',
        right: '4%',
        bottom: '6%',
        containLabel: true
    },
    series: [
        {
            name: '出货量',
            type: 'line',
            smooth: true,
            smoothness:0.2,
            itemStyle: { normal: { color: '#1883a4', areaStyle: { type: 'default', color: {
			type: 'linear',
			x: 0,
			y: 0,
			x2: 0,
			y2: 1,
			colorStops: [{
				offset: 0, color: '#135f76',// 0% 处的颜色
                }, {
				offset: 1, color: '#1883a4',// 100% 处的颜色
			}],
			globalCoord: false // 缺省为 false
		}
		 } } },
		 
            data: [88, 90, 78, 80, 60],
			
            label: {  //显示参数
                normal: {

                    show: true,
                    position: 'inside',
                    textStyle: {
                        color: '#05afe2',
                        fontStyle: 'normal',
                        fontWeight: 'normal',
                        fontSize: 12,
                    },
                },

            },
            //柱状样式
           
            //显示最大和最小值
           
            //显示平均值横线
           // markLine: {
                //data: [
                   // { type: 'average', name: '平均值' }
               // ]

           // }
        },
		        {
            name: '出货量',
            type: 'line',
            smooth: true,
            smoothness:0.2,
            itemStyle: { normal: { color: '#17fa83', areaStyle: { type: 'default', color: {
			type: 'linear',
			x: 0,
			y: 0,
			x2: 0,
			y2: 1,
			colorStops: [{
				offset: 0, color: '#11bf64',// 0% 处的颜色
                }, {
				offset: 1, color: 'rgba(20,119,67,0.3)',// 100% 处的颜色
			}],
			globalCoord: false // 缺省为 false
		}
		 } } },
		 
            data: [80, 80, 96, 70, 75],
            label: {  //显示参数
                normal: {

                    show: true,
                    position: 'inside',
                    textStyle: {
                        color: '#11ff83',
                        fontStyle: 'normal',
                        fontWeight: 'normal',
                        fontSize: 12,
                    },
                },

            },
            //柱状样式
           
            //显示最大和最小值
           
            //显示平均值横线
           // markLine: {
                //data: [
                   // { type: 'average', name: '平均值' }
               // ]

           // }
        }
    ]
};

myChart6 = echarts.init(document.getElementById('main6'));
myChart6.setOption(option6);
