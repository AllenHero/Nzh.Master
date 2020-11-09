
//自定义表单开始
$(document).ready(function () {
    //预览
    var chss = 0;
    setup_draggable();
    //$('.btn-yulan').click(function() {
    //    if (chss == 0) {
    //        $("#colzuo").attr("class", "col-sm-12");
    //        $("#colyou").hide();
    //        $(".tools").hide();
    //        chss++;
    //    } else {
    //        $("#colzuo").attr("class", "col-sm-9");
    //        $("#colyou").show();
    //        $(".tools").show();
    //        chss = 0;
    //    }
    //});
    //$("#copy-to-clipboard").on("click", function() {
    //        var $copy = $(".form-body").clone().appendTo(document.body);

    //        $copy.find(".tools, :hidden").remove();

    //        $.each(["draggable", "droppable", "sortable", "dropped", "ui-sortable", "ui-draggable", "ui-droppable", "form-body"], function(i, c) {
    //            $copy.find("." + c).removeClass(c).removeAttr("style")
    //        });

    //        var html = html_beautify($copy.html());
    //        $copy.remove();

    //        $modal = get_modal(html, 'cont').modal("show");
    //        $modal.find(".btn").remove();
    //        $modal.find(".modal-title").html("复制HTML代码");
    //        $modal.find(":input:first").select().focus();

    //        return false
    //    })
    //点击添加表单
    $(".btntext,.btntexts").click(function () {
        $(tableList($(this).attr("id"))).appendTo($(".ui-sortable"));
        $(".labcheck input").unbind('click');
        $(".labcheck input").click(function () {
            //if ($(this).is(":checked")) {
            //    alert("选中");
            //} else {
            //    alert("未选中");
            //}
        });
        //时间初始化
        $(".form_datetime").datetimepicker({
            language: 'zh-CN', //日期
            format: "yyyy/mm/dd hh:ii",
            initialDate: new Date(), //初始化当前日期
            autoclose: true, //选中自动关闭
            todayBtn: true //显示今日按钮
        });
        //上传初始化
        $('.uploadfile').fileinput({
            language: 'zh'
        });
        //省市区初始化
        $('.distpicker').distpicker({
            province: '省份名',
            city: '城市名',
            district: '区名',
            autoSelect: true,
            placeholder: false
        });
    });
});

