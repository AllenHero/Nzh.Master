var rows = 5;
var page = 1;
var sort = ''
var order=''
//var queryLineCombotree = CreateComboTree('queryLineId');
var queryOrganizeCombotree = DataOrganizeTree("queryOrganizeId");
var handlerCombotree = CreateComboTree('editHanderReportJob');

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
    //GetCollectionWorkOrder();
    //WorkShopLine();
    GetOrganizeUser();
    //$("div[name=queryClear]").click(function () {
    //    $("input[group=query]").val('');
    //    queryLineCombotree.clear();
    //});
    //$("div[name=querySubmit]").click(function () {
    //    page = 1;
    //    GetWorkOrder();
    //});
    //编辑生产异常信息
    $('#mytable').SetEditable({
        columnsEd: "0,1,2,3",  //编辑第一和第二列     
        columnsAdd: true,
        $addButton: $('#add'),
        onEdit: function (value) {
            value;
        },
        onBeforeEdit: function (value) {
            value[0].cells[1].children[1].addEventListener("keyup", function () {
                this.value = this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : '';
            });
        },
        onBeforeDelete: function (value) {

        }, //Called before deletion
        onDelete: function (value) {

        }, //Called after deletion
        onAdd: function (value) {

        },     //Called when added a new row
        $addColButton: null, // Jquery object of "Add Column Button"
        onAddCol: function () {

        } // Called after adding new column
    });
    //保存报工信息
    $("button[name=reportJobSubmit]").click(function () {
        EditReportJobData();
    });

    $("button[name=printDetail]").click(function () {
        $(".modal-body").css("max-height", window.innerHeight * 10);
        //$("body").children().hide();
        //$("#modal_detail").modal("show");
        //document.body.innerHTML = document.getElementById('modal_detail').innerHTML
        //window.print();

        $("#modal_detail").print({
            globalStyles: true,//是否包含父文档的样式，默认为true
            mediaPrint: false,//是否包含media='print'的链接标签。会被globalStyles选项覆盖，默认为false
            stylesheet: null,//外部样式表的URL地址，默认为null
            noPrintSelector: ".no-print",//不想打印的元素的jQuery选择器，默认为".no-print"
            iframe: false,//是否使用一个iframe来替代打印表单的弹出窗口，true为在本页面进行打印，false就是说新开一个页面打印，默认为true
            append: null,//将内容添加到打印内容的后面
            prepend: null,//将内容添加到打印内容的前面，可以用来作为要打印内容
            deferred: $.Deferred()//回调函数
        });
    });

    $("button[name=printBg]").click(function () {
        $(".modal-body").css("max-height", window.innerHeight * 10);
        //$("body").children().hide();
        //$("#modal_detail").modal("show");
        //document.body.innerHTML = document.getElementById('modal_detail').innerHTML
        //window.print();

        $("#modal_bg").print({
            globalStyles: true,//是否包含父文档的样式，默认为true
            mediaPrint: false,//是否包含media='print'的链接标签。会被globalStyles选项覆盖，默认为false
            stylesheet: null,//外部样式表的URL地址，默认为null
            noPrintSelector: ".no-print",//不想打印的元素的jQuery选择器，默认为".no-print"
            iframe: false,//是否使用一个iframe来替代打印表单的弹出窗口，true为在本页面进行打印，false就是说新开一个页面打印，默认为true
            append: null,//将内容添加到打印内容的后面
            prepend: null,//将内容添加到打印内容的前面，可以用来作为要打印内容
            deferred: $.Deferred()//回调函数
        });
    });
})
//查找工单
function GetWorkOrder() {
    var param = CheckWhere();
    $.ajax({
        url: '/api/saps/reportjob/getworkorder?sort=&order=&rows=' + rows + '&page=' + page + '&TenantId=' + TenantId + param,
        beforeSend: jQueryShowLoading(),//显示加载图标
        success: function (value) {
            jQuery('body').hideLoading();//隐藏加载图标
            $("#tableworkorder").html("");
            paging(value.total);
            if (!value.status)
                return false;
            var list = [];
            $.each(value.rows, function (index, item) {
                var row = {
                    Index: (index + 1), OrderNo: item.OrderNo, WorkSheetNo: item.WorkSheetNo
                    , ProductCode: item.ProductCode, ProductName: item.ProductName
                    , LineId: item.LineId, LineName: item.LineName, PlanCount: item.PlanCount
                    , CustomerName: item.CustomerName
                    , PlanStarDate: moments(item.PlanStarDate).format("YYYY-MM-DD HH:mm")
                    , PlanEndDate: moments(item.PlanEndDate).format("YYYY-MM-DD HH:mm")
                    , CompletedCount: item.CompletedCount
                    , StartTime: item.StartTime ? moments(item.StartTime).format("YYYY-MM-DD HH:mm") : ''
                    , EndTime: item.EndTime ? moments(item.EndTime).format("YYYY-MM-DD HH:mm") : ''
                    ,Item: JSON.stringify(item)
                };
                list.push(row);
            })
            $("#tableworkorder").html($("#template-workorder").render(list));
            OnAfterLoad();
        }
    })
}
//加载当天生产工单
function GetCollectionWorkOrder() {
    $.ajax({
        url: '/api/saps/reportjob/GetCollectionWorkOrder?rows=' + rows + '&page=' + page +'&TenantId=' + TenantId,
        beforeSend: jQueryShowLoading(),//显示加载图标
        success: function (value) {
            jQuery('body').hideLoading();//隐藏加载图标
            $("#tableworkorder").html("");
            paging(value.total);
            if (!value.status)
                return false;
            var list = [];
            $.each(value.rows, function (index, item) {
                var row = {
                    Index: (index + 1), OrderNo: item.OrderNo, WorkSheetNo: item.WorkSheetNo
                    , ProductCode: item.ProductCode, ProductName: item.ProductName
                    , LineId: item.LineId, LineName: item.LineName, PlanCount: item.PlanCount
                    , CustomerName: item.CustomerName
                    , PlanStarDate: moments(item.PlanStarDate).format("YYYY-MM-DD HH:mm")
                    , PlanEndDate: moments(item.PlanEndDate).format("YYYY-MM-DD HH:mm")
                    , CompletedCount: item.CompletedCount
                    , StartTime: item.StartTime ? moments(item.StartTime).format("YYYY-MM-DD HH:mm") : ''
                    , EndTime: item.EndTime ? moments(item.EndTime).format("YYYY-MM-DD HH:mm") : ''
                    , Item: JSON.stringify(item)
                };
                list.push(row);
            })
            $("#tableworkorder").html($("#template-workorder").render(list));
            OnAfterLoad();
        }
    })
}
//数据加载完成后事件
function OnAfterLoad() {
    //$("#reportjobTable").colResizable();

    $(function () {
        $('.table-expandable').each(function () {
            var table = $(this);
            table.children('thead').children('tr').append('<th></th>');
            table.children('tbody').children('tr').filter(':odd').hide();
            table.children('tbody').children('tr').filter(':even').click(function () {
                var element = $(this);
                element.next('tr').toggle('slow');
                element.find(".table-expandable-arrow").toggleClass("up");
            });
            table.children('tbody').children('tr').filter(':even').each(function () {
                var element = $(this);
                element.append('<td><div class="table-expandable-arrow"></div></td>');
            });
        });
    });

    $("tr[name=expandable]").click(function () {
        var workorder = $(this).attr("data");
        if ($(this).attr("status")) {
            GetReportData(workorder,this);
        }
        if ($(this).next().css("display") === "none") {
            this.cells[0].getElementsByTagName("div")[0].classList.add("up");
            $(this).next().css("display", "contents")
        } else {
            this.cells[0].getElementsByTagName("div")[0].classList.remove("up");
            $(this).next().css("display", "none")
        }
    });
    //生产报工
    $("button[name=WorkOrderReport]").click(function () {
        var data = $(this).attr("data");
        if (!data)
            return false;
        $("button[name=reportJobSubmit]").attr("data", data);
        var tbody = document.getElementById("mytable");
        tbody.children[1].innerHTML = "";
        $("input[name=editPassQty]").val('');
        $("input[name=editNgQty]").val('');

        data = JSON.parse(data);
        EditReportJob(data);
    });
}
//查询条件
function CheckWhere() {
    var param = "";
    if ($("input[name=OrderNo]").val())
        param += "&OrderNo=" + $("input[name=OrderNo]").val();
    if ($("input[name=WorkSheetNo]").val())
        param += "&WorkSheetNo=" + $("input[name=WorkSheetNo]").val();
    //if (queryLineCombotree.datas().length > 0)
    //    param += "&LineId=" + queryLineCombotree.datas()[0].id;
    if (queryOrganizeCombotree.datas().length > 0)
        param += "&OrganizeId=" + queryOrganizeCombotree.datas()[0].id;
    if ($("input[name=PlanDate]").val())
        param += "&PlanDate=" + $("input[name=PlanDate]").val();
    return param;
}
//获取报工明细
function GetReportData(id,element) {
    var url = '/api/saps/reportjob?WorkOrder=' + id;
    $.ajax({
        url: url,
        beforeSend: jQueryShowLoading(),//显示加载图标
        success: function (value) {
            jQuery('body').hideLoading();//隐藏加载图标
            $("#tablereport").html("");
            if (!value.status)
                return false;
            var list = [];
            $.each(value.rows, function (index, item) {
                var row = {
                    Index: (index + 1), Id: item.Id, OrderNo: item.OrderNo, WorkOrder: item.WorkOrder
                    , ProductCode: item.ProductCode, ProductName: item.ProductName
                    //, LineId: item.LineId, LineName: item.LineName, PlanCount: item.PlanCount
                    , OrganizeId: item.OrganizeId, OrganizeName: item.OrganizeName, PlanCount: item.PlanCount
                    , CreateTime: item.CreateTime?moments(item.CreateTime).format("YYYY-MM-DD HH:mm"):''
                    , CreatePerson: item.CreatePerson, ReportNo: item.ReportNo
                    , CompletedCount: item.PassQty + item.NgQty
                    , PassQty: item.PassQty, NgQty: item.NgQty
                    , Item: JSON.stringify(item)
                };
                list.push(row);
            })
            $("#" + id).html($("#template-workorderdetail").render(list));
            $(element).removeAttr("status")

            //报工详情
            $("button[name=ReportDetail]").click(function () {
                var data = $(this).attr("data");
                if (!data)
                    return false;
                data = JSON.parse(data);
                ReportJobDetail(data);
                GetReportJobException(data.Id)
            });
        }
    });
}

