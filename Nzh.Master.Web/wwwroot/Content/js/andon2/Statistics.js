
$(function () {
    //默认显示月统计

    //响应时间排名
    GetResponseTimeRanking("month");

    //处理星级排名
    GetProcessingStarsRanking("month");

    //产品异常数量统计
    GetProductExceptionCountStatistics("month");

    //责任部门异常数量统计
    GetHandOrganizeExceptionCountStatistics("month");

    //当天时间
    GetNowDate();

    //当天异常损失工时时间点
    GetDayExceptionLossTimeAnalysis();

    //异常损失工时趋势
    GetMonthExceptionLossTimeAnalysis("month");

    //处理问题分类
    GetParentExceptionClassify("month");

    //响应时间排名
    $("button[name=ResponseTimeRanking]").click(function () {
        $("button[name=ResponseTimeRanking]").removeClass("active");
        $(this).addClass("active");
        var value = $(this).val();
        GetResponseTimeRanking(value);
    });

    //处理星级排名
    $("button[name=ProcessingStarsRanking]").click(function () {
        $("button[name=ProcessingStarsRanking]").removeClass("active");
        $(this).addClass("active");
        var value = $(this).val();
        GetProcessingStarsRanking(value);
    });

    //产品异常数量统计
    $("button[name=ProductExceptionCountStatistics]").click(function () {
        $("button[name=ProductExceptionCountStatistics]").removeClass("active");
        $(this).addClass("active");
        var value = $(this).val();
        GetProductExceptionCountStatistics(value);
    });

    //责任部门异常数量统计
    $("button[name=HandOrganizeExceptionStatistics]").click(function () {
        $("button[name=HandOrganizeExceptionStatistics]").removeClass("active");
        $(this).addClass("active");
        var value = $(this).val();
        GetHandOrganizeExceptionCountStatistics(value);
    });

    //异常损失工时趋势
    $("button[name=MonthExceptionLossTimeAnalysis]").click(function () {
        $("button[name=MonthExceptionLossTimeAnalysis]").removeClass("active");
        $(this).addClass("active");
        var value = $(this).val();
        GetMonthExceptionLossTimeAnalysis(value);
    });

    //处理问题分类
    $("button[name=ExceptionClassify]").click(function () {
        $("button[name=ExceptionClassify]").removeClass("active");
        $(this).addClass("active");
        var value = $(this).val();
        GetParentExceptionClassify(value);
    });
});

//响应时间排名
function GetResponseTimeRanking(type) {
    $.ajax({
        url: '/api/Andon2/andon/GetResponseTimeRanking?Top=5&DateType=' + type + '&TenantId=' + TenantId,
        type: 'get',
        success: function (value) {
            $('#ResponseTimeRanking').html("");
            if (value.status) {
                var html = '';
                $.each(value.rows, function (index, item) {
                    var Index = index + 1;
                    switch (index) {
                        case 0: Index = "<i class='font_ilean iconfont icon-jin' style='color: gold'></i>"; break;
                        case 1: Index = "<i class='font_ilean iconfont icon-jin' style='color: Silver'></i>"; break;
                        case 2: Index = "<i class='font_ilean iconfont icon-jin' style='color: #ad601b'></i>"; break;
                    }
                    html += "<tr>";
                    html += "<td>" + Index + "</td>";
                    html += "<td>" + item.OrganizeName + "</td>";
                    html += "<td>" + item.UserName + "</td>";
                    html += "<td>" + item.ResponseTimes + "</td>";
                    html += "</tr>";
                });
                $("#ResponseTimeRanking").html(html);
            }
        }
    });
}

