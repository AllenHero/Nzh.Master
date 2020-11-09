//异常损失工时趋势
var option;
function LoadmyChart(DateList, LossTimeList) {
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
            data: ['损失工时(min)'],
        },
        xAxis: [
            {
                type: 'category',
                //data: ['2019/1/1', '2019/1/2', '2019/1/3', '2019/1/4', '2019/1/5', '2019/1/6', '2019/1/7'],
                data: DateList,
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
                name: '损失工时(min)',
                min: 0,
                //max: 100,
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
            top: '20%',
            left: '3%',
            right: '1%',
            bottom: '8%',
            containLabel: true
        },
        dataZoom: [{
            type: 'slider',
            show: true,
            height: 18,
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
                name: '损失工时(min)',
                type: 'line',
                borderwidth: '4',
                //data: [82.0, 64.9, 67.0, 23.2, 68.6, 76.7, 85.6],
                data: LossTimeList,
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
                                offset: 0, color: '#289eff' // 0% 处的颜色
                            }, {
                                offset: 0, color: '#289eff' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                        width: 3,
                        borderType: 'solid',
                    },
                },
            },
        ]
    };  
    var myChart = echarts.init($('#main')[0]);
    myChart.setOption(option);
    window.onresize = myChart.resize;
}


//当天异常损失工时时间点
var option2;
function LoadmyChart2(DateList, LossTimeList) {
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
            data: ['损失工时(min)'],
        },
        xAxis: [
            {
                type: 'category',
                //data: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
                data: DateList,
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
                name: '损失工时(min)',
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
            top: '20%',
            left: '3%',
            right: '1%',
            bottom: '8%',
            containLabel: true
        },
        dataZoom: [{
            type: 'slider',
            show: true,
            height: 18,
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
                name: '损失工时(min)',
                type: 'line',
                borderwidth: '4',
                //data: [82.0, 64.9, 67.0, 23.2, 68.6, 76.7, 85.6],
                data: LossTimeList,
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
                                offset: 0, color: '#289eff' // 0% 处的颜色
                            }, {
                                offset: 0, color: '#289eff' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                        width: 3,
                        borderType: 'solid',
                    },
                },
            },
        ]
    };
    myChart2 = echarts.init(document.getElementById('main2'));
    myChart2.setOption(option2);
    window.onresize = myChart2.resize; 
}

//异常大类
var option3;
function LoadmyChart3(ExceptionClassLsit, x, type) {
    option3 = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            //data: ['工艺/品质', '设备', '生产', '检料', '暂无数据']
            data: ExceptionClassLsit
        },
        color: ['#289eff', '#fad355', '#ff8484', '#46cfa5', '#c3c3c3'],
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: ['50%', '60%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: function (param) {
                                return param.name + ' : ' + Math.round(param.percent) + '%';
                            },
                            textStyle: {
                                fontWeight: 'bolder'
                            }
                        }
                    },
                    emphasis: {
                        label: {
                            show: true,
                            position: 'center',
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    }
                },
                label: {
                    normal: {
                        show: false,

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
                //data: [
                //    { value: 335, name: '工艺/品质' },
                //    { value: 310, name: '设备' },
                //    { value: 2234, name: '生产' },
                //    { value: 135, name: '检料' },
                //    { value: 148, name: '暂无数据' }
                //]
                data: x
            }
        ]
    };
    myChart3 = echarts.init(document.getElementById('main3'));
    myChart3.setOption(option3);
    window.onresize = myChart3.resize; 

    // 解决点击事件调用n次的问题
    // 1、清除画布
    myChart3.clear();
    // 2、调用setOption
    myChart3.setOption(option3);
    //3、在渲染点击事件之前先清除点击事件
    // triggerEvent为true时，触发点击事件
    myChart3.on('click', function (params) {
        GetExceptionClassify(params.data.id, type);
    });
}

function GetExceptionClassify(Id, type) {
    alert(Id);
    alert(type);
}

//异常小类
var option4;
function LoadmyChart4() {
    option4 = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data: ['外观破损', '设备陈旧', '零部件缺损', '屏幕显示异常', '设备维修不及时']
        },
        color: ['#289eff', '#fad355', '#ff8484', '#46cfa5', '#c3c3c3'],
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: ['50%', '60%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: function (param) {
                                return param.name + ' : ' + Math.round(param.percent) + '%';
                            },
                            textStyle: {
                                fontWeight: 'bolder'
                            }
                        }
                    },
                    emphasis: {
                        label: {
                            show: true,
                            position: 'center',
                            textStyle: {
                                fontSize: '18',
                                fontWeight: 'bold'
                            }
                        }
                    }
                },
                label: {
                    normal: {
                        show: false,

                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '18',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: true
                    }
                },
                data: [
                    { value: 25, name: '外观破损' },
                    { value: 30, name: '设备陈旧' },
                    { value: 30, name: '零部件缺损' },
                    { value: 10, name: '屏幕显示异常' },
                    { value: 5, name: '设备维修不及时' }
                ]
            }
        ]
    };
    myChart4 = echarts.init(document.getElementById('main4'));
    myChart4.setOption(option4);
    window.onresize = myChart4.resize;  
}



 
 
 