var setup_draggable = function () {
    $(".draggable").draggable({
        appendTo: "body",
        helper: "clone"
    });
    var droppable=$(".droppable").droppable({
        accept: ".draggable",
        helper: "clone",
        hoverClass: "droppable-active",
        drop: function (event, ui) {
            $(".empty-form").remove();
            var $orig = $(ui.draggable);
            if (!$(ui.draggable).hasClass("dropped")) {
                var id = $orig.attr("id");
                var dom = $(tableList($orig.attr("id"))).appendTo(this);
                if (dom) {
                    switch (id) {
                        case "organize": SetOrganize(); break;
                        case "user": SetUser(); break;
                        case "customer": SetCustomer(); break;
                    }
                }
                //日期时间初始化
                $(".form_datetime").datetimepicker({
                    language: 'zh-CN', //日期
                    format: "yyyy-mm-dd hh:ii:ss",
                    initialDate: new Date(), //初始化当前日期
                    autoclose: true, //选中自动关闭
                    todayBtn: true //显示今日按钮
                });
                //日期时间初始化
                $(".form_date").datetimepicker({
                    language: 'zh-CN', //日期
                    format: "yyyy-mm-dd",
                    initialDate: new Date(), //初始化当前日期
                    autoclose: true, //选中自动关闭
                    todayBtn: true //显示今日按钮
                });
                //上传初始化
                $('.uploadfile').fileinput({
                    language: 'zh'
                });
                //省市区初始化
                $('.distpicker').distpicker({
                    province: '省份名',
                    city: '城市名',
                    district: '区名',
                    autoSelect: true,
                    placeholder: false
                });
            } else {
                if ($(this)[0] != $orig.parent()[0]) {
                    var $el = $orig.clone().appendTo(this);
                    $orig.remove()
                }
            }
        }
    }).sortable();
    $(".droppable").droppable({
        create: function (event, ui) {
            var $orig = $(ui.draggable);
            var id = $orig.attr("id");

            switch (id) {
                case "organize": SetOrganize(); break;
                case "user": SetUser(); break;
                case "customer": SetCustomer(); break;
            }
        }
    }).sortable();
};
//表单自定义
function tableList(id,field) {
    var column = GetNewFieldName();
    if (!column) {
        toolbar.warning("字段数据超出最大值");
        return false;
    }
    if (!field) {
        field = {
            Id: '', Source: Source, Column: column, ColumnName: '', ColumnTag: ''
            , ColumnType: '', DefaultValue: '', SelectValue: ''
            , Seq: '', IsForm: true, IsUnique: false, IsMust: false, IsCustomer: true
        };
    }
    var content = "";
    switch (id) {
        case "number":
            //文本框
            //var text = '<input type="text" class="form-control" placeholder="请输入文本">';
            //content = '<div class="form-group draggable ui-draggable dropped field"><label class="col-sm-2 control-label">文本：</label><div class="col-sm-7">' + text + '</div><p class="tools col-sm-3"><a class="edit-link" name="text" title="设置"><i class="fa fa-cog fa-fw"></i></a><a class="remove-link"><i class="fa fa-trash-o"></i></a><label class="labcheck"><input type="checkbox"> 必填</label></p></div>';
            if (!field.ColumnName) field.ColumnName = '数字';
            if (!field.ColumnType) field.ColumnType = 'text';
            content = GetNumber(field);
            break;
        case "text":
            //文本框
            //var text = '<input type="text" class="form-control" placeholder="请输入文本">';
            //content = '<div class="form-group draggable ui-draggable dropped field"><label class="col-sm-2 control-label">文本：</label><div class="col-sm-7">' + text + '</div><p class="tools col-sm-3"><a class="edit-link" name="text" title="设置"><i class="fa fa-cog fa-fw"></i></a><a class="remove-link"><i class="fa fa-trash-o"></i></a><label class="labcheck"><input type="checkbox"> 必填</label></p></div>';
            if (!field.ColumnName) field.ColumnName = '文本';
            if (!field.ColumnType) field.ColumnType = 'text';
            content = GetText(field);
            break;
        case "select":
            //下拉框
            //var select = '<select class="form-control"><option>请选择</option><option>默认</option></select>';
            //content = '<div class="form-group draggable ui-draggable dropped field"><label class="col-sm-2 control-label">下拉框：</label><div class="col-sm-7">' + select + '</div><p class="tools col-sm-3"><a class="edit-link" name="select" title="设置"><i class="fa fa-cog fa-fw"></i></a><a class="remove-link"><i class="fa fa-trash-o"></i></a><label class="labcheck"><input type="checkbox"> 必填</label></p></div>';
            if (!field.ColumnName) field.ColumnName = '下拉框';
            if (!field.ColumnType) field.ColumnType = 'select';
            if (!field.SelectValue) field.SelectValue = '选项1,选项2';
            content = GetSelect(field);
            break;
        case "textarea":
            //多行文本
            //var textarea = '<textarea class="form-control" placeholder="请输入文本"></textarea>';
            //content = '<div class="form-group draggable ui-draggable dropped field"><label class="col-sm-2 control-label">多行文本：</label><div class="col-sm-7">' + textarea + '</div><p class="tools col-sm-3"><a class="edit-link" name="textarea" title="设置"><i class="fa fa-cog fa-fw"></i></a><a class="remove-link"><i class="fa fa-trash-o"></i></a><label class="labcheck"><input type="checkbox"> 必填</label></p></div>';
            if (!field.ColumnName) field.ColumnName = '多行文本';
            if (!field.ColumnType) field.ColumnType = 'textarea';
            content = GetTextarea(field);
            break;
        case "radio":
            //单选框
            //var radom = Math.ceil(Math.random() * 100000);
            //var radio = '<label class="radio-inline"><input type="radio" value="默认1" name="rad' + radom + '" checked> 默认1</label><label class="radio-inline"><input type="radio" name="rad' + radom + '" value="默认2"> 默认2</label>';
            //content = '<div class="form-group draggable ui-draggable dropped field"><label class="col-sm-2 control-label">单选：</label><div class="col-sm-7">' + radio + '</div><p class="tools col-sm-3"><a class="edit-link" name="radio" title="设置"><i class="fa fa-cog fa-fw"></i></a><a class="remove-link"><i class="fa fa-trash-o"></i></a></p></div>';
            if (!field.ColumnName) field.ColumnName = '单选框';
            if (!field.ColumnType) field.ColumnType = 'radio';
            if (!field.SelectValue) field.SelectValue = '选项1,选项2';
            content = GetRadioBox(field);
            break;
        case "checkbox":
            //多选框
            //var checkbox = '<label class="radio-inline" style="padding-left:0px;"><input type="checkbox" name="默认1"> 默认1</label><label class="radio-inline" style="padding-left:0px;"><input type="checkbox" name="默认2"> 默认2</label>';
            //content = '<div class="form-group draggable ui-draggable dropped field"><label class="col-sm-2 control-label">多选：</label><div class="col-sm-7">' + checkbox + '</div><p class="tools col-sm-3"><a class="edit-link" name="checkbox" title="设置"><i class="fa fa-cog fa-fw"></i></a><a class="remove-link"><i class="fa fa-trash-o"></i></a></p></div>';
            if (!field.ColumnName) field.ColumnName = '多选框';
            if (!field.ColumnType) field.ColumnType = 'checkbox';
            if (!field.SelectValue) field.SelectValue = '选项1,选项2';
            content = GetCheckBox(field);
            break;
        case "datetime":
            //时间
            //var datetime = '<input readonly="" class="form-control form_datetime" type="text" style="border: 1px solid #e5e6e7;">';
            //content = '<div class="form-group draggable ui-draggable dropped field"><label class="col-sm-2 control-label">文本：</label><div class="col-sm-7">' + datetime + '</div><p class="tools col-sm-3"><a class="edit-link" name="datetime" title="设置"><i class="fa fa-cog fa-fw"></i></a><a class="remove-link"><i class="fa fa-trash-o"></i></a></p></div>';
            if (!field.ColumnName) field.ColumnName = '时间';
            if (!field.ColumnType) field.ColumnType = 'datetime';
            content = GetDateTime(field);
            break;
        case "date":
            //日期
            //var datetime = '<input readonly="" class="form-control form_datetime" type="text" style="border: 1px solid #e5e6e7;">';
            //content = '<div class="form-group draggable ui-draggable dropped field"><label class="col-sm-2 control-label">文本：</label><div class="col-sm-7">' + datetime + '</div><p class="tools col-sm-3"><a class="edit-link" name="datetime" title="设置"><i class="fa fa-cog fa-fw"></i></a><a class="remove-link"><i class="fa fa-trash-o"></i></a></p></div>';
            if (!field.ColumnName) field.ColumnName = '日期';
            field.ColumnType = 'date';
            content = GetDate(field);
            break;
        case "file":
            //上传
            //var file = '<input class="file uploadfile" type="file" multiple data-min-file-count="1">';
            //content = '<div class="form-group draggable ui-draggable dropped field"><label class="col-sm-2 control-label">上传：</label><div class="col-sm-7">' + file + '</div><p class="tools col-sm-3"><a class="edit-link" name="file" title="设置"><i class="fa fa-cog fa-fw"></i></a><a class="remove-link"><i class="fa fa-trash-o"></i></a></p></div>';
            if (!field.ColumnName) field.ColumnName = '文件上传';
            if (!field.ColumnType) field.ColumnType = 'file';
            content = GetFileUpload(field);
            break;
        case "picker":
            //省市区
            //var picker = '<form class="form-inline"><div class="distpicker"><div class="form-group" style="margin:0px; padding-right:10px;"><label class="sr-only" for="province10">Province</label><select class="form-control" id="province10"></select></div><div class="form-group" style="margin:0px; padding-right:10px;"><label class="sr-only" for="city10">City</label><select class="form-control" id="city10"></select></div><div class="form-group" style="margin:0px; padding-right:10px;"><label class="sr-only" for="district10">District</label><select class="form-control" id="district10"></select></div></div></form>';
            //content = '<div class="form-group draggable ui-draggable dropped field"><label class="col-sm-2 control-label">省市区：</label><div class="col-sm-7">' + picker + '</div><p class="tools col-sm-3"><a class="edit-link" name="picker" title="设置"><i class="fa fa-cog fa-fw"></i></a><a class="remove-link"><i class="fa fa-trash-o"></i></a></p></div>';
            if (!field.ColumnName) field.ColumnName = '省市区';
            if (!field.ColumnType) field.ColumnType = 'picker';
            content = GetPicker(field);
            break;
        case "name":
            //姓名
            var text = '<input type="text" class="form-control" placeholder="请输入你的姓名">';
            content = '<div class="form-group draggable ui-draggable dropped field"><label class="col-sm-2 control-label">姓名：</label><div class="col-sm-7">' + text + '</div><p class="tools col-sm-3"><a class="edit-link" name="text" title="设置"><i class="fa fa-cog fa-fw"></i></a><a class="remove-link"><i class="fa fa-trash-o"></i></a><label class="labcheck"><input type="checkbox"> 必填</label></p></div>';
            break;
        case "phone":
            //电话
            //var text = '<input type="text" class="form-control" placeholder="请输入你的电话">';
            //content = '<div class="form-group draggable ui-draggable dropped field"><label class="col-sm-2 control-label">电话：</label><div class="col-sm-7">' + text + '</div><p class="tools col-sm-3"><a class="edit-link" name="text" title="设置"><i class="fa fa-cog fa-fw"></i></a><a class="remove-link"><i class="fa fa-trash-o"></i></a><label class="labcheck"><input type="checkbox"> 必填</label></p></div>';
            content = GetPhone();
            break;
        case "email":
            //邮箱
            //var text = '<input type="text" class="form-control" placeholder="请输入你的邮箱">';
            //content = '<div class="form-group draggable ui-draggable dropped field"><label class="col-sm-2 control-label">邮箱：</label><div class="col-sm-7">' + text + '</div><p class="tools col-sm-3"><a class="edit-link" name="text" title="设置"><i class="fa fa-cog fa-fw"></i></a><a class="remove-link"><i class="fa fa-trash-o"></i></a><label class="labcheck"><input type="checkbox"> 必填</label></p></div>';
            content = GetEmail();
            break;
        case "card":
            //身份证
            //var text = '<input type="text" class="form-control" placeholder="请输入你的身份证">';
            //content = '<div class="form-group draggable ui-draggable dropped field"><label class="col-sm-2 control-label">身份证：</label><div class="col-sm-7">' + text + '</div><p class="tools col-sm-3"><a class="edit-link" name="text" title="设置"><i class="fa fa-cog fa-fw"></i></a><a class="remove-link"><i class="fa fa-trash-o"></i></a><label class="labcheck"><input type="checkbox"> 必填</label></p></div>';
            content = GetCard();
            break;
        case "www":
            //个人网址
            var text = '<input type="text" class="form-control" placeholder="请输入你的个人网站地址">';
            content = '<div class="form-group draggable ui-draggable dropped field"><label class="col-sm-2 control-label">个人网站：</label><div class="col-sm-7">' + text + '</div><p class="tools col-sm-3"><a class="edit-link" name="text" title="设置"><i class="fa fa-cog fa-fw"></i></a><a class="remove-link"><i class="fa fa-trash-o"></i></a><label class="labcheck"><input type="checkbox"> 必填</label></p></div>';
            break;
        case "logo":
            //上传Logo
            var file = '<input class="file uploadfile" type="file" multiple data-min-file-count="1">';
            content = '<div class="form-group draggable ui-draggable dropped field"><label class="col-sm-2 control-label">上传Logo：</label><div class="col-sm-7">' + file + '</div><p class="tools col-sm-3"><a class="edit-link" name="file" title="设置"><i class="fa fa-cog fa-fw"></i></a><a class="remove-link"><i class="fa fa-trash-o"></i></a></p></div>';
            break;
        case "sex":
            //性别
            //var radom = Math.ceil(Math.random() * 100000);
            //var radio = '<label class="radio-inline"><input type="radio" value="男" name="rad' + radom + '" checked> 男</label><label class="radio-inline"><input type="radio" name="rad' + radom + '" value="女"> 女</label>';
            //content = '<div class="form-group draggable ui-draggable dropped field"><label class="col-sm-2 control-label">性别：</label><div class="col-sm-7">' + radio + '</div><p class="tools col-sm-3"><a class="edit-link" name="radio" title="设置"><i class="fa fa-cog fa-fw"></i></a><a class="remove-link"><i class="fa fa-trash-o"></i></a></p></div>';
            content = GetSex();
            break;
        case "occupation":
            //职位
            var text = '<input type="text" class="form-control" placeholder="请输入你的职位">';
            content = '<div class="form-group draggable ui-draggable dropped field"><label class="col-sm-2 control-label">职位：</label><div class="col-sm-7">' + text + '</div><p class="tools col-sm-3"><a class="edit-link" name="text" title="设置"><i class="fa fa-cog fa-fw"></i></a><a class="remove-link"><i class="fa fa-trash-o"></i></a><label class="labcheck"><input type="checkbox"> 必填</label></p></div>';
            break;
        case "profile":
            //个人简介
            var textarea = '<textarea class="form-control" placeholder="请输入你的简介"></textarea>';
            content = '<div class="form-group draggable ui-draggable dropped field"><label class="col-sm-2 control-label">个人简介：</label><div class="col-sm-7">' + textarea + '</div><p class="tools col-sm-3"><a class="edit-link" name="textarea" title="设置"><i class="fa fa-cog fa-fw"></i></a><a class="remove-link"><i class="fa fa-trash-o"></i></a><label class="labcheck"><input type="checkbox"> 必填</label></p></div>';
            break;
        case "user":
            if (!field.ColumnName) field.ColumnName = '员工';
            if (!field.ColumnType) field.ColumnType = 'user';
            content = GetUser(field);
            break;
        case "organize":
            if (!field.ColumnName) field.ColumnName = '组织';
            if (!field.ColumnType) field.ColumnType = 'organize';
            content = GetOrganize(field);
            break;

        case "customer":
            if (!field.ColumnName) field.ColumnName = '客户';
            if(!field.ColumnType) field.ColumnType = 'customer';
            content = GetCustomer(field);
            break;
        case "isorno":
            if (!field.ColumnName) field.ColumnName = '是/否';
            if (!field.ColumnType) field.ColumnType = 'isorno';
            content = GetIsorno(field);
            break;
        case "priority":
            if (!field.ColumnName) field.ColumnName = '优先级';
            if (!field.ColumnType) field.ColumnType = 'priority';
            content = GetPriority(field);
            break;
    }
    return content;
}
//表单自定义设置
function tabUp(tabL, $el) {
    var content = "";
    switch (tabL) {
        case "text":
            //文本框
            content = '<div class="row tabup"><div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">标题：</label><div class="col-sm-9"><input type="text" class="form-control" value="' + $el.find("label:eq(0)").html().substring(0, $el.find("label:eq(0)").html().length - 1) + '" placeholder="请输入标题"></div></div><div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">提示信息：</label><div class="col-sm-9"><input type="text" class="form-control" value="' + $el.find("input:eq(0)").attr("placeholder") + '" placeholder="请输入提示信息"></div></div><div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">默认值：</label><div class="col-sm-9"><input type="text" class="form-control" value="' + $el.find("input:eq(0)").attr("placeholder") + '" placeholder="默认值"></div></div></div>';
            break;
        case "select":
            //下拉框
            content += '<div class="row tabup">';
            content += '<div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">标题：</label><div class="col-sm-9"><input type="text" class="form-control" value="' + $el.find("label:eq(0)").html().substring(0, $el.find("label:eq(0)").html().length - 1) + '" placeholder="请输入标题"></div></div>';
            content += '<div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">子项1：</label><div class="col-sm-8"><input type="text" class="form-control" value="' + $el.find("select").find("option:eq(0)").html() + '" placeholder="请输入子项"></div><label class="col-sm-1 control-label"><i class="fa fa-plus-square select-add" title="添加" style="font-size:18px; cursor:pointer;"></i></label></div>';
            content += '<div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">子项2：</label><div class="col-sm-8"><input type="text" class="form-control" value="' + $el.find("select").find("option:eq(1)").html() + '" placeholder="请输入子项"></div><label class="col-sm-1 control-label"></label></div>';
            $el.find("select").find("option").each(function (index) {
                if (index > 1) {
                    content += '<div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">子项' + (index + 1) + '：</label><div class="col-sm-8"><input type="text" class="form-control" value="' + $(this).html() + '" placeholder="请输入子项"></div><label class="col-sm-1 control-label"><i class="fa fa-trash-o select-del" title="删除" style="font-size:18px; cursor:pointer;"></i></label></div>';
                }
            });
            content += '</div>';
            break;
        case "textarea":
            //多行文本
            content = '<div class="row tabup"><div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">标题：</label><div class="col-sm-9"><input type="text" class="form-control" value="' + $el.find("label:eq(0)").html().substring(0, $el.find("label:eq(0)").html().length - 1) + '" placeholder="请输入标题"></div></div><div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">提示信息：</label><div class="col-sm-9"><input type="text" class="form-control" value="' + $el.find("textarea").attr("placeholder") + '" placeholder="请输入提示信息"></div></div></div>';
            break;
        case "radio":
            //单选框
            content += '<div class="row tabup">';
            content += '<div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">标题：</label><div class="col-sm-9"><input type="text" class="form-control" value="' + $el.find("label:eq(0)").html().substring(0, $el.find("label:eq(0)").html().length - 1) + '" placeholder="请输入标题"></div></div>';
            content += '<div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">子项1：</label><div class="col-sm-8"><input type="text" class="form-control" value="' + $el.find("input[type='radio']:eq(0)").attr("value") + '" placeholder="请输入子项"></div><label class="col-sm-1 control-label"><i class="fa fa-plus-square select-add" title="添加" style="font-size:18px; cursor:pointer;"></i></label></div>';
            content += '<div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">子项2：</label><div class="col-sm-8"><input type="text" class="form-control" value="' + $el.find("input[type='radio']:eq(1)").attr("value") + '" placeholder="请输入子项"></div><label class="col-sm-1 control-label"></label></div>';
            $el.find("input[type='radio']").each(function (index) {
                if (index > 1) {
                    content += '<div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">子项' + (index + 1) + '：</label><div class="col-sm-8"><input type="text" class="form-control" value="' + $(this).attr("value") + '" placeholder="请输入子项"></div><label class="col-sm-1 control-label"><i class="fa fa-trash-o select-del" title="删除" style="font-size:18px; cursor:pointer;"></i></label></div>';
                }
            });
            content += '</div>';
            break;
        case "checkbox":
            //多选框
            content += '<div class="row tabup">';
            content += '<div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">标题：</label><div class="col-sm-9"><input type="text" class="form-control" value="' + $el.find("label:eq(0)").html().substring(0, $el.find("label:eq(0)").html().length - 1) + '" placeholder="请输入标题"></div></div>';
            content += '<div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">子项1：</label><div class="col-sm-8"><input type="text" class="form-control" value="' + $el.find("input[type='checkbox']:eq(0)").attr("name") + '" placeholder="请输入子项"></div><label class="col-sm-1 control-label"><i class="fa fa-plus-square select-add" title="添加" style="font-size:18px; cursor:pointer;"></i></label></div>';
            content += '<div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">子项2：</label><div class="col-sm-8"><input type="text" class="form-control" value="' + $el.find("input[type='checkbox']:eq(1)").attr("name") + '" placeholder="请输入子项"></div><label class="col-sm-1 control-label"></label></div>';
            $el.find("input[type='checkbox']").each(function (index) {
                if (index > 1) {
                    content += '<div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">子项' + (index + 1) + '：</label><div class="col-sm-8"><input type="text" class="form-control" value="' + $(this).attr("name") + '" placeholder="请输入子项"></div><label class="col-sm-1 control-label"><i class="fa fa-trash-o select-del" title="删除" style="font-size:18px; cursor:pointer;"></i></label></div>';
                }
            });
            content += '</div>';
            break;
        case "datetime":
            //时间
            content = '<div class="row tabup"><div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">标题：</label><div class="col-sm-9"><input type="text" class="form-control" value="' + $el.find("label:eq(0)").html().substring(0, $el.find("label:eq(0)").html().length - 1) + '" placeholder="请输入标题"></div></div></div>';
            break;
        case "file":
            //上传
            content = '<div class="row tabup"><div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">标题：</label><div class="col-sm-9"><input type="text" class="form-control" value="' + $el.find("label:eq(0)").html().substring(0, $el.find("label:eq(0)").html().length - 1) + '" placeholder="请输入标题"></div></div></div>';
            break;
        case "picker":
            //省市区
            content = '<div class="row tabup"><div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">标题：</label><div class="col-sm-9"><input type="text" class="form-control" value="' + $el.find("label:eq(0)").html().substring(0, $el.find("label:eq(0)").html().length - 1) + '" placeholder="请输入标题"></div></div></div>';
            break;
    }
    return content;
}

