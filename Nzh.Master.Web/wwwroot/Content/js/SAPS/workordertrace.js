var workorder = utils.getQueryString("WorkOrder").replace("#", "");
$(function () {
    GetWorkOrderTrace();
    $("#workorder").html("工单编号：" + workorder);
})

function GetWorkOrderTrace() {
    $.ajax({
        url: '/api/saps/workorder/GetTrace?WorkOrder=' + workorder+'&TenantId=',
        success: function (value) {
            $('#trace').html("");
            if (value.total > 0) {
                var trace = [];
                $.each(value.rows, function (index, item) {
                    var process = Math.round(item.CompletedCount * 100.0 / item.PlanCount,2);
                    var row = {
                        Old: true, WorkOrder: item.WorkSheetNo, ProductCode: item.ProductCode, ProductName: item.ProductName
                        , Quantity: item.PlanCount, PlanStartDate: moments(item.PlanStartDate).format("YYYY-MM-DD HH:mm")
                        , PlanEndDate: moments(item.PlanEndDate).format("YYYY-MM-DD HH:mm")
                        , StartTime: moments(item.StartTime).format("YYYY-MM-DD HH:mm")
                        , EndTime: moments(item.EndTime).format("YYYY-MM-DD HH:mm")
                        , CompletionNumber: item.CompletedCount
                        , State: item.State, ModifyUser: item.ModifyUser, Process: process
                        , ModifyDate: moments(item.ModifyDate).format("YYYY-MM-DD HH:mm")
                    }
                    var state = item.State ? item.State : item.Status;
                    row.ModifyDate = Date.parse(row.ModifyDate) ? row.ModifyDate : moments(item.CreateDate).format("YYYY-MM-DD HH:mm");
                    switch (state) {
                        case 0: row.State = "待生产"; break;
                        case 5: row.State = "生产中"; break;
                        case 10: row.State = "已完成"; break;
                        case 12: row.State = "已关闭"; break;
                        case 15: row.State = "已暂停"; break;
                    }
                    if (index == 0)
                        row.Old = false;
                    trace.push(row);
                })
                $('#trace').html($('#template-trace').render(trace));
            }
        }
    });
}