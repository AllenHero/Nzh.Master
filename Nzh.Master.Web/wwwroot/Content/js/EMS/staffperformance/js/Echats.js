var myChart = echarts.init($('#main2')[0]);
window.onresize = myChart.resize;
$(function(){
option = {
    backgroundColor: "#03141c",
    title: {
        text: "84%",
        subtext: '完成部门占比',
        x: 'center',
        y: 'center',
        textStyle: {
            color: "#fff",
            fontSize: 30,
            fontWeight: 'normal'
        },
        subtextStyle: {
            color: "rgba(255,255,255,.45)",
            fontSize: 14,
            fontWeight: 'normal'
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        x: 'center',
        y: 'bottom',
        data: ['rose3', 'rose5', 'rose6', 'rose7', 'rose8']
    },
    calculable: true,
    series: [

        {
            name: '面积模式',
            type: 'pie',
            radius: [100, 130],
            center: ['50%', '50%'],
            data: [{
                    value: 34,
                    name: '吴际帅\n牛亚莉',
                    itemStyle: {

                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                            offset: 0,
                            color: '#f6e3a1'
                        }, {
                            offset: 1,
                            color: '#ff4236'
                        }])
                    },
                    label: {
                        color: "rgba(255,255,255,.45)",
                        fontSize: 14,
                        formatter: '完成梳理部门\n{a|34}个',
                        rich: {
                            a: {
                                color: "#fff",
                                fontSize: 20,
                                lineHeight: 30
                            },
                        }
                    }
                },
                {
                    value: 52,
                    name: 'rose2',
                    itemStyle: {
                        color: "transparent"
                    }
                }
            ]
        },
        {
            name: '面积模式',
            type: 'pie',
            radius: [110, 120],
            center: ['50%', '50%'],
            data: [{
                    value: 34,
                    name: '吴际帅\n牛亚莉',
                    itemStyle: {
                        color: "transparent"
                    }
                },
                {
                    value: 52,
                    name: 'rose2',
                    itemStyle: {

                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                            offset: 0,
                            color: '#348fe6'
                        }, {
                            offset: 1,
                            color: '#625bef'
                        }])
                    },
                    label: {
                        color: "rgba(255,255,255,.45)",
                        fontSize: 14,
                        formatter: '部门总量\n{a|52}个',
                        rich: {
                            a: {
                                color: "#fff",
                                fontSize: 20,
                                lineHeight: 30
                            },
                        }
                    }
                }
            ]
        }
    ]
};

myChart.setOption(option);
var width = $(document).width();
$("#main2").width(width - 30);
var main2 = echarts.init(document.getElementById('main2'));
	main2.setOption(option);
	setTimeout(function (){
	    window.onresize = function () {
	    	main2.resize();
	    }
	},200)
	
})