var page = 1;
var rows = 7;
var workShopId = "";
$(function () {
    GetUrgeRecord(); GetUser(); GetWorkShop(); GetWorkLine('');
    $("button[name=findDay]").click(function () {
        $("#UrgeDate").val(moments().format("YYYY-MM-DD"));
        GetUrgeRecord();
    });
    $("button[name=findWeek]").click(function () {
        $("#UrgeDate").val("");
        var day = new Date;
        var week = day.getDay();
        var endDay = moments().add(1,'day').format("YYYY-MM-DD");
        var startDay = moments().add(-week, 'day').format("YYYY-MM-DD");
        $("#UrgeDate").val(startDay + " 到 " + endDay);
        GetUrgeRecord();
    });
    $("button[name=findurgerecord]").click(function () {
        page = 1;
        GetUrgeRecord();
    });

    $("select[name=WorkShop]").change(function () {
        GetWorkLine($(this).val());
    });
})

function GetWorkShop() {
    $.ajax({
        url: '/api/sys/workshop?TenantId=' + TenantId,
        success: function (value) {
            if (value.total > 0) {
                var option = [{ Id: '', Code: '', Name: '==请选择==' }];
                $.each(value.rows, function (index, item) {
                    var row = { Id: item.WorkShopId, Code: item.WorkShopCode, Name: item.WorkShopName };
                    option.push(row);
                })
                $('select[name=WorkShop]').html($("#template-option").render(option));
            }
        }
    })
}

function GetWorkLine() {
    $.ajax({
        url: '/api/sys/line?TenantId=' + TenantId + '&WorkShopId=' + workShopId,
        success: function (value) {
            if (value.total > 0) {
                var option = [];
                $.each(value.rows, function (index, item) {
                    var row = { Id: item.LineId, Code: item.LineCode, Name: item.LineName };
                    option.push(row);
                })
                $('select[name=Line]').html($("#template-option").render(option));
            }
        }
    })
}

function GetWorkLine(workshop) {
    $.ajax({
        url: '/api/sys/line?TenantId=' + TenantId + '&WorkShopId=' + workshop,
        success: function (value) {
            if (value.total > 0) {
                var option = [{ Id: '', Code: '', Name: '==请选择==' }];
                $.each(value.rows, function (index, item) {
                    var row = { Id: item.LineId, Code: item.LineCode, Name: item.LineName };
                    option.push(row);
                })
                $('select[name=Line]').html($("#template-option").render(option));
            }
        }
    })
}

//function GetLine() {
//    $.ajax({
//        url: '/api/sys/Line?TenantId=' + TenantId,
//        type: 'get',
//        success: function (value) {
//            var WorkShop = "";
//            var option = "";
//            var optgroup = "<option value=''>==请选择==</option>";
//            $.each(value.rows, function (index, item) {
//                if (WorkShop.indexOf(item.WorkShopCode) < 0) {
//                    if (WorkShop === "")
//                        WorkShop += "<optgroup label='" + item.WorkShopName + "' id='" + item.WorkShopId + "'>";
//                    else
//                        WorkShop += "</optgroup><optgroup label='" + item.WorkShopName + "' id='" + item.WorkShopId + "'>";
//                    WorkShop += item.WorkShopCode + " ; ";
//                }
//                optgroup += "<option value='" + item.LineId + "' id='" + item.LineId + "' code='" + item.LineCode + "'>" + item.LineName + "</option>";

//                if (index == value.total - 1)
//                    optgroup += "</optgroup>";
//            });

//            $("select[name=Line]").html(optgroup);
//        }
//    })
//}

