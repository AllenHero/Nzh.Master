var workplace = JSON.parse(getCookie("workplace"));
$(function () {
    if (!workplace) {
        alert("请点上方配置按钮，设置当前工位！");
    }
    GetExceptionRanging("month");
    GetExceptionAnalysis("month");
    MonthLossTime("month");
    
    $("button[group=losstime]").click(function () {
        $("button[group=losstime]").removeClass("active");
        $(this).addClass("active");
        var value = $(this).val();
        MonthLossTime(value);
    });
    $("button[group=exceptionclass]").click(function () {
        $("button[group=exceptionclass]").removeClass("active");
        $(this).addClass("active");
        var value = $(this).val();
        GetExceptionAnalysis(value);
    });
    $("button[group=rank]").click(function () {
        $("button[group=rank]").removeClass("active");
        $(this).addClass("active");
        var value = $(this).val();
        GetExceptionRanging(value);
    });
    $("button[group=responserank]").click(function () {
        $("button[group=responserank]").removeClass("active");
        $(this).addClass("active");
        var value = $(this).val();
        GetResponseRank(value);
    });
    $("button[group=starrank]").click(function () {
        $("button[group=starrank]").removeClass("active");
        $(this).addClass("active");
        var value = $(this).val();
        GetStarRank(value);
    });
    $("button[group=numberrank]").click(function () {
        $("button[group=numberrank]").removeClass("active");
        $(this).addClass("active");
        var value = $(this).val();
        GetQuantityRank(value);
    });
})

//异常处理龙虎榜
function GetExceptionRanging(type) {
    $.ajax({
        url: '/api/Andon/andon/GetExceptionRanging?Top=5&LineCode=' + workplace.LineCode + '&DateType=' + type,
        type: 'get',
        success: function (value) {
            $('#responsetimeorder').html("");
            $('#starorder').html("");
            $('#quantityorder').html("");
            if (value.status) {
                var obj = value.message;
                var Response = obj.Response;
                var Star = obj.Star;
                var Quantity = obj.Quantity;
                var responsetime = [];
                $.each(Response, function (i, item) {
                    var row = { First: false, Second: false, Three: false, HandlerName: item.UserName, OrganizeName: item.OrganizeName, Value: item.ResponseTime }
                    switch (i) {
                        case 0: row.First = true; break;
                        case 1: row.Second = true; break;
                        case 2: row.Three = true; break;
                    }
                    responsetime.push(row);
                });

                var stars = [];
                $.each(Star, function (i, item) {
                    var row = { First: false, Second: false, Three: false, HandlerName: item.UserName, OrganizeName: item.OrganizeName, Value: item.Star }
                    switch (i) {
                        case 0: row.First = true; break;
                        case 1: row.Second = true; break;
                        case 2: row.Three = true; break;
                    }
                    stars.push(row);
                })
                var quantitys = [];
                $.each(Quantity, function (i, item) {
                    var row = { First: false, Second: false, Three: false, HandlerName: item.UserName, OrganizeName: item.OrganizeName, Value: item.Quantity }
                    switch (i) {
                        case 0: row.First = true; break;
                        case 1: row.Second = true; break;
                        case 2: row.Three = true; break;
                    }
                    quantitys.push(row);
                })
                $('#responsetimeorder').html($("#template-range").render(responsetime));
                $('#starorder').html($("#template-range").render(stars));
                $('#quantityorder').html($("#template-range").render(quantitys));
            } else {
                alert("系统忙，请稍后再试！" + value.message);
            }
        }
    });
}

function GetResponseRank(type) {
    $.ajax({
        url: '/api/Andon/andon/GetExceptionRanging?Top=5&LineCode=' + workplace.LineCode + '&DateType=' + type,
        type: 'get',
        success: function (value) {
            $('#responsetimeorder').html("");
            if (value.status) {
                var obj = value.message;
                var Response = obj.Response;
                var Star = obj.Star;
                var Quantity = obj.Quantity;
                var responsetime = [];
                $.each(Response, function (i, item) {
                    var row = { Index:(i+1),First: false, Second: false, Three: false, HandlerName: item.UserName, OrganizeName: item.OrganizeName, Value: item.ResponseTime }
                    switch (i) {
                        case 0: row.First = true; break;
                        case 1: row.Second = true; break;
                        case 2: row.Three = true; break;
                    }
                    responsetime.push(row);
                });

                $('#responsetimeorder').html($("#template-range").render(responsetime));
            } else {
                alert("系统忙，请稍后再试！" + value.message);
            }
        }
    });
}

