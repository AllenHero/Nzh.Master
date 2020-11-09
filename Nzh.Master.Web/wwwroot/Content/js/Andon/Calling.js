var workplace = JSON.parse(getCookie("workplace"));
var page = 1;
var rows = 7;
var LineCode = workplace.LineCode;
var totalpage = 1;

$(function () {
   
    //table列初始化
    var columnsArray = [
        { "data": 'Status', "title": "状态", "searchable": false, "width": "100px", "visible": true, "sortable": true, "render": functionStatus },
        { "data": 'StationName', "title": "工位", "searchable": false, "width": "120px", "visible": true, "sortable": true},
        { "data": 'ExceptionName', "title": "异常信息", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'CallUserName', "title": "呼叫人", "searchable": false, "width": "120px", "visible": true, "sortable": true },

        { "data": 'HandleUserName', "title": "责任人", "searchable": false, "width": "120px", "visible": true, "sortable": true},
        { "data": 'CallTime', "title": "呼叫时间", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionCallTime },

        { "data": 'ResponseTime', "title": "响应时长", "searchable": false, "width": "120px", "visible": true, "sortable": false, "render": functionCallLang },
        { "data": 'RelieveTime', "title": "处理时长", "searchable": false, "width": "120px", "visible": true, "sortable": false, "render": functionHandLang },

    ];

    var post = {
        "url": "/api/Andon/andon/EditPageList",
        "type": "POST",
        "contentType": "application/json; charset=utf-8",
        "data": function (d) {
            d.LineCode = LineCode;
            d.Status = 6;
            d.CallTime = moments().format("YYYY-MM-DD");
            d.TenantId = TenantId; 
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
        table.ajax.reload(null, true); 
        return false;
    });
});
//列自定义显示格式
function functionStatus(data, type, full, meta) {

    var Status = full.Status;
     
    var text = '';
    var Red = false;
    var Yellow = false;
    
    if (Status == 1) {
        text = "呼叫中";
        Red = true;
    }
    else if (Status == 5) {
        text = "处理中";
        Yellow = true;
    }
    else if (Status == 10)
        text = "已完成";
    else if (Status == 15)
        text = "已完成";
    if (Red) {
        return '<b class="cl-red">' + text + '</b>';
    }
    else if (Yellow) {
        return '<b class="cl-yellow">' + text + '</b>';
    }
    else {
        return text;
    } 
}

function functionCallTime(data, type, full, meta) {
    var CallTime = full.CallTime;
    return moments(CallTime).format("YYYY-MM-DD HH:mm");
}
function functionCallLang(data, type, item, meta) {
    var time = 0;
    if (!item.ResponseTime) {
        time = moments(moments()).diff(item.CallTime, 'minutes');
    } else {
        time = moments(item.ResponseTime).diff(moments(item.CallTime), 'minutes')
    }
    if (time >= 1440) {
        time = (time * 1.0 / 1440).toFixed(1) + '(D)';
    } else if (time >= 60) {
        time = (time * 1.0 / 60).toFixed(1) + '(H)';
    } else {
        time += "(min)"
    }
    return time;
}
function functionHandLang(data, type, item, meta) {
    var RelieveTime = 0;
    if (!item.RelieveTime) {
        if (!item.ResponseTime)
            RelieveTime = '==';
        else
            RelieveTime = moments(moments()).diff(item.ResponseTime, 'minutes');
    } else {
        if (!item.ResponseTime)
            RelieveTime = '==';
        else
            RelieveTime = moments(item.RelieveTime).diff(moments(item.ResponseTime), 'minutes')
    }

    if (RelieveTime >= 1440) {
        RelieveTime = (RelieveTime * 1.0 / 1440).toFixed(1) + '(D)';
    } else if (RelieveTime >= 60) {
        RelieveTime = (RelieveTime * 1.0 / 60).toFixed(1) + '(H)';
    } else {
        RelieveTime += "(min)";
    }
    return RelieveTime;
}

//根据字符串转换为函数
function returnFunctionName(name) {
    switch (name) {
        case 'functionStatus':
            return functionStatus
        case 'functionCallTime':
            return functionCallTime
        case 'functionCallLang':
            return functionCallLang
        case 'functionHandLang':
            return functionHandLang
    }
}

 