//加载第一个圆环（首检）
var myChart = echarts.init($('#main201')[0]);
var option;
function LoadmyChart(FirstCheck) {
    var dataStyle = {
        normal: {
            label: {
                show: false
            },
            labelLine: {
                show: false
            },
            shadowBlur: 0,
            shadowColor: '#203665'
        }
    };
    option = {
        series: [{
            name: '第一个圆环',
            type: 'pie',
            clockWise: false,
            radius: [70, 80],
            itemStyle: dataStyle,
            hoverAnimation: false,
            center: ['50%', '50%'],
            data: [{
                value: FirstCheck,
                label: {
                    normal: {
                        rich: {
                            a: {
                                color: '#3a7ad5',
                                align: 'center',
                                fontSize: 24,
                                fontWeight: "bold"
                            },
                            b: {
                                color: '#5a5a5a',
                                align: 'center',
                                fontSize: 18
                            }
                        },
                        formatter: function (params) {
                            return FirstCheck +"%"+ "\n\n首检合格率";
                        },
                        position: 'center',
                        show: true,
                        textStyle: {
                            fontSize: '16',
                            fontWeight: 'normal',
                            color: '#5a5a5a'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#198dff',
                        shadowColor: '#35aeff',
                        shadowBlur: 0
                    }
                }
            }, {
                value: 100 - FirstCheck,
                name: 'invisible',
                itemStyle: {
                    normal: {
                        color: '#e9ecf0'
                    },
                    emphasis: {
                        color: '#e9ecf0'
                    }
                }
            }]
        }]
    };
    myChart.clear();
    myChart.setOption(option);
}

//加载第二个圆环（全检）
var myChart2 = echarts.init(document.getElementById('main202'));
var option2;
function LoadmyChart2(AllCheck) {
    var dataStyle2 = {
        normal: {
            label: {
                show: false
            },
            labelLine: {
                show: false
            },
            shadowBlur: 0,
            shadowColor: '#203665'
        }
    };
    option2 = {
        series: [{
            name: '第二个圆环',
            type: 'pie',
            clockWise: false,
            radius: [70, 80],
            itemStyle: dataStyle2,
            hoverAnimation: false,
            center: ['50%', '50%'],
            data: [{
                value: AllCheck,
                label: {
                    normal: {
                        rich: {
                            a: {
                                color: '#3a7ad5',
                                align: 'center',
                                fontSize: 24,
                                fontWeight: "bold"
                            },
                            b: {
                                color: '#5a5a5a',
                                align: 'center',
                                fontSize: 18
                            }
                        },
                        formatter: function (params) {
                            return AllCheck + "%" + "\n\n全检合格率";
                        },
                        position: 'center',
                        show: true,
                        textStyle: {
                            fontSize: '16',
                            fontWeight: 'normal',
                            color: '#5a5a5a'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#63d14f',
                        shadowColor: '#63d14f',
                        shadowBlur: 0
                    }
                }
            }, {
                value: 100 - AllCheck,
                name: 'invisible',
                itemStyle: {
                    normal: {
                        color: '#e9ecf0'
                    },
                    emphasis: {
                        color: '#e9ecf0'
                    }
                }
            }]
        }]
    };
    myChart2.setOption(option2);
    window.onresize = myChart2.resize;
}

//加载第三个圆环（抽检）
var myChart3 = echarts.init(document.getElementById('main203'));
var option3;
function LoadmyChart3(RandomCheck) {
    var dataStyle3 = {
        normal: {
            label: {
                show: false
            },
            labelLine: {
                show: false
            },
            shadowBlur: 0,
            shadowColor: '#203665'
        }
    };
    option3 = {
        series: [{
            name: '第三个圆环',
            type: 'pie',
            clockWise: false,
            radius: [70, 80],
            itemStyle: dataStyle3,
            hoverAnimation: false,
            center: ['50%', '50%'],
            data: [{
                value: RandomCheck,
                label: {
                    normal: {
                        rich: {
                            a: {
                                color: '#3a7ad5',
                                align: 'center',
                                fontSize: 24,
                                fontWeight: "bold"
                            },
                            b: {
                                color: '#5a5a5a',
                                align: 'center',
                                fontSize: 18
                            }
                        },
                        formatter: function (params) {
                            return RandomCheck + "%" + "\n\n抽检合格率";
                        },
                        position: 'center',
                        show: true,
                        textStyle: {
                            fontSize: '16',
                            fontWeight: 'normal',
                            color: '#5a5a5a'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#f7a51c',
                        shadowColor: '#f7a51c',
                        shadowBlur: 0
                    }
                }
            }, {
                value: 100 - RandomCheck,
                name: 'invisible',
                itemStyle: {
                    normal: {
                        color: '#e9ecf0'
                    },
                    emphasis: {
                        color: '#e9ecf0'
                    }
                }
            }]
        }]
    };
    myChart3.setOption(option3);
    window.onresize = myChart3.resize;
}

//生产产能
var option4;
var myChart4 = echarts.init(document.getElementById('main204'));
function LoadmyChart4(x, y) {
    option4 = {
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
            data: ['实际产量']
        },
        xAxis: [
            {
                type: 'category',
                data: x,
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
                        color: '#5a5a5a',
                        width: 0,
                        type: 'solid',
                    },
                },
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '实际产量',
                min: 0,
                //max: 100,
                interval: 10000,
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
                        color: ['#dcdfe6'],
                        width: 1,
                        type: 'dashed',
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        opacity: 1,
                    },
                },
            },
        ],
        grid: {
            top: '12%',
            left: '1%',
            right: '1%',
            bottom: '18%',
            containLabel: true
        },
        dataZoom: [{
            type: 'slider',
            show: true,
            height: 24,
            left: '1%',
            right: '1%',
            bottom: '0%',
            start: 0,
            end: 100,
            borderColor: "#dcdfe6",
            fillerColor: '#ecf5ff',
            borderRadius: 5,
            backgroundColor: '#f4f4f5 ',//两边未选中的滑动条区域的颜色
            showDataShadow: false,//是否显示数据阴影 默认auto
            showDetail: true,//即拖拽时候是否显示详细数值信息 默认true
            realtime: true, //是否实时更新
            filterMode: 'filter',
            textStyle: {
                color: '#222',
                fontSize: 12,
            },
        }, {
            type: 'inside'
        }
        ],
        series: [
            {
                name: '产能数据',
                type: 'bar',
                barWidth: '12%',
                color: ['rgba(87,188,255,0.9)'],
                data: y,
                itemStyle: {
                    normal: {
                        barBorderRadius: 10,
                        shadowBlur: 0,
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                { offset: 0, color: '#36affe' },
                                { offset: 1, color: '#1b8fff' },
                            ]
                        ),
                        label: {
                            show: true, //开启显示
                            position: 'top', //在上方显示
                            textStyle: { //数值样式
                                color: '#409eff',
                                fontSize: 16,
                            }
                        }
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
    myChart4.setOption(option4);
    window.onresize = myChart4.resize; 
}

