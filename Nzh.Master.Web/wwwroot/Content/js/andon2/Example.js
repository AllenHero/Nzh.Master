var rows = 7;
var page = 1;
//责任人
var queryHandlerCombotree = CreateComboTree('queryHandler');
//发起单位
var queryCallOrganizeCombotree = CreateComboTree('queryCallOrganize');
//责任单位
var queryHandOrganizeCombotree = CreateComboTree('queryHandOrganize');
//产品编码
var queryProductCodeCombotree = CreateComboTree('queryProductCode');
//设备型号
var queryEquipmentIdCombotree = CreateComboTree('queryEquipmentId');
//异常大类
var queryExceptionParentNameCombotree = CreateComboTree('queryExceptionParentName');
//异常小类
var queryExceptionNameCombotree = CreateComboTree('queryExceptionName');

function CreateComboTree(id) {
    if (id) return $('#' + id).comboTree({
        source: [],
        isMultiple: false,
        isFirstClassSelectable: false, //第一级是否可选
        cascadeSelect: true,
        selectedlength: 3,
        url: '',
        method: 'get'//最多可选
    });
}

$(function () {

    GetOrganizeUser();

    GetOrganize();

    GetInventory();

    GetEquipment();

    GetExceptionClass();

    GetExceptionInfo();

    var preview = new Preview({
        imgWrap: 'imageWrap' // 指定该容器里的图片点击预览
    });

    //table列初始化
    var columnsArray = [
        { "data": 'Exception', "title": "异常描述", "searchable": false, "width": "120px", "visible": true, "sortable": false, "render": functionFormatException },
        { "data": 'CallUserName', "title": "发起人", "searchable": false, "width": "120px", "visible": true, "sortable": false },
        { "data": 'CallOrganize', "title": "发起单位", "searchable": false, "width": "120px", "visible": true, "sortable": false },
        { "data": 'ProductCode', "title": "产品编码", "searchable": false, "width": "120px", "visible": true, "sortable": false },
        { "data": 'EquipmentId', "title": "设备编码", "searchable": false, "width": "120px", "visible": true, "sortable": false },
        { "data": 'HandlerName', "title": "处理人", "searchable": false, "width": "120px", "visible": true, "sortable": false },
        { "data": 'HandOrganize', "title": "责任单位", "searchable": false, "width": "120px", "visible": true, "sortable": false },
        { "data": 'CallTime', "title": "发起时间", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionFormatCallTime },
        { "data": 'ExceptionParentName', "title": "异常大类", "searchable": false, "width": "120px", "visible": true, "sortable": false },
        { "data": 'ExceptionName', "title": "异常小类", "searchable": false, "width": "120px", "visible": true, "sortable": false },
        { "data": 'Id', "title": "操作", "searchable": false, "width": "120px", "visible": true, "sortable": false, "render": functionFormatOperation },
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
            "url": "/api/andon2/Example/EditExampleList",
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "data": function (d) {
                var CallOrganize = "";
                var HandOrganize = "";
                var Handler = "";
                var ProductCode = "";
                var EquipmentId = "";
                var ExceptionParentName = "";
                var ExceptionName = "";
                if (queryCallOrganizeCombotree.datas().length > 0) {
                    CallOrganize = queryCallOrganizeCombotree.datas()[0].id;
                }
                if (queryHandOrganizeCombotree.datas().length > 0) {
                    HandOrganize = queryHandOrganizeCombotree.datas()[0].id;
                }
                if (queryHandlerCombotree.datas().length > 0) {
                    Handler = queryHandlerCombotree.datas()[0].id;
                }
                if (queryProductCodeCombotree.datas().length > 0) {
                    ProductCode = queryProductCodeCombotree.datas()[0].id;
                }
                if (queryEquipmentIdCombotree.datas().length > 0) {
                    EquipmentId = queryEquipmentIdCombotree.datas()[0].id;
                }
                if (queryExceptionParentNameCombotree.datas().length > 0) {
                    ExceptionParentName = queryExceptionParentNameCombotree.datas()[0].id;
                }
                if (queryExceptionNameCombotree.datas().length > 0) {
                    ExceptionName = queryExceptionNameCombotree.datas()[0].id;
                }
                d.CallOrganize = CallOrganize;
                d.HandOrganize = HandOrganize;
                d.Handler = Handler;
                d.ProductCode = ProductCode;
                d.EquipmentId = EquipmentId;
                d.CallTime = $("#queryCallTime").val();
                d.Exception = $("#queryException").val();
                d.ExceptionParentName = ExceptionParentName;
                d.ExceptionName = ExceptionName;
                d.TenantId = TenantId;
                return JSON.stringify(d);
            }
        },
        "aaSorting": [[7, "desc"]],//默认第几个排序
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
            },
            {
                text: '<i class="font_ilean iconfont icon-daochu1" style="font-size:14px;">批量导出</i>',
                action: function (e, dt, node, config) {
                    EditExport();
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
                "url": "/api/andon2/Example/EditExampleList",
                "type": "POST",
                "contentType": "application/json; charset=utf-8",
                "data": function (d) {
                    var CallOrganize = "";
                    var HandOrganize = "";
                    var Handler = "";
                    var ProductCode = "";
                    var EquipmentId = "";
                    var ExceptionParentName = "";
                    var ExceptionName = "";
                    if (queryCallOrganizeCombotree.datas().length > 0) {
                        CallOrganize = queryCallOrganizeCombotree.datas()[0].id;
                    }
                    if (queryHandOrganizeCombotree.datas().length > 0) {
                        HandOrganize = queryHandOrganizeCombotree.datas()[0].id;
                    }
                    if (queryHandlerCombotree.datas().length > 0) {
                        Handler = queryHandlerCombotree.datas()[0].id;
                    }
                    if (queryProductCodeCombotree.datas().length > 0) {
                        ProductCode = queryProductCodeCombotree.datas()[0].id;
                    }
                    if (queryEquipmentIdCombotree.datas().length > 0) {
                        EquipmentId = queryEquipmentIdCombotree.datas()[0].id;
                    }
                    if (queryExceptionParentNameCombotree.datas().length > 0) {
                        ExceptionParentName = queryExceptionParentNameCombotree.datas()[0].id;
                    }
                    if (queryExceptionNameCombotree.datas().length > 0) {
                        ExceptionName = queryExceptionNameCombotree.datas()[0].id;
                    }
                    d.CallOrganize = CallOrganize;
                    d.HandOrganize = HandOrganize;
                    d.Handler = Handler;
                    d.ProductCode = ProductCode;
                    d.EquipmentId = EquipmentId;
                    d.CallTime = $("#queryCallTime").val();
                    d.Exception = $("#queryException").val();
                    d.ExceptionParentName = ExceptionParentName;
                    d.ExceptionName = ExceptionName;
                    d.TenantId = TenantId;
                    return JSON.stringify(d);
                }
            },
            "aaSorting": [[7, "desc"]],//默认第几个排序
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
                },
                {
                    text: '<i class="font_ilean iconfont icon-daochu1" style="font-size:14px;">批量导出</i>',
                    action: function (e, dt, node, config) {
                        EditExport();
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
            }
        });
    });

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
        table.ajax.reload(null, true);
    });

    //清空
    $("#btnClear").click(function () {
        queryHandlerCombotree.clear();
        queryCallOrganizeCombotree.clear();
        queryHandOrganizeCombotree.clear();
        queryProductCodeCombotree.clear();
        queryEquipmentIdCombotree.clear();
        queryExceptionParentNameCombotree.clear();
        queryExceptionNameCombotree.clear();
        $("#queryCallTime").val("");
        $("#queryException").val("");
    })

    //查看详情
    $('#dataList tbody').on('click', 'a#EditRow', function () {
        var data = $('#dataList').DataTable().row($(this).parents('tr')).data();
        $.ajax({
            url: '/api/andon2/example/GetExampleDetails?Id=' + data.Id,
            success: function (value) {
                var html = '';
                var htmls = '';
                if (value != null) {
                    var resultValue = value.rows;
                    $("#txtCallUserName").html(resultValue.CallUserName);
                    $("#txtCallUserName1").html(resultValue.CallUserName);
                    $("#txtCallOrganizeName").html(resultValue.CallOrganizeName);
                    $("#txtCallTime").html(resultValue.CallTime);
                    $("#txtAddress").html(resultValue.Address);
                    $("#txtException").html(resultValue.Exception);

                    //图片
                    if (resultValue.PhotoRecord != null) {
                        for (var i = 0; i < resultValue.PhotoRecord.length; i++) {
                            html += "<img alt='' src='" + resultValue.PhotoRecord[i].PhotoUrl + "'/>";
                        }
                    }
                    $("#imageWrap").html(html);

                    $("#txtHandlerName").html(resultValue.HandlerName);
                    $("#txtHandlerName1").html(resultValue.HandlerName);
                    $("#txtHandlerName2").html(resultValue.HandlerName);
                    $("#txtArrivedTime").html(resultValue.ArrivedTime);
                    $("#txtArrivedTime1").html(resultValue.ArrivedTime);
                    $("#txtHandlerName").html(resultValue.HandlerName);
                    $("#txtRelievedTime").html(resultValue.RelievedTime);
                    $("#txtScore").html(resultValue.Score);
                    $("#txtSubmitionTime").html(resultValue.SubmitionTime);
                    $("#txtExceptionClass").html(resultValue.ExceptionClass);
                    $("#txtEquipmentCode").html(resultValue.EquipmentCode);
                    $("#txtExceptionInfo").html(resultValue.ExceptionInfo);
                    $("#txtHandOrganizeName").html(resultValue.HandOrganizeName);
                    $("#txtCause").html(resultValue.Cause);
                    $("#txtMeasure").html(resultValue.Measure);
                    $("#txtSuggestion").html(resultValue.Suggestion);
                    $("#txtAuditorName").html(resultValue.AuditorName);
                    $("#txtAuditingTime").html(resultValue.AuditingTime);
                    //$("#txtIsPass").html(resultValue.IsPass);
                    $("#txtComments").html(resultValue.Comments);

                    //任务节点
                    if (resultValue.TaskRecord != null) {
                        for (var i = 0; i < resultValue.TaskRecord.length; i++) {
                            var Index = i + 1;
                            var Status = "";
                            var EndTime = "";
                            if (resultValue.TaskRecord[i].EndTime) {
                                EndTime = moments(resultValue.TaskRecord[i].EndTime).diff(resultValue.TaskRecord[i].StartTime, 'minutes') + 'min';
                                Status = "已办理";
                            }
                            else {
                                EndTime = "";
                                Status = "办理中";
                            }
                            htmls += "<tr>";
                            htmls += "<td>" + Index + "</td>";
                            htmls += "<td>" + resultValue.TaskRecord[i].TaskName + "</td>";
                            htmls += "<td>" + Status + "</td>";
                            htmls += "<td>" + resultValue.TaskRecord[i].ExecuterName + "</td>";
                            htmls += "<td>" + resultValue.TaskRecord[i].StartTime + "</td>";
                            htmls += "<td>" + EndTime + "</td>";
                            htmls += "<td>" + resultValue.TaskRecord[i].Comments + "</td>";
                            htmls += "</tr>";
                        }
                    }
                    $("#Detail").html(htmls);
                    $("#modal_xq").modal("show");
                }
            }
        });
    });
});

