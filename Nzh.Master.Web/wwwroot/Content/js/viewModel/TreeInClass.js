
function viewModel(data) {
    var self = this;
    this.grid = {
        size: { w: 4, h: 80 },
        url: data.urls.query,
        idField: data.setting.idField,
        queryParams: ko.observable(),
        treeField: data.setting.className,
        pagination: true,
        loadFilter: function (d) {
            d = utils.copyProperty(d.rows || d, [data.setting.className, "IconClass"], [data.setting.idField, "iconCls"], false);
            return utils.toTreeData(d, data.setting.idField, data.setting.parentIds, "children");
        }
    };
    this.refreshClick = function () {
        window.location.reload();
    };

    this.downloadClick = function (vm, event) {
        com.exporter(self.grid).download($(event.currentTarget).attr("suffix"));
    };

    this.addClick = function () {
        if (self.grid.onClickRow()) {
           
            var row = eval("(" + "{\"" + data.setting.idField + "\":\"" + utils.uuid() + "\"}" + ")");

            self.grid.treegrid('append', { parent: '', data: [row] });
            self.grid.treegrid('select', row[data.setting.idField]);
            self.grid.$element().data("datagrid").insertedRows.push(row);
            self.editClick();
        }
    };
    
    this.editClick = function () {
        var row = self.grid.treegrid('getSelected');
        if (row) {
            //取得父节点数据
            var regExpId = new RegExp(data.setting.idField, 'gmi');
            var regExpName = new RegExp(data.setting.className,'gmi');
            var treeData = JSON.parse(JSON.stringify(self.grid.treegrid('getData')).replace(regExpId, "id").replace(regExpName, "text"));//.replace(/CustomerClassId/g, "id").replace(/ClassName/g, "text"));//
            treeData.unshift({ "id": 0, "text": "" });

            //设置上级菜单下拉树
            var gridOpt = $.data(self.grid.$element()[0], "datagrid").options;
            var col = $.grep(gridOpt.columns[0], function (n) { return n.field == data.setting.parentIds })[0];
            col.editor = { type: 'combotree', options: { data: treeData } };
            
            col.editor.options.onBeforeSelect = function (node) {
                var isChild = utils.isInChild(treeData, row[data.setting.idField], node.id);
                com.messageif(isChild, 'warning', '不能将自己或下级设为上级节点');
                return !isChild;
            };

            //开始编辑行数据
            self.grid.treegrid('beginEdit', row[data.setting.idField]);
            self[data.setting.idField] = row[data.setting.idField];;
            var eds = self.grid.treegrid('getEditors', row[data.setting.idField]);
            var edt = function (field) { return $.grep(eds, function (n) { return n.field == field })[0]; };
            //self.afterCreateEditors(edt);
        }
    };
    //this.afterCreateEditors = function (editors) {
    //    var iconInput = editors("IconClass").target;
    //    var onShowPanel = function () {
    //        iconInput.lookup('hidePanel');
    //        com.dialog({
    //            title: "&nbsp;选择图标",
    //            iconCls: 'icon-node_tree',
    //            width: 700,
    //            height: 500,
    //            url: "/Content/page/icon.html",
    //            viewModel: function (w) {
    //                w.find('#iconlist').css("padding", "5px");
    //                w.find('#iconlist li').attr('style', 'float:left;border:1px solid #fff; line-height:20px; margin-right:4px;width:16px;cursor:pointer')
    //                 .click(function () {
    //                     iconInput.lookup('setValue',$(this).find('span').attr('class').split(" ")[1]);
    //                     w.dialog('close');
    //                 }).hover(function () {
    //                     $(this).css({ 'border': '1px solid red' });
    //                 }, function () {
    //                     $(this).css({ 'border': '1px solid #fff' });
    //                 });
    //            }
    //        });
    //    };
    //    iconInput.lookup({ customShowPanel: true, onShowPanel: onShowPanel, editable: true });
    //    iconInput.lookup('resize', iconInput.parent().width());
    //    iconInput.lookup('textbox').unbind();
    //};
    //this.grid.OnBeforeDestroyEditor = function (editors, row) {
    //    row.ParentName = editors['ParentId'].target.combotree('getText');
    //    //row.IconClass = editors["IconClass"].target.lookup('textbox').val();
    //};
    this.deleteClick = function () {
        var row = self.grid.treegrid('getSelected');
        if (row) {
            self.grid.$element().treegrid('remove', row[data.setting.idField]);//row.CustomerClassId);
            self.grid.$element().data("datagrid").deletedRows.push(row);
        }
    };
    this.grid.onDblClickRow = self.editClick;
    this.grid.onClickRow = function () {
        var Id = self[data.setting.idField];
        if (!!Id) {
            if (self.grid.treegrid('validateRow', Id)) { //通过验证
                self.grid.treegrid('endEdit', Id);
                self[data.setting.idField] = undefined;
            }
            else { //未通过验证
                self.grid.treegrid('select', Id);
                return false;
            }
        }
        return true;
    };
    this.saveClick = function () {
        self.grid.onClickRow();
        var post = {};
        post.list = new com.editTreeGridViewModel(self.grid).getChanges(data.setting.postListFields);//["CustomerClassId", "ClassCode", "ClassName", "ParentId", "Seq", "CreateTime", "IsEnable"]

        if (self.grid.onClickRow() && post.list._changed) {
            com.ajax({
                url: data.urls.edit,
                data: ko.toJSON(post),
                success: function (d) {
                    com.message('success', '保存成功！');
                    self.grid.treegrid('acceptChanges');
                    self.grid.queryParams({});
                }
            });
        }

    };
    //this.grid.OnBeforeDestroyEditor = function (editors, row) {
    //    row.LineLevel = editors['LineLevel'].target.combo('getText');
    //};
}