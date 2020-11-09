var workplace = JSON.parse(getCookie("workplace"));
var rows = 7;
var page = 1;
var focus="";
var userlist;
var finduser="";
$(function () {
    GetUser();
    GetOverdueWorkOrder();
    $("button[name=submit]").click(function () {
        page = 1;
        UrgeWorkOrder($(this).val());
    });
    $("input").click(function () {
        switch ($(this).attr("name")) {
            case "CCUser": focus = $("CCUser"); break;
            case "Handler": focus = $("Handler"); break;
        }
    });
    $("input[name=Handler]").click(function () {
        focus = $("#Handler");
    });
    $("input[name=CCUser]").click(function () {
        focus = $("#CCUser");
    });
    //查找人
    $("#findUser").click(function () {
        FindUser();
    });
    $("#inputUserName").change(function () {
        FindUser();
    });
    $("#urgedate").val(moments().format("YYYY-MM-DD"));
    $("#inputText1").change(function () {
        var max = $("button[name=submit]").attr("qty");
        var value = parseInt(this.value);
        if (value > 0) {
            if (value > max)
                this.value = max;
        }
    });
})

function GetOverdueWorkOrder() {
    $.ajax({
        type: 'get',
        url: '/api/saps/workorder/GetOverdueWorkOrder?rows=' + rows + '&page=' + page + '&LineId=' + workplace.LineId,
        beforeSend: jQueryShowLoading(),//显示加载图标
        success: function (value) {
            jQuery('body').hideLoading();//隐藏加载图标
            paging(value.total);
            if (value.total>0) {
                var list = [];
                $("#overdueworkorder").html("");
                $.each(value.rows, function (index, item) {
                    var row = {
                        Index: (index + (parseInt(page) - 1) * parseInt(rows) + 1), LineName: item.LineName, WorkSheetNo: item.WorkSheetNo, ProductCode: item.ProductCode
                        , ProductName: item.ProductName, PlanQuantity: item.PlanCount, CompletionNumber: item.CompletedCount
                        , Remainder: item.RestCount, PlanStartDate: moments(item.PlanStartDate).format("YYYY-MM-DD HH:mm")
                        , PlanEndDate: moments(item.PlanEndDate).format("YYYY-MM-DD HH:mm")
                        , DelayTimes: item.DelayTimes, OverdueTimes: item.OverdueTimes, Status: item.Status
                        , DelayUnit: item.DelayUnit == "Hour" ? "H" : "D"
                        , OverdueUnit: item.OverdueUnit == "Hour" ? "H" : "D"
                        , Qty: item.Qty, Ticket: true, DYellow: false, OYellow: false
                        , Delay: item.DelayTimes > 0 ? true : false, Overdue: item.OverdueTimes > 0 ? true: false
                    };
                    //if (item.Status == 5)
                    //    row.Unit = "天";
                    //延时两小时以内为黄色
                    if (item.DelayUnit == "Hour" && item.DelayTimes <= 2)
                        row.DYellow = true;
                    if (item.OverdueUnit == "Hour" && item.OverdueTimes <= 2)
                        row.OYellow = true;
                    if (item.Qty == 0)
                        row.Ticket = false;
                    list.push(row);
                })
                $("#overdueworkorder").html($("#template-overdueworkorder").render(list));

                //催单界面打开时初始化员工列表
                $("td[name=plan-cui]").click(function () {
                    $("button[name=submit]").val($(this).attr("value")).attr("qty", $(this).attr("qty"));
                    $("#inputText1").val($(this).attr("qty"));
                    $("#urgedate").val(moments().format("YYYY-MM-DD"));
                });
                //$("[data-toggle=modal]").click(function () {
                //    parent.modal();
                //});
            }
        }
    });
}
//分页
function UrgeWorkOrder(wo) {
    var quantity = $("#inputText1").val();
    var urgedate = $("#urgedate").val();
    var handler = "";
    var CCUser = "";
    $.each($("#CCUser li"), function (index, item) {
        CCUser += item.id+',';
    })
    CCUser = CCUser.trim(',');
    $.each($("#Handler li"), function (index, item) {
        handler += item.id + ',';
    })
    handler = handler.trim(',');

    var params = JSON.stringify({
        WorkOrder: wo, Quantity: quantity, UrgeDate: urgedate, Handler: handler, CCUser: CCUser, LineId: workplace.LineId
        ,TenantId: "",UrgeUser:""
    });
    $.ajax({
        type: 'post',
        url: '/api/SAPS/UrgeRecord/EditInsert',
        data: params,
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: jQueryShowLoading(),//显示加载图标
        success: function (value) {
            jQuery('body').hideLoading();//隐藏加载图标
            if (value.status) {
                $("#modal-cui").modal("hide");

                $("#inputText1").val("");
                $("#urgedate").val("");
                $("#CCUser").html("");
                $("#Handler").html("");
                UserList();
                GetOverdueWorkOrder();
            }
        }
    });
}

