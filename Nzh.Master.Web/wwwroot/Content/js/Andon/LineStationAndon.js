var infos = ["Info1", "Info2", "Info3", "Info4"];
$('main').height(function () {
    var win_height = $(window).height()
    var head_height = $('.header').outerHeight(true)
    return win_height - head_height - 19
})
$(function () {
    $("#Info1").show();
    $("#Info2,#Info3,#Info4").hide();
    // 加载当前的时间
    showTime();
    //1.加载当前的用户信息
    //2.加载当前的产线
    //信息验证
    if (UserCode.length == 0) {
        window.location.href = '@ViewBag.StationHome' + '?LineCode=' + LineCode + '&StationCode=' + StationCode + "&TenantPSD=" + tenantpsd;//window.location.href = '/Andon/lineviewer?LineCode=' + LineCode + '&StationCode=' + StationCode + "&TenantPSD=" + tenantpsd;
    } else {
        $('.logo a').attr("href", '@ViewBag.StationHome' + '?LineCode=' + LineCode + '&StationCode=' + StationCode + "&TenantPSD=" + tenantpsd);//"/Andon/LineViewer/StationHome?LineCode=" + LineCode + "&StationCode=" + StationCode + "&TenantPSD=" + tenantpsd);
        GetUserInfo();
        GetCompanyList();
        $.ajax({
            type: 'get',
            url: '/api/andon/public/GetLineStation?LineCode=' + LineCode,
            success: function (value) {
                if (value.length > 0) {
                    var obj = value;
                    //'<img src="../../../Content/images/Andon/andon_zy/tab_arrow.png">' worklineCase
                    var workAreaAdd = obj[0].FactoryName + '/' + obj[0].WorkShopName + '/' + obj[0].LineName;
                    $('#workline').html(workAreaAdd + '/' + obj[0].StationName);
                    //$('#worklineSummary').html(workAreaAdd);
                    //$('#worklineCase').html(workAreaAdd);
                    //$('#worklineAnalysis').html(workAreaAdd);

                    //$("#workplacelist").html('');
                    var html = "";
                    //stationid = obj[0].LineStationId;
                    $.each(obj, function (index, item) {
                        if (item.IsEnable == "1") {
                            var classStr = "btn btn-link btn-xs";
                            if (item.StationCode == StationCode)
                                classStr = "btn btn-primary btn-xs";
                            html += "<button id='" + item.LineStationId + "' onclick='lineStationBtn(this)'  menutype='Station' codeName='" + item.StationName + "' code='" + item.StationCode + "' class='" + classStr + "'>" + item.StationName + "</button>";
                        }
                    });
                    $("#workplacelist").html(html);
                    GetExceptionClassByLineStationCode(obj[0].StationCode);
                    //$(".workplace:first").addClass("newer").siblings().addClass("older");
                    //$('#workplacelist ').click(function () {
                    //    $(this).addClass("newer").removeClass("older").siblings().addClass("older").removeClass("newer");
                    //    var code = $(this).attr('code');

                    //    // huangrz add 2018.12.26 选择工位修改工位区域的内容
                    //    var codeName = $(this).attr('codeName');
                    //    var worklineName = $('#workline').text();
                    //    var worklineNames = worklineName.split('、');
                    //    var workAreaAddstr = worklineNames[0] + '、' + worklineNames[1] + '、' + worklineNames[2] + '、' + codeName;
                    //    $('#workline').html('');
                    //    $('#workline').html(workAreaAddstr);
                    //    // =================================================
                    //    GetExceptionClassByLineStationCode(code);
                    //});
                }
            }
        });
    }
    //3.加载第一页的信息

    // 关闭评星弹窗后返回评星数量
    $('#modal1').on('hidden.bs.modal', function (e) {
        // 评定星数
        //console.log('关闭了');
        $('#modal2 .modal-footer button').show();
       
    });
    $('#modal1').on('shown.bs.modal', function () {
        // 执行一些动作...
        //console.log('打开了');
        $('#modal2 .modal-footer button').hide();
    })
});

