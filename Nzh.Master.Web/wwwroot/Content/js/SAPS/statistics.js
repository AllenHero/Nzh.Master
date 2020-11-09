var workplace = JSON.parse(getCookie("workplace"));
var result = {Line:[],Customer:[],Product:[]};
$(function () {
    //GetOverdue();
    //GetCurrentDay();
    GetAnalysis();
    $("button[ group=current]").click(function () {
        $("input[name=PlanDate]").val("");
        $("button[ group=current]").removeClass("btn-active");
        $(this).addClass("btn-active");
        GetAnalysis();
    });
    $("button[name=find]").click(function () {
        //GetOverdue();
        //GetCurrentDay();
        GetAnalysis();
    });
    $("div[name=ontime]").click(function () {
        var Group = $("select[name=group]").val();
        var sort = $(this).attr("sort");
        if (sort == "H") {
            LOnTime(Group);
            $(this).attr("sort","L");
        } else {
            HOnTime(Group);
            $(this).attr("sort", "H");
        }
    });
    $("div[name=ontimerate]").click(function () {
        var Group = $("select[name=group]").val();
        var sort = $(this).attr("sort");
        if (sort == "H") {
            LOnTimeRate(Group);
            $(this).attr("sort", "L");
        } else {
            HOnTimeRate(Group);
            $(this).attr("sort", "H");
        }
    });
    $("div[name=overtime]").click(function () {
        var Group = $("select[name=group]").val();
        var sort = $(this).attr("sort");
        if (sort == "H") {
            LOverTime(Group);
            $(this).attr("sort", "L");
        } else {
            HOverTime(Group);
            $(this).attr("sort", "H");
        }
    });
    $("div[name=overday]").click(function () {
        var Group = $("select[name=group]").val();
        var sort = $(this).attr("sort");
        if (sort == "H") {
            LOverDay(Group);
            $(this).attr("sort", "L");
        } else {
            HOverDay(Group);
            $(this).attr("sort", "H");
        }
    });
    $("#daterange2").click(function () {
        $("button[group=current]").removeClass("btn-active");
    });
})

function GetOverdue() {
    //var WorkShopId = "", LineId = "";
    var organizeId
    //if ($("select[name=line]").val())
    //    LineId = $("select[name=line]").val();
    //if ($("select[name=workshop]").val())
    //    WorkShopId = $("select[name=workshop]").val();
    $.ajax({
        url: '/api/saps/workorder/GetCurrentDay?OrganizeId=' + organizeId,//WorkShopId=' + WorkShopId + '&LineId=' + LineId,
        success: function (value) {
            var text = [], serial = [];
            if (value.status) {
                $.each(value.rows, function (index, item) {
                    text.push(item.Text);
                    serial.push(item.Value)
                })
            }
            echartBar(text, serial);
        }
    });
}

function GetCurrentDay() {
    //var WorkShopId = "", LineId = "";
    //if ($("select[name=line]").val())
    //    LineId = $("select[name=line]").val();
    //if ($("select[name=workshop]").val())
    //    WorkShopId = $("select[name=workshop]").val();
    var organizeId
    $.ajax({
        url: '/api/saps/workorder/GetOverdue?OrganizeId=' + organizeId,//WorkShopId=' + WorkShopId + '&LineId=' + LineId,
        success: function (value) {
            var text = [], serial = [];
            if (value.status) {
                $.each(value.rows, function (index, item) {
                    text.push(item.Text);
                    serial.push({ name: item.Text, value: item.Value })
                })
            }
            echartPie(text, serial);
        }
    });
}

function echartPie(x,y) {
    var myChart2 = echarts.init(document.getElementById('main102'));

    option2 = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data: x
        },
        color: ['#289eff', '#fad355', '#ff8484'],
        series: [
            {
                name: '超期天数',
                type: 'pie',
                radius: ['50%', '60%'],
                avoidLabelOverlap: true,
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
                        show: true,

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
                data: y
            }
        ]
    };

    myChart2.clear();
    myChart2.setOption(option2);
    window.onresize = myChart2.resize;
}

function echartBar(x,y) {
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
            data: ['最高得分', '平均得分']
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
                name: '工单数',
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
                name: '工单数',
                type: 'bar',
                barWidth: '15%',
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
    myChart.clear();
    myChart.setOption(option);
    window.onresize = myChart.resize;
}

