
var rows = 7;
var page = 1;

$(function () {

    GetOrganizeUser();

    //获取抄送我的列表(全部)
    //GetMyCCAll();

    //获取抄送我的列表(未读)
    //GetMyCCNoReaded();

    var preview = new Preview({
        imgWrap: 'imageWrap' // 指定该容器里的图片点击预览
    });

    //table列初始化（未读）
    var columnsArray = [
        { "data": 'SmsId', "title": "<label style='text-align:center;'><input style='width:16px;height:16px;' type='checkbox' id='Allchecked'/><span class='lbl'></span></label>", "searchable": false, "width": "20px", "visible": true, "sortable": false, "render": functionFormatCheckbox },
        { "data": 'Message', "title": "主题", "searchable": false, "width": "120px", "visible": true, "sortable": false, "render": functionFormatMessage },
        { "data": 'AssigneeName', "title": "发送人", "searchable": false, "width": "120px", "visible": true, "sortable": false },
        { "data": 'SendTime', "title": "接收时间", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionFormatSendTime },
        { "data": 'IsEnded', "title": "状态", "searchable": false, "width": "120px", "visible": true, "sortable": false, "render": functionFormatStatus },
        { "data": 'ActionName', "title": "步骤名称", "searchable": false, "width": "120px", "visible": true, "sortable": false },
        { "data": 'SourceName', "title": "来源", "searchable": false, "width": "120px", "visible": true, "sortable": false },
        { "data": 'SourceId', "title": "操作", "searchable": false, "width": "120px", "visible": true, "sortable": false, "render": functionFormatOperation },
    ];

    //table列初始化（全部）
    var columnsArray2 = [
        { "data": 'Message', "title": "主题", "searchable": false, "width": "120px", "visible": true, "sortable": false, "render": functionFormatMessage },
        { "data": 'AssigneeName', "title": "发送人", "searchable": false, "width": "120px", "visible": true, "sortable": false },
        { "data": 'SendTime', "title": "接收时间", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionFormatSendTime },
        { "data": 'IsEnded', "title": "状态", "searchable": false, "width": "120px", "visible": true, "sortable": false, "render": functionFormatStatus },
        { "data": 'ActionName', "title": "步骤名称", "searchable": false, "width": "120px", "visible": true, "sortable": false },
        { "data": 'SourceName', "title": "来源", "searchable": false, "width": "120px", "visible": true, "sortable": false },
        { "data": 'SourceId', "title": "操作", "searchable": false, "width": "120px", "visible": true, "sortable": false, "render": functionFormatOperation },
    ];

    //从缓存中获取列的配置文件（未读）
    var columnsArrayStorage = JSON.parse(localStorage.getItem(txtCurrentUserStorageName));
    if (localStorage && columnsArrayStorage) {
        for (var i = 0; i < columnsArrayStorage.length; i++) {
            if (columnsArrayStorage[i].renderValue != undefined) {
                columnsArrayStorage[i].render = returnFunctionName(columnsArrayStorage[i].renderValue);
            }
        }
        columnsArray = columnsArrayStorage;
    }

    //从缓存中获取列的配置文件（全部）
    var columnsArrayStorage2 = JSON.parse(localStorage.getItem(txtCurrentUserStorageName2));
    if (localStorage && columnsArrayStorage2) {
        for (var i = 0; i < columnsArrayStorage2.length; i++) {
            if (columnsArrayStorage2[i].renderValue != undefined) {
                columnsArrayStorage2[i].render = returnFunctionName(columnsArrayStorage2[i].renderValue);
            }
        }
        columnsArray2 = columnsArrayStorage2;
    }

    //datatables 参数配置（未读）
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
            "url": "/api/Self/My/EditCCMyTask",
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "data": function (d) {
                d.id = UserId;
                d.SourceModel = $("#txtSourceModel").val();
                d.Message = $("#txtMessage").val();
                d.DateTime = $("#txtDateTime").val();
                d.IsEnded = $("#txtIsEnded").val();
                d.TenantId = TenantId;
                d.IsRead = 0;
                var Assignee = "";
                if (queryAssigneeCombotree.datas().length > 0) {
                    Assignee = queryAssigneeCombotree.datas()[0].id;
                }
                d.Assignee = Assignee;
                return JSON.stringify(d);
            }
        },
        "aaSorting": [[3, "desc"]],//默认第几个排序
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
            },
            {
                text: '<i class="font_ilean iconfont icon-bianji1" style="font-size:14px;">标记为已读</i>',
                action: function (e, dt, node, config) {
                    EditTaskReaded();
                }
            }
        ],
        //"columnDefs": [{
        //    "targets": 7,//第7列
        //    "render": function (data, type, row, meta) {
        //        return '<a href="javascript:;" class="btn blue" id="EditRow">'
        //            + '<i class="fa fa-edit">查看</i>'
        //            + '</a>'
        //    }
        //    },
        //    {
        //        "targets": 0,//第1列
        //        "render": function (data, type, row, meta) {
        //            return '<label style="text-align:center;"><input style="width:16px;height:16px;" type="checkbox" name="checkBox1" value="' + row.SmsId + '"/><span class="lbl"></span></label>'
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

    //datatables 参数配置（全部）
    var datatableSetting2 = {
        //"dom": 'Bfrtip',
        "bPaginate": true, //翻页功能
        "bLengthChange": true, //改变每页显示数据数量
        colReorder: true,
        "processing": true,     //开启加载等待提示，提示信息是下面language中的sProcessing配置
        "serverSide": true,     //打开服务器模式
        "bDestroy": true,
        "scrollX": true,
        "ajax": {
            "url": "/api/Self/My/EditCCMyTask",
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "data": function (d) {
                d.id = UserId;
                d.SourceModel = $("#txtSourceModel").val();
                d.Message = $("#txtMessage").val();
                d.DateTime = $("#txtDateTime").val();
                d.IsEnded = $("#txtIsEnded").val();
                d.TenantId = TenantId;
                d.IsRead = 2;
                var Assignee = "";
                if (queryAssigneeCombotree.datas().length > 0) {
                    Assignee = queryAssigneeCombotree.datas()[0].id;
                }
                d.Assignee = Assignee;
                return JSON.stringify(d);
            }
        },
        "aaSorting": [[2, "desc"]],//默认第几个排序
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
        //"columnDefs": [{
        //    "targets": 6,//第6列
        //    "render": function (data, type, row, meta) {
        //        return '<a href="javascript:;" class="btn blue" id="EditRow">'
        //            + '<i class="fa fa-edit">查看</i>'
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

    //页面数据初始化（未读）
    var table = $('#dataList').DataTable(datatableSetting);

    //页面数据初始化（全部）
    var table2 = $('#dataList2').DataTable(datatableSetting2);

    //初始化弹出框内容（未读）
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

    //初始化弹出框内容（全部）
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

    //修改弹出框序号（未读）
    for (var i = 0; i < $('#tableColShowHide tbody tr').length; i++) {
        $('#tableColShowHide tbody tr:eq(' + i + ') td:eq(0)').html((i + 1));
    }

    //修改弹出框序号（全部）
    for (var i = 0; i < $('#tableColShowHide2 tbody tr').length; i++) {
        $('#tableColShowHide2 tbody tr:eq(' + i + ') td:eq(0)').html((i + 1));
    }

    //弹出框确定按钮事件（未读）
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
                "url": "/api/Self/My/EditCCMyTask",
                "type": "POST",
                "contentType": "application/json; charset=utf-8",
                "data": function (d) {
                    d.id = UserId;
                    d.SourceModel = $("#txtSourceModel").val();
                    d.Message = $("#txtMessage").val();
                    d.DateTime = $("#txtDateTime").val();
                    d.IsEnded = $("#txtIsEnded").val();
                    d.TenantId = TenantId;
                    d.IsRead = 0;
                    var Assignee = "";
                    if (queryAssigneeCombotree.datas().length > 0) {
                        Assignee = queryAssigneeCombotree.datas()[0].id;
                    }
                    d.Assignee = Assignee;
                    return JSON.stringify(d);
                }
            },
            "aaSorting": [[3, "desc"]],//默认第几个排序
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
                    text: '<i class="font_ilean iconfont icon-bianji1" style="font-size:14px;">标记为已读</i>',
                    action: function (e, dt, node, config) {
                        EditTaskReaded();
                    }
                }
            ],
            //"columnDefs": [{
            //    "targets": 7,//第7列
            //    "render": function (data, type, row, meta) {
            //        return '<a href="javascript:;" class="btn blue" id="EditRow">'
            //            + '<i class="fa fa-edit">查看</i>'
            //            + '</a>'
            //    }
            //},
            //{
            //    "targets": 0,//第1列
            //    "render": function (data, type, row, meta) {
            //        return '<label style="text-align:center;"><input style="width:16px;height:16px;" type="checkbox" name="checkBox1" value="' + row.SmsId + '"/><span class="lbl"></span></label>'
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

    //弹出框确定按钮事件（全部）
    $("#btnConfirmContent2").click(function () {
        var newColumnsArray = new Array();
        for (var i = 0; i < $("#tableColShowHide2 tbody tr").length; i++) {
            var rows = $("#tableColShowHide2 tbody tr:eq(" + i + ")");
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
            "ajax": {
                "url": "/api/Self/My/EditCCMyTask",
                "type": "POST",
                "contentType": "application/json; charset=utf-8",
                "data": function (d) {
                    d.id = UserId;
                    d.SourceModel = $("#txtSourceModel").val();
                    d.Message = $("#txtMessage").val();
                    d.DateTime = $("#txtDateTime").val();
                    d.IsEnded = $("#txtIsEnded").val();
                    d.TenantId = TenantId;
                    d.IsRead = 2;
                    var Assignee = "";
                    if (queryAssigneeCombotree.datas().length > 0) {
                        Assignee = queryAssigneeCombotree.datas()[0].id;
                    }
                    d.Assignee = Assignee;
                    return JSON.stringify(d);
                }
            },
            "aaSorting": [[2, "desc"]],//默认第几个排序
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
            //"columnDefs": [{
            //    "targets": 6,//第6列
            //    "render": function (data, type, row, meta) {
            //        return '<a href="javascript:;" class="btn blue" id="EditRow">'
            //            + '<i class="fa fa-edit">查看</i>'
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

    //上移行的事件（未读）
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

    //上移行的事件（全部）
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

    //下移行的事件（未读）
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

    //下移行的事件（全部）
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

    //未读
    $("#NoReaded").click(function () {
        table.ajax.reload(null, true); // user paging is not reset on reload
    });

    //全部
    $("#All").click(function () {
        table2.ajax.reload(null, true); // user paging is not reset on reload
    });

    //查询按钮事件
    $("#btnQuery").click(function () {
        //table.fnClearTable();//清空数据.fnClearTable();//清空数据
        //table.fnDestroy(); //还原初始化了的datatable
        table.ajax.reload(null, true); // user paging is not reset on reload
        //$('#dataList').DataTable(datatableSetting);
        //table.fnClearTable();//清空数据.fnClearTable();//清空数据
        //table.fnDestroy(); //还原初始化了的datatable
        table2.ajax.reload(null, true); // user paging is not reset on reload
        //$('#dataList').DataTable(datatableSetting);
    });

    //清空
    $("#btnClear").click(function () {
        $("#txtSourceModel").val("");
        $("#txtMessage").val("");
        $("#txtIsEnded").val("");
        $("#txtDateTime").val("");
        queryAssigneeCombotree.clear();
    })

    //查看详情（未读）
    $('#dataList tbody').on('click', 'a#EditRow', function () {
        var data = $('#dataList').DataTable().row($(this).parents('tr')).data();
        $.ajax({
            url: '/api/andon2/flowable/GetCCToMeInstance?id=' + data.SourceId,
            success: function (value) {
                if (value.status) {
                    //初始化页面任务详情
                    ExceptionDetail(value.rows);
                    //任务节点详情
                    GetDetail(value.rows);
                    //图片
                    GetImage(value.rows.ID);
                    //弹框显示
                    $("#modal_xq").modal("show");
                } else {
                    toastr.warning(value.message);
                }
            }
        });
    });

    //查看详情（全部）
    $('#dataList2 tbody').on('click', 'a#EditRow', function () {
        var data = $('#dataList2').DataTable().row($(this).parents('tr')).data();
        $.ajax({
            url: '/api/andon2/flowable/GetCCToMeInstance?id=' + data.SourceId,
            success: function (value) {
                if (value.status) {
                    //初始化页面任务详情
                    ExceptionDetail(value.rows);
                    //任务节点详情
                    GetDetail(value.rows);
                    //图片
                    GetImage(value.rows.ID);
                    //弹框显示
                    $("#modal_xq").modal("show");
                } else {
                    toastr.warning(value.message);
                }
            }
        });
    });

    //标记为已读
    function EditTaskReaded() {
        var checkedBox = $("input[name='checkBox1']:checked");
        if (checkedBox.length == 0) {
            toastr.warning("请先勾选要标记为已读的数据。")
            return;
        } else {
            var arrs = new Array();
            $('input[name="checkBox1"]:checked').each(function () {
                arrs.push($(this).val());
            });
            var data = [{ "id": arrs.join(",") }];
            $.ajax({
                url: "/api/Self/My/EditTaskReaded",
                type: 'POST',
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
                async: false,
                success: function (value) {
                    if (value.status == true) {
                        toastr.success('更新成功！');
                        //刷新列表
                        table.ajax.reload(null, false); // user paging is not reset on reload
                        table2.ajax.reload(null, false); // user paging is not reset on reload
                    }
                    else {
                        toastr.error(value.message);
                    }
                },
                error: function () {
                    toastr.error("保存失败，请重新保存。");
                }
            });
        }
    }

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
});

//格式化时间
function functionFormatSendTime(data, type, full, meta) {
    var SendTime = "";
    if (data) {
        SendTime = moment(data).format("YYYY-MM-DD HH:mm:ss");
    }
    return SendTime;
}

//格式化异常描述
function functionFormatMessage(data, type, item, meta) {
    var td = "";
    if (item.IsRead == "0") {
        var Message = "";
        if (item.Message.length > 30) {
            Message = item.Message.substring(0, 30) + "...";
            td = "<span ><b  style='color:red;font-size:18px;padding:0 !important;margin:0'>●<b>" + "<b style='padding:0 !important;font-size:14px;color:#222;font-weight:normal'>" + Message + "</b></span>";
        }
        else {
            td = "<span ><b  style='color:red;font-size:18px;padding:0 !important;margin:0'>●<b>" + "<b style='padding:0 !important;font-size:14px;color:#222;font-weight:normal'>" + item.Message + "</b></span>";
        }
    }
    else {
        var Message = "";
        if (item.Message.length > 30) {
            Message = item.Message.substring(0, 30) + "...";
            td = "<span>" + Message + "</span>";
        }
        else {
            td = "<span>" + item.Message + "</span>";
        }
    }
    return td;
}

//格式化状态
function functionFormatStatus(data, type, full, meta) {
    var IsEnded = "";
    if (data != null && data != '') {
        if (data == "0") {
            IsEnded = "流转中";
        }
        else if (data == "1") {
            IsEnded = "已完结";
        }
    }
    return IsEnded;
}

//格式化操作
function functionFormatOperation(data, type, item, meta) {
    return '<a href="javascript:;" class="btn has-tooltip blue" data-placement="bottom" title="" data-original-title="查看" id="EditRow">'
        + '<i class="font_ilean iconfont icon-chakan1"></i>'
        + '</a>'
}

//格式化复选框
function functionFormatCheckbox(data, type, item, meta) {
    return "<label style='text-align:center;'><input style='width:16px;height:16px;' type='checkbox' name='checkBox1' value='" + item.SmsId + "'/><span class='lbl'></span></label>";
}

//根据字符串转换为函数
function returnFunctionName(name) {
    switch (name) {
        case 'functionFormatSendTime':
            return functionFormatSendTime
        case 'functionFormatMessage':
            return functionFormatMessage
        case 'functionFormatStatus':
            return functionFormatStatus
        case 'functionFormatOperation':
            return functionFormatOperation
        case 'functionFormatCheckbox':
            return functionFormatCheckbox
    }
}

var queryAssigneeCombotree = CreateComboTree('queryAssignee');

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
                queryAssigneeCombotree.setData(organizes);
            }
        }
    });
}