function lineStationBtn(ele) {
    $('#workplacelist button').removeClass("btn-primary");
    $('#workplacelist button').addClass("btn-link");
    $(ele).removeClass("btn-link")
    $(ele).addClass("btn-primary")
    var code = $(ele).attr('code');

    // huangrz add 2018.12.26 选择工位修改工位区域的内容
    var codeName = $(ele).attr('codeName');
    var worklineName = $('#workline').text();
    var worklineNames = worklineName.split('/');
    var workAreaAddstr = worklineNames[0] + '/' + worklineNames[1] + '/' + worklineNames[2] + '/' + codeName;
    $('#workline').html('');
    $('#workline').html(workAreaAddstr);
    // =================================================
    GetExceptionClassByLineStationCode(code);
}
function GetCompanyList() {
    $.ajax({
        url: '/api/Andon/LineViewer/GetCompanyList?TenantId=',
        type: 'get',
        success: function (value) {
            if (value == null) {
                $("#logoUrl").attr('src', '../../Content/css/icon/LineStation/ilean_logo.png');
            } else
            {
                if (value.Logo == null || value.Logo == "") {
                    $("#logoUrl").attr('src', '../../Content/css/icon/LineStation/ilean_logo.png');
                }else
                    $("#logoUrl").attr('src', value.Logo);
            }
               
        }
    });
};


