var rows = 5;
var rowsDetail = 5;
var page = 1;
var pageDetail = 1;
var sort = "";
var order = "";

//文件上传
uploadTemplate("importFile", "/minimes/collection/importCollection?TenantId=" + TenantId);

//comboboxTree
//var parentCombotree = CreateComboTree('editParentId');
var parentCombotree = DataOrganizeTree('editParentId');
//var queryParentCombotree = CreateComboTree('queryParentId');
var queryParentCombotree = DataOrganizeTree('queryParentId');
var handlerCombotree = CreateComboTree('editHandler');
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
    GetCollection();
    //WorkShopLine()
    GetOrganizeUser();
    $("button[name=newCollection]").click(function () {
        ClearEditValue();
    });
    $("input[name=collectionTime]").change(function () {
        var collectionId = $(this).attr("data");
        GetCollectionDataDetail(collectionId);
    });
    $("#collectiondataquery").click(function () {
        var collectionId = $(this).attr("data");
        pageDetail = 1;
        GetCollectionDataDetail(collectionId);
    });
    //清空编辑框
    $("button[name=editCancel]").click(function () {
        ClearEditValue();
    });
    //获取采集数据
    $("div[name=query]").click(function () {
        page = 1;
        GetCollection();
    });

    //清空查询框
    $("div[name=clear]").click(function () {
        $("input[name=findCollectionName]").val("");
        $("select[name=findStatus]").val("");
        queryParentCombotree.clear();
    });
    //保存数据采集点
    $('button[name=editSubmit]').click(function () {
        EditCollection();
    });
    //显示删除框
    $("button[name=delete]").click(function () {
        var selected = $("input[name=select]:checked");
        if (selected.length > 0) {
            $("#modal_del").modal("show");
        }
    });
    //设置多选删除
    $('button[name=delSubmit]').click(function () {
        //var selected = $("input[name=select]:checked");
        //var ids = "";
        //$.each(selected, function (index, item) {
        //    var id = $(item).attr("data");
        //    if (id) {
        //        ids += "'"+id+"',";
        //    }
        //});
        //if (ids)
        //    ids = ids.trim(',');
        var checkedBox = $("input[name='checkBox1']:checked");
        if (checkedBox.length == 0) {
            toastr.warning("请先勾选要删除的采集点。")
            return;
        } else {
            var arrs = new Array();
            $('input[name="checkBox1"]:checked').each(function () {
                arrs.push($(this).val());
            });
        }
        DeleteCollection({ Id: arrs.join(",") });
    });
    //批量选择行
    $("#check-all").click(function () {
        if ($(this).is(':checked'))
            $("input[name=select]").attr("checked","checked");
        else 
            $("input[name=select]").removeAttr("checked");
    });

    var columnsArray = [
        { "data": 'Id', "title": "<label style='text-align:center;'><input style='width:16px;height:16px;' type='checkbox' id='Allchecked'/><span class='lbl'></span></label>", "searchable": false, "width": "20px", "visible": true, "sortable": false,"render": functionFormatCheckbox },
        { "data": 'Id', "title": "操作", "searchable": false, "width": "120px", "visible": true, "sortable": false, "render": functionFormatOperation },
        { "data": 'CollectionTime', "title": "采集时间", "searchable": false, "width": "120px", "visible": true, "sortable": false, "render": functionFormatCollectionTime },
        { "data": 'Collection', "title": "采集点编码", "searchable": false, "width": "120px", "visible": true, "sortable": false },
        { "data": 'CollectionName', "title": "采集点名称", "searchable": false, "width": "120px", "visible": true, "sortable": false },
        { "data": 'Function', "title": "用途", "searchable": false, "width": "120px", "visible": true, "sortable": false },
        { "data": 'Type', "title": "设备/系统", "searchable": false, "width": "120px", "visible": true, "sortable": false, "render": functionFormatType},
        { "data": 'ParentName', "title": "父节点", "searchable": false, "width": "120px", "visible": true, "sortable": false},
        { "data": 'Frequency', "title": "采集频率", "searchable": false, "width": "120px", "visible": true, "sortable": false },
        { "data": 'Status', "title": "状态", "searchable": false, "width": "120px", "visible": true, "sortable": false, "render": functionFormatStatus},
        { "data": 'Seq', "title": "排序号", "searchable": false, "width": "120px", "visible": true, "sortable": false},
        { "data": 'Cause', "title": "异常原因", "searchable": false, "width": "120px", "visible": true, "sortable": false },
        { "data": 'WarningTime', "title": "触发警报阈值", "searchable": false, "width": "120px", "visible": true, "sortable": false },
        { "data": 'CreatePerson', "title": "创建人", "searchable": false, "width": "120px", "visible": true, "sortable": false},
        { "data": 'CreateTime', "title": "创建日期", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionFormatCreateTime},
        { "data": 'Id', "title": "日志", "searchable": false, "width": "120px", "visible": true, "sortable": false, "render": functionFormatViewLog },
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
            "url": "/api/minimes/Collection/EditCollectionList",
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "data": function (d) {
                var ParentId = "";
                d.CollectionName = $('input[name=findCollectionName]').val();
                d.Status = $('select[name=findStatus]').val();
                if (queryParentCombotree.datas().length > 0) {
                    ParentId = queryParentCombotree.datas()[0].id;
                }
                d.ParentId = ParentId;
                d.TenantId = TenantId;
                return JSON.stringify(d);
            }
        },
        "aaSorting": [[14, "desc"]],//默认第几个排序
        "columns": columnsArray,
        "dom": 'Brt<"bottom">ilp<"clear">',
        buttons: getPageButton(),
        //"columnDefs": [
        //    {
        //        "targets": 0,//第1列
        //        "render": function (data, type, row, meta) {
        //            return '<label style="text-align:center;"><input style="width:16px;height:16px;" type="checkbox" name="checkBox1" value="' + row.Id + '"/><span class="lbl"></span></label>'
        //        }
        //    },
        //    {
        //        "targets": 1,//第2列
        //        "render": function (data, type, row, meta) {
        //            if (row.IsEnable == "0") {
        //                return '<a href="javascript:;" class="btn blue" id="EditRow">'
        //                    + '<i class="font_ilean iconfont icon-power"></i>编辑'
        //                    + '</a>'
        //                    + '<a href="javascript:;" class="btn blue" id="EnableRow">'
        //                    + '<i class="font_ilean iconfont icon-power"></i>启动'
        //                    + '</a>'
        //            }
        //            else {
        //                return '<a href="javascript:;" class="btn blue" id="EditRow">'
        //                    + '<i class="font_ilean iconfont icon-power"></i>编辑'
        //                    + '</a>'
        //                    + '<a href="javascript:;" class="btn blue" id="DisableRow">'
        //                    + '<i class="font_ilean iconfont icon-power"></i>关闭'
        //                    + '</a>'
        //            }
        //        }
        //    },
        //    {
        //        "targets": 15,//第16列
        //        "render": function (data, type, row, meta) {
        //            return '<a href="javascript:;" class="btn blue" id="ViewRow">'
        //                + '<i class="fa fa-edit">查看</i>'
        //                + '</a>'
        //        }
        //    }],
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
                "url": "/api/minimes/Collection/EditCollectionList",
                "type": "POST",
                "contentType": "application/json; charset=utf-8",
                "data": function (d) {
                    var ParentId = "";
                    d.CollectionName = $('input[name=findCollectionName]').val();
                    d.Status = $('select[name=findStatus]').val();
                    if (queryParentCombotree.datas().length > 0) {
                        ParentId = queryParentCombotree.datas()[0].id;
                    }
                    d.ParentId = ParentId;
                    d.TenantId = TenantId;
                    return JSON.stringify(d);
                }
            },
            "aaSorting": [[14, "desc"]],//默认第几个排序
            "columns": columnsArray,
            "dom": 'Bfrt<"bottom">ilp<"clear">',
            buttons: getPageButton(),
            //"columnDefs": [
            //    {
            //        "targets": 0,//第1列
            //        "render": function (data, type, row, meta) {
            //            return '<label style="text-align:center;"><input style="width:16px;height:16px;" type="checkbox" name="checkBox1" value="' + row.OrderNo + '"/><span class="lbl"></span></label>'
            //        }
            //    },
            //    {
            //        "targets": 1,//第2列
            //        "render": function (data, type, row, meta) {
            //            if (row.IsEnable == "0") {
            //                return '<a href="javascript:;" class="btn blue" id="EditRow">'
            //                    + '<i class="font_ilean iconfont icon-power"></i>编辑'
            //                    + '</a>'
            //                    + '<a href="javascript:;" class="btn blue" id="EnableRow">'
            //                    + '<i class="font_ilean iconfont icon-power"></i>启动'
            //                    + '</a>'
            //            }
            //            else {
            //                return '<a href="javascript:;" class="btn blue" id="EditRow">'
            //                    + '<i class="font_ilean iconfont icon-power"></i>编辑'
            //                    + '</a>'
            //                    + '<a href="javascript:;" class="btn blue" id="DisableRow">'
            //                    + '<i class="font_ilean iconfont icon-power"></i>关闭'
            //                    + '</a>'
            //            }
            //        }
            //    },
            //    {
            //        "targets": 15,//第16列
            //        "render": function (data, type, row, meta) {
            //            return '<a href="javascript:;" class="btn blue" id="ViewRow">'
            //                + '<i class="fa fa-edit">查看</i>'
            //                + '</a>'
            //        }
            //    }],
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
        //table.fnClearTable();//清空数据.fnClearTable();//清空数据
        //table.fnDestroy(); //还原初始化了的datatable
        table.ajax.reload(null, true); // user paging is not reset on reload
        //$('#dataList').DataTable(datatableSetting);
    });

    //清空
    $("#btnClear").click(function () {
        $("input[name=findCollectionName]").val("");
        $("select[name=findStatus]").val("");
        queryParentCombotree.clear();
    })

    //编辑
    $('#dataList tbody').on('click', 'a#EditRow', function () {
        var data = $('#dataList').DataTable().row($(this).parents('tr')).data();
        $('input[name=editCollection]').val(data.Collection);
        //采集点名称
        $('input[name=editCollectionName]').val(data.CollectionName);
        //采集类型
        $('select[name=editType]').val(data.Type);
        //父节点
        if (data.ParentId) {
            parentCombotree.setSelect($("[data-id=" + data.ParentId + "]"));
        }
        //用途
        $("input[name=editFunction]").val(data.Function);
        //排序号
        $("input[name=editSeq]").val(data.Seq);
        //采集频次
        data.Frequency = data.Frequency.trim();
        $("input[name=editFrequency]").val(data.Frequency.substring(0, data.Frequency.length - 1));
        $("select[name=editFrequencyUnit]").val(
            data.Frequency.substring(
                data.Frequency.length - 1,
                data.Frequency.length
            )
        );
        //报警阈值
        data.WarningTime = data.WarningTime.trim();
        $("input[name=editWarningTime]").val(
            data.WarningTime.substring(
                0, data.WarningTime.length - 1));
        $("select[name=editWarningTimeUnit]").val(
            data.WarningTime.substring(
                data.WarningTime.length - 1,
                data.WarningTime.length
            )
        );
        //责任人
        if (data.Handler) {
            handlerCombotree.setSelect($("[data-id=" + data.Handler + "]"));
        }
        //$("input[name=editHandler]").val(row.Handler);
        //异常原因
        $("input[name=editCause]").val(data.Cause);
        $(".modal").modal("hide");
        $("#modal_edit").modal("show");
        $('button[name=editSubmit]').attr("data", data.Id);
    });

    //启动
    $('#dataList tbody').on('click', 'a#EnableRow', function () {
        var data = $('#dataList').DataTable().row($(this).parents('tr')).data();
        var value = { Id: data.Id, IsEnable: "1" };
        OpenOrCloseCollection(value);
    });

    //关闭
    $('#dataList tbody').on('click', 'a#DisableRow', function () {
        var data = $('#dataList').DataTable().row($(this).parents('tr')).data();
        var value = { Id: data.Id, IsEnable: "0" };
        OpenOrCloseCollection(value);
    });

    //查看日志
    $('#dataList tbody').on('click', 'a#ViewRow', function () {
        var data = $('#dataList').DataTable().row($(this).parents('tr')).data();
        $("input[name=collectionTime]").val('');
        GetCollectionDataDetail(data.Id);
        $(".modal").modal("hide");
        $("#modal_detail").modal("show");
    });

    //全选
    $('#Allchecked').on('click', function () {
        if (this.checked) {
            $(this).attr('checked', 'checked')
            $("input[name='checkBox1']").each(function () {
                this.checked = true;
            });
        } else {
            $(this).removeAttr('checked')
            $("input[name='checkBox1']").each(function () {
                this.checked = false;
            });
        }
    });
})

