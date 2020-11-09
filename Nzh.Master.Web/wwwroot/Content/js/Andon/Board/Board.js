 
var width = $(document).width();
 $("#main").width(width*0.6); 
window.myChart = echarts.init(document.getElementById('main'));

function dayanalysis(xdata, ydata, zdata) {
    //echatrs配置
	//var myChart = echarts.getInstanceByDom(document.getElementById("main"));
	//echarts.dispose(myChart);  
   
 //   //var myChart = echarts.init($('#main')[0]);
    //if (myChart && !myChart.isDisposed()) { //判断图形已初始化,且未销毁
        //myChart.clear();           //释放图形资源
    //myChart.dispose();    //销毁实例对象
    //myChart = echarts.init(document.getElementById('main'));
    //}

    //var myChart = echarts.getInstanceByDom(document.getElementById("main"));
    //myChart = echarts.init(document.getElementById("main"));
    //if (!myChart) {
    //    myChart = echarts.init(document.getElementById("main"));
    //    this.$once('hook:beforeDestroy', function () {
    //        echarts.dispose(Chart);
    //    });
    //}

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
            data: ['损失工时', '损失工时占比',],
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
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '损失工时(min)',
                min: 0,
                //max: 100,
                //interval: 20,
                axisLabel: {
                    formatter: '{value}'
                },
                axisTick: {
                    show: false
                },
                //axisLabel: { //调整x轴的lable  
                //    textStyle: {
                //        fontSize: 16,// 让字体变大
                //        color: 'rgba(255,255,255,0.8)',
                //    }
                //},
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
                //axisLabel: { //调整x轴的lable  
                //    textStyle: {
                //        fontSize: 16,// 让字体变大
                //        color: 'rgba(255,255,255,0.8)',
                //    }
                //},
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
            top: '20%',
            left: '2%',
            right: '3%',
            bottom: '2%',
            containLabel: true
        },
        series: [

            {
                name: '损失工时',
                type: 'bar',
                barWidth: '28%',
                color: ['rgba(87,188,255,0.9)'],
                data: ydata,
                itemStyle: {
                    normal: {
                        barBorderRadius: 0,
                        shadowBlur: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.14)',
                        shadowOffsetX: 4,
                        shadowOffsetY: -4,
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                { offset: 0, color: '#2390AE' },
                                { offset: 1, color: '#2390AE' },
                            ]
                        ),

                    },
                    emphasis: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                { offset: 0, color: '#2390AE' },
                                { offset: 0.7, color: '#2390AE' },
                                { offset: 1, color: '#2390AE' }
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
                label: {  //显示参数
                   normal: {
                       show: true,
                       position: 'inside',
                       textStyle: {
                       color: '#edfffc',
                       fontStyle: 'normal',
                       fontWeight: 'normal',
                       fontSize: 12,
                       },
                       formatter: '{c} 分',
                   },
               	
               },
            },

            {
                name: '损失占比',
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
                                fontSize: '120%',

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
                                offset: 1, color: '#FF6600' // 0% 处的颜色
                            }, {
                                offset: 0, color: '#FF6600' // 100% 处的颜色
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
                data: zdata,

                axisLabel: {
                    normal: {
                        show: true,
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
	
    window.myChart.clear();
    window.myChart.setOption(option);   
}

var width2 = $(document).width();
$("#main2").width(width2 - 30);
window.myChart2 = echarts.init(document.getElementById('main2'));
function monthnalysis(xdata, ydata, zdata) {

    //if (myChart2 && !myChart2.isDisposed()) { //判断图形已初始化,且未销毁
    //    myChart2.clear();           //释放图形资源
    //    myChart2.dispose();    //销毁实例对象
    //    myChart2 = echarts.init(document.getElementById('main2'));
    //}
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
            data: ['损失工时', '损失工时占比',],
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
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '损失工时(min)',
                min: 0,
                //max: 100,
                //interval: 50,
                axisLabel: {
                    formatter: '{value}'
                },
                axisTick: {
                    show: false
                },
                axisLabel: { //调整x轴的lable  
                    textStyle: {
                        fontSize: 16,// 让字体变大
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
                        fontSize: 16,// 让字体变大
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
            top: '20%',
            left: '2%',
            right: '2%',
            bottom: '1%',
            containLabel: true
        },
        series: [

            {
                name: '损失工时',
                type: 'bar',
                barWidth: '35%',
                color: ['rgba(87,188,255,0.9)'],
                data: ydata,
                itemStyle: {
                    normal: {
                        barBorderRadius: 0,
                        shadowBlur: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.14)',
                        shadowOffsetX: 4,
                        shadowOffsetY: -4,
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                { offset: 0, color: '#2390AE' },
                                { offset: 1, color: '#2390AE' },
                            ]
                        ),

                    },
                    emphasis: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                { offset: 0, color: '#2390AE' },
                                { offset: 0.7, color: '#2390AE' },
                                { offset: 1, color: '#2390AE' }
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
                            formatter: '{c} 分',
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
                name: '损失工时占比',
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
                                offset: 1, color: '#FF6600' // 0% 处的颜色
                            }, {
                                offset: 0, color: '#FF6600' // 100% 处的颜色
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
                data: zdata,

                axisLabel: {
                    normal: {
                        show: true,
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

    window.myChart2 .clear();
    window.myChart2 .setOption(option2);  
   
    //var myChart2 = echarts.getInstanceByDom(document.getElementById("main"));
    //myChart2 = echarts.init(document.getElementById("main"));
    ////if (!myChart) {
    ////    myChart2 = echarts.init(document.getElementById("main"));
    ////    this.$once('hook:beforeDestroy', function () {
    ////        echarts.dispose(Chart);
    ////    });
    ////}
   

    //myChart2.setOption(option2);
    //window.onresize = myChart2.resize;
}