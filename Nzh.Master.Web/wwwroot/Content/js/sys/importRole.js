$(function () {
    setTimeout(function () {
        //文件上传
        uploadTemplate("importFile", "/sys/role/importRole?TenantId=" + TenantId);
    }, 3000);
});