//处理星级排名
function GetProcessingStarsRanking(type) {
    $.ajax({
        url: '/api/Andon2/andon/GetProcessingStarsRanking?Top=5&DateType=' + type + '&TenantId=' + TenantId,
        type: 'get',
        success: function (value) {
            $('#ProcessingStarsRanking').html("");
            if (value.status) {
                var html = '';
                $.each(value.rows, function (index, item) {
                    var Index = index + 1;
                    switch (index) {
                        case 0: Index = "<i class='font_ilean iconfont icon-jin' style='color: gold'></i>"; break;
                        case 1: Index = "<i class='font_ilean iconfont icon-jin' style='color: Silver'></i>"; break;
                        case 2: Index = "<i class='font_ilean iconfont icon-jin' style='color: #ad601b'></i>"; break;
                    }
                    //星级判断
                    var Star = "";
                    if (0 <= parseFloat(item.RelieveTimes) && parseFloat(item.RelieveTimes) < 1) {
                        Star = "<i class='icon-star-half-empty'>";
                    }
                    else if (1 <= parseFloat(item.RelieveTimes) && parseFloat(item.RelieveTimes) < 1.5) {
                        Star = "<i class='icon-star'>"; 
                    }
                    else if (1.5 <= parseFloat(item.RelieveTimes) && parseFloat(item.RelieveTimes) < 2) {
                        Star = "<i class='icon-star'><i class='icon-star-half-empty'>";
                    }
                    else if (2 <= parseFloat(item.RelieveTimes) && parseFloat(item.RelieveTimes) < 2.5) {
                        Star = "<i class='icon-star'><i class='icon-star'>";
                    }
                    else if (2.5 <= parseFloat(item.RelieveTimes) && parseFloat(item.RelieveTimes) < 3) {
                        Star = "<i class='icon-star'><i class='icon-star'><i class='icon-star-half-empty'>";
                    }
                    else if (3 <= parseFloat(item.RelieveTimes) && parseFloat(item.RelieveTimes) < 3.5) {
                        Star = "<i class='icon-star'><i class='icon-star'><i class='icon-star'>";
                    }
                    else if (3.5 <= parseFloat(item.RelieveTimes) && parseFloat(item.RelieveTimes) < 4) {
                        Star = "<i class='icon-star'><i class='icon-star'><i class='icon-star'><i class='icon-star-half-empty'>";
                    }
                    else if (4 <= parseFloat(item.RelieveTimes) && parseFloat(item.RelieveTimes) < 4.5) {
                        Star = "<i class='icon-star'><i class='icon-star'><i class='icon-star'><i class='icon-star'>";
                    }
                    else if (4.5 <= parseFloat(item.RelieveTimes) && parseFloat(item.RelieveTimes) < 5) {
                        Star = "<i class='icon-star'><i class='icon-star'><i class='icon-star'><i class='icon-star'><i class='icon-star-half-empty'>";
                    }
                    else if (parseFloat(item.RelieveTimes) >= 5) {
                        Star = "<i class='icon-star'><i class='icon-star'><i class='icon-star'><i class='icon-star'><i class='icon-star'>"; 
                    }
                    html += "<tr>";
                    html += "<td>" + Index + "</td>";
                    html += "<td>" + item.OrganizeName + "</td>";
                    html += "<td>" + item.UserName + "</td>";
                    html += "<td>" + Star + "</td>";
                    html += "</tr>";
                });
                $("#ProcessingStarsRanking").html(html);
            }
        }
    });
}

//产品异常数量统计
function GetProductExceptionCountStatistics(type) {
    $.ajax({
        url: '/api/Andon2/andon/GetProductExceptionCountStatistics?Top=5&DateType=' + type + '&TenantId=' + TenantId,
        type: 'get',
        success: function (value) {
            $('#ProductExceptionCountStatistics').html("");
            if (value.status) {
                var html = '';
                $.each(value.rows, function (index, item) {
                    var Index = index + 1;
                    switch (index) {
                        case 0: Index = "<i class='font_ilean iconfont icon-jin' style='color: gold'></i>"; break;
                        case 1: Index = "<i class='font_ilean iconfont icon-jin' style='color: Silver'></i>"; break;
                        case 2: Index = "<i class='font_ilean iconfont icon-jin' style='color: #ad601b'></i>"; break;
                    }
                    var ProductName = "";
                    if (item.ProductName) {
                        if (item.ProductName.length > 5) {
                            ProductName = item.ProductName.substring(0, 5) + "...";
                        }
                        else {
                            ProductName = item.ProductName;
                        }
                    }
                    if (item.ProductCode != null && item.ProductCode!="") {
                        html += "<tr>";
                        html += "<td>" + Index + "</td>";
                        html += "<td>" + item.ProductCode + "</td>";
                        html += "<td>" + ProductName + "</td>";
                        html += "<td>" + item.ExceptionCount + "</td>";
                        html += "</tr>";
                    }
                    
                });
                $("#ProductExceptionCountStatistics").html(html);
            } 
        }
    });
}

