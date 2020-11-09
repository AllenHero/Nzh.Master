
rows = 7;
page = 1;
var exceptionInfo = null;
var sourceId = "";
var auditorCombotree = CreateComboTree('auditorCombotree');
var exceptionClassCombotree = CreateComboTree('ExceptionClass');
var exceptionInfoCombotree = CreateComboTree('ExceptionInfo');
var equipmentCombotree = CreateComboTree('EquipmentCode');
var productCombotree = CreateComboTree('ProductCode');
var organizeCombotree = CreateComboTree('HandOrganize');
var workorderCombotree = CreateComboTree('WorkOrder');
var queryAssigneeCombotree = CreateComboTree('queryAssignee');

queryAssigneeCombotree.change = function (value) {

}

function CreateComboTree(id) {
    if (id) return $('#' + id).comboTree({
        source: [],
        isMultiple: false,
        isFirstClassSelectable: false, //第一级是否可选
        cascadeSelect: true,
        selectedlength: 3,
        url: '',
        method: 'get',
        change: function (value) {
        }//最多可选
    });
}

function fullScreen(el) {
    var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen,
        wscript;
    if (typeof rfs != "undefined" && rfs) {
        rfs.call(el);
        return;
    }
    if (typeof window.ActiveXObject != "undefined") {
        wscript = new ActiveXObject("WScript.Shell");
        if (wscript) {
            wscript.SendKeys("{F11}");
        }
    }
}

function exitFullScreen(el) {
    var el = document,
        cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen,
        wscript;
    if (typeof cfs != "undefined" && cfs) {
        cfs.call(el);
        return;
    }
    if (typeof window.ActiveXObject != "undefined") {
        wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
            wscript.SendKeys("{F11}");
        }
    }
}

