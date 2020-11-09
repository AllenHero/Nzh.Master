$(function () {

    InitializationDaterange();
})

//初始化时间区间控件
function InitializationDaterange() {
    //$("#queryImportDate").val(moment().add(-7, 'd').format("YYYY-MM-DD") + " - " + moment().format("YYYY-MM-DD"));
    //$("#SelStartDate1,#SelStartDate2").val(moment().add(-7, 'd').format("YYYY-MM-DD"));
    //$("#SelEndDate1,#SelEndDate2").val(moment().format("YYYY-MM-DD"));
    $("#daterange1").daterangepicker({
        singleDatePicker: false,//设置为单个的datepicker，而不是有区间的datepicker 默认false
        showDropdowns: true,//当设置值为true的时候，允许年份和月份通过下拉框的形式选择 默认false
        autoUpdateInput: false,//1.当设置为false的时候,不给与默认值(当前时间)2.选择时间时,失去鼠标焦点,不会给与默认值 默认true
        timePicker24Hour: true,//设置小时为24小时制 默认false
        timePicker: false,//可选中时分 默认false
        startDate: moment().minutes(0).seconds(0), //设置开始日期
        language: 'zh-CN',
        locale: {
            format: "YYYY-MM-DD",
            separator: " - ",
            daysOfWeek: ["日", "一", "二", "三", "四", "五", "六"],
            monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
        }
    }, function (start, end, label) {
        $("#firstBtnGroup button").removeClass("btn-active");
        $("#SelStartDate1").val(start.format("YYYY-MM-DD"));
        $("#SelEndDate1").val(end.format("YYYY-MM-DD"));
        return $("#queryImportDate").val(start.format("YYYY-MM-DD") + " 到 " + end.format("YYYY-MM-DD"));
    });
}