function GetUserInfo() {
    $.ajax({
        url: '/api/Andon/LineViewer/GetUserInfo?User=' + UserCode + '&TenantId=',
        type: 'get',
        success: function (value) {
            if (value.status) {
                var user = value.rows;
                var PhotoURL = user[0].PhotoURL;
                if (PhotoURL == null || PhotoURL == "") {
                    //console.log("无数据");
                    $("#img_log").attr('src', '../../Content/images/userphoto_default.png');
                    //http://localhost:28601/../../images/userphoto_default.png
                } else {
                    $("#img_log").attr('src', PhotoURL);
                }
            }
        }
    });
};
// 左侧导航栏
function SelectNav(id) {
    // 当前的显示
    $.each(infos, function (i, item) {
        if (item == id) {
            $("#" + id).show();
            $('ul.menus li').eq(i).addClass('active').siblings('li').removeClass('active')
        }else
            $("#" + item).hide();
    })
    if (id == "Info1")
        GetExceptionClassByLineStationCode(StationCode);
    if (id == "Info2")
        GetUndisposedException();
    if (id == "Info3")
        GetExceptionAnalysis();
    if (id == "Info4")
        GetExceptionRanging("day");

}
// 获取当前的日期
function showTime() {
    //获取服务器的时间
    $.ajax({
        url: '/Andon/LineViewer/GetCurrentTime',
        type: 'GET',
        success: function (data) {
            $('#time').text(data);
        }
    })
    //var myDate = new Date();
    //var year = myDate.getFullYear();
    //var month = myDate.getMonth() + 1;
    //var date = myDate.getDate();
    //var dayArray = new Array(7);
    //dayArray[0] = "星期日";
    //dayArray[1] = "星期一";
    //dayArray[2] = "星期二";
    //dayArray[3] = "星期三";
    //dayArray[4] = "星期四";
    //dayArray[5] = "星期五";
    //dayArray[6] = "星期六";
    //var day1 = myDate.getDay();
    //var day = dayArray[day1];
    //var hour = myDate.getHours();
    //var minute = myDate.getMinutes();
    //var second = myDate.getSeconds();
    //var min = checkTime(minute);
    //var sec = checkTime(second);
    //var time1 = year + "年" + month + "月" + date + "日";
    //var time2 = hour + "：" + min + "：" + sec;
    // document.write(time1+day+time2);
    //用js方法
    // document.getElementById("time").innerHTML = time1+day+time2;
    //用jquery方法
    //$('#time').text(time1 + time2);
    setTimeout("showTime()", 1000);
}
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
};
// 获取异常汇总信息
//获取呼叫中的异常
function GetUndisposedException() {
    var html = "";
    $('#undisposedexception').html(html);
    $.ajax({
        url: '/api/Andon/andon/GetUndisposedException?LineCode=' + LineCode + '&Status=6&CallTime=' + moment().format("YYYY-MM-DD"),
        type: 'get',
        success: function (value) {
            if (value.total > 0) {
                var obj = value.rows;
                $.each(obj, function (index, item) {
                    var calltime = moment(item.CallTime).format('hh:mm:ss');
                    html += "<tr>"
                    if (item.Status == 1)
                        html += "<td class='warning-td'>呼叫中</td>";
                    else if (item.Status == 5)
                        html += "<td class='danger-td'>处理中</td>";
                    else if (item.Status == 10)
                        html += "<td><p>已完成</p></td>";
                    else if (item.Status == 15)
                        html += "<td><p>已完成</p></td>";

                    html += "<td>" + item.StationName + "</td  class='contentcc' title='" + item.ExceptionName + "'><td>" + item.ExceptionName + "</td>";
                    html += "<td>" + item.CallUserName + "</td>";
                    html += "<td>" + item.HandleUserName + "</td>";
                    var time = 0;
                    if (item.ResponseTime == null) {
                        time = moment(moment()).diff(item.CallTime, 'minutes');
                    } else {
                        time = moment(item.ResponseTime).diff(moment(item.CallTime), 'minutes')
                    }
                    html += "<td><p>" + moment(item.CallTime).format("MM-DD HH:mm") + "<p></td>";
                    html += "<td>" + time + "min</td>";
                    if (item.ResponseTime == null) {
                        html += "<td><p><p></td>";
                    } else {
                        var RelieveTime = 0;
                        if (item.RelieveTime == null) {
                            RelieveTime = moment(moment()).diff(item.ResponseTime, 'minutes');
                        } else {
                            RelieveTime = moment(item.RelieveTime).diff(moment(item.ResponseTime), 'minutes')
                        }
                        //html += "<td><p>" + moment(item.ResponseTime).format("MM-DD HH:mm") + "<p></td>";
                        html += "<td>" + RelieveTime + "min</td>";
                    }
                    //if (item.RelieveTime == null)
                    //    html += "<td><img src='../../../Content/images/Andon/andonvyichhz/table_huizong_icon_handle.png'><p><p></td>"
                    //else {
                    //    html += "<td><img src='../../../Content/images/Andon/andonvyichhz/table_huizong_icon_handle.png'><p>" + moment(item.RelieveTime).format("MM-DD hh:mm") + "<p></td>";
                    //}
                    html += "</tr>";
                });
                $('#undisposedexception').html(html);
            }
        }
    });
};
var DayTypes = ["rankDay", "rankWeek", "rankMonth"];
// 选择日期
function rankingForType(id,type) {
    
    $.each(DayTypes, function (i, item) {
        if (item == id) {
            $("#" + item).removeClass("btn-link");
            $("#" + item).addClass("btn-primary");
        } else {
            $("#" + item).addClass("btn-link");
            $("#" + item).removeClass("btn-primary");
        }
    });
    GetExceptionRanging(type);
}
//异常处理龙虎榜
function GetExceptionRanging(type) {
    $.ajax({
        url: '/api/Andon/andon/GetExceptionRanging?Top=5&LineCode=' + LineCode + '&DateType=' + type,
        type: 'get',
        success: function (value) {
            if (value.status) {
                var obj = value.message;
                var Response = obj.Response;
                var Relieve = obj.Relieve;
                var TimeOrder = obj.TimeOrder;
                var responseHtml = "";
               
                $.each(Response, function (i, item1) {
                    responseHtml += "<tr>";
                    responseHtml += "<td><span class='badge-item'>" + (i + 1) + "</span></td>";
                    responseHtml += "<td>" + item1.OrganizeName + "</td>";
                    responseHtml += "<td>" + item1.UserName + "</td>";
                   
                    responseHtml += "<td>" + item1.ResponseTimes + "</td>";
                    responseHtml += "</tr>"
                });
                var RelieveHtml = "";
                $.each(Relieve, function (i, item1) {
                    RelieveHtml += "<tr>";
                    RelieveHtml += "<td><span class='badge-item'>" + (i + 1) + "</span></td>";
                    RelieveHtml += "<td>" + item1.OrganizeName + "</td>";
                    RelieveHtml += "<td>" + item1.UserName + "</td>";
                   
                    //responseHtml += "<td><span class="stars star0"></span></td>"; RelieveTimes
                    var sta = 0;
                    if (item1.RelieveTimes === 0)
                        sta = 0;
                    else if (item1.RelieveTimes % 1 === 0) {
                        sta = item1.RelieveTimes * 2 ;
                    } else
                        sta = parseInt(item1.RelieveTimes) * 2 + 1;
                    RelieveHtml += "<td><span class='stars star" + sta + "'></span></td>";
                    RelieveHtml += "</tr>"
                })

                var TimeOrderHtml = "";
                $.each(TimeOrder, function (i, item1) {
                    TimeOrderHtml += "<tr>";
                    TimeOrderHtml += "<td><span class='badge-item'>" + (i + 1) + "</span></td>";
                    TimeOrderHtml += "<td>" + item1.OrganizeName + "</td>";
                    TimeOrderHtml += "<td>" + item1.UserName + "</td>";
                    TimeOrderHtml += "<td>" + item1.TimeOrder + "</td>";
                    TimeOrderHtml += "</tr>"
                })
                $('#responseHtml').html(responseHtml);
                $('#RelieveHtml').html(RelieveHtml);
                $('#TimeOrderHtml').html(TimeOrderHtml);
            } else {
                alert(value.message);
            }
        }
    });
}
//加载异常分类
//异常分类
function GetExceptionClassByLineStationCode(code) {
    StationCode = code;
    $.ajax({
        url: '/api/Andon/andon/GetExceptionClassByLineStationCode?LineCode=' + LineCode + "&StationCode=" + StationCode,
        type: 'get',
        success: function (value) {
            $('body').show();
            var exceptionhtml = "";
            var managehtml = "";
            $('#exceptionclass').html(exceptionhtml);
            $('#manageclass').html(managehtml);

            if (value.status) {
                var obj = value.message;

                stationid = obj[0].LineStationId;
                var firstHtml = "";
                var secondHtml = "";
                $.each(obj, function (index, item) {
                    if (item.ExceptionClassCode == 'YCHJ') {
                        exceptionhtml += "<div class='item' onclick='GetStationExceptionInfo(\"" + item.LineStationId + "\",\"" + item.ID + "\")'><img src='" + item.PhotoUrl + "' /></div>";

                        //if(item.ExceptionName == "品质异常" || item.ExceptionName == "设备异常"){
                        //    firstHtml += "<div class='item' onclick='GetStationExceptionInfo(\"" + item.LineStationId + "\",\"" + item.ID + "\")'><img src='" + item.PhotoUrl + "' /></div>";
                        //}else
                        //    secondHtml += "<div class='item' onclick='GetStationExceptionInfo(\"" + item.LineStationId + "\",\"" + item.ID + "\")'><img src='" + item.PhotoUrl + "' /></div>";
                    }
                    else
                        managehtml += "<div class='item' onclick='ManageExceptionCall(" + item.Status + ",\"" + item.LineStationId + "\",\"" + item.ID + "\",\"" + item.ExceptionName + "\")'><img src='" + item.PhotoUrl + "' /></div>";
                });
                //exceptionhtml = firstHtml + secondHtml;
                $('#exceptionclass').html(exceptionhtml);
                $('#manageclass').html(managehtml);
                //showexception();
            }
        }
    });
}