$(function () {
    //$("body").dblclick(function () {
    //    fullScreen(this);
    //});
    //GetMyTask();
    //GetUser();
    GetOrganizeUser();//
    GetExceptionClass();
    GetExceptionInfo();
    GetOrganize();
    GetInventory();
    GetEquipment();
    GetWorkOrder();
    //隐藏所有详情
    $("div[group=layer]").hide();

    $("input[group=radio]").click(function () {
        $("input[group=radio]").removeAttr("checked");
        $(this).attr("checked", "checked");
    });

    $("select[name=ExceptionClass]").change(function () {
        GetExceptionInfo();
    });

    $("button[name=more]").click(function () {
        $("input[name=sendTime]").val("");
    });

    $("button[name=query]").click(function () {
        //$("[group=query]").val("");
        page = 1;
        GetMyTask();
    });

    //取消签到
    $("button[name=qdCancel]").click(function () {
        $("input[name=HandleCode]").val("");
    });

    //检查输入账号是否责任人
    $("button[name=qdSubmit]").click(function () {
        if ($("input[name=HandleCode]").val()) {
            var data = $(this).attr("data");
            var self = this;
            $.ajax({
                url: '/api/andon2/andon/EditCheck?UserCode=' + $("input[name=HandleCode]").val(),
                type: 'Post',
                data: data,
                dataType: 'json',
                contentType: 'application/json',
                success: function (value) {
                    //责任验证通过后提交签到
                    if (value.status) {
                        SaveTask(data);
                        $(self).removeAttr("data");
                        $("#modal_qd").modal("hide");
                    } else {
                        toastr.warning(value.message);
                    }
                }
            });
        }
    });

    //解除异常
    $("button[name=jcSubmit]").click(function () {
        var score = $(this).attr("star");
        var data = $(this).attr("data");
        //确认评分完成并提交
        if (score > 0) {
            var record = JSON.parse(data);
            record.Score = score;
            SaveTask(JSON.stringify(record));
        } else {
            toastr.info("请评分");
        }
    });

    //异常录入 
    $("button[name=lrCancel]").click(function () {
        $("[group=measure]").val("");
    });

    $("button[name=lrSubmit]").click(function () {
        var record = $(this).attr("data");
        var data = JSON.parse(record);
        //确认异常处理过程填写正常并提交
        if (CheckExceptionMeasure()) {
            data.ExceptionId = exceptionInfoCombotree.datas()[0].id;//$("select[name=ExceptionInfo]").val();
            data.OrganizeId = organizeCombotree.datas()[0].id;//$("select[name=HandOrganize]").val();
            data.AuditorId = auditorCombotree.datas()[0].id;//$("select[name=Auditor]").val();
            data.Cause = $("textarea[name=Cause]").val();
            data.Measure = $("textarea[name=Measure]").val();
            data.Suggestion = $("textarea[name=Suggestion]").val();
            //var exceptionclass = exceptionInfoCombotree.datas()[0].title;//$("select[name=ExceptionClass]").val();
            data.ExceptionClass = exceptionClassCombotree.datas()[0].val;//$("option[value=" + exceptionclass + "]").text();
            data.ExceptionInfo = exceptionInfoCombotree.datas()[0].val;//$("option[value=" + data.ExceptionId + "]").text();
            //异常录入非必填项
            if (equipmentCombotree.datas().length > 0) {
                data.EquipmentId = equipmentCombotree.datas()[0].id;//$("select[name=EquipmentCode]").val();
            }
            if (productCombotree.datas().length > 0) {
                data.ProductCode = productCombotree.datas()[0].id;//$("select[name=ProductCode]").val();
            }
            if (workorderCombotree.datas().length > 0) {
                data.WorkOrder = workorderCombotree.datas()[0].id;//$("select[name=WorkOrder]").val();
            }
            SaveTask(JSON.stringify(data));
            $("[group=measure]").val("");
        }
    });

    //异常审核
    $("button[name=shSubmit]").click(function () {
        var record = $(this).attr("data");
        var data = JSON.parse(record);
        data.IsPass = "1";
        if (!$("textarea[name=Comments]").val()) {
            $("textarea[name=Comments]").addClass("require");
        }
        else {
            data.Comments = $("textarea[name=Comments]").val();
            if ($("input[name=IsExample]").is(":checked")) {
                data.IsExample = "1";
                SaveTask(JSON.stringify(data));
                $("[group=auditor]").val("");
            } else if ($("input[name=unExample]").is(":checked")) {
                data.IsExample = "0";
                SaveTask(JSON.stringify(data));
                $("[group=auditor]").val("");
            } else {
                toastr.info("请选择是否保存案例库");
            }
        }
    });

    $("button[name=shCancel]").click(function () {
        var record = $("button[name=shSubmit]").attr("data");
        var data = JSON.parse(record);
        data.IsPass = "0";
        data.IsExample = "0";
        if (!$("textarea[name=Comments]").val()) {
            $("textarea[name=Comments]").addClass("require");
        } else {
            data.Comments = $("textarea[name=Comments]").val();
            data.IsExample = "0";
            SaveTask(JSON.stringify(data));
            $("[group=auditor]").val("");
            $("#modal_sh").modal("hide");
        }
    });

    var columnsArray = [
        { "data": 'Message', "title": "主题", "searchable": false, "width": "120px", "visible": true, "sortable": false, "render": functionFormatMessage },
        { "data": 'AssigneeName', "title": "发送人", "searchable": false, "width": "120px", "visible": true, "sortable": false },
        { "data": 'SendTime', "title": "接收时间", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionFormatSendTime },
        { "data": 'ActionName', "title": "步骤名称", "searchable": false, "width": "120px", "visible": true, "sortable": false },
        { "data": 'SourceName', "title": "来源", "searchable": false, "width": "120px", "visible": true, "sortable": false },
        { "data": 'SourceId', "title": "操作", "searchable": false, "width": "120px", "visible": true, "sortable": false, "render": functionFormatOperation },
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
            "url": "/api/Self/My/EditMyTask",
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "data": function (d) {
                d.id = UserId;
                d.SourceModel = $("select[name=source]").val();
                d.Message = $("input[name=title]").val();
                d.DateTime = $("input[name=sendTime]").val();
                d.TenantId = TenantId;
                var Assignee = "";
                if (queryAssigneeCombotree.datas().length > 0) {
                    Assignee = queryAssigneeCombotree.datas()[0].id;
                }
                d.Assignee = Assignee;
                return JSON.stringify(d);
            }
        },
        "aaSorting": [[2, "desc"]],//默认第几个排序
        "columns": columnsArray,
        "dom": 'Brt<"bottom">ilp<"clear">',
        buttons: [
            {
                text: '<i class="font_ilean iconfont icon-jindu"></i>',
                action: function (e, dt, node, config) {
                    $('#myDialogShow').modal('show').css({
                        width: '500px',
                        'margin-left': function () {
                            return -($(this).width() / 2);
                        }
                    });
                }
            }
        ],
        //"columnDefs": [{
        //    "targets": 5,//第5列
        //    "render": function (data, type, row, meta) {
        //        return '<a href="javascript:;" class="btn blue" id="EditRow">'
        //            + '<i class="fa fa-edit">查看</i>'
        //            + '</a>'
        //            + '<a href="javascript:;" class="btn blue" id="OprRow">'
        //            + '<i class="fa fa-edit">处理</i>'
        //            + '</a>'
        //    }
        //}],
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
        }
    };

    //页面数据初始化
    var table = $('#dataList').DataTable(datatableSetting);

    //初始化弹出框内容
    for (var i = 0; i < columnsArray.length; i++) {
        if (columnsArray[i].data != "") {
            var strChecked = columnsArray[i].visible ? "checked" : "";
            var tempHtml = "<tr data=\"" + columnsArray[i].data + "\" searchable=\"" + columnsArray[i].searchable + "\" width=\"" + columnsArray[i].width + "\" title=\"" + columnsArray[i].title + "\" sortable=\"" + columnsArray[i].sortable + "\">";
            tempHtml += "<td>" + (i + 1) + "</td> ";
            tempHtml += "<td>" + columnsArray[i].title + "</td> ";
            tempHtml += "<td><input type=\"checkbox\" id=\"listCheckUserNo\" " + strChecked + " /></td> ";
            tempHtml += "<td><a class='up'>上移</a></td> ";
            tempHtml += "<td><a class='dwn'>下移</a></td>";
            if (typeof (columnsArray[i].render) != "undefined") {
                tempHtml += "<td>" + columnsArray[i].render.name + "</td>";
            }
            else {
                tempHtml += "<td></td>";
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
                "url": "/api/Self/My/EditMyTask",
                "type": "POST",
                "contentType": "application/json; charset=utf-8",
                "data": function (d) {
                    d.id = UserId;
                    d.SourceModel = $("select[name=source]").val();
                    d.Message = $("input[name=title]").val();
                    d.DateTime = $("input[name=sendTime]").val();
                    d.TenantId = TenantId;
                    var Assignee = "";
                    if (queryAssigneeCombotree.datas().length > 0) {
                        Assignee = queryAssigneeCombotree.datas()[0].id;
                    }
                    d.Assignee = Assignee;
                    return JSON.stringify(d);
                }
            },
            "aaSorting": [[2, "desc"]],//默认第几个排序
            "columns": columnsArray,
            "dom": 'Bfrt<"bottom">ilp<"clear">',
            buttons: [
                {
                    text: '<i class="font_ilean iconfont icon-jindu"></i>',
                    action: function (e, dt, node, config) {
                        $('#myDialogShow').modal('show').css({
                            width: '500px',
                            'margin-left': function () {
                                return -($(this).width() / 2);
                            }
                        });
                    }
                }
            ],
            //"columnDefs": [{
            //    "targets": 5,//第5列
            //    "render": function (data, type, row, meta) {
            //        return '<a href="javascript:;" class="btn blue" id="EditRow">'
            //            + '<i class="fa fa-edit">查看</i>'
            //            + '</a>'
            //            + '<a href="javascript:;" class="btn blue" id="OprRow">'
            //            + '<i class="fa fa-edit">处理</i>'
            //            + '</a>'
            //    }
            //}],
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
            }
        });
    });

    function child(columns) {
        alert(columns);
    }

    //上移行的事件
    $('#tableColShowHide tbody').on('click', 'a[class="up"]', function () {
        var rowContent = $(this).parents("tr").html();
        var rowNewContent = "";
        var rowindex = $(this).parents("tbody").find("tr").index($(this).parents("tr")); //行号
        if (rowindex > 0) {
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

    //查询按钮事件
    $("#btnQuery").click(function () {
        //table.fnClearTable();//清空数据.fnClearTable();//清空数据
        //table.fnDestroy(); //还原初始化了的datatable
        table.ajax.reload(null, true); // user paging is not reset on reload
        //$('#dataList').DataTable(datatableSetting);
    });

    //清空
    $("#btnClear").click(function () {
        //$("#txtSourceModel").val("");
        //$("#txtMessage").val("");
        //$("#txtDateTime").val("");
        $("select[name=source]").val("");
        $("input[name=title]").val("");
        $("input[name=sendTime]").val("");
        queryAssigneeCombotree.clear();
    })

    //查看详情
    $('#dataList tbody').on('click', 'a#EditRow', function () {
        var data = $('#dataList').DataTable().row($(this).parents('tr')).data();
        taskDetail(data.SourceId, "view");
    });

    //处理
    $('#dataList tbody').on('click', 'a#OprRow', function () {
        var data = $('#dataList').DataTable().row($(this).parents('tr')).data();
        sourceId = data.SmsId;
        taskDetail(data.SourceId, "handle");
    });
});

//格式化时间
function functionFormatSendTime(data, type, full, meta) {
    var SendTime = "";
    if (data) {
        SendTime = moment(data).format("YYYY-MM-DD HH:mm:ss")
    }
    return SendTime;
}

//格式化异常描述
function functionFormatMessage(data, type, full, meta) {
    var Message = "";
    if (data.length > 30) {
        Message = data.substring(0, 30) + "...";
    }
    else {
        Message = data;
    }
    return Message;
}

//格式化操作
function functionFormatOperation(data, type, item, meta) {
    return '<a href="javascript:;" class="btn has-tooltip blue"  data-placement="bottom" title="" data-original-title="查看" id="EditRow">'
        + '<i class="font_ilean iconfont icon-chakan1"></i>'
        + '</a>'
        + '<a href="javascript:;" class="btn has-tooltip blue"  data-placement="bottom" title="" data-original-title="处理" id="OprRow" >'
        + '<i class="font_ilean iconfont icon-bianji1"></i>'
        + '</a>'
}

//根据字符串转换为函数
function returnFunctionName(name) {
    switch (name) {
        case 'functionFormatSendTime':
            return functionFormatSendTime
        case 'functionFormatMessage':
            return functionFormatMessage
        case 'functionFormatOperation':
            return functionFormatOperation
    }
}

//获取我的任务
function GetMyTask() {
    var uri = checkQuery();
    $.ajax({
        url: '/api/self/my/GetMyTask/' + UserId + "?IsReaded=&TenantId=" + TenantId + uri + "&page=" + page + "&rows=" + rows + "&sort=&order=",
        beforeSend: jQueryShowLoading(),//显示加载图标
        success: function (value) {
            jQuery('body').hideLoading();//隐藏加载图标
            $("#MyTask").html("");
            paging(value.total);
            if (value.status) {
                var list = [];
                $.each(value.rows, function (index, item) {
                    if (item.SendTime) {
                        item.SendTime = moments(item.SendTime).format("YYYY-MM-DD HH:mm");
                    } else {
                        item.SendTime = "";
                    }
                    var msg = item.Message.substring(0, 30) + "…";
                    var row = {
                        Index: (index + (page - 1) * rows + 1), Id: item.SmsId, SourceId: item.SourceId, Source: item.SourceName, SubMessage: msg, Message: item.Message, Assignee: item.AssigneeName
                        , Receiver: item.ReceiverName, SendTime: item.SendTime, Action: item.ActionName, Data: item
                    };
                    list.push(row);
                });
                $("#MyTask").html($("#template-mytask").render(list));
                $("div[name=view]").click(function () {
                    var id = $(this).attr("value");
                    sourceId = "";
                    taskDetail(id, "view");
                });
                $("div[name=handle]").click(function () {
                    var id = $(this).attr("value");
                    sourceId = $(this).attr("id");
                    taskDetail(id, "handle");
                });

                $(".text-container").mouseover(function () {
                    $(this).children().show();
                });
                $(".text-container").mouseleave(function () {
                    $(this).children().hide();
                });
            } else {
                toastr.warning(value.status);
            }
        }
    });
}

//生成查询条件
function checkQuery() {
    var url = '';
    if ($("select[name=source]").val()) {
        url += "&SourceModel=" + $("select[name=source]").val();
    }
    if ($("input[name=title]").val()) {
        url += "&Message=" + $("input[name=title]").val();
    }
    //if ($("select[name=assignee]").val()) {
    //    url += "&Assignee=" + $("select[name=assignee]").val();
    //}
    if (queryAssigneeCombotree.datas().length > 0) {
        url += "&Assignee=" + queryAssigneeCombotree.datas()[0].id;
    }

    if ($("input[name=sendTime]").val()) {
        url += "&DateTime=" + $("input[name=sendTime]").val();
    }
    return url;
}

//任务详情
function taskDetail(id, type) {
    $.ajax({
        url: '/api/andon2/flowable/GetTask/' + id,
        beforeSend: jQueryShowLoading(),//显示加载图标
        success: function (value) {
            jQuery('body').hideLoading();//隐藏加载图标
            if (value.status) {
                //初始化页面任务详情
                ExceptionDetail(value.rows);
                GetImage(value.rows.ID);
                if (type === "handle") {
                    $("#detailTask").html($("#sectionDetail").html());
                    $("#tabsimple18").html($("#sectionTask").html());
                    switch (value.rows.Action) {
                        case "AndonHandlerReceived": HandlerReceived(value.rows); break;
                        case "AndonSureHandlerArrived": HandlerArrived(value.rows); break;
                        case "AndonExceptionRelieved": Reliever(value.rows); break;
                        case "AndonExceptionHandleProcess": HandleProcess(value.rows); break;
                        case "AndonAuditingHandleProcess": Auditing(value.rows); break;
                        default: ViewProcess(value.rows); break;
                    }
                } else {
                    ViewProcess(value.rows);
                }
            } else {
                toastr.warning(value.message);
            }
        }
    });
}

//保存任务
function SaveTask(data) {
    var record = JSON.parse(data);
    var api = "";
    switch (record.Action) {
        case "AndonHandlerReceived": api = "EditHandlerReceived"; break;
        case "AndonSureHandlerArrived": api = "EditHandlerArrived"; break;
        case "AndonExceptionRelieved": api = "EditRelieved"; break;
        case "AndonExceptionHandleProcess": api = "EditWorkProcess"; break;
        case "AndonAuditingHandleProcess": api = "EditAuditing"; break;
    }
    $.ajax({
        url: '/api/andon2/flowable/' + api + '/' + sourceId,
        type: 'Post',
        data: data,
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: jQueryShowLoading(),//显示加载图标
        success: function (value) {
            jQuery('body').hideLoading();//隐藏加载图标
            if (value.status) {
                window.location.reload();
            } else {
                toastr.warning(value.message);
            }
        }
    });
}

//获取所有人
function GetUser() {
    $.ajax({
        url: '/api/sys/user/GetAllUser?TenantId=' + TenantId,
        success: function (value) {
            if (value.status) {
                var list = [{ id: "", name: "==请选择==" }];
                $.each(value.rows, function (index, item) {
                    var row = { id: item.UserId, name: item.UserName };
                    list.push(row);
                });
                $("select[name=assignee]").html($("#template-option").render(list));
                $("select[name=Auditor]").html($("#template-option").render(list));
            } else {
                toastr.warning(value.message);
            }
        }
    });
}

function GetOrganizeUser() {
    $.ajax({
        url: '/api/sys/userorganizemap/GetOrganizeUser?tenantId=' + TenantId,
        success: function (value) {
            if (value.status) {
                var organizeName = value.rows[0].OrganizeName;
                var organizeId = value.rows[0].OrganizeId;
                var users = [];
                var organizes = [];
                $.each(value.rows, function (index, item) {
                    if (item.OrganizeName !== organizeName) {
                        var organize = { "id": organizeId, "title": organizeName, "subs": users };
                        organizes.push(organize);
                        organizeName = item.OrganizeName;
                        organizeId = item.OrganizeId
                        users = [];
                    }
                    var user = { "id": item.UserId, "title": item.UserName };
                    users.push(user);
                });
                if (users.length > 0) {
                    var organize = { "id": organizeId, "title": organizeName, "subs": users };
                    organizes.push(organize);
                }
                auditorCombotree.setData(organizes);
                $("#auditorCombotree").children(".drop-down-wrap").css("position", "relative");
                queryAssigneeCombotree.setData(organizes);
            }
        }
    });
}

//获取部门
function GetOrganize() {
    $.ajax({
        url: '/api/sys/Organize/GetOrganize?TenantId=' + TenantId,
        success: function (value) {
            if (value.total > 0) {
                var list = [];//[{ id: '', name: "==请选择==" }];
                $.each(value.rows, function (index, item) {
                    var row = { id: item.OrganizeId, title: item.OrganizeName };
                    list.push(row);
                });
                organizeCombotree.setData([{ id: '', title: '所有部门', 'subs': list }]);
                //$("select[name=HandOrganize]").html($("#template-option").render(list));
            }
        }
    });
}

//获取在制工单
function GetWorkOrder() {
    $.ajax({
        url: '/api/saps/workorder/GetAllWorkingOrder?TenantId=' + TenantId,
        success: function (value) {
            if (value.total > 0) {
                var list = [];//[{ id: '', name: "==请选择==" }];
                $.each(value.rows, function (index, item) {
                    var row = { id: item.WorkSheetNo, title: item.WorkSheetNo };
                    list.push(row);
                });
                workorderCombotree.setData([{ id: '', title: '所有工单', 'subs': list }]);
                //$("select[name=WorkOrder]").html($("#template-option").render(list));
            }
        }
    });
}

//异常大类
function GetExceptionClass() {
    $.ajax({
        url: '/api/andon2/exceptioninfo/GetParentException?TenantId=' + TenantId,
        success: function (value) {
            if (value.status) {
                var list = [];//[{ id: '', name: "==请选择==" ,title:"==请选择=="}];
                $.each(value.rows, function (index, item) {
                    //var row = { id: item.ID, name: item.ExceptionName };
                    var row = { id: item.ID, title: item.ExceptionName };
                    list.push(row);
                });
                //$("select[name=ExceptionClass]").html($("#template-option").render(list));
                exceptionClassCombotree.setData([{ id: '', title: '所有大类', 'subs': list }]);
                exceptionClassCombotree.change = function () {
                    GetExceptionInfo();
                }
            }
        }
    });
}

//异常小类
function GetExceptionInfo() {
    var exception = '';
    if (exceptionClassCombotree.datas().length > 0)
        exception = exceptionClassCombotree.datas()[0].id;

    var url = '/api/andon2/exceptioninfo/GetException?TenantId=' + TenantId + '&ParentId=';
    if (exception) {
        url += exception;
    }
    $.ajax({
        url: url,
        success: function (value) {
            if (value.status) {
                var list = [];//[{ id: '', name: "==请选择==" }];
                $.each(value.rows, function (index, item) {
                    var row = { id: item.ID, title: item.ExceptionName };
                    list.push(row);
                });
                exceptionInfoCombotree.setData([{ id: '', title: '所有小类', 'subs': list }]);
                //$("select[name=ExceptionInfo]").html($("#template-option").render(list));
            }
        }
    });
}

//设备
function GetEquipment() {
    $.ajax({
        url: '/api/sys/Equipment/GetEquipment?TenantId=' + TenantId,
        success: function (value) {
            if (value.status) {
                var list = [];//[{ id: '', name: "==请选择==" }];
                $.each(value.rows, function (index, item) {
                    var row = { id: item.EquipmentCode, title: item.EquipmentCode };
                    list.push(row);
                });
                equipmentCombotree.setData([{ id: '', title: '所有设备', 'subs': list }]);
                //$("select[name=EquipmentCode]").html($("#template-option").render(list));
            }
        }
    });
}

//产品
function GetInventory() {
    $.ajax({
        url: '/api/sys/Inventory/GetInventory?TenantId=' + TenantId,
        success: function (value) {
            if (value.total > 0) {
                var list = [];//[{ id: '', name: "==请选择==" }];
                $.each(value.rows, function (index, item) {
                    var row = { id: item.InventoryCode, title: item.InventoryCode };
                    list.push(row);
                });
                productCombotree.setData([{ id: '', title: '所有产品', 'subs': list }]);
                //$("select[name=ProductCode]").html($("#template-option").render(list));
            }
        }
    });
}

//查看详情
function ViewProcess(data) {
    $("#tabsimple15").html($("#sectionDetail").html());
    $("#tabsimple16").html($("#sectionTask").html());
    $("#modal_xq").modal("show");
}

//责任人确认收到异常
function HandlerReceived(data) {
    $("#tabsimple15").html($("#sectionDetail").html());
    $("#tabsimple16").html($("#sectionTask").html());
    $("#modal-receive").modal("show");
}

//异常签到
function HandlerArrived(data) {
    $("#detailArrived").html($("#sectionDetail").html());
    $("#taskArrived").html($("#sectionTask").html());
    $("#modal_qd").modal("show");
    $("button[name=qdSubmit]").attr("data", JSON.stringify(data));
}

//解除异常
function Reliever(data) {
    $("#detailRelieve").html($("#sectionDetail").html());
    $("#taskRelieve").html($("#sectionTask").html());
    $("#modal_jc").modal("show");
    $("button[name=jcSubmit]").attr("data", JSON.stringify(data));
}

//填写处理过程 
function HandleProcess(data) {
    $("#detailMeasure").html($("#sectionDetail").html());
    $("#taskMeasure").html($("#sectionTask").html());
    $("#modal_lr").modal("show");
    $("button[name=lrSubmit]").attr("data", JSON.stringify(data));
    if (data.ExceptionId) {
        //$("select[name=ExceptionInfo]").val(data.ExceptionId);
        exceptionInfoCombotree.setSelect($("[data-id=" + data.ExceptionId + "]"));
        exceptionClassCombotree.setSelect($("[data-name=" + data.ExceptionClass + "]"));
    }
    if (data.OrganizeId) {
        //$("select[name=HandOrganize]").val(data.OrganizeId);
        organizeCombotree.setSelect($("[data-id=" + data.OrganizeId + "]"));
    }
    if (data.AuditorId) {
        //$("select[name=Auditor]").val(data.AuditorId);
        auditorCombotree.setSelect($("[data-id=" + data.AuditorId + "]"));
    }
    if (data.Cause) {
        $("textarea[name=Cause]").val(data.Cause);
    }
    if (data.Measure) {
        $("textarea[name=Measure]").val(data.Measure);
    }
    if (data.Suggestion) {
        $("textarea[name=Suggestion]").val(data.Suggestion);
    }
    //异常录入非必填项
    if (data.EquipmentId) {
        //$("select[name=EquipmentCode]").val(data.EquipmentId);
        equipmentCombotree.setSelect($("[data-id=" + data.EquipmentId + "]"));
    }
    if (data.ProductCode) {
        //$("select[name=ProductCode]").val(data.ProductCode);
        productCombotree.setSelect($("[data-id=" + data.ProductCode + "]"));
    }
    if (data.WorkOrder) {
        //$("select[name=WorkOrder]").val(data.WorkOrder);
        workorderCombotree.setSelect($("[data-id=" + data.WorkOrder + "]"));
    }
}

//检查异常录入
function CheckExceptionMeasure2() {
    var status = true;
    if (!$("select[name=ExceptionClass]").val()) {
        $("select[name=ExceptionClass]").addClass("require");
        status = false;
    }
    if (!$("select[name=ExceptionInfo]").val()) {
        $("select[name=ExceptionInfo]").addClass("require");
        status = false;
    }
    if (!$("select[name=HandOrganize]").val()) {
        $("select[name=HandOrganize]").addClass("require");
        status = false;
    }
    if (!$("textarea[name=Cause]").val()) {
        $("textarea[name=Cause]").addClass("require");
        status = false;
    }
    if (!$("textarea[name=Measure]").val()) {
        $("textarea[name=Measure]").addClass("require");
        status = false;
    }
    if (!$("textarea[name=Suggestion]").val()) {
        $("textarea[name=Suggestion]").addClass("require");
        status = false;
    }
    if (!$("select[name=Auditor]").val()) {
        $("select[name=Auditor]").addClass("require");
        status = false;
    }
    return status;
}

function CheckExceptionMeasure() {
    var status = true;
    if (exceptionClassCombotree.datas().length === 0) {
        $("#ExceptionClass").addClass("require");
        alert("异常大类不能为空");
        status = false;
    }
    if (exceptionInfoCombotree.datas().length === 0) {
        $("#ExceptionInfo").addClass("require");
        alert("异常小类不能为空");
        status = false;
    }
    if (organizeCombotree.datas().length === 0) {
        $("#HandOrganize").addClass("require");
        alert("责任部门不能为空");
        status = false;
    }
    if (!$("textarea[name=Cause]").val()) {
        $("textarea[name=Cause]").addClass("require");
        alert("异常原因不能为空");
        status = false;
    }
    if (!$("textarea[name=Measure]").val()) {
        $("textarea[name=Measure]").addClass("require");
        alert("处理措施不能为空");
        status = false;
    }
    if (!$("textarea[name=Suggestion]").val()) {
        $("textarea[name=Suggestion]").addClass("require");
        alert("处理意见不能为空");
        status = false;
    }
    if (auditorCombotree.datas().length === 0) {
        $("#auditorCombotree").addClass("require");
        alert("审核人不能为空");
        status = false;
    }
    return status;
}

//异常审核
function Auditing(data) {
    $("#detailAuditing").html($("#sectionDetail").html());
    $("#taskAuditing").html($("#sectionTask").html());
    $("#modal_sh").modal("show");
    $("button[name=shSubmit]").attr("data", JSON.stringify(data));
}

//填写任务明细
function ExceptionDetail(data) {
    if (data.CallUserName) {
        $("text[name=CallUserName]").html(data.CallUserName);
    }
    if (data.CallOrganizeName) {
        $("text[name=CallOrganizeName]").html(data.CallOrganizeName);
    }
    $("text[name=CallTime]").html(moments(data.CallTime).format("YYYY-MM-DD HH:mm"));
    $("text[name=Address]").html(data.Address);
    $("text[name=Exception]").html(data.Exception);
    if (data.ArrivedTime) {
        $("text[name=HandlerName]").html(data.HandlerName);
        $("span[name=ArrivedTime]").attr("data-original-title", moments(data.ArrivedTime).format("YYYY-MM-DD HH:mm"));
        $("text[name=ArrivedTime]").html(moments(data.ArrivedTime).format("YYYY-MM-DD HH:mm"));
    } else {
        $("text[name=HandlerName]").html("");
        $("span[name=ArrivedTime]").attr("data-original-title", '');
        $("text[name=ArrivedTime]").html('');
    }
    if (data.RelievedTime) {
        $("#layer-relieve").show();
        $("text[name=RelieveName]").html(data.HandlerName);
        $("span[name=RelieveTime]").attr("data-original-title", moments(data.RelievedTime).format("YYYY-MM-DD HH:mm"));
        $("text[name=RelieveTime]").html(moments(data.RelievedTime).format("YYYY-MM-DD HH:mm"));
    } else {
        $("text[name=RelieveName]").html("");
        $("span[name=RelieveTime]").attr("data-original-title", '');
        $("text[name=RelieveTime]").html('');
    }
    if (data.Score) {
        $("text[name=score]").html(data.Score);
    } else {
        $("text[name=score]").html(0);
    }
    $("text[name=HandOrganizeName]").html('');
    if (data.SubmitionTime) {
        $("#layer-submition").show();
        $("text[name=HandOrganizeName]").html(data.HandOrganizeName);
        $("text[name=SubmitionName]").html(data.HandlerName);
        $("span[name=SubmitionTime]").attr("data-original-title", moments(data.SubmitionTime).format("YYYY-MM-DD HH:mm"));
        $("text[name=SubmitionTime]").html(moments(data.SubmitionTime).format("YYYY-MM-DD HH:mm"));
    } else {
        $("text[name=SubmitionName]").html("");
        $("span[name=SubmitionTime]").attr("data-original-title", '');
        $("text[name=SubmitionTime]").html('');
    }
    if (data.ExceptionClass) {
        $("text[name=ExceptionClass]").html(data.ExceptionClass);
    } else {
        $("text[name=ExceptionClass]").html('');
    }
    if (data.EquipmentId) {
        $("text[name=EquipmentCode]").html(data.EquipmentId);
    } else {
        $("text[name=EquipmentCode]").html('');
    }
    if (data.ExceptionInfo) {
        $("text[name=ExceptionInfo]").html(data.ExceptionInfo);
    } else {
        $("text[name=ExceptionInfo]").html('');
    }

    if (data.Cause) {
        $("text[name=Cause]").html(data.Cause);
    } else {
        $("text[name=Cause]").html('');
    }
    if (data.Measure) {
        $("text[name=Measure]").html(data.Measure);
    } else {
        $("text[name=Measure]").html('');
    }
    if (data.Suggestion) {
        $("text[name=Suggestion]").html(data.Suggestion);
    } else {
        $("text[name=Suggestion]").html('');
    }
    if (data.AuditorName) {
        $("text[name=AuditorName]").html(data.AuditorName);
    } else {
        $("text[name=AuditorName]").html('');
    }
    if (data.AuditingTime) {
        $("#layer-auditor").show();
        $("span[name=AuditorTime]").attr("data-original-title", moments(data.AuditingTime).format("YYYY-MM-DD HH:mm"));
        $("text[name=AuditorTime]").html(moments(data.AuditingTime).format("YYYY-MM-DD HH:mm"));
    } else {
        $("span[name=AuditorTime]").attr("data-original-title", '');
        $("text[name=AuditorTime]").html('');
    }
    if (data.IsPass === "1") {
        $("text[name=IsPass]").html("审核通过");
    } else {
        $("text[name=IsPass]").html('');
    }
    if (data.IsPass === "0") {
        $("text[name=IsPass]").html("驳回");
    } else {
        $("text[name=IsPass]").html('');
    }
    if (data.Comments) {
        $("text[name=Comments]").html(data.Comments);
    } else {
        $("text[name=Comments]").html('');
    }
    //任务节点详情
    TaskDetail(data);
}

//任务节点详情
function TaskDetail(data) {
    var rows = [];
    $.each(data.TaskRecord, function (index, item) {
        var row = {
            Index: data.TaskRecord.length - index, TaskName: item.TaskName,
            Status: item.TaskKey, ExecuterName: item.ExecuterName,
            StartTime: item.StartTime, EndTime: item.EndTime, Descrip: item.Comments
        };
        row.StartTime = moments(row.StartTime).format("YYYY-MM-DD HH:mm");
        if (row.EndTime) {
            row.EndTime = moments(row.EndTime).diff(row.StartTime, 'minutes') + 'min';
            row.Status = "已办理";
        } else {
            row.EndTime = "";
            row.Status = "办理中";
        }
        rows.unshift(row);
    });
    $("tbody[name=detail]").html($("#template-detail").render(rows));
}

//获取异常图片
function GetImage(id) {
    if (id) {
        $.ajax({
            url: '/api/andon2/Photo/GetMyPhoto/' + id,
            success: function (value) {
                if (value.status) {
                    var image = "";
                    $.each(value.rows, function (index, item) {
                        image += '<img alt="" src="' + item.PhotoUrl + '" />';
                    });
                    $("form[name=Images]").html(image);
                    var preview = new Preview({
                        imgWrap: 'imageWrap' // 指定该容器里的图片点击预览
                    });
                }
            }
        });
    }
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
            GetMyTask();
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
    GetMyTask();
}

function switchdownpage() {
    if (page > 1)
        page--;
    GetMyTask();
}

function switchuppage(totalpage) {
    if (page < totalpage)
        page++;
    GetMyTask();
}