function getPageButton() {
    var buttons = [
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
            text: '<i class="font_ilean iconfont icon-xiazai1"></i>&nbsp下载模板',
            action: function (e, dt, node, config) {
                DownloadTemplate();
            }
        }
    ];
    if (viewModel.button.EditCollection) {
        var add = {
            text: '<i class="font_ilean iconfont icon-jiahao"></i>&nbsp新增',
            action: function (e, dt, node, config) {
                $('#modal_edit').modal('show').css({
                    //width: '1000px',
                    'margin-left': function () {
                        return -($(this).width() / 2);
                    }
                });
            }
        };
        buttons.push(add);
    }
    if (viewModel.button.delete) {
        var del = {
            text: '<i class="font_ilean iconfont icon-shanchu"></i>&nbsp删除',
            action: function (e, dt, node, config) {
                $('#modal_del').modal('show').css({
                    width: '500px',
                    'margin-left': function () {
                        return -($(this).width() / 2);
                    }
                });
            }
        };
        buttons.push(del);
    }
    return buttons;
};

//格式化采集时间
function functionFormatCollectionTime(data, type, full, meta) {
    var CollectionTime = "";
    if (data) {
        CollectionTime = moment(data).format("YYYY-MM-DD HH:mm:ss");
    }
    return CollectionTime;
}

