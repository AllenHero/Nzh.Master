//var $ = function (id) {
//    return "string" == typeof id ? document.getElementById(id) : id;
//};
/*var Class = {
    create: function () {
        return function () {
            this.initialize.apply(this, arguments);
        }
    }
}
Object.extend = function (destination, source) {
    for (var property in source) {
        destination[property] = source[property];
    }
    return destination;
}
function addEventHandler(oTarget, sEventType, fnHandler) {
    if (oTarget.addEventListener) {
        oTarget.addEventListener(sEventType, fnHandler, false);
    } else if (oTarget.attachEvent) {
        oTarget.attachEvent("on" + sEventType, fnHandler);
    } else {
        oTarget["on" + sEventType] = fnHandler;
    }
};
var Scroller = Class.create();
Scroller.prototype = {
    initialize: function (idScroller, idScrollMid, options) {
        var oThis = this, oScroller = document.getElementById(idScroller), oScrollMid = document.getElementById(idScrollMid);
        this.SetOptions(options);
        this.Side = this.options.Side || ["up"];//方向 
        this.scroller = oScroller; //对象 
        this.speed = this.options.Speed; //速度 
        this.timer = null; //时间 
        this.pauseHeight = 0; //定高 
        this.pauseWidth = 0; //定宽 
        this.pause = 0; //定高(宽) 
        this.side = 0; //参数 
        //用于上下滚动 
        this.heightScroller = parseInt(oScroller.style.height) || oScroller.offsetHeight;
        this.heightList = oScrollMid.offsetHeight;
        //用于左右滚动 
        this.widthScroller = parseInt(oScroller.style.width) || oScroller.offsetWidth;
        this.widthList = oScrollMid.offsetWidth;
        //js取不到css设置的height和width 
        oScroller.style.overflow = "hidden";
        oScrollMid.appendChild(oScrollMid.cloneNode(true));
        oScrollMid.appendChild(oScrollMid.cloneNode(true));
        addEventHandler(oScroller, "mouseover", function () { oThis.Stop(); });
        addEventHandler(oScroller, "mouseout", function () { oThis.Start(); });
        this.Start();
    },
    //设置默认属性 
    SetOptions: function (options) {
        this.options = {//默认值 
            Step: 1,//每次变化的px量 
            Speed: 20,//速度(越大越慢) 
            Side: ["up"],//滚动方向:"up"是上，"down"是下，"left"是左，"right"是右 
            PauseHeight: 0,//隔多高停一次 
            PauseWidth: 0,//隔多宽停一次 
            //当上下和左右一起使用时必须设置PauseHeight和PauseWidth来设置转向位置 
            PauseStep: 5000//停顿时间(PauseHeight或PauseWidth大于0该参数才有效) 
        };
        Object.extend(this.options, options || {});
    },
    //转向 
    Turn: function () {
        //通过设置方向数组的排列来转向 
        this.Side.push(this.Side.shift().toLowerCase());
    },
    //上下滚动 
    ScrollUpDown: function () {
        this.pause = this.pauseHeight;
        this.scroller.scrollTop = this.GetScroll(this.scroller.scrollTop, this.heightScroller, this.heightList,
        this.options.PauseHeight);
        this.pauseHeight = this.pause;
        var oThis = this;
        this.timer = window.setTimeout(function () { oThis.Start(); }, this.speed);
    },
    //左右滚动 
    ScrollLeftRight: function () {
        this.pause = this.pauseWidth;
        //注意:scrollLeft超过1400会自动变回1400 注意长度 
        this.scroller.scrollLeft = this.GetScroll(this.scroller.scrollLeft, this.widthScroller, this.widthList,
        this.options.PauseWidth);
        this.pauseWidth = this.pause;
        var oThis = this;
        this.timer = window.setTimeout(function () { oThis.Start(); }, this.speed);
    },
    //获取设置滚动数据 
    GetScroll: function (iScroll, iScroller, iList, iPause) {
        var iStep = this.options.Step * this.side;
        if (this.side > 0) {
            if (iScroll >= (iList * 2 - iScroller)) { iScroll -= iList; }
        } else {
            if (iScroll <= 0) { iScroll += iList; }
        }
        this.speed = this.options.Speed;
        if (iPause > 0) {
            if (Math.abs(this.pause) >= iPause) {
                this.speed = this.options.PauseStep; this.pause = iStep = 0; this.Turn();
            } else {
                this.pause += iStep;
            }
        }
        return (iScroll + iStep);
    },
    //开始 
    Start: function () {
        //document.getElementById("test").innerHTML+=sTurn+","; 
        //方向设置 
        switch (this.Side[0].toLowerCase()) {
            case "right":
                if (this.widthList < this.widthScroller) return;
                this.side = -1;
                this.ScrollLeftRight();
                break;
            case "left":
                if (this.widthList < this.widthScroller) return;
                this.side = 1;
                this.ScrollLeftRight();
                break;
            case "down":
                if (this.heightList < this.heightScroller) return;
                this.side = -1;
                this.ScrollUpDown();
                break;
            case "up":
            default:
                if (this.heightList < this.heightScroller) return;
                this.side = 1;
                this.ScrollUpDown();
        }
    },
    //停止 
    Stop: function () {
        clearTimeout(this.timer);
    }
};
*/