var get_modal = function (content, tabL, $el) {
    var modal = "";
    var html = "";
    if (tabL == "cont") {
        html = '<div class="modal" style="overflow: auto;" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><a type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</a><h4 class="modal-title">表单信息设置</h4></div><div class="modal-body ui-front"><xmp class="form-control"  style="min-height: 200px; overflow-y: auto; margin-bottom: 10px;font-family: Monaco, Fixed">' + content + '</xmp><button class="btn btn-success">确认</button></div></div></div></div>';

    } else {
        html = '<div class="modal" style="overflow: auto;" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><a type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</a><h4 class="modal-title">表单信息设置</h4></div><div class="modal-body ui-front">' + tabUp(tabL, $el) + '<xmp class="form-control"  style="min-height: 200px; display:none; overflow-y: auto; margin-bottom: 10px;font-family: Monaco, Fixed">' + content + '</xmp><button class="btn btn-success">确认</button></div></div></div></div>';

    }
    modal = $(html).appendTo(document.body);
    return modal;
};

var get_attr = function (content, tabL, $el) {
    if (tabL == "cont") {
        modal = $('<div class="modal" style="overflow: auto;" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><a type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</a><h4 class="modal-title">表单信息设置</h4></div><div class="modal-body ui-front"><xmp class="form-control"  style="min-height: 200px; overflow-y: auto; margin-bottom: 10px;font-family: Monaco, Fixed">' + content + '</xmp><button class="btn btn-success">确认</button></div></div></div></div>').appendTo(document.getElementById("fieldAttr"));
    } else {
        modal = $('<div class="modal" style="overflow: auto;" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><a type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</a><h4 class="modal-title">表单信息设置</h4></div><div class="modal-body ui-front">' + tabUp(tabL, $el) + '<xmp class="form-control"  style="min-height: 200px; display:none; overflow-y: auto; margin-bottom: 10px;font-family: Monaco, Fixed">' + content + '</xmp><button class="btn btn-success">确认</button></div></div></div></div>').appendTo(document.getElementById("fieldAttr"));
    }
};

