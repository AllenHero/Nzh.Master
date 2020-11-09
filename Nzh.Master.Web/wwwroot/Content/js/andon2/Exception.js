var SampleJSONData = [];
var selecta;
var selectb;
$(function () {
    GetOrganizeUser();
    $("[group=call]").click(function () {
        $(this).removeClass("require");
    });
    $("button[name=cancel]").click(function () {
        $("[group=call]").val("");
    });
    $("button[name=ExceptionCall]").click(function () { 
        ExceptionCall();
    });
});
toastr.options = {
    "closeButton": true,
    "debug": true,
    "positionClass": "toast-bottom-right",
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "500",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

function Check() {
    var status = true;
    if (!$("textarea[name=Exception]").val()) {
        status = false;
        $("textarea[name=Exception]").addClass("require");
    }
    if (!$("textarea[name=Address]").val()) {
        status = false;
        $("textarea[name=Address]").addClass("require");
    }
    if (selecta.datas().length == 0) {
        status = false;
        $("#justAnInputBox1").addClass("require");
    }
    //if (selectb.datas().length==0) {
    //    status = false;
    //    $("#justAnInputBox2").addClass("require");
    //}
    if (status) {
        var ccuser = "";
        if (selectb.datas().length > 0) {
            ccuser = selectb.datas()[0].id;
            $.each(selectb.datas(), function (index, item) {
                if (index > 0) {
                    ccuser += "," + item.id;
                }
            });
        }
        var images = [];
        if ($("#uploadImge img")) {
            $.each($("#uploadImge img"), function (index, item) {
                images.push($(item).attr("src"));
            });
        }

        return {
            "status": true,
            "callUserId": UserId,
            "exception": $("textarea[name=Exception]").val().replace(/\\/g, '\\\\'),
            "address": $("textarea[name=Address]").val().replace(/\\/g, '\\\\'),
            "handlerId": selecta.datas()[0].id,
            "ccUser": ccuser,
            "images":images
        };
    } else {
        return { "status": false };
    }
}

//var image=new img_compress_upload({
//    max_height: 1024,
//    max_width: 1024,
//    max_num: 100,
//    list_box: $('.img_box'),
//    add_btn: $('.img_box .add_btn'),
//    del_btn_class: 'del',
//    submit_btn: $('.submit_btn'),
//    submit_form: $('.submit_form')
//});

function GetOrganizeUser() {
    $.ajax({
        url: '/api/sys/userorganizemap/GetAllOrganizeUser?tenantId=' + TenantId,
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
                SampleJSONData = organizes;
                //加载人员选择
                AddUserSelect();
            }
        }
    });
}

function ExceptionCall() {
    var value = Check();
    if (value.status) {
		var btn=$("button[name=ExceptionCall]");
		btn.attr("disabled","disabled");
		setTimeout(function(){ 
			console.log(btn);		
			btn.removeAttr("disabled");
		}, 3000);
		console.log('1111');
		
        $.ajax({
            url: '/api/andon2/andon/EditCalling',//"/api/andon2/flowable/EditCreateInstance",
            type: "POST",
            data: JSON.stringify(value),
            contentType: "application/json",
            beforeSend: jQueryShowLoading('信息发送中……'),//显示加载图标
            success: function (value) {
                jQuery('body').hideLoading();//隐藏加载图标
                if (value.status) {
                    toastr.success("异常已成功发送给处理人");
                    // window.location.href="/self/my";
                } else {
                    toastr.warning(value.message);
                }
            }
        });
    }
}

//加载人员选择
function AddUserSelect() {
    selecta = $('#justAnInputBox1').comboTree({
        source: SampleJSONData,
        isMultiple: false,
        isFirstClassSelectable: false, //第一级是否可选
        cascadeSelect: true,
        selectedlength: 3,
        url: '',
        method:'get'//最多可选
    });

    selectb = $('#justAnInputBox2').comboTree({
        source: SampleJSONData,
        isMultiple: true,
        isFirstClassSelectable: false, //第一级是否可选
        cascadeSelect: true,
        selectedlength: 100,
        url: '',
        method: 'get'//最多可选
    });
}