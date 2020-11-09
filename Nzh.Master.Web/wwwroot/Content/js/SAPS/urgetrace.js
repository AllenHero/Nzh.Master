var workorder = utils.getQueryString("WorkOrder").replace("#", "");
var ID = utils.getQueryString("ID").replace("#", "");
$(function () {
    GetUrgeTrace();
    $("#workorder").html("工单编号：" + workorder);
})

function GetUrgeTrace() {
    $.ajax({
        url: '/api/saps/urgerecord/GetTrace?WorkOrder=' + workorder + '&TenantId=&ID='+ID,
        success: function (value) {
            $('#trace').html("");
            if (value.total > 0) {
                var trace = [];
                $.each(value.rows, function (index, item) {
                    var process = Math.round(item.CompletedCount / item.PlanCount, 2);
                    var row = {
                        Old: true, WorkOrder: item.WorkSheetNo, ProductCode: item.ProductCode, ProductName: item.ProductName
                        , Quantity: item.PlanCount, PlanStartDate: moments(item.PlanStartDate).format("YYYY-MM-DD HH:mm")
                        , PlanEndDate: moments(item.PlanEndDate).format("YYYY-MM-DD HH:mm")
                        , StartTime: moments(item.StartTime).format("YYYY-MM-DD HH:mm")
                        , EndTime: moments(item.EndTime).format("YYYY-MM-DD HH:mm")
                        , CompletionNumber: item.CompletedCount
                        , State: item.State, LineId: item.LineId, LineName: item.LineName
                        , UrgeDate: moments(item.UrgeDate).format("YYYY-MM-DD")
                        , HandlerName: item.HandlerName, UrgeUserName: item.UrgeUserName
                        , CCUserName: item.CCUserName, WorkShopName: item.WorkShopName
                    }
                    switch (row.State) {
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