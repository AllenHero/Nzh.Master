var inerval = setInterval(show_time_now, 1000);
var timeorder = 600;

if (TenantId ==="00000000-0000-0000-0000-000000000000") {
    TenantId = utils.getQueryString("TenantId").replace("#", "");
}

var OrganizeId = utils.getQueryString("OrganizeId").replace("#", "");

$(function () {
    GetServerTime();
    //从地址读取参数
    if (UserId === "00000000-0000-0000-0000-000000000000" || OrganizeId) {
        //GetLine();
        SetLogo(TenantId);
        Gettitle(OrganizeId);
        GetWorkOrder(OrganizeId);

    } else {
        //从配置中读取参数
        GetUserGroup();
    }
})

//获取标题
function Gettitle(OrganizeId) {
    $.ajax({
        url: '/api/sys/Organize/GetOrganize?OrganizeId=' + OrganizeId,
        success: function (value) {
            if (value.total > 0) {
                $("#show_main_title").html("[" + value.rows[0].OrganizeName + "]");
            }
        }
    });
}

function GetServerTime() {
    $.ajax({
        url: '/api/saps/board/getcurrenttime',
        success: function (value) {
            var d_now = value;
            $('#show_time').html(d_now);
            $("#show_week").html(GetWeekDay(moments(d_now).weekday()));
        }
    });
}

function show_time_now() {
    clearInterval(inerval);
    inerval = setInterval(show_time_now, 1000);
    var time = $('#show_time').html();
    time = moments(time).add(1, 'seconds').format("YYYY-MM-DD HH:mm:ss");
    $('#show_time').html(time);
    $("#show_week").html(GetWeekDay(moments(time).weekday()));
    if (timeorder <= 0) {
        timeorder = 600;
        GetWorkOrder(group);
    }
    timeorder = timeorder-1;
}

function GetWeekDay(day) {
    var currentDay = "";
    switch (day) {
        case 1: currentDay = "星期一"; break;
        case 2: currentDay = "星期二"; break;
        case 3: currentDay = "星期三"; break;
        case 4: currentDay = "星期四"; break;
        case 5: currentDay = "星期五"; break;
        case 6: currentDay = "星期六"; break;
        case 7: currentDay = "星期日"; break;
    }
    return currentDay;
}

//从配置中读取OrganizeId
function GetUserGroup() {
    if (UserId) {
        $.ajax({
            url: '/api/sys/user/GetUserDefaultOrganize/' + UserId,
            success: function (value) {
                if (value.total > 0) {
                    SetLogo(TenantId);
                    GetWorkOrder(value.rows[0].OrganizeId);
                    $("#show_main_title").html("[" + value.rows[0].OrganizeName + "]");
                }
                else {
                    alert("没有获取用户所在的组织。");
                }
            }
        });
    } else {
        window.location.href = "/ilean/login";
    }
}

//获取工厂数据并更新LOGO
function SetLogo(TenantId) {
    $.ajax({
        url: '/api/sys/Files?LinkedTableId=' + TenantId,
        success: function (value) {
            if (value.total > 0) {
                $("#logo").attr("src", value.rows[0].FilePath);
            }
        }
    });
}

function GetWorkOrder(OrganizeId) {
    if (OrganizeId) {
        $.ajax({
            url: '/api/saps/board/GetNew?Week=2&TenantId=' + TenantId + '&OrganizeId=' + OrganizeId,
            beforeSend: jQueryShowLoading(),//显示加载图标
            success: function (value) {
                jQuery('body').hideLoading();//隐藏加载图标
                $("#body").html();
                $("#body2").html();
                $("#body3").html();
                if (value.status) {
                    var woList = [];
                    var delayList = [];
                    var overList = [];
                    var endTime = $('#show_time').html();
                    //生产中工单
                    $.each(value.rows.WorkingOrder, function (index, item) {
                        var row = {
                            Index: (index + 1), WorkSheetNo: item.WorkSheetNo, ProductCode: item.ProductCode
                            , ProductName: item.ProductName, PlanCount: item.PlanCount, OrganizeName: item.OrganizeName
                            , PlanStartTime: item.PlanStartDate ? moments(item.PlanStartDate).format('MM-DD HH:mm') : ""
                            , PlanEndTime: item.PlanEndDate ? moments(item.PlanEndDate).format('MM-DD HH:mm') : ""
                            , StartTime: item.StartTime ? moments(item.StartTime).format('MM-DD HH:mm') : ""
                            , CompleteCount: item.CompletedCount, RestCount: item.RestCount, CompleteRate: 0
                            , TimeRate: 0, Difference: ''
                        };

                        row.ProductName = row.ProductName.substring(0, 10);
                        row.RestCount = row.PlanCount - row.CompleteCount;
                        row.CompleteRate = row.CompleteCount * 100.0 / row.PlanCount;
                        row.CompleteRate = row.CompleteRate ? row.CompleteRate.toFixed(1) + ' %' : "";

                        var planTime = moments(item.PlanEndDate).diff(item.PlanStartDate, "seconds");
                        var planHour = moments(item.PlanStartDate).format("HH");
                        if (planHour > 0) {
                            planTime = moments(moments(item.PlanEndDate).format('YYYY-MM-DD HH:mm:ss')).diff(item.PlanStartDate, "seconds");
                        }
                        var workedTime = moments(endTime).diff(item.StartTime, "seconds");
                        row.TimeRate = workedTime * 100.0 / planTime;
                        row.TimeRate = row.TimeRate ? row.TimeRate.toFixed(1) + ' %' : "";
                        var difference = moments(endTime).diff(item.PlanEndDate, "days");
                        if (difference > 0)
                            row.Difference = "超期 " + difference + " 天";
                        else
                            row.Difference = "未超期";
                        woList.push(row);
                    });
                    $("#body").html($("#template-workingorder").render(woList));
                    //滞后工单
                    $.each(value.rows.Delay, function (index, item) {
                        var row = {
                            Index: (index + 1), WorkSheetNo: item.WorkSheetNo, ProductCode: item.ProductCode
                            , ProductName: item.ProductName, PlanCount: item.PlanCount, OrganizeName: item.OrganizeName
                            , CompleteCount: item.CompletedCount, CountDifferenceRate: 0
                        };
                        row.ProductName = row.ProductName.substring(0, 10);
                        row.CountDifferenceRate = row.PlanCount - row.CompleteCount;
                        delayList.push(row);
                    });
                    $("#body2").html($("#template-delayworkorder").render(delayList));
                    ///超期工单
                    $.each(value.rows.Over, function (index, item) {
                        var row = {
                            Index: (index + 1), WorkSheetNo: item.WorkSheetNo, ProductCode: item.ProductCode
                            , ProductName: item.ProductName, PlanCount: item.PlanCount, OrganizeName: item.OrganizeName
                            , PlanEndTime: item.PlanEndDate, EndTime: item.EndTime
                            , DayTimeDifference: 0
                        };
                        row.ProductName = row.ProductName.substring(0, 10);
                        if (item.EndTime) endTime = item.EndTime;
                        var difference = moments(endTime).diff(item.PlanEndDate, "days");
                        row.DayTimeDifference = difference
                        overList.push(row);
                    });
                    $("#body3").html($("#template-overworkorder").render(overList));
                }
            }
        });
    } else {
        alert("没有获取用户所在的组织。");
    }
}

function jQueryShowLoading() {
    jQuery('body').showLoading();
    jQuery('#loading-indicator-undefined').css("top", 200);
}