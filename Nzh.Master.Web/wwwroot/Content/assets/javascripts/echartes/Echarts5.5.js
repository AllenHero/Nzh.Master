//echatrs配置
var myChart = echarts.init($('#main5')[0]);



option = {
   
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '1%',
          right: '2%',
          bottom: '8%',
          top:'12%',
          containLabel: true
        },
         legend: {
        data: ['累计产量','累计差异'],
        right: 30,
        top:0,
        textStyle: {
            color: "#5a5a5a"
        },
        itemWidth: 12,
        itemHeight: 10,
        // itemGap: 35
    },
        xAxis: {
          type: 'category',
          data: ['08:00','09:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00'],
           axisLine: {
            show: false,
            onZero: true,
            lineStyle: {
                color: '#999',
                width: 0,
                type: 'solid',
            },
        },
          axisLabel: {
            // interval: 0,
            // rotate: 40,
            textStyle: {
              fontFamily: 'Microsoft YaHei'
            }
          },
        },

        yAxis: {
          type: 'value',
          max:'1800',
          axisLine: {
            show: false,
            lineStyle: {
              color: '#5a5a5a'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#cad1e0'
            }
          },
          axisLabel: {}
        },
        "dataZoom": [{
          "show": true,
          "height": 12,
          "xAxisIndex": [
            0
          ],
          bottom:'0%',
          "start": 2,
          "end": 98,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle:{
            color:"#d3dee5",

          },
          textStyle:{
            color:"#5a5a5a"},
          borderColor:"#cad1e0"
        }, {
          "type": "inside",
          "show": true,
          "height": 15,
          "start": 1,
          "end": 35
        }],
        series: [
         
        {
          name: '累计产量',
          type: 'bar',
          barWidth: '15%',
          itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#37b0fe'
                }, {
                    offset: 1,
                    color: '#198dff'
                }]),
            barBorderRadius: 11,
            }
          },
          data: [200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700,],
          markLine: {
				 
                silent: true,
                itemStyle:{
                	normal:{
                		position:'top',
                		borderWidth:'1',
                		lineStyle:{
                			type:'solid',
                			color:'red',
                		},
                		label:{
                			show: true,
                			position: 'middle',
                			formatter:'标准UPH1200',
                			textStyle:{
                				textAlign:'center'
                			}
                		}
                		
                	}
                },
                data: [{yAxis: 1200,name:'标准uph'}],

            },
        },
        {
            name:'累计差异',
            type:'bar',
            barWidth: '15%',
			color: ['rgba(87,188,255,0.9)'],
            data:[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600],
            itemStyle: {
                normal: {
					barBorderRadius:10,
					shadowBlur: 0,
					
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                        {offset: 0, color: '#a6b1ff'},
                        {offset: 1, color: '#676bff'},
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
        ]
      };

      var app = {
        currentIndex: -1,
      };
      setInterval(function () {
        var dataLen = option.series[0].data.length;

        // 取消之前高亮的图形
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: app.currentIndex
        });
        app.currentIndex = (app.currentIndex + 1) % dataLen;
        //console.log(app.currentIndex);
        // 高亮当前图形
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: app.currentIndex,
        });
        // 显示 tooltip
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: app.currentIndex
        });


      }, 1000);
myChart.setOption(option); window.onresize = myChart.resize; 
 option2 = {
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
        data:['计划保养','实际保养','完成率']
    },
    xAxis: [
        {
            type: 'category',
            data: ['2019/3/3','2019/3/4','2019/3/5','2019/3/6','2019/3/7','2019/3/8','2019/3/9','2019/3/10'],
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
            name: '保养次数',
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
            name: '完成率',
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
        
    ],
     grid: {
		top:'20%',
        left: '3%',
        right: '1%',
        bottom: '8%',
        containLabel: true
    },
    dataZoom: [{
				        type: 'inside',
				        start: 0,
				        end: 100
				    }, {
				        start:0,
				        end: 100,
				        handleSize: '80%',
				        handleStyle: {
				            color: '#fff',
				            shadowBlur: 3,
				            shadowColor: 'rgba(0, 0, 0, 0.6)',
				            shadowOffsetX: 2,
				            shadowOffsetY: 2
				        }
				    }],
    series: [
        {
            name:'计划保养',
            type:'bar',
            barWidth: '15%',
			color: ['rgba(87,188,255,0.9)'],
            data:[82.0, 64.9, 67.0, 23.2, 68.6, 76.7, 85.6, 78.2],
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
            name:'实际保养',
            type:'bar',
            barWidth: '15%',
			color: ['rgba(87,188,255,0.9)'],
            data:[52.6, 95.9, 69.0, 86.4, 96.7, 86.7, 15.6, 82.2],
            itemStyle: {
                normal: {
					barBorderRadius:10,
					shadowBlur: 0,
					
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                        {offset: 0, color: '#a6b1ff'},
                        {offset: 1, color: '#676bff'},
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
            name:'完成率',
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
            data:[22.0, 82.2, 55.3, 65, 63, 90.2, 16.3, 68.4]
        }
    ]
};

myChart2 = echarts.init(document.getElementById('main6'));
myChart2.setOption(option2);
window.onresize = myChart2.resize; 