$(document).on("click", ".edit-link", function (ev) {

    var tabname = $(this).attr('name');
    var $el = $(this).parent().parent();
    var $el_copy = $el.clone();
    var $edit_btn = $el_copy.find(".edit-link").parent().remove();
    var $modal = get_modal(html_beautify($el_copy.html()), tabname, $el).modal("show");

    $modal.find(".btn-success").click(function (ev2) {
        //表单自定义js
        switch (tabname) {
            case "text":
                //文本框
                $el.find("label:eq(0)").html($(this).parent().find("input:eq(0)").val() + "：");
                $el.find("input:eq(0)").attr("placeholder", $(this).parent().find("input:eq(1)").val());
                $modal.modal("hide");
                return false;
                break;
            case "select":
                //下拉框
                var option = "";
                var panduan = 0;
                $(this).parent().find("input").each(function (index, element) {
                    if (index == 0) {
                        $el.find("label:eq(0)").html($(this).parent().find("input:eq(0)").val() + "：");
                    } else {
                        if ($(this).val() == "") {
                            panduan = 1;
                            $(this).focus();
                            return false;
                        } else {
                            option += "<option>" + $(this).val() + "</option>";
                        }
                    }
                });
                if (panduan != 0) {
                    alert("不能有空值！");
                } else {
                    $el.find("select").html(option);
                    $modal.modal("hide");
                }
                break;
            case "textarea":
                //多行文本
                $el.find("label:eq(0)").html($(this).parent().find("input:eq(0)").val() + "：");
                $el.find("textarea").attr("placeholder", $(this).parent().find("input:eq(1)").val());
                $modal.modal("hide");
                return false;
                break;
            case "datetime":
                //时间
                $el.find("label:eq(0)").html($(this).parent().find("input:eq(0)").val() + "：");
                $modal.modal("hide");
                return false;
                break;
            case "file":
                //上传
                $el.find("label:eq(0)").html($(this).parent().find("input:eq(0)").val() + "：");
                $modal.modal("hide");
                return false;
                break;
            case "picker":
                //省市区
                $el.find("label:eq(0)").html($(this).parent().find("input:eq(0)").val() + "：");
                $modal.modal("hide");
                return false;
                break;
            case "radio":
                //单选
                var option = "";
                var panduan = 0;
                var radom = Math.ceil(Math.random() * 100000);
                $(this).parent().find("input").each(function (index, element) {
                    if (index == 0) {
                        $el.find("label:eq(0)").html($(this).parent().find("input:eq(0)").val() + "：");
                    } else if (index == 1) {
                        if ($(this).val() == "") {
                            panduan = 1;
                            $(this).focus();
                            return false;
                        } else {
                            option += '<label class="radio-inline"><input type="radio" name="rad' + radom + '" value="' + $(this).val() + '" checked> ' + $(this).val() + '</label>';
                        }
                    } else {
                        if ($(this).val() == "") {
                            panduan = 1;
                            $(this).focus();
                            return false;
                        } else {
                            option += '<label class="radio-inline"><input type="radio" name="rad' + radom + '" value="' + $(this).val() + '" > ' + $(this).val() + '</label>';
                        }
                    }
                });
                if (panduan != 0) {
                    alert("不能有空值！");
                } else {
                    $el.find("div[class='col-sm-7']").html(option);
                    $modal.modal("hide");
                }
                return false;
                break;
            case "checkbox":
                //多选
                var option = "";
                var panduan = 0;
                $(this).parent().find("input").each(function (index, element) {
                    if (index == 0) {
                        $el.find("label:eq(0)").html($(this).parent().find("input:eq(0)").val() + "：");
                    } else if (index == 1) {
                        if ($(this).val() == "") {
                            panduan = 1;
                            $(this).focus();
                            return false;
                        } else {
                            option += '<label class="radio-inline"><input type="checkbox" name="' + $(this).val() + '"> ' + $(this).val() + '</label>';
                        }
                    } else {
                        if ($(this).val() == "") {
                            panduan = 1;
                            $(this).focus();
                            return false;
                        } else {
                            option += '<label class="radio-inline"><input type="checkbox" name="' + $(this).val() + '" > ' + $(this).val() + '</label>';
                        }
                    }
                });
                if (panduan != 0) {
                    alert("不能有空值！");
                } else {
                    $el.find("div[class='col-sm-7']").html(option);
                    $modal.modal("hide");
                }
                return false;
                break;
        }

    })
    //select 增加和删除
    $modal.find(".select-add").click(function () {
        var str = '<div class="col-sm-12" style="margin-bottom:10px"><label class="col-sm-3 control-label">子项1：</label><div class="col-sm-8"><input type="text" class="form-control" value="" placeholder="请输入子项"></div><label class="col-sm-1 control-label"><i class="fa fa-trash-o select-del" title="删除" style="font-size:18px; cursor:pointer;"></i></label></div>';
        $(this).parent().parent().parent().parent().find("div[class='row tabup']").append(str);

        $(".select-del").unbind('click');

        $(".select-del").click(function () {
            var r = confirm("是否删除？")
            if (r == true) {
                $(this).parent().parent().remove();
            }

        });
        $(this).parent().parent().parent().parent().find("label[class='col-sm-3 control-label']").each(function (index, element) {
            if (index > 1) {
                $(this).html("子项" + index + "：");
            }
        });
    });
    $(".select-del").unbind('click');
    $modal.find(".select-del").click(function () {

        var r = confirm("是否删除？")
        if (r == true) {
            $(this).parent().parent().remove();
        }
    });
    //select 增加和删除
});

