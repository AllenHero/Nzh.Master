var rows = 7;
var page = 1;
var createCurrentday = false;

$(function () {
    GetWorkShop();
    GetWorkLine('');
    GetConfig();
    $("button[name=findClear]").click(function () {
        $("input[group=find]").val("");
        $("select[group=find]").val("");
        return false;
    });
    $("button[name=clear]").click(function () {
        Clear();
        return false;
    });

    $("button[name=createCurrentDay]").click(function () {
        createCurrentday = true;
        $("#btnSelect").click();
        return false;
    });
    //添加工单
    $("#newPlanStartDate").datetimepicker({
        format: 'yyyy-MM-dd HH:mm',
        weekStart: 1,
        language: 'cn',
        minView: 'month',
        autoclose: true,
        todayBtn: true,
        startDate: new Date(),//设置日期开始日间不能大于今天
    }).on("changeDate", function (ev) {
        if (ev.date) {
            $('#newPlanEndDate').datetimepicker('setStartDate', ev.date);
            var endate = new Date($("input[name=newPlanEndDate]").val());
            if (endate && $("input[name=newPlanEndDate]").val()) {//获取结束日期当前值
                if (ev.date > endate)
                    $('#newPlanEndDate').datetimepicker('setDate', moments(ev.date.valueOf()).add(1, 'hours'));
            } else {
                $('#newPlanEndDate').datetimepicker('setDate', moments(ev.date.valueOf()).add(1, 'hours'));
            }

        } else {
            $('#newPlanEndDate').datetimepicker('setStartDate');
        }
    });
    //修改工单
    $("#editPlanStartDate").datetimepicker({
        format: 'yyyy-MM-dd HH:mm',
        weekStart: 1,
        language: 'cn',
        minView: 'month',
        autoclose: true,
        todayBtn: true,
        startDate: new Date(),//设置日期开始日间不能大于今天
    }).on("changeDate", function (ev) {
        if (ev.date) {
            $('#editPlanEndDate').datetimepicker('setStartDate', ev.date);
            var endate = new Date($("input[name=editPlanEndDate]").val());
            if (endate && $("input[name=editPlanEndDate]").val()) {//获取结束日期当前值
                if (ev.date > endate)
                    $('#editPlanEndDate').datetimepicker('setDate', moments(ev.date.valueOf()).add(1, 'hours'));
            } else {
                $('#editPlanEndDate').datetimepicker('setDate', moments(ev.date.valueOf()).add(1, 'hours'));
            }

        } else {
            $('#editPlanEndDate').datetimepicker('setStartDate');
        }
    });

    $("select[name=newWorkShop]").change(function () {
        GetWorkLine($(this).val());
    });

    $("select[name=WorkShop]").change(function () {
        GetWorkLine($(this).val());
    });

    $('button[data-dismiss=modal]').click(function () {
        $("input[group=new]").val("");
        $("input[group=edit]").val("");
        $("select[group=new]").val("");
        $("select[group=edit]").val("");
        $("input").removeClass("require");
        $("select").removeClass("require");
       
    });

    $("button[name=edit]").click(function () {
        var row = JSON.parse($("input[checked]").attr("row"));
        SetEdit(row);
    });
    $("input[name=newProductCode]").keyup(function () {
        if ($("input[name=newProductName]").val())
            $("input[name=newProductName]").val("");
    });
    $("input[name=editProductCode]").keyup(function () {
        if ($("input[name=editProductName]").val())
            $("input[name=editProductName]").val("");
    });

    $("input[name=newProductCode]").change(function () {
        $("#newProductCode").hide();
        GetProduct(this);
    });

    $("input[name=editProductCode]").change(function () {
        $("#editProductCode").css("display", "none");
        GetProduct(this);
    });

    $("button[name=newSubmit]").click(function () {
        var WorkOrder = "", ProductCode = "", ProductName = "";
        var PlanCount = 0, StandardUph = 0, PlanStartDate = "";
        var PlanEndDate = "", LineId = "", LineName = "", LineCode = "";
        var DeliveryDate = "", WorkShopId = "", WorkShopName = "", WorkShopCode = "";
        var require = true;
        if ($("input[name=newProductName]").val())
            ProductName = $("input[name=newProductName]").val();

        if ($("input[name=newProductCode]").val()) {
            if ($("#newProductCode").is(":hidden"))
                ProductCode = $("input[name=newProductCode]").val();
            else {
                $("input[name=newProductCode]").addClass("required");
                require = false;
            }
        }
        else {
            $("input[name=newProductCode]").addClass("required");
            require = false;
        }

        if ($("input[name=newWorkOrder]").val())
            WorkOrder = $("input[name=newWorkOrder]").val();
        else {
            $("input[name=newWorkOrder]").addClass("required");
            require = false;
        }
        if ($("input[name=newQuantity]").val()) {
            var count = $("input[name=newQuantity]").val();
            if (count < 0) {
                toastr.info("计划数量不能小于0");
                //alert("");
                require = false;
                $("input[name=newQuantity]").addClass("required");
            }
            else
                PlanCount = count;
        }
        else {
            $("input[name=newQuantity]").addClass("required");
            require = false;
        }
        if ($("input[name=newStandardUph]").val()) {
            StandardUph = $("input[name=newStandardUph]").val();
            if (StandardUph < 0) {
                require = false;
                toastr.info("UPH不能为负数");
                //alert("UPH不能为负数");
            }
        }
        else {
            $("input[name=newStandardUph]").addClass("required");
            require = false;
        }
        if ($("input[name=newPlanStartDate]").val())
            PlanStartDate = $("input[name=newPlanStartDate]").val();
        else {
            $("input[name=newPlanStartDate]").addClass("required");
            require = false;
        }
        if ($("input[name=newPlanEndDate]").val())
            PlanEndDate = $("input[name=newPlanEndDate]").val();
        else {
            $("input[name=newPlanEndDate]").addClass("required");
            require = false;
        }

        if ($("input[name=newDeliveryDate]").val())
            DeliveryDate = $("input[name=newDeliveryDate]").val();
        else {
            $("input[name=newDeliveryDate]").addClass("required");
            require = false;
        }

        if ($("select[name=newWorkShop]").val()) {
            WorkShopId = $("select[name=newWorkShop]").val();
            WorkShopName = $("#" + $("select[name=newWorkShop]").val()).attr("name");
            WorkShopCode = $("#" + $("select[name=newWorkShop]").val()).attr("code");
        }
        else {
            $("select[name=newWorkShop]").addClass("required");
            require = false;
        }

        if ($("select[name=newLine]").val()) {
            LineId = $("select[name=newLine]").val();
            LineName = $("#" + $("select[name=newLine]").val()).attr("name");
            LineCode = $("#" + $("select[name=newLine]").val()).attr("code");
        }
        else {
            $("select[name=newLine]").addClass("required");
            require = false;
        }
        var param = {
            Type: "Insert", WorkSheetId: '', WorkSheetNo: WorkOrder
            , ProductCode: ProductCode, ProductName: ProductName
            , PlanCount: PlanCount, StandardUph: StandardUph, PlanStartDate: PlanStartDate
            , PlanEndDate: PlanEndDate, LineId: LineId, LineName: LineName, LineCode: LineCode
            , DeliveryDate: DeliveryDate, WorkShopId: WorkShopId, WorkShopName: WorkShopName, WorkShopCode: WorkShopCode
        };

        if (require) {
            $("input").removeClass("require");
            $("select").removeClass("require");
            Submit(param);
        }
        else {
            toastr.warning("请检查红色必填信息");
        }
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
            Type: "Update", WorkSheetId: $(this).attr("value")//$("input[checked]").attr("value")
            , WorkSheetNo: WorkOrder
            , ProductCode: ProductCode, ProductName: ProductName
            , PlanCount: PlanCount, StandardUph: StandardUph, PlanStartDate: PlanStartDate
            , PlanEndDate: PlanEndDate, LineId: LineId, LineName: LineName, LineCode: LineCode
        };
        if (require) {
            $("input").removeClass("require");
            $("select").removeClass("require");
            Submit(param);
        }
        else {
            toastr.warning("请检查红色必填信息");
        }
    });

    $("button[name=importSubmit]").click(function () {
        SetConfig();
    });

    function changeState(el) {
        if (el.readOnly) el.checked = el.readOnly = false;
        else if (!el.checked) el.readOnly = el.indeterminate = true;
    }


    $("button[name=deleteSubmit]").click(function () {
        var required = true;
        var workorder = $("input[name=deleteWorkOrder]").val();
        if (!workorder) {
            workorder = "";
            $("input[name=deleteWorkOrder]").addClass("required");
            required = false;
        }

        if (required) {
            $.ajax({
                url: '/api/saps/workorder/EditDeleteBatch',
                data: JSON.stringify({ TenantId: TenantId, WorkSheetNo: workorder }),
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: jQueryShowLoading(),//显示加载图标
                success: function (value) {
                    jQuery('body').hideLoading();//隐藏加载图标
                    if (value.status) {
                        $("#modal_delete").modal("hide");

                        $("input[group=delete]").val("");
                        $("select[group=delete]").val("");
                        $("#btnSelect").click();
                    } else {
                        toastr.info(value.message);
                        //alert(value.message);
                    }
                }
            })
        }
    }); 

    $("button[name=delete]").click(function () {
        var workOrderList = $("#dataList input[type=checkbox]");
        var workOrders = "";
        $.each(workOrderList, function (index, item) {
            if ($(item).is(":checked"))
                workOrders += $(item).attr('value') + ","
        });
        if (workOrders.length > 0) {
            $("input[name=deleteWorkOrder]").val(workOrders.substring(0, workOrders.length - 1));
            $("#modal_delete").modal("show");
        }
        else {
            toastr.info("请选择要删除的工单！");
            //alert("请选择要删除的工单！");
            //$("button[name=deleteCancel]").click();
            $("#modal_delete").modal("hide");
        }
    });

    $("button[name=deleteCancel]").click(function () {
        $("input[group=delete]").val("");
    });


    //table列初始化
    var columnsArray = [
        { "data": 'WorkSheetId', "title": "<input type='checkbox' name='allcheckbox' onClick='allcheckboxClick(this)' style='width:16px;height:16px;' />", "searchable": false, "width": "100px", "visible": true, "sortable": false, "render": functionWorkSheetId },
        { "data": 'TenantId', "title": "操作", "searchable": false, "width": "100px", "visible": true, "sortable": true, "render": functionRemark },
        { "data": 'Status', "title": "工单状态", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionStatus },
        { "data": 'WorkSheetNo', "title": "工单编号", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'ProductCode', "title": "产品代码", "searchable": false, "width": "120px", "visible": true, "sortable": true  },

        { "data": 'ProductName', "title": "产品名称", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionProductName },
        { "data": 'LineName', "title": "产线名称", "searchable": false, "width": "120px", "visible": true, "sortable": true },

        { "data": 'PlanStartDate', "title": "计划开工时间", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionPlanStartDate },
        { "data": 'PlanEndDate', "title": "计划完工时间", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionPlanEndDate },
        { "data": 'PlanCount', "title": "计划数量", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'StandardUph', "title": "小时目标产量", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'Customer', "title": "客户", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'CreateDate', "title": "创建时间", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionCreateDate },
        { "data": 'Remark', "title": "备注", "searchable": false, "width": "120px", "visible": true, "sortable": true }  
    ];

    var post = {
        "url": "/api/saps/workorder/EditWorkOrderPageList",
        "type": "POST",
        "contentType": "application/json; charset=utf-8",
        "data": function (d) {
            var workorder = "", line = "", plandate = "", mps = "", productcode = "", state = "", workShop = "", CreateDate = "";
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
            if ($("select[name=Status]").val() && $("select[name=Status]").val().indexOf("==请选择==") < 0)
                state = $("select[name=Status]").val();
            if (createCurrentday) {
                CreateDate = moments().format("YYYY-MM-DD");
            }
            d.WorkSheetNo = workorder;
            d.LineId = line;
            d.WorkShopId = workShop;
            d.CurrentDate = plandate;
            d.OrderNo = mps;
            d.ProductCode = productcode;
            d.Status = state;
            d.CreateDate = CreateDate;
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
            var Head = columnsArray[i].title;
            if (i == 0)
                Head = "选择";
            var tempHtml = "<tr data=\"" + columnsArray[i].data + "\" searchable=\"" + columnsArray[i].searchable + "\" width=\"" + columnsArray[i].width + "\" title=\"" + columnsArray[i].title + "\" sortable=\"" + columnsArray[i].sortable + "\">";
            tempHtml += "<td>" + (i + 1) + "</td> ";
            tempHtml += "<td>" + Head + "</td> ";
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

    var TenantId = "";
    GetLineName();
    GetProductName();
    // 
    //table列初始化
    var columnsArray2 = [
        { "data": 'Result', "title": "导入结果", "searchable": false, "width": "120px", "visible": true, "sortable": false },
        { "data": 'FailReason', "title": "导入失败原因", "searchable": true, "width": "120px", "visible": true, "sortable": true, "render": functionFailReason },
        { "data": 'UpdateDate', "title": "导入日期", "searchable": true, "width": "120px", "visible": true, "sortable": true, "render": functionFarmactTime },
        { "data": 'Customer', "title": "客户号", "searchable": false, "width": "120px", "visible": true, "sortable": false },
        { "data": 'WorkSheetNo', "title": "工单编号", "searchable": false, "width": "120px", "visible": true, "sortable": false },
        { "data": 'ProductCode', "title": "产品代码", "searchable": false, "width": "120px", "visible": true, "sortable": false },
        { "data": 'ProductName', "title": "产品名称", "searchable": false, "width": "120px", "visible": true, "sortable": false, },
        { "data": 'LineName', "title": "产线名称", "searchable": false, "width": "120px", "visible": true, "sortable": false },
        { "data": 'PlanCount', "title": "计划数量", "searchable": false, "width": "120px", "visible": true, "sortable": false },
        { "data": 'StandardUph', "title": "标准UPH", "searchable": false, "width": "120px", "visible": true, "sortable": false },
        { "data": 'PlanStartDate', "title": "计划开工时间", "searchable": false, "width": "120px", "visible": true, "sortable": false, "render": functionFarmactTime },
        { "data": 'PlanEndDate', "title": "计划完工时间", "searchable": false, "width": "120px", "visible": true, "sortable": false, "render": functionFarmactTime }
    ];

    var post2 = {
        "url": "/api/SAPS/WorkOrder/EditImportResultList",
        "type": "POST",
        "contentType": "application/json; charset=utf-8",
        "data": function (data) {
            data.SearchType = $("#Searchtype").find("option:selected").text();
            data.LineName = $("#LineName").find("option:selected").text();
            data.ProductName = $("#ProductName").find("option:selected").text();
            return JSON.stringify(data);
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
    var table2 = $('#resultlist').DataTable(datatableSetting2);
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

        $('#resultlist').DataTable().clear();
        $('#resultlist').DataTable().destroy();
        table2 = $('#resultlist').DataTable({
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

   

    $("#imageReturnHome").click(function (event) {
        
        $("#section1").css("display", "");
        table.ajax.reload(null, false);
        $("#section2").css("display", "none");
    });
    $("#searchbtn").click(function (event) {
        $("#section2").css("display", "");
        table2.ajax.reload(null, false);
        $("#section1").css("display", "none");
       
    });
    $("#ResultSearchBTN").click(function () {
        table2.ajax.reload(null, false); // user paging is not reset on reload
    });
    $("#searchclear").click(function () {
        $("#Searchtype").find("option:first").prop("selected", true);
        $("#LineName").find("option:first").prop("selected", true);
        $("#ProductName").find("option:first").prop("selected", true);
        return false;
    });

    $("#btnSelect").click(function () {
        table.ajax.reload(null, true); // user paging is not reset on reload
        return false;
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
//列自定义显示格式
function functionWorkSheetId(data, type, item, meta) {
    var val = "";
    var Status = item.Status;
    if (Status < 5) {
        val += ' <div style="text-align:center;"> <input type="checkbox" style="width:16px;height:16px;" value="' + item.WorkSheetNo + '" /></div>';
    }
    else {
        val += ' <div> <span style="width:16px;height:16px;position: absolute;background: #d0cdcd;top: 15px;" /> </div>';
    }
    return val;
}

function functionRemark(data, type, item, meta) {
    var val = "";
    var Status = item.Status;

    if (Status < 5) {
        val += '<button class="btn btn-primary" name="tdedit" data-toggle="modal" href="#modal_bz" id="' + item.WorkSheetId + '" value="' + item.WorkSheetId + '"  onclick=\'tdeditClick(' + JSON.stringify(item) + ')\'  ><i class="font_ilean iconfont icon-luruyundan"></i>修改</button>';
    }
    else {
        val += ' <button class="btn disabled" name="edit"><i class="font_ilean iconfont icon-luruyundan"></i> 修改</button>';
    }
    return val;
}
 
function tdeditClick(row) {
    SetEdit(row);
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
 
 
function functionPlanStartDate(data, type, item, meta) {
    return item.PlanStartDate ? moments(item.PlanStartDate).format("YYYY-MM-DD HH:mm") : '';
}
function functionPlanEndDate(data, type, item, meta) {
    return item.PlanEndDate ? moments(item.PlanEndDate).format("YYYY-MM-DD HH:mm") : '';
} 
function functionCreateDate(data, type, item, meta) {
    return item.CreateDate ? moments(item.CreateDate).format("YYYY-MM-DD HH:mm") : '';
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
        case 'functionCreateDate':
            return functionCreateDate
        case 'functionRemark':
            return functionRemark
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
        case 'functionFarmactTime':
            return functionFarmactTime
        case 'functionFailReason':
            return functionFailReason
    }
} 


function GetLineName() {
    $.ajax({
        type: "get",
        url: "/api/SAPS/WorkOrder/GetLineName",
        success: function (data) {
            if (data != null) {
                var option = null;
                option = $("<option value=''>");
                $("#LineName").append(option);
                for (var i = 0; i < data.length; i++) {
                    option = $("<option>").val(data[i].LineId).text(data[i].LineName);
                    $("#LineName").append(option);
                }
            }
        }
    })
}
function GetProductName() {
    $.ajax({
        type: "get",
        url: "/api/SAPS/WorkOrder/GetProductName",
        success: function (data) {
            if (data != null) {
                var option = null;
                option = $("<option value=''>");
                $("#ProductName").append(option);
                for (var i = 0; i < data.length; i++) {
                    option = $("<option>").val(data[i].ProductId).text(data[i].ProductName);
                    $("#ProductName").append(option);
                }
            }
        }
    })
}
function getSearchData() {
    $.ajax({
        type: "get",
        url: "/api/SAPS/WorkOrder/GetSearchWorkOrder",
        data: {
            type: $("#Searchtype").find("option:selected").text(),
            linename: $("#LineName").find("option:selected").text(),
            productname: $("#ProductName").find("option:selected").text(),
        },
        success: function (data) {
            $("#resultlist").html(data[0].html);
        }
    })
}
function functionFarmactTime(data, type, full, meta) {
    return moment(full.CreateDate).format("YYYY-MM-DD HH:mm:ss");
}
function functionFailReason(data, type, full, meta) {
    return (data == null || data == "") ? "无" : data;
}


function GetProduct(dom) {
    $.ajax({
        url: '/api/sys/inventory?TenantId=' + TenantId + "&InventoryCode=" + $(dom).val(),
        success: function (value) {
            var group = $(dom).attr("group");
            if (value.total > 0) {
                console.log(value);
                var bb = true;
                $.each(value.rows, function (index,item) {
                    if (item.InventoryCode == $(dom).val()) {
                        bb = false;
                        if (group == "new") {
                            $("input[name=newProductName]").val(item.InventoryName);
                            $("input[name=newStandardUph]").val(item.StandardUPH);
                        } else {
                            $("input[name=editProductName]").val(item.InventoryName);
                            $("input[name=editStandardUph]").val(item.StandardUPH);
                        }
                        return false;
                    }
                })
                if (bb) {
                    if (group == "new") {
                        $("#newProductCode").show();
                    } else {
                        $("#editProductCode").show();
                    }
                }
            } else {
                if (group == "new") {
                    $("#newProductCode").show();
                } else {
                    $("#editProductCode").show();
                }
            }
        }
    })
}

//开始日期和结束日期比较
function dateChange(startDate, endDate) {
    var start = new moments($(startDate).find("input").val());
    var end = new moments($(endDate).find("input").val());
    if (start && $(startDate).find("input").val()) {
        $(endDate).datetimepicker('setStartDate', start);
        if (end && $(endDate).find("input").val()) {
            if (start > end)
                $(endDate).datetimepicker('setDate', start);
        } else {
            $(endDate).datetimepicker('setDate', start);
        }
    } else {
        $(startDate).find("input").val("");
        $(endDate).datetimepicker('setStartDate');
    }
}

function GetWorkOrder() {
    var workorder = "", line = "", plandate = "", mps = "", productcode = "", state = "", workShop = "", CreateDate = "";
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
    if ($("select[name=Status]").val() && $("select[name=Status]").val().indexOf("==请选择==") < 0)
        state = $("select[name=Status]").val();
    if (createCurrentday) {
        CreateDate = moments().format("YYYY-MM-DD");
    }

    $.ajax({
        url: '/api/saps/workorder?rows=' + rows + '&page=' + page + '&WorkSheetNo=' + workorder + '&LineId=' + line + '&WorkShopId=' + workShop + '&CurrentDate=' + plandate + '&OrderNo=' + mps + '&ProductCode=' + productcode + '&Status=' + state + '&CreateDate=' + CreateDate,
        beforeSend: jQueryShowLoading(),//显示加载图标
        success: function (value) {
            jQuery('body').hideLoading();//隐藏加载图标
            paging(value.total);
            $("#workorder").html("");
            createCurrentday = false;
            if (value.status) {
                var order = [];
                $.each(value.rows, function (index, item) {
                    var row = {
                        Index: (index + (page - 1) * rows + 1), WorkSheetId: item.WorkSheetId
                        , WorkOrder: item.WorkSheetNo, ProductCode: item.ProductCode
                        , ProductName: item.ProductName, PlanStartDate: moments(item.PlanStartDate).format("YYYY-MM-DD HH:mm"),
                        PlanEndDate: moments(item.PlanEndDate).format("YYYY-MM-DD HH:mm")
                        , Quantity: item.PlanCount, DayQty: item.CurrentDay
                        , CompletionNumber: item.CompletedCount ? item.CompletedCount : 0
                        , State: item.Status
                        , LineId: item.LineId, LineName: item.LineName
                        , StandardTime: item.StandardTime, StandardUph: item.StandardUph
                        , StartTime: item.StartTime, EndTime: item.EndTime
                        , Remainder: item.PlanCount - (item.CompletedCount ? item.CompletedCount : 0)
                        , row: JSON.stringify(item), checked: false, Status: item.Status
                        , Customer: item.Customer, CreateDate: moments(item.CreateDate).format("YYYY-MM-DD HH:mm")
                    };
                    if (index == 0) {
                        row.checked = true;
                    }
                    switch (item.Status) {
                        case 0: row.State = "待生产"; break;
                        case 5: row.State = "生产中"; break;
                        case 10: row.State = "已完成"; break;
                        case 12: row.State = "已结单"; break;
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
                    var row = JSON.parse($(this).attr("row"));
                    SetEdit(row);
                });
            } else {

                toastr.info(value.message);
                //alert(value.message);
            }
        }
    });
}

function Submit(value) {
    var url = "/api/saps/workorder/";
    if (value.Type == "Insert")
        url += "EditInsert";
    else
        url += "EditUpdate";
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
                Clear();
                $(".modal").modal("hide");
            } else {
                toastr.warning(result.message);
                //alert(result.message);
            }
        }
    });
}

function GetWorkShop() {
    $.ajax({
        url: '/api/sys/workshop?TenantId=' + TenantId,
        success: function (value) {
            if (value.total > 0) {
                var option = [{ Id: '', Code: '', Name: '==请选择==' }];
                $.each(value.rows, function (index, item) {
                    var row = { Id: item.WorkShopId, Code: item.WorkShopCode, Name: item.WorkShopName };
                    option.push(row);
                })
                $('select[name=newWorkShop]').html($("#template-option").render(option));
                $('select[name=WorkShop]').html($("#template-option").render(option));
            }
        }
    })
}

function GetWorkLine(workshop) {
    $.ajax({
        url: '/api/sys/line?TenantId=' + TenantId + '&WorkShopId=' + workshop,
        success: function (value) {
            if (value.total > 0) {
                var option = [{ Id: '', Code: '', Name: '==请选择==' }];
                $.each(value.rows, function (index, item) {
                    var row = { Id: item.LineId, Code: item.LineCode, Name: item.LineName };
                    option.push(row);
                })
                $('select[name=Line]').html($("#template-option").render(option));
                $('select[name=newLine]').html($("#template-option").render(option));
                $('select[name=editLine]').html($("#template-option").render(option));
            }
        }
    })
}

function Clear() {
    $("input[group=edit]").val("");
    $("select[group=edit]").val("");
    $("input[group=new]").val("");
    $("select[group=new]").val("");
    //$("input[name=WorkOrder]").val("");
    //$("select[name=Line]").val("");
    //$("input[name=PlanDate]").val("");
    //$("input[name=ProductCode]").val("");
    //$("input[name=MPS]").val("");
    //$("select[name=State]").val("");
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

function GetConfig() {
    $.ajax({
        url: '/api/saps/workorder/GetConfig',
        success: function (value) {
            if (value.status) {
                var obj = value.rows;
                $("input[name=startSheet]").val(obj.startSheet);
                $("input[name=endSheet]").val(obj.endSheet);
                $("input[name=importDataStart]").val(obj.importDataStart);
                $("input[name=importDataEnd]").val(obj.importDataEnd);
                $("input[name=importLine]").val(obj.importLine);
                $("input[name=importStandardUph]").val(obj.importStandardUph);
                $("input[name=importWorkOrder]").val(obj.importWorkOrder);
                $("input[name=importQuantity]").val(obj.importQuantity);
                $("input[name=importPlanStartDate]").val(obj.importPlanStartDate);
                $("input[name=importPlanEndDate]").val(obj.importPlanEndDate);
                $("input[name=importProductCode]").val(obj.importProductCode);
                $("input[name=importProductName]").val(obj.importProductName);
            }
        }
    });
}

function SetConfig() {
    var startSheet = "", endSheet = "", importDataStart = "", importDataEnd = "";
    var importLine = "", importWorkOrder = "", importQuantity = "";
    var importPlanStartDate = "", importPlanEndDate = "", importProductCode = "";
    var importProductName = "", importStandardUph = "", importWorkShopId = "", importDeliveryDate = "";
    var require = true;
    $.each($("input[group=import]"), function (index, item) {
        if (!item.value) {
            $(item).addClass("required");
            require = false;
        }
    })
    if (require) {
        var value = {
            startSheet: $("input[name=startSheet]").val()
            , endSheet: $("input[name=endSheet]").val()
            , importDataStart: $("input[name=importDataStart]").val()
            , importDataEnd: $("input[name=importDataEnd]").val()
            , importLine: $("input[name=importLine]").val()
            , importStandardUph: $("input[name=importStandardUph]").val()
            , importWorkOrder: $("input[name=importWorkOrder]").val()
            , importQuantity: $("input[name=importQuantity]").val()
            , importPlanStartDate: $("input[name=importPlanStartDate]").val()
            , importPlanEndDate: $("input[name=importPlanEndDate]").val()
            , importProductCode: $("input[name=importProductCode]").val()
            , importProductName: $("input[name=importProductName]").val()
            , importWorkShop: $("input[name=importWorkShop]").val()
            , importDeliveryDate: $("input[name=importDeliveryDate]").val()
        };
        $.ajax({
            url: '/api/saps/workorder/EditConfig',
            data: JSON.stringify(value),
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            beforeSend: jQueryShowLoading(),//显示加载图标
            success: function (result) {
                jQuery('body').hideLoading();//隐藏加载图标
                if (result.status) {
                    $("#modal_drpz").modal("hide");
                }
            }
        })
    }
}

function jQueryShowLoading() {
    jQuery('body').showLoading();
    jQuery('#loading-indicator-undefined').css("top", 200);
}

 