function FindUser() {
    var users = [];//$("li[name=" + $("#inputUserName").val() + "]");
    if ($("#inputUserName").val() == "")
        UserList();
    else {
        $.each($("#UserList li"), function (index, item) {
            var name = $(item).attr("name");
            if (name.indexOf($("#inputUserName").val()) != -1)
                users.push(item);
        });
        $("#UserList").html("");
        $("#UserList").append(users);
        $("#UserList li").unbind().dblclick(function () {
            adduser(this)
        })
    }
}

function adduser(obj) {
    if (focus) {
        var li = '<li id="' + $(obj).attr("id") + '" code="' + $(obj).attr("code") + '" name="' + $(obj).attr("name") + '">' + $(obj).text() + '</li>'
        $(focus).append(li);
        $(obj).remove();
        //删除已经选择人员
        $("#CCUser li").unbind().dblclick(function () {
            var li = '<li id="' + this.id + '" code="' + $(this).attr("code") + '" name="' + $(this).attr("name") + '">' + $(this).text() + '</li>'
            $("#UserList").append(li);
            $("#UserList li").unbind().dblclick(function () {
                adduser(this)
            })
            $(this).remove();
        })
        $("#Handler li").unbind().dblclick(function () {
            var li = '<li id="' + this.id + '" code="' + $(this).attr("code") + '" name="' + $(this).attr("name") + '">' + $(this).text() + '</li>'
            $("#UserList").append(li);
            $("#UserList li").unbind().dblclick(function () {
                adduser(this)
            })
            $(this).remove();
        })
    }
}

function GetUser() {
    $.ajax({
        type: 'get',
        url: '/api/sys/user?TenantId='+TenantId,
        success: function (value) {
            if (value.total > 0) {
                userlist = value.rows;
                UserList()
            }
        }
    });
}

function UserList() {
    var users = [];
    $.each(userlist, function (index, item) {
        var row = { UserId: item.UserId, UserCode: item.UserCode, UserName: item.UserName };
        if ($("li[name=" + row.UserName + "]").length==0)
            users.push(row);
    })
    $("#UserList").html($("#template-userlist").render(users));
    $("#UserList li").unbind().dblclick(function () {
        adduser(this)
    })
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
        pagefoot += "<li><input style='width:20px;height:20px;font-size:5px;' id='pagejump' /><button onclick='pagejump(0)'>跳转</button></li>";
    }
    pagefoot += "<li><a href='#' onclick='switchuppage(" + totalpage + ")'>»</a></li>";
    $("#pagefoot").html(pagefoot);
    $("#pagejump").keyup(function (event) {
        if (event.keyCode == 13) {
            page = $("#pagejump").val();
            GetOverdueWorkOrder();
        }
    });
    $("a[name=" + page + "]").css("background-color", "#bdedf5");
}

function pagejump(value) {
    if (value == 0)
        page = $("#pagejump").val();
    else
        page = value;
    GetOverdueWorkOrder();
}

function switchdownpage() {
    if (page > 1)
        page--;

    GetOverdueWorkOrder();
}

function switchuppage(totalpage) {
    if (page < totalpage)
        page++;

    GetOverdueWorkOrder();
}