$(document).on("click", ".remove-link", function (ev) {
    var r = confirm("是否删除？")
    if (r == true) {
        //$(this).parent().parent().remove();
        var field = this.parentElement.parentElement.getAttribute("data");
        field = JSON.parse(field);
        if (field.Id) {
            var deletebody = document.getElementById("form-delete");
            deletebody.appendChild(this.parentElement.parentElement);
        } else {
            $(this.parentElement.parentElement).remove();
        }
    }
});

function GetFieldIitem(data) {
    var html = $("#optionlist").html();
    if (data) {
        var options = data.split(",");
        if (options.length > 0) {
            html = "";
            options.forEach(function (item, index) {
                if (!item)
                    return true;
                if (index == 0)
                    html = '<div class="col-sm-12" style="margin-bottom:10px"><div class="col-sm-1"><input type="radio" name="select" /></div><div class="col-sm-9"><input group="selectvalue" type="text" class="form-control" value="' + item + '" placeholder="请输入子项"></div><label class="col-sm-1 control-label"><i class="fa fa-plus-square select-add" title="添加" style="font-size:18px; cursor:pointer;"></i></label></div>';
                else if (index == 1)
                    html += '<div class="col-sm-12" style="margin-bottom:10px"><div class="col-sm-1"><input type="radio" name="select" /></div><div class="col-sm-9"><input group="selectvalue" type="text" class="form-control" value="' + item + '" placeholder="请输入子项"></div><label class="col-sm-1 control-label"></label></div>';
                else
                    html += '<div class="col-sm-12" style="margin-bottom:10px"><div class="col-sm-1"><input type="radio" name="select" /></div><div class="col-sm-9"><input group="selectvalue" type="text" class="form-control" value="' + item + '" placeholder="请输入子项"></div><label class="col-sm-1 control-label"><i class="fa fa-trash-o select-del" title="删除" style="font-size:18px; cursor:pointer;"></i></label></div>';
            })
        }
    }
    return '<div class="option">' + html + '</div>';
}

