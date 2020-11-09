var rows = 7;
var page = 1;
$(function () {
    //获取我待办的列表
    GetMyToDo();
});

//获取我待办的列表
function GetMyToDo() {
    var SourceModel = "";
    var LaunchPerson = "";
    var Message = "";
    var DateTime = "";
    if ($("#txtSourceModel").val()) {
        SourceModel = $("#txtSourceModel").val();
    }
    if ($("#txtLaunchPerson").val()) {
        LaunchPerson = $("#txtLaunchPerson").val();
    }
    if ($("#txtMessage").val()) {
        Message = $("#txtMessage").val();
    }
    if ($("#txtDateTime").val()) {
        DateTime = $("#txtDateTime").val();
    }
    $.ajax({
        type: 'get',
        url: '/api/Self/My/GetMyTask?rows=' + rows + '&page=' + page + '&SourceModel=' + SourceModel + '&Message=' + Message + '&DateTime=' + DateTime + '&TenantId=' + TenantId + '&id=' + UserId,
        async: true,
        success: function (value) {
            paging(value.total);
            $("#tbodyContent").html("");
            if (value.status) {
                var html = '';
                $.each(value.rows, function (index, item) {
                    var StatusName = "";
                    if (item.Status == "00") {
                        StatusName = "待发送";
                    }
                    else if (item.Status == "01") {
                        StatusName = "发送中";
                    }
                    else if (item.Status == "02") {
                        StatusName = "发送成功";
                    }
                    else if (item.Status == "03") {
                        StatusName = "发送失败";
                    }
                    var ReceivedTime = "";
                    if (item.ReceivedTime != "" && item.ReceivedTime != null) {
                        ReceivedTime = moment(item.ReceivedTime).format("YYYY-MM-DD HH:mm");;
                    }
                    var Index = (index + (page - 1) * rows + 1);
                    html += "<tr>";
                    html += "<td>" + Index + "</td>";
                    html += "<td>" + item.SourceModel + "</td>";
                    html += "<td>" + item.Message + "</td>";
                    html += "<td>" + item.AssigneeName + "</td>";
                    html += "<td>" + ReceivedTime + "</td>";
                    html += "<td>" + StatusName + "</td>";
                    html += "<td>" + item.ActionName + "</td>";
                    html += "<td>";
                    html += " <div class='enpaty_btn' style='padding:0px 0px 0px 0px'>";
                    html += "<div class='color-btn btn' data-toggle='modal' href='#modal_ckxq' type='button' onclick=\"EditView('" + item.SourceId + "')\">查看</div >";
                    html += "<div class='color-btn btn ' data-toggle='modal' href='#modal_qd' type='button' onclick=\"EditHandle('" + item.SourceId + "')\">处理</div>";
                    html += "</div>";
                    html += "</td >";
                    html += "</tr>";
                });
                $("#tbodyContent").html(html);
            }
            else {
                alert(value.message);
            }
        }
    });
}

//分页方法
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
            GetMyToDo();
        }
    });
    $("a[name=" + page + "]").css("background-color", "#bdedf5");
}

function pagejump(value) {
    if (value == 0)
        page = $("#pagejump").val();
    else
        page = value;
    GetMyToDo();
}

function switchdownpage() {
    if (page > 1)
        page--;
    GetMyToDo();
}

function switchuppage(totalpage) {
    if (page < totalpage)
        page++;
    GetMyToDo();
}

//查询
$("#btnQuery").click(function () {
    GetMyToDo();
})

//查看详情
function EditView(ID) {
    alert(ID);
}

//处理
function EditHandle(ID) {
    alert(ID);
}