$(function () {
    $("#account").blur(function () {
        GetUserInfo();
    });
    //$("#account").keydown(function (event) {
    //    if (event.keyCode == '13') {
    //        GetUserInfo();
    //    }
    //});
    $("#account,#password").keydown(function (event) {
        if (event.keyCode == "13") {
            event.preventDefault()
            UserLogin();
            console.log("log");
        }
    });

    $("#btnRecoverPW").click(function () {
        //加载首件检验的表单
        $('#myModal').modal('show').css({
            width: '430px',
            'margin-left': function () {
                return -($(this).width() / 2);
            }
        });
    })

})

//document.onkeydown = function (e) { // 回车提交表单
//    // 兼容FF和IE和Opera
//    var theEvent = window.event || e;
//    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
//    if (code == 13) {
//        UserLogin();
//    }
//}

function GetUserInfo() {
    var user = getCookie($("#account").val().toUpperCase());
    if (user) {
        var value = JSON.parse(user);
        $("#password").val(value.password);
    }
}

function SetUserInfo() {
    var value = JSON.stringify({ remember: $("#remember_me").val(), usercode: $("#account").val(), password: $("#password").val(), tenantid: $("#tenantid").val() });
    setCookie($("#account").val().toUpperCase(), value);
}

function UserLogin() {
    if (!$("#account").val() || !$("#password").val()) {
        toastr.warning("请输入用户名和密码!");
    } else {
        //var data = JSON.stringify({
        //    UserName: $("#account").val(),
        //    Password: $("#password").val(),
        //});
        $.ajax({
            url: '/Login/LoginIn',
            type: 'Get',
            data: {
                "UserName": $("#account").val(),
                "Password": $("#password").val()
            },
            dataType: "json",
            contentType: "application/json",
            async: false,
            success: function (value) {
                if (value.Code == '1') {
                    window.location.href = '/iLean';
                    //hideLoading();
                } else {
                    hideLoading();
                    toastr.error(value.Msg);
                }
            },
            error: function (xhr, type, error) {
                hideLoading();
                console.log(error);
            },
            beforeSend: function () {
                showLoading();
            },
            complete: function () {
                //hideLoading();
            },
        });
    }
}

function UserRole() {
    $.ajax({
        url: '/api/sys/user/GetUserRole?UserCode=&TenantId=',
        type: 'get',
        async: false,
        success: function (d) {
            if (d.length) {
                $.each(d, function (index, item) {
                    if (item.RoleCode == 'admin') {
                        window.open('/home');
                    }
                })
            }
        }
    })
    window.location.href = '/iLean';
}