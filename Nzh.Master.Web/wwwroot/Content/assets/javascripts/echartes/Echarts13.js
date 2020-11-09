//X-bar管制图
var myChart = echarts.init($('#main113')[0]);
var option;
function LoadmyChart1() {
    option = {
        color: ['#409eff', '#5b9bd5', '#a5a5a5'],
        grid: {
            top: 10,
            bottom: 40,
            right: 25,
            left: 25,
        },
        title: {
            text: '',
            x: 'center',
            textStyle: {
                fontWeight: 400,
                fontSize: '13'
            }
        },
        tooltip: {
            trigger: 'axis',
            confine: true,
            textStyle: {
                fontSize: 12
            }
        },
        xAxis: {
            type: "category",
            data: ["1", "2", "3", "4", "5", "6", "7", "8"],
        },
        yAxis: {
            type: 'value',
            min: 1.5,
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            },
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
        series: [{
            name: "X-bar管制图",
            type: "line",
            markLine: {
                lineStyle: {
                    width: 2
                },
                label: {
                    position: "insideEndTop",
                    formatter: "{b}",
                    color: "#333"
                },
                symbolSize: 0,
                data: [{
                    name: "X-bar",
                    yAxis: 4.4,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                type: 'solid',
                                color: 'blue',
                            },
                            label: {
                                formatter: 'X-bar',
                            }
                        }
                    }
                }, {
                    name: "ULK",
                    yAxis: 4.6,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                type: 'solid',
                                color: '#f56c6c',
                            },
                            label: {
                                formatter: 'ULK',
                            }
                        }
                    }
                }, {
                    name: "Lk",
                    yAxis: 4.5,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                type: 'solid',
                                color: '#67c23a',
                            },
                            label: {
                                formatter: 'LK',
                            }
                        }
                    }
                },
                {
                    name: "LLK",
                    yAxis: 3.7,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                type: 'dash',
                                color: '#e6a23c',
                            },
                            label: {
                                formatter: 'LLK',
                            }
                        }
                    }
                },
                {
                    name: "USL",
                    yAxis: 3.48,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                type: 'solid',
                                color: '#53a8ff',
                            },
                            label: {
                                formatter: 'USL',
                            }
                        }
                    }
                },
                {
                    name: "SL",
                    yAxis: 2.53,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                type: 'dash',
                                color: '#909399',
                            },
                            label: {
                                formatter: 'SL',
                            }
                        }
                    }
                },
                {
                    name: "LSL",
                    yAxis: 2.7,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                type: 'solid',
                                color: '#7fc55d',
                            },
                            label: {
                                formatter: 'SL',
                            }
                        }
                    }
                },
                {
                    name: "LSL",
                    yAxis: 1.8,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                type: 'dash',
                                color: '#f56c6c',
                            },
                            label: {
                                formatter: 'SL',
                            }
                        }
                    }
                },
                ]
            },
            data: [3.56, 2.58, 3.61, 2.68, 4.58, 3.50, 2.68, 4.52],
            symbol: 'circle',
            symbolSize: 10,
        }]
    };
    myChart.setOption(option);
    window.onresize = myChart.resize;
}

//R管制图
myChart2 = echarts.init(document.getElementById('main114'));
var option2;
function LoadmyChart2() {
    option2 = {
        color: ['#409eff', '#5b9bd5', '#a5a5a5'],
        grid: {
            top: 10,
            bottom: 40,
            right: 25,
            left: 25,
        },
        title: {
            text: '',
            x: 'center',
            textStyle: {
                fontWeight: 400,
                fontSize: '13'
            }
        },
        tooltip: {
            trigger: 'axis',
            confine: true,
            textStyle: {
                fontSize: 12
            }
        },
        xAxis: {
            type: "category",
            data: ["1", "2", "3", "4", "5", "6", "7", "8"],
        },
        yAxis: {
            type: 'value',
            min: 1.5,
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            },
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
        series: [{
            name: "R管制图",
            type: "line",
            markLine: {
                lineStyle: {
                    width: 2
                },
                label: {
                    position: "insideEndTop",
                    formatter: "{b}",
                    color: "#333"
                },
                symbolSize: 0,
                data: [{
                    name: "X-bar",
                    yAxis: 4.4,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                type: 'solid',
                                color: 'blue',
                            },
                            label: {
                                formatter: 'X-bar',
                            }
                        }
                    }
                }, {
                    name: "ULK",
                    yAxis: 4.6,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                type: 'solid',
                                color: '#f56c6c',
                            },
                            label: {
                                formatter: 'ULK',
                            }
                        }
                    }
                },
                {
                    name: "USL",
                    yAxis: 3.48,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                type: 'solid',
                                color: '#53a8ff',
                            },
                            label: {
                                formatter: 'USL',
                            }
                        }
                    }
                },
                {
                    name: "SL",
                    yAxis: 2.53,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                type: 'dash',
                                color: '#909399',
                            },
                            label: {
                                formatter: 'SL',
                            }
                        }
                    }
                },
                {
                    name: "LSL",
                    yAxis: 2.7,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                type: 'solid',
                                color: '#7fc55d',
                            },
                            label: {
                                formatter: 'SL',
                            }
                        }
                    }
                },
                {
                    name: "LSL",
                    yAxis: 1.8,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                type: 'dash',
                                color: '#f56c6c',
                            },
                            label: {
                                formatter: 'SL',
                            }
                        }
                    }
                },
                ]
            },
            data: [3.56, 2.58, 3.61, 2.68, 4.58, 3.50, 2.68, 4.52],
            symbol: 'circle',
            symbolSize: 10,
        }]
    };
    myChart2.setOption(option2);
    window.onresize = myChart2.resize;
}

