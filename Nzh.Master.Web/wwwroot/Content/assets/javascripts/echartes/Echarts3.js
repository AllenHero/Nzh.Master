
//echatrs配置
var myChart = echarts.init($('#main1')[0]);

//图表change事件
myChart.on('click', function (params) {
    $("#spanDate").html(params.name + "-01");
    var TeamId = $("#ddlWorkTeam").find("option:selected").val();
    BindData(TeamId);
});

//加载
function LoadmyChart(category, barData1, barData2) {
    // option
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
            data: ['绩效优良', '绩效不良'],
            textStyle: {
                color: '#222'
            }
        },
        xAxis: {
            type: 'category',
            data: category,
            axisTick: {
                alignWithLabel: true
            },
            axisLine: {
                show: true,
                onZero: true,
                lineStyle: {
                    color: '#000000',
                    width: 0,
                    type: 'solid',
                }
            },
            splitLine: {
                show: true,
                interval: 'auto',
                lineStyle: {
                    color: ['#000000'],
                    width: 0,
                    type: 'solid',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    opacity: 1,
                },
            },
            axisLabel: {
                fontsize: 2,
                align: 'center',
                color: 'rgba(255,255,255,0.5)',
                formatter: function (value) {
                    return value + "月";
                }
            }
        },
        yAxis: [{
            type: 'value',
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(255,255,255,0.5)'
                }
            },
            axisLine: {
                show: true,
                onZero: true,
                lineStyle: {
                    color: '#000000',
                    width: 0,
                },
            },
            splitLine: {
                show: true,
                interval: 'auto',
                lineStyle: {
                    color: ['#000000'],
                    width: 1,
                    type: 'solid',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    opacity: 1,
                },
            },
            axisLabel: {
                fontWeight: 10,
                fontsize: 5,
                color: 'rgba(255,255,255,0.3)'
            }
        }],
        grid: {
            top: '20%',
            left: '3%',
            right: '1%',
            bottom: '8%',
            containLabel: true
        },
        series: [{
            name: '绩效优良',
            type: 'bar',
            stack: '总量',
            barWidth: 10,
            itemStyle: {
                normal: {
                    barBorderRadius: 50,
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            { offset: 0, color: '#39b2fe' },
                            { offset: 1, color: '#188cff' }
                        ]
                    )
                }
            },
            data: barData1
        }, {
            name: '绩效不良',
            type: 'bar',
            stack: '总量',
            barWidth: 10,
            itemStyle: {
                normal: {
                    barBorderRadius: 50,
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            { offset: 0, color: '#e43614' },
                            { offset: 1, color: '#fd6537' }
                        ]
                    )
                }
            },
            data: barData2
        }]
    };
    myChart.setOption(option);
    window.onresize = myChart.resize; 
}