//格式化创建时间
function functionFormatCreateTime(data, type, full, meta) {
    return moment(data).format("YYYY-MM-DD HH:mm:ss");
}

//格式化类型
function functionFormatType(data, type, full, meta) {
    var Type = "";
    switch (data) {
        case 'Plc': Type = 'Plc'; break;
        case 'Weight': Type = '电子称'; break;
        default: Type = '其它'; break
    }
    return Type;
}

//格式化状态
function functionFormatStatus(data, type, full, meta) {
    var Status = "";
    switch (data) {
        case '01': Status = '运行中'; break;
        case '02': Status = '停止中'; break;
        default: Status = '其它'; break
    }
    return Status;
}

//格式化复选框
function functionFormatCheckbox(data, type, item, meta) {
    return "<label style='text-align:center;'><input style='width:16px;height:16px;' type='checkbox' name='checkBox1' value='" + item.Id + "'/><span class='lbl'></span></label>";
}

//格式化操作
function functionFormatOperation(data, type, item, meta) {
    var html = "";
    if (item.IsEnable == "0") {
        if (viewModel.button.EditCollection) {
            html = '<a href="javascript:;" class="btn blue has-tooltip" data-placement="bottom" title = "" data-original-title="编辑" id="EditRow">'
                + '<i class="font_ilean iconfont icon-luruyundan"></i>'
                + '</a>'
                + '<a href="javascript:;" style="padding:8px 6px !important" class="btn has-tooltip" data-placement="bottom" title = "" data-original-title="开启"  id="EnableRow">'
                + '<i style="color:#2696F8" class="font_ilean iconfont icon-qiyong1"></i>'
                + '</a>'
        }
    }
    else {
        if (viewModel.button.EditCollection) {
            html = '<a href="javascript:;" class="btn blue has-tooltip" data-placement="bottom" title = "" data-original-title="编辑"  id="EditRow">'
                + '<i class="font_ilean iconfont icon-luruyundan"></i>'
                + '</a>'
                + '<a href="javascript:;" style="padding:8px 6px !important" class="btn has-tooltip" data-placement="bottom" title = "" data-original-title="关闭"  id="DisableRow">'
                + '<i style="color:lightgrey;" class="font_ilean iconfont icon-jinyong3"></i>'
                + '</a>'
        }
    }
    return html;
}