//正太分布图
myChart3 = echarts.init(document.getElementById('main115'));
var option3;
function LoadmyChart3() {
    option3 = {
        color: ['#e6a23c', '#5b9bd5', '#a5a5a5'],
        grid: {
            top: 20,
            bottom: 40,
            right: 10,
            left: 25,
        },
        title: {
            text: '',
            x: 'center',
            textStyle: {
                fontWeight: 400,
                fontSize: '13'
            }
        },
        tooltip: {
            trigger: 'axis',
            confine: true,
            textStyle: {
                fontSize: 12
            }
        },
        yAxis: [
            {
                type: 'value',
                name: '',
                min: 0,
                max: 6,
                interval: 1,
            }
        ],
        xAxis: [
            {
                type: 'category',
                min: 1.5,
                data: ['1.5', '2.5', '3.5', '4.5', '5.5', '6.5', '7.5', '8.5'],
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],

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
        series: [{
            name: "X-bar管制图",
            type: "line",

            data: [3.56, 2.58, 3.61, 2.68, 4.58, 3.50, 2.68, 4.52],
            symbol: 'circle',
            symbolSize: 10,
        }, {
            name: '计划保养',
            type: 'bar',
            barWidth: '15%',
            color: ['rgba(87,188,255,0.9)'],
            data: [3.5, 2.58, 3.61, 2.68, 4.58, 3.50, 2.68, 4.52],
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
            markLine: {
                lineStyle: {
                    width: 2
                },
                label: {
                    position: "insideEndTop",
                    formatter: "{b}",
                    color: "#333"
                },
                symbolSize: 0,
                data: [{
                    name: "X-bar",
                    xAxis: 5.4,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                type: 'solid',
                                color: 'blue',
                            },
                            label: {
                                formatter: 'X-bar',
                            }
                        }
                    }
                }, {
                    name: "ULK",
                    xAxis: 4.6,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                type: 'solid',
                                color: '#f56c6c',
                            },
                            label: {
                                formatter: 'ULK',
                            }
                        }
                    }
                }, {
                    name: "Lk",
                    xAxis: 6.5,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                type: 'solid',
                                color: '#67c23a',
                            },
                            label: {
                                formatter: 'LK',
                            }
                        }
                    }
                },
                {
                    name: "LLK",
                    xAxis: 3.7,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                type: 'dash',
                                color: '#e6a23c',
                            },
                            label: {
                                formatter: 'LLK',
                            }
                        }
                    }
                },
                {
                    name: "USL",
                    xAxis: 3.48,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                type: 'solid',
                                color: '#53a8ff',
                            },
                            label: {
                                formatter: 'USL',
                            }
                        }
                    }
                },
                {
                    name: "SL",
                    xAxis: 7.53,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                type: 'dash',
                                color: '#909399',
                            },
                            label: {
                                formatter: 'SL',
                            }
                        }
                    }
                },
                {
                    name: "LSL",
                    xAxis: 1.7,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                type: 'solid',
                                color: '#7fc55d',
                            },
                            label: {
                                formatter: 'SL',
                            }
                        }
                    }
                },
                {
                    name: "LSL",
                    xAxis: 1.8,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                type: 'dash',
                                color: '#f56c6c',
                            },
                            label: {
                                formatter: 'SL',
                            }
                        }
                    }
                },
                ]
            },

        }]
    };
    myChart3.setOption(option3);
    window.onresize = myChart3.resize;
}