function isEmailAvailable(emailInput) {
    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (!myreg.test(emailInput)) {
        return false;
    }
    else {
        return true;
    }
}

//配置形结构
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

//自定义表单结束
function GetText(field) {
    //文本框
    var name = '文本';
    var must = '';
    var remove = '<a class="remove-link"><i class="fa fa-trash-o"></i></a>';
    var column = "text";
    var data = '';
    if (field) {
        data = JSON.stringify(field);
        name = field.ColumnName;

        if (!field.IsCustomer) {
            remove = "";
        }
        if (field.IsMust) {
            must = "<span class='must'>* </span>";
        }
        column = field.Column;
    }
    var text = '<input type="text" column="' + column + '" class="form-control" placeholder="请输入' + name + '"/>';
    var content = '<div type="text" class="form-group draggable ui-draggable dropped field field" data=' + data + '><label class="col-sm-3 control-label">' + must + name + '：</label><div class="col-sm-7">' + text + '</div><p class="tools col-sm-2">' + remove + '</p></div>';
    return content;
}

function GetTextarea(field) {
    //多行文本
    var name = '多行文本';
    var must = '';
    var remove = '<a class="remove-link"><i class="fa fa-trash-o"></i></a>';
    var column = "text";
    var data = '';
    if (field) {
        data = JSON.stringify(field);
        name = field.ColumnName;
        column = field.Column;

        if (!field.IsCustomer) {
            remove = "";
        }
        if (field.IsMust) {
            must = "<span class='must'>* </span>";
        }
    }
    var textarea = '<textarea column="' + column + '" class="form-control" placeholder="请输入' + name + '"></textarea>';
    var content = '<div type="textarea" class="form-group draggable ui-draggable dropped field" data=' + data + '><label class="col-sm-3 control-label">' + must + name + '：</label><div class="col-sm-7">' + textarea + '</div><p class="tools col-sm-1">' + remove + '</p></div>';
    return content;
}

function GetSelect(field) {
    //下拉框
    var name = '下拉框';
    var must = '';
    var remove = '<a class="remove-link"><i class="fa fa-trash-o"></i></a>';
    var column = "text";
    var option = '';
    var data = '';
    if (field) {
        data = JSON.stringify(field);
        name = field.ColumnName;
        column = field.Column;

        if (!field.IsCustomer) {
            remove = "";
        }

        if (field.IsMust) {
            must = "<span class='must'>* </span>";
        }
        if (field.SelectValue) {
            var options = field.SelectValue.split(',');
            options.forEach(function (item, index) {
                option += "<option value='" + item + "'>" + item + "</option>";
            });
        }
    }
    var select = '<select class="form-control" column="' + column + '">' + option + '</select>';
    var content = '<div type="select" class="form-group draggable ui-draggable dropped field" data=' + data + '><label class="col-sm-3 control-label">' + must + name + '：</label><div class="col-sm-7">' + select + '</div><p class="tools col-sm-1">' + remove + '</p></div>';
    return content;
}

function GetRadioBox(field) {
    //单选框
    var name = '单选框';
    var must = '';
    var remove = '<a class="remove-link"><i class="fa fa-trash-o"></i></a>';
    var column = "text";
    var data = '';
    var radom = Math.ceil(Math.random() * 100000);
    var radio = '<label class="radio-inline"><input type="radio" value="默认1" name="radio" checked> 默认1</label><label class="radio-inline"><input type="radio" name="radio" value="默认2"> 默认2</label>';
    if (field) {
        data = JSON.stringify(field);
        name = field.ColumnName;
        column = field.Column;

        if (!field.IsCustomer) {
            remove = "";
        }

        if (field.IsMust) {
            must = "<span class='must'>* </span>";
        }
        if (field.SelectValue) {
            radio = "";
            var options = field.SelectValue.split(',');
            options.forEach(function (item, index) {
                radio += '<label class="radio-inline"><input type="radio" column="' + column + '" value="' + item + '" name="' + column + '"> ' + item + '</label>';
            });
        }
    }
    var content = '<div type="radio" class="form-group draggable ui-draggable dropped field" data=' + data + '><label class="col-sm-3 control-label">' + must + name + '：</label><div class="col-sm-7">' + radio + '</div><p class="tools col-sm-1">' + remove + '</p></div>';
    return content;
}

function GetCheckBox(field) {
    //多选框
    var name = '多选框';
    var must = '';
    var remove = '<a class="remove-link"><i class="fa fa-trash-o"></i></a>';
    var column = "text";
    var data = '';
    var radom = Math.ceil(Math.random() * 100000);
    var checkbox = '<label class="radio-inline" style="padding-left:0px;"><input type="checkbox" name="默认1"> 默认1</label><label class="radio-inline" style="padding-left:0px;"><input type="checkbox" name="默认2"> 默认2</label>';
    if (field) {
        data = JSON.stringify(field);
        name = field.ColumnName;
        column = field.Column;

        if (!field.IsCustomer) {
            remove = "";
        }

        if (field.IsMust) {
            must = "<span class='must'>* </span>";
        }
        if (field.SelectValue) {
            checkbox = "";
            var options = field.SelectValue.split(',');
            options.forEach(function (item, index) {
                checkbox += '<label class="radio-inline"><input type="checkbox" column="' + column + '" value="' + item + '" name="' + column + '" > ' + item + '</label>';
            });
        }
    }
    var content = '<div type="checkbox" class="form-group draggable ui-draggable dropped field" data=' + data + '><label class="col-sm-3 control-label">' + must + name + '：</label><div class="col-sm-7">' + checkbox + '</div><p class="tools col-sm-1">' + remove + '</p></div>';
    return content;
}

function GetFileUpload(field) {
    //上传
    var name = '上传';
    var must = '';
    var remove = '<a class="remove-link"><i class="fa fa-trash-o"></i></a>';
    var column = "text";
    var data = '';
    if (field) {
        data = JSON.stringify(field);
        name = field.ColumnName;
        column = field.Column;

        if (!field.IsCustomer) {
            remove = "";
        }
        if (field.IsMust) {
            must = "<span class='must'>* </span>";
        }
    }
    var file = '<input class="file uploadfile" column="' + column + '" type="file" multiple data-min-file-count="1">';
    var content = '<div type="file" class="form-group draggable ui-draggable dropped field" data=' + data + '><label class="col-sm-3 control-label">' + must + name + '：</label><div class="col-sm-7">' + file + '</div><p class="tools col-sm-1">' + remove + '</p></div>';
    return content;
}