//获取抄送我的列表(全部)
function GetMyCCAll() {
    var SourceModel = "";
    var Message = "";
    var DateTime = "";
    var Assignee = "";
    var IsEnded = "";
    if ($("#txtSourceModel").val()) {
        SourceModel = $("#txtSourceModel").val();
    }
    if ($("#txtStatus").val()) {
        Status = $("#txtStatus").val();
    }
    if ($("#txtMessage").val()) {
        Message = $("#txtMessage").val();
    }
    if ($("#txtDateTime").val()) {
        DateTime = $("#txtDateTime").val();
    }
    if (queryAssigneeCombotree.datas().length > 0) {
        Assignee = queryAssigneeCombotree.datas()[0].id;
    }
    if ($("#txtIsEnded").val()) {
        IsEnded = $("#txtIsEnded").val();
    }
    $.ajax({
        type: 'get',
        url: '/api/Self/My/GetCCMyTask?rows=' + rows + '&page=' + page + '&SourceModel=' + SourceModel + '&Message=' + Message + '&DateTime=' + DateTime + '&TenantId=' + TenantId + '&id=' + UserId + '&IsRead=' + "2" + '&Assignee=' + Assignee + '&IsEnded=' + IsEnded,
        async: true,
        beforeSend: jQueryShowLoading(),//显示加载图标
        success: function (value) {
            jQuery('body').hideLoading();//隐藏加载图标
            paging(value.total);
            $("#tbodyContent1").html("");
            if (value.status) {
                var html = '';
                $.each(value.rows, function (index, item) {
                    var SendTime = "";
                    if (item.SendTime != "" && item.SendTime != null) {
                        SendTime = moment(item.SendTime).format("YYYY-MM-DD HH:mm");
                    }
                    //标记"未读"为小红圆点
                    var td = "";
                    if (item.IsRead == "0") {
                        var Message = "";
                        if (item.Message.length > 30) {
                            Message = item.Message.substring(0, 30) + "...";
                            td = "<span ><b  style='color:red;font-size:18px;padding:0 !important;margin:0'>●<b>" + "<b style='padding:0 !important;font-size:14px;color:#222;font-weight:normal'>" + Message + "</b></span>";
                        }
                        else {
                            td = "<span ><b  style='color:red;font-size:18px;padding:0 !important;margin:0'>●<b>" + "<b style='padding:0 !important;font-size:14px;color:#222;font-weight:normal'>" + item.Message + "</b></span>";
                        }               
                    }
                    else {
                        var Message = "";
                        if (item.Message.length > 30) {
                            Message = item.Message.substring(0, 30) + "...";
                            td = "<span>" + Message + "</span>";
                        }
                        else {
                            td = "<span>" + item.Message + "</span>";
                        }
                    }
                    var IsEnded = "";
                    if (item.IsEnded != null && item.IsEnded != '') {
                        if (item.IsEnded == "0") {
                            IsEnded = "流转中";
                        }
                        else if (item.IsEnded == "1") {
                            IsEnded = "已完结";
                        }
                    }
                    var Index = (index + (page - 1) * rows + 1);
                    html += "<tr>";
                    html += "<td>" + Index + "</td>";               
                    html += "<td>" + td + "</td>";
                    html += "<td>" + item.AssigneeName + "</td>";
                    html += "<td>" + SendTime + "</td>";
                    html += "<td>" + IsEnded + "</td>";
                    html += "<td>" + item.ActionName + "</td>";
                    html += "<td>" + item.SourceName + "</td>";
                    html += "<td>";
                    html += "<div class='enpaty_btn' style = 'padding:0px 0px 0px 0px'>";
                    html += "<div class='color-btn btn' data-toggle='modal' href = '#modal_xq' type='button'  onclick=\"EditView('" + item.SourceId + "')\">查看</div >";
                    html += "</div>";
                    html += "</td >";
                    html += "</tr>";
                });
                $("#tbodyContent1").html(html);
            }
            else {
                //alert(value.message);
                toastr.error(value.message);
            }
        }
    });
}


