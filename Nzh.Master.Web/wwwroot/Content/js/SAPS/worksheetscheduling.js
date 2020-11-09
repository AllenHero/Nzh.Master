var rows = 5;
var page = 1;
var rowsmain = 5;
var pagemain = 1;
//var workShopId = "";
var ParentOrganizeId = "";
var delWorkSheetNo = "";
var queryCustomerCombotree = CreateComboTree('queryCustomer');
var tableMain;
var table;
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

//组织名称
var queryParentOrganizeCombotree = DataOrganizeTree('queryParentOrganize');

$(function () {
    $("#id_btncollapse").click();
    $("#section1").css("display", "");
    //$("#section2").css("display", "");
    $("#section3").css("display", "none");
    $("#section4").css("display", "none");
    $('#mytable').SetEditable({
        columnsEd: "1",  //编辑第一和第二列     
        columnsAdd: true,
        $addButton: $('#add'),
        onEdit: function (value) {
            var UpdateStatus = value[0].cells[4].innerText;
            if (UpdateStatus + "" != "add") {
                value[0].cells[4].innerText = "update";
            }
            if (value[0].cells[1].innerHTML) {
                if (value[0].cells[1].innerHTML <= 0) {
                    toastr.error("工单数量必须大于0");
                    value[0].remove();
                    return false;
                }
            } else {
                value[0].remove();
            }
            
           // toastr.error(value[0].cells[0].innerText);
        },
        onBeforeEdit: function (value) {
            var planCount = document.getElementById("txtPlanCount").innerHTML;
            if (!planCount)
                return false;
            var count=0;
            for (var i = 0; i < value[0].parentElement.children.length; i++) {
                var cellValue = 0;
                if (worksheet.children[i].cells[1].children.length > 0) {
                    cellValue = worksheet.children[i].cells[1].children[1].value;
                    worksheet.children[i].cells[1].children[1].addEventListener("keyup", function () {
                        this.value = this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : '';
                    });
                    $(worksheet.children[i].cells[1].children[1]).change(function () {
                        PlanCountChange(worksheet.children[i]);
                    });
                }
                else
                    cellValue = worksheet.children[i].cells[1].innerHTML;
                if (cellValue) {
                    count += parseInt(cellValue);
                }
            }

            if (count > planCount)
                toastr.error("排产数量超出了计划量");

            //if (!value[0].cells[1].children[1].value) {
            //    value[0].cells[1].children[1].value = planCount-count;
            //    //value[0].cells[2].children[1].value = count;
            //    value[0].cells[2].innerHTML = count;
            //    //value[0].cells[3].children[1].value = 0;
            //    value[0].cells[3].innerHTML = 0;
            //} else {
            //    //value[0].cells[2].children[1].value = count;
            //    value[0].cells[2].innerHTML = count;
            //    //value[0].cells[3].children[1].value = planCount-count;
            //    value[0].cells[3].innerHTML = planCount - count;
            //}
        },
        onBeforeDelete: function (value) {
            var UpdateStatus = value[0].cells[4].innerText;
            if (UpdateStatus + "" != "add") {
                delWorkSheetNo += value[0].cells[0].innerText + ",";
            }
            //toastr.error(value[0].cells[6].innerText);
        }, //Called before deletion
        onDelete: function (value) {
            PlanCountChange("");
        }, //Called after deletion
        onAdd: function () {
            var planCount = document.getElementById("txtPlanCount").innerHTML;
            var worksheet = document.getElementById("worksheet");
            var orderNo = document.getElementById("txtOrderNo").innerHTML;
            var count = 0;
            var maxid = 0;
            for (var i = 0; i < worksheet.children.length; i++) {
                var worksheetNo = worksheet.children[i].cells[0].innerHTML;
                var cellValue = 0;
                if (worksheet.children[i].cells[1].children.length > 0)
                    cellValue = worksheet.children[i].cells[1].children[1].value;
                else
                    cellValue = worksheet.children[i].cells[1].innerHTML;
                if (cellValue) {
                    count += parseInt(cellValue);
                }
                if (!worksheet.children[i].cells[2].innerHTML) {
                    worksheet.children[i].cells[2].innerHTML = "新创建";
                    worksheet.children[i].cells[4].innerHTML = "add";
                }
                var idx = 0;
                worksheetNo ? worksheetNo == orderNo ? maxid = 0 : idx = parseInt(worksheetNo.substring(worksheetNo.length - 2)) : maxid = 0;
                if (idx > maxid)
                    maxid = idx++;
                else
                    maxid++;
            }
            var no = "0" + maxid;
            no = no.substring(no.length-2);
            worksheet.children[worksheet.children.length - 1].cells[0].innerHTML = orderNo + no;

            if (planCount == count) {
                toastr.error("继续排产将超出计划数量");
            }
            if (planCount < count) {
                toastr.error("排产数量已超出计划数量");
            }
        },     //Called when added a new row
        $addColButton: null, // Jquery object of "Add Column Button"
        onAddCol: function () {

        } // Called after adding new column
    });

    //GetWorkOrderMain();
    //GetWorkOrder();
    //GetWorkShop();
    GetCustomer();

    //table列初始化
    var columnsArrayMain = [
        { "data": 'OrderNo', "title": "生产制令号", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'PlanCount', "title": "生产制令计划量", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'DispatchCount', "title": "已排产数量", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'CompletedCount', "title": "已完工数量", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'DeliveryDate', "title": "交期", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionUploadTimeShort },
        { "data": 'Id', "title": "操作", "searchable": false, "width": "120px", "visible": true, "sortable": false, "render": functionSplitOrder}
    ];
    var columnsArray = [
        { "data": 'WorkSheetId', "title": "<input type='checkbox' name='allcheckbox' onClick='allcheckboxClick(this)' style='width:16px;height:16px;' />", "searchable": false, "width": "10px", "visible": true, "sortable": false, "render": functionWorkSheetId },
        { "data": 'OrderNo', "title": "生产制令号", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'WorkSheetNo', "title": "工单编号", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'Status', "title": "状态", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionStatus },
        { "data": 'Priority', "title": "优先级", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionPriority },
        { "data": 'ProductCode', "title": "产品代码", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionUploadText },
        { "data": 'ProductName', "title": "产品名称", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionUploadText },
        { "data": 'PlanCount', "title": "工单计划数量", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'DeliveryDate', "title": "交期", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionUploadTimeShort },
        { "data": 'StandardUph', "title": "标准UPH", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        //{ "data": 'OrganizeName', "title": "产线名称", "searchable": false, "width": "120px", "visible": true, "sortable": true},
        { "data": 'OrganizeName', "title": "组织名称", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'PlanStartDate', "title": "计划开工时间", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionUploadTime },
        { "data": 'PlanEndDate', "title": "计划完工时间", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionUploadTime },
        //{ "data": 'WorkShopId', "title": "车间代码", "searchable": false, "width": "120px", "visible": false, "sortable": true },
        //{ "data": 'WorkShopName', "title": "车间名称", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'ParentOrganizeCode', "title": "制令单组织编号", "searchable": false, "width": "120px", "visible": false, "sortable": true },
        { "data": 'ParentOrganizeName', "title": "制令单组织名称", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        //{ "data": 'OrganizeCode', "title": "工单组织编号", "searchable": false, "width": "120px", "visible": false, "sortable": true },
        //{ "data": 'OrganizeName', "title": "工单组织名称", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'CustomerName', "title": "客户名称", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionText },
        { "data": 'PlanPerson', "title": "计划员", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'Remark', "title": "备注", "searchable": false, "width": "120px", "visible": true, "sortable": false, "render": functionUploadText }
    ];

    var postMain = {
        "url": "/api/saps/WorkSheetScheduling/EditWorkSheetMainList",
        "type": "POST",
        "contentType": "application/json; charset=utf-8",
        "data": function (d) {
            var Status = "";
            var CreateDate = "";
            var OrderNo = "";
            if ($("select[name=status]").val() && $("select[name=status]").val().indexOf("==请选择==") < 0)
                Status = $("select[name=status]").val();
            if ($("input[name=mainOrderNo]").val().trim())
                OrderNo = $("input[name=mainOrderNo]").val().trim();
            if ($("input[name=mainCreateDate]").val().trim())
                CreateDate = $("input[name=mainCreateDate]").val().trim();

            d.OrderNo = OrderNo;
            d.CreateDate = CreateDate;
            d.Status = Status;
            return JSON.stringify(d);
        }
    };
    var post = {
        "url": "/api/saps/WorkSheetScheduling/EditWorkSheetList",
        "type": "POST",
        "contentType": "application/json; charset=utf-8",
        "data": function (d) {
            var ParentOrganizeId = "", customer = "", Priority = "", ProductName = "", OrderNo = "", PlanStartDate = "", Status = "";
            //if ($("select[name=WorkShop]").val() && $("select[name=WorkShop]").val().indexOf("==请选择==") < 0)
            //    workShop = $("select[name=WorkShop]").val();
            if (queryParentOrganizeCombotree.datas().length > 0)
                ParentOrganizeId = queryParentOrganizeCombotree.datas()[0].id;
            //if ($("select[name=Customer]").val() && $("select[name=Customer]").val().indexOf("==请选择==") < 0)
            //    customer = $("select[name=Customer]").val();
            if (queryCustomerCombotree.datas().length > 0)
                customer = queryCustomerCombotree.datas()[0].id;
            if ($("select[name=Priority]").val() && $("select[name=Priority]").val().indexOf("==请选择==") < 0)
                Priority = $("select[name=Priority]").val();
            if ($("input[name=ProductName]").val())
                ProductName = $("input[name=ProductName]").val();
            if ($("input[name=PlanStartDate]").val())
                PlanStartDate = $("input[name=PlanStartDate]").val();
            if ($("select[name=WorkSheetStatus]").val() && $("select[name=WorkSheetStatus]").val().indexOf("==请选择==") < 0)
                Status = $("select[name=WorkSheetStatus]").val();
            OrderNo = $("input[name=OrderNo]").val();

            d.OrderNo = OrderNo;
            //d.WorkShopId = workShop;
            d.ParentOrganizeId = ParentOrganizeId;
            d.CustomerId = customer;
            d.ProductName = ProductName;
            d.Priority = Priority;
            d.PlanStartDate = PlanStartDate;
            d.Status = Status;
            return JSON.stringify(d);
        }
    };
    var buttonMain = [
    ];
    var button = [
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
        }, {
            text: '<div id=\'id_btnorder\'><i class="font_ilean iconfont icon-zhankai1" style="font-size:14px;">隐藏生产制令单</i></div>',
            action: function (e, dt, node, config) {
                GetBtnText();
            }
        }
    ];

    if (schedulingbutton) {
        button.push({
            text: '<i class="font_ilean iconfont icon-jihua" style="font-size:14px;">排产</i>',
            action: function (e, dt, node, config) {
                var organize = "";
                var organizeresult = true;
                var uphresult = true;
                var workOrderList = $("input[type=checkbox]");
                $.each(workOrderList, function (index, item) {
                    if ($(item).is(":checked") && $(item).attr('data-ParentOrganizeId') + "" != "" && $(item).attr('data-ParentOrganizeId') + "" != "undefined") {
                        //toastr.error($(item).attr('value') + "");
                        if (organize == "") {
                            organize = $(item).attr('data-ParentOrganizeId') + "";
                        }
                        if (organize != $(item).attr('data-ParentOrganizeId') + "") {
                            organizeresult = false;
                        }
                        if ($(item).attr('data-StandardUph') + "" == "" || $(item).attr('data-StandardUph') + "" == "undefined" || $(item).attr('data-StandardUph') + "" == "null") {
                            uphresult = false;
                        }
                    }
                });
                if (organize == "") {
                    toastr.error("请选择需要排产的数据");
                    return false;
                }

                if (!organizeresult) {
                    toastr.error("请选择相同制令单组织的工单进行排产");
                    return false;
                }
                if (!uphresult) {
                    toastr.error("没有UPH的工单无法进行排产");
                    return false;
                }
                ParentOrganizeId = organize;
                GetOrganize(ParentOrganizeId);
                $("#section1").css("display", "none");
                $("#section3").css("display", "");
                $("#section4").css("display", "");
                GetNoScheduling();
                GetImageScheduling();
            }
        });
    }
    if (releasebutton) {
        button.push({
            text: '<i class="font_ilean iconfont icon-fasong" style="font-size:14px;">发布</i>',
            action: function (e, dt, node, config) {
                var right = true;
                var statusList = $("input[type=checkbox]");
                $.each(statusList, function (index, item) {
                    if ($(item).is(":checked") && $(item).attr('value') + "" != "on")
                        if ($(item).attr('data-Status') + "" == "0") {
                            toastr.error("新创建工单不能发布");
                            right = false;
                        }
                });
                if (right) {
                    var workOrderList = $("input[type=checkbox]");
                    var workOrders = "";
                    $.each(workOrderList, function (index, item) {
                        if ($(item).is(":checked") && $(item).attr('value') + "" != "on")
                            workOrders += $(item).attr('value') + "|" + $(item).attr('data-OrderNo') + ","
                    });
                    if (workOrders.length < 1) {
                        toastr.error("请选择需要发布的工单");
                        return false;
                    }

                    if (confirm("确认发布")) {
                        $.ajax({
                            url: '/api/saps/WorkSheetScheduling/EditRelease',
                            type: 'POST',
                            data: {
                                WorkSheetNo: workOrders
                            },
                            beforeSend: jQueryShowLoading(),//显示加载图标
                            success: function (value) {
                                jQuery('body').hideLoading();//隐藏加载图标
                                if (value.length > 0)
                                    toastr.error(value);
                                else {
                                    table.ajax.reload(null, true); // user paging is not reset on reload
                                    tableMain.ajax.reload(null, true); // user paging is not reset on reload
                                    //$.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
                                    //GetWorkOrderMain();
                                    //GetWorkOrder();
                                }
                            }
                        });
                    }
                }
            }
        });
    }
    if (deletebutton) {
        button.push({
            text: '<i class="font_ilean iconfont icon-shanchu" style="font-size:14px;">删除</i>',
            action: function (e, dt, node, config) {
                var workOrderList = $("input[type=checkbox]");
                var workOrders = "";
                $.each(workOrderList, function (index, item) {
                    if ($(item).is(":checked") && $(item).attr('value') + "" != "on")
                        workOrders += $(item).attr('value') + ","
                });

                if (confirm("确认删除")) {
                    $.ajax({
                        url: '/api/saps/WorkSheetScheduling/EditDel',
                        type: 'POST',
                        data: {
                            WorkSheetNo: workOrders
                        },
                        beforeSend: jQueryShowLoading(),//显示加载图标
                        success: function (value) {
                            jQuery('body').hideLoading();//隐藏加载图标
                            if (value.length > 0)
                                toastr.error(value);
                            else {
                                table.ajax.reload(null, true); // user paging is not reset on reload
                                //$.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
                            }
                        }
                    });
                }
            }
        });
    }
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
    var datatableSettingMain = {
        //"dom": 'Bfrtip',
        "bPaginate": true, //翻页功能
        "bLengthChange": false, //改变每页显示数据数量
        "pageLength": 4,
        colReorder: true,
        "processing": true,     //开启加载等待提示，提示信息是下面language中的sProcessing配置
        "serverSide": true,     //打开服务器模式
        "bDestroy": true,
        "scrollX": true,
        "ajax": postMain,
        "columns": columnsArrayMain,
        "dom": 'Brt<"bottom">ilp<"clear">',
        buttons: buttonMain,
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
        buttons: button,
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
    tableMain = $('#dataListMain').DataTable(datatableSettingMain);
    table = $('#dataList').DataTable(datatableSetting);
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
            "ajax": post,
            "columns": columnsArray,
            "dom": 'Brt<"bottom">ilp<"clear">',
            buttons: button,
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
    $("#btnFileQuery").click(function () {
        //var workShop = "";
        //if ($("select[name=WorkShop]").val() && $("select[name=WorkShop]").val().indexOf("==请选择==") < 0)
        //    workShop = $("select[name=WorkShop]").val();
        if (queryParentOrganizeCombotree.datas().length > 0)
            ParentOrganizeId = queryParentOrganizeCombotree.datas()[0].id;
        else
            ParentOrganizeId = "";
        //table.fnClearTable();//清空数据.fnClearTable();//清空数据
        //table.fnDestroy(); //还原初始化了的datatable
        table.ajax.reload(null, true); // user paging is not reset on reload
        //$.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
        //$('#dataList').DataTable(datatableSetting);
    });

    //显示隐藏生产制令
    $("button[name=showOrHideOrderNo]").click(function () {
        var hide = $("#collapse1-2").height();
        if (hide > 0) {
            this.innerHTML = "显示生产制令";
        } else {
            this.innerHTML = "隐藏生产制令";
        }
    });
    $("button[name=worksheetMain]").click(function () {
        tableMain.ajax.reload(null, true); // user paging is not reset on reload
    });

    $("#btnClear").click(function () {
        $("select[name=status]").val("");
        $("input[name=mainOrderNo]").val("");
        $("input[name=mainCreateDate]").val("");
    });

    $("div[name=findSubmit]").click(function () {
        page = 1;
        GetWorkOrder();
    });
    $("button[name=Submit]").click(function () {
        GetImageScheduling();
    });
    $("#findClear").click(function () {
        
        $("input[group=find]").val("");
        $("select[group=find]").val("");
        queryCustomerCombotree.clear();
        queryParentOrganizeCombotree.clear();

    });


    $("button[name=release]").click(function () {
        var right = true;
        var statusList = $("input[type=checkbox]");
        $.each(statusList, function (index, item) {
            if ($(item).is(":checked") && $(item).attr('value') + "" != "on")
                if ($(item).attr('data-Status') + "" == "0")
                {
                    toastr.error("新创建工单不能发布");
                    right = false;
                }
        });

        if (right) {
            var workOrderList = $("input[type=checkbox]");
            var workOrders = "";
            $.each(workOrderList, function (index, item) {
                if ($(item).is(":checked") && $(item).attr('value') + "" != "on")
                    workOrders += $(item).attr('value') + "|" + $(item).attr('data-OrderNo')+ ","
            });
            if (workOrders.length < 1) {
                toastr.error("请选择需要发布的工单");
                return false;
            }

            if (confirm("确认发布")) {
                $.ajax({
                    url: '/api/saps/WorkSheetScheduling/EditRelease',
                    type: 'POST',
                    data: {
                        WorkSheetNo: workOrders
                    },
                    beforeSend: jQueryShowLoading(),//显示加载图标
                    success: function (value) {
                        jQuery('body').hideLoading();//隐藏加载图标
                        if (value.length > 0)
                            toastr.error(value);
                        else {
                            GetWorkOrderMain();
                            GetWorkOrder();
                        }
                    }
                });
            }
        }
 
    });

    $("button[name=del]").click(function () {
        var workOrderList = $("input[type=checkbox]");
        var workOrders = "";
        $.each(workOrderList, function (index, item) {
            if ($(item).is(":checked") && $(item).attr('value') + "" != "on")
                workOrders += $(item).attr('value') + ","
        });

        if (confirm("确认删除")) {
            $.ajax({
                url: '/api/saps/WorkSheetScheduling/EditDel',
                type: 'POST',
                data: {
                    WorkSheetNo: workOrders
                },
                beforeSend: jQueryShowLoading(),//显示加载图标
                success: function (value) {
                    jQuery('body').hideLoading();//隐藏加载图标
                    if (value.length > 0)
                        toastr.error(value);
                    else {
                        GetWorkOrder();
                    }
                }
            });
        }
    });

    $("button[name=save]").click(function () {
        var check = true;
        var OrderNo = $("#txtOrderNo").html();
        var data = {
            OrderNo: OrderNo,
            delWorkSheetNo: delWorkSheetNo,
            updateWorkSheetNo: []
        };
        data.updateWorkSheetNo = TableToJson("mytable");
        $.each(data.updateWorkSheetNo, function (index, item) {
            if (!item.PlanCount.trim()) {
                check = false;
                toastr.error(item.WorkSheetNo + "工单计划量不能为空");
                return false;
            }
            if (item.PlanCount.trim()<=0) {
                check = false;
                toastr.error(item.WorkSheetNo + "工单计划量必须大于0");
                return false;
            }
        });
        if (check){
            $.ajax({
                url: '/api/saps/WorkSheetScheduling/EditSaveWorkSheet',
                type: 'Post',
                data: JSON.stringify(data),
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: jQueryShowLoading(),//显示加载图标
                success: function (value) {
                    jQuery('body').hideLoading();//隐藏加载图标
                    if (value.status) {
                        delWorkSheetNo = "";
                        table.ajax.reload(null, true); // user paging is not reset on reload
                        //$.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
                        //tableMain.ajax.reload(null, true); // user paging is not reset on reload
                        GetWorkOrderRight(OrderNo);
                        //GetWorkOrder();
                        $("#modal_cd").modal("hide");
                    } else {
                        toastr.error(value.message);
                    }
                }
            });
        }
    });

    $("select[name=Organize]").change(function () {
        pagemain = 1;
        GetWorkOrderMain();
    });
     
    //拆单事件
    $('#dataListMain tbody').on('click', 'div#EditRow', function () {
        var OrderNo = $(this).attr("value");
        var PlanCount = $(this).attr("data-PlanCount");
        $("#txtOrderNo").html(OrderNo);
        $("#txtPlanCount").html(PlanCount);

        $.ajax({
            url: '/api/saps/WorkSheetScheduling/GetWorkSheetAll?OrderNo=' + OrderNo,
            beforeSend: jQueryShowLoading(),//显示加载图标
            success: function (value) {
                jQuery('body').hideLoading();//隐藏加载图标
                $("#worksheet").html("");
                if (value.status) {
                    var order = [];
                    var count = 0;
                    $.each(value.rows, function (index, item) {
                        count += parseInt(item.PlanCount);
                        var row = {
                            WorkSheetNo: item.WorkSheetNo
                            , PlanCount: item.PlanCount, CompletedCount: item.CompletedCount
                            , PassQty: item.PassQty
                            , Status: item.Status
                            , HadPlanCount: count
                            , Remainder: PlanCount - count,
                        };
                        order.push(row);
                    });
                    if (!count)
                        count = 0;
                    document.getElementById("txtDispatch").innerHTML = count;
                    document.getElementById("txtSurplus").innerHTML = PlanCount - count;
                    $("#worksheet").html($("#tableworksheet").render(order));
                } else {
                    toastr.error(value.message);
                }
            }
        });

        $("#modal_cd").modal("show");
    });

    $("#dataListMain").on("click", "tr", function () {//给tr或者td添加click事件
        var data = tableMain.row(this).data();//获取值的对象数据
        GetWorkOrderRight(data.OrderNo);

        //var oObj = window.event.srcElement;
        ////toastr.error(change.tagName.toLowerCase());
        //if (oObj.tagName.toLowerCase() == "td") {
        //    var oTr = oObj.parentNode;
        //    for (var i = 1; i < document.all.tableMain.rows.length; i++) {
        //        document.all.tableMain.rows[i].style.backgroundColor = "";
        //        document.all.tableMain.rows[i].tag = false;
        //    }
        //    oTr.style.backgroundColor = "#d1e4ff";
        //    oTr.tag = true;
        //}
        //if (oTr != null) {
        //    var OrderNo = oTr.cells[0].innerText;
        //    GetWorkOrderRight(OrderNo);
        //}

    });

    //function changeState(el) {
    //    if (el.readOnly) el.checked = el.readOnly = false;
    //    else if (!el.checked) el.readOnly = el.indeterminate = true;
    //}


    $("#ReturnHome").click(function (event) {
        $("#section1").css("display", "");
        //$("#section2").css("display", "");
        $("#section3").css("display", "none");
        $("#section4").css("display", "none");
        $("#btnSelect").click();
        $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
    });

    $("button[name=schedulingSubmit]").click(function () {
        var data = {
            updateWorkSheetNo: []
        };
        data.updateWorkSheetNo = TableToJsonScheduling(); 
        $.ajax({
            url: '/api/saps/WorkSheetScheduling/EditSaveScheduling',
            type: 'Post',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json',
            beforeSend: jQueryShowLoading(),//显示加载图标
            success: function (value) {
                jQuery('body').hideLoading();//隐藏加载图标
                if (value.status) {
                    GetImageScheduling();
                    tableMain.ajax.reload(null, true); // user paging is not reset on reload
                    table.ajax.reload(null, true); // user paging is not reset on reload
                    //$.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
                    toastr.success("排产成功");
                } else {
                    toastr.error(value.message);
                }
            }
        });

        return false;
    }); 

})

function PlanCountChange(value) {
    var planCount = document.getElementById("txtPlanCount").innerHTML;
    var worksheet = document.getElementById("worksheet");
    var count = 0;
    for (var i = 0; i < worksheet.children.length; i++) {
        var cellValue = 0;
        if (worksheet.children[i].cells[1].children.length > 0) {
            cellValue = worksheet.children[i].cells[1].children[1].value;
            if (parseInt(cellValue)>0) {
                count += parseInt(cellValue);
            } else {
                toastr.error("工单数量必须大于0");
            }
            ////worksheet.children[i].cells[2].children[1].value = count;
            ////worksheet.children[i].cells[3].children[1].value = planCount-count;
            //worksheet.children[i].cells[2].innerHTML = count;
            //worksheet.children[i].cells[3].innerHTML = planCount - count;
        }
        else {
            cellValue = worksheet.children[i].cells[1].innerHTML;
            if (cellValue) {
                count += parseInt(cellValue);
            }

            ////worksheet.children[i].cells[2].innerHTML = count;
            ////worksheet.children[i].cells[3].innerHTML = planCount - count;
            //worksheet.children[i].cells[2].innerHTML = count;
            //worksheet.children[i].cells[3].innerHTML = planCount - count;
        }
    }
    if (planCount < count) {
        toastr.error("排产数量超出了计划量");
    }
    document.getElementById("txtDispatch").innerHTML = count;
    document.getElementById("txtSurplus").innerHTML = planCount - count;
}

function SaveScheduling()
{
    var WorkSheetNo = $('input:radio:checked').val();
    var ProductTime = $('input:radio:checked').attr("data_ProductTime");
    var StartDate = $("#id_starttime").val();
    var OrganizeId = $("select[name=Organize]").val();
    var OrganizeCode = $("#" + $("select[name=Organize]").val()).attr("code");
    var OrganizeName = $("#" + $("select[name=Organize]").val()).attr("name");
    if (StartDate.length < 1) {
        toastr.error("请选择开始时间");
        return;
    }
    $.ajax({
        url: '/api/saps/WorkSheetScheduling/EditScheduling',
        type: 'POST',
        data: {
            WorkSheetNo: WorkSheetNo,
            ProductTime: ProductTime,
            StartDate: StartDate,
            OrganizeId: OrganizeId,
            OrganizeCode: OrganizeCode,
            OrganizeName: OrganizeName
        },
        beforeSend: jQueryShowLoading(),//显示加载图标
        success: function (value) {
            jQuery('body').hideLoading();//隐藏加载图标
            if (value.length > 0)
                toastr.error(value);
            else {
                GetNoScheduling();
                GetImageScheduling();
            }
        }
    });
}

function GetWorkOrderRight(OrderNo) {
    $.ajax({
        url: '/api/saps/WorkSheetScheduling/GetWorkSheetAll?OrderNo=' + OrderNo,
        beforeSend: jQueryShowLoading(),//显示加载图标
        success: function (value) {
            jQuery('body').hideLoading();//隐藏加载图标
            $("#workorderright").html("");
            if (value.status) {
                var order = [];
                $.each(value.rows, function (index, item) {
                    var row = {
                        WorkSheetNo: item.WorkSheetNo
                        , PlanCount: item.PlanCount
                    };
                    order.push(row);
                });
                $("#workorderright").html($("#template-table-right").render(order));
            } else {
                toastr.error(value.message);
            }
        }
    });
}



function GetBtnText() {
    var hide = $("#collapse1-2").height();
    $("#id_btncollapse").click();
    if (hide > 0) {
        $("#id_btnorder").html("显示生产制令");
        $("#id_btnorder").attr("class", "font_ilean iconfont icon-zhankai1");
        $("#id_btnorder").css("font-size", "14px");
    } else {
        $("#id_btnorder").html("隐藏生产制令");
        $("#id_btnorder").attr("class", "font_ilean iconfont icon-shouqi1");
        $("#id_btnorder").css("font-size", "14px");
    }
}

function GetNoScheduling() {
    $("#id_noscheduling").html("");
    var workOrderList = $("input[type=checkbox]");
    var workOrders = "";
    $.each(workOrderList, function (index, item) {
        if ($(item).is(":checked") && $(item).attr('value') + "" != "on") {
            workOrders += $(item).attr('value') + ","
        }
    });
    $.ajax({
        url: '/api/saps/WorkSheetScheduling/GetNoScheduling?WorkSheetNo=' + workOrders + '&ParentOrganizeId=' + ParentOrganizeId,
        success: function (value) {
            $("#id_noscheduling").html(value);
            GetOrganize(ParentOrganizeId);
            $("div[name=datetimepicker]").datetimepicker().on("hide", function (ev) {
                var index = $(this).children("input").attr("data-index");
                var OrganizeId = $("#Organize" + index).val();
                var OrganizeName = $("#" + $("#Organize" + index).val()).attr("name");
                var PlanStartDate = $("#id_starttime" + index).val();
                var tb = document.getElementById("id_table");    //获取table对像
                var rows = tb.rows;
                var cells = rows[index].cells;
                var WorkSheetNo = cells[3].innerHTML;
                var ProductTime = cells[8].innerHTML;
                var date = new Date(new Date(PlanStartDate).setMinutes(new Date(PlanStartDate).getMinutes() + 10));
                if (new Date() > date) {
                    cells[2].innerHTML = "";
                    toastr.error("排产时间必须大于当前时间");
                    return false;
                }
                $.ajax({
                    url: '/api/saps/WorkSheetScheduling/GetScheduling?WorkSheetNo=' + WorkSheetNo + '&OrganizeId=' + OrganizeId + '&PlanStartDate=' + PlanStartDate + '&ProductTime=' + ProductTime,
                    success: function (value) {
                        if (value == "")
                            toastr.error("计算工单结束时间失败，请检查班次");
                        else
                            cells[2].innerHTML = value;
                    }
                });
            });
            //$("input[name=datetime]").on("change", function () {
            //    toastr.error(1);
            //});
            $.each($("input[name=datetime]"), function (index, item) {
                var PlanStartDate = $(item).attr('data-PlanStartDate');
                $(item).attr("value", PlanStartDate);
            });
        }
    });


}

//获取图形数据
function GetImageScheduling() {
    var workOrderList = $("input[type=checkbox]");
    var workOrders = "";
    $.each(workOrderList, function (index, item) {
        if ($(item).is(":checked") && $(item).attr('value') + "" != "on")
            workOrders += $(item).attr('value') + ","
    });
    $.ajax({
        url: '/api/saps/WorkSheetScheduling/GetImageScheduling?ParentOrganizeId=' + ParentOrganizeId + '&workOrders=' + workOrders,
        beforeSend: jQueryShowLoading(),//显示加载图标
        success: function (value) {
            jQuery('body').hideLoading();//隐藏加载图标
            data1.splice(0, data1.length);
            data2.splice(0, data2.length);
            if (value != null) {
                for (var i = 0; i < value.data1.length; i++) {
                    var row1 = [];
                    row1.push(value.data1[i].NO + 1);
                    row1.push(value.data1[i].OrganizeName);
                    row1.push(true);
                    data1.push(row1);
                }

                for (var i = 0; i < value.data3.length; i++) {
                    var row3 = [];
                    row3.push(value.data3[i].NO);
                    row3.push(new Date(value.data3[i].strStartTime).getTime());
                    row3.push(new Date(value.data3[i].strEndTime).getTime());
                    row3.push("");
                    row3.push("休息");
                    row3.push("CS");
                    row3.push("CS");
                    row3.push("XGF-HAC");
                    row3.push("HAC-SIY");
                    row3.push(new Date(value.data3[i].strEndTime).getTime());
                    data2.push(row3);
                }

                for (var i = 0; i < value.data2.length; i++) {
                    var row2 = [];
                    row2.push(value.data2[i].NO);
                    row2.push(new Date(value.data2[i].PlanStartDate).getTime());
                    row2.push(new Date(value.data2[i].PlanEndDate).getTime());
                    row2.push(value.data2[i].WorkSheetNo);
                    row2.push("计划数量:" + value.data2[i].PlanCount);
                    row2.push(value.data2[i].Status);
                    row2.push(value.data2[i].PlanCount);
                    row2.push(value.data2[i].StandardUph);
                    row2.push("HAC-SIY");
                    row2.push(new Date(value.data2[i].PlanEndDate).getTime());
                    data2.push(row2);
                }

            }

            myChart = echarts.init(document.getElementById('main-pc'));
            _rawData = rawData;
            addIndividualColours(_rawData);
            myChart.setOption(option = makeOption());
            initDrag();
            myChart.setOption(option);
        }
    });

}

//function GetWorkShop() {
//    $.ajax({
//        url: '/api/sys/workshop?TenantId=' + TenantId,
//        success: function (value) {
//            if (value.total > 0) {
//                var option = [{ Id: '', Code: '', Name: '==请选择==' }];
//                $.each(value.rows, function (index, item) {
//                    var row = { Id: item.WorkShopId, Code: item.WorkShopCode, Name: item.WorkShopName };
//                    option.push(row);
//                })
//                $('select[name=WorkShop]').html($("#template-option").render(option));
//            }
//        }
//    })
//}

function GetCustomer() {
    $.ajax({
        url: '/api/sys/customer?TenantId=' + TenantId,
        success: function (value) {
            if (value.total > 0) {
                var DefaultName = "客户名称";
                var DefaultId = "";
                var Defaults = [];
                var Customers = [];
                $.each(value.rows, function (index, item) {
                    var Customer = { "id": item.CustomerId, "title": item.CustomerName};
                    Customers.push(Customer);
                })
                var Default = { "id": DefaultId, "title": DefaultName, "subs": Customers  };
                Defaults.push(Default);

                queryCustomerCombotree.setData(Defaults);
                //$("#queryCustomer").children(".drop-down-wrap").css("position", "fixed");
            }
        }
    })
}



//function GetWorkOrganize() {
//    $.ajax({
//        url: '/api/sys/Organize?TenantId=' + TenantId + '&WorkShopId=' + workShopId,
//        success: function (value) {
//            if (value.total > 0) {
//                var option = [];
//                $.each(value.rows, function (index, item) {
//                    var row = { Id: item.OrganizeId, Code: item.OrganizeCode, Name: item.OrganizeName };
//                    option.push(row);
//                })
//                $('select[name=Organize]').html($("#template-option").render(option));
//            }
//        }
//    })
//}

function GetOrganize(OrganizeId) {
    $.ajax({
        url: '/api/saps/WorkSheetScheduling/GetOrganizeLeafNode?OrganizeId=' + OrganizeId,
        success: function (value) {
            //if (value.total > 0) {
                var option = [{ Id: '', Code: '', Name: '==请选择==' }];
                $.each(value, function (index, item) {
                    var row = { Id: item.OrganizeId, Code: item.OrganizeCode, Name: item.OrganizeName };
                    option.push(row);
                })
                $('select[name=Organize]').html($("#template-option").render(option));

                $.each($("select[name=Organize]"), function (index, item) {
                    var OrganizeId = $(item).attr('data-OrganizeId');
                    var id = $(item).attr('id');
                    $("#" + id).val(OrganizeId);
                });
            //}
        }
    })
}


function Organizechange(index) {
    var OrganizeId = $("#Organize" + index).val();
    var OrganizeName = $("#" + $("#Organize" + index).val()).attr("code");
    var PlanStartDate = $("#id_starttime" + index).val();
    var tb = document.getElementById("id_table");    //获取table对像
    var rows = tb.rows;
    var cells = rows[index].cells;
    var WorkSheetNo = cells[3].innerHTML;
    var ProductTime = cells[8].innerHTML;
    $.ajax({
        url: '/api/saps/WorkSheetScheduling/GetScheduling?WorkSheetNo=' + WorkSheetNo + '&OrganizeId=' + OrganizeId + '&PlanStartDate=' + PlanStartDate + '&ProductTime=' + ProductTime,
        success: function (value) {
            cells[2].innerHTML = value;
        }
    });

}

function timechange(index) {
    var OrganizeId = $("#Organize" + index).val();
    var OrganizeName = $("#" + $("#Organize" + index).val()).attr("code");
    var PlanStartDate = $("#id_starttime" + index).val();
    var tb = document.getElementById("id_table");    //获取table对像
    var rows = tb.rows;
    var cells = rows[index].cells;
    var WorkSheetNo = cells[3].innerHTML;
    var ProductTime = cells[8].innerHTML;

    var date = new Date(new Date(PlanStartDate).setMinutes(new Date(PlanStartDate).getMinutes() + 10));
    if (new Date() > date) {
        cells[2].innerHTML = "";
        toastr.error("排产时间必须大于当前时间");
        return false;
    }
    $.ajax({
        url: '/api/saps/WorkSheetScheduling/GetScheduling?WorkSheetNo=' + WorkSheetNo + '&OrganizeId=' + OrganizeId + '&PlanStartDate=' + PlanStartDate + '&ProductTime=' + ProductTime,
        success: function (value) {
            cells[2].innerHTML = value;
        }
    });
}

function jQueryShowLoading() {
    jQuery('body').showLoading();
    jQuery('#loading-indicator-undefined').css("top", 200);
}


function TableToJson(tableid) {
    var txt = "[";
    var table = document.getElementById(tableid);
    var row = table.getElementsByTagName("tr");
    var col = row[0].getElementsByTagName("th");

    for (var j = 1; j < row.length; j++) {
        var r = "{";
        for (var i = 0; i < 7; i++) {
            var tds = row[j].getElementsByTagName("td");
            if (i==0)
                r += "\"WorkSheetNo\"\:\"" + tds[i].innerHTML + "\",";
            if (i == 1)
                r += "\"PlanCount\"\:\"" + tds[i].innerHTML + "\",";
            if (i == 4)
                r += "\"Status\"\:\"" + tds[i].innerHTML + "\",";
        }
        r = r.substring(0, r.length - 1)
        r += "},";
        txt += r;
    }
    if (txt.length>1)
        txt = txt.substring(0, txt.length - 1);
    txt += "]";
    return JSON.parse(txt);
}

function TableToJsonScheduling() {
    var tb = document.getElementById("id_table");    //获取table对像
    var rows = tb.rows;
    var txt = "[";
    for (var i = 1; i < rows.length; i++) {    //--循环所有的行
        var r = "{";
        var cells = rows[i].cells;　　// cells 集合返回表格中所有 <td> 或 <th> 元素。
        for (var j = 0; j < cells.length; j++) {   //--循环所有的列，从第一列取数据，因为一般第一列都是标识，数据毫无意义。
            //var value = cells[j].childNodes[0].value;//取有input框的数据
            var value = "";
            if (j == 0) {
                r += "\"OrganizeId\"\:\"" + $("#Organize" + i).val() + "\",";
                r += "\"OrganizeCode\"\:\"" + $("#" + $("#Organize" + i).val()).attr("code") + "\",";
                r += "\"OrganizeName\"\:\"" + $("#" + $("#Organize" + i).val()).attr("name") + "\",";
            }
            else if (j == 1)
                r += "\"PlanStartDate\"\:\"" + $("#id_starttime" + i).val() + "\",";
            else if (j == 2)
                r += "\"PlanEndDate\"\:\"" + cells[j].innerHTML + "\",";
            else if (j == 3)
                r += "\"WorkSheetNo\"\:\"" + cells[j].innerHTML + "\",";
        }
        r = r.substring(0, r.length - 1)
        r += "},";
        txt += r;
    }
    if (txt.length > 1)
        txt = txt.substring(0, txt.length - 1);
    txt += "]";
    return JSON.parse(txt);

}

function allcheckboxClick(allcheckbox) {

    if ($(allcheckbox).is(":checked")) {
        $("#dataList input[type=checkbox]").attr("checked", true);
    } else {
        $("#dataList input[type=checkbox]").attr("checked", false);
    }
}

function functionWorkSheetId(data, type, item, meta) {
    var val = "";
    val += ' <div style="text-align:center;"> <input type="checkbox" style="width:16px;height:16px;" value="' + item.WorkSheetNo + '" data-Status="' + item.Status + '" data-OrderNo="' + item.OrderNo + '" data-ParentOrganizeId="' + item.ParentOrganizeId + '" data-StandardUph="' + item.StandardUph + '"/></div>';
    return val;
}
function functionUploadTime(data, type, full, meta) {
    if (data != null)
        return moment(data).format("YYYY-MM-DD HH:mm:ss");
    else
        return "";
}
function functionUploadTimeShort(data, type, full, meta) {
    if (data != null)
        return moment(data).format("YYYY-MM-DD");
    else
        return "";
}
function functionUploadText(data, type, item, meta) {
    if (data != null && data.length > 20) {
        data = data.substring(0, 20) + "...";
    }
    return data;
}
function functionText(data, type, item, meta) {
    if (data == null || data == "undefined") {
        data = "";
    }
    return data;
}

function functionSplitOrder(data, type, item, meta) {
    var val = "";
    if (splitorderbutton) {
        val += '<div id="EditRow" class="btn btn-primary" data-toggle=\'modal\' name="Splitbtn" type="text" value="' + item.OrderNo + '" data-PlanCount="' + item.PlanCount + '"><i class="font_ilean iconfont icon-luru2"></i>拆单</div>';
    }
    return val;
}

function functionStatus(data, type, item, meta) {
    if (data == 0) {
        data = "未排产";
    } else {
        data = "排产中"; 
    }
    return data;
}

function functionPriority(data, type, item, meta) {
    if (data == 0) {
        data = "普通";
    } else if (data == 1) {
        data = "优先";
    } else {
        data = "紧急";
    }
    return data;
}

//根据字符串转换为函数
function returnFunctionName(name) {
    switch (name) {
        case 'functionWorkSheetId':
            return functionWorkSheetId
        case 'functionUploadTime':
            return functionUploadTime
        case 'functionUploadTimeShort':
            return functionUploadTimeShort
        case 'functionUploadText':
            return functionUploadText
        case 'functionSplitOrder':
            return functionSplitOrder
        case 'functionStatus':
            return functionStatus
        case 'functionPriority':
            return functionPriority
        case 'functionText':
            return functionText
    }
}


function paging(total) {
    var totalpage = Math.ceil(total / rows);
    var pagefoot = "<li><a href='#' onclick='switchdownpage()'>«</a></li>";
    var startpage = page > 5 ? page - 5 : 1;
    var highpage = totalpage > 5 ? (5 + startpage) : totalpage;
    for (var i = startpage-1; i < highpage; i++) {
        pagefoot += "<li><a href='#' name='"+(i+1)+"' onclick='pagejump(" + (i + 1) + ")'>" + (i + 1) + "</a></li>"
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
            GetWorkOrder();
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


function pagingmain(total) {
    var totalpage = Math.ceil(total / rowsmain);
    var pagefoot = "<li><a href='#' onclick='switchdownpagemain()'>«</a></li>";
    var startpage = pagemain > 5 ? pagemain - 5 : 1;
    var highpage = totalpage > 5 ? (5 + startpage) : totalpage;
    for (var i = startpage - 1; i < highpage; i++) {
        pagefoot += "<li><a href='#' name='" + (i + 1) + "' onclick='pagejumpmain(" + (i + 1) + ")'>" + (i + 1) + "</a></li>"
    }
    if (totalpage > 5) {
        pagefoot += "<li><a href='#' onclick='pagejumpmain(0)'>…</a></li>";
        pagefoot += "<li><a href='#' onclick='pagejumpmain(" + totalpage + ")'>" + totalpage + "</a></li>";
        pagefoot += "<li><input id='pagejumpmain' /><button onclick='pagejumpmain(0)'>跳转</button></li>";
    }
    pagefoot += "<li><a href='#' onclick='switchuppagemain(" + totalpage + ")'>»</a></li>";
    $("#pagefootmain").html(pagefoot);
    $("#pagejumpmain").keyup(function (event) {
        if (event.keyCode == 13) {
            page = $("#pagejumpmain").val();
            GetWorkOrderMain();
        }
    });
    $("a[name=" + pagemain + "]").css("background-color", "#409eff");
    $("a[name=" + pagemain + "]").css("color", "#fff");
}

function pagejumpmain(value) {
    if (value == 0)
        pagemain = $("#pagejumpmain").val();
    else
        pagemain = value;
    GetWorkOrderMain();
}

function switchdownpagemain() {
    if (pagemain > 1)
        pagemain--;

    GetWorkOrderMain();
}

function switchuppagemain(totalpage) {
    if (pagemain < totalpage)
        pagemain++;
    GetWorkOrderMain();
}



