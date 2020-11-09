var txtCurrentUserStorageName = "WorkOrderMainFiles(" + UserCode + ")";
var table;
$(function () {
    //table列初始化
    var columnsArray = [
        { "data": 'Index', "title": "详  情", "searchable": false, "width": "80px", "visible": true, "sortable": false, "display": false },
        { "data": 'Index', "title": "操  作", "searchable": false, "width": "80px", "visible": true, "sortable": false },
        { "data": 'OrderNo', "title": "生产制令", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'WorkSheetNo', "title": "工单编号", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'ProductCode', "title": "产品代码", "searchable": true, "width": "120px", "visible": true, "sortable": true },
        { "data": 'ProductName', "title": "产品名称", "searchable": true, "width": "120px", "visible": true, "sortable": true, "render": "" },
        { "data": 'OrganizeName', "title": "组织名称", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": "" },
        { "data": 'PlanCount', "title": "工单计划量", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'CompletedCount', "title": "已报工数量", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'PlanStartDate', "title": "计划开工时间", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": FormatDate },
        { "data": 'StartTime', "title": "实际开工时间", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": FormatDate },
        { "data": 'EndTime', "title": "实际完工时间", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": FormatDate }
    ];

    //从缓存中获取列的配置文件
    var columnsArrayStorage = JSON.parse(localStorage.getItem(txtCurrentUserStorageName));
    if (localStorage && columnsArrayStorage) {
        for (var i = 0; i < columnsArrayStorage.length; i++) {
            if (columnsArrayStorage[i].renderValue != undefined) {
                columnsArrayStorage[i].render = returnFunctionName(columnsArrayStorage[i].renderValue);
            }
        }
        columnsArray = columnsArrayStorage;
    }

    //datatables 参数配置
    var datatableSetting = {
        //"dom": 'Bfrtip',
        "bPaginate": true, //翻页功能
        "bLengthChange": true, //改变每页显示数据数量
        colReorder: true,
        "processing": true,     //开启加载等待提示，提示信息是下面language中的sProcessing配置
        "serverSide": true,     //打开服务器模式
        "bDestroy": true,
        "scrollX": true,
        "ajax": {
            "url": "/api/saps/reportjob/EditReportJobTable",
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "data": function (d) {
                //d = { OrderNo: '', WorkSheetNo: '', LineId: '', PlanDate:''};
                if ($("input[name=OrderNo]").val())
                    d.OrderNo = $("input[name=OrderNo]").val();
                if ($("input[name=WorkSheetNo]").val())
                    d.WorkSheetNo = $("input[name=WorkSheetNo]").val();
                //if (queryLineCombotree.datas().length > 0)
                //    d.LineId = queryLineCombotree.datas()[0].id;
                if (queryOrganizeCombotree.datas().length > 0)
                    d.OrganizeId = queryOrganizeCombotree.datas()[0].id;
                if ($("input[name=PlanDate]").val())
                    d.PlanDate = $("input[name=PlanDate]").val();
                return JSON.stringify(d);
            }
        },
        "aaSorting": [[9, "desc"]],//默认第几个排序
        "columns": columnsArray,
        "dom": 'Brt<"bottom">ilp<"clear">',
        buttons: [
            {
                text: '<i class="font_ilean iconfont icon-jindu"></i>',
                action: function (e, dt, node, config) {
                    $('#myDialogShow').modal('show').css({
                        width: '600px',
                        'margin-left': function () {
                            return -($(this).width() / 2);
                        }
                    });
                }
            }
        ],
        "columnDefs": [
            {
                "targets": 0,//第1列
                "render": function (data, type, row, meta) {
                    return document.getElementById("upanddown").innerHTML;
                }
            },
            {
                "targets": 1,//第2列
                "render": function (data, type, row, meta) {
                    return "<button class='btn btn-primary' data='" + JSON.stringify(row) + "' name='WorkOrderReport' data-toggle='modal' href='#modal_bg'><i class='font_ilean iconfont icon-luru2'>报工</button>";
                }
            }
        ],
        // 国际化
        language: {
            "sProcessing": "处理中...",
            "sLengthMenu": "显示 _MENU_ 项结果",
            "sZeroRecords": "没有匹配结果",
            "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
            "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
            "sInfoFiltered": "",
            "sInfoPostFix": "",
            "sSearch": "搜索:",
            "sUrl": "",
            "sEmptyTable": "表中数据为空",
            "sLoadingRecords": "载入中...",
            "sInfoThousands": ",",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上页",
                "sNext": "下页",
                "sLast": "末页"
            }
        },
        "fnDrawCallback": function () {
            subTable();
        }
    };

    //页面数据初始化
    table = $('#dataList').on('init.dt', function (e, settings, json) {
        //subTable();
    }).DataTable(datatableSetting);

    //初始化弹出框内容
    for (var i = 0; i < columnsArray.length; i++) {
        if (columnsArray[i].data != "") {
            var strChecked = columnsArray[i].visible ? "checked" : "";
            var tempHtml = "<tr data=\"" + columnsArray[i].data + "\" searchable=\"" + columnsArray[i].searchable + "\" width=\"" + columnsArray[i].width + "\" title=\"" + columnsArray[i].title + "\" sortable=\"" + columnsArray[i].sortable + "\">";
            tempHtml += "<td>" + (i + 1) + "</td> ";
            tempHtml += "<td>" + columnsArray[i].title + "</td> ";
            tempHtml += "<td><input type=\"checkbox\" id=\"listCheckUserNo\" " + strChecked + " /></td> ";
            if (i < 4) {
                tempHtml += "<td></td> ";
                tempHtml += "<td></td>";
                if (typeof (columnsArray[i].render) != "undefined") {
                    tempHtml += "<td>" + columnsArray[i].render.name + "</td>";
                }
                else {
                    tempHtml += "<td></td>";
                }
            }
            else {
                tempHtml += "<td><a class='up'>上移</a></td> ";
                tempHtml += "<td><a class='dwn'>下移</a></td>";
                if (typeof (columnsArray[i].render) != "undefined") {
                    tempHtml += "<td>" + columnsArray[i].render.name + "</td>";
                }
                else {
                    tempHtml += "<td></td>";
                }
            }
            tempHtml += "</tr >";
            $("#tableColShowHide tbody").append(tempHtml);
        }
    }

    //修改弹出框序号
    for (var i = 0; i < $('#tableColShowHide tbody tr').length; i++) {
        $('#tableColShowHide tbody tr:eq(' + i + ') td:eq(0)').html((i + 1));
    }

    //弹出框确定按钮事件
    $("#btnConfirmContent").click(function () {
        var newColumnsArray = new Array();
        for (var i = 0; i < $("#tableColShowHide tbody tr").length; i++) {
            var rows = $("#tableColShowHide tbody tr:eq(" + i + ")");
            if (rows.children("td:eq(5)").html() != "") {
                newColumnsArray.push({
                    "data": rows.attr("data"),
                    "title": rows.attr("title"),
                    "searchable": rows.attr("searchable"),
                    "width": rows.attr("width"),
                    "sortable": rows.attr("sortable"),
                    "visible": rows.children(2).children("input").is(':checked'),
                    "renderValue": rows.children("td:eq(5)").html(),
                    "render": returnFunctionName(rows.children("td:eq(5)").html())
                });
            } else {
                newColumnsArray.push({
                    "data": rows.attr("data"),
                    "title": rows.attr("title"),
                    "searchable": rows.attr("searchable"),
                    "width": rows.attr("width"),
                    "sortable": rows.attr("sortable"),
                    "visible": rows.children(2).children("input").is(':checked')
                });
            }
        }

        localStorage.setItem(txtCurrentUserStorageName, JSON.stringify(newColumnsArray));
        columnsArray = newColumnsArray;
        datatableSetting.columns = newColumnsArray;

        $('#dataList').DataTable().clear();
        $('#dataList').DataTable().destroy();
        table = $('#dataList').DataTable({
            "bPaginate": true, //翻页功能
            "bLengthChange": true, //改变每页显示数据数量
            colReorder: true,
            "processing": true,     //开启加载等待提示，提示信息是下面language中的sProcessing配置
            "serverSide": true,     //打开服务器模式
            "bDestroy": true,
            "scrollX": true,
            "ajax": {
                "url": "/api/saps/reportjob/EditReportJobTable",
                "type": "POST",
                "contentType": "application/json; charset=utf-8",
                "data": function (d) {
                    if ($("input[name=OrderNo]").val())
                        d.OrderNo = $("input[name=OrderNo]").val();
                    if ($("input[name=WorkSheetNo]").val())
                        d.WorkSheetNo = $("input[name=WorkSheetNo]").val();
                    //if (queryLineCombotree.datas().length > 0)
                    //    d.LineId = queryLineCombotree.datas()[0].id;
                    if (queryOrganizeCombotree.datas().length > 0)
                        d.OrganizeId = queryOrganizeCombotree.datas()[0].id;
                    if ($("input[name=PlanDate]").val())
                        d.PlanDate = $("input[name=PlanDate]").val();
                    return JSON.stringify(d);
                }
            },
            "aaSorting": [[9, "desc"]],//默认第几个排序
            "columns": columnsArray,
            "dom": 'Bfrt<"bottom">ilp<"clear">',
            buttons: [
                {
                    text: '<i class="font_ilean iconfont icon-jindu"></i>',
                    action: function (e, dt, node, config) {
                        $('#myDialogShow').modal('show').css({
                            width: '600px',
                            'margin-left': function () {
                                return -($(this).width() / 2);
                            }
                        });
                    }
                }
            ],
            "columnDefs": [
                {
                    "targets": 0,//第1列
                    "render": function (data, type, row, meta) {
                        return document.getElementById("upanddown").innerHTML;
                    }
                },
                {
                    "targets": 1,//第2列
                    "render": function (data, type, row, meta) {
                        var reportjob = "";
                        if (viewModel.button.EditReportJob) {
                            reportjob = "<button class='btn btn-primary' data='" + JSON.stringify(row) + "' name='WorkOrderReport' data-toggle='modal' href='#modal_bg'>><i class='font_ilean iconfont icon-luru2'>报工</button>";
                        }
                        return reportjob;
                    }
                }
            ],
            // 国际化
            language: {
                "sProcessing": "处理中...",
                "sLengthMenu": "显示 _MENU_ 项结果",
                "sZeroRecords": "没有匹配结果",
                "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
                "sInfoFiltered": "",
                "sInfoPostFix": "",
                "sSearch": "搜索:",
                "sUrl": "",
                "sEmptyTable": "表中数据为空",
                "sLoadingRecords": "载入中...",
                "sInfoThousands": ",",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "上页",
                    "sNext": "下页",
                    "sLast": "末页"
                }
            },
            "fnDrawCallback": function () {
                subTable();
            }
        });
    });

    //上移行的事件
    $('#tableColShowHide tbody').on('click', 'a[class="up"]', function () {
        var rowContent = $(this).parents("tr").html();
        var rowNewContent = "";
        var rowindex = $(this).parents("tbody").find("tr").index($(this).parents("tr")); //行号
        if (rowindex > 4) {
            rowNewContent = $('#tableColShowHide tbody').children()[rowindex].outerHTML;
            $('#tableColShowHide tbody tr:eq(' + (rowindex - 1) + ')').before(rowNewContent);
            $('#tableColShowHide tbody tr:eq(' + (rowindex + 1) + ')').remove();
            for (var i = 0; i < $('#tableColShowHide tbody tr').length; i++) {
                $('#tableColShowHide tbody tr:eq(' + i + ') td:eq(0)').html((i + 1));
            }
        }
    });

    //下移行的事件
    $('#tableColShowHide tbody').on('click', 'a[class="dwn"]', function () {
        var rowNewContent = "";
        var rowindex = $(this).parents("tbody").find("tr").index($(this).parents("tr")); //行号
        if (rowindex < $('#tableColShowHide tbody tr').length - 1) {
            rowNewContent = $('#tableColShowHide tbody').children()[rowindex].outerHTML;
            $('#tableColShowHide tbody tr:eq(' + (rowindex + 1) + ')').after(rowNewContent);
            $('#tableColShowHide tbody tr:eq(' + (rowindex) + ')').remove();
            for (var i = 0; i < $('#tableColShowHide tbody tr').length; i++) {
                $('#tableColShowHide tbody tr:eq(' + i + ') td:eq(0)').html((i + 1));
            }
        }
    });

    //清空查询条件
    $("button[name=queryClear]").click(function () {
        $("input[group=query]").val('');
        //queryLineCombotree.clear();
        queryOrganizeCombotree.clear();
    });

    //查询按钮事件
    $("button[name=querySubmit]").click(function () {
        table.ajax.reload(null, true);
        subTable();
    });
})
function FormatDate(data, type, full, meta) {
    return data ? moments(data).format("YYYY-MM-DD HH:mm:ss") : "";
}

//根据字符串转换为函数
function returnFunctionName(name) {
    switch (name) {
        case 'FormatDate':
            return FormatDate;
    }
}

function subTable() {
    var template = '<td colspan="12"><ul style="margin:10px;padding:0"><li>';
    template += '<table style="table-layout:fixed;width:100%;" class="table data-table table-striped table-hover">';
    template += '<thead><tr style="background:#f7f7f7">';
    template += '<th style="width:10%;" class="#">查看详情</th>';
    template += '<th style="width:12%;" class="#">工单编号</th>';
    template += '<th style="width:11%;" class="#">报工单编号</th>';
    template += '<th style="width:12%;" class="#">组织名称</th>';
    template += ' <th style="width:10%;" class="#">报工数量</th>';
    template += '<th style="width:10%;" class="#">良品数量</th>';
    template += '<th style="width:10%;" class="#">不良品数量</th>';
    template += '<th style="width:10%;" class="#">报工人</th>';
    template += '<th style="width:15%;" class="#">报工时间</th>';
    template += '</tr></thead>';
    template += "<tbody style='background:#fff;' id='{WorkSheetNo}'>";
    template += '</tbody></table></li></ul></td>';
    var trList = document.getElementById("dataList").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    var rowList = [];
    for (var i = 0; i <= trList.length - 1; i++) {
        var newrow = document.createElement("tr");
        newrow.classList.add("chidrentable");
        newrow.style.display = "none";
        newrow.innerHTML = trList[i].cells[3] ? template.replace("{WorkSheetNo}", trList[i].cells[3].innerHTML) : '';

        trList[i].setAttribute("name", "expandable");
        trList[i].setAttribute("data", trList[i].cells[3] ? trList[i].cells[3].innerHTML : '');
        trList[i].setAttribute("status", true);

        rowList.push(trList[i]);
        rowList.push(newrow);
    };
    document.getElementById("dataList").getElementsByTagName("tbody")[0].innerHTML = "";
    for (var i = 0; i <= rowList.length - 1; i++) {
        document.getElementById("dataList").getElementsByTagName("tbody")[0].appendChild(rowList[i]);
    }

    OnAfterLoad();
}