function EditReportJob(item) {
    if (!item)
        return false;
    $("input[name=editWorkOrder]").val(item.WorkSheetNo);
    $("input[name=editProductCode]").val(item.ProductCode);
    $("input[name=editProductName]").val(item.ProductName);
    //$("input[name=editLineName]").val(item.LineName);
    $("input[name=editOrganizeName]").val(item.OrganizeName);
    $("input[name=editCustomerName]").val(item.CustomerName);
    $("input[name=editReportNo]").val(moments().format("YYYYMMDDhhmmssSSS"));
}

function ReportJobDetail(item) {
    if (!item)
        return false;
    $("input[name=detailWorkOrder]").val(item.WorkOrder);
    $("input[name=detailProductCode]").val(item.ProductCode);
    $("input[name=detailProductName]").val(item.ProductName);
    //$("input[name=detailLineName]").val(item.LineName);
    $("input[name=detailOrganizeName]").val(item.OrganizeName);
    $("input[name=detailCustomerNname]").val(item.CustomerNname);
    $("input[name=detailReportNo]").val(item.ReportNo);
    $("input[name=detailPassQty]").val(item.PassQty);
    $("input[name=detailNgQty]").val(item.NgQty);
    $("label[name=detailCreatePerson]").html(item.CreatePerson);
    $("label[name=detailCreateTime]").html(item.CreateTime);
}