//格式化查看日志
function functionFormatViewLog(data, type, item, meta) {
    return '<a href="javascript:;" class="btn blue has-tooltip" data-placement="bottom" title = "" data-original-title="查看"  id="ViewRow">'
        + '<i class="font_ilean iconfont icon-chakan"></i>'
        + '</a>'
}

//根据字符串转换为函数
function returnFunctionName(name) {
    switch (name) {
        case 'functionFormatCollectionTime':
            return functionFormatCollectionTime
        case 'functionFormatCreateTime':
            return functionFormatCreateTime
        case 'functionFormatType':
            return functionFormatType
        case 'functionFormatStatus':
            return functionFormatStatus
        case 'functionFormatCheckbox':
            return functionFormatCheckbox
        case 'functionFormatOperation':
            return functionFormatOperation
        case 'functionFormatViewLog':
            return functionFormatViewLog
    }
}

//下载模板
function DownloadTemplate() {
    window.open("/upload/template/采集点设置模板.xlsx");
}

//清除编辑表单数据
function ClearEditValue() {
    $("input[group=edit]").val('');
    parentCombotree.clear();
    handlerCombotree.clear();
}

//获取数据
function GetCollection() {
    var param = CheckWhere();
    $.ajax({
        url: '/api/minimes/Collection?rows=' + rows + '&page=' + page + '&sor=' + sort + '&order=' + order + param,
        beforeSend: jQueryShowLoading(),//显示加载图标
        success: function (value) {
            jQuery('body').hideLoading();//隐藏加载图标
            paging(value.total);
            $('#CollectionTable').html('');
            //数据获取失败直接退出
            if (!value.status)
                return false;

            //数据获取成功并加载数据
            var collections = [];
            $.each(value.rows, function (index, item) {
                var collection = {
                    Index: (index + 1),Id:item.Id, Item: JSON.stringify(item), Collection: item.Collection
                    , CollectionName: item.CollectionName, Function: item.Function
                    , Type: item.Type, Frequency: item.Frequency, ParentId: item.ParentId, ParentName: item.ParentName
                    , WarningTime: item.WarningTime, Handler: item.Handler, Cause: item.Cause
                    , Status: item.Status, Seq: item.Seq, CreatePerson: item.CreatePerson
                    , CreateTime: item.CreateTime, IsEnable: item.IsEnable
                    , CollectionTime: item.CollectionTime
                };
                //过滤不正确的产线名称
                if (!collection.ParentName)
                    collection.ParentName = '';

                collection.CreateTime = moments(collection.CreateTime).format('YYYY-MM-DD HH:mm');
                if (collection.CollectionTime) {
                    collection.CollectionTime = moments(collection.CollectionTime).format('YYYY-MM-DD HH:mm');
                } else {
                    collection.CollectionTime = '';
                }
                switch (collection.Type) {
                    case 'Plc': collection.Type = 'Plc'; break;
                    case 'Weight': collection.Type = '电子称'; break;
                    default: collection.Type = '其它'; break
                }
                switch (collection.Status) {
                    case '01': collection.Status = '运行中'; break;
                    case '02': collection.Status = '停止中'; break;
                    default: collection.Status = '其它'; break
                }
                collections.push(collection);
            });
            $('#CollectionTable').html($("#template-collection").render(collections));
            //数据加载后事件
            OnDataLoad();
        }
    });
}
//数据加载完成后事件
function OnDataLoad() {
    //启动或关闭采集点
    $("button[name=IsEnable]").click(function () {
        var data = $(this).attr("data");
        data=data === "1" ? "0" : "1";
        var Id = $(this).attr("Id");
        var value = { Id: Id, IsEnable: data };
        OpenOrCloseCollection(value);
    });

    //查看数据采集详情
    $("a[name=detail]").click(function () {
        var collectionId = $(this).attr("data");
        $("button[name=detail]").attr("data", collectionId);
        GetCollectionDataDetail(collectionId);
        $(".modal").modal("hide");
        $("#modal_detail").modal("show");
    });

    //编辑数据采集点
    $('button[name=edit]').click(function () {
        var row = $(this).attr("data");
        if (!row) {
            return false;
        }
        var row = JSON.parse(row);
        //采集点编码
        $('input[name=editCollection]').val(row.Collection);
        //采集点名称
        $('input[name=editCollectionName]').val(row.CollectionName);
        //采集类型
        $('select[name=editType]').val(row.Type);
        //父节点
        if (row.ParentId) {
            parentCombotree.setSelect($("[data-id=" + row.ParentId + "]"));
        }
        //用途
        $("input[name=editFunction]").val(row.Function);
        //排序号
        $("input[name=editSeq]").val(row.Seq);
        //采集频次
        row.Frequency = row.Frequency.trim();
        $("input[name=editFrequency]").val(row.Frequency.substring(0, row.Frequency.length - 1));
        $("select[name=editFrequencyUnit]").val(
            row.Frequency.substring(
                row.Frequency.length - 1,
                row.Frequency.length
            )
        );
        //报警阈值
        row.WarningTime = row.WarningTime.trim();
        $("input[name=editWarningTime]").val(
            row.WarningTime.substring(
                0, row.WarningTime.length - 1));
        $("select[name=editWarningTimeUnit]").val(
            row.WarningTime.substring(
                row.WarningTime.length - 1,
                row.WarningTime.length
            )
        );
        //责任人
        if (row.Handler) {
            handlerCombotree.setSelect($("[data-id=" + row.Handler + "]"));
        }
        //$("input[name=editHandler]").val(row.Handler);
        //异常原因
        $("input[name=editCause]").val(row.Cause);

        $(".modal").modal("hide");
        $("#modal_edit").modal("show");

        $('button[name=editSubmit]').attr("data", row.Id);
    });
}
function switchTimeUnit(unit) {
    switch (unit) {
        case 's': return '秒';
        case 'm': return '分';
        case 'h': return '时';
        case 'd': return '天';
        default: return '秒';
    }
}
//数据采集明细
function GetCollectionDataDetail(collectionId) {
    //var collectionId = $("button[name=detail]").attr("data");
    if (collectionId) {
        $("input[name=collectionTime]").attr("data", collectionId);
        $("#collectiondataquery").attr("data", collectionId);
    } else {
        collectionId = $("input[name=collectionTime]").attr("data");
    }
    var time = $("input[name=collectionTime]").val();
    $.ajax({
        url: '/api/minimes/Collectiondata?rows=5&page=' + pageDetail + "&CollectionId=" + collectionId +"&CreateTime="+time,
        beforeSend: jQueryShowLoading(),//显示加载图标
        success: function (value) {
            jQuery('body').hideLoading();//隐藏加载图标
            pagingDetail(value.total);
            $('#CollectionDetailTable').html('');
            if (!value.status)
                return false;
            var list = [];
            $.each(value.rows, function (index, item) {
                var row = {
                    Index: (index + 1), Id: item.Id, CollectionId: item.CollectionId
                    , Quantity: item.Quantity, LastValue: item.LastValue
                    , More: item.More, CreateTime: moments(item.CreateTime).format("YYYY-MM-DD HH:mm")
                }
                list.push(row);
            });
            $('#CollectionDetailTable').html($("#template-collectiondetail").render(list));
        }
    });
}
//编辑采集点
function EditCollection() {
    var data = CheckEdit();
    data.Id=$('button[name=editSubmit]').attr("data");
    if (!data.Collection) {
        return false;
    }
    $.ajax({
        url: '/api/minimes/collection/EditCollection',
        type: 'Post',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json',
        success: function (value) {
            if (value.status)
                window.location.reload();
            else
                toastr.warning(value.message);
        }
    });
}
//打开或关闭采集点
function OpenOrCloseCollection(data) {
    $.ajax({
        url: '/api/minimes/collection/EditOpenOrCloseCollection?Id=' + data.Id + '&IsEnable=' + data.IsEnable,
        type: 'Post',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json',
        success: function (value) {
            window.location.reload();
        }
    });
}
//多选删除
function DeleteCollection(data) {
    $.ajax({
        url: '/api/minimes/collection/EditDeleteList' ,
        type: 'Post',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json',
        success: function (value) {
            window.location.reload();
        }
    });
}
//获取产线
function WorkShopLine() {
    $.ajax({
        url: '/api/sys/line?TenantId=' + TenantId,
        success: function (value) {
            if (value.status) {
                var workShopName = value.rows[0].WorkShopName;
                var workShopId = value.rows[0].WorkShopId;
                var lines = [];
                var workshops = [];
                $.each(value.rows, function (index, item) {
                    if (item.WorkShopName !== workShopName) {
                        var workshop = { "id": workShopId, "title": workShopName, "subs": lines };
                        workshops.push(workshop);
                        workShopName = item.WorkShopName;
                        workshopId = item.WorkShopId
                        lines = [];
                    }
                    var line = { "id": item.LineId, "title": item.LineName };
                    lines.push(line);
                });
                if (lines.length > 0) {
                    var workshop = { "id": workShopId, "title": workShopName, "subs": lines };
                    workshops.push(workshop);
                }
                parentCombotree.setData(workshops);
                queryParentCombotree.setData(workshops);
            }
        }
    });
}
//获取部门
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
            }
        }
    });
}
//获取查询条件
function CheckWhere() {
    var param = '';
    if ($('input[name=findCollectionName]').val())
        param += '&CollectionName=' + $('input[name=findCollectionName]').val();
    //if ($('input[name=findParentId]').val())
    //    param += '&ParentId=' + $('input[name=findParentId]').val();
    if (queryParentCombotree.datas().length > 0) {
        param += '&ParentId=' + queryParentCombotree.datas()[0].id;
    }
    if ($('select[name=findStatus]').val())
        param += '&Status=' + $('select[name=findStatus]').val();
    return param;
}
//获取编辑框内容
function CheckEdit() {
    var row = {
        Id: '', TenantId: TenantId, Collection: '', CollectionName: ''
        , Function: '', Type: '', Frequency: '', ParentId: '', WarningTime: '0s'
        , Handler: '', Status: '01', Seq: '',Cause:''
    };
    var status = true;
    //采集点编码
    if ($('input[name=editCollection]').val()) {
        row.Collection=$('input[name=editCollection]').val()
    } else {
        status = false;
    }
    //采集点名称
    if ($('input[name=editCollectionName]').val()) {
        row.CollectionName = $('input[name=editCollectionName]').val()
    } else {
        status = false;
    }
    //采集类型
    if ($('select[name=editType]').val()) {
        row.Type = $('select[name=editType]').val()
    } else {
        status = false;
    }
    //父节点
    if (parentCombotree.datas().length > 0) {
        row.ParentId = parentCombotree.datas()[0].id;
    } else {
        status = false;
    }
    //用途
    if ($("input[name=editFunction]").val()) {
        row.Function = $("input[name=editFunction]").val()
    }
    //排序号
    if ($("input[name=editSeq]").val()) {
        row.Seq = $("input[name=editSeq]").val()
    }
    //采集频次
    if ($("input[name=editFrequency]").val()) {
        row.Frequency = $("input[name=editFrequency]").val() + $("select[name=editFrequencyUnit]").val();
    } else {
        status = false;
    }
    //报警阈值
    if ($("input[name=editWarningTime]").val()) {
        row.WarningTime = $("input[name=editWarningTime]").val() + $("select[name=editWarningTimeUnit]").val();
    }
    //父节点
    if (handlerCombotree.datas().length > 0) {
        row.Handler = handlerCombotree.datas()[0].id;
    } 
    //异常原因
    if ($("textarea[name=editCause]").val()) {
        row.Cause = $("textarea[name=editCause]").val();
    } 
    //如果必填字段都填写了周日正常返回
    if (status) {
        return row;
    }
    toastr.warning("必填字段不能为空");
    return {};
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
        pagefoot += "<li><select id='pageRowSelect' onselect='setRow()'><option value='5'>5</option><option value='10'>10</option><option value='20'>20</option></select></li>";
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
            GetCollection();
        }
    });
    $("a[name=" + page + "]").css("background-color", "#409eff");
    $("a[name=" + page + "]").css("color", "#fff");
}