//分页方法
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
            GetMyCCAll();
        }
    });
    $("a[name=" + page + "]").css("background-color", "#5b9dff");
}

function pagejump(value) {
    if (value == 0)
        page = $("#pagejump").val();
    else
        page = value;
    GetMyCCAll();
}

function switchdownpage() {
    if (page > 1)
        page--;
    GetMyCCAll();
}

function switchuppage(totalpage) {
    if (page < totalpage)
        page++;
    GetMyCCAll();
}

//获取抄送我的列表(未读)
function GetMyCCNoReaded() {
    var SourceModel = "";
    var Message = "";
    var DateTime = "";
    var Assignee = "";
    var IsEnded = "";
    if ($("#txtSourceModel").val()) {
        SourceModel = $("#txtSourceModel").val();
    }
    if ($("#txtMessage").val()) {
        Message = $("#txtMessage").val();
    }
    if ($("#txtDateTime").val()) {
        DateTime = $("#txtDateTime").val();
    }
    if (queryAssigneeCombotree.datas().length > 0) {
        Assignee = queryAssigneeCombotree.datas()[0].id;
    }
    if ($("#txtIsEnded").val()) {
        IsEnded = $("#txtIsEnded").val();
    }
    $.ajax({
        type: 'get',
        url: '/api/Self/My/GetCCMyTask?rows=' + rows + '&page=' + page + '&SourceModel=' + SourceModel + '&Message=' + Message + '&DateTime=' + DateTime + '&TenantId=' + TenantId + '&id=' + UserId + '&IsRead=' + "0" + '&Assignee=' + Assignee + '&IsEnded=' + IsEnded,
        async: true,
        success: function (value) {
            paging1(value.total);
            $("#tbodyContent").html("");
            if (value.status) {
                var html = '';
                $.each(value.rows, function (index, item) {
                    var SendTime = "";
                    if (item.SendTime != "" && item.SendTime != null) {
                        SendTime = moment(item.SendTime).format("YYYY-MM-DD HH:mm");
                    }
                    var IsEnded = "";
                    if (item.IsEnded != null && item.IsEnded != '') {
                        if (item.IsEnded == "0") {
                            IsEnded = "流转中";
                        }
                        else if (item.IsEnded == "1") {
                            IsEnded = "已完结";
                        }
                    }
                    var Message = "";
                    if (item.Message.length > 30) {
                        Message = item.Message.substring(0, 30) + "...";
                    }
                    else {
                        Message = item.Message;
                    }
                    var Index = (index + (page - 1) * rows + 1);
                    html += "<tr>";
                    html += "<td><div style='text-align:center;'><input type='checkbox' style='width:16px;height:16px;' value='" + item.SmsId + "'/></div></td>";
                    html += "<td>" + Index + "</td>";      
                    html += "<td>" + Message + "</td>";
                    html += "<td>" + item.AssigneeName + "</td>";
                    html += "<td>" + SendTime + "</td>";
                    html += "<td>" + IsEnded + "</td>";
                    html += "<td>" + item.ActionName + "</td>";
                    html += "<td>" + item.SourceName + "</td>";
                    html += "<td>";
                    html += "<div class='enpaty_btn' style = 'padding:0px 0px 0px 0px'>";
                    html += "<div class='color-btn btn' data-toggle='modal' href = '#modal_xq' type='button'  onclick=\"EditView('" + item.SourceId + "')\">查看</div >";
                    html += "</div>";
                    html += "</td >";
                    html += "</tr>";
                });
                $("#tbodyContent").html(html);
            }
            else {
                //alert(value.message);
                toastr.error(value.message);
            }
        }
    });
}

