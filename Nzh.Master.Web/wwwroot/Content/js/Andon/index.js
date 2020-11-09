var workplace = JSON.parse(getCookie("workplace"));
var type = '';
var LineCode = "";
var StationCode = "";
var IsManageCall = false;
var Score = 0;
$(function () {
    if (!workplace) {
        GetWorkStation();
        $("#modal-workplace").modal('show');
    } else {
        LineCode = workplace.LineCode;
        StationCode = workplace.StationCode;
        $("#headworkplace").html(workplace.FactoryName + "/" + workplace.WorkShopName + "/" + workplace.LineName + "/" + workplace.StationName);
    }
    $("#btnPlaceChange").unbind().click(function () {
        GetWorkStation();
        $("#modal-workplace").modal('show');
    });
    //GetLineStationList();
    $("#LineStation").change(function (va) {
        var value = $("#LineStation").val();
        if (value && value.indexOf("==请选择==") < 0) {
            var values = value.split(",");
            LineCode = values[0];
            StationCode = values[1];
            GetExceptionClassByLineStationCode();
        }
    });
    //获取异常
    GetExceptionClassByLineStationCode();
    //异常签到
    $("button[name=responseuser]").click(function () {
        var value = $("#responseusercode").val();
        var stationid = $(this).attr("station");
        var exceptionid = $(this).attr("exception");
        if (stationid && exceptionid && value)
            Response(stationid, exceptionid, value);
        else
            alert("服务器忙，请检查配置或肖等片刻！");
    });
    //解除异常
    $("button[name=relieveuser]").click(function () {
        var code = $("#relieveusercode").val();
        var pwd = $("#relievepassword").val();
        var stationid = $(this).attr("station");
        var exceptionid = $(this).attr("exception");
        if (code && pwd) {
            exceptionSignInSure(code, pwd, stationid, exceptionid);
        } else {
            alert("请正确输入用户名和密码！");
        }
    });
    //保存评星
    $("button[name=superstar]").click(function () {
        var stationid = $(this).attr("station");
        var exceptionid = $(this).attr("exception");
        var recordid = $(this).attr("record");
        superstar(recordid, stationid, exceptionid);
    });
    //评星
    $('i[name=starvalue]').attr("class", "icon-star-empty light-grey");
    $(".startvalue").click(function () {
        $('i[name=starvalue]').attr("class", "icon-star-empty light-grey");
        $(this).children().attr("class", "icon-star orange2");
        $(this).prevAll().children().attr("class", "icon-star orange2");
        Score = parseInt($(this).attr("value"));
    });

    $('#factory_select').unbind().change(function () {
        $($("#business_select").children().hide()[0]).show();
        $("option[group=" + $("#" + $(this).val().split(',')[0]).attr("code") + "]").show();
        $("#business_select").val("");
    });
    $('#business_select').unbind().change(function () {
        $($("#workshop_select").children().hide()[0]).show();
        $("option[group=" + $("#" + $(this).val().split(',')[0]).attr("code") + "]").show();
        $("#workshop_select").val("");
    });
    $('#workshop_select').unbind().change(function () {
        $($("#area_select").children().hide()[0]).show();
        $("option[group=" + $("#" + $(this).val().split(',')[0]).attr("code") + "]").show();
        $("#area_select").val("");
    });
    $('#area_select').unbind().change(function () {
        $($("#line_select").children().hide()[0]).show();
        $("option[group=" + $("#" + $(this).val().split(',')[0]).attr("code") + "]").show();
        $("#line_select").val("");
    });
    $('#line_select').unbind().change(function () {
        $($("#lineArea_select").children().hide()[0]).show();
        $("option[group=" + $("#" + $(this).val().split(',')[0]).attr("code") + "]").show();
        $("#lineArea_select").val("");
    });
    $('#lineArea_select').unbind().change(function () {
        $($("#station_select").children().hide()[0]).show();
        $("option[group=" + $("#" + $(this).val().split(',')[0]).attr("code") + "]").show();
        $("#station_select").val("");
    });
})

