
var viewModel = function (data) {
    //alert(data.setting.idField);
    var self = this;
    this.grid = {
        size: { w: 189, h: 40 },
        url: data.urls.query,
        queryParams: ko.observable(),
        pagination: true
    };
    this.gridEdit = new com.editGridViewModel(this.grid);
    this.grid.onClickRow = self.gridEdit.begin;
    this.grid.OnAfterCreateEditor = function (edt) {
        com.readOnlyHandler('input')(edt[data.setting.idField].target, true);
    };
    this.tree = {
        method:'GET',
        url: data.urls.types,
        queryParams: ko.observable(),
        loadFilter: function (d) {
            var filter = utils.filterProperties(d.rows || d, [data.setting.parentIds + ' as id', data.setting.parentName + ' as text']);
            return [{id:'',text:'所有类别',children:filter}];
        },
        onSelect: function (node) {
            self.CodeType(node.id);
        }
    };

    this.CodeType = ko.observable();
    this.CodeType.subscribe(function (value) {
        var param = JSON.parse("{\"" + data.setting.parentIds + "\":\"" + value + "\"}");
        self.grid.queryParams(param);
    });

    this.refreshClick = function () {
        window.location.reload();
    };
    this.addClick = function () {
        if (!self.CodeType()) return com.message('warning', '请先在左边选择要添加的类别！');
        com.ajax({
            type: 'GET',
            url: data.urls.newkey,
            success: function (d) {
                var row = JSON.parse("{\"" + data.setting.parentIds + "\":\"" + self.CodeType() + "\",\"" + data.setting.idField + "\":\"" + d + "\"}");//{ WorkShopId: self.CodeType(), LineId: d };
                self.gridEdit.addnew(row);
            }
        });
    };
    this.editClick = function () {
        var row = self.grid.treegrid('getSelected');
        self.gridEdit.begin(row);
    };
    this.downloadClick = function (vm, event) {
        com.exporter(self.grid).download($(event.currentTarget).attr("suffix"));
    };
    this.deleteClick = self.gridEdit.deleterow;
    this.saveClick = function(){
        self.gridEdit.ended();
        var post = { list: self.gridEdit.getChanges(data.setting.postListFields) };
        if (self.gridEdit.ended() && self.gridEdit.isChangedAndValid) {
            com.ajax({
                url: data.urls.edit,
                data: ko.toJSON(post),
                success: function (d) {
                    com.message('success', '保存成功！');
                    //self.grid.queryParams({ CodeType: self.CodeType() });
                    self.gridEdit.accept();
                }
            });
        }
    };
    this.typeClick = function () {
        com.dialog({
            title: "&nbsp;生产车间",
            iconCls:'icon-node_tree',
            width: 600,
            height: 410,
            html: "#type-template",
            viewModel: function (w) {
                var that = this;
                this.grid = {
                    width: 586,
                    height: 340,
                    pagination: true,
                    pageSize:10,
                    url: data.urls.types,
                    queryParams: ko.observable()
                };
                this.gridEdit = new com.editGridViewModel(this.grid);
                this.grid.OnAfterCreateEditor = function (editors,row) {
                    if (!row._isnew) com.readOnlyHandler('input')(editors[data.setting.parentIds].target, true);
                };
                this.grid.onClickRow = that.gridEdit.begin;
                //this.grid.onDblClickRow = that.gridEdit.begin;
                this.grid.toolbar = [
                    { text: '新增', iconCls: 'icon-add1', handler: function () { that.gridEdit.addnew(); } }, '-',
                    { text: '删除', iconCls: 'icon-cross', handler: that.gridEdit.deleterow }
                ];
                this.confirmClick = function () {
                    that.gridEdit.ended();
                    if (that.gridEdit.isChangedAndValid()) {
                        var list = that.gridEdit.getChanges([data.setting.parentIds, data.setting.parentName]);
                        com.ajax({
                            url: data.urls.type,
                            data: ko.toJSON({list:list}),
                            success: function (d) {
                                that.cancelClick();
                                self.tree.$element().tree('reload');
                                com.message('success', '保存成功！');
                            }
                        });
                    }
                };
                this.cancelClick = function () {
                    w.dialog('close');
                };
            }
        });
    };
};