function GetStarRank(type) {
    $.ajax({
        url: '/api/Andon/andon/GetExceptionRanging?Top=5&LineCode=' + workplace.LineCode + '&DateType=' + type,
        type: 'get',
        success: function (value) {
            $('#starorder').html("");
            if (value.status) {
                var obj = value.message;
                var Response = obj.Response;
                var Star = obj.Star;
                var Quantity = obj.Quantity;

                var stars = [];
                $.each(Star, function (i, item) {
                    var row = { First: false, Second: false, Three: false, HandlerName: item.UserName, OrganizeName: item.OrganizeName, Value: item.Star }
                    switch (i) {
                        case 0: row.First = true; break;
                        case 1: row.Second = true; break;
                        case 2: row.Three = true; break;
                    }
                    stars.push(row);
                })
                $('#starorder').html($("#template-range").render(stars));
            } else {
                alert("系统忙，请稍后再试！" + value.message);
            }
        }
    });
}

function GetQuantityRank(type) {
    $.ajax({
        url: '/api/Andon/andon/GetExceptionRanging?Top=5&LineCode=' + workplace.LineCode + '&DateType=' + type,
        type: 'get',
        success: function (value) {
            $('#quantityorder').html("");
            if (value.status) {
                var obj = value.message;
                var Response = obj.Response;
                var Star = obj.Star;
                var Quantity = obj.Quantity;
                var quantitys = [];
                $.each(Quantity, function (i, item) {
                    var row = { First: false, Second: false, Three: false, HandlerName: item.UserName, OrganizeName: item.OrganizeName, Value: item.Quantity }
                    switch (i) {
                        case 0: row.First = true; break;
                        case 1: row.Second = true; break;
                        case 2: row.Three = true; break;
                    }
                    quantitys.push(row);
                })
                $('#quantityorder').html($("#template-range").render(quantitys));
            } else {
                alert("系统忙，请稍后再试！" + value.message);
            }
        }
    });
}

//异常数据分析
function GetExceptionAnalysis(type) {
    $.ajax({
        url: '/api/Andon/andon/GetExceptionDayAnalysis?LineCode=' + workplace.LineCode+"&Type="+type,
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
                        value: (parseInt(item.LossTime) * 1.0 / 60).toFixed(1),
                        name: item.ExceptionName,
                        id:item.ID
                    }
                    if (item.LossTime > 0)
                        flag = 1;
                    y.push(datas);

                    //z.push(((item.LossTime) * 100.0 / times).toFixed(2));
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

                dayanalysis(x, y, type);
                $("#subclass").html(y[0].name);
                subexceptionanalysis(y[0].value, type)
            }
        }
    });
}

//月异常损失工时统计
function MonthLossTime(type) {
    $.ajax({
        url: '/api/Andon/andon/GetExceptionMonthAnalysis?LineCode=' + workplace.LineCode + "&Type=" + type,
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
                    x.push(item.ExceptionDate.substring(5));
                    y.push((parseInt(item.LossTime) * 1.0 / 60).toFixed(1));
                    var cout = (parseInt(item.LossTime) * 100.0 / times).toFixed(1);
                    if (cout == 0)
                        z.push(0)
                    else
                        z.push(cout);
                    //z.push((parseInt(item.LossTime) * 100.0 / times).toFixed(2));
                });
                monthnalysis(x, y, z, type);
                $("#currentday").html(moments().format("YYYY-MM-DD"));
                DayLossTime(moments().format("YYYY-MM-DD"), type)
            }
        }
    });
}

//异常小类统计
function subexceptionanalysis(parentid,type) {
    $.ajax({
        url: '/api/andon/andon/GetSubExceptionAnalysis?Type=' + type + '&ParentId=' + parentid + '&WorkShopId=' + workplace.WorkShopId + "&LineId=" + workplace.LineId,
        type: 'Get',
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
                        value: (parseInt(item.LossTime) * 1.0 / 60).toFixed(1),
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
                        value: 0,
                        name: "暂无数据"
                    }
                    y.push(datas);

                }

                subexceptionoption(x, y);
            }
        }
    });
}

//日损失工时统计
function DayLossTime(cuurentday,type) {
    $.ajax({
        url: '/api/Andon/andon/GetDayLossTime?Type=' + type + '&Day=' + cuurentday + '&WorkShopId=' + workplace.WorkShopId + "&LineId=" + workplace.LineId,
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
                    x.push(item.ExceptionHour);
                    y.push((parseInt(item.LossTime) * 1.0 / 60).toFixed(1));
                    var cout = (parseInt(item.LossTime) * 100.0 / times).toFixed(1);
                    if (cout == 0)
                        z.push(0)
                    else
                        z.push(cout);
                    //z.push((parseInt(item.LossTime) * 100.0 / times).toFixed(2));
                });
                sublosstimeoption(x, y, z);
            }
        }
    });
}