//分页方法
function paging1(total) {
    var totalpage = Math.ceil(total / rows);
    var pagefoot = "<li><a href='#' onclick='switchdownpage1()'>«</a></li>";
    var startpage = page > 5 ? page - 5 : 1;
    var highpage = totalpage > 5 ? (5 + startpage) : totalpage;
    for (var i = startpage - 1; i < highpage; i++) {
        pagefoot += "<li><a href='#' name='" + (i + 1) + "' onclick='pagejump1(" + (i + 1) + ")'>" + (i + 1) + "</a></li>"
    }
    if (totalpage > 5) {
        pagefoot += "<li><a href='#' onclick='pagejump1(0)'>…</a></li>";
        pagefoot += "<li><a href='#' onclick='pagejump1(" + totalpage + ")'>" + totalpage + "</a></li>";
        pagefoot += "<li><input style='width:20px;height:20px;font-size:5px;' id='pagejump1' /><button onclick='pagejump(0)'>跳转</button></li>";
    }
    pagefoot += "<li><a href='#' onclick='switchuppage1(" + totalpage + ")'>»</a></li>";
    $("#pagefoot1").html(pagefoot);
    $("#pagejump1").keyup(function (event) {
        if (event.keyCode == 13) {
            page = $("#pagejump1").val();
            GetMyCCNoReaded();
        }
    });
   
    $("a[name=" + page + "]").css("background-color", "#409eff");
    $("a[name=" + page + "]").css("color", "#fff");
}