function GetUrgeRecord() {
    var UrgeUser = "", WorkOrder = "", Handler = "", UrgeDate = "", CCUser = "", LineId = "", WorkShopId = "";
    if ($("#UrgeUser").val())
        UrgeUser = $("#UrgeUser").val();
    if ($("#workorder").val())
        WorkOrder = $("#workorder").val();
    if ($("#Handler").val() && $("#Handler").val().indexOf("==请选择==") < 0)
        Handler = $("#Handler").val();
    if ($("#UrgeDate").val())
        UrgeDate = $("#UrgeDate").val();
    if ($("#CCUser").val() && $("#CCUser").val().indexOf("==请选择==") < 0)
        CCUser = $("#CCUser").val();
    LineId = $("select[name=Line]").val();
    if (LineId && LineId.indexOf("==请选择==") > 0)
        LineId = "";
    WorkShopId = $("select[name=WorkShop]").val();
    $.ajax({
        url: '/api/saps/urgerecord?page=' + page + '&rows=' + rows + '&LineId=' + LineId + '&CCUser=' + CCUser + '&UrgeUser=' + UrgeUser + '&WorkOrder=' + WorkOrder + '&Handler=' + Handler + "&UrgeDate=" + UrgeDate + "&WorkShopId=" + WorkShopId,
        type: 'get',
        success: function (value) {
            $("#urgerecord").html("");
            paging(value.total);
            if (value.total > 0) {
                var records = [];
                //var workorder = [];
                $.each(value.rows, function (index, item) {
                    var row = {
                        Index: (index + ((page - 1) * rows) + 1), WorkOrder: item.WorkOrder, UrgeDate: moments(item.UrgeDate).format("YYYY-MM-DD HH:mm"), Handler: item.Handler
                        , HandlerName: item.HandlerName, UrgeUser: item.UrgeUser, UrgeUserName: item.UrgeUserName
                        , Quantity: item.Quantity, CCUser: item.CCUser, CCUserName: item.CCUserName,LineName:item.LineName
                        , ID: item.ID, ProductCode: item.ProductCode, ProductName: item.ProductName, PlanCount: item.PlanCount
                        , CreateTime: moments(item.CreateTime).format("YYYY-MM-DD HH:mm")
                    };
                    records.push(row);
                })
                var record = $("#template-urgerecord").render(records);
                $("#urgerecord").html(record);
            }
        }
    });
}
function GetUser() {
    $.ajax({
        type: 'get',
        url: '/api/sys/UserOrganizeMap?TenantId=' + TenantId,
        success: function (value) {
            if (value.total > 0) {
                //var users = [{ UserId: "", UserCode: "", UserName: "==请选择==" }];
                //$.each(value.rows, function (index, item) {
                //    var row = { UserId: item.UserId, UserCode: item.UserCode, UserName: item.UserName };
                //    users.push(row);
                //})
                //var options = $("#template-UserList").render(users);

                var optgroup = "<option value=''>==请选择==</option>";
                var organize = "";
                $.each(value.rows, function (index, item) {
                    if (organize.indexOf(item.OrganizeCode) < 0) {
                        if (organize === "")
                            optgroup += "<optgroup label='" + item.OrganizeName + "' id='" + item.OrganizeId + "'>";
                        else
                            optgroup += "</optgroup><optgroup label='" + item.OrganizeName + "' id='" + item.OrganizeId + "'>";
                        organize = item.OrganizeCode
                    }
                    optgroup += "<option value='" + item.UserId + "' id='" + item.UserId + "' code='" + item.UserCode + "'>" + item.UserName + "</option>";
                    if (index == value.total - 1)
                        optgroup += "</optgroup>";
                })
                $("#Handler").html(optgroup);
                $("#UrgeUser").html(optgroup);
            }
        }
    });
}
function paging(total) {
    var totalpage = Math.ceil(total / rows);
    var pagefoot = "<li><a href='#' onclick='switchdownpage()'>«</a></li>";
    var startpage = page > 5 ? page - 5 : 1;
    var highpage = totalpage > 5 ? (5 + startpage) : totalpage;
    for (var i = startpage - 1; i < highpage; i++) {
        pagefoot += "<li><a href='#' name='" + (i + 1) + "' onclick='pagejump(" + (i + 1) + ")'>" + (i + 1) + "</a></li>"
    }
    if (totalpage > 5) {
        if (page < totalpage) {
            pagefoot += "<li><a href='#' onclick='pagejump(0)'>…</a></li>";
            pagefoot += "<li><a href='#' onclick='pagejump(" + totalpage + ")'>" + totalpage + "</a></li>";
        }
        pagefoot += "<li><input id='pagejump' /><button onclick='pagejump(0)'>跳转</button></li>";
    }
    pagefoot += "<li><a href='#' onclick='switchuppage(" + totalpage + ")'>»</a></li>";
    $("#pagefoot").html(pagefoot);
    $("#pagejump").keyup(function (event) {
        if (event.keyCode == 13) {
            page = $("#pagejump").val();
            GetUrgeRecord();
        }
    });
    $("a[name=" + page + "]").css("background-color", "#409eff");
    $("a[name=" + page + "]").css("color", "#fff");
}

function pagejump(value) {
    if (value == 0)
        page = $("#pagejump").val();
    else
        page = value;
    GetUrgeRecord();
}

function switchdownpage() {
    if (page > 1)
        page--;

    GetUrgeRecord();
}

function switchuppage(totalpage) {
    if (page < totalpage)
        page++;

    GetUrgeRecord();
}