function GetWorkStation() {
    $.ajax({
        url: '/api/sys/LineAreaStation?TenantId=' + TenantId,
        type: 'get',
        beforeSend: jQueryShowLoading(),//显示加载图标
        success: function (d) {
            jQuery('body').hideLoading();//隐藏加载图标

            $("#LineStation").html("");
            if (d.rows) {
                var factoryOption = [{ value: '', text: '==请选择==', code: ''}];
                var businessOption = [{ value: '', text: '==请选择==', code: '' }];
                var workshopOption = [{ value: '', text: '==请选择==', code: '' }];
                var areaOption = [{ value: '', text: '==请选择==', code: '' }];
                var lineOption = [{ value: '', text: '==请选择==', code: '' }];
                var lineAreaOption = [{ value: '', text: '==请选择==', code: '' }];
                var stationOption = [{ value: '', text: '==请选择==', code: '' }];
                var factory = "", business = "", workshop = "", area = "", line = "", lineArea = "";

                var optgroup = "<option value='#'>==请选择==</option>";
                $.each(d.rows, function (index, item) {
                    if (factory.indexOf(item.FactoryCode) < 0) {
                        factoryOption.push({ value: item.FactoryId, text: item.FactoryName, code: item.FactoryCode ,group:''});
                        factory += item.FactoryCode + " ; ";
                    }
                    if (business.indexOf(item.UnitCode) < 0) {
                        businessOption.push({ value: item.UnitId, text: item.UnitName, code: item.UnitCode, group:item.FactoryCode });
                        business += item.UnitCode + " ; ";
                    }

                    if (workshop.indexOf(item.WorkShopCode) < 0) {
                        workshopOption.push({ value: item.WorkShopId, text: item.WorkShopName, code: item.WorkShopCode, group: item.UnitCode });
                        workshop += item.WorkShopCode + " ; ";
                    }
                    if (area.indexOf(item.AreaCode) < 0) {
                        areaOption.push({ value: item.AreaId, text: item.AreaName, code: item.AreaCode ,group:item.WorkShopCode});
                        area += item.AreaCode + " ; ";
                    }
                    if (line.indexOf(item.LineCode) < 0) {
                        lineOption.push({ value: item.LineId, text: item.LineName, code: item.LineCode ,group:item.AreaCode});
                        line += item.LineCode + " ; ";
                    }
                    if (lineArea.indexOf(item.LineAreaCode) < 0) {
                        lineAreaOption.push({ value: item.LineAreaId, text: item.LineAreaName, code: item.LineAreaCode, group: item.LineCode});
                        lineArea += item.LineAreaCode + " ; ";
                    }
                    stationOption.push({ value: item.LineStationId, text: item.StationName, code: item.StationCode, group: item.LineAreaCode});


                    if (LineCode != item.LineCode) {
                        if (LineCode = "")
                            optgroup += "<optgroup label='" + item.LineName + "' id='" + item.LineCode + "'>";
                        else
                            optgroup += "</optgroup><optgroup label='" + item.LineName + "' id='" + item.LineCode + "'>";
                        LineCode = item.LineCode
                    }
                    optgroup += "<option value='" + item.LineCode + "," + item.StationCode + "'>" + item.StationName + "</option>";
                    if (index == d.total - 1)
                        optgroup += "</optgroup>";
                })
                $("#factory_select").html($("#option-template").render(factoryOption));
                $("#business_select").html($("#option-template").render(businessOption));
                $("#workshop_select").html($("#option-template").render(workshopOption));
                $("#area_select").html($("#option-template").render(areaOption));
                $("#line_select").html($("#option-template").render(lineOption));
                $("#lineArea_select").html($("#option-template").render(lineAreaOption));
                $("#station_select").html($("#option-template").render(stationOption));
                $("#LineStation").html(optgroup);
            }
        }
    })
}