function GetDate(field) {
    //日期
    var name = '日期';
    var must = '';
    var remove = '<a class="remove-link"><i class="fa fa-trash-o"></i></a>';
    var column = "text";
    var data = '';
    if (field) {
        data = JSON.stringify(field);
        name = field.ColumnName;
        column = field.Column;

        if (!field.IsCustomer) {
            remove = "";
        }

        if (field.IsMust) {
            must = "<span class='must'>* </span>";
        }
    }
    var datetime = '<input readonly="" column="' + column + '" class="form-control form_date" type="text" style="border: 1px solid #e5e6e7;">';
    var content = '<div type="date" class="form-group draggable ui-draggable dropped field" data=' + data + '><label class="col-sm-3 control-label">' + must + name + '：</label><div class="col-sm-7">' + datetime + '</div><p class="tools col-sm-1">' + remove + '</p></div>';
    return content;
}

function GetDateTime(field) {
    //日期时间
    var name = '日期时间';
    var must = '';
    var remove = '<a class="remove-link"><i class="fa fa-trash-o"></i></a>';
    var column = "text";
    var data = '';
    if (field) {
        data = JSON.stringify(field);
        name = field.ColumnName;
        column = field.Column;

        if (!field.IsCustomer) {
            remove = "";
        }

        if (field.IsMust) {
            must = "<span class='must'>* </span>";
        }
    }
    var datetime = '<input readonly="" column="' + column + '" class="form-control form_datetime" type="text" style="border: 1px solid #e5e6e7;">';
    var content = '<div type="datetime" class="form-group draggable ui-draggable dropped field" data=' + data + '><label class="col-sm-3 control-label">' + must + name + '：</label><div class="col-sm-7">' + datetime + '</div><p class="tools col-sm-1">' + remove + '</p></div>';
    return content;
}

function GetPicker(field) {
    //地区选择
    var name = '省市区';
    var must = '';
    var remove = '<a class="remove-link"><i class="fa fa-trash-o"></i></a>';
    var column = "text";
    var data = '';
    if (field) {
        data = JSON.stringify(field);
        name = field.ColumnName;
        column = field.Column;

        if (!field.IsCustomer) {
            remove = "";
        }

        if (field.IsMust) {
            must = "<span class='must'>* </span>";
        }
    }
    var picker = '<form class="form-inline" column="' + column + '"><div class="distpicker"><div class="form-group" style="margin:0px; padding-right:10px;"><label class="sr-only" for="province10">Province</label><select class="form-control" id="province10"></select></div><div class="form-group" style="margin:0px; padding-right:10px;"><label class="sr-only" for="city10">City</label><select class="form-control" id="city10"></select></div><div class="form-group" style="margin:0px; padding-right:10px;"><label class="sr-only" for="district10">District</label><select class="form-control" id="district10"></select></div></div></form>';
    var content = '<div type="picker" class="form-group draggable ui-draggable dropped field" data=' + data + '><label class="col-sm-3 control-label">' + must + name + '：</label><div class="col-sm-7">' + picker + '</div><p class="tools col-sm-1">' + remove + '</p></div>';
    return content;
}

function GetSex(field) {
    //性别
    var name = '性别';
    var must = '';
    var remove = '<a class="remove-link"><i class="fa fa-trash-o"></i></a>';
    var column = "text";
    var data = '';
    if (field) {
        data = JSON.stringify(field);
        name = field.ColumnName;
        column = field.Column;

        if (!field.IsCustomer) {
            remove = "";
        }

        if (field.IsMust) {
            must = "<span class='must'>* </span>";
        }
    }
    var radio = '<label class="radio-inline"><input type="radio" column="' + column + '" value="男" name="' + column + '" checked> 男</label><label class="radio-inline"><input type="radio" column="' + column + '" data=' + data + ' name="' + column + '" value="女"> 女</label>';
    var content = '<div type="sex" class="form-group draggable ui-draggable dropped field" data=' + data + '><label class="col-sm-3 control-label">' + must + name + '：</label><div class="col-sm-7">' + radio + '</div><p class="tools col-sm-1">' + remove + '</p></div>';
    return content;
}

function GetIsorno(field) {
    //性别
    var name = '是/否';
    var must = '';
    var remove = '<a class="remove-link"><i class="fa fa-trash-o"></i></a>';
    var column = "text";
    var data = '';
    if (field) {
        data = JSON.stringify(field);
        name = field.ColumnName;
        column = field.Column;

        if (!field.IsCustomer) {
            remove = "";
        }

        if (field.IsMust) {
            must = "<span class='must'>* </span>";
        }
    }
    var radio = '<label class="radio-inline"><input type="radio" column="' + column + '" value="0" name="' + column + '" checked> 否</label><label class="radio-inline"><input type="radio" column="' + column + '" data=' + data + ' name="' + column + '" value="1"> 是</label>';
    var content = '<div type="sex" class="form-group draggable ui-draggable dropped field" data=' + data + '><label class="col-sm-3 control-label">' + must + name + '：</label><div class="col-sm-7">' + radio + '</div><p class="tools col-sm-1">' + remove + '</p></div>';
    return content;
}

function GetPriority(field) {
    //性别
    var name = '优先级';
    var must = '';
    var remove = '<a class="remove-link"><i class="fa fa-trash-o"></i></a>';
    var column = "text";
    var data = '';
    if (field) {
        data = JSON.stringify(field);
        name = field.ColumnName;
        column = field.Column;

        if (!field.IsCustomer) {
            remove = "";
        }

        if (field.IsMust) {
            must = "<span class='must'>* </span>";
        }
    }
    var radio = '<label class="radio-inline"><input type="radio" column="' + column + '" value="0" name="' + column + '" checked> 普通</label><label class="radio-inline"><input type="radio" column="' + column + '" data=' + data + ' name="' + column + '" value="1"> 优先</label><label class="radio-inline"><input type="radio" column="' + column + '" data=' + data + ' name="' + column + '" value="2"> 紧急</label>';
    var content = '<div type="sex" class="form-group draggable ui-draggable dropped field" data=' + data + '><label class="col-sm-3 control-label">' + must + name + '：</label><div class="col-sm-7">' + radio + '</div><p class="tools col-sm-1">' + remove + '</p></div>';
    return content;
}

function GetCard(field) {
    //身份证
    var name = '身份证';
    var must = '';
    var remove = '<a class="remove-link"><i class="fa fa-trash-o"></i></a>';
    var column = "text";
    var data = '';
    if (field) {
        data = JSON.stringify(field);
        name = field.ColumnName;
        column = field.Column;

        if (!field.IsCustomer) {
            remove = "";
        }

        if (field.IsMust) {
            must = "<span class='must'>* </span>";
        }
    }
    var text = '<input type="text" maxlength="11" column="' + column + '" class="form-control" placeholder="请输入你的身份证" />';
    var content = '<div type="card" class="form-group draggable ui-draggable dropped field" data=' + data + '><label class="col-sm-3 control-label">' + must + name + '：</label><div class="col-sm-7">' + text + '</div><p class="tools col-sm-1">' + remove + '</p></div>';
    return content;
}