//格式化时间
function functionFormatCallTime(data, type, full, meta) {
    var CallTime = "";
    if (data) {
        CallTime = moment(data).format("YYYY-MM-DD HH:mm:ss");
    }
    return CallTime;
}

//格式化异常描述
function functionFormatException(data, type, full, meta) {
    var Exception = "";
    if (data.length > 20) {
        Exception = data.substring(0, 20) + "...";
    }
    else {
        Exception = data;
    }
    return "<span title='" + data + "'>" + Exception + "</span>";
}

//格式化操作
function functionFormatOperation(data, type, item, meta) {
    return '<a href="javascript:;" class="btn blue" id="EditRow">'
        + '<i class="fa fa-edit">查看</i>'
        + '</a>'
}

//根据字符串转换为函数
function returnFunctionName(name) {
    switch (name) {
        case 'functionFormatCallTime':
            return functionFormatCallTime
        case 'functionFormatException':
            return functionFormatException
        case 'functionFormatOperation':
            return functionFormatOperation
    }
}

//批量导出
function EditExport() {
    var CallOrganize = "";
    var HandOrganize = "";
    var Handler = "";
    var ProductCode = "";
    var EquipmentId = "";
    var CallTime = "";
    var Exception = "";
    var ExceptionParentName = "";
    var ExceptionName = "";
    if (queryCallOrganizeCombotree.datas().length > 0) {
        CallOrganize = queryCallOrganizeCombotree.datas()[0].id;
    }
    if (queryHandOrganizeCombotree.datas().length > 0) {
        HandOrganize = queryHandOrganizeCombotree.datas()[0].id;
    }
    if (queryHandlerCombotree.datas().length > 0) {
        Handler = queryHandlerCombotree.datas()[0].id;
    }
    if (queryProductCodeCombotree.datas().length > 0) {
        ProductCode = queryProductCodeCombotree.datas()[0].id;
    }
    if (queryEquipmentIdCombotree.datas().length > 0) {
        EquipmentId = queryEquipmentIdCombotree.datas()[0].id;
    }
    if ($("#queryCallTime").val()) {
        CallTime = $("#queryCallTime").val();
    }
    if ($("#queryException").val()) {
        Exception = $("#queryException").val();
    }
    if (queryExceptionParentNameCombotree.datas().length > 0) {
        ExceptionParentName = queryExceptionParentNameCombotree.datas()[0].id;
    }
    if (queryExceptionNameCombotree.datas().length > 0) {
        ExceptionName = queryExceptionNameCombotree.datas()[0].id;
    }
    var data = [{ "CallOrganize": CallOrganize, "HandOrganize": HandOrganize, "Handler": Handler, "ProductCode": ProductCode, "EquipmentId": EquipmentId, "CallTime": CallTime, "Exception": Exception, "ExceptionParentName": ExceptionParentName, "ExceptionName": ExceptionName, "TenantId": TenantId }];
    $.ajax({
        url: "/api/andon2/Example/EditExport",
        type: 'POST',
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        async: false,
        success: function (value) {
            if (value != null) {
                //弹出
                window.open(value);
            }
            else {
                toastr.error("导出报错！")
            }
        },
        error: function () {
            toastr.error("保存失败，请重新保存。")
        }
    });
}

