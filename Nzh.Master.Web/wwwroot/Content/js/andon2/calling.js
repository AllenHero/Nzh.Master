$(function () {

    //table列初始化
    var columnsArray = [
        { "data": 'Exception', "title": "异常描述", "searchable": false, "width": "120px", "visible": true, "sortable": false, "render": functionFormatException }, 
        { "data": 'Status', "title": "状态", "searchable": false, "width": "100px", "visible": true, "sortable": false, "render": functionStatus },
        { "data": 'CallUserName', "title": "呼叫人", "searchable": false, "width": "120px", "visible": true, "sortable": false},
        { "data": 'ProductCode', "title": "产品代码", "searchable": false, "width": "120px", "visible": true, "sortable": false },
        { "data": 'HandlerName', "title": "处理人", "searchable": false, "width": "120px", "visible": true, "sortable": false },
        { "data": 'CallTime', "title": "发起时间", "searchable": false, "width": "120px", "visible": true, "sortable": false, "render": functionCallTime},
        { "data": 'ArrivedTimeStr', "title": "响应时间", "searchable": false, "width": "120px", "visible": true, "sortable": false},
        { "data": 'NowDateTimeStr', "title": "处理时间", "searchable": false, "width": "120px", "visible": true, "sortable": false},

    ];

    var post = {
        "url": "/api/Andon2/andon/EditPageList",
        "type": "POST",
        "contentType": "application/json; charset=utf-8",
        "data": function (d) {
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

//获取当前时间
function CurentTime() {
    var now = new Date();
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var ss = now.getSeconds();           //秒
    var clock = year + "-";
    if (month < 10)
        clock += "0";
    clock += month + "-";
    if (day < 10)
        clock += "0";
    clock += day + " ";
    if (hh < 10)
        clock += "0";
    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm + ":";
    if (ss < 10) clock += '0';
    clock += ss;
    return (clock);
}

//计算时间差
function getYMDHMS(startTime, endTime) {
    var result = "";
    if (startTime.length < 14 || endTime.length < 14) {
        return result = "";
    }
    else {
        var startArr = [startTime.substring(0, 4), startTime.substring(4, 6), startTime.substring(6, 8), startTime.substring(8, 10), startTime.substring(10, 12), startTime.substring(12, 14)];//切分开始时间为数组
        var endArr = [endTime.substring(0, 4), endTime.substring(4, 6), endTime.substring(6, 8), endTime.substring(8, 10), endTime.substring(10, 12), endTime.substring(12, 14)];//切分结束时间为数组
        var dateStart = new Date(startArr[0], startArr[1], startArr[2], startArr[3], startArr[4], startArr[5]);//采用new Date(yyyy,mth,dd,hh,mm,ss);创建方式分别传入年月日时分秒
        var dateEnd = new Date(endArr[0], endArr[1], endArr[2], endArr[3], endArr[4], endArr[5]);
        var dateInterval = dateEnd.getTime() - dateStart.getTime(); //获取时间差毫秒
        //计算出相差天数
        var days = Math.floor(dateInterval / (24 * 60 * 60 * 1000));
        //计算小时数
        var hourLevel = dateInterval % (24 * 60 * 60 * 1000);
        var hours = Math.floor(hourLevel / (60 * 60 * 1000));
        //计算分钟数
        var minutesLevel = hourLevel % (60 * 60 * 1000);
        var minutes = Math.floor(minutesLevel / (60 * 1000));
        //计算秒数
        //var seconds = Math.round((minutesLevel % (60 * 1000)) / 1000);
        result = days + '天' + '+' + hours + '小时' + '+' + minutes + '分钟';
        return result;
    }   
}

//格式化状态
function functionStatus(data, type, full, meta) {
    var Status = full.Status;
    var Red = false;
    var Yellow = false;
    if (Status == "呼叫中") {
        Red = true;
    }
    else if (Status == "处理中") {
        Yellow = true;
    }
    if (Red) {
        return '<b class="cl-red">' + Status + '</b>';
    }
    else if (Yellow) {
        return '<b class="cl-yellow">' + Status + '</b>';
    }
    else {
        return Status;
    }
}

//格式化呼叫时间
function functionCallTime(data, type, full, meta) {
    var CallTime = "";
    if (data) {
        CallTime = moment(data).format("YYYY-MM-DD HH:mm:ss");
    }
    return CallTime;
}

//根据字符串转换为函数
function returnFunctionName(name) {
    switch (name) {
        case 'functionStatus':
            return functionStatus
        case 'functionCallTime':
            return functionCallTime
    }
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