var page = 1;
var rows = 7;
var LineId = "";
var ExceptionId = "";
var UserId = "";
var CallTime = "";
var totalpage = 1;

$(function () {
   
    GetLineStationList();
    GetExceptionClass();
    $("#LineList").change(function (va) {
        if ($("#LineList").val() && $("#LineList").val().indexOf("==请选择==") < 0)
            LineId = $("#LineList").val();
        else
            LineId = ""
         
    });
    $("#ExceptionList").change(function (va) {
        if ($("#ExceptionList").val() && $("#ExceptionList").val().indexOf("==请选择==") < 0)
            ExceptionId = $("#ExceptionList").val();
        else
            ExceptionId = "";
         
    });
    $("#ResponseUser").keyup(function (event) {
        if (event.keyCode == 13) {
            if ($("#ResponseUser").val())
                UserId = $("#ResponseUser").val();
            else
                UserId = "";
             
        }
    });
    $("#CallTime").keyup(function (event) {
        if (event.keyCode == 13) {
            if ($("#CallTime").val())
                CallTime = $("#CallTime").val();
            else
                CallTime = "";
            
        }
    });
    $("#CallTime").change(function () {
        if ($("#CallTime").val())
            CallTime = $("#CallTime").val();
        else
            CallTime = "";
        
    });
    
    
    //table列初始化
    var columnsArray = [
        { "data": 'LineName', "title": "产线名称", "searchable": false, "width": "100px", "visible": true, "sortable": true  },
        { "data": 'StationName', "title": "工位名称", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'ExceptionName', "title": "异常信息", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'CallTime', "title": "呼叫时间", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionCallTime },

        { "data": 'CallUserName', "title": "呼叫人", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'ResponseTime', "title": "响应时长", "searchable": false, "width": "120px", "visible": true, "sortable": false, "render": functionCallLang},

        { "data": 'HandlerName', "title": "负责人", "searchable": false, "width": "120px", "visible": true, "sortable": true },
        { "data": 'RelieveTime', "title": "处理时长", "searchable": false, "width": "120px", "visible": true, "sortable": false, "render": functionHandLang },
        { "data": 'TenantId', "title": "解除时间", "searchable": false, "width": "120px", "visible": true, "sortable": true, "render": functionRelieveTime },
        { "data": 'RelieveUserName', "title": "解除人", "searchable": false, "width": "120px", "visible": true, "sortable": true },

    ];

    var post = {
        "url": "/api/Andon/ExceptionRecord/EditPageList",
        "type": "POST",
        "contentType": "application/json; charset=utf-8",
        "data": function (d) {
            d.LineId = LineId;
            d.ExceptionId = ExceptionId;
            d.ResponseUserId = UserId;
            d.TenantId = TenantId;
            d.CallTime = CallTime;
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
        table.ajax.reload(null, true); 
        return false;
    });
});
//列自定义显示格式
 

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

function functionRelieveTime(data, type, full, meta) {
    var RelieveTime = full.RelieveTime;
    return moments(RelieveTime).format("YYYY-MM-DD HH:mm");
}

//根据字符串转换为函数
function returnFunctionName(name) {
    switch (name) {
        case 'functionRelieveTime':
            return functionRelieveTime
        case 'functionCallTime':
            return functionCallTime
        case 'functionCallLang':
            return functionCallLang
        case 'functionHandLang':
            return functionHandLang
    }
}

//清空
$("#btnClear").click(function () {
    $("#LineList").val("");
    $("#ExceptionList").val("");
    $("#ResponseUser").val("");
    $("#CallTime").val("");
})

function GetLineStationList() {
    $.ajax({
        url: '/api/sys/Line?TenantId=' + TenantId,
        type: 'get',
        success: function (data) {
            var LineCode = "";
            var option = "";
            $("#LineList").html("");
            var optgroup = "<option value=''>==请选择==</option>";
            $.each(data.rows, function (index, item) {
                optgroup += "<option value='" + item.LineId + "'>" + item.LineName + "</option>";
            })
            $("#LineList").html(optgroup);
        }
    })
}
function GetExceptionClass() {
    $.ajax({
        url: '/api/Andon/ExceptionInfo?TenantId=' + TenantId,
        type: 'get',
        success: function (data) {
            $("#ExceptionList").html("");
            var optgroup = "<option value=''>==请选择==</option>";
            var exceptionclasscode = "";
            $.each(data.rows, function (index, item) {
                if (exceptionclasscode != item.ExceptionClassCode) {
                    if (exceptionclasscode === "")
                        optgroup += "<optgroup label='" + item.ExceptionClassName + "' id='" + item.ExceptionClassCode + "'>";
                    else
                        optgroup += "</optgroup><optgroup label='" + item.ExceptionClassName + "' id='" + item.ExceptionClassCode + "'>";
                    exceptionclasscode = item.ExceptionClassCode
                }
                optgroup += "<option value='" + item.ID + "'>" + item.ExceptionName + "</option>";
                if (index == data.total - 1)
                    optgroup += "</optgroup>";
            })
            $("#ExceptionList").html(optgroup);
        }
    })
}

// 获取异常汇总信息
//获取呼叫中的异常
function GetExceptionRecord() {
    $.ajax({
        url: '/api/Andon/ExceptionRecord/GetAllRecord?LineId=' + LineId + '&ExceptionId=' + ExceptionId + '&ResponseUserId=' + UserId + "&TenantId=" + TenantId + "&CallTime=" + CallTime + "&rows=" + rows + "&page=" + page,
        type: 'get',
        success: function (value) {
            $('#exceptionrecord').html("");
            paging(value.total);
            if (value.total > 0) {
                var obj = value.rows;
                var list = [];
                
                $.each(obj, function (index, item) {
                    //var time = 0;
                    //if (!item.ResponseTime) {
                    //    time = moments(moments()).diff(item.CallTime, 'minutes');
                    //} else {
                    //    time = moments(item.ResponseTime).diff(item.CallTime, 'minutes')
                    //}

                    //var RelieveTime = 0;
                    //if (!item.RelieveTime) {
                    //    if(item.ResponseTime)
                    //        RelieveTime = moments(moments()).diff(item.ResponseTime, 'minutes');
                    //    else
                    //        RelieveTime = moments(moments()).diff(item.CallTime, 'minutes');
                    //} else {
                    //    RelieveTime = moments(item.RelieveTime).diff(item.ResponseTime, 'minutes')
                    //}

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
                        time += "(min)";
                    }
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
                    } else if (time >= 60) {
                        RelieveTime = (RelieveTime * 1.0 / 60).toFixed(1) + '(H)';
                    } else {
                        RelieveTime += "(min)";
                    }

                    list.push({
                        LineName: item.LineName, StationName: item.StationName, ExceptionName: item.ExceptionName, CallTime: moments(item.CallTime).format("YYYY-MM-DD HH:mm"), CallUser: item.CallUserName
                        , CallLang: time, HandlerName: item.HandlerName, HandLang: RelieveTime, RelieveTime: moments(item.RelieveTime).format("YYYY-MM-DD HH:mm"), RelieveUserName: item.RelieveUserName
                    });
                });
                $('#exceptionrecord').html($("#ExceptionTemplate").render(list));
            }
        }
    });
};

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
            GetExceptionRecord();
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
    GetExceptionRecord();
}

function switchdownpage() {
    if (page > 1)
        page--;
    GetExceptionRecord();
}

function switchuppage(totalpage) {
    if (page < totalpage)
        page++;

    GetExceptionRecord();
}