//获取所有人
function GetAllUser() {
    $.ajax({
        url: '/api/sys/user/GetAllUser?TenantId=' + TenantId,
        success: function (value) {
            if (value.total > 0) {
                $("#queryHandler").append("<option value=\"\">==请选择==</option>");
                $("#queryHandler").append(value.rows.map((x) => "<option value=" + x.UserId + ">" + x.UserName + "</option>"));
            }
        }
    });
}

//获取所有产品编码
function GetAllProductCode() {
    $.ajax({
        url: '/api/sys/Inventory/Get?TenantId=' + TenantId,
        success: function (value) {
            if (value.total > 0) {
                $("#queryProductCode").append("<option value=\"\">==请选择==</option>");
                $("#queryProductCode").append(value.rows.map((x) => "<option value=" + x.InventoryCode + ">" + x.InventoryCode + "</option>"));
            }
        }
    });
}

//获取所有设备型号
function GetAllEquipmet() {
    $.ajax({
        url: '/api/sys/Equipment/Get?TenantId=' + TenantId,
        success: function (value) {
            if (value.total > 0) {
                $("#queryEquipment").append("<option value=\"\">==请选择==</option>");
                $("#queryEquipment").append(value.rows.map((x) => "<option value=" + x.EquipmentId + ">" + x.EquipmentCode + "</option>"));
            }
        }
    });
}

