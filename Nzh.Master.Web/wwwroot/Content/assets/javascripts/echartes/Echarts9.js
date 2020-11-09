
//echatrs配置
var myChart = echarts.init($('#main9')[0]);

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
        data:['最高得分','平均得分']
    },
    xAxis: [
        {
            type: 'category',
            data: ['班组A','班组B','班组C','班组D','班组E','班组F','班组G','班组H'],
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
            name: '得分',
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
            splitLine: {
				  show: true,
				  interval: 'auto',
				  lineStyle: {
				  color: ['#cad1e0'],
				  width: 1,
				  type: 'solid',
				  
				  shadowOffsetX: 0,
				  shadowOffsetY: 0,
				  opacity:1,
				  },
				  },
            
        },
       
        
    ],
     grid: {
		top:'20%',
        left: '1%',
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
            name:'最高得分',
            type:'bar',
            barWidth: '15%',
			color: ['rgba(87,188,255,0.9)'],
            data:[32.0, 4.9, 67.0, 83.2, 65.6, 76.7, 85.6, 88.2],
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
            name:'平均得分',
            type:'bar',
            barWidth: '15%',
			color: ['rgba(87,188,255,0.9)'],
            data:[2.6, 85.9, 59.0, 86.4, 28.7, 70.7, 15.6, 82.2],
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

myChart.setOption(option); window.onresize = myChart.resize; 
 option2 = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data:['发现质量问题','减少停机','发现来料问题']
    },
     color:['#289eff','#fad355','#ff8484'],
    series: [
        {
            name:'加分类别TOP3',
            type:'pie',
            radius: ['50%', '60%'],
            avoidLabelOverlap: true,
             itemStyle: {
									normal: {
										label:{
											show: true,
											formatter: function(param) {
												return param.name + ' : ' + Math.round(param.percent) + '%';
											},
											textStyle : {
												fontWeight : 'bolder'
											}
										}
									},
									emphasis : {
										label : {
											show : true,
											position : 'center',
											textStyle : {
												fontSize : '30',
												fontWeight : 'bold'
											}
										}
									}
										},
            label: {
                normal: {
                    show: true,
                   
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '24',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: true
                }
            },
            data:[
                {value:335, name:'发现质量问题'},
                {value:310, name:'减少停机'},
                {value:2234, name:'发现来料问题'},
                
            ]
        }
    ]
};
myChart2 = echarts.init(document.getElementById('main10'));
myChart2.setOption(option2);
window.onresize = myChart2.resize; 
option3 = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data:['上班玩手机','迟到','生产故障']
    },
     color:['#289eff','#fad355','#ff8484','#46cfa5','#c3c3c3'],
    series: [
        {
            name:'扣分类别top3',
            type:'pie',
            radius: ['50%', '60%'],
            avoidLabelOverlap: true,
             itemStyle: {
									normal: {
										label:{
											show: true,
											formatter: function(param) {
												return param.name + ' : ' + Math.round(param.percent) + '%';
											},
											textStyle : {
												fontWeight : 'bolder'
											}
										}
									},
									emphasis : {
										label : {
											show : true,
											position : 'center',
											textStyle : {
												fontSize : '30',
												fontWeight : 'bold'
											}
										}
									}
										},
            label: {
                normal: {
                    show: true,
                   
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '24',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: true
                }
            },
            data:[
                {value:335, name:'上班玩手机'},
                {value:310, name:'迟到'},
                {value:2234, name:'生产故障'},
              
            ]
        }
    ]
};
myChart3 = echarts.init(document.getElementById('main11'));
myChart3.setOption(option3);
window.onresize = myChart3.resize; 