//保存报工数据
function EditReportJobData() {
    var data = CheckReportJobData();
    if (!data)
        return false;
    $.ajax({
        url:'/api/saps/reportjob/EditReportJob',
        type: 'Post',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: jQueryShowLoading(),//显示加载图标
        success: function (value) {
            jQuery('body').hideLoading();//隐藏加载图标
            if (value.status) {
                var page=table.page();
                table.ajax.reload(null, true);
                //table.page('next').draw('page');
                //table.page('previous').draw('page');
                table.page(page).draw('page');
                $("#modal_bg").modal("hide");
            } else {
                toastr.warning(value.message);
            }
        }
    });
}

//检查报工数据
function CheckReportJobData() {
    var data = {
        Id: '', ReportNo: '', OrderNo: '', WorkOrder: ''
        , CustomerName: '', ProductCode: '', ProductName: ''
        , LineId: '', LineName: '', PassQty: '', NgQty: ''
        , CreatePerson: '', TenantId: TenantId
        , Exceptions: []
        ,OrganizeId:'',OrganizeCode:'',OrganizeName:''
    };
    var status = true;
    var item = $("button[name=reportJobSubmit]").attr("data");
    if (!item)
        return false;
    item = JSON.parse(item);
    data.OrderNo = item.OrderNo;
    data.WorkOrder = item.WorkSheetNo;
    data.ProductCode = item.ProductCode;
    data.ProductName = item.ProductName;
    data.OrganizeId = item.OrganizeId;
    data.OrganizeCode = item.OrganizeCode;
    data.OrganizeName = item.OrganizeName;
    //data.LineId = item.LineId;
    //data.LineName = item.LineName;
    data.ReportNo = $("input[name=editReportNo]").val();
    if ($("input[name=editPassQty]").val()) {
        data.PassQty = $("input[name=editPassQty]").val();
        if (data.PassQty <= 0) {
            status = false;
            toastr.warning("良品数量必须大于0");
        }
    }
    else {
        toastr.warning("良品数量不能为空");
        status = false;
    }

    if ($("input[name=editNgQty]").val()>0) {
        data.NgQty = $("input[name=editNgQty]").val();
        if (data.NgQty < 0) {
            status = false;
            toastr.warning("不良品数量必须大于0");
        }

        data.Exceptions = TableToJson("mytable");
        if (data.Exceptions.length === 0) {
            status = false;
            toastr.warning("不良数量不能为空");
        }
        var ngqty = 0;
        $.each(data.Exceptions, function (index, item) {
            if (!item.NgQty.trim()) {
                toastr.warning("不良数量不能为空");
                return false;
            }
            if (item.NgQty < 0) {
                toastr.warning("不良数量必须大于0");
                return false;
            }
            if (!item.Exception.trim()) {
                toastr.warning("不良现象不能为空");
                return false;
            }
            if (!item.Cause.trim()) {
                toastr.warning("不良原因不能为空");
                return false;
            }
            ngqty += parseInt(item.NgQty);
        });
        if (parseInt(data.NgQty) > ngqty) {
            status = false;
            toastr.warning("不良品数量填写不正确");
        }
    }
    if (handlerCombotree.datas.lenght > 0)
        data.CreatePerson = handlerCombotree.datas[0].val;
    else
        data.CreatePerson = UserName;

    if (status)
        return data;

    return '';
}

