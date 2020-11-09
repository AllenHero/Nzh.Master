var uploadTemplate = function (dom, url) {
    $(function () {
        uploader = new plupload.Uploader({
            runtimes: 'html5,flash,silverlight,browserplus,gears', // 这里是说用什么技术引擎
            browse_button: dom, // this can be an id of a DOM element or the DOM element itself
            url: url,
            flash_swf_url: '/Scripts/plupload/js/Moxie.swf',
            silverlight_xap_url: '/Scripts/plupload/js/Moxie.xap',
            //drop_element: 'uploadfilelist',
            filters: {
                max_file_size: '10mb',
                mime_types: [
                    { title: "Excel 2003 files", extensions: "xls" },
                    { title: "Excel 2007 files", extensions: "xlsx" }
                ]
            },
            multi_selection: false,
            init: {
                PostInit: function (uploader) {
                    file = $('input[type="file"]')[0];
                    fileid = file.id;
                },
                FilesAdded: function (up, files) {
                    var win = parent.$.messager.progress({
                        title: '请稍等',
                        msg: '正在上传...'
                    });
                    up.start();
                },
                UploadComplete: function (up, files) {
                    //alert("");
                },
                BeforeUpload: function (uploader, file) {

                },
                UploadProgress: function (up, file) {
                    var percent = up.total.loaded * 100 / up.total.size;//file.percent;
                    var bar = parent.$.messager.progress("bar");
                    bar.progressbar('setValue', percent);
                },
                FileUploaded: function (up, files, result) {
                    parent.$.messager.progress("close");
                    var data = eval('(' + result.response + ')');
                    if (data.status) {
                        window.location.reload();
                    } else {
                        alert(data.message);
                        //com.message("warning",data.message);
                    }
                    //$('#a_refresh').click();
                    //window.location.reload();
                },
                Error: function (uploader, errObject) {
                    var obj = errObject;
                }
            }
        });

        uploader.init();
    });
}