function GetAnalysis() {
    var Group = $("select[name=group]").val();
    var Period = $(".btn-active").attr("name");
    var PlanDate = $("input[name=PlanDate]").val();
    $.ajax({
        url: '/api/saps/workorder/GetAnalysis?Period=' + Period + '&PlanDate=' + PlanDate + '&Group=' + Group,
        beforeSend: jQueryShowLoading(),//显示加载图标
        success: function (value) {
            jQuery('body').hideLoading();//隐藏加载图标
            HSort();
            if (value.status) {
                result = value.rows;
                HSort(Group);
            }
        }
    });
}
//从高到低
function HSort(Period) {
    HOnTime(Period);
    HOnTimeRate(Period);
    HOverTime(Period);
    HOverDay(Period);
}
function HOnTime(Period)
{
    var ontime = [], ontimeText = [];
    if (result.HOnTime) {
        $.each(result.HOnTime, function (index, item) {
            if (index > 9)
                return false;
            ontime.push(item.Value);
            if (Period == "Product")
                ontimeText.push(item.Code);
            else
                ontimeText.push(item.Text);
        })
    }
    MyChartsOnTime(ontimeText, ontime);
}
function HOnTimeRate(Period)
{
    var ontimerate = [], ontimerateText = [];
    if (result.HOntimeRate) {
        $.each(result.HOntimeRate, function (index, item) {
            if (index > 9)
                return false;
            ontimerate.push(item.Value);
            if (Period == "Product")
                ontimerateText.push(item.Code);
            else
                ontimerateText.push(item.Text);
        })
    }
    MyChartsOnTimeRate(ontimerateText, ontimerate);
}
function HOverTime(Period)
{
    var overtime = [], overtimeText = [];
    if (result.HOverTime) {
        $.each(result.HOverTime, function (index, item) {
            if (index > 9)
                return false;
            overtime.push(item.Value);
            if (Period == "Product")
                overtimeText.push(item.Code);
            else
                overtimeText.push(item.Text);
        })
    }
    MyChartsOverTime(overtimeText, overtime);
}
function HOverDay(Period)
{
    var overday = [], overdayText = [];
    if (result.HOverDay) {
        $.each(result.HOverDay, function (index, item) {
            if (index > 9)
                return false;
            overday.push((item.Value * 1.0 / 1440).toFixed(1));
            if (Period == "Product")
                overdayText.push(item.Code);
            else
                overdayText.push(item.Text);
        })
    }
    MyChartsOverDay(overdayText, overday);
}


//从低到高
function LSort(Period) {
    LOnTime(Period);
    LOnTimeRate(Period);
    LOverTime(Period);
    LOverDay(Period);
}

function LOnTime(Period) {
    var ontime = [], ontimeText = [];
    $.each(result.HOnTime, function (index, item) {
        if (index < (result.HOnTime.length - 10))
            return true;
        ontime.unshift(item.Value);
        if (Period == "Product")
            ontimeText.unshift(item.Code);
        else
            ontimeText.unshift(item.Text);
    })
    MyChartsOnTime(ontimeText, ontime);
}
function LOnTimeRate(Period) {
    var ontimerate = [], ontimerateText = [];
    $.each(result.HOntimeRate, function (index, item) {
        if (index < (result.HOntimeRate.length - 10))
            return true;
        ontimerate.unshift(item.Value);
        if (Period == "Product")
            ontimerateText.unshift(item.Code);
        else
            ontimerateText.unshift(item.Text);
    })
    MyChartsOnTimeRate(ontimerateText, ontimerate);
}
function LOverTime(Period) {
    var overtime = [], overtimeText = [];
    $.each(result.HOverTime, function (index, item) {
        if (index < (result.HOverTime.length - 10))
            return true;
        overtime.unshift(item.Value);
        if (Period == "Product")
            overtimeText.unshift(item.Code);
        else
            overtimeText.unshift(item.Text);
    })
    MyChartsOverTime(overtimeText, overtime);
}
function LOverDay(Period) {
    var overday = [], overdayText = [];
    $.each(result.HOverDay, function (index, item) {
        if (index < (result.HOverDay.length - 10))
            return true;
        overday.unshift((item.Value * 1.0 / 1440).toFixed(1));
        if (Period == "Product")
            overdayText.unshift(item.Code);
        else
            overdayText.unshift(item.Text);
    })
    MyChartsOverDay(overdayText, overday);
}