function GetLineStationList() {
    $.ajax({
        url: '/api/sys/LineAreaStation?TenantId=' + TenantId,
        beforeSend: jQueryShowLoading(),//显示加载图标
        success: function (value) {
            jQuery('body').hideLoading();//隐藏加载图标
            var LineCode = "";
            var option = "";
            $("#LineStation").html("");
            var optgroup = "<option value='#'>==请选择==</option>";
            $.each(value.rows, function (index, item) {
                if (LineCode != item.LineCode) {
                    if (LineCode = "")
                        optgroup += "<optgroup label='" + item.LineName + "' id='" + item.LineCode + "'>";
                    else
                        optgroup += "</optgroup><optgroup label='" + item.LineName + "' id='" + item.LineCode + "'>";
                    LineCode = item.LineCode
                }
                optgroup += "<option value='" + item.LineCode + "," + item.StationCode + "'>" + item.StationName + "</option>";
                if (index == value.total - 1)
                    optgroup += "</optgroup>";
            })
            $("#LineStation").html(optgroup);
        }
    })
}

//加载异常分类
//异常分类
function GetExceptionClassByLineStationCode() {
    $.ajax({
        url: '/api/Andon/andon/GetExceptionClassByLineStationCode?LineCode=' + LineCode + "&StationCode=" + StationCode,
        type: 'get',
        async: false,
        beforeSend: jQueryShowLoading(),//显示加载图标
        success: function (value) {
            jQuery('body').hideLoading();//隐藏加载图标
            var exceptionhtml = "";
            var managehtml = "";
            var icon_e = ["icon-shengchan1", "icon-pinzhi", "icon-shebei1", "icon-weibiaoti-", "icon-ITyzb", "icon-shengchan2"];
            var icon_m = ["icon-gongren", "icon-xiangmujingli", "icon-kehujingli", "icon-xiangmujinglikaohe_fill"];
            if (value.status) {
                var obj = value.message;

                stationid = obj[0].LineStationId;
                var rowfluid_1 = "";
                var rowfluid_2 = "";
                var index_1 = 0;
                var index_2 = 0;
                var row = "<div class='row-fluid'>";
                var class_item_1 = "<div class='btn-innerbox span4 text-center'>";
                var class_item_2 = "<div class='btn-innerbox span6 text-center'>";
                $.each(obj, function (index, item) {
                    //设置管理呼叫
                    var model = " manageCall='true'  data-toggle='modal' href='#modal-handler'";
                    //设置管理呼叫解除
                    if (item.Status == 1)
                        model = " manageCall='true'  data-toggle='modal' href='#modal-relive'";
                    //设置正常呼叫
                    if (item.ExceptionClassCode == 'YCHJ')
                        model = " data-toggle='modal' href='#modal-subexceptionclass'";
                    var success = "<button name='exceptionclass' class='btn btn-success btn-large' id='" + item.ID + "," + item.LineStationId + "'" + model + ">";
                    var warning = "<button name='exceptionclass' class='btn btn-warning btn-large' id='" + item.ID + "," + item.LineStationId + "'" + model + ">";
                    var danger = "<button name='exceptionclass' class='btn btn-danger btn-large' id='" + item.ID + "," + item.LineStationId + "'" + model + ">";

                    if (item.ExceptionClassCode == 'YCHJ') {
                        if (index_1 % 3 === 0)
                            exceptionhtml += row;

                        exceptionhtml += class_item_1;
                        if (item.Status == 1)
                            exceptionhtml += danger;
                        else if (item.Status == 5)
                            exceptionhtml += warning;
                        else
                            exceptionhtml += success;
                        exceptionhtml += "<i class='font_ilean iconfont " + icon_e[index_1 % 6] + "'></i>";
                        exceptionhtml += "<p>" + item.ExceptionName + "</p></button></div>";
                        index_1++;
                        if (index_1 % 3 === 0)
                            exceptionhtml += "</div>";
                    }
                    else {
                        if (index_2 % 2 === 0)
                            managehtml += row;
                        managehtml += class_item_2;
                        if (item.Status == 1)
                            managehtml += danger;
                        else if (item.Status == 5)
                            managehtml += warning;
                        else
                            managehtml += success;
                        managehtml += "<i class='font_ilean iconfont " + icon_m[index_2 % 4] + "'></i>";
                        managehtml += "<p>" + item.ExceptionName + "</p></button></div>";
                        index_2++;
                        if (index_2 % 2 === 0)
                            managehtml += "</div>";
                    }
                    if (index === obj.length - 1) {
                        if (index_1 % 3 != 0)
                            exceptionhtml += "</div>";
                        if (index_2 % 2 != 0)
                            managehtml += "</div>";
                    }
                });

                $('#exceptionclass_1').html(exceptionhtml);
                $('#exceptionclass_2').html(managehtml);

                $('button[name=exceptionclass]').click(function () {
                    var id = $(this).attr("id");
                    var ids = id.split(',');
                    if ($(this).attr("manageCall")) {
                        IsManageCall = true;
                        if ($(this).hasClass('btn-success'))
                            GetShiftTypeException(ids[1], ids[0]);
                        else {
                            $("button[name=relieveuser]").attr("station", ids[1]);
                            $("button[name=relieveuser]").attr("exception", ids[0]);
                        }
                    }
                    else
                        GetStationExceptionInfo(ids[1], ids[0]);
                });
            }
        }
    });
}