function setRow() {
    rows = $('#pageRowSelect').val();
}

function pagejump(value) {
    if (value == 0)
        page = $("#pagejump").val();
    else
        page = value;
    GetCollection();
}

function switchdownpage() {
    if (page > 1)
        page--;

    GetCollection();
}

function switchuppage(totalpage) {
    if (page < totalpage)
        page++;

    GetCollection();
}

//数据采集分页
function pagingDetail(total) {
    var totalpage = Math.ceil(total / rows);
    $("#pageDetailfoot").html("");
    if (!(totalpage > 0))
        return false;
    var pagefoot = "<li><a href='#' onclick='switchDetaildownpage()'>«</a></li>";
    var startpage = page > 5 ? page - 5 : 1;
    var highpage = totalpage > 5 ? (5 + startpage) : totalpage;
    for (var i = startpage - 1; i < highpage; i++) {
        pagefoot += "<li><a href='#' detailname='" + (i + 1) + "' onclick='pageDetailjump(" + (i + 1) + ")'>" + (i + 1) + "</a></li>"
    }
    if (totalpage > 5) {
        pagefoot += "<li><select id='pageDetailRowSelect' onselect='setDetailRow()'><option value='5'>5</option><option value='10'>10</option><option value='20'>20</option></select></li>";
        pagefoot += "<li><a href='#' onclick='pageDetailjump(0)'>…</a></li>";
        pagefoot += "<li><a href='#' onclick='pageDetailjump(" + totalpage + ")'>" + totalpage + "</a></li>";
        pagefoot += "<li><input id='pageDetailjump' /><button onclick='pageDetailjump(0)'>跳转</button></li>";
    }
    pagefoot += "<li><a href='#' onclick='switchDetailuppage(" + totalpage + ")'>»</a></li>";
    $("#pageDetailfoot").html(pagefoot);
    $("#pageDetailjump").keyup(function (event) {
        if (event.keyCode == 13) {
            page = $("#pageDetailjump").val();
            GetCollectionDataDetail();
        }
    });
    $("a[detailname=" + pageDetail + "]").css("background-color", "#409eff");
    $("a[detailname=" + pageDetail + "]").css("color", "#fff");
}

function setDetailRow() {
    rows = $('#pageDetailRowSelect').val();
}

function pageDetailjump(value) {
    if (value <= 0)
        pageDetail = 1;
    else
        pageDetail = value;
    GetCollectionDataDetail();
}

function switchDetaildownpage() {
    if (pageDetail > 1)
        pageDetail--;

    GetCollectionDataDetail();
}

function switchDetailuppage(totalpage) {
    if (pageDetail < totalpage)
        pageDetail++;

    GetCollectionDataDetail();
}