function MyChartsOnTime(text, ontime) {
    //echatrs配置
    var myChart = echarts.init($('#main101')[0]);
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
            data: ['', '']
        },
        xAxis: [
            {
                type: 'category',
                data: text,//['1线', '2线', '3线'],
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
                axisLable: {
                    interval: 0,
                    rotate: 60
                },
            }
        ],
        yAxis: [
            {
                type: 'value',
                //name: '准时完工工单数',
                min: 0,
                //max: 1000,
                //interval: 10,
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
                        opacity: 1,
                    },
                },

            },


        ],
        grid: {
            top: '20%',
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
                //name: '准时完工工单数',
                type: 'bar',
                barWidth: '15%',
                label: {  //显示参数
                    normal: {
                        show: true,
                        position: 'top',
                    },
                },
                data: ontime,//[320, 569, 670],
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

                    },
                },
            },


        ]
    };
    myChart.clear();
    myChart.setOption(option);
    window.onresize = myChart.resize;
}
function MyChartsOnTimeRate(text, ontimerate) {
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
            data: ['', '']
        },
        xAxis: [
            {
                type: 'category',
                data: text,//['1线', '2线', '3线'],
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
                axisLable: {
                    interval: 0,
                    rotate: 60
                },
            }
        ],
        yAxis: [
            {
                type: 'value',
                //name: '工单准时完工率',
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
                splitLine: {
                    show: true,
                    interval: 'auto',
                    lineStyle: {
                        color: ['#cad1e0'],
                        width: 1,
                        type: 'solid',

                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        opacity: 1,
                    },
                },

            },


        ],
        grid: {
            top: '20%',
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
                //name: '工单准时完工率',
                type: 'line',
                barWidth: '15%',
                color: ['#2ca3fe'],
                data: ontimerate,//[32.0, 56.9, 67.0],
                label: {  //显示参数
                    normal: {
                        show: true,
                        position: 'top',
                    },
                },
                itemStyle: {
                    normal: {
                        //color: "#4A76C6",
                        label: {
                            show: true,
                            position: 'bottom',
                            formatter: '{c} %',
                        }
                    }
                }
            },


        ]
    };

    var myChart2 = echarts.init(document.getElementById('main102'));
    myChart2.clear();
    myChart2.setOption(option2);
    window.onresize = myChart2.resize;
}
function MyChartsOverTime(text, overtime) {
    option3 = {
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
            data: ['', '']
        },
        xAxis: [
            {
                type: 'category',
                data: text,//['1线', '2线', '3线'],
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
                //name: '超期工单数量',
                min: 0,
                max: 100,
                interval: 10,
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
                splitLine: {
                    show: true,
                    interval: 'auto',
                    lineStyle: {
                        color: ['#cad1e0'],
                        width: 1,
                        type: 'solid',

                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        opacity: 1,
                    },
                },

            },


        ],
        grid: {
            top: '20%',
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
                //name: '超期工单数量',
                type: 'bar',
                barWidth: '15%',
                color: ['#2ca3fe'],
                //color: ['rgba(87,188,255,0.9)'],
                data: overtime,//[520, 569, 680],
                label: {  //显示参数
                    normal: {
                        show: true,
                        position: 'top',
                    },
                },
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
                            show: true,
                            position: 'bottom',
                            formatter: '{c} %',
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

    var myChart3 = echarts.init(document.getElementById('main103'));
    myChart3.clear();
    myChart3.setOption(option3);
    window.onresize = myChart3.resize;
}
function MyChartsOverDay(text, overday) {
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
            data: ['', '']
        },
        xAxis: [
            {
                type: 'category',
                data: text,//['1线', '2线', '3线'],
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
                //name: '超期累计超期天数',
                min: 0,
                //max: 100,
                //interval: 10,
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
                        opacity: 1,
                    },
                },

            },


        ],
        grid: {
            top: '20%',
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
                //name: '超期累计超期天数',
                type: 'bar',
                barWidth: '15%',
                color: ['rgba(87,188,255,0.9)'],
                data: overday,//[10, 13, 28],
                label: {  //显示参数
                    normal: {
                        show: true,
                        position: 'top',
                    },
                },
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

    var myChart4 = echarts.init(document.getElementById('main104'));
    myChart4.clear();
    myChart4.setOption(option4);
    window.onresize = myChart4.resize;

}