//获取报工异常明细
function GetReportJobException(id) {
    $.ajax({
        url: '/api/saps/reportjobexception?ReportJobId=' + id,
        beforeSend: jQueryShowLoading(),//显示加载图标
        success: function (value) {
            jQuery('body').hideLoading();//隐藏加载图标
            $("#jobexceptiondetail").html("");
            if (!value.status)
                return false;
            var list = [];
            $.each(value.rows, function (index,item) {
                var row = {
                    Index: (index + 1), Id: item.Id, ReportJobId: item.ReportJobId
                    , Exception: item.Exception, NgQty: item.NgQty
                    , Cause: item.Cause, CreatePerson: item.CreatePerson
                    , CreateTime: item.CreateTime, Describe: item.Describe
                };
                list.push(row);
            });
            $("#jobexceptiondetail").html($("#template-jobexceptiondetail").render(list));
        }
    });
}

////获取产线
//function WorkShopLine() {
//    $.ajax({
//        url: '/api/sys/line?TenantId=' + TenantId,
//        success: function (value) {
//            if (value.status) {
//                var workShopName = value.rows[0].WorkShopName;
//                var workShopId = value.rows[0].WorkShopId;
//                var lines = [];
//                var workshops = [];
//                $.each(value.rows, function (index, item) {
//                    if (item.WorkShopName !== workShopName) {
//                        var workshop = { "id": workShopId, "title": workShopName, "subs": lines };
//                        workshops.push(workshop);
//                        workShopName = item.WorkShopName;
//                        workshopId = item.WorkShopId
//                        lines = [];
//                    }s
//                    var line = { "id": item.LineId,"code":item.LineCode, "title": item.LineName };
//                    lines.push(line);
//                });
//                if (lines.length > 0) {
//                    var workshop = { "id": workShopId,"code":item.WorkShopCode "title": workShopName, "subs": lines };
//                    workshops.push(workshop);
//                }
//                queryLineCombotree.setData(workshops);
//            }
//        }
//    });
//}

//获取部门人员信息
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
                handlerCombotree.setData(organizes);
                $("#editHanderReportJob").children(".drop-down-wrap").css("position", "relative");
                handlerCombotree.setSelect($("[data-id=" + UserId + "]"));
            }
        }
    });
}

//table to json
function TableToJson(tableid) {
    var txt = "[";
    var table = document.getElementById(tableid);
    var row = table.getElementsByTagName("tr");
    if (row.length <= 1)
        return [];
    var col = row[0].getElementsByTagName("th");
    for (var j = 1; j < row.length; j++) {
        var r = "{";
        for (var i = 0; i < col.length; i++) {
            var tds = row[j].getElementsByTagName("td");
            if (col[i].attributes["name"].value !=="buttons")
                r += "\"" + col[i].attributes["name"].value + "\"\:\"" + tds[i].innerHTML + "\",";
            //r += "\"" + col[i].innerHTML + "\"\:\"" + tds[i].innerHTML + "\",";
        }
        r = r.substring(0, r.length - 1)
        r += "},";
        txt += r;
    }
    txt = txt.substring(0, txt.length - 1);
    txt += "]";
    return JSON.parse(txt);
}

//分页
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