//是否紧急
function selectUrgent(id, type) {
  
    if (type == 1) {
        ispressing = true;
        $("#" + id).removeClass("btn-default");
        $("#" + id).addClass("btn-primary");
        $("#urgentNo").addClass("btn-default");
        $("#urgentNo").removeClass("btn-primary");
    }
    else {
        ispressing = false;
        $("#" + id).addClass("btn-primary");
        $("#" + id).removeClass("btn-default");
        $("#urgentYes").addClass("btn-default");
        $("#urgentYes").removeClass("btn-primary");
    }

};
//异常呼叫
function GetStationExceptionInfo(StationId, ParentId) {
    exceptionid = "";
    isManageCall = false;
    $.ajax({
        url: '/api/Andon/andon/GetExceptionClassByLineStaionId?LineStationId=' + StationId + "&ParentId=" + ParentId,
        type: 'get',
        success: function (value) {
            if (value.status) {
                var obj = value.message;
                var html = "";
                $.each(obj, function (index, item) {
                    if (item.ExceptionStatus == 1)
                        html += "<button  status='1' id='" + item.ExceptionId + "' type='button' class='btn btn-danger' onclick='exceptioncall(this,5,\"" + StationId + "\",\"" + item.ExceptionId + "\")'>" + item.ExceptionName + "</button>";
                    else if (item.ExceptionStatus == 5)
                        html += "<button  status='1' id='" + item.ExceptionId + "' type='button' class='btn btn-warning' onclick='exceptioncall(this,10,\"" + StationId + "\",\"" + item.ExceptionId + "\")'>" + item.ExceptionName + "</button>";
                    else if (item.ExceptionStatus == 10)
                        html += "<button  status='0' id='" + item.ExceptionId + "' type='button' class='btn btn-success'onclick='exceptioncall(this,1,\"" + StationId + "\",\"" + item.ExceptionId + "\")'>" + item.ExceptionName + "</button>";
                    else
                        html += "<button  status='0' id='" + item.ExceptionId + "' type='button' class='btn btn-success' onclick='exceptioncall(this,1,\"" + StationId + "\",\"" + item.ExceptionId + "\")'>" + item.ExceptionName + "</button>";
                });
                $('#exceptionlist').html(html);
                $('#modal2').modal('toggle');
            }
        }
    });
}