function Scroller(id, midId, idBak) {
    var timer = null;
    var id = document.getElementById(id);

    var midId = document.getElementById(midId);
    var idBak = document.getElementById(idBak);
    idBak.innerHTML = midId.innerHTML;
    function moveTop() {
        if (midId.offsetHeight - id.scrollTop <= 0) {
            id.scrollTop = 0;//offsetHeight获取对象的高度，scrollTop获取滚动条离顶部滚动的高度
        }
        else {
            id.scrollTop++;
        }
    }
    timer = setInterval(moveTop, 150);
    id.onmouseover = function () { clearInterval(timer); };
    id.onmouseout = function () { timer = setInterval(moveTop, 150); };
}


//滚动插件
(function ($) {
    $.fn.extend({
        Scroll: function (opt, callback) {
            //参数初始化
            if (!opt) var opt = {};
            var _this = this.eq(0).find("ul:first");
            var lineH = _this.find("li:first").height(), //获取行高
                    line = opt.line ? parseInt(opt.line, 10) : parseInt(this.height() / lineH, 10), //每次滚动的行数，默认为一屏，即父容器高度
                    speed = opt.speed ? parseInt(opt.speed, 10) : 500, //卷动速度，数值越大，速度越慢（毫秒）
                    timer = opt.timer ? parseInt(opt.timer, 10) : 3000; //滚动的时间间隔（毫秒）
            if (line == 0) line = 1;
            var upHeight = 0 - line * lineH;
            //滚动函数
            scrollUp = function () {
                _this.animate({
                    marginTop: upHeight
                }, speed, function () {
                    for (i = 1; i <= line; i++) {
                        _this.find("li:first").appendTo(_this);
                    }
                    _this.css({ marginTop: 0 });
                });
            }
            //鼠标事件绑定
            _this.hover(function () {
                clearInterval(timerID);
            }, function () {
                timerID = setInterval("scrollUp()", timer);
            }).mouseout();
        }
    })
})(jQuery);

var ScrollUl = function (containerId, numViews, showTime, scrollTime) {
    //定时器变量，因为有移到层上时停止滚动的事件处理，而那时可能还没开始定时器呢，所以先把这个变量声明出来。
    this.timer = null;
    this.numViews = numViews;
    this.showTime = showTime;
    this.scrollTime = scrollTime;

    this.container = document.getElementById(containerId);
    var ulChild = this.container.getElementsByTagName('ul');
    //这里只有一个 ul 节点，取得它
    var ul = ulChild[0];
    //ul 是未使用 CSS 明确指定高度的，IE 中用 realstyle 取不到高度，只能得到 auto，而 getBoundingClientRect() 是 IE 和 FF 都支持的方式。
    var rect = ul.getBoundingClientRect();
    var heightAll = rect.bottom - rect.top;
    //每一屏的实际像素高度
    var heightView = heightAll / this.numViews;
    //每移动1像素用的毫秒数
    var msPerPx = this.scrollTime / heightView;

    //复制出一份来，接在原块的后面，用于头接尾的显示
    var ulCopy = ul.cloneNode(true);
    ulCopy.style.top = heightAll + 'px';
    this.container.appendChild(ulCopy);

    //要在事件处理函数中使用当前类，得把 this 赋值给一个此范围的变量，如 itself。其实此范围内的变量都是直接可用的，如：heightView， msPerPx
    var itself = this;
    //向上滚动的函数
    var scrollView = function () {
        var oldTop = ('' == ul.style.top) ? 0 : parseInt(ul.style.top);
        //移动到顶后，把位置复原，两个块继续从 0 开始向上移。
        if (oldTop < -heightAll) {
            oldTop = 0;
        }
        ul.style.top = (oldTop - 1) + 'px';
        ulCopy.style.top = (oldTop + heightAll - 1) + 'px';

        //每滚一整屏多停一会。oldTop-1 是为了让其停在整数位置。
        var duration = (0 == ((oldTop - 1) % heightView)) ? itself.showTime : msPerPx;
        itself.timer = setTimeout(scrollView, duration);
    };

    //把 slide 定义为 prototype 的方法时，似乎这样 setTimeout(itself.slide, itself.showTime); 定时操作不灵，而只能是局部函数才能定时操作，如果带参数，还得封装成匿名函数：
    itself.timer = setTimeout(scrollView, itself.showTime);
    //鼠标移上时停止滚动
    /*this.container.onmouseover = function () {
        window.clearTimeout(itself.timer);
    };
    //鼠标移开时继续滚动，不用区分当时是在整屏停止还是滚动中了，全都按静止时间来延时就得了。
    this.container.onmouseout = function () {
        itself.timer = setTimeout(scrollView, itself.showTime);
    };*/
};