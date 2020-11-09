function showLoading() {
    $('body').loading({
        loadingWidth: 240,
        title: '',
        name: 'test',
        discription: '加载中，请稍候...',
        direction: 'column',
        type: 'origin',
        originBg: '#71EA71',
        originDivWidth: 40,
        originDivHeight: 40,
        originWidth: 6,
        originHeight: 6,
        smallLoading: false,
        loadingBg: '#5B5B5B',
        loadingMaskBg: 'rgba(190,190,190,0.6)'
    });
}

function hideLoading() {
    removeLoading('test');
}