//异常呼叫
function GetStationExceptionInfo(StationId, ParentId) {
    exceptionid = "";
    isManageCall = false;
    $.ajax({
        url: '/api/Andon/andon/GetExceptionClassByLineStaionId?LineStationId=' + StationId + "&ParentId=" + ParentId,
        beforeSend: jQueryShowLoading(),//显示加载图标
        success: function (value) {
            jQuery('body').hideLoading();//隐藏加载图标
            if (value.status) {
                var obj = value.message;
                var subexceptionclass = [];
                var html = "";
                $.each(obj, function (index, item) {
                    var row = { Red: false, Yellow: false, ExceptionId: item.ExceptionId, ExceptionName: item.ExceptionName, StationId: item.StationId, IsManageCall: false };
                    if (item.ExceptionStatus == 1) {
                        row.Red = true;
                        //html += "<button  status='1' id='" + item.ExceptionId + "' type='button' class='btn btn-danger' onclick='exceptioncall(this,5,\"" + StationId + "\",\"" + item.ExceptionId + "\")'>" + item.ExceptionName + "</button>";
                    }
                    else if (item.ExceptionStatus == 5) {
                        row.Yellow = true;
                        //html += "<button  status='1' id='" + item.ExceptionId + "' type='button' class='btn btn-warning' onclick='exceptioncall(this,10,\"" + StationId + "\",\"" + item.ExceptionId + "\")'>" + item.ExceptionName + "</button>";
                    }
                    else if (item.ExceptionClassCode == "GLHJ") {
                        row.IsManageCall = true
                    }//else if (item.ExceptionStatus == 10) {

                    //html += "<button  status='0' id='" + item.ExceptionId + "' type='button' class='btn btn-success'onclick='exceptioncall(this,1,\"" + StationId + "\",\"" + item.ExceptionId + "\")'>" + item.ExceptionName + "</button>";
                    //}else
                    //html += "<button  status='0' id='" + item.ExceptionId + "' type='button' class='btn btn-success' onclick='exceptioncall(this,1,\"" + StationId + "\",\"" + item.ExceptionId + "\")'>" + item.ExceptionName + "</button>";
                    subexceptionclass.push(row);
                });
                $('#subExceptionClass').html($('#ExceptionTemplate').render(subexceptionclass));
                //$('#exceptionlist').html(html);
                //$('#modal2').modal('toggle');

                $('button[name=subexceptionclass]').click(function () {
                    $("#modal-subexceptionclass").modal('hide');
                    var id = $(this).attr("id");
                    if ($(this).hasClass('btn-success'))
                        GetShiftTypeException(StationId, id);
                    else if ($(this).hasClass('btn-red') && $(this).attr("manageCall") === "true") {
                        $("button[name=relieveuser]").attr("station", StationId);
                        $("button[name=relieveuser]").attr("exception", id);
                    }
                    else if ($(this).hasClass('btn-red')) {
                        $("button[name=responseuser]").attr("station", StationId);
                        $("button[name=responseuser]").attr("exception", id);
                    }
                    else if ($(this).hasClass('btn-warning')) {
                        $("button[name=relieveuser]").attr("station", StationId);
                        $("button[name=relieveuser]").attr("exception", id);
                    }
                });
            }
        }
    });
}