function pagejump1(value) {
    if (value == 0)
        page = $("#pagejump").val();
    else
        page = value;
    GetMyCCNoReaded();
}

function switchdownpage1() {
    if (page > 1)
        page--;
    GetMyCCNoReaded();
}

function switchuppage1(totalpage) {
    if (page < totalpage)
        page++;
    GetMyCCNoReaded();
}

//查询
$("#btnQuery").click(function () {
    page = 1;
    GetMyCCAll();
    GetMyCCNoReaded();
});

//全选
$("#AllChecked").click(function () {
    if ($(this).is(":checked")) {
        $("tbody input[type=checkbox]").attr("checked", true);
    } else {
        $("tbody input[type=checkbox]").attr("checked", false);
    }
});

//标记为已读
$("#btnEditTaskReaded").click(function () {
    var arrs = new Array();
    $("input[type='checkbox']").each(function () {
        if ($(this).is(":checked")) {
            arrs.push($(this).val());
        }
    });
    if (arrs.join(",").length == 0) {
        toastr.warning("请先勾选要标记为已读的数据。");
    }
    else {
        var data = [{ "id": arrs.join(",") }];
        $.ajax({
            url: "/api/Self/My/EditTaskReaded",
            type: 'POST',
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            async: false,
            success: function (value) {
                if (value.status == true) {
                    toastr.success('更新成功！');
                    //刷新列表
                    GetMyCCNoReaded();
                    GetMyCCAll();
                }
                else {
                    toastr.error(value.message);
                }
            },
            error: function () {
                toastr.error("保存失败，请重新保存。");
            }
        });
    }
});


