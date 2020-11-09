//控制全屏
function enterfullscreen() { //进入全屏
    $("#fullscreen").attr("status", true);
    $("#fullscreen").html(" <i class='font_ilean iconfont icon-quanpingsuoxiao' style=\"font-size:25px\"></i>");
    var docElm = document.documentElement;
    //W3C
    if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
    }
    //FireFox
    else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
    }
    //Chrome等
    else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
    }
    //IE11
    else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}

function exitfullscreen() { //退出全屏
    $("#fullscreen").attr("status", false);
    $("#fullscreen").html(" <i class='font_ilean iconfont icon-jinruquanping' style=\"font-size:25px\"></i>");
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}
var a = 0;
var screenHeight = $(window).height();
window.onresize = function () {
    var isFull = !!(document.webkitIsFullScreen || document.mozFullScreen ||
        document.msFullscreenElement || document.fullscreenElement
    );//!document.webkitIsFullScreen都为true。因此用!!
    if (isFull == false) {
        a = 0; 
        $("#fullscreen").attr("status", false);
        $("#fullscreen").html(" <i class='font_ilean iconfont icon-jinruquanping' style=\"font-size:25px\"></i>");
    } else {
        a = 1; 
        $("#fullscreen").attr("status", true);
        $("#fullscreen").html(" <i class='font_ilean iconfont icon-quanpingsuoxiao' style=\"font-size:25px\"></i>");
    }
    //resize();
}
function resize() {
    var beforscreenHeight = screenHeight;
    screenHeight = $(window).height();
    //alert(beforscreenHeight + "-------" + screenHeight);
    document.body.style.transformOrigin = '0 0';
    var s = screenHeight / beforscreenHeight;
    if (screenHeight > beforscreenHeight) {
        document.body.style.transform = 'scale(' + 1 + ',' + s + ')';
    }
    else {
        document.body.style.transform = 'scale(' + 1 + ',' + 1 + ')';
    }
    //document.body.style.transformOrigin = '0 0';
    //document.body.style.transform = 'scale(' + 1 + ',' + s + ')';
    //document.body.style.width = window.innerWidth / s + 'px';
    //document.body.style.height = window.innerHeight / s + 'px';
}


; (function ($) {
    $(document).ready(function () {
        a = 0;
        $('#fullscreen').on('click', function () {
            a++; 
            a % 2 == 1 ? enterfullscreen() : exitfullscreen();
        })
    }); 
})(jQuery); 
