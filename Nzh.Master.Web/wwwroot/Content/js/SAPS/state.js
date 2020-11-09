var workorder = "";
var productcode = "";
var customer = "";
var rows = 7, page = 1;
$(function () {
    $("#workorder").change(function () {
        workorder = $(this).val();
        GetWorkOrder();
    });
    $("#productno").change(function () {
        productcode = $(this).val();
        GetWorkOrder();
    });
    $("#select-customer").change(function () {
        if ($(this).val() && $(this).val().indexOf("==请选择==") < 0) {
            customer = $(this).val();
            GetWorkOrder();
        }
    });
    GetCustomer();
    GetWorkOrder();
})

function GetCustomer() {
    $.ajax({
        url: '/api/sys/Customer',
        type: 'get',
        success: function (value) {
            if (value.total > 0) {
                var rows = value.rows;
                var option = [{ Value: "", Code: "", Text: "==请选择==", Id: "" }];
                $.each(rows, function (index, item) {
                    var row = { Value: item.CustomerName, Code: item.CustomerCode, Text: item.CustomerName ,Id:item.CustomerId};
                    option.push(row);
                });
                $("#select-customer").html($("#template-selectoption").render(option));
            }
        }
    })
}

function GetWorkOrder() {
    $.ajax({
        url: '/api/saps/worksheet?rows=' + rows + '&page=' + page + '&WorkSheetNo=' + workorder + '&ProductCode=' + productcode + "&Customer=" + customer,
        type: 'get',
        success: function (value) {
            paging(value.total);
            $("#workorderstates").html("");
            if (value.total > 0) {
                var rows = value.rows;
                var orders = [];
                $.each(rows, function (index, item) {
                    var row = {
                        Index: (index + 1), Red: false, WorkOrder: item.WorkSheetNo, State: item.Status, ProductCode: item.ProductCode
                        , ProductName: item.ProductName, LineName: item.LineName, PlanStartTime: item.PlanStartDate
                        , PlanEndTime: item.PlanEndDate, RealStartTime: item.StartTime, RealEndTime: item.EndTime
                        , PlanQuantity: item.PlanCount, CompletionNumber: item.CompletedCount, Remainder: item.RestCount
                    };
                    switch (item.Status) {
                        case 0: row.State = "未生产"; break;
                        case 5: row.State = "生产中"; break;
                        case 10: row.State = "已完成"; break;
                        case 12: row.State = "已关闭"; row.Red = true; break;
                        case 15: row.State = "已暂停"; row.Red = true; break;
                    }
                    orders.push(row);
                });
                $("#workorderstates").html($("#template-trdata").render(orders));
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
        pagefoot += "<li><input style='width:20px;height:20px;font-size:5px;' id='pagejump' /><button onclick='pagejump(0)'>跳转</button></li>";
    }
    pagefoot += "<li><a href='#' onclick='switchuppage(" + totalpage + ")'>»</a></li>";
    $("#pagefoot").html(pagefoot);
    $("#pagejump").keyup(function (event) {
        if (event.keyCode == 13) {
            page = $("#pagejump").val();
            GetWorkOrder();
        }
    });
    $("a[name=" + page + "]").css("background-color", "#bdedf5");
}


function pagejump(value) {
    if (value == 0)
        page = $("#pagejump").val();
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