//责任部门异常数量统计
function GetHandOrganizeExceptionCountStatistics(type) {
    $.ajax({
        url: '/api/Andon2/andon/GetHandOrganizeExceptionCountStatistics?Top=5&DateType=' + type + '&TenantId=' + TenantId,
        type: 'get',
        success: function (value) {
            $('#HandOrganizeExceptionStatistics').html("");
            if (value.status) {
                var html = '';
                $.each(value.rows, function (index, item) {
                    var Index = index + 1;
                    switch (index) {
                        case 0: Index = "<i class='font_ilean iconfont icon-jin' style='color: gold'></i>"; break;
                        case 1: Index = "<i class='font_ilean iconfont icon-jin' style='color: Silver'></i>"; break;
                        case 2: Index = "<i class='font_ilean iconfont icon-jin' style='color: #ad601b'></i>"; break;
                    }
                    if (item.OrganizeName != null && item.OrganizeName!="") {
                        html += "<tr>";
                        html += "<td>" + Index + "</td>";
                        html += "<td>" + item.OrganizeName + "</td>";
                        html += "<td>" + item.TimeOrder + "</td>";
                        html += "</tr>";
                    }
                    
                });
                $("#HandOrganizeExceptionStatistics").html(html);
            }
        }
    });
}

//获取当前日期
function GetNowDate() {
    $.ajax({
        url: '/api/Andon2/andon/GetNowDate',
        type: 'get',
        success: function (value) {
            if (value) {
                $("#NowDate").html(value);
            }
        }
    });
}

//异常损失工时趋势
function GetMonthExceptionLossTimeAnalysis(type) {
    $.ajax({
        url: '/api/Andon2/andon/GetMonthExceptionLossTimeAnalysis?DateType=' + type + '&TenantId=' + TenantId,
        success: function (value) {
            if (value.status) {
                var x = [];
                var y = [];
                $.each(value.rows, function (index, item) {
                    x.push(item.Date);
                    y.push(item.LossTime);
                });
                LoadmyChart(x, y);
            }
        }
    });
}

//当天异常损失工时时间点
function GetDayExceptionLossTimeAnalysis() {
    $.ajax({
        url: '/api/Andon2/andon/GetDayExceptionLossTimeAnalysis?TenantId=' + TenantId,
        success: function (value) {
            if (value.status) {
                var x = [];
                var y = [];
                $.each(value.rows, function (index, item) {
                    x.push(item.Date);
                    y.push(item.LossTime);
                });
                LoadmyChart2(x, y);
            }
        }
    });
}

//处理问题分类(大类)
function GetParentExceptionClassify(type) {
    $.ajax({
        url: '/api/Andon2/andon/GetParentExceptionClassify?DateType=' + type + '&TenantId=' + TenantId,
        success: function (value) {
            if (value.status) {
                var x = [];
                var y = [];
                $.each(value.rows, function (index, item) {
                    x.push(item.ExceptionParentName); 
                    var data = {
                        value: parseInt(item.ExceptionParentCount),
                        name: item.ExceptionParentName,
                        id: item.ParentId
                    };
                    y.push(data); 
                });
            }
            LoadmyChart3(x, y, type);
        }
    });
}

//处理问题分类(小类)
function GetExceptionClassify(Id,type) {
    $.ajax({
        url: '/api/Andon2/andon/GetExceptionClassify?DateType=' + type + "&ParentId=" + Id + '&TenantId=' + TenantId,
        success: function (value) {
            if (value.status) {
                var x = [];
                var y = [];
                $.each(value.rows, function (index, item) {
                    x.push(item.ExceptionName);
                    var data = {
                        value: parseInt(item.ExceptionCount),
                        name: item.ExceptionName
                    };
                    y.push(data);
                });
            }
            LoadmyChart4(x, y);
        }
    });
}

//异常损失工时趋势
var option;
function LoadmyChart(x, y) {
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
                name: '损失工时(min)',
                min: 0,
                interval: 500,
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
                data: y,
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
function LoadmyChart2(x, y) {
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
                name: '损失工时(min)',
                min: 0,
                interval: 500,
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
                data: y,
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
function LoadmyChart3(x, y, type) {
    option3 = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data: x
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
                data: y
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
        GetExceptionClassify(params.data.id, type);//根据异常大类获取小类
    });
}

//异常小类
var option4;
function LoadmyChart4(x, y) {
    option4 = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data: x
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
                data: y
            }
        ]
    };
    myChart4 = echarts.init(document.getElementById('main4'));
    myChart4.setOption(option4);
    window.onresize = myChart4.resize;
}






