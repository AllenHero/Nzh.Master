var myChart = echarts.init(document.getElementById('main2'));
function ShowHourData(xdata, ydata) {
    option = {
        title: {
            x: 'center',
            text: '小时产量',
            color:"#FFF"
        },
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
            show: false,
            data: ['产量',],
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
                        fontSize: 14,// 让字体变大
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
                        fontSize: '14',
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
                name: '小时产量',
                min: 0,
                interval: 200,
                axisLabel: {
                    formatter: '{value}'
                },
                axisTick: {
                    show: false
                },
                axisLabel: { //调整x轴的lable  
                    textStyle: {
                        fontSize: 14,// 让字体变大
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
            bottom: '2%',
            containLabel: true
        },
        series: [

            {
                name: '产量',
                type: 'bar',
                barWidth: '20%',
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
                                { offset: 0, color: '#1786f9' },
                                { offset: 1, color: '#37abf8' },
                            ]
                        ),
                        label: {
                            show: true, //开启显示
                            position: 'top', //在上方显示
                            textStyle: { //数值样式
                                color: '#FFF',
                                fontSize: 13
                            }
                        }
                    },
                    emphasis: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                { offset: 0, color: '#1786f9' },
                                { offset: 0.7, color: '#37abf8' },
                                { offset: 1, color: '#2390AE' }
                            ]
                        )
                    }
                }
            },
        ],
    };
    myChart.clear();
    myChart.setOption(option);
    window.onresize = myChart.resize;
};