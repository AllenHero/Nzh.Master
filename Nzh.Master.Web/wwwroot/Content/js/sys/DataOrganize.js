function DataOrganizeTree(id) {
    var organizeCombotree = CreateComboTree(id);
    $.ajax({
        url: '/api/sys/Organize?TenantId=' + TenantId,
        success: function (value) {
            if (value.length > 0) {
                var list = [];//[{ id: '', name: "==请选择==" }];
                $.each(value, function (index, item) {
                    var row = { id: item.OrganizeId,code:item.OrganizeCode, title: item.OrganizeName };
                    list.push(row);
                });
                organizeCombotree.setData([{ id: '',code:'', title: '所有部门', 'subs': list }]);
            }
        }
    });
    return organizeCombotree;
}

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