//获取异常责任人
function GetShiftTypeException(StationId, ExceptionId) {
    var param = JSON.stringify({
        ExceptionId: ExceptionId,
        LineStationId: StationId
    })
    var address = '/api/Andon/andon/GetShiftTypeException';
    $.ajax({
        url: address,
        type: 'post',
        contentType: 'application/json',
        data: param,
        dataType: 'json',
        beforeSend: jQueryShowLoading(),//显示加载图标
        success: function (value) {
            jQuery('body').hideLoading();//隐藏加载图标
            if (value.status) {
                var obj = value.rows;
                obj = JSON.parse(obj);
                var html = "";
                if (obj.length <= 0) {
                    alert("当前已配置区分了班次进行呼叫，当前异常未配置异常班次，请配置班别！");
                    return;
                }
                var handler = [];
                $.each(obj, function (index, item) {
                    var row = { LineShiftId: item.LineShiftId, ShiftName: item.ShiftName, HandlerId: item.HandleUserId, HandlerName: item.HandleUserName };
                    handler.push(row);
                })
                $("#handlers").html($("#HandlerTemplate").render(handler));
                $("button[name=handler]").click(function () {
                    var id = $(this).attr("id");
                    //开始呼叫
                    ExceptionCall(StationId, ExceptionId, id, false);
                });
            } else {
                alert(value.message);
                return;
            }
        }
    })
}


//异常呼叫
function ExceptionCall(StationId, ExceptionId, HandlerId, ispressing) {
    var param = JSON.stringify({
        LineStationId: StationId,
        ExceptionId: ExceptionId,
        UserCode: UserCode,
        IsPressingCall: ispressing,
        HandlerId: HandlerId
    });
    var address = '/api/Andon/andon/EditExceptionCall';
    if (ispressing)
        address = '/api/Andon/andon/EditExceptionCall';
    $.ajax({
        url: '/api/Andon/andon/EditExceptionCall',
        type: 'post',
        data: param,
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: jQueryShowLoading(),//显示加载图标
        success: function (value) {
            jQuery('body').hideLoading();//隐藏加载图标
            ensure = true;
            if (value.status) {
                //if (ShiftType == '1') {
                //    $("#modal1").modal('hide');
                //}
                $("#modal-handler").modal('hide');
                //ExceptionUser = value.message;
                //exceptionstatus = 1;
                //timeload = 10;
                GetExceptionClassByLineStationCode(StationCode);
            } else {
                //if (ShiftType == '1') {
                //    $("#modal1").modal('hide');
                //}
                //$("#modal2").modal('hide');
                alert("系统忙，请稍后再试！" + value.message);
            }
        }, error: function (err) {
            ensure = true;
        }
    });
};

//异常签到
function Response(StationId, ExceptionId, empno) {
    var param = JSON.stringify({
        LineStationId: StationId,
        ExceptionId: ExceptionId,
        UserCode: empno
    });
    $.ajax({
        url: '/api/Andon/andon/EditExceptionHandleSign',
        type: 'post',
        data: param,
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: jQueryShowLoading(),//显示加载图标
        success: function (value) {
            jQuery('body').hideLoading();//隐藏加载图标
            ensure = true;
            if (value.status) {
                GetExceptionClassByLineStationCode(StationCode);
                $("#modal-response").modal('hide');
            } else {
                alert(value.message);
            }
        }, error: function (err) {
            ensure = true;
        }
    });
};

