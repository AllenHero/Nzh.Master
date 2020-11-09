//echatrs配置
var myChart = echarts.init($('#main5')[0]);
var myChart2 = echarts.init(document.getElementById('main6'));

function LoadChartData(OrganizeId, equipmenttype) {
    var dataArray = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    var dataArray2 = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    $.ajax({
        url: "/api/TPM/Equipment_Statistical/GetPlanCollectionNew?OrganizeId=" + OrganizeId + "&equipmenttype=" + equipmenttype,
        sync: false,
        success: function (value) {
            dataArray = [[], [], [], []];
            for (var i = 0; i < value["firstData"].length; i++) {
                dataArray[0].push(value["firstData"][i].recordTime);
                dataArray[1].push(Number(value["firstData"][i].recordSum));
                dataArray[2].push(Number(value["firstData"][i].okrecord));
                dataArray[3].push(value["firstData"][i].rate);
            }
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
                    data: ['总保养次数', '准时保养次数', '准时保养率']
                },
                xAxis: [
                    {
                        type: 'category',
                        data: dataArray[0],
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
                        //min: 0,
                        //max: 10,
                        minInterval: 1,
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
                        name: '准时保养率%',
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
                    top: '20%',
                    left: '3%',
                    right: '1%',
                    bottom: '8%',
                    containLabel: true
                },
                dataZoom: [{
                    type: 'inside',
                    start: 0,
                    //end: 100
                }, {
                    start: 0,
                    //end: 100,
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
                        name: '总保养次数',
                        type: 'bar',
                        barWidth: '15%',
                        color: ['rgba(87,188,255,0.9)'],
                        data: dataArray[1],
                        itemStyle: {
                            normal: {
                                barBorderRadius: 10,
                                shadowBlur: 0,
                                color: '#36affe'
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
                        name: '准时保养次数',
                        type: 'bar',
                        barWidth: '15%',
                        color: ['rgba(87,188,255,0.9)'],
                        data: dataArray[2],
                        itemStyle: {
                            normal: {
                                barBorderRadius: 10,
                                shadowBlur: 0,
                                color: '#a6b1ff'
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
                        name: '准时保养率',
                        type: 'line',
                        itemStyle: {
                            normal: {
                                color: '#ffcc2f',
                                borderWidth: 0,
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
                                width: 3,
                                borderType: 'solid',
                            },
                        },
                        yAxisIndex: 1,
                        data: dataArray[3]
                    }
                ]
            };
            myChart.setOption(option);
            window.onresize = myChart.resize; 

            dataArray2 = [[], [], [], []];
            for (var i = 0; i < value["secondData"].length; i++) {
                dataArray2[0].push(value["secondData"][i].recordTime);
                dataArray2[1].push(Number(value["secondData"][i].recordSum));
                dataArray2[2].push(Number(value["secondData"][i].okrecord));
                dataArray2[3].push(value["secondData"][i].rate);
            }
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
                    data: ['总保养次数', '准时保养次数', '准时保养率']
                },
                xAxis: [
                    {
                        type: 'category',
                        data: dataArray2[0],
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
                        // min: 0,
                        //max: 100,
                        //interval: 20,
                        minInterval: 1,
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
                        name: '准时保养率%',
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
                    top: '20%',
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
                    start: 0,
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
                        name: '总保养次数',
                        type: 'bar',
                        barWidth: '15%',
                        color: ['rgba(87,188,255,0.9)'],
                        data: dataArray2[1],
                        itemStyle: {
                            normal: {
                                barBorderRadius: 10,
                                shadowBlur: 0,
                                color: '#36affe'

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
                        name: '准时保养次数',
                        type: 'bar',
                        barWidth: '15%',
                        color: ['rgba(87,188,255,0.9)'],
                        data: dataArray2[2],
                        itemStyle: {
                            normal: {
                                barBorderRadius: 10,
                                shadowBlur: 0,
                                color: '#a6b1ff'

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
                        name: '准时保养率',
                        type: 'line',
                        itemStyle: {
                            normal: {
                                color: '#ffcc2f',
                                borderWidth: 0,
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
                                width: 3,
                                borderType: 'solid',


                            },

                        },
                        yAxisIndex: 1,
                        data: dataArray2[3]
                    }
                ]
            };

            myChart2.setOption(option2);
            window.onresize = myChart2.resize; 
        }
    });
}