//获取所有异常大类
function GetAllParentException() {
    $.ajax({
        url: '/api/andon2/ExceptionInfo/GetParentException?TenantId=' + TenantId,
        success: function (value) {
            if (value.total > 0) {
                $("#queryExceptionParentName").append("<option value=\"\">==请选择==</option>");
                $("#queryExceptionParentName").append(value.rows.map((x) => "<option value=" + x.ExceptionCode + ">" + x.ExceptionName + "</option>"));
            }
        }
    });
}

//获取所有异常小类
function GetAllException() {
    $.ajax({
        url: '/api/andon2/ExceptionInfo/GetException?TenantId=' + TenantId,
        success: function (value) {
            if (value.total > 0) {
                $("#queryExceptionName").append("<option value=\"\">==请选择==</option>");
                $("#queryExceptionName").append(value.rows.map((x) => "<option value=" + x.ExceptionCode + ">" + x.ExceptionName + "</option>"));
            }
        }
    });
}

//获取所有发起单位
function GetAllCallOrganize() {
    $.ajax({
        url: '/api/sys/Organize/GetOrganizeList?TenantId=' + TenantId,
        success: function (value) {
            if (value.total > 0) {
                $("#queryCallOrganize").append("<option value=\"\">==请选择==</option>");
                $("#queryCallOrganize").append(value.rows.map((x) => "<option value=" + x.OrganizeId + ">" + x.OrganizeName + "</option>"));
            }
        }
    });
}

