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