//查看详情
function EditView(ID) {
    $.ajax({
        url: '/api/andon2/flowable/GetCCToMeInstance/' + ID,
        success: function (value) {
            if (value.status) {
                //初始化页面任务详情
                ExceptionDetail(value.rows);
                //任务节点详情
                GetDetail(value.rows);
                //图片
                GetImage(value.rows.ID);
            } else {
                toastr.warning(value.message);
            }
        }
    });
}

//格式化时间
function formatDateTime(date) {
    var arr = date.split("T");
    var d = arr[0];
    var darr = d.split('-');
    var t = arr[1];
    var tarr = t.split('.000');
    var marr = tarr[0].split(':');
    var dd = parseInt(darr[0]) + "/" + parseInt(darr[1]) + "/" + parseInt(darr[2]) + " " + parseInt(marr[0]) + ":" + parseInt(marr[1]) + ":" + parseInt(marr[2]);
    return dd;
}

//填写任务明细
function ExceptionDetail(data) {
    if (data.CallUserName) {
        $("#txtCallUserName").html(data.CallUserName);
        $("#txtCallUserName1").html(data.CallUserName);
    }
    if (data.CallOrganizeName) {
        $("#txtCallOrganizeName").html(data.CallOrganizeName);
    }
    $("#txtCallTime").html(moments(data.CallTime).format("YYYY-MM-DD HH:mm"));
    $("#txtAddress").html(data.Address);
    $("#txtException").html(data.Exception);
    if (data.HandlerName) {
        $("#txtHandlerName").html(data.HandlerName);
        $("#txtHandlerName1").html(data.HandlerName);
        $("#txtHandlerName2").html(data.HandlerName);
    }
    if (data.ArrivedTime) {
        $("#txtArrivedTime").html(moments(data.ArrivedTime).format("YYYY-MM-DD HH:mm"));
        $("#txtArrivedTime1").html(moments(data.ArrivedTime).format("YYYY-MM-DD HH:mm"));
    }
    if (data.RelievedTime) {
        $("#txtRelievedTime").html(moments(data.RelievedTime).format("YYYY-MM-DD HH:mm"));
    }
    if (data.Score) {
        $("#txtScore").html(data.Score);
    }
    if (data.SubmitionTime) {
        $("#txtSubmitionTime").html(moments(data.SubmitionTime).format("YYYY-MM-DD HH:mm"));
    }
    if (data.ExceptionClass) {
        $("#txtExceptionClass").html(data.ExceptionClass);
    }
    if (data.EquipmentId) {
        $("#txtEquipmentCode").html(data.EquipmentId);
    }
    if (data.ExceptionInfo) {
        $("#txtExceptionInfo").html(data.ExceptionInfo);
    }
    if (data.HandOrganizeName) {
        $("#txtHandOrganizeName").html(data.HandOrganizeName);
    }
    if (data.Cause) {
        $("#txtCause").html(data.Cause);
    }
    if (data.Measure) {
        $("#txtMeasure").html(data.Measure);
    }
    if (data.Suggestion) {
        $("#txtSuggestion").html(data.Suggestion);
    }
    if (data.AuditorName) {
        $("#txtAuditorName").html(data.AuditorName);
    }
    if (data.AuditingTime) {
        $("#txtAuditingTime").html(moments(data.AuditingTime).format("YYYY-MM-DD HH:mm"));
    }
    if (data.IsPass === "1") {
        $("#txtIsPass").html("审核通过");
    }
    if (data.IsPass === "0") {
        $("#txtIsPass").html("驳回");
    }
    if (data.Comments) {
        $("#txtComments").html(data.Comments);
    }
}

//任务节点详情
function GetDetail(data) {
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
    $("#Detail").html($("#template-detail").render(rows));
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
                    $("#imageWrap").html(image);

                    //var preview = new Preview({
                    //    imgWrap: 'imageWrap' // 指定该容器里的图片点击预览
                    //});
                }
            }
        });
    }
}

//获取所有人
function GetAllUser() {
    $.ajax({
        url: '/api/sys/user/GetAllUser?TenantId=' + TenantId,
        success: function (value) {
            if (value.total > 0) {
                $("#txtAssignee").append("<option value=\"\">==请选择==</option>");
                $("#txtAssignee").append(value.rows.map((x) => "<option value=" + x.UserId + ">" + x.UserName + "</option>"));
            }
        }
    });
}