//获取所有责任单位
function GetAllHandOrganize() {
    $.ajax({
        url: '/api/sys/Organize/GetOrganizeList?TenantId=' + TenantId,
        success: function (value) {
            if (value.total > 0) {
                $("#queryHandOrganize").append("<option value=\"\">==请选择==</option>");
                $("#queryHandOrganize").append(value.rows.map((x) => "<option value=" + x.OrganizeId + ">" + x.OrganizeName + "</option>"));
            }
        }
    });
}

//责任人
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
                queryHandlerCombotree.setData(organizes);
            }
        }
    });
}

//发起单位&责任单位
function GetOrganize() {
    $.ajax({
        url: '/api/sys/Organize/GetOrganize?TenantId=' + TenantId,
        success: function (value) {
            if (value.total > 0) {
                var list = [];
                $.each(value.rows, function (index, item) {
                    var row = { id: item.OrganizeId, title: item.OrganizeName };
                    list.push(row);
                });
                queryCallOrganizeCombotree.setData([{ id: '', title: '所有部门', 'subs': list }]);
                queryHandOrganizeCombotree.setData([{ id: '', title: '所有部门', 'subs': list }]);
            }
        }
    });
}

//产品编码
function GetInventory() {
    $.ajax({
        url: '/api/sys/Inventory/GetInventoryNew?TenantId=' + TenantId,
        success: function (value) {
            if (value.total > 0) {
                var list = [];
                $.each(value.rows, function (index, item) {
                    var row = { id: item.materialsNo, title: item.materialsNo };
                    list.push(row);
                });
                queryProductCodeCombotree.setData([{ id: '', title: '所有产品', 'subs': list }]);
            }
        }
    });
}

//设备型号
function GetEquipment() {
    $.ajax({
        url: '/api/base/BaseEquipment/GetEquipment?tenantid=' + TenantId,
        success: function (value) {
            if (value.status) {
                var list = [];
                $.each(value.rows, function (index, item) {
                    var row = { id: item.equipmentno, title: item.equipmentno };
                    list.push(row);
                });
                queryEquipmentIdCombotree.setData([{ id: '', title: '所有设备', 'subs': list }]);
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
                var list = [];
                $.each(value.rows, function (index, item) {
                    var row = { id: item.ID, title: item.ExceptionName };
                    list.push(row);
                });
                queryExceptionParentNameCombotree.setData([{ id: '', title: '所有大类', 'subs': list }]);
            }
        }
    });
}

//异常小类
function GetExceptionInfo() {
    var exception = $("select[name=ExceptionClass]").val();
    var url = '/api/andon2/exceptioninfo/GetException?TenantId=' + TenantId + '&ParentId=';
    if (exception) {
        url += exception;
    }
    $.ajax({
        url: url,
        success: function (value) {
            if (value.status) {
                var list = [];
                $.each(value.rows, function (index, item) {
                    var row = { id: item.ID, title: item.ExceptionName };
                    list.push(row);
                });
                queryExceptionNameCombotree.setData([{ id: '', title: '所有小类', 'subs': list }]);
            }
        }
    });
}