//异常解除
function Relieve(StationId, ExceptionId,UserCode) {
    var param = JSON.stringify({
        LineStationId: StationId,
        ExceptionId: ExceptionId,
        UserCode: UserCode
    });
    $.ajax({
        url: '/api/Andon/andon/EditRelieveException',
        type: 'post',
        data: param,
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: jQueryShowLoading(),//显示加载图标
        success: function (value) {
            jQuery('body').hideLoading();//隐藏加载图标
            ensure = true;
            if (value.status) {
                var recordid = value.message.ID;
                GetExceptionClassByLineStationCode(StationCode);
                $("#modal-relive").modal('hide');
                $("button[name=superstar]").attr("station", StationId);
                $("button[name=superstar]").attr("exception", ExceptionId);
                $("button[name=superstar]").attr("record", recordid);
                $("#modal-superstar").modal('show');
            } else {
                alert(value.message);
            }
        }, error: function (err) {
            ensure = true;
        }
    });
};

// 设置评星
$('#stars .glyphicon-star').click(function () {
    var thisIndex = $('#stars .glyphicon-star').index(this)
    var stars = $('#stars .glyphicon-star')
    if ($(this).hasClass('gold')) {
        for (var i = thisIndex; i < stars.length; i++) {
            if ($('#stars .glyphicon-star').eq(i).hasClass('gold')) {
                $('#stars .glyphicon-star').eq(i).removeClass('gold').addClass('gray')
            }
        }
    } else {
        for (var i = 0; i < thisIndex + 1; i++) {
            $('#stars .glyphicon-star').eq(i).addClass('gold').removeClass('gray')
        }
    }
})

// 关闭评星弹窗后返回评星数量
$('#stars-dialog').on('hidden.bs.modal', function (e) {
    // 评定星数
    var statsNum = $('.glyphicon.glyphicon-star.gold').length
})

//异常签到的确定事件
function exceptionSignInSure(usercode, password, stationid, exceptionid) {
    // 判断账号密码是否正确
    $.ajax({
        url: '/api/Andon/AppWeb/GetCheckLogin?usercode=' + usercode + "&password=" + password,
        type: 'get',
        success: function (value) {
            if (value.status) {
                if (IsManageCall)
                    editreliveexceptionmanagecall(stationid, exceptionid, usercode);
                else
                    Relieve(stationid, exceptionid, usercode);
            } else
                alert(value.message);
        }
    });
}

//点赞
function superstar(recordid, stationid, exceptionid) {

    var param = JSON.stringify({
        ID: recordid,
        LineStatonId: stationid,
        ExceptionId: exceptionid,
        Star: Score
    });
    $.ajax({
        url: '/api/Andon/ExceptionRecord/EditRecordStar',
        type: 'post',
        data: param,
        dataType: 'json',
        contentType: 'application/json',
        success: function (value) {
            if (value.status) {
                $("#modal-superstar").modal('hide');
                $('i[name=starvalue]').attr("class", "icon-star-empty light-grey");
            } else {
                alert(value.message);
            }
        }
    });
}


//管理呼叫解除
function editreliveexceptionmanagecall(stationid, exceptionid, usercode) {

    var param = JSON.stringify({
        LineStationId: stationid,
        ExceptionId: exceptionid,
        UserCode: usercode
    });

    $.ajax({
        url: '/api/Andon/andon/EditRelieveManageException',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: param,
        success: function (value) {
            $("#modal-relive").modal('hide');
            if (value.status) {
                var recordid = value.ID;
                GetExceptionClassByLineStationCode(StationCode);
                $("button[name=superstar]").attr("station", stationid);
                $("button[name=superstar]").attr("exception", exceptionid);
                $("button[name=superstar]").attr("record", recordid);
                $("#modal-superstar").modal('show');
            } else {
                alert(value.message);
            }
        }, error: function (err) {
            ensure = true;
        }
    });
}

function jQueryShowLoading() {
    jQuery('body').showLoading();
    jQuery('#loading-indicator-undefined').css("top", 200);
}