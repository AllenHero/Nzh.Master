
$(function () {
    $("#callLeader").click(function () {
        CallLeader();
    });
    $("[data-toggle='popover']").popover();
});

function CallLeader() {
    $.ajax({
        url: '/api/andon2/andon/EidtCallLeader/' + UserId,
        type: 'Post',
        beforeSend: jQueryShowLoading(),//显示加载图标
        success: function (value) {
            jQuery('body').hideLoading();//隐藏加载图标
            if (value.status) {
                toastr.success("呼叫成功");
            } else {
                toastr.warning(value.message);
            }
        }
    });
}