//异常处理
function exceptioncall(element, status, StationId, ExceptionId) {
    stationid = StationId;
    exceptionid = ExceptionId;
    isManageCall = false;
    $('#exceptionlist button[status="0"]').removeClass("btn-danger");
    $('#exceptionlist button[status="0"]').addClass("btn-success");
    if (status == 1) {

        $(element).removeClass("btn-success")
        $(element).addClass("btn-danger")
        //console.log(ShiftType)
        if (ShiftType == '1') {
            GetShiftTypeException(stationid, exceptionid);
        }

    } else if (status == 5) {

        $('#modal4').modal('toggle');
        $('#responseinput').select();
        $('#responseinput').focus();
    } else if (status == 10) {

        $("#modal5").modal('toggle');
        $('#relieveinput').select();
        $('#relieveinput').focus();
        //$('#relieveinput').val("1000050"); // huangrz add 2019-03-22 飞傲定制化;
    } else {
        $(element).removeClass("btn-success")
        $(element).addClass("btn-danger")
        //$('#exceptionlist li').css("background", "");
        //$(element).parent("li").css("background", "#9b39c3");
    }
};
// 加载区分班别的异常
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
        success: function (value) {
            if (value.status) {
                var obj = value.rows;
                obj = JSON.parse(obj);
                var html = "";
                if (obj.length <= 0) {
                    alert("当前已配置区分了班次进行呼叫，当前异常未配置异常班次，请配置班别！");
                    return;

                }
                $.each(obj, function (index, item) {
                    html += "<button class='btn btn-success' ShiftId='" + item.LineShiftId + "' onclick='SelectShiftType(this,\"" + item.LineShiftId + "\")'>"
                        + item.HandleUserName + "-" + item.ShiftName + "</button>" + "";
                })
                $('#exceptionUserList').html(html);
                $('#modal1').modal('toggle');
            } else {
                alert(value.message);
                return;
            }
        }
    })
}
// 区分了白晚班后，选择异常责任人的事件
function SelectShiftType(ele, str) {
    $('#exceptionUserList button').removeClass("btn-danger");
    $('#exceptionUserList button').addClass("btn-success");
    $(ele).addClass('btn-danger');
    LineShiftId = str;
    //console.log(LineShiftId);
};

