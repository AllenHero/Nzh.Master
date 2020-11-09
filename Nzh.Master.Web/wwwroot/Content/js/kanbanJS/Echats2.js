//echatrs配置
var myChart = echarts.init($('#main')[0]);
window.onresize = myChart.resize;

var dataAxis = ['09-01', '09-02', '09-03', '09-04', '09-05', '09-06', '09-07', '09-08', '09-09', '09-10', '09-11', '09-12', '09-13', '09-14', '09-15', '09-16', '09-17', '09-12', '09-12', '09-12'];
var data = [20, 22, 91, 24, 90, 30, 30, 83, 42, 81, 90, 89, 20, 12, 53, 64, 98, 23, 25, 20];
var yMax = 100;
var dataShadow = [];

for (var i = 0; i < data.length; i++) {
    dataShadow.push(yMax);
}

option = {
    title: {
       text:'合格率',
       textStyle: {
                color: '#eff2f3',
                fontSize:14,
                fontWeight:'normal'
            }
       
    },
    tooltip: {
  formatter: '{b0}<br />{a0}:{c0}<br />{a1}:{c1}%',
  trigger: 'axis',
},
    xAxis: {
        data: dataAxis,
        axisLabel: {
            inside: false,
            textStyle: {
                color: '#eff2f3'
            }
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
        z: 10
    },
    yAxis: {
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
                formatter: '{value}%'
            },
         axisLine: {
			 show: false,
			onZero: true,
			
			lineStyle: {
				color: 'rgba(255,255,255,0.8)',
				fontSize: '14',
				width: 0,
				type: 'solid',
				
			},
			
		},
		splitLine: {
			show: true,
			interval: 'auto',
			lineStyle: {
				color: ['rgba(198,213,232,0.1)'],
				width: 1,
				type: 'solid',
				shadowOffsetX: 0,
				shadowOffsetY: 0,
				opacity:1,
				

			},
		},
		
//		   splitArea:{
//             show:true,
//             areaStyle:{
//             	color:[
//             	  'rgba(14,46,69,1)',
//             	  'rgba(14,42,63,1)'
//             	]
//             }
//         }
    },
    dataZoom: [
        {
            type: 'inside'
        }
    ],
     grid: {
		top:'10%',
        left: '4%',
        right: '1%',
        bottom: '8%',
        
    },
    series: [
    
        { // For shadow
            type: 'bar',
           
              itemStyle:{ normal:{ color:'rgba(0,0,0,0.1)' } },
            barGap: '-100%',
            barCategoryGap: '50%',
            data: dataShadow,
            animation: false
        },
        {
        	name:'合格率',
            type: 'line',
            itemStyle: {
            	normal:{label:{show:true,formatter: function(v) {

                    var val = v.data;

                    return val +'%';

                }}, color:'#4dd2da' },
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        {offset: 0, color: '#83bff6'},
                        {offset: 0.5, color: '#188df0'},
                        {offset: 1, color: '#188df0'}
                    ]
                )
            },
            emphasis: {
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#2378f7'},
                            {offset: 0.7, color: '#2378f7'},
                            {offset: 1, color: '#83bff6'}
                        ]
                    )
                }
            },
            data: data
        }
    ]
};

// Enable data zoom when user click bar.
var zoomSize = 6;
myChart.on('click', function (params) {
    console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
    myChart.dispatchAction({
        type: 'dataZoom',
        startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
        endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
    });
});

myChart.setOption(option);
