//echatrs配置
var myChart = echarts.init($('#main7')[0]);
option = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data:['工艺/品质','设备','生产','检料','暂无数据']
    },
     color:['#289eff','#fad355','#ff8484','#46cfa5','#c3c3c3'],
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['50%', '60%'],
            avoidLabelOverlap: true,
             itemStyle: {
									normal: {
										label:{
											show: true,
											formatter: function(param) {
												return param.name + ' : ' + Math.round(param.percent) + '%';
											},
											textStyle : {
												fontWeight : 'bolder'
											}
										}
									},
									emphasis : {
										label : {
											show : true,
											position : 'center',
											textStyle : {
												fontSize : '30',
												fontWeight : 'bold'
											}
										}
									}
										},
            label: {
                normal: {
                    show: true,
                   
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '24',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: true
                }
            },
            data:[
                {value:335, name:'工艺/品质'},
                {value:310, name:'设备'},
                {value:2234, name:'生产'},
                {value:135, name:'检料'},
                {value:148, name:'暂无数据'}
          
            ]
        }
    ]
};
myChart.setOption(option); window.onresize = myChart.resize; 