var suerBtns = ["user", "relieve", "response", "manage", "exceptionlist"]
var ensure = true
//异常签到的确定事件
function exceptionSignInSure(type) {
    if (!ensure)
        return;
    ensure = false;
    switch (type) {
        case "user":
            //console.log("获取责任后，点击确定按钮"); var stationid = '', exceptionid = '',exceptionname='';
            Call(stationid, exceptionid);
            //$("#modal1").modal('hide');
            //$("#modal1").css("display", "none");
            break;
        case "relieve":
            //console.log("异常解除，点击确定按钮");
            var resempno = $("#relieveinput").val().trim();
            var resempnoPsw = $("#relieveinputPsw").val().trim();
            if (resempno == "" || resempno == null)
            {
                alert("工号/电话号码不为未空!");
                ensure = true;
                return;
            }
            if (resempnoPsw == "" || resempnoPsw == null) {
                alert("请输入密码");
                ensure = true;
                return;
            }
            // 判断账号密码是否正确
            $.ajax({
                url: '/api/Andon/AppWeb/GetCheckLogin?usercode=' + resempno + "&password=" + resempnoPsw,
                type: 'get',
                success: function (value) {
                    ensure = true;
                    if (value.status) {
                        if (isManageCall)
                            editreliveexceptionmanagecall(stationid, exceptionid, resempno);
                        else
                            Relieve(stationid, exceptionid, resempno);
                    }else
                        alert(value.message);
                }
            });
            break;
        case "response":
            //console.log("异常签到，点击确定按钮");
            var empno = $("#responseinput").val().trim();
            var empnoPsw = $("#responseinputPsw").val().trim();
            if (empno == "" || empno == null)
            {
                alert("工号/电话号码不为未空!");
                ensure = true;
                return;
            }
            if (empnoPsw == "" || empnoPsw == null) {
                alert("请输入密码");
                ensure = true;
                return;
            }
            // 判断账号密码是否正确
            $.ajax({
                url: '/api/Andon/AppWeb/GetCheckLogin?usercode=' + empno + "&password=" + empnoPsw,
                type: 'get',
                success: function (value) {
                    ensure = true;
                    if (value.status) {
                        Response(stationid, exceptionid, empno);
                    } else
                        alert(value.message);
                }
            });
            break;
        case "manage":
            //console.log("管理呼叫，点击确定按钮");
            editexceptionmanagecall(stationid, exceptionid);
            break;
        case "exceptionlist":
            Call(stationid, exceptionid);
            break;
        default:
            ensure = true;
            break;
    }
}

function isSignIn(userCode, psw) {
    $.ajax({
        url: '/api/Andon/AppWeb/CheckLogin?usercode=' + userCode + "&password=" + psw,
        type: 'get',
        success: function (value) {
            if (value.status) {
                
            }
        }
    });
}

//异常解除的确定事件


//选择责任人的确定事件

