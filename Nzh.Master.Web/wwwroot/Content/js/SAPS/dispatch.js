var rows = 7;
var page = 1;
var rowstag = 7;
var pagetag = 1;


$(function () { 
    GetWorkLine(''); 
    $("button[name=clear]").click(function () {
        $("input[name=WorkOrder]").val("");
        $("select[name=Line]").val("");
        $("input[name=PlanDate]").val("");
        $("input[name=ProductCode]").val("");
        $("input[name=MPS]").val("");
        $("select[name=State]").val("");
        return false;
    });

    $('button[data-dismiss=modal]').click(function () {
        $("input[group=edit]").val("");
        $("select[group=edit]").val("");
        $("input").removeClass("require");
        $("select").removeClass("require");
    });

    $("button[name=edit]").click(function () {
        var row = JSON.parse($("input[checked]").attr("row"));
        SetEdit(row);
    });
    $("button[name=editSubmit]").click(function () {
        var WorkOrder = "", ProductCode = "", ProductName = "";
        var PlanCount = 0, StandardUph = 0, PlanStartDate = "";
        var PlanEndDate = "", LineId = "", LineName = "", LineCode = "";
        var require = true;
        if ($("input[name=editProductName]").val())
            ProductName = $("input[name=editProductName]").val();

        if ($("input[name=editProductCode]").val())
            ProductCode = $("input[name=editProductCode]").val();
        else {
            $("input[name=editProductCode]").addClass("required");
            require = false;
        }
        if ($("input[name=editWorkOrder]").val())
            WorkOrder = $("input[name=editWorkOrder]").val();
        else {
            $("input[name=editWorkOrder]").addClass("required");
            require = false;
        }
        if ($("input[name=editQuantity]").val())
            PlanCount = $("input[name=editQuantity]").val();
        else {
            $("input[name=editQuantity]").addClass("required");
            require = false;
        }
        if ($("input[name=editStandardUph]").val())
            StandardUph = $("input[name=editStandardUph]").val();
        else {
            $("input[name=editStandardUph]").addClass("required");
            require = false;
        }
        if ($("input[name=editPlanStartDate]").val())
            PlanStartDate = moments($("input[name=editPlanStartDate]").val()).format("YYYY-MM-DD HH:mm");
        else {
            $("input[name=editPlanStartDate]").addClass("required");
            require = false;
        }
        if ($("input[name=editPlanEndDate]").val())
            PlanEndDate = moments($("input[name=editPlanEndDate]").val()).format("YYYY-MM-DD HH:mm");
        else {
            $("input[name=editPlanEndDate]").addClass("required");
            require = false;
        }
        if ($("select[name=editLine]").val()) {
            LineId = $("select[name=editLine]").val();
            LineName = $("#" + $("select[name=editLine]").val()).attr("name");
            LineCode = $("#" + $("select[name=editLine]").val()).attr("code");
        }
        else {
            $("select[name=editLine]").addClass("required");
            require = false;
        }
        var param = {
            Type: "Update", WorkSheetId: $(this).attr("value"), WorkSheetNo: WorkOrder
            , ProductCode: ProductCode, ProductName: ProductName
            , PlanCount: PlanCount, StandardUph: StandardUph, PlanStartDate: PlanStartDate
            , PlanEndDate: PlanEndDate, LineId: LineId, LineName: LineName, LineCode: LineCode
        };
        if (require) {
            $("input").removeClass("require");
            $("select").removeClass("require");
            Submit(param);
        }
    });

    $("button[name=designateSubmit]").click(function () {
        var required = true;
        var workorder = $("input[name=designateWorkOrder]").val();
        var line = $("select[name=designateLine]").val();
        if (!workorder) {
            workorder = "";
            $("input[name=designateWorkOrder]").addClass("required");
            required = false;
        }
        if (!line) {
            line = "";
            $("select[name=designateLine]").addClass("required");
            required = false;
        }
        if (required) {
            $.ajax({
                url: '/api/saps/workorder/EditDesignateBatch',
                data: JSON.stringify({ TenantId: TenantId, WorkSheetNo: workorder, LineId: line }),
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: jQueryShowLoading(),//显示加载图标
                success: function (value) {
                    jQuery('body').hideLoading();//隐藏加载图标
                    if (value.status) {
                        $("#modal_designate").modal("hide");

                        $("input[group=designate]").val("");
                        $("select[group=designate]").val("");
                        $("#btnSelect").click();
                    } else {
                        toastr.info(value.message);
                        //alert(value.message);
                    }
                }
            })
        }
    });
   
    $("button[name=designate]").click(function () {
        var workOrderList = $("#dataList input");
        var workOrders = "";
        $.each(workOrderList, function (index, item) {
            if ($(item).is(":checked"))
                workOrders += $(item).attr('value') + ","
        });
        if (workOrders.length > 0) {
            $("input[name=designateWorkOrder]").val(workOrders.substring(0, workOrders.length - 1));
            $("#modal_designate").modal("show");
        }
        else
            toastr.warning("请选择要指派的工单！");
        //alert("请选择要指派的工单！");
    });

    $("select[name=designateWorkShop]").change(function () {
        if ($(this).val() && $(this).val().indexOf("==请选择==") < 0) {
            $($("select[name=designateLine]").children().hide()[0]).show();
            $("option[group=" + $("#" + $(this).val()).attr("code") + "]").show();
            $("select[name=designateLine]").val("");
        } else {
            $("select[name=designateLine]").children().show();
            $("select[name=designateLine]").val("");
        }
    });

    $("button[name=designateCancel]").click(function () {
        $("input[group=designate]").val("");
        $("select[group=designate]").val("");
    });

    $('select[name=WorkShop]').change(function () {
        if ($(this).val() && $(this).val().indexOf("==请选择==") < 0) {
            $($("select[name=Line]").children().hide()[0]).show();
            $("option[group=" + $("#" + $(this).val()).attr("code") + "]").show();
            $("select[name=Line]").val("");
        } else {
            $("select[name=Line]").children().show();
            $("select[name=Line]").val("");
        }
    });


    // 
    //table列初始化
    var columnsArray = [
        { "data": 'WorkSheetId', "title": "<input type='checkbox' name='allcheckbox' onClick='allcheckboxClick(this)' style='width:16px;height:16px;' />", "searchable": false, "width": "100px", "visible": true, "sortable": false, "render": functionWorkSheetId },
        { "data": 'Remark', "title": "操作", "searchable": false, "width": "100px", "visible": true, "sortable": true, "render": functionRemark },
        { "data": 'Status', "title": "工单状态", "searchable": false, "width": "100px", "visible": true, "sortable": true, "render": functionStatus  },
        { "data": 'WorkSheetNo', "title": "工单编号", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'ProductCode', "title": "产品代码", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'ProductName', "title": "产品名称", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionProductName },

        { "data": 'LineName', "title": "产线名称", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'PlanStartDate', "title": "计划开工时间", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionPlanStartDate  },

        { "data": 'PlanEndDate', "title": "计划完工时间", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionPlanEndDate  },
        { "data": 'PlanCount', "title": "计划数量", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'StandardUph', "title": "小时目标产量", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'Customer', "title": "客户", "searchable": false, "width": "120px", "visible": true, "sortable": true }, 
    ];

    var post = {
        "url": "/api/saps/workorder/EditWorkOrderPageList",
        "type": "POST",
        "contentType": "application/json; charset=utf-8",
        "data": function (d) {
            var workorder = "", line = "", plandate = "", mps = "", productcode = "", state = "", workShop = "";
            if ($("input[name=WorkOrder]").val())
                workorder = $("input[name=WorkOrder]").val();
            if ($("select[name=WorkShop]").val() && $("select[name=WorkShop]").val().indexOf("==请选择==") < 0)
                workShop = $("select[name=WorkShop]").val();
            if ($("select[name=Line]").val() && $("select[name=Line]").val().indexOf("==请选择==") < 0)
                line = $("select[name=Line]").val();
            if ($("input[name=PlanDate]").val())
                plandate = $("input[name=PlanDate]").val();
            if ($("input[name=MPS]").val())
                mps = $("input[name=MPS]").val();
            if ($("input[name=ProductCode]").val())
                productcode = $("input[name=ProductCode]").val();
            if ($("select[name=State]").val() && $("select[name=State]").val().indexOf("==请选择==") < 0)
                state = $("select[name=State]").val();
            d.WorkSheetNo = workorder;
            d.LineId = line;
            d.WorkShopId = workShop;
            d.CurrentDate = plandate;
            d.OrderNo = mps;
            d.ProductCode = productcode;
            d.Status = 0;
            d.Dispatching = 0;
            return JSON.stringify(d);
        }
    };
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
        "ajax": post,
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
                if (rows.attr("data") != undefined) {
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
                }
            } else {
                if (rows.attr("data") != undefined) {
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
            "ajax": post,

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



    // 
    //table列初始化
    var columnsArray2 = [
        { "data": 'Remark', "title": "操作", "searchable": false, "width": "100px", "visible": true, "sortable": true, "render": functionRemark2 },
        { "data": 'Status', "title": "工单状态", "searchable": false, "width": "100px", "visible": true, "sortable": true, "render": functionStatus },
        { "data": 'WorkSheetNo', "title": "工单编号", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'ProductCode', "title": "产品代码", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'ProductName', "title": "产品名称", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionProductName },

        { "data": 'LineName', "title": "产线名称", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'PlanStartDate', "title": "计划开工时间", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionPlanStartDate },

        { "data": 'PlanEndDate', "title": "计划完工时间", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionPlanEndDate },
        { "data": 'PlanCount', "title": "计划数量", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'StandardUph', "title": "小时目标产量", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'Customer', "title": "客户", "searchable": false, "width": "120px", "visible": true, "sortable": true },
    ];

    var post2 = {
        "url": "/api/saps/workorder/EditWorkOrderPageList",
        "type": "POST",
        "contentType": "application/json; charset=utf-8",
        "data": function (d) {
            var workorder = "", line = "", plandate = "", mps = "", productcode = "", state = "", workShop = "";
            if ($("input[name=WorkOrder]").val())
                workorder = $("input[name=WorkOrder]").val();
            if ($("select[name=WorkShop]").val() && $("select[name=WorkShop]").val().indexOf("==请选择==") < 0)
                workShop = $("select[name=WorkShop]").val();
            if ($("select[name=Line]").val() && $("select[name=Line]").val().indexOf("==请选择==") < 0)
                line = $("select[name=Line]").val();
            if ($("input[name=PlanDate]").val())
                plandate = $("input[name=PlanDate]").val();
            if ($("input[name=MPS]").val())
                mps = $("input[name=MPS]").val();
            if ($("input[name=ProductCode]").val())
                productcode = $("input[name=ProductCode]").val();
            if ($("select[name=State]").val() && $("select[name=State]").val().indexOf("==请选择==") < 0)
                state = $("select[name=State]").val();
            d.WorkSheetNo = workorder;
            d.LineId = line;
            d.WorkShopId = workShop;
            d.CurrentDate = plandate;
            d.OrderNo = mps;
            d.ProductCode = productcode;
            d.Status = 0;
            d.Dispatching = 1;
            return JSON.stringify(d);
        }
    };
    //从缓存中获取列的配置文件
    var columnsArrayStorage2 = JSON.parse(localStorage.getItem(txtCurrentUserStorageName2));
    if (localStorage && columnsArrayStorage2) {

        for (var i = 0; i < columnsArrayStorage2.length; i++) {
            if (columnsArrayStorage2[i].renderValue != undefined) {
                columnsArrayStorage2[i].render = returnFunctionName(columnsArrayStorage2[i].renderValue);
            }
        }

        columnsArray2 = columnsArrayStorage2;
    }
    //datatables 参数配置
    var datatableSetting2 = {
        //"dom": 'Bfrtip',
        "bPaginate": true, //翻页功能
        "bLengthChange": true, //改变每页显示数据数量
        colReorder: true,
        "processing": true,     //开启加载等待提示，提示信息是下面language中的sProcessing配置
        "serverSide": true,     //打开服务器模式
        "bDestroy": true,
        "scrollX": true,
        "ajax": post2,
        "columns": columnsArray2,
        "dom": 'Brt<"bottom">ilp<"clear">',
        buttons: [
            {
                text: '<i class="font_ilean iconfont icon-jindu"></i>',
                action: function (e, dt, node, config) {
                    $('#myDialogShow2').modal('show').css({
                        width: '500px',
                        'margin-left': function () {
                            return -($(this).width() / 2);
                        }
                    });
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
    var table2 = $('#dataList2').DataTable(datatableSetting2);
    //初始化弹出框内容
    for (var i = 0; i < columnsArray2.length; i++) {
        if (columnsArray2[i].data != "") {
            var strChecked = columnsArray2[i].visible ? "checked" : "";
            var tempHtml = "<tr data=\"" + columnsArray2[i].data + "\" searchable=\"" + columnsArray2[i].searchable + "\" width=\"" + columnsArray2[i].width + "\" title=\"" + columnsArray2[i].title + "\" sortable=\"" + columnsArray2[i].sortable + "\">";
            tempHtml += "<td>" + (i + 1) + "</td> ";
            tempHtml += "<td>" + columnsArray2[i].title + "</td> ";
            tempHtml += "<td><input type=\"checkbox\" id=\"listCheckUserNo\" " + strChecked + " /></td> ";
            tempHtml += "<td><a class='up'>上移</a></td> ";
            tempHtml += "<td><a class='dwn'>下移</a></td>";
            if (typeof (columnsArray2[i].render) != "undefined") {
                tempHtml += "<td>" + columnsArray2[i].render.name + "</td>";
            }
            else {
                tempHtml += "<td></td>";
            }
            tempHtml += "</tr >";
            $("#tableColShowHide2 tbody").append(tempHtml);
        }
    }
    //修改弹出框序号
    for (var i = 0; i < $('#tableColShowHide2 tbody tr').length; i++) {
        $('#tableColShowHide2 tbody tr:eq(' + i + ') td:eq(0)').html((i + 1));
    }
    //弹出框确定按钮事件
    $("#btnConfirmContent2").click(function () {
        var newColumnsArray = new Array();
        for (var i = 0; i < $("#tableColShowHide2 tbody tr").length; i++) {
            var rows = $("#tableColShowHide2 tbody tr:eq(" + i + ")");
            if (rows.children("td:eq(5)").html() != "") {
                if (rows.attr("data") != undefined) {
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
                }
            } else {
                if (rows.attr("data") != undefined) {
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
        }
        localStorage.setItem(txtCurrentUserStorageName2, JSON.stringify(newColumnsArray));
        columnsArray2 = newColumnsArray;
        datatableSetting2.columns = newColumnsArray;

        $('#dataList2').DataTable().clear();
        $('#dataList2').DataTable().destroy();
        table2 = $('#dataList2').DataTable({
            "bPaginate": true, //翻页功能
            "bLengthChange": true, //改变每页显示数据数量
            colReorder: true,
            "processing": true,     //开启加载等待提示，提示信息是下面language中的sProcessing配置
            "serverSide": true,     //打开服务器模式
            "bDestroy": true,
            "scrollX": true,
            "ajax": post2,

            "columns": columnsArray2,
            "dom": 'Bfrt<"bottom">ilp<"clear">',
            buttons: [
                {
                    text: '<i class="font_ilean iconfont icon-jindu"></i>',
                    action: function (e, dt, node, config) {
                        $('#myDialogShow2').modal('show').css({
                            width: '500px',
                            'margin-left': function () {
                                return -($(this).width() / 2);
                            }
                        });
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
    $('#tableColShowHide2 tbody').on('click', 'a[class="up"]', function () {
        var rowContent = $(this).parents("tr").html();
        var rowNewContent = "";
        var rowindex = $(this).parents("tbody").find("tr").index($(this).parents("tr")); //行号
        if (rowindex > 0) {
            rowNewContent = $('#tableColShowHide2 tbody').children()[rowindex].outerHTML;
            $('#tableColShowHide2 tbody tr:eq(' + (rowindex - 1) + ')').before(rowNewContent);
            $('#tableColShowHide2 tbody tr:eq(' + (rowindex + 1) + ')').remove();

            for (var i = 0; i < $('#tableColShowHide2 tbody tr').length; i++) {
                $('#tableColShowHide2 tbody tr:eq(' + i + ') td:eq(0)').html((i + 1));
            }
        }
    });
    //下移行的事件
    $('#tableColShowHide2 tbody').on('click', 'a[class="dwn"]', function () {
        var rowNewContent = "";
        var rowindex = $(this).parents("tbody").find("tr").index($(this).parents("tr")); //行号
        if (rowindex < $('#tableColShowHide2 tbody tr').length - 1) {
            rowNewContent = $('#tableColShowHide2 tbody').children()[rowindex].outerHTML;
            $('#tableColShowHide2 tbody tr:eq(' + (rowindex + 1) + ')').after(rowNewContent);
            $('#tableColShowHide2 tbody tr:eq(' + (rowindex) + ')').remove();

            for (var i = 0; i < $('#tableColShowHide2 tbody tr').length; i++) {
                $('#tableColShowHide2 tbody tr:eq(' + i + ') td:eq(0)').html((i + 1));
            }
        }
    });

    $("#btnSelect").click(function () {
        table.ajax.reload(null, true); // user paging is not reset on reload
        table2.ajax.reload(null, true); // user paging is not reset on reload
        return false;
    }); 


    $("#atabsimple1").click(function () {
        table.ajax.reload(null, true); // user paging is not reset on reload
        
    }); 


    $("#atabsimple2").click(function () {
        table2.ajax.reload(null, true); // user paging is not reset on reload
        
    }); 
});
//列自定义显示格式
function allcheckboxClick(allcheckbox) {
   
    if ($(allcheckbox).is(":checked")) {
        $("#dataList input[type=checkbox]").attr("checked", true);
    } else {
        $("#dataList input[type=checkbox]").attr("checked", false);
    }
}; 
function functionRemark(data, type, item, meta) {
    var val = "";
    var Status = item.Status;
   
    if (Status < 5) {
        val += '<button class="btn btn-primary" name="tdedit" data-toggle="modal" href="#modal_bz" id="' + item.WorkSheetId + '" value="' + item.WorkSheetId + '"  onclick=\'tdeditClick(' + JSON.stringify(item) +')\'  ><i class="font_ilean iconfont icon-luruyundan"></i>派工</button>';
    }
    else {
        val += ' <button class="btn disabled" name="edit"><i class="font_ilean iconfont icon-luruyundan"></i> 派工</button>';
    } 
    return val;
}

function functionRemark2(data, type, item, meta) {
    var val = "";
    var Status = item.Status;

    if (Status < 5) {
        val += '<button class="btn btn-primary" name="tdedittag"  data-toggle="modal" id="' + item.WorkSheetId + '" value="' + item.WorkSheetId + '"  onclick=\'tdedittagClick(' + JSON.stringify(item) + ')\'  ><i class="font_ilean iconfont icon-luruyundan"></i>撤回</button>';
    }
    else {
        val += ' <button class="btn disabled" name="edit"><i class="font_ilean iconfont icon-luruyundan"></i> 撤回</button>';
    }
    return val;
}
function tdeditClick(row) {
    SetEdit(row);
}
function tdedittagClick(row) {
    CancelDispatch(row);
}

function functionStatus(data, type, item, meta) {
    var state = "";
    switch (item.Status) {
        case 0: state = "待生产"; break;
        case 5: state = "生产中"; break;
        case 10: state = "已完成"; break;
        case 12: state = "已结单"; break;
        case 15: state = "已暂停"; break;
    }
    return state;
}
function functionWorkSheetId(data, type, item, meta) {
    var val = "";
    var Status = item.Status;
    if (Status < 5) {
        val += ' <div style="text-align:center;"> <input type="checkbox" style="width:16px;height:16px;" value="' + item.WorkSheetNo +'" /></div>';
    }
    else {
        val += ' <div> <span style="width:16px;height:16px;position: absolute;background: #d0cdcd;top: 15px;" /> </div>';
    } 
    return val;
}

function functionPlanStartDate(data, type, item, meta) {
    return item.PlanStartDate ? moments(item.PlanStartDate).format("YYYY-MM-DD HH:mm") : '';
}
function functionPlanEndDate(data, type, item, meta) {
    return item.PlanEndDate ? moments(item.PlanEndDate).format("YYYY-MM-DD HH:mm") : '';
} 
function functionProductName(data, type, item, meta) {
    var ProductName = "";
    if (item.ProductName.length > 20) {
        ProductName = item.ProductName.substring(0, 20) + "...";
    }
    else {
        ProductName = item.ProductName;
    }
    return ProductName;
}

 
//根据字符串转换为函数
function returnFunctionName(name) {
    switch (name) {
        case 'functionWorkSheetId':
            return functionWorkSheetId
        case 'functionStatus':
            return functionStatus
        case 'functionRemark':
            return functionRemark
        case 'functionRemark2':
            return functionRemark2
        case 'functionRestCount':
            return functionRestCount
        case 'functionPlanStartDate':
            return functionPlanStartDate
        case 'functionPlanEndDate':
            return functionPlanEndDate
        case 'functionStartTime':
            return functionStartTime
        case 'functionEndTime':
            return functionEndTime
        case 'functionProductName':
            return functionProductName
        case 'functionWorkSheetNo':
            return functionWorkSheetNo
    }
} 


 

function GetWorkOrder() {
    var workorder = "", line = "", plandate = "", mps = "", productcode = "", state = "",workShop="";
    if ($("input[name=WorkOrder]").val())
        workorder = $("input[name=WorkOrder]").val();
    if ($("select[name=WorkShop]").val() && $("select[name=WorkShop]").val().indexOf("==请选择==") < 0)
        workShop = $("select[name=WorkShop]").val();
    if ($("select[name=Line]").val() && $("select[name=Line]").val().indexOf("==请选择==") < 0)
        line = $("select[name=Line]").val();
    if ($("input[name=PlanDate]").val())
        plandate = $("input[name=PlanDate]").val();
    if ($("input[name=MPS]").val())
        mps = $("input[name=MPS]").val();
    if ($("input[name=ProductCode]").val())
        productcode = $("input[name=ProductCode]").val();
    if ($("select[name=State]").val() && $("select[name=State]").val().indexOf("==请选择==") < 0)
        state = $("select[name=State]").val();

    $("#workorder").html("");
    $.ajax({
        url: '/api/saps/workorder?rows=' + rows + '&page=' + page + '&WorkSheetNo=' + workorder + '&LineId=' + line + '&WorkShopId=' + workShop + '&CurrentDate=' + plandate + '&OrderNo=' + mps + '&ProductCode=' + productcode + '&Status=0' + '&Dispatching=0',
        beforeSend: jQueryShowLoading(),//显示加载图标
        success: function (value) {
            jQuery('body').hideLoading();//隐藏加载图标
            paging(value.total);
            if (value.status) {
                var order = [];
                $.each(value.rows, function (index, item) {
                    var row = {
                        Index: (index + (page - 1) * rows + 1), WorkSheetId: item.WorkSheetId
                        ,WorkOrder: item.WorkSheetNo, ProductCode: item.ProductCode
                        , ProductName: item.ProductName, PlanStartDate: moments(item.PlanStartDate).format("YYYY-MM-DD HH:mm"),
                        PlanEndDate: moments(item.PlanEndDate).format("YYYY-MM-DD HH:mm")
                        , Quantity: item.PlanCount, DayQty: item.CurrentDay, CompletionNumber: item.CompletedCount, State: item.Status
                        , LineId: item.LineId, LineName: item.LineName
                        /*, StandardTime: item.StandardTime*/, StandardUph: item.StandardUph,
                        row: JSON.stringify(item), checked: false, Status: item.Status
                        , Customer: item.Customer
                    };
                    if (index == 0) {
                        row.checked = true;
                    }
                    switch (item.Status) {
                        case 0: row.State = "待生产"; break;
                        case 5: row.State = "生产中"; break;
                        case 10: row.State = "已完成"; break;
                        case 12: row.State = "已关闭"; break;
                        case 15: row.State = "已暂停"; break;
                    }
                    order.push(row);
                });
                $("#workorder").html($("#template-table").render(order));
                ////点击事件
                //$("tr[name=workorder]").unbind().click(function () {
                //    $("input[type=radio]").removeAttr("checked");
                //    $(this).find("input").attr("checked", true);
                //});

                $("button[name=tdedit]").unbind().click(function () {
                   
                });
            }
        }
    });

}

function GetWorkOrdertag() {
    var workorder = "", line = "", plandate = "", mps = "", productcode = "", state = "", workShop = "";
    if ($("input[name=WorkOrder]").val())
        workorder = $("input[name=WorkOrder]").val();
    if ($("select[name=WorkShop]").val() && $("select[name=WorkShop]").val().indexOf("==请选择==") < 0)
        workShop = $("select[name=WorkShop]").val();
    if ($("select[name=Line]").val() && $("select[name=Line]").val().indexOf("==请选择==") < 0)
        line = $("select[name=Line]").val();
    if ($("input[name=PlanDate]").val())
        plandate = $("input[name=PlanDate]").val();
    if ($("input[name=MPS]").val())
        mps = $("input[name=MPS]").val();
    if ($("input[name=ProductCode]").val())
        productcode = $("input[name=ProductCode]").val();
    if ($("select[name=State]").val() && $("select[name=State]").val().indexOf("==请选择==") < 0)
        state = $("select[name=State]").val();

    $("#workordertag").html("");
    $.ajax({
        url: '/api/saps/workorder?rows=' + rowstag + '&page=' + pagetag + '&WorkSheetNo=' + workorder + '&LineId=' + line + '&WorkShopId=' + workShop + '&CurrentDate=' + plandate + '&OrderNo=' + mps + '&ProductCode=' + productcode + '&Status=0' + '&Dispatching=1',
        //beforeSend: jQueryShowLoading(),//显示加载图标
        success: function (value) {
            //jQuery('body').hideLoading();//隐藏加载图标
            pagingtag(value.total);
            if (value.status) {
                var order = [];
                $.each(value.rows, function (index, item) {
                    var row = {
                        Index: (index + (pagetag - 1) * rowstag + 1), WorkSheetId: item.WorkSheetId
                        , WorkOrder: item.WorkSheetNo, ProductCode: item.ProductCode
                        , ProductName: item.ProductName, PlanStartDate: moments(item.PlanStartDate).format("YYYY-MM-DD HH:mm"),
                        PlanEndDate: moments(item.PlanEndDate).format("YYYY-MM-DD HH:mm")
                        , Quantity: item.PlanCount, DayQty: item.CurrentDay, CompletionNumber: item.CompletedCount, State: item.Status
                        , LineId: item.LineId, LineName: item.LineName
                        /*, StandardTime: item.StandardTime*/, StandardUph: item.StandardUph,
                        row: JSON.stringify(item), checked: false, Status: item.Status
                        , Customer: item.Customer
                    };
                    if (index == 0) {
                        row.checked = true;
                    }
                    switch (item.Status) {
                        case 0: row.State = "待生产"; break;
                        case 5: row.State = "生产中"; break;
                        case 10: row.State = "已完成"; break;
                        case 12: row.State = "已关闭"; break;
                        case 15: row.State = "已暂停"; break;
                    }
                    order.push(row);
                });
                $("#workordertag").html($("#template-tabletag").render(order));
 
                $("button[name=tdedittag]").unbind().click(function () {
                    var row = JSON.parse($(this).attr("row"));
                    CancelDispatch(row);
                });
            }
        }
    });

}

function CancelDispatch(value)
{
    var WorkSheetNo = value.WorkSheetNo;
    $.ajax({
        url: "/api/saps/workorder/EditCancelDispatch",
        data: {
            WorkSheetNo: WorkSheetNo,
        },
        type: 'POST',
        beforeSend: jQueryShowLoading(),//显示加载图标
        success: function (result) {
            jQuery('body').hideLoading();//隐藏加载图标
            if (result.length == 0) {
                $("#btnSelect").click();
            }
            else
                toastr.info(result);
                //alert(result);
        }
    });
}

function Submit(value) {
    var url = "/api/saps/workorder/EditDispatch";
    $.ajax({
        url: url,
        data: JSON.stringify(value),
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: jQueryShowLoading(),//显示加载图标
        success: function (result) {
            jQuery('body').hideLoading();//隐藏加载图标
            if (result.status) {
                $("#btnSelect").click();
                $(".modal").modal("hide");
            } else {
                toastr.info(value.message);
                //alert(value.message);
            }
        }
    });
}


function SetEdit(value) {
    if (!$("input[name=editProductName]").val())
        $("input[name=editProductName]").val(value.ProductName);
    if (!$("input[name=editProductCode]").val())
        $("input[name=editProductCode]").val(value.ProductCode);
    if (!$("input[name=editWorkOrder]").val())
        $("input[name=editWorkOrder]").val(value.WorkSheetNo);
    if (!$("input[name=editQuantity]").val())
        $("input[name=editQuantity]").val(value.PlanCount);
    if (!$("input[name=editStandardUph]").val())
        $("input[name=editStandardUph]").val(value.StandardUph);
    if (!$("input[name=editPlanStartDate]").val())
        $("input[name=editPlanStartDate]").val(moments(value.PlanStartDate).format("YYYY-MM-DD HH:mm"));
    if (!$("input[name=editPlanEndDate]").val())
        $("input[name=editPlanEndDate]").val(moments(value.PlanEndDate).format("YYYY-MM-DD HH:mm"));
    if (!$("input[name=editLine]").val())
        $("select[name=editLine]").val(value.LineId);
    $("button[name=editSubmit]").attr("value", value.WorkSheetId);
}

function SetEdittag(value) {
    if (!$("input[name=editProductName]").val())
        $("input[name=editProductName]").val(value.ProductName);
    if (!$("input[name=editProductCode]").val())
        $("input[name=editProductCode]").val(value.ProductCode);
    if (!$("input[name=editWorkOrder]").val())
        $("input[name=editWorkOrder]").val(value.WorkSheetNo);
    if (!$("input[name=editQuantity]").val())
        $("input[name=editQuantity]").val(value.PlanCount);
    if (!$("input[name=editStandardUph]").val())
        $("input[name=editStandardUph]").val(value.StandardUph);
    if (!$("input[name=editPlanStartDate]").val())
        $("input[name=editPlanStartDate]").val(moments(value.PlanStartDate).format("YYYY-MM-DD HH:mm"));
    if (!$("input[name=editPlanEndDate]").val())
        $("input[name=editPlanEndDate]").val(moments(value.PlanEndDate).format("YYYY-MM-DD HH:mm"));
    if (!$("input[name=editLine]").val())
        $("select[name=editLine]").val(value.LineId);
    $("button[name=editSubmit]").attr("value", value.WorkSheetId);
}

function GetWorkLine(workshop) {
    $.ajax({
        url: '/api/sys/line?TenantId=' + TenantId + '&WorkShopId=' + workshop,
        success: function (value) {
            if (value.total > 0) {
                var option = [{ Id: '', Code: '', Name: '==请选择==' }];
                var workshopOption = [{ Id: '', Code: '', Name: '==请选择==' }];
                var workshop = "";
                $.each(value.rows, function (index, item) {
                    var row = { Id: item.LineId, Code: item.LineCode, Name: item.LineName, Group: item.WorkShopCode };
                    if (workshop.indexOf(item.WorkShopCode) < 0) {
                        workshopOption.push({ Id: item.WorkShopId, Code: item.WorkShopCode, Name: item.WorkShopName, Group: item.FactoryCode });
                        workshop += item.WorkShopCode + " ; "
                    }
                    option.push(row);
                })
                $('select[name=Line]').html($("#template-option").render(option));
                $('select[name=WorkShop]').html($("#template-option").render(workshopOption));
                $('select[name=editLine]').html($("#template-option").render(option));
                $('select[name=designateLine]').html($("#template-option").render(option));
                $('select[name=designateWorkShop]').html($("#template-option").render(workshopOption));
            }
        }
    })
}

 