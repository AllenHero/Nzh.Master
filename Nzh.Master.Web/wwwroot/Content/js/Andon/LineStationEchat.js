//异常数据分析
function GetExceptionAnalysis() {
    $.ajax({
        url: '/api/Andon/andon/GetExceptionDayAnalysis?LineCode=' + LineCode,
        type: 'get',
        success: function (value) {
            if (value.status) {
                var obj = value.message;
                var x = [];
                var y = [];
                var z = [];
                var times = 0;
                $.each(obj, function (index, item) {
                    times += parseInt(item.LossTime);
                });
                var flag = 0;
                $.each(obj, function (index, item) {
                    x.push(item.ExceptionName);
                    var datas = {
                        value: item.LossTime,
                        name: item.ExceptionName
                    }
                    if (item.LossTime > 0)
                        flag = 1;
                    y.push(datas);

                    //z.push((parseInt(item.LossTime) * 100.0 / times).toFixed(2));
                });
                if (flag == 0)
                    //document.getElementById('pie-charts').innerText = "暂无数据";
                {
                    x.push("暂无数据")
                    var datas = {
                        value: 100,
                        name: "暂无数据"
                    }
                    y.push(datas);
                    
                }

                dayanalysis(x, y);
            }
        }
    });

    $.ajax({
        url: '/api/Andon/andon/GetExceptionMonthAnalysis?LineCode=' + LineCode,
        type: 'get',
        success: function (value) {
            if (value.status) {
                var obj = value.message;
                var x = [];
                var y = [];
                var z = [];
                var times = 0;
                $.each(obj, function (index, item) {
                    times += parseInt(item.LossTime);
                });
                if (times == 0)
                    times = 1;
                $.each(obj, function (index, item) {
                    x.push(item.ExceptionOrder);
                    y.push(item.LossTime);
                    var cout = (parseInt(item.LossTime) * 100.0 / times);
                    if (cout == 0)
                        z.push(0)
                    else
                        z.push(cout.toFixed(1));
                    //z.push((parseInt(item.LossTime) * 100.0 / times).toFixed(2));
                });
                monthnalysis(x, y, z);
            }
        }
    });
}
// 图表
function dayanalysis(x, y) {
    var pieCharts = echarts.init(document.getElementById('pie-charts'));

    pieCharts.setOption({
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: '400px',
            y: 'center',
            data: x
        },
        color: ['#3aa0ff', '#36cbcb', '#4dcb73', '#fad337', '#f2637b', '#975fe4'],
        series: [{
            name: '访问来源',
            type: 'pie',
            radius: ['35%', '50%'],
            center: ['35%', '50%'],
            selectedMode: 'single',
            startAngle: 90,
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
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
            data: y
        }]
    });

}
function monthnalysis(x,y,z) {

    var lineCharts = echarts.init(document.getElementById('line-charts'));
    lineCharts.setOption({
        tooltip: {
            trigger: 'axis'
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: x
        }],
        yAxis: [{
            type: 'value',
        }],
        grid: {
            borderWidth: 0,
            y: '20%',
            x: 40,
            y2: '32%'
        },
        color: ['#1890ff'],
        series: [{
            name: '损失工时',
            type: 'line',
            stack: '总量',
            data: y
        }]
    });
}