//异常呼叫
function Call(StationId, ExceptionId) {
    var param = JSON.stringify({
        LineStationId: StationId,
        ExceptionId: ExceptionId,
        UserCode: UserCode,
        IsPressingCall: ispressing,
        LineShiftId: LineShiftId
    });
    // 如果已经配置了班别未选择班别不能呼叫
    if (ShiftType == '1') {
        if (LineShiftId == "") {
            alert("请选择异常责任人/或请配置异常班组！");
            ensure = true;
            return;
        }
    }
    var address = '/api/Andon/andon/EditExceptionCall';
    if (ispressing)
        address = '/api/Andon/andon/EditExceptionCall';
    $.ajax({
        url: '/api/Andon/andon/EditExceptionCall',
        type: 'post',
        data: param,
        dataType: 'json',
        contentType: 'application/json',
        success: function (value) {
            ensure = true;
            if (value.status) {
                if (ShiftType == '1') {
                    $("#modal1").modal('hide');
                }
                $("#modal2").modal('hide');
                ExceptionUser = value.message;
                exceptionstatus = 1;
                timeload = 10;
                GetExceptionClassByLineStationCode(StationCode);
            } else {
                if (ShiftType == '1') {
                    $("#modal1").modal('hide');
                }
                $("#modal2").modal('hide');
                alert(value.message);
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
        success: function (value) {
            ensure = true;
            if (value.status) {
                ExceptionUser = value.message;
                exceptionstatus = 5;
                timeload = 10;
                GetExceptionClassByLineStationCode(StationCode);
                $("#modal4").modal('hide');
                $("#modal2").modal('hide');
                //$('#responseinput').val(""); // huangrz add 2019-03-22 飞傲定制化;
            } else {
                $("#modal4").modal('hide');
                alert(value.message);
            }
        }, error: function (err) {
            ensure = true;
        }
    });
};
//异常解除
function Relieve(StationId, ExceptionId, usercode) {
    var param = JSON.stringify({
        LineStationId: StationId,
        ExceptionId: ExceptionId,
        UserCode: usercode
    });
    $.ajax({
        url: '/api/Andon/andon/EditRelieveException',
        type: 'post',
        data: param,
        dataType: 'json',
        contentType: 'application/json',
        success: function (value) {
            ensure = true;
            if (value.status) {
                recordid = value.message.ID;
                exceptionstatus = 10;
                ExceptionUser = "";
                timeload = 60;
                GetExceptionClassByLineStationCode(StationCode);
                $("#modal5").modal('hide');
                $("#modal2").modal('hide');
                $('#stars-dialog').modal('toggle')

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


//点赞
function superstar() {
    
    var param = JSON.stringify({
        ID: recordid,
        LineStatonId: stationid,
        ExceptionId: exceptionid,
        Star: $('.glyphicon.glyphicon-star.gold').length
    });
    $.ajax({
        url: '/api/Andon/ExceptionRecord/EditRecordStar',
        type: 'post',
        data: param,
        dataType: 'json',
        contentType: 'application/json',
        success: function (value) {
            if (value.status) {
                $('#stars-dialog').modal('hide')
            } else {
                alert(value.message);
            }
        }
    });
}
//管理呼叫
function ManageExceptionCall(Status, StationId, ExceptionId, ExceptionName) {
    isManageCall = true;
    stationid = StationId;
    exceptionid = ExceptionId;
    //manngeMsg
    //editexceptionmanagecall(StationId, ExceptionId)
    if (Status >= 10) {
        $("#diagTitle").html("管理呼叫");
        $("#manngeMsg").html('你确认要呼叫"' + ExceptionName + '"吗？');
        $("#modal3").modal('toggle');
    } else {
        $("#modal5").modal('toggle');
    }
}
//管理呼叫
function editexceptionmanagecall(stationid, exceptionid) {
    var param = JSON.stringify({
        LineStationId: stationid,
        ExceptionId: exceptionid,
        UserCode: UserCode
    });

    $.ajax({
        url: '/api/Andon/andon/EditExceptionManageCall',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: param,
        success: function (value) {
            ensure = true;
            $("#modal3").modal('hide');
            if (value.status) {
                GetExceptionClassByLineStationCode(StationCode);
            } else {
                alert(value.message);
            }
        }, error: function (err) {
            ensure = true;
        }
    });
};

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
            ensure = true;
            $("#modal5").modal('hide');
            if (value.status) {
                GetExceptionClassByLineStationCode(StationCode);
            } else {
                alert(value.message);
            }
        }, error: function (err) {
            ensure = true;
        }
    });
}