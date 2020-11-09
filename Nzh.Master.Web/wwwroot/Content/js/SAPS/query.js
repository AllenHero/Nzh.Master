var workplace = JSON.parse(getCookie("workplace"));
var focus = "";
var userlist;
var finduser = "";
var param = {
     PlanStartDate: '', StartTime: '', WorkSheetNo: '', ProductCode: '', ProductName: ''
    , Customer: '', WorkShop: '', LineId: '', Status: '', Current: '', Overdue: false
};

var queryOrganizeCombotree = DataOrganizeTree('queryOrganize');

//function CreateComboTree(id) {
//    if (id) return $('#' + id).comboTree({
//        source: [],
//        isMultiple: false,
//        isFirstClassSelectable: false, //第一级是否可选
//        cascadeSelect: true,
//        selectedlength: 3,
//        url: '',
//        method: 'get'//最多可选
//    });
//}

$(function () {
    $("button[data-dismiss]").click(function () {
        var cancel = $(this).attr("name");
        if (cancel == "cancel") {
            var parent = $(this).parents(".modal");
            $(parent).find("input").val("");
            $(parent).find(".user").html("");
        }
        $(".modal-backdrop").click();
        return false;
    });
    //初始化日期控件
    $("#PlanStartDate").daterangepicker({
        format: "YYYY-MM-DD"
    }, function (start, end) {
        $("input[name=PlanStartDate]").val(start.format("YYYY-MM-DD") + " 到 " + end.format("YYYY-MM-DD"));
        $("input[name=StartTime]").val("");
        $("button[group=current]").removeClass("btn-active");
        param.Current = "";
    });

    $("#StartTime").daterangepicker({
        format: "YYYY-MM-DD"
    }, function (start, end) {
        $("input[name=StartTime]").val(start.format("YYYY-MM-DD") + " 到 " + end.format("YYYY-MM-DD"));
        $("input[name=PlanStartDate]").val("");
        $("button[group=current]").removeClass("btn-active");
        param.Current = "";
    });

    //GetOrganize();

    //加载数据源
    GetUser();
    //GetOverdueWorkOrder();
    //GetWorkLine();
     
    $("tr").click(function () {
        rowItem = JSON.parse($(this).attr("row"));
    });
    //清空查询条件
    $("button[name=clear]").click(function () {
        $("input[group=find]").val("");
        $("select[group=find]").val("");
        queryOrganizeCombotree.clear();
        return false;
    });

   

    $("button[group=current]").click(function () {
        var current = this.name;
        param.Current = current;
        $("button[group=current]").removeClass("btn-active");
        $(this).addClass("btn-active");

        $("input[name=PlanStartDate]").val("");
        $("input[name=StartTime]").val("");
        return false;
    });

    $("button[name=overdue]").click(function () {
        if (param.Overdue) {
            $(this).removeClass("btn-primary");
            param.Overdue = false;
        }
        else {
            $(this).addClass("btn-primary");
            param.Overdue = true;
        }
        return false;
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

    //操作事件
    $("button[name=submit]").click(function () {
        UrgeWorkOrder($(this).val());
        return false;
    });
    $("input").click(function () {
        switch ($(this).attr("name")) {
            case "CCUser": focus = $("CCUser"); break;
            case "Handler": focus = $("Handler"); break;
        }
    });
    $("input[name=Handler]").click(function () {
        focus = $("#Handler"); 
        var self = this;
        $("#modal-cui").unbind().click(function () {
            if ($(".userlist").length) {
                $(".userlist").remove();
            }
            else {
                if (document.activeElement == self) {
                    $(self).after('<div class="userlist row-fluid" style="height:100px;"><ul id="UserList"  style="height:200px;"></ul></div>');

                    FindUser(UserSelectSplit(self));
                }
            }
        });
    });
    $("input[name=CCUser]").click(function () {
        focus = $("#CCUser");
        var self = this;
        $("#modal-cui").unbind().click(function () {
            if ($(".userlist").length) {
                $(".userlist").remove();
            }
            else {
                if (document.activeElement == self) {
                    $(self).after('<div class="userlist row-fluid" style="height:100px;"><ul id="UserList"  style="height:200px;"></ul></div>');

                    FindUser(UserSelectSplit(self));
                }
            }
        });
    });

    //查找人
    $("#findUser").click(function () {
        FindUser();
    });
    $("input[group=selectUser]").keydown(function (e) {
        UserOperation(this, e.keyCode);
    });
    $("input[group=selectUser]").keyup(function (e) {
        var user = UserSelectSplit(this);
        FindUser(user);
        $(".userlist").show();
    });
    $("input[group=selectUser]").dblclick(function (e) {
        deleteUser(this);
        $(".userlist").hide();
    });
    $("#urgedate").val(moments().format("YYYY-MM-DD HH:mm:ss"));
    $("#inputText1").change(function () {
        var max = $("button[name=submit]").attr("qty");
        var value = parseInt(this.value);
        if (value > 0) {
            if (value > max)
                this.value = max;
        }
    }); 
    //table列初始化
    var columnsArray = [
        { "data": 'Index', "title": "序号", "searchable": false, "width": "100px", "visible": true, "sortable": true },
        { "data": 'WorkSheetId', "title": "操作", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionWorkSheetId },
        { "data": 'OrderNo', "title": "生产制令单号", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'CompletedQty', "title": "生产制令单完成数量", "searchable": false, "width": "120px", "visible": true, "sortable": true},
        { "data": 'PassQty', "title": "生产制令单良品数量", "searchable": false, "width": "120px", "visible": true, "sortable": true},
        { "data": 'WorkSheetNo', "title": "工单编号", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionWorkSheetNo },
        { "data": 'Status', "title": "工单状态", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionStatus },

        { "data": 'Remark', "title": "生产进度", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionRemark },
        { "data": 'PlanCount', "title": "计划数量", "searchable": false, "width": "120px", "visible": true, "sortable": true },

        { "data": 'CompletedCount', "title": "报工数量", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'RestCount', "title": "剩余数量", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionRestCount },
        { "data": 'PlanStartDate', "title": "计划开工时间", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionPlanStartDate },
        { "data": 'PlanEndDate', "title": "计划完工时间", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionPlanEndDate },
        { "data": 'StartTime', "title": "实际开工时间", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionStartTime  },
        { "data": 'EndTime', "title": "实际完工时间", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionEndTime },
        { "data": 'ProductCode', "title": "产品代码", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'ProductName', "title": "产品名称", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionProductName},
        { "data": 'OrganizeName', "title": "组织名称", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        //{ "data": 'LineName', "title": "产线名称", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'CustomerName', "title": "客户名称", "searchable": false, "width": "120px", "visible": true, "sortable": true},

    ];

    var post = {
        "url": "/api/saps/workorder/EditOverdueWorkOrderPageList",
        "type": "POST",
        "contentType": "application/json; charset=utf-8",
        "data": function (d) {
            //var parameter = "?sort=" + param.sort + "&order=" + param.order + "&rows=" + rows + "&page=" + page + "&Current=" + param.Current + "&Overdue=" + param.Overdue;
            d.Current = param.Current;
            d.Overdue = param.Overdue;
            var planStartDate = $("input[name=PlanStartDate]").val();
            if (planStartDate)
                d.PlanStartDate = planStartDate;
            else
                d.PlanStartDate = ""; 
            var startTime = $("input[name=StartTime]").val();
            if (startTime)
                d.StartTime = startTime;
            else
                d.StartTime = ""; 
            var workOrder = $("input[name=WorkOrder]").val();
            if (workOrder)
                d.WorkSheetNo = workOrder;
            else
                d.WorkSheetNo = "";

            var productCode = $("input[name=ProductCode]").val();
            if (productCode)
                d.ProductCode = productCode
            else
                d.ProductCode = "";

            var OrderNo = $("input[name=OrderNo]").val();
            if (OrderNo)
                d.OrderNo = OrderNo
            else
                d.OrderNo = "";
            

            var productName = $("input[name=ProductName]").val();
            if (productName)
                d.ProductName = productName;
            else
                d.ProductName = "";
           

            var customer = $("input[name=Customer]").val();
            if (customer)
                d.Customer = customer;
            else
                d.Customer = "";
            

            //var workShop = $("select[name=WorkShop]").val();
            //if (workShop && workShop.indexOf("==请选择==") < 0)
            //    d.WorkShop = workShop;
            //else
            //    d.WorkShop = "";
           

            //var line = $("select[name=Line]").val();
            //if (line && line.indexOf("==请选择==") < 0)
            //    d.LineId = line;
            //else
            //    d.LineId = "";

            var OrganizeId = "";
            if (queryOrganizeCombotree.datas().length > 0) {
                OrganizeId = queryOrganizeCombotree.datas()[0].id;
            }
            d.OrganizeId = OrganizeId;

            var status = $("select[name=Status]").val();
            if (status && status.indexOf("==请选择==") < 0)
                d.Status = status;
            else
                d.Status = "";
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

    $("#btnSelect").click(function () {
        if ($("#ResponseUser").val())
            UserId = $("#ResponseUser").val();
        else
            UserId = "";

        if ($("#CallTime").val())
            CallTime = $("#CallTime").val();
        else
            CallTime = "";
        table.ajax.reload(null, true); // user paging is not reset on reload
        return false;
    });

    //发起催单
    function UrgeWorkOrder(wo) {
        var quantity = $("#inputText1").val();
        var LineId = $("#inputLineId").val();
        var urgedate = $("#urgedate").val();
        var handler = "";
        var CCUser = "";
        $.each($("#CCUser li"), function (index, item) {
            CCUser += item.id + ',';
        })
        CCUser = CCUser.trim(',');
        $.each($("#Handler li"), function (index, item) {
            handler += item.id + ',';
        })
        handler = handler.trim(',');

        if (!handler || !quantity || !urgedate) {
            toastr.warning("信息填写不完整！");
            return false;
        }

        var params = JSON.stringify({
            WorkOrder: wo, Quantity: quantity, UrgeDate: urgedate, Handler: handler, CCUser: CCUser, LineId: LineId
            , TenantId: "", UrgeUser: "", Describe: $("textarea[name=Describe]").val()
        });
        $.ajax({
            type: 'post',
            url: '/api/saps/workorder/EditUrgeInsert',//'/api/SAPS/UrgeRecord/EditInsert',
            data: params,
            dataType: 'json',
            contentType: 'application/json',
            beforeSend: jQueryShowLoading(),//显示加载图标
            success: function (value) {
                jQuery('body').hideLoading();//隐藏加载图标
                if (value.status) {
                    $("#modal-cui").modal("hide");
                    $(".user").html("");
                    $("input[group=selectUser]").val("");
                    UserList();
                    //刷新列表
                    table.ajax.reload(null, true); // user paging is not reset on reload
                } else {
                    alert("系统忙，请联系系统管理员或稍后再试！" + value.message);
                }
            }
        });
    }
});
//列自定义显示格式



function functionStatus(data, type, item, meta) {
    var state = "";
    switch (item.Status) {
        case 0: state = '<div class="label label-unproduct">新创建'; break;
        case 1: state = '<div class="label label-paicing">排产中'; break;
        case 2: state = '<div class="label label-paiced">已排产'; break;
        case 5: state = '<div class="label label-producting">生产中'; break;
        case 10: state = '<div class="label label-producted">已完成'; break;
        case 12: state = '<div class="label label-productout">已关闭'; break;
        case 15: state = '<div class="label label-productSuspend">已暂停'; break;
    }
    return state;
}
function functionRemark(data, type, item, meta) {
    var monitor = 0;
    if (item.CompletedCount > 0)
        monitor = (item.CompletedCount * 100.0 / item.PlanCount).toFixed(1);
    return "<div class='progress progress-small' style=\"background-color:#cac3c3;top:10px;position:relative;\">"+
        "<div class='bar bar-success' style='background:#289eff;width:" + monitor + "%'>" + monitor +"%</div>"+
           " </div>";
}
function functionRestCount(data, type, item, meta) {
    return item.PlanCount - (item.CompletedCount ? item.CompletedCount : 0);
}
function functionPlanStartDate(data, type, item, meta) {
    if (!item.PlanStartDate) {
        return "";
    }
    var val = "";
    var delayTime = 0;
    var delayUnit = "";
    var delayColor = true;
    var diff = 0;
    //滞后时间
    if (item.StartTime) {
        diff = moments(item.StartTime).diff(item.PlanStartDate, "minutes");
    } else {
        diff = moments().diff(item.PlanStartDate, "minutes");
    }
    if (diff > 0) {
        if (diff <= 120)
            delayColor = true;
        else
            delayColor = false;
        if (diff < 60) {
            delayTime = diff;
            delayUnit = "min";
        } else if (diff < 1440) {
            delayTime = (diff * 1.0 / 60).toFixed(1);
            delayUnit = "H";
        } else {
            delayTime = (diff * 1.0 / 1440).toFixed(1);
            delayUnit = "D";
        }
    }
    var val = moments(item.PlanStartDate).format("YYYY-MM-DD HH:mm");
    if (delayTime > 0) {
        if (delayColor) {
            val += '<div class="label label-warning">已滞后' + delayTime + ' ' + delayUnit + ' </div>'
        }
        else {
            val += '<div class="label label-important">已滞后' + delayTime + ' ' + delayUnit + ' </div>'
        }
    }
    return val; 
}
function functionPlanEndDate(data, type, item, meta) {
    if (!item.PlanEndDate) {
        return "";
    }
    var overdueTime = 0;
    var overdueUnit = "";
    var overdueColor = true;
    var diff = 0;

    //超期时间
    if (item.EndTime) {
        diff = moments(item.EndTime).diff(item.PlanEndDate, "minutes");
    } else {
        diff = moments().diff(item.PlanEndDate, "minutes");
    }
    if (diff > 0) {
        if (diff <= 120)
            overdueColor = true;
        else
            overdueColor = false;

        if (diff < 60) {
            overdueTime = diff;
            overdueUnit = "min";
        } else if (diff < 1440) {
            overdueTime = (diff * 1.0 / 60).toFixed(1);
            overdueUnit = "H";
        } else {
            overdueTime = (diff * 1.0 / 1440).toFixed(1);
            overdueUnit = "D";
        }
    }
    var val = moments(item.PlanEndDate).format("YYYY-MM-DD HH:mm");
    if (overdueTime > 0) {
        if (overdueColor) {
            val += '<div class="label label-warning">已延期' + overdueTime + ' ' + overdueUnit +' </div>'
        }
        else {
            val += '<div class="label label-important">已延期' + overdueTime + ' ' + overdueUnit + ' </div>'
        }
    } 
    return val;
}
function functionWorkSheetNo(data, type, item, meta) {
    return '<div name="trace" class="pointer-line" onclick="GetWorkOrderTrace(\'' + item.WorkSheetNo+'\')" data-toggle="modal" href="#modal-woTrace" style="color: #409eff;cursor: pointer;">' + item.WorkSheetNo +'</div>';
}
function functionWorkSheetId(data, type, item, meta) {
    var val = "";
    var Status = item.Status;
    if (Status < 10) {
        if (viewModel.button.EditUrgeWO) {
            val += "<div class='td_btn_cui' name=\"plan-cui\" data-toggle='modal' style=\"width: 80px\" onclick='plancuiClick(\"" + item.WorkSheetNo + "\",\"" + item.PlanCount + "\",\"" + item.OrganizeId + "\")' value='" + item.WorkSheetNo + "' qty='" + item.PlanCount + "'>";
            val += "<div class='btn has-tooltip red' data-placement='bottom' title='' data-original-title='催单'> <i class='font_ilean iconfont icon-large' data-toggle='modal' href='#modal-cui' style='cursor:pointer;'>催</i>";
            if (item.Qty > 0) {
                val += "<span value='" + item.WorkSheetNo + "' onclick='GetUrgeRecord(\"" + item.WorkSheetNo + "\")' class=\"badge badge-important\" style=\"top:0px;left:56px;position:absolute;\" name=\"ticket\" data-toggle='modal' href='#modal-cuiRecord'>信息" + item.Qty + "</span>";
            }
            val += " </div>";
            val += "</div>";
        }
    }
    else {
        if (viewModel.button.EditUrgeWO) {
            val += "<div class='td_btn_cui' name='plan-cui' data-toggle='modal' style=\"width: 80px\" >";
            val += "<div class='btn has-tooltip red' data-placement='bottom' title='' data-original-title='催单' style=\"background-color:#909399;\">" +
                "<i class='font_ilean iconfont icon-large disabled' data-toggle='modal' style='cursor:pointer;'>催</i>" +
                "</div>";
            val += "</div>";
        }
    } 
    return val;
}
function plancuiClick(WorkSheetNo, PlanCount, OrganizeId) {
    $("button[name=submit]").val(WorkSheetNo).attr("qty", PlanCount);
    $("#inputText1").val(PlanCount);
    $("#inputOrganizeId").val(OrganizeId);
    $("#urgedate").val(moments().format("YYYY-MM-DD HH:mm"));
    GetWorkOrderUrgeRecord(WorkSheetNo);
}
function functionStartTime(data, type, item, meta) {
    
    return item.StartTime ? moments(item.StartTime).format("YYYY-MM-DD HH:mm") : '';
}
function functionEndTime(data, type, item, meta) {
    return item.EndTime ? moments(item.EndTime).format("YYYY-MM-DD HH:mm") : '';
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
function UserSelectSplit(dom) {
    var users = $(dom).val()
    var value = "";
    if (users) {
        var list = users.split(">");
        value = list[list.length - 1];
    }
    return value.trim();
}

function UserOperation(dom, code) {
    var users = $(dom).val();
    if (users) {
        switch (code) {
            case 8: backspaceUser(dom); break;//退格
            case 13: $("#UserList li")[0].click(); break;//回车
            case 37: leftUser(dom); break;//方向左
            case 39: rightUser(dom); break;//方向右
            case 46: deleteUser(dom); break;//删除
            case 127: deleteUser(dom); break;//删除
        }
    }
}

function backspaceUser(dom) {
    var pos = getCursortPosition(dom);
    var user = UserSelectSplit(dom);
    var users = $(dom).val();
    if (user) {
        users = users.replace(user, "");
    }
    var list = users.split("<");
    var li = $("#" + $(dom).attr("name") + " li");
    for (var i = li.length - 1; i >= 0; i--) {
        var a = users.indexOf(list[i + 1]);
        if (list[i + 1].indexOf(">") == -1 || (a <= pos && pos <= (a + list[i + 1].length))) {//if (a <= pos) {
            $(li[i]).remove();
            var value = "";
            $.each($("#" + $(dom).attr("name") + " li"), function (index, item) {
                value += "<" + $(item).attr("name") + ">";
            });
            $(dom).val(value+" ");
            $(dom).focus();
            break;
        }
    }
}

function deleteUser(dom) {
    var pos = getCursortPosition(dom);
    var user = UserSelectSplit(dom);
    var users = $(dom).val();
    if (user) {
        users = users.replace(user, "");
    }
    var list = users.split(">");
    var li = $("#" + $(dom).attr("name") + " li");
    for (var i = li.length - 1; i >= 0; i--) {
        var a = users.indexOf(list[i]);

        if (list[i].indexOf("<") == -1 || (a <= pos && pos <= (a + list[i].length))) {//if (a <= pos) {
            $(li[i]).remove();
            var value = "";
            $.each($("#" + $(dom).attr("name") + " li"), function (index, item) {
                value += "<" + $(item).attr("name") + ">";
            });
            $(dom).val(value+" ");
            $(dom).focus();
            break;
        }
    }
}

function leftUser(dom) {
    var pos = getCursortPosition(dom);
    var users = $(dom).val();
    var list = users.split(">");
    for (var i = list.length - 2; i >= 0; i--) {
        var a = users.indexOf(list[i]) + 1;
        if (a < pos) {
            setCaretPosition(dom, a - 1);
            break;
        }
    }
}

function rightUser(dom) {
    var pos = getCursortPosition(dom);
    var users = $(dom).val();
    var list = users.split(">");
    var status = true;
    for (var i = 0; i <= list.length - 2; i++) {
        var a = users.indexOf(list[i]) + 1;
        if (a > pos) {
            setCaretPosition(dom, a - 1);
            status = false;
            break;
        }
    }
    if (status) {
        setCaretPosition(dom, users.length);
    }
}

function GetWorkLine() {
    $.ajax({
        url: '/api/sys/line?TenantId=' + TenantId,
        success: function (value) {
            if (value.total > 0) {
                var lineOption = [{ Id: '', Code: '', Name: '==请选择==' }];
                var workshopOption = [{ Id: '', Code: '', Name: '==请选择==' }];
                var workshopArray = new Array();
                $.each(value.rows, function (index, item) {
                    var row = { Id: item.LineId, Code: item.LineCode, Name: item.LineName, Group: item.WorkShopCode };
                    if (workshopArray.indexOf(item.WorkShopCode) < 0) {
                        var roww = { Id: item.WorkShopId, Code: item.WorkShopCode, Name: item.WorkShopName, Group: item.FactoryCode };
                        workshopOption.push(roww);
                        workshopArray.push(item.WorkShopCode);
                    }
                    lineOption.push(row);
                });
                $('select[name=Line]').html($("#option-template").render(lineOption));
                $('select[name=WorkShop]').html($("#option-template").render(workshopOption));
            }
        }
    })
}

 

function GetOverdueWorkOrder() {
    //var params = where();

    $.ajax({
        url: '/api/saps/workorder/GetOverdueWorkOrder' + params,
        type: 'Get',
        beforeSend: jQueryShowLoading(),//显示加载图标
        success: function (value) {
            jQuery('body').hideLoading();//隐藏加载图标
            paging(value.total);
            $("#overdueworkorder").html("");
            if (value.total > 0) {
                var list = [];
                $.each(value.rows, function (index, item) {
                    var delayTime = 0;
                    var overdueTime = 0;
                    var delayUnit = "";
                    var overdueUnit = "";
                    var delayColor = true;
                    var overdueColor = true;
                    var diff = 0;
                    var monitor = 0;
                    
                    
                    
                    
                    var row = {
                        Index: (index + (parseInt(page) - 1) * parseInt(rows) + 1), LineName: item.LineName, WorkSheetNo: item.WorkSheetNo, ProductCode: item.ProductCode
                        , ProductName: item.ProductName, PlanQuantity: item.PlanCount, CompletionNumber: item.CompletedCount
                        , Remainder: item.PlanCount - (item.CompletedCount ? item.CompletedCount : 0)
                        , PlanStartDate: moments(item.PlanStartDate).format("YYYY-MM-DD HH:mm")
                        , PlanEndDate: moments(item.PlanEndDate).format("YYYY-MM-DD HH:mm")
                        , StartTime: item.StartTime ? moments(item.StartTime).format("YYYY-MM-DD HH:mm") : ''
                        , EndTime: item.EndTime ? moments(item.EndTime).format("YYYY-MM-DD HH:mm") : ''
                        , DelayTimes: delayTime, OverdueTimes: overdueTime, Status: item.Status, State: state
                        , DelayUnit: delayUnit, OverdueUnit: overdueUnit
                        , DelayColor: delayColor, OverdueColor: overdueColor
                        , Qty: item.Qty, Monitor: monitor
                        , WorkShopId: item.WorkShopId, WorkShopName: item.WorkShopName, Customer: item.Customer
                        , Row: JSON.stringify(item)
                        , UrgeRecord: item.UrgeRecord
                    };
                    //if (item.Status == 5)
                    //    row.Unit = "天";
                    //延时两小时以内为黄色
                    if (item.DelayUnit == "Hour" && item.DelayTimes <= 2)
                        row.DYellow = true;
                    if (item.OverdueUnit == "Hour" && item.OverdueTimes <= 2)
                        row.OYellow = true;
                    if (item.Qty == 0)
                        row.Ticket = false;
                    list.push(row);
                })
                $("#overdueworkorder").html($("#template-overdueworkorder").render(list));

                //催单界面打开时初始化员工列表
                $("td[name=plan-cui]").click(function () {
                   
                });

               

            }
        }
    });
}

//催单
function GetUrgeRecord(WorkOrder) {
    $("#urgerecord").html("");
    $.ajax({
        url: '/api/saps/urgerecord?WorkOrder=' + WorkOrder,
        type: 'get',
        success: function (value) {
            if (value.total > 0) {
                var page = 1;
                var rows = 100;
                var records = [];
                //var workorder = [];
                $.each(value.rows, function (index, item) {
                    var row = {
                        Index: (index + ((page - 1) * rows) + 1), WorkOrder: item.WorkOrder, UrgeDate: moments(item.UrgeDate).format("YYYY-MM-DD HH:mm"), Handler: item.Handler
                        , HandlerName: item.HandlerName, UrgeUser: item.UrgeUser, UrgeUserName: item.UrgeUserName
                        , Quantity: item.Quantity, CCUser: item.CCUser, CCUserName: item.CCUserName
                        , ID: item.ID, Describe: item.Describe
                    };
                    if (row.Describe) {
                        row.Describe = row.Describe.substring(0, 10);
                    }
                    records.push(row);
                })
                var record = $("#template-urgerecord").render(records);
                $("#urgerecord").html(record);
            }
        }
    });
}

//工单追踪
function GetWorkOrderTrace(workorder) {
    $.ajax({
        url: '/api/saps/workorder/GetTrace?WorkOrder=' + workorder + '&TenantId=' + TenantId,
        success: function (value) {
            $('#trace').html("");
            if (value.total > 0) {
                var trace = [];
                $.each(value.rows, function (index, item) {
                    var process = Math.round(item.CompletedCount * 100.0 / item.PlanCount, 2);
                    var row = {
                        Old: true, WorkOrder: item.WorkSheetNo, ProductCode: item.ProductCode, ProductName: item.ProductName
                        , Quantity: item.PlanCount, PlanStartDate: moments(item.PlanStartDate).format("YYYY-MM-DD HH:mm")
                        , PlanEndDate: moments(item.PlanEndDate).format("YYYY-MM-DD HH:mm")
                        , StartTime: item.StartTime ? moments(item.StartTime).format("YYYY-MM-DD HH:mm") : ""
                        , EndTime: item.EndTime ? moments(item.EndTime).format("YYYY-MM-DD HH:mm") : ""
                        , CompletionNumber: item.CompletedCount
                        , State: item.State, ModifyUser: item.ModifyUser, Process: process
                        , ModifyDate: moments(item.ModifyDate).format("YYYY-MM-DD HH:mm")
                        , Remark: item.TraceRemark ? item.TraceRemark : ""
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

//催单明细
function GetWorkOrderUrgeRecord(wo) {
    $("#workorderUrgeRecord").html("");
    if (wo) {
        $.ajax({
            url: '/api/saps/urgerecord?WorkOrder=' + wo,
            type: 'get',
            success: function (value) {
                var page = 1;
                var rows = 100;
                if (value.total > 0) {
                    var records = [];
                    //var workorder = [];
                    $.each(value.rows, function (index, item) {
                        var row = {
                            Index: (index + ((page - 1) * rows) + 1), WorkOrder: item.WorkOrder, UrgeDate: moments(item.UrgeDate).format("YYYY-MM-DD HH:mm"), Handler: item.Handler
                            , HandlerName: item.HandlerName, UrgeUser: item.UrgeUser, UrgeUserName: item.UrgeUserName
                            , Quantity: item.Quantity, CCUser: item.CCUser, CCUserName: item.CCUserName, OrganizeName: item.OrganizeName
                            , ID: item.ID, ProductCode: item.ProductCode, ProductName: item.ProductName, PlanCount: item.PlanCount
                            , CreateTime: moments(item.CreateTime).format("YYYY-MM-DD HH:mm"), Describe: item.Describe
                        };
                        if (row.Describe) {
                            row.Describe = row.Describe.substring(0,10);
                        }
                        records.push(row);
                    })
                    var record = $("#template-workorderUrgeRecord").render(records);
                    $("#workorderUrgeRecord").html(record);
                }
            }
        });
    }
}

//发起催单
function UrgeWorkOrder(wo) {
    var quantity = $("#inputText1").val();
    var OrganizeId = $("#inputOrganizeId").val();
    var urgedate = $("#urgedate").val();
    var handler = "";
    var CCUser = "";
    $.each($("#CCUser li"), function (index, item) {
        CCUser += item.id + ',';
    })
    CCUser = CCUser.trim(',');
    $.each($("#Handler li"), function (index, item) {
        handler += item.id + ',';
    })
    handler = handler.trim(',');

    if (!handler || !quantity || !urgedate) {
        toastr.warning("信息填写不完整！");
        return false;
    }

    var params = JSON.stringify({
        WorkOrder: wo, Quantity: quantity, UrgeDate: urgedate, Handler: handler, CCUser: CCUser, OrganizeId: OrganizeId
        , TenantId: "", UrgeUser: "", Describe: $("textarea[name=Describe]").val()
    });
    $.ajax({
        type: 'post',
        url: '/api/saps/workorder/EditUrgeInsert',//'/api/SAPS/UrgeRecord/EditInsert',
        data: params,
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: jQueryShowLoading(),//显示加载图标
        success: function (value) {
            jQuery('body').hideLoading();//隐藏加载图标
            if (value.status) {
                $("#modal-cui").modal("hide"); 
                $(".user").html("");
                $("input[group=selectUser]").val("");
                //刷新列表
                table.ajax.reload(null, true); // user paging is not reset on reload
                UserList();
            } else {
                alert("系统忙，请联系系统管理员或稍后再试！" + value.message);
            }
        }
    });
}

function FindUser(value) {
    var users = [];//$("li[name=" + $("#inputUserName").val() + "]");
    UserList();
    if (value) {
        $.each($("#UserList li"), function (index, item) {
            var name = $(item).attr("name");
            if (name.indexOf(value) != -1)
                users.push(item);
        });
        $("#UserList").html("");
        $("#UserList").append(users);
        $("#UserList li").unbind().click(function () {
            adduser(this)
            $(".userlist").hide();
        })
    }
}

function adduser(obj) {
    if (focus) {
        var li = '<li id="' + $(obj).attr("id") + '" code="' + $(obj).attr("code") + '" name="' + $(obj).attr("name") + '">' + $(obj).text() + '</li>'
        $(focus).append(li);
        var current = $(focus).attr("id");;
        var value = "";
        $.each($(focus).children(), function (index, item) {
            value += "<" + $(item).attr("name") + ">";
        });
        $("input[name=" + current + "]").val(value);
        $("input[name=" + current + "]").focus();
        $(obj).remove();
        //删除已经选择人员
        $("#CCUser li").unbind().dblclick(function () {
            var li = '<li id="' + this.id + '" code="' + $(this).attr("code") + '" name="' + $(this).attr("name") + '">' + $(this).text() + '</li>'
            $("#UserList").append(li);
            $("#UserList li").unbind().click(function () {
                adduser(this);
                $(".userlist").hide();
            })
            $(this).remove();
        })
        $("#Handler li").unbind().dblclick(function () {
            var li = '<li id="' + this.id + '" code="' + $(this).attr("code") + '" name="' + $(this).attr("name") + '">' + $(this).text() + '</li>'
            $("#UserList").append(li);
            $("#UserList li").unbind().click(function () {
                adduser(this);
                $(".userlist").hide();
            })
            $(this).remove();
        })
    }
}

function GetUser() {
    $.ajax({
        type: 'get',
        url: '/api/sys/user?TenantId=' + TenantId,
        success: function (value) {
            if (value.total > 0) {
                userlist = value.rows;
                UserList()
            }
        }
    });
}

function UserList() {
    var users = [];
    $.each(userlist, function (index, item) {
        var row = { UserId: item.UserId, UserCode: item.UserCode, UserName: item.UserName };
        //if ($("li[name=" + row.UserName + "]").length == 0)
        if (JSON.stringify(users).indexOf(item.UserName) < 0)
            users.push(row);
    })
    $("#UserList").html($("#template-userlist").render(users));
    $("#UserList li").unbind().click(function () {
        adduser(this);
        $(".userlist").hide();
    })
}

//获取查询条件（组织）
//function GetOrganize() {
//    $.ajax({
//        url: '/api/sys/Organize/GetOrganize?TenantId=' + TenantId,
//        success: function (value) {
//            if (value.total > 0) {
//                var list = [];
//                $.each(value.rows, function (index, item) {
//                    var row = { id: item.OrganizeId, code: item.OrganizeCode, title: item.OrganizeName };
//                    list.push(row);
//                });
//                queryOrganizeCombotree.setData([{ id: '', code: '', title: '所有部门', 'subs': list }]);//查询
//            }
//        }
//    });
//}
 