function GetEmail(field) {
    //邮箱
    var name = '邮箱';
    var must = '';
    var remove = '<a class="remove-link"><i class="fa fa-trash-o"></i></a>';
    var column = "text";
    var data = '';
    if (field) {
        data = JSON.stringify(field);
        name = field.ColumnName;
        column = field.Column;

        if (!field.IsCustomer) {
            remove = "";
        }

        if (field.IsMust) {
            must = "<span class='must'>* </span>";
        }
    }
    var text = '<input type="text" class="form-control" column="' + column + '" placeholder="请输入你的邮箱">';
    var content = '<div type="email" class="form-group draggable ui-draggable dropped field" data=' + data + '><label class="col-sm-3 control-label">' + must + name + '：</label><div class="col-sm-7">' + text + '</div><p class="tools col-sm-1">' + remove + '</p></div>';
    return content;
}

function GetNumber(field) {
    //数字
    var name = '数字';
    var must = '';
    var remove = '<a class="remove-link"><i class="fa fa-trash-o"></i></a>';
    var column = "text";
    var data = '';
    if (field) {
        data = JSON.stringify(field);
        name = field.ColumnName;
        column = field.Column;

        if (!field.IsCustomer) {
            remove = "";
        }

        if (field.IsMust) {
            must = "<span class='must'>* </span>";
        }
    }
    var text = '<input type="text" column="' + column + '" class="form-control" placeholder="请输入数字" onkeyup="value=value.replace(/^(0+)|[^\\d]+/g,\'\')">';
    var content = '<div type="phone" class="form-group draggable ui-draggable dropped field" data=' + data + '><label class="col-sm-3 control-label">' + must + name + '：</label><div class="col-sm-7">' + text + '</div><p class="tools col-sm-1">' + remove + '</p></div>';
    return content;
}

function GetPhone(field) {
    //电话
    var name = '电话';
    var must = '';
    var remove = '<a class="remove-link"><i class="fa fa-trash-o"></i></a>';
    var column = "text";
    var data = '';
    if (field) {
        data = JSON.stringify(field);
        name = field.ColumnName;
        column = field.Column;

        if (!field.IsCustomer) {
            remove = "";
        }

        if (field.IsMust) {
            must = "<span class='must'>* </span>";
        }
    }
    var text = '<input type="text" maxlength="11" column="' + column + '" class="form-control" placeholder="请输入你的电话" onkeyup="value=value.replace(/^(0+)|[^\\d]+/g,\'\')">';
    var content = '<div type="phone" class="form-group draggable ui-draggable dropped field" data=' + data + '><label class="col-sm-3 control-label">' + must + name + '：</label><div class="col-sm-7">' + text + '</div><p class="tools col-sm-1"><a class="edit-link" name="text" title="设置"><i class="fa fa-cog fa-fw"></i></a>' + remove + '<label class="labcheck">' + must + ' 必填</label></p></div>';
    return content;
}

function GetOrganize(field) {
    //组织
    var name = '组织';
    var must = '';
    var remove = '<a class="remove-link"><i class="fa fa-trash-o"></i></a>';
    var column = "text";
    var data = '';
    if (field) {
        data = JSON.stringify(field);
        name = field.ColumnName;
        column = field.Column;

        if (!field.IsCustomer) {
            remove = "";
        }

        if (field.IsMust) {
            must = "<span class='must'>* </span>";
        }
    }
    var text = "<div id='selectOrganize' column='" + column + "' group='query' style='padding:0px;' class='form-control'><i style='float:right;padding:10px' class='font_ilean iconfont icon-down'></i></div>";
    var content = '<div type="organize" class="form-group draggable ui-draggable dropped field" data=' + data + '><label class="col-sm-3 control-label">' + must + name + '：</label><div class="col-sm-7">' + text + '</div><p class="tools col-sm-1">' + remove + '</p></div>';
    return content;
}

function GetUser(field) {
    //用户
    var name = '员工';
    var must = '';
    var remove = '<a class="remove-link"><i class="fa fa-trash-o"></i></a>';
    var column = "text";
    var data = '';
    if (field) {
        data = JSON.stringify(field);
        name = field.ColumnName;
        column = field.Column;

        if (!field.IsCustomer) {
            remove = "";
        }

        if (field.IsMust) {
            must = "<span class='must'>* </span>";
        }
    }
    var text = "<div id='selectUser' group='query' style='padding:0px;' class='form-control'><i style='float:right;padding:10px;' class='font_ilean iconfont icon-down'></i></div>";
    var content = '<div type="user" class="form-group draggable ui-draggable dropped field" data=' + data + '><label class="col-sm-3 control-label">' + must + name +'：</label><div class="col-sm-7">' + text + '</div><p class="tools col-sm-1">' + remove + '</p></div>';
    return content;
}


function GetCustomer(field) {
    //用户
    var name = '客户';
    var must = '';
    var remove = '<a class="remove-link"><i class="fa fa-trash-o"></i></a>';
    var column = "text";
    var data = '';
    if (field) {
        data = JSON.stringify(field);
        name = field.ColumnName;
        column = field.Column;

        if (!field.IsCustomer) {
            remove = "";
        }

        if (field.IsMust) {
            must = "<span class='must'>* </span>";
        }
    }
    var text = "<div id='selectCustomer' group='query' style='padding:0px;' class='form-control'><i style='float:right;padding:10px;' class='font_ilean iconfont icon-down'></i></div>";
    var content = '<div type="customer" class="form-group draggable ui-draggable dropped field" data=' + data + '><label class="col-sm-3 control-label">'+must+name+'：</label><div class="col-sm-7">' + text + '</div><p class="tools col-sm-1">' + remove + '</p></div>';
    return content;
}

function SetOrganize() {
    var organizeCombotree = CreateComboTree("selectOrganize");
    $.ajax({
        url: '/api/sys/Organize?TenantId=' + TenantId,
        success: function (value) {
            if (value.length > 0) {
                var list = [];//[{ id: '', name: "==请选择==" }];
                $.each(value, function (index, item) {
                    var row = { id: item.OrganizeId, code: item.OrganizeCode, title: item.OrganizeName };
                    list.push(row);
                });
                organizeCombotree.setData([{ id: '', code: '', title: '所有部门', 'subs': list }]);
            }
        }
    });
    return organizeCombotree;
}

function SetUser() {
    var organizeUserCombotree = CreateComboTree('selectUser');
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
                organizeUserCombotree.setData(organizes);
            }
        }
    });
    return organizeUserCombotree;
}

function SetCustomer() {
    var customerCombotree = CreateComboTree('selectCustomer');
    $.ajax({
        url: '/api/sys/Customer?TenantId=' + TenantId,
        success: function (value) {
            if (value.rows.length>0) {
                var customers = [];
                $.each(value.rows, function (index, item) {
                    var customer = { "id": item.CustomerId,"CustomerCode":item.CustomerCode, "title": item.CustomerName };
                    customers.push(customer);
                });
                if (customers.length > 0) {
                    var all = [{ "id": '', 'code': '', "title": "所有客户", "subs": customers }];
                    customerCombotree.setData(all);
                }
            }
        }
    });
    return customerCombotree;
}