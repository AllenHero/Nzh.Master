var workplace = JSON.parse(getCookie("workplace"));
var rows = 7;
var page = 1;
$(function () {
    GetWorkOrder();
})

function GetWorkOrder() {
    //var url = '/api/saps/workorder/GetStatusWorkOrder?LineId=' + workplace.LineId + '&rows=' + rows + '&page=' + page;
    var url = '/api/saps/workorder?LineId=' + workplace.LineId + '&rows=' + rows + '&page=' + page;// +'&sort=&order=';
    $.ajax({
        url: url,
        success: function (value) {
            paging(value.total, "monitor")
            //paging(value.Waiting.total, "waiting")
            //paging(value.Making.total, "making")
            //paging(value.Finish.total, "finish")
            //$("#waiting").html("");
            //$("#making").html("");
            //$("#finish").html("");
            if (value.status) {
                var monitor = [];
                $.each(value.rows, function (index, item) {
                    var row = {
                        Index: (index + (page - 1) * rows + 1), LineName: item.LineName
                        , WorkOrder: item.WorkSheetNo, Quantity: item.PlanCount, ProductName: item.ProductName
                        , PlanStartDate: moments(item.PlanStartDate).format("YYYY-MM-DD HH:mm")
                        , PlanEndDate: moments(item.PlanEndDate).format("YYYY-MM-DD HH:mm"), State: item.Status
                        , StartTime: item.StartTime ? moments(item.StartTime).format("YYYY-MM-DD HH:mm") : ''
                        , EndTime: item.EndTime?moments(item.EndTime).format("YYYY-MM-DD HH:mm"): ''
                        , CompletionNumber: item.CompletedCount, Status: item.Status, Monitor: 0
                    }
                    switch (item.Status) {
                        case 0: row.State = "待生产"; break;
                        case 5: row.State = "生产中"; break;
                        case 10: row.State = "已完成"; break;
                        case 12: row.State = "已关闭"; break;
                        case 15: row.State = "已暂停"; break;
                    }
                    if (item.CompletedCount)
                        row.Monitor = Math.round(row.CompletionNumber * 100 / row.Quantity,1);
                    monitor.push(row);
                });
                $("#monitor").html($("#template-monitor").render(monitor));
                //var waits = [];
                //$.each(value.Waiting.rows, function (index, item) {
                //    var row = {
                //        Index: (index + (page - 1) * rows + 1), LineName: item.LineName
                //        , WorkOrder: item.WorkSheetNo, Quantity: item.PlanCount, ProductName: item.ProductName
                //        , PlanStartDate: moments(item.PlanStartDate).format("YYYY-MM-DD HH:mm")
                //        , PlanEndDate: moments(item.PlanEndDate).format("YYYY-MM-DD HH:mm"), State: item.Status
                //    }
                //    switch (item.Status) {
                //        case 0: row.State = "待生产"; break;
                //        case 5: row.State = "生产中"; break;
                //        case 10: row.State = "已完成"; break;
                //        case 12: row.State = "已关闭"; break;
                //        case 15: row.State = "已暂停"; break;
                //    }
                //    waits.push(row);
                //});
                //var made = [];
                //$.each(value.Making.rows, function (index, item) {
                //    var row = {
                //        Index: (index + (page - 1) * rows + 1), LineName: item.LineName
                //        , WorkOrder: item.WorkSheetNo, Quantity: item.PlanCount, ProductName: item.ProductName
                //        , PlanStartDate: moments(item.PlanStartDate).format("YYYY-MM-DD HH:mm")
                //        , PlanEndDate: moments(item.PlanEndDate).format("YYYY-MM-DD HH:mm"), State: item.Status
                //        , StartTime: item.StartTime ? moments(item.StartTime).format("YYYY-MM-DD HH:mm") : ''
                //        , EndTime: item.EndTime?moments(item.EndTime).format("YYYY-MM-DD HH:mm"): ''
                //        , CompletionNumber: item.CompletedCount
                //    }
                //    switch (item.Status) {
                //        case 0: row.State = "待生产"; break;
                //        case 5: row.State = "生产中"; break;
                //        case 10: row.State = "已完成"; break;
                //        case 12: row.State = "已关闭"; break;
                //        case 15: row.State = "已暂停"; break;
                //    }
                //    made.push(row);
                //});
                //var finish = [];
                //$.each(value.Finish.rows, function (index, item) {
                //    var row = {
                //        Index: (index + (page - 1) * rows + 1), LineName: item.LineName
                //        , WorkOrder: item.WorkSheetNo, Quantity: item.PlanCount, ProductName: item.ProductName
                //        , PlanStartDate: moments(item.PlanStartDate).format("YYYY-MM-DD HH:mm")
                //        , PlanEndDate: moments(item.PlanEndDate).format("YYYY-MM-DD HH:mm"), State: item.Status
                //        , StartTime: item.StartTime ? moments(item.StartTime).format("YYYY-MM-DD HH:mm") : ''
                //        , EndTime: item.EndTime ? moments(item.EndTime).format("YYYY-MM-DD HH:mm") : ''
                //        , CompletionNumber: item.CompletedCount
                //    }
                //    switch (item.Status) {
                //        case 0: row.State = "待生产"; break;
                //        case 5: row.State = "生产中"; break;
                //        case 10: row.State = "已完成"; break;
                //        case 12: row.State = "已关闭"; break;
                //        case 15: row.State = "已暂停"; break;
                //    }
                //    finish.push(row);
                //});
                //$("#waiting").html($("#template-waiting").render(waits));
                //$("#making").html($("#template-making").render(made));
                //$("#finish").html($("#template-finish").render(finish));
            } else {
                alert(value.message);
            }
        }
    })
}


function paging(total,name) {
    var totalpage = Math.ceil(total / rows);
    var pagefoot = "<li><a href='#' onclick='switchdownpage()'>«</a></li>";
    var highpage = totalpage > 5 ? 5 : totalpage;
    for (var i = 0; i < highpage; i++) {
        pagefoot += "<li><a href='#' onclick='pagejump(" + (i + 1) + ",\"" + name +"\")'>" + (i + 1) + "</a></li>"
    }
    if (totalpage > 5) {
        pagefoot += "<li><a href='#' onclick='pagejump(0,\""+name+"\")'>…</a></li>";
        pagefoot += "<li><a href='#' onclick='pagejump(" + totalpage + ",\"" + name +"\")'>" + totalpage + "</a></li>";
        pagefoot += "<li><input style='width:20px;height:20px;font-size:5px;' id='pagejump-" + name + "' /><button onclick='pagejump(0,\"" + name +"\")'>跳转</button></li>";
    }
    pagefoot += "<li><a href='#' onclick='switchuppage(" + totalpage + ")'>»</a></li>";
    $("#pagefoot-" + name).html(pagefoot);
    $("#pagejump-" + name).keyup(function (event) {
        if (event.keyCode == 13) {
            page = $("#pagejump-" + name).val();
            GetWorkOrder();
        }
    });
}

function pagejump(value,name) {
    if (value == 0)
        page = $("#pagejump-"+name).val();
    else
        page = value;
    GetWorkOrder();
}

function switchdownpage() {
    if (page > 1)
        page--;

    GetWorkOrder();
}

function switchuppage(totalpage) {
    if (page < totalpage)
        page++;

    GetWorkOrder();
}