// 图表
function dayanalysis(x, y,type) {
    var pieCharts = echarts.init(document.getElementById('main3'));

    var option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data: x //['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
        },
        series:
        {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '55%'],
            label: {
                normal: {
                    formatter: '{c}(hour)  {d}% ',
                    backgroundColor: '#eee',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    borderRadius: 4,
                    rich: {
                        a: {
                            color: '#999',
                            lineHeight: 22,
                            align: 'center'
                        },
                        hr: {
                            borderColor: '#aaa',
                            width: '100%',
                            borderWidth: 0.5,
                            height: 0
                        },
                        b: {
                            fontSize: 16,
                            lineHeight: 33
                        },
                        per: {
                            color: '#eee',
                            backgroundColor: '#334455',
                            padding: [2, 4],
                            borderRadius: 2
                        }
                    }
                }
            },
            data: y
        }
    };

    // 解决点击事件调用n次的问题
    // 1、清除画布
    pieCharts.clear()
    // 2、调用setOption
    pieCharts.setOption(option)
    ///3、在渲染点击事件之前先清除点击事件
    pieCharts.off('click')
    // triggerEvent为true时，触发点击事件
    pieCharts.on('click', function (params) {
        $("#subclass").html(params.name);
        subexceptionanalysis(params.data.id,type);
    })
}

function monthnalysis(x, y, z,type) {

    var lineCharts = echarts.init(document.getElementById('main'));
    var option =
    {
        tooltip: {
            trigger: 'axis'

        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: x,
            axisLabel: {
                rotate: 45
            }
        }],
        yAxis: [{
            type: 'value',
            //name: '损失工时(hour)',
        }],
        grid: {
            containLabel: true,
            borderWidth: 0,
            y: '10%',
            x: 20,
            y2: '10%'
        },
        color: ['#1890ff'],
        series: [{
            name: '损失工时',
            type: 'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    formatter: '{c}(H)'
                }
            },
            data: y
        }]
    };
    // 解决点击事件调用n次的问题
    // 1、清除画布
    lineCharts.clear()
    // 2、调用setOption
    lineCharts.setOption(option)
    ///3、在渲染点击事件之前先清除点击事件
    lineCharts.off('click')
    // triggerEvent为true时，触发点击事件
    lineCharts.on('click', function (params) {
        $("#currentday").html(params.name);
        DayLossTime(params.name,type);
    })
}

// 图表
function subexceptionoption(x, y) {
    var pieCharts = echarts.init(document.getElementById('main4'));

    var option = {
        tooltip: {
            trigger: 'item',
            //name: '损失工时(hour)',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data: x //['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
        },
        series:
        {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '55%'],
            label: {
                normal: {
                    formatter: '{c}(hour)  {d}% ',
                    backgroundColor: '#eee',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    borderRadius: 4,
                    rich: {
                        a: {
                            color: '#999',
                            lineHeight: 22,
                            align: 'center'
                        },
                        hr: {
                            borderColor: '#aaa',
                            width: '100%',
                            borderWidth: 0.5,
                            height: 0
                        },
                        b: {
                            fontSize: 16,
                            lineHeight: 33
                        },
                        per: {
                            color: '#eee',
                            backgroundColor: '#334455',
                            padding: [2, 4],
                            borderRadius: 2
                        }
                    }
                }
            },
            data: y
        }
    };

    // 解决点击事件调用n次的问题
    // 1、清除画布
    pieCharts.clear()
    // 2、调用setOption
    pieCharts.setOption(option)
}

function sublosstimeoption(x, y, z) {

    var lineCharts = echarts.init(document.getElementById('main2'));
    var option = 
    {
        tooltip: {
            trigger: 'axis'
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLabel: {
                rotate: 45
            },
            data: x
        }],
        yAxis: [{
            type: 'value',
            //name: '损失工时(hour)',
        }],
        grid: {
            containLabel: true,
            borderWidth: 0,
            y: '10%',
            x: 20,
            y2: '10%'
        },
        color: ['#1890ff'],
        series: [{
            name: '损失工时',
            type: 'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    borderRadius: 4,
                    formatter: '{c}(H)'
                }
            },
            data: y
        }]
    };
    // 解决点击事件调用n次的问题
    // 1、清除画布
    lineCharts.clear()
    // 2、调用setOption
    lineCharts.setOption(option)
}