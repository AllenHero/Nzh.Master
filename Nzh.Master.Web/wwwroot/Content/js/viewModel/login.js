var viewModel = function () {
    var self = this;
    this.form = {
        tenantcode: ko.observable(),
        TenantCode2:ko.observable(),
        TenantName:ko.observable(),
        usercode: ko.observable(),
        UserCode2:ko.observable,
        UserName:ko.observable(),
        password: ko.observable(),
        Password2:ko.observable,
        PhoneNumber:ko.observable(),
        remember: ko.observable(false),
        ip: null,
        city: null
    };
    this.message = ko.observable();
    /*
    Author  :   戚江维
    Time    :   20170925
    Description:企业注册
    */
    this.EnterpriseCheckClick = function () {
        self.message("");
        var phone = $('#phonenumberid').val()
        var tenantname=$('#tenantnameid').val()
        if ($.trim(phone).length == 11 && $.trim(tenantname).length > 0) {
            $.ajax({
                type: 'post',
                url: '/login/EnterpriseCheck',
                data: ko.toJSON(self.form),
                success: function (data) {
                    if (data.status == 'success') {
                        $('.step').hide();
                        $('#EnterpriseRegister').show();
                        $('#passwordid').val("");
                    } else {
                        self.message(data.message);
                    }
                }
            });
        } else {
            if ($.trim(tenantname).length ==0)
            {
                $('#tenantnameid').select();
                $('#tenantnameid').focus();
                self.message("请填写企业法定名称");
            } else {
                $('#phonenumberid').select();
                $('#phonenumberid').focus();
                self.message("请正确填写手机号");
            }
        }
    }
    this.EnterpriseRegisterClick = function () {
        var tenantcode = $('#tenantcodeid').val()
        var username = $('#usernameid').val()
        var password=$('#passwordid').val()
        var pinyi = ConvertPinyin(username)
        self.form.UserCode2 = ConvertPinyin(pinyi)
        if ( $.trim(tenantcode)== '')
        {
            $('#tenantcodeid').select();
            $('#tenantcodeid').focus();
            self.message("请填写企业账号");
        } else if ($.trim(username) == '') {
            $('#usernameid').select();
            $('#usernameid').focus();
            self.message("请填写姓名");
        } else if ($.trim(password) == '') {
            $('#passwordid').select();
            $('#passwordid').focus();
            self.message("请填写密码");
        } else {
            $.ajax({
                type: 'post',
                url: '/login/EnterpriseRegister',
                data: ko.toJSON(self.form),
                success: function (data) {
                    if (data.status == 'success') {
                        layer.confirm("恭喜您已经成功注册", {
                            title: '注册成功！',
                            btn: ['登录', '取消']
                        }, function () {
                            var login = JSON.stringify({
                                usercode: $.trim($('#phonenumberid').val()),
                                password: password
                            });
                            var param = ko.toJSON(JSON.parse(login));
                            $.ajax({
                                type: "POST",
                                url: "/login/doAction",
                                data: param,
                                dataType: "json",
                                contentType: "application/json",
                                success: function (d) {
                                    if (d.status == 'success') {
                                        self.message("登录成功正在跳转，请稍候...");
                                        //window.location.href = '/Home/Index';
                                        window.location.href = '/EPS/Index';
                                    } else {
                                        self.message(d.message);
                                    }
                                },
                                error: function (e) {
                                    self.message(e.responseText);
                                },
                                beforeSend: function () {
                                    self.message("正在登录处理，请稍候...");
                                }
                            });
                        }, function () {
                            window.location.href='/login'
                        });
                    } else {
                        self.message(data.message);
                    }
                }
            });
        }
    }
    this.loginClick = function (form) {
        if (!self.form.password())
            self.form.password($('[type=password]').val());
        param = ko.toJSON(self.form);
        $.ajax({
            type: "POST",
            url: "/login/doAction",
            data: ko.toJSON(self.form),
            dataType: "json",
            contentType: "application/json",
            success: function (d) {
                if (d.status == 'success') {
                    self.message("登录成功正在跳转，请稍候...");
                    //if (d.IsAdministrator == false) {
                    window.location.href = '/Home/Index';
                    //window.location.href = '/EPS/Index';
                    //}
                    //else {
                    //    window.location.href = '/Home/Index';
                    //}
                } else {
                    self.message(d.message);
                    //self.message("用户名或密码错误！");
                }
            },
            error: function (e) {
                self.message(e.responseText);
            },
            beforeSend: function () {
                $(form).find("input").attr("disabled", true);
                self.message("正在登录处理，请稍候...");
            },
            complete: function () {
                $(form).find("input").attr("disabled", false);
            }
        });
    };

    this.resetClick = function () {
        self.form.usercode("");
        self.form.password("");
        self.form.remember(false);
    };

    this.init = function () {
        var ILData = ILData || [];
        self.form.ip = ILData[0];
        self.form.tenantcode = tenant;
        //$.getJSON("http://api.map.baidu.com/location/ip?ak=F454f8a5efe5e577997931cc01de3974&callback=?", function (d) {
        //    self.form.city = d.content.address;
        //});
        if (top != window) top.window.location = window.location;
    };

    this.init();
};

$(function () { ko.applyBindings(new viewModel());});