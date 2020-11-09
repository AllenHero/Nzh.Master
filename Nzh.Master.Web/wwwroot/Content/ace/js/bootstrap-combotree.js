/**
 * Created by CherryDream on 2016/9/1.
 */
(function ($) {
    $.fn.bootstrapCombotree = function (options, param) {
        if(typeof options === 'string')
        {
            return bootstrapCombotree.prototype[options](this, param);
        }
        options = options || {};
        this.each(function () {
            // var Value = new Array();

            var state = $.data(this, 'bootstrapCombotree');
            if(state)
            {
                $.extend(state.options, options);
            }
            else
            {
                $.data(this, 'bootstrapCombotree', {
                    options : $.extend({}, $.fn.bootstrapCombotree.defaults, options)
                });
            }
            // $.data(this, "text", Text);
            // $.data(this, "value", value);
            var btComboTree = new bootstrapCombotree().init(this);
        })
    };
    var bootstrapCombotree = function(){
        this.Text = new Array();
        this.value = new Array();
        this.$Tree = undefined;
        this.$Button = undefined;
        this.$hidden = undefined;
        this.init = function (target) {
            var options = $.data(target, "bootstrapCombotree").options;
            $(target).empty();
            //写html标签
            if (options.width == undefined) {
                target.innerHTML = '<div class="btn-group">'
                    + '<button type="button" class="btn btn-sm dropdown-toggle"   data-toggle="dropdown" title=' + options.defaultLable + '>'
                    + options.defaultLable + '<span class="icon-caret-down icon-on-right"></span>'
                    + '</button>'
                    + '<input type="hidden" name="' + options.name + '"/> '
                    + '<div class="dropdown-menu" style="width: 400%"></div>'
                    + '</div>';
            }
            else {
                target.innerHTML = '<div class="btn-group">'
                    + '<button type="button" class="btn btn-sm dropdown-toggle"  data-toggle="dropdown" title=' + options.defaultLable + '>'
                    + options.defaultLable + '<span class="icon-caret-down icon-on-right"></span>'
                    + '</button>'
                    + '<input type="hidden" name="' + options.name + '"/> '
                    + '<div class="dropdown-menu" style="width: ' + options.width + 'px;"></div>'
                    + '</div>';
            }
            this.$Tree = $(target).find(".dropdown-menu");//Tree对象
            this.$Button = $(target).find("button");//button对象
            this.$hidden = $(target).find("input[type='hidden']");//隐藏域
            //渲染bootstrap-treeview
            var _this = this;
            this.$Tree.treeview({
                data: options.data,
                showIcon: options.showIcon,
                showCheckbox: true,
                onNodeChecked: function (event, node) {
                    options.onBeforeCheck(node);
                    if($(target).data("value") != undefined)
                    {
                        this.Text = $(target).data("Text");
                        this.value = $(target).data("value");
                    }

                    if(_this.$Button[0].innerText == options.defaultLable)
                    {
                        _this.$Button[0].innerText = '';
                    }
                    _this.setCheck(node) ;
                    _this.setCheckparent(node);
                    if (_this.Text.length <= options.maxItemsDisplay) {
                        _this.$Button[0].innerHTML = _this.Text + '<span class="caret"></span>';
                        _this.$Button.attr("title", _this.Text);
                    }
                    else {
                        _this.$Button[0].innerHTML = _this.Text.length + '项被选中  <span class="caret"></span>';
                        _this.$Button.attr("title", _this.Text.length + '项被选中');
                    }
                    _this.$hidden.val(_this.value);
                    if (options.onCheck != undefined) {
                        options.onCheck(node);
                    }
                },
                onNodeUnchecked: function (event, node) {
                    options.onBeforeUnCheck(node);
                    if($(target).data("value") != undefined)
                    {
                        this.Text = $(target).data("Text");
                        this.value = $(target).data("value");
                    }
                    _this.setUnCheck(node);
                    _this.setunCheckparent(node);
                    if (_this.Text.length == 0) {
                        _this.$Button[0].innerHTML = options.defaultLable + '<span class="caret"></span>';
                        _this.$Button.attr("title", options.defaultLable);
                    }
                    else {
                        if (_this.Text.length <= options.maxItemsDisplay) {
                            _this.$Button[0].innerHTML = _this.Text + '<span class="caret"></span>';
                            _this.$Button.attr("title", _this.Text);
                        }
                        else {
                            _this.$Button[0].innerHTML = _this.Text.length + '项被选中 <span class="caret"></span>';
                            _this.$Button.attr("title", _this.Text.length + '项被选中');
                        }
                    }
                    _this.$hidden.val(_this.value);
                    if (options.onUnCheck != null) {
                        options.onUnCheck(node);
                    }
                },
                onNodeSelected : function (event, node) {
                    if(options.selectToCheck)
                    {
                        if($(target).data("value") != undefined)
                        {
                            this.Text = $(target).data("Text");
                            this.value = $(target).data("value");
                        }
                        if(node.state.checked)
                        {
                            options.onBeforeUnCheck(node);
                            _this.setUnCheck(node);
                            _this.setunCheckparent(node);
                            if (_this.Text.length == 0) {
                                _this.$Button[0].innerHTML = options.defaultLable + '<span class="caret"></span>';
                                _this.$Button.attr("title", options.defaultLable);
                            }
                            else {
                                if (_this.Text.length <= options.maxItemsDisplay) {
                                    _this.$Button[0].innerHTML = _this.Text + '<span class="caret"></span>';
                                    _this.$Button.attr("title", _this.Text);
                                }
                                else {
                                    _this.$Button[0].innerHTML = _this.Text.length + '项被选中 <span class="caret"></span>';
                                    _this.$Button.attr("title", _this.Text.length + '项被选中');
                                }
                            }
                            _this.$hidden.val(_this.value);
                            if (options.onUnCheck != null) {
                                options.onUnCheck(node);
                            }
                        }
                        else
                        {
                            options.onBeforeCheck(node);
                            if(_this.$Button[0].innerText == options.defaultLable)
                            {
                                _this.$Button[0].innerText = '';
                            }
                            _this.setCheck(node) ;
                            _this.setCheckparent(node);
                            if (_this.Text.length <= options.maxItemsDisplay) {
                                _this.$Button[0].innerHTML = _this.Text + '<span class="caret"></span>';
                                _this.$Button.attr("title", _this.Text);
                            }
                            else {
                                _this.$Button[0].innerHTML = _this.Text.length + '项被选中  <span class="caret"></span>';
                                _this.$Button.attr("title", _this.Text.length + '项被选中');
                            }
                            _this.$hidden.val(_this.value);
                            if (options.onCheck != undefined) {
                                options.onCheck(node);
                            }
                        }
                    }
                }
            });
            var dropclick = false;
            // 2016-08-24 此时返回false可以阻止下拉框被隐藏
            // 2016=08-25 此问题解决
            $(target).on('hide.bs.dropdown', function (e) {
                if(dropclick)
                {
                    dropclick = false;
                    return false;
                }
                else
                {
                    return true;
                }
            });
            this.$Tree.on('click', function () {
                dropclick = true;
            });
            $.data(target, "Text", this.Text);
            $.data(target, "value", this.value);
        };
        this.setCheck  = function (node) {
            this.$Tree.treeview('checkNode', [this.$Tree.treeview('getNode', [ node.nodeId, { ignoreCase: true, exactMatch: false }]), { silent: true}]);
            if(node == undefined)
            {
                return;
            }
            else
            {
                if(node.nodes == undefined)
                {
                    if($.inArray(node.id, this.value) < 0)
                    {
                        this.value.push(node.id);
                        this.Text.push(node.text);
                    }
                }
                else
                {
                    for(var i = 0; i < node.nodes.length; i++)
                    {
                        this.setCheck(node.nodes[i]);
                    }
                }
            }
        };
        this.setCheckparent = function (node) {
            if(node.parentId == undefined)
            {
                return;
            }
            var pNode = this.$Tree.treeview('getNode', [ node.parentId, { ignoreCase: true, exactMatch: false } ]);
            this.$Tree.treeview('checkNode', [ pNode, { silent: true}]);
            this.setCheckparent(pNode);
        };
        this.setUnCheck = function (node) {
            this.$Tree.treeview('uncheckNode', [ this.$Tree.treeview('searchById', [ node.id, { ignoreCase: true, exactMatch: false } ]), { silent: true}]);
            if(node == undefined)
            {
                return;
            }
            else
            {
                if(node.nodes == undefined)
                {
                    for(var i = 0; i < this.value.length; i++)
                    {
                        if (this.Text[i] == node.text) {
                            this.Text.splice(i, 1);
                        }
                        if (this.value[i] == node.id) {
                            this.value.splice(i, 1);
                        }
                    }
                }
                else
                {
                    for(var i = 0; i < node.nodes.length; i++)
                    {
                        this.setUnCheck(node.nodes[i]);
                    }
                }
            }
        };
        this.setunCheckparent = function (node) {
            if (node.parentId == undefined) {
                return;
            }
            var pNode = this.$Tree.treeview('getNode', [node.parentId, {ignoreCase: true, exactMatch: false}]);
            var flag = true;
            for(var i = 0; i < pNode.nodes.length; i++)
            {
                if(pNode.nodes[i].state.checked)
                {
                    flag = false;
                    break;
                }
            }
            if(flag)
            {
                this.$Tree.treeview('uncheckNode', [ pNode, { silent: true}]);
                this.setunCheckparent(pNode);
            }
            else
            {
                return;
            }
        };
    }
    //默认值
    $.fn.bootstrapCombotree.defaults = {
        defaultLable : '请选择列表',//默认按钮上的文本
        showIcon: true,//显示图标
        maxItemsDisplay : 3,//按钮上最多显示多少项，如果超出这个数目，将会以‘XX项已被选中代替’
        selectToCheck : true,
        onCheck : function (node) {//树形菜单被选中是 触发事件

        },
        onBeforeCheck : function (node) {
            return true;
        },
        onBeforeUnCheck : function (node) {
            return true;
        },
        onUnCheck : function (node) {

        }
    };

    /**
     * 获取选中的节点值
     * @param target
     * @returns {*}
     */
    bootstrapCombotree.prototype.getValue = function (target) {
        return $(target).data("value");
    }

    /**
     * 为组件赋值
     * @param target
     * @param param
     */
    bootstrapCombotree.prototype.setValue = function (target, param) {
        var value = $(target).data("value");
        var text = $(target).data("Text");
        var opt =  $(target).data("bootstrapCombotree").options;
        var Tree = $(target).find(".dropdown-menu");//Tree对象
        var Button = $(target).find("button");//button对象
        var hidden = $(target).find("input[type='hidden']");//隐藏域
        var arr = param.split(",");
        value.splice(0);
        text.splice(0);
        Tree.treeview("uncheckAll", { silent: true });//全部不选
        for(var i = 0; i < arr.length; i++)
        {
            var node = Tree.treeview('searchById', [ arr[i], { ignoreCase: true, exactMatch: false }]);
            if(node !=undefined && node.length != 0)
            {
                if(!node.nodes)
                {
                    value.push(arr[i]);
                    text.push(node[0].text);
                }
                else
                {
                    continue;
                }
                Tree.treeview('checkNode', [ node[0], { silent: true}]);
                var tempNode = node[0];
                while(true)
                {
                    if(tempNode.parentId != undefined)
                    {
                        //有父节点
                        //选定该节点，再找其父节点
                        var pNode = Tree.treeview('getNode', [tempNode.parentId, {ignoreCase: true, exactMatch: false}]);
                        //选中该父节点
                        Tree.treeview('checkNode', [ pNode, { silent: true}]);
                        tempNode = pNode;
                    }
                    else
                    {
                        break;
                    }
                }

            }
        }
        if (text.length == 0) {
            Button[0].innerHTML = opt.defaultLable + '<span class="caret"></span>';
            Button.attr("title", opt.defaultLable);
        }
        else {
            if (text.length <= opt.maxItemsDisplay) {
                Button[0].innerHTML = text + '<span class="caret"></span>';
                Button.attr("title", text);
            }
            else {
                Button[0].innerHTML = text.length + '项被选中 <span class="caret"></span>';
                Button.attr("title", text.length + '项被选中');
            }
        }
        hidden.val(value);
    }

    $.fn.bootstrapCombotree.methods = {
        getValue : function (target) {
            return $(target).data("bootstrapCombotree").toString();//隐藏域
        }
    }
})(jQuery);