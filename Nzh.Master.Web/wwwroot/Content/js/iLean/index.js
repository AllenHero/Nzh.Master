function GetFactory() {
    $.ajax({
        url: '/api/sys/factory',
        type: 'get',
        async:false,
        success: function (d) {
            if (d.rows) {
                var option = [{ value: '', text: '==请选择==', code: '' }];
                $.each(d.rows, function (index, item) {
                    option.push({ value: item.FactoryId, text: item.FactoryName, code: item.FactoryCode });
                })
                $("#factory_select").html($("#option-template").render(option));
            }
        }
    })
}
function GetBusiness() {
    $.ajax({
        url: '/api/sys/BusinessUnit?FactoryId=' + $("#factory_select").val().split(',')[0],
        type: 'get',
        async: false,
        success: function (d) {
            if (d.rows) {
                var option = [{ value: '', text: '==请选择==', code: '' }];
                $.each(d.rows, function (index, item) {
                    option.push({ value: item.UnitId, text: item.UnitName, code: item.UnitCode });
                })
                $("#business_select").html($("#option-template").render(option));
            }
        }
    })
}
function GetWorkShop() {
    $.ajax({
        url: '/api/sys/WorkShop?FactoryId=' + $("#factory_select").val().split(',')[0] + '&UnitId=' + $("#business_select").val().split(',')[0],
        type: 'get',
        async: false,
        success: function (d) {
            if (d.rows) {
                var option = [{ value: '', text: '==请选择==', code: '' }];
                $.each(d.rows, function (index, item) {
                    option.push({ value: item.WorkShopId, text: item.WorkShopName, code: item.WorkShopCode });
                })
                $("#workshop_select").html($("#option-template").render(option));
            }
        }
    })
}
function GetArea() {
    $.ajax({
        url: '/api/sys/Area?WorkShopId=' + $("#workshop_select").val().split(',')[0],
        type: 'get',
        async: false,
        success: function (d) {
            if (d.rows) {
                var option = [{ value: '', text: '==请选择==', code: '' }];
                $.each(d.rows, function (index, item) {
                    option.push({ value: item.AreaId, text: item.AreaName, code: item.AreaCode });
                })
                $("#area_select").html($("#option-template").render(option));
            }
        }
    })
}

function GetLine() {
    $.ajax({
        url: '/api/sys/Line?WorkShopId=' + $("#workshop_select").val().split(',')[0] + '&AreaId=' + $("#area_select").val().split(',')[0],
        type: 'get',
        async: false,
        success: function (d) {
            if (d.rows) {
                var option = [{ value: '', text: '==请选择==', code: '' }];
                $.each(d.rows, function (index, item) {
                    option.push({ value: item.LineId, text: item.LineName, code: item.LineCode });
                })
                $("#line_select").html($("#option-template").render(option));
            }
        }
    })
}

function GetLineArea() {
    $.ajax({
        url: '/api/sys/LineArea?LineId=' + $("#line_select").val().split(',')[0],
        type: 'get',
        async: false,
        success: function (d) {
            if (d.rows) {
                var option = [{ value: '', text: '==请选择==', code: '' }];
                $.each(d.rows, function (index, item) {
                    option.push({ value: item.LineAreaId, text: item.LineAreaName, code: item.LineAreaCode });
                })
                $("#lineArea_select").html($("#option-template").render(option));
            }
        }
    })
}

function GetStation() {
    $.ajax({
        url: '/api/sys/LineAreaStation?LineId=' + $("#line_select").val().split(',')[0] + '&LineAreaId' + $("#lineArea_select").val().split(',')[0],
        type: 'get',
        async: false,
        success: function (d) {
            if (d.rows) {
                var option = [{ value: '', text: '==请选择==', code: '' }];
                $.each(d.rows, function (index, item) {
                    option.push({ value: item.LineStationId, text: item.StationName, code: item.StationCode });
                })
                $("#station_select").html($("#option-template").render(option));
            }
        }
    })
}
//更改页面
function Redirect(src) {
    src += "?FactoryId=" + workplace.FactoryId + "&FactoryCode=" + workplace.FactoryCode
    src += "&WorkShopId=" + workplace.WorkShopId + "&WorkShopCode=" + workplace.WorkShopCode
    src += "&LineId=" + workplace.LineId + "&LineCode=" + workplace.LineCode
    src += "&StationId=" + workplace.StationId + "&StationCode=" + workplace.StationCode
    $('iframe').attr('src', src);
}