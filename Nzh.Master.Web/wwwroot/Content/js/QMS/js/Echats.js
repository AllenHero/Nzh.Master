

//echatrs配置
$(function(){

    function GetCharsData(){
        //echatrs配置
                
        dataArray=[[],[],[]];
        option = {        
                xAxis: [
        
                    {
                        show: true,
                        type: 'category',
                        data: ['固晶', '焊线', 'Molding', '喷墨', '切割', 'smt', '模组组装'],
        
                        axisPointer: {
                            type: 'shadow'
        
                        },
        
                        axisLabel: { //调整x轴的lable  
                            textStyle: {
                                fontSize: 12,// 让字体变大
                                color: 'rgba(255,255,255,0.6)',
                            }
                        },
                        axisLine: {
                            show: true,
                            onZero: true,
                            lineStyle: {
                                color: 'rgba(255,255,255,0)',
                                width: 1,
                                type: 'solid',
        
                            },
        
        
                        },
                        splitLine: {
                            show: true,
                            interval: 'auto',
                            lineStyle: {
                                color: ['rgba(255,255,255,0.4)'],
                                width: 1,
                                type: 'solid',
        
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                opacity: 0.3,
                            },
                        },
        
                    },
        
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '总量',
                        min: 0,
                        max: 100,
                        interval: 25,
        
                        axisLabel: { //调整x轴的lable 
                            formatter: '{value}',
                            textStyle: {
                                fontSize: 12 // 让字体变大
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            onZero: true,
                            lineStyle: {
                                color: 'rgba(0,0,0,0.6)',
                                width: 0,
                            },
                        },
                        splitLine: {
                            show: true,
        
                            interval: 'auto',
                            lineStyle: {
                                color: ['rgba(0,0,0,0.6)'],
                                width: 1,
                                type: 'solid',
        
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                opacity: 0.3,
                            },
                        },
        
                    },
                    {
                        type: 'value',
                        name: '达成率',
                        min: 0.00,
                        max: 100.00,
                        interval: 25.00,
        
                        axisLabel: { //调整x轴的lable 
                            formatter: '{value}%',
                            textStyle: {
                                fontSize: 12 // 让字体变大
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            onZero: true,
                            lineStyle: {
                                color: '#B1BCCD',
                                width: 0,
        
                            },
                        },
                        splitLine: {
                            show: true,
                            interval: 'auto',
                            lineStyle: {
                                color: ['rgba(114,134,163,0.3)'],
                                width: 2,
                                type: 'solid',
        
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                opacity: 0.3,
                            },
        
                        },
                    }
                ],
                grid: {
                    top: '10%',
                    left: '1%',
                    right: '1%',
                    bottom: '4%',
                    containLabel: true
                },
                series:[
                    {
                        name: '目标',
                        type: 'bar',
                        color: ['#135f76'],
                        barWidth: '8%',
                        data: [50, 30, 50, 50, 30, 50, 50],
        
                        itemStyle: {
        
                            normal: {
                                barBorderRadius: 4,
                                shadowBlur: 50,
                                shadowColor: 'rgba(0,0,0, 0.2)',
                                shadowOffsetX: 0,
                                shadowOffsetY: 6,
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        { offset: 0, color: '#0066FF' },
        
                                        { offset: 1, color: '#0066FF' }
                                    ]
                                ),
        
                            },
                            emphasis: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        { offset: 0, color: '#0066FF' },
        
                                        { offset: 1, color: '#0066FF' }
                                    ]
                                )
                            },
        
                        },
                        label: {  //显示参数
                            normal: {
                                show: true,
                                position: 'inside',
                                textStyle: {
                                    color: 'rgba(255,255,255,0.8)',
                                    fontStyle: 'normal',
                                    fontWeight: 'bold',
                                    fontSize: 20,
                                },
                            },
        
                        },
        
                    },
                    {
                        name: '总装目标数量',
                        type: 'bar',
                        color: ['#11bf64'],
                        barWidth: '8%',
                        data: dataArray[1],
                        itemStyle: {
                            normal: {
                                barBorderRadius: 4,
                                shadowBlur: 50,
                                shadowColor: 'rgba(0, 0, 0, 0.2)',
                                shadowOffsetX: 0,
                                shadowOffsetY: 6,
                                /*    color: new echarts.graphic.LinearGradient(
                                         0, 0, 0, 1,
                                         [
                                             {offset: 0, color: '#02BB5F'},
                                             {offset: 1, color: '#02BB5F'}
                                         ]
                                     ),*/
                                color: function (params) {
                                    var dataIndex=params.dataIndex;        
                                    if (dataArray[2][dataIndex] >= 85) {
                                        return '#02BB5F';
                                    } else {
                                        return 'red';
                                    }
                                },
                            },
                            emphasis: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        { offset: 0, color: '#02BB5F' },
                                        { offset: 1, color: '#02BB5F' }
                                    ]
                                )
                            }
                        },
                        label: {  //显示参数
                            normal: {
                                show: true,
                                position: 'inside',
                                textStyle: {
                                    color: '#edfffc',
                                    fontStyle: 'normal',
                                    fontWeight: 'bold',
                                    fontSize: 20,
                                },
                            },
        
                        },
                    },
        
                    {
                        name: '效率达成率',
                        type: 'line',
                        borderwidth: '8',
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                formatter: '{c} %',
        
                            }
                        },
        
                        itemStyle: {
                            normal: {
                                color: '#00CCCC',
                                borderWidth: 0,
                            },
                        },
                        lineStyle: {
                            normal: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
        
                                    colorStops: [{
                                        offset: 1, color: '#FFFF00' // 0% 处的颜色
                                    }, {
                                        offset: 0, color: '#00FF66' // 100% 处的颜色
                                    }],
        
                                    globalCoord: false // 缺省为 false
                                },
                                width: 8,
                                borderType: 'solid',
                                shadowColor: 'rgba(0, 0, 0, 0.2)',
                                shadowBlur: 0,
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
        
                            },
                        },
                        symbolSize: 6,
        
                        yAxisIndex: 1,
                        data: dataArray[2],
                        axisLabel: {
                            normal: {
                                show: true,
                                position: 'outside',
                                formatter: '{value}%'// 这里是数据展示的时候显示的数据
                            }
                        },
                        itemStyle: {
                            normal: {
                                barBorderRadius: 4,
                                shadowBlur: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                color: 'yellow',
                                borderWidth: 4,
                                borderType: 'solid',
                                label: {
                                    show: true,
                                    formatter: null,
                                    textStyle: {
                                        color: 'rgba(255,255,255,1)',
                                        fontWeight: 'normal',
                                        fontSize: 22,
        
                                    },
                                },
                            },
                        },
                    },
                ],
        
            };
        
        

        option2 = {

            xAxis: [

                {
                    type: 'category',
                    data: ['目标      实际', '目标     实际', '目标      实际', '目标      实际'],

                    axisPointer: {
                        type: 'shadow'

                    },

                    axisLabel: { //调整x轴的lable  
                        textStyle: {
                            fontSize: 16,// 让字体变大
                            color: 'rgba(255,255,255,0.6)',
                        }
                    },
                    axisLine: {
                        show: true,
                        onZero: true,
                        lineStyle: {
                            color: 'rgba(255,255,255,0)',
                            width: 1,
                            type: 'solid',

                        },


                    },
                    splitLine: {
                        show: true,
                        interval: 'auto',
                        lineStyle: {
                            color: ['rgba(255,255,255,0.4)'],
                            width: 1,
                            type: 'solid',

                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            opacity: 0.3,
                        },
                    },

                },

            ],
            yAxis: [
                {
                    type: 'value',
                    name: '总量(万)',
                    min: 0,
                    max: 60,
                    interval: 10,

                    axisLabel: { //调整x轴的lable 
                        formatter: '{value}',
                        textStyle: {
                            fontSize: 16 // 让字体变大
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: true,
                        onZero: true,
                        lineStyle: {
                            color: '#B1BCCD',
                            width: 0,
                        },
                    },
                    splitLine: {
                        show: true,

                        interval: 'auto',
                        lineStyle: {
                            color: ['rgba(255,255,255,0.4)'],
                            width: 1,
                            type: 'solid',

                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            opacity: 0.3,
                        },
                    },

                },
                {
                    type: 'value',
                    name: '效率',
                    min: 0.00,
                    max: 120.00,
                    interval: 20.00,

                    axisLabel: { //调整x轴的lable 
                        formatter: '{value}%',
                        textStyle: {
                            fontSize: 16 // 让字体变大
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: true,
                        onZero: true,
                        lineStyle: {
                            color: '#B1BCCD',
                            width: 0,

                        },
                    },
                    splitLine: {
                        show: true,
                        interval: 'auto',
                        lineStyle: {
                            color: ['rgba(114,134,163,0.3)'],
                            width: 2,
                            type: 'solid',

                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            opacity: 0.3,
                        },

                    },
                }
            ],
            grid: {
                top: '10%',
                left: '2%',
                right: '2%',
                bottom: '4%',
                containLabel: true
            },
            series: [
                {
                    name: '总装完成数量',
                    type: 'bar',
                    color: ['#135f76'],
                    barWidth: '18%',
                    data: [50, 30, 50, 50],

                    itemStyle: {

                        normal: {
                            barBorderRadius: 4,
                            shadowBlur: 0,
                            shadowColor: 'rgba(1, 234, 29, 0.2)',
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    { offset: 0, color: '#0066FF' },

                                    { offset: 1, color: '#0066FF' }
                                ]
                            ),

                        },
                        emphasis: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    { offset: 0, color: '#0066FF' },

                                    { offset: 1, color: '#0066FF' }
                                ]
                            )
                        },

                    },
                    label: {  //显示参数
                        normal: {
                            show: true,
                            position: 'inside',
                            textStyle: {
                                color: 'rgba(255,255,255,0.9)',
                                fontStyle: 'normal',
                                fontWeight: 'bold',
                                fontSize: 22,
                            },
                        },

                    },

                },
                {
                    name: '总装目标数量',
                    type: 'bar',
                    color: ['#11bf64'],
                    barWidth: '18%',
                    data: [40, 28, 52, 48],
                    itemStyle: {
                        normal: {
                            barBorderRadius: 4,
                            shadowBlur: 0,
                            shadowColor: 'rgba(0, 51, 180, 0.3)',
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    { offset: 0, color: '#02BB5F' },
                                    { offset: 1, color: '#02BB5F' }
                                ]
                            )
                        },
                        emphasis: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    { offset: 0, color: '#02BB5F' },
                                    { offset: 1, color: '#02BB5F' }
                                ]
                            )
                        }
                    },
                    label: {  //显示参数
                        normal: {
                            show: true,
                            position: 'inside',
                            textStyle: {
                                color: '#edfffc',
                                fontStyle: 'normal',
                                fontWeight: 'bold',
                                fontSize: 22,
                            },
                        },

                    },
                },

                {
                    name: '效率达成率',
                    type: 'line',
                    borderwidth: '8',
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            formatter: '{c} %',

                        }
                    },

                    itemStyle: {
                        normal: {
                            color: '#00CCCC',
                            borderWidth: 0,
                        },
                    },
                    lineStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 1, color: '#00CCCC' // 0% 处的颜色
                                }, {
                                    offset: 0, color: '#0099FF' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            },
                            width: 8,
                            borderType: 'solid',
                            shadowColor: 'rgba(0, 0, 0, 0.2)',
                            shadowBlur: 0,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,

                        },
                    },
                    symbolSize: 6,

                    yAxisIndex: 1,
                    data: [80.00, 90.88, 102.89, 96.00],
                    axisLabel: {
                        normal: {
                            show: true,
                            position: 'outside',
                            formatter: '{value}%'// 这里是数据展示的时候显示的数据
                        }
                    },
                    itemStyle: {
                        normal: {
                            barBorderRadius: 4,
                            shadowBlur: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            color: 'yellow',
                            borderWidth: 4,
                            borderType: 'solid',
                            label: {
                                show: true,
                                formatter: null,
                                textStyle: {
                                    color: 'rgba(255,255,255,1)',
                                    fontWeight: 'bold',
                                    fontSize: 24,

                                },
                            },
                        },
                    },
                },
            ],

        };
        myChart = echarts.init($('#main')[0]);
        //myChart2 = echarts.init(document.getElementById('main2'));

        //获取要显示的数据
        dataArray[0].push(100);
        dataArray[0].push(90);
        dataArray[0].push(700);
        dataArray[0].push(700);

        dataArray[1].push(98);
        dataArray[1].push(86);
        dataArray[1].push(620);
        dataArray[1].push(600);

        dataArray[2].push(80);
        dataArray[2].push(96);
        dataArray[2].push(90.5);
        dataArray[2].push(90.00);
        
        myChart.setOption(option); 
        window.onresize = myChart.resize; 

        //myChart2.setOption(option2);
       // window.onresize = myChart2.resize;       
    }
    GetCharsData();
});



/*var myChart = echarts.init($('#main')[0]);
var linecolor=98,

option = {
   
    xAxis: [
	     
        {    
		    show: true,
            type: 'category', 
            data: ['目标    实际','目标    实际','目标     实际','目标    实际'],
			
            axisPointer: {
                type: 'shadow'
	
            },
			
		axisLabel:{ //调整x轴的lable  
            textStyle:{
                fontSize:16,// 让字体变大
				color: 'rgba(255,255,255,0.6)',
            }
        },
        axisLine: {
            show: true,
            onZero: true,
            lineStyle: {
                color: 'rgba(255,255,255,0)',
                width: 1,
                type: 'solid',
				
            },
			
			
        },
		splitLine: {
				  show: true,
				  interval: 'auto',
				  lineStyle: {
				  color: ['rgba(255,255,255,0.4)'],
				  width: 1,
				  type: 'solid',
				  
				  shadowOffsetX: 0,
				  shadowOffsetY: 0,
				  opacity:0.3,
				  },
				  },
		
        },
	
    ],
    yAxis: [
        {
            type: 'value',
            name: '总量',
            min: 0,
            max: 800,
            interval: 200,
           
			axisLabel:{ //调整x轴的lable 
			 formatter: '{value}', 
            textStyle:{
                fontSize:16 // 让字体变大
            }
        },
		 axisTick: {
           show: false
        },
			 axisLine: {
                show: true,
                onZero: true,
                lineStyle: {
                    color: '#B1BCCD',
                    width: 0,
                },
            },
			 splitLine: {
				  show: true,
				  
				  interval: 'auto',
				  lineStyle: {
				  color: ['rgba(255,255,255,0.4)'],
				  width: 1,
				  type: 'solid',
				  
				  shadowOffsetX: 0,
				  shadowOffsetY: 0,
				  opacity:0.3,
				  },
				  },
			
        },
        {
            type: 'value',
            name: '效率',
            min: 0.00,
            max: 100.00,
            interval:25.00,
			
			axisLabel:{ //调整x轴的lable 
			 formatter: '{value}%', 
             textStyle:{
             fontSize:16 // 让字体变大
            }
        },
		 axisTick: {
           show: false
        },
			 axisLine: {
                show: true,
                onZero: true,
                lineStyle: {
                    color: '#B1BCCD',
                    width: 0,
                    
                },
            },
			 splitLine: {
				  show: true,
				  interval:'auto',
				  lineStyle: {
				  color: ['rgba(114,134,163,0.3)'],
				  width: 2,
				  type:'solid',
				  
				  shadowOffsetX: 0,
				  shadowOffsetY: 0,
				  opacity:0.3,
				  },
				  
				  },
        }
    ],
	  grid: {
		top:'10%',
        left: '1%',
        right: '1%',
        bottom: '4%',
        containLabel: true
    },
    series: [
          {
            name:'目标',
            type:'bar',
		    color: ['#135f76'],
			barWidth: '18%',
            data:[100, 90, 700, 700],
			
			itemStyle: {
				
                normal: {
					barBorderRadius:4,
					shadowBlur:50,
					shadowColor:'rgba(0,0,0, 0.2)',
					shadowOffsetX: 0,
					shadowOffsetY: 6,
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#0066FF'},
                   
                            {offset: 1, color: '#0066FF'}
                        ]
                    ),
					
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                           {offset: 0, color: '#0066FF'},
                   
                            {offset: 1, color: '#0066FF'}
                        ]
                    )
                },
				
            },
			 label: {  //显示参数
                normal: {
                    show: true,
                    position: 'inside',
                    textStyle: {
					color:'rgba(255,255,255,0.8)',
					fontStyle:'normal',
					fontWeight:'bold',
					fontSize:20,
                    },
                },
				
            },
			
        },
		{
            name:'总装目标数量',
            type:'bar',
			color: ['#11bf64'],
			barWidth: '18%',
            data:[98, 86, 620, 600],
			itemStyle: {
                normal: {
					barBorderRadius:4,
					shadowBlur: 50,
					shadowColor:'rgba(0, 0, 0, 0.2)',
					shadowOffsetX: 0,
					shadowOffsetY: 6,
                   color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#02BB5F'},
                            {offset: 1, color: '#02BB5F'}
                        ]
                    ),
					color: function(params) {

                                    var index_color = params.value;

                                    if(index_color>=96.00){
                                        return '#02BB5F';
                                    }else {
                                        return 'red';
                                    }


                                },
                   },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#02BB5F'},
                            {offset: 1, color: '#02BB5F'}
                        ]
                    )
                }
            },
			 label: {  //显示参数
                normal: {
                    show: true,
                    position: 'inside',
                    textStyle: {
					color: '#edfffc',
					fontStyle: 'normal',
					fontWeight: 'bold',
					fontSize: 20,
                    },
                },
				
            },
        },
	
        {
            name:'效率达成率',
            type: 'line',
			borderwidth:'8',
			    label: {
            normal: {
                show: true,
                position: 'top',
                formatter: '{c} %',
               
            }
        },
            
			itemStyle: {
					normal: {
					color: '#00CCCC',
					borderWidth: 0,
					},
			   },
			lineStyle: {
				 normal: { 
				    color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						
						colorStops: [{
							offset: 1, color: '#FFFF00' // 0% 处的颜色
						}, {
							offset: 0, color: '#00FF66' // 100% 处的颜色
						}],
  
						globalCoord: false // 缺省为 false
						  }, 
						  width:8,
						  borderType: 'solid',
						  shadowColor: 'rgba(0, 0, 0, 0.2)',
						  shadowBlur:0,
						  shadowOffsetX: 0,
						  shadowOffsetY: 0,
	  
						  },
						  },
						  symbolSize:6,

            yAxisIndex: 1,
            data:[80.00, 90.88, 98.89, 96.00],
			 axisLabel: {
                normal: {
                show: true,
                position: 'outside',
               formatter: '{value}%'// 这里是数据展示的时候显示的数据
            }
            },
		 itemStyle: {
			normal: {
				barBorderRadius:4,
				shadowBlur: 0,
				shadowColor:'rgba(0, 0, 0, 0.5)',
				shadowOffsetX: 0,
				shadowOffsetY: 0,
				color: 'yellow',
				borderWidth:4,
				borderType: 'solid',
				label: {
					show: true,
					formatter: null,
					textStyle: { 
					color:'rgba(255,255,255,1)',
				    fontWeight: 'normal',
					fontSize:22, 

					},
				 },
			  },
		   },	  
        },	
    ],

};

myChart.setOption(option); window.onresize = myChart.resize; 

option2= {
   
    xAxis: [
		
        {    
            type: 'category',
            data: ['目标      实际','目标     实际','目标      实际','目标      实际'],
			
            axisPointer: {
                type: 'shadow'
	
            },
			
		axisLabel:{ //调整x轴的lable  
            textStyle:{
                fontSize:16,// 让字体变大
				color: 'rgba(255,255,255,0.6)',
            }
        },
        axisLine: {
            show: true,
            onZero: true,
            lineStyle: {
                color: 'rgba(255,255,255,0)',
                width: 1,
                type: 'solid',
				
            },
			
			
        },
		splitLine: {
				  show: true,
				  interval: 'auto',
				  lineStyle: {
				  color: ['rgba(255,255,255,0.4)'],
				  width: 1,
				  type: 'solid',
				  
				  shadowOffsetX: 0,
				  shadowOffsetY: 0,
				  opacity:0.3,
				  },
				  },
		
        },
	
    ],
    yAxis: [
        {
            type: 'value',
            name: '总量(万)',
            min: 0,
            max: 60,
            interval: 10,
           
			axisLabel:{ //调整x轴的lable 
			 formatter: '{value}', 
            textStyle:{
                fontSize:16 // 让字体变大
            }
        },
		 axisTick: {
           show: false
        },
			 axisLine: {
                show: true,
                onZero: true,
                lineStyle: {
                    color: '#B1BCCD',
                    width: 0,
                },
            },
			 splitLine: {
				  show: true,
				  
				  interval: 'auto',
				  lineStyle: {
				  color: ['rgba(255,255,255,0.4)'],
				  width: 1,
				  type: 'solid',
				  
				  shadowOffsetX: 0,
				  shadowOffsetY: 0,
				  opacity:0.3,
				  },
				  },
			
        },
        {
            type: 'value',
            name: '效率',
            min: 0.00,
            max: 120.00,
            interval:20.00,
			
			axisLabel:{ //调整x轴的lable 
			 formatter: '{value}%', 
             textStyle:{
             fontSize:16 // 让字体变大
            }
        },
		 axisTick: {
           show: false
        },
			 axisLine: {
                show: true,
                onZero: true,
                lineStyle: {
                    color: '#B1BCCD',
                    width: 0,
                    
                },
            },
			 splitLine: {
				  show: true,
				  interval:'auto',
				  lineStyle: {
				  color: ['rgba(114,134,163,0.3)'],
				  width: 2,
				  type:'solid',
				  
				  shadowOffsetX: 0,
				  shadowOffsetY: 0,
				  opacity:0.3,
				  },
				  
				  },
        }
    ],
	  grid: {
		top:'10%',
        left: '2%',
        right: '2%',
        bottom: '4%',
        containLabel: true
    },
    series: [
          {
            name:'总装完成数量',
            type:'bar',
		    color: ['#135f76'],
			barWidth: '18%',
            data:[50, 30, 50, 50],
			
			itemStyle: {
				
                normal: {
					barBorderRadius:4,
					shadowBlur:0,
					shadowColor:'rgba(1, 234, 29, 0.2)',
					shadowOffsetX: 0,
					shadowOffsetY: 0,
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#0066FF'},
                   
                            {offset: 1, color: '#0066FF'}
                        ]
                    ),
					
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                           {offset: 0, color: '#0066FF'},
                   
                            {offset: 1, color: '#0066FF'}
                        ]
                    )
                },
				
            },
			 label: {  //显示参数
                normal: {
                    show: true,
                    position: 'inside',
                    textStyle: {
					color:'rgba(255,255,255,0.9)',
					fontStyle:'normal',
					fontWeight:'bold',
					fontSize:22,
                    },
                },
				
            },
			
        },
		{
            name:'总装目标数量',
            type:'bar',
			color: ['#11bf64'],
			barWidth: '18%',
            data:[40, 28, 52, 48],
			itemStyle: {
                normal: {
					barBorderRadius:4,
					shadowBlur: 0,
					shadowColor:'rgba(0, 51, 180, 0.3)',
					shadowOffsetX: 0,
					shadowOffsetY: 0,
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#02BB5F'},
                            {offset: 1, color: '#02BB5F'}
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#02BB5F'},
                            {offset: 1, color: '#02BB5F'}
                        ]
                    )
                }
            },
			 label: {  //显示参数
                normal: {
                    show: true,
                    position: 'inside',
                    textStyle: {
					color: '#edfffc',
					fontStyle: 'normal',
					fontWeight: 'bold',
					fontSize: 22,
                    },
                },
				
            },
        },
       
        {
            name:'效率达成率',
            type: 'line',
			borderwidth:'8',
			    label: {
            normal: {
                show: true,
                position: 'top',
                formatter: '{c} %',
               
            }
        },
            
			itemStyle: {
					normal: {
					color: '#00CCCC',
					borderWidth: 0,
					},
			   },
			lineStyle: {
				 normal: { 
				    color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [{
							offset: 1, color: '#00CCCC' // 0% 处的颜色
						}, {
							offset: 0, color: '#0099FF' // 100% 处的颜色
						}],
						globalCoord: false // 缺省为 false
						  }, 
						  width:8,
						  borderType: 'solid',
						  shadowColor: 'rgba(0, 0, 0, 0.2)',
						  shadowBlur:0,
						  shadowOffsetX: 0,
						  shadowOffsetY: 0,
	  
						  },
						  },
						  symbolSize:6,

            yAxisIndex: 1,
            data:[80.00, 90.88, 102.89, 96.00],
			 axisLabel: {
                normal: {
                show: true,
                position: 'outside',
               formatter: '{value}%'// 这里是数据展示的时候显示的数据
            }
            },
		 itemStyle: {
			normal: {
				barBorderRadius:4,
				shadowBlur: 0,
				shadowColor:'rgba(0, 0, 0, 0.5)',
				shadowOffsetX: 0,
				shadowOffsetY: 0,
				color: 'yellow',
				borderWidth:4,
				borderType: 'solid',
				label: {
					show: true,
					formatter: null,
					textStyle: { 
					color:'rgba(255,255,255,1)',
				    fontWeight: 'bold',
					fontSize:24, 

					},
				 },
			  },
		   },	  
        },	
    ],

};

myChart2 = echarts.init(document.getElementById('main2'));
myChart2.setOption(option2);
 window.onresize = myChart2.resize; 
*/

/*option3 = {
    
       xAxis: [
        {
            type: 'category',
            data: ['10:00','12:00','14:00','16:00','18:00','20:00'],
            axisPointer: {
                type: 'shadow'
            },
		
        axisLine: {
            show: true,
            onZero: true,
            lineStyle: {
                color: '#899098',
                width: 1,
                type: 'solid',
            },
        },
		
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '总量',
            min: 0,
            max: 60,
            interval: 10,
            axisLabel: {
                formatter: '{value}'
            },
			 axisLine: {
                show: true,
                onZero: true,
                lineStyle: {
                    color: '#899098',
                    width: 0,
                },
            },
			 splitLine: {
				  show: true,
				  interval: 'auto',
				  lineStyle: {
				  color: ['#ccc'],
				  width: 1,
				  type: 'dashed',
				  
				  shadowOffsetX: 0,
				  shadowOffsetY: 0,
				  opacity:0.3,
				  },
				  },
			
        },
        {
            type: 'value',
            name: '效率',
            min: 0.00,
            max: 120.00,
            interval:40.00,
            axisLabel: {
                formatter: '{value} %'
            },
			 axisLine: {
                show: true,
                onZero: true,
                lineStyle: {
                    color: '#899098',
                    width: 0,
                    
                },
            },
			 splitLine: {
				  show: true,
				  interval: 'auto',
				  lineStyle: {
				  color: ['#ccc'],
				  width: 1,
				  type: 'dashed',
				  
				  shadowOffsetX: 0,
				  shadowOffsetY: 0,
				  opacity:0.3,
				  },
				  },
        }
    ],
	  grid: {
		top:'16%',
        left: '2%',
        right: '2%',
        bottom: '4%',
        containLabel: true
    },
    series: [
          {
            name:'总装完成数量',
            type:'bar',
		    color: ['#135f76'],
            data:[50, 30, 50, 45, 50, 50],
			itemStyle: {
                normal: {
					barBorderRadius:4,
					shadowBlur: 3,
					shadowColor:'rgba(0, 0, 0, 0.5)',
					shadowOffsetX: 3,
					shadowOffsetY: 0,
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#15FD63'},
                            {offset: 0.5, color: '#09D147'},
                            {offset: 1, color: '#becd13'}
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: 'blue'},
                            {offset: 0.7, color: '#2378f7'},
                            {offset: 1, color: '#83bff6'}
                        ]
                    )
                }
            },
			 label: {  //显示参数
                normal: {
                    show: true,
                    position: 'inside',
                    textStyle: {
					color: '#202f23',
					fontStyle: 'normal',
					fontWeight: 'normal',
					fontSize:12,
                    },
                },
				
            },
			
        },
		{
            name:'总装目标数量',
            type:'bar',
			color: ['#11bf64'],
            data:[40, 28, 52, 45, 48, 40],
			itemStyle: {
                normal: {
					barBorderRadius:4,
					shadowBlur: 3,
					shadowColor:'rgba(0, 0, 0, 0.5)',
					shadowOffsetX: 3,
					shadowOffsetY: 0,
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#1a7ded'},
                            {offset: 0.5, color: '#1777e2'},
                            {offset: 1, color: '#066de0'}
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: 'blue'},
                            {offset: 0.7, color: '#2378f7'},
                            {offset: 1, color: '#83bff6'}
                        ]
                    )
                }
            },
			 label: {  //显示参数
                normal: {
                    show: true,
                    position: 'inside',
                    textStyle: {
					color: '#edfffc',
					fontStyle: 'normal',
					fontWeight: 'normal',
					fontSize: 12,
                    },
                },
				
            },
        },
       
        {
            name:'效率达成率',
            type: 'line',
			borderwidth:'4',
			
            smooth: true,
            smoothMonotone:'X',
			itemStyle: {
					normal: {
					
					color: '#ffcc2f',
					borderWidth: 0,
					
					
					},
			   },
			lineStyle: {
				 normal: { 
				    color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [{
							offset: 1, color: '#fefefe' // 0% 处的颜色
						}, {
							offset: 0, color: '#fefefe' // 100% 处的颜色
						}],
						globalCoord: false // 缺省为 false
						  }, 
						  width:4,
						  borderType: 'solid',
						  shadowColor: 'rgba(0, 0, 0, 0.5)',
						  shadowBlur:8,
						   shadowOffsetX: 0,
						  shadowOffsetY: 12,
	  
						  },
						  
						  },
						  symbolSize:1,
            yAxisIndex: 1,
            data:[80.00, 90.88, 102.89, 99.00, 86.00, 80.99],
			 axisLabel: {
                formatter: '{value} %'
            },
		 itemStyle: {
			normal: {
				barBorderRadius:4,
				shadowBlur: 3,
				shadowColor:'rgba(0, 0, 0, 0.5)',
				shadowOffsetX: 3,
				shadowOffsetY: 0,
				color: 'white',
				borderWidth:4,
				borderType: 'solid',
				label: {
					show: true,
					formatter: null,
					textStyle: { color: '#fefefe' },
				},
			},
		   },
			  
        },
		 {
            name:'目标效率',
            type:'line',
			symbol: 'rect',
            yAxisIndex: 1,
            data:[100.00, 100.00, 100.00, 100.00, 100.00, 100.00],
			 axisLabel: {
                formatter: '{value} %'
            },
		 itemStyle: {
			normal: {
				barBorderRadius:4,
				shadowBlur: 3,
				shadowColor:'rgba(0, 0, 0, 0.5)',
				shadowOffsetX: 3,
				shadowOffsetY: 0,
				color: 'red',
				borderWidth:4,
				borderType: 'solid',
				
			},
		   },
			  
        },
		
    ],

};
myChart3 = echarts.init(document.getElementById('main3'));
myChart3.setOption(option3);
 window.onresize = myChart3.resize; 
option4 = {
  xAxis: [
        {
            type: 'category',
            data: ['X9','X7','X9E','X10','X12','X15'],
            axisPointer: {
                type: 'shadow'
            },
		
        axisLine: {
            show: true,
            onZero: true,
            lineStyle: {
                color: '#899098',
                width: 1,
                type: 'solid',
            },
        },
		
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '总量',
            min: 0,
            max: 60,
            interval: 10,
            axisLabel: {
                formatter: '{value}'
            },
			 axisLine: {
                show: true,
                onZero: true,
                lineStyle: {
                    color: '#899098',
                    width: 0,
                },
            },
			 splitLine: {
				  show: true,
				  interval: 'auto',
				  lineStyle: {
				  color: ['#ccc'],
				  width: 1,
				  type: 'dashed',
				  
				  shadowOffsetX: 0,
				  shadowOffsetY: 0,
				  opacity:0.3,
				  },
				  },
			
        },
        {
            type: 'value',
            name: '效率',
            min: 0.00,
            max: 120.00,
            interval:40.00,
            axisLabel: {
                formatter: '{value} %',
            },
			 axisLine: {
                show: true,
                onZero: true,
                lineStyle: {
                    color: '#899098',
                    width: 0,
                    
                },
            },
			 splitLine: {
				  show: true,
				  interval: 'auto',
				  lineStyle: {
				  color: ['#ccc'],
				  width: 1,
				  type: 'dashed',
				  
				  shadowOffsetX: 0,
				  shadowOffsetY: 0,
				  opacity:0.3,
				  },
				  },
        }
    ],
	  grid: {
		top:'16%',
        left: '2%',
        right: '2%',
        bottom: '4%',
        containLabel: true
    },
    series: [
	      
	       {
            name: '目标效率',
            type: 'line',
            smooth: true,
            smoothness:0.2,
			yAxisIndex: 1,
           itemStyle: {
					normal: {
					
					color: '#0DF452',
					borderWidth: 0,
					
					
					},
			   },
			   lineStyle: {
				 normal: { 
				    color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [{
							offset: 1, color: '#b4fe53' // 0% 处的颜色
						}, {
							offset: 0, color: '#07FA6F' // 100% 处的颜色
						}],
						globalCoord: false // 缺省为 false
						  }, 
						  width:4,
						  borderType: 'solid',
						  shadowColor: 'rgba(0, 0, 0, 0.5)',
						  shadowBlur:3,
						   shadowOffsetX: 0,
						  shadowOffsetY: 6,
	  
						  },
						  
						  },
		 
           data:[78.00, 98.00, 100.00, 89.06, 89.00, 90.00],
			 axisLabel: {
                formatter: '{value} %'
            },
			  label: {  //显示参数
                normal: {

                    show: true,
                    position: 'inside',
                    textStyle: {
                        color: '#fefefe',
                        fontStyle: 'normal',
                        fontWeight: 'normal',
                        fontSize: 12,
                    },
                },

            },
           
            //柱状样式
           
            //显示最大和最小值
           
            //显示平均值横线
           // markLine: {
                //data: [
                   // { type: 'average', name: '平均值' }
               // ]

           // }
        },
		
		 {
            name: '直通率',
            type: 'line',
            smooth: true,
            smoothness:0.2,
			yAxisIndex: 1,
           itemStyle: {
					normal: {
					
					color: '#0DF452',
					borderWidth: 0,
					
					
					},
			   },
			   lineStyle: {
				 normal: { 
				    color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [{
							offset: 1, color: '#1a7dec' // 0% 处的颜色
						}, {
							offset: 0, color: '#1a7dec' // 100% 处的颜色
						}],
						globalCoord: false // 缺省为 false
						  }, 
						  width:4,
						  borderType: 'solid',
						  shadowColor: 'rgba(0, 0, 0, 0.5)',
						  shadowBlur:3,
						   shadowOffsetX: 0,
						  shadowOffsetY: 6,
	  
						  },
						  
						  },
            data:[98.00, 68.00, 80.08, 94.06, 78.00, 80.00],
			 axisLabel: {
                formatter: '{value} %'
            },
			
            label: {  //显示参数
                normal: {

                    show: true,
                    position: 'inside',
                    textStyle: {
                        color: '#fefefe',
                        fontStyle: 'normal',
                        fontWeight: 'normal',
                        fontSize: 12,
                    },
                },

            },
            //柱状样式
           
            //显示最大和最小值
           
            //显示平均值横线
           // markLine: {
                //data: [
                   // { type: 'average', name: '平均值' }
               // ]

           // }
        },
		
          {
            name:'合格数量',
            type:'bar',
			barWidth: '18%',
		    color: ['#135f76'],
            data:[40, 36, 58, 46, 53, 60],
			itemStyle: {
                normal: {
					barBorderRadius:3,
					shadowBlur: 3,
					shadowColor:'rgba(0, 0, 0, 0.5)',
					shadowOffsetX: 3,
					shadowOffsetY: 0,
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                           {offset: 0, color: '#00FF00'},
                            {offset: 0.5, color: '#0ee353'},
                            {offset: 1, color: '#0ee353'}
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: 'blue'},
                            {offset: 0.7, color: '#2378f7'},
                            {offset: 1, color: '#83bff6'}
                        ]
                    )
                }
            },
			
			
        },
		{
            name:'不合格数量',
            type:'bar',
			barWidth: '18%',
		    color: ['#135f76'],
            data:[50, 30, 50, 45, 50, 50],
			itemStyle: {
                normal: {
					barBorderRadius:3,
					shadowBlur: 3,
					shadowColor:'rgba(0, 0, 0, 0.5)',
					shadowOffsetX: 3,
					shadowOffsetY: 0,
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#FF6600'},
                            {offset: 0.5, color: '#f53737'},
                            {offset: 1, color: '#f53737'}
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: 'blue'},
                            {offset: 0.7, color: '#2378f7'},
                            {offset: 1, color: '#83bff6'}
                        ]
                    )
                }
            },
			
			
        },
		
		{
            name:'测试总数',
            type:'bar',
			barWidth: '18%',
			color: ['#11bf64'],
            data:[40, 28, 52, 45, 48, 40],
			itemStyle: {
                normal: {
					barBorderRadius:3,
					shadowBlur: 3,
					shadowColor:'rgba(0, 0, 0, 0.5)',
					shadowOffsetX: 3,
					shadowOffsetY: 0,
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#FFCC00'},
                            {offset: 0.5, color: '#e0b32b'},
                            {offset: 1, color: '#e0b32b'}
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: 'blue'},
                            {offset: 0.7, color: '#2378f7'},
                            {offset: 1, color: '#83bff6'}
                        ]
                    )
                }
            },
			
        },
       
              
		
    ],

};
myChart4 = echarts.init(document.getElementById('main4'));
myChart4.setOption(option4);
 window.onresize = myChart4.resize; 

option5 = {
      
    xAxis: [
        {
            type: 'category',
            data: ['6月1日','6月2日','6月3日','6月4日','6月5日','6月6日'],
            axisPointer: {
                type: 'shadow'
            },
		
        axisLine: {
            show: true,
            onZero: true,
            lineStyle: {
                color: '#899098',
                width: 1,
                type: 'solid',
            },
        },
		splitLine: {
				  show: true,
				  interval: 'auto',
				  lineStyle: {
				  color: ['#ccc'],
				  width: 1,
				  type: 'dashed',
				  
				  shadowOffsetX: 0,
				  shadowOffsetY: 0,
				  opacity:0.3,
				  },
				  },
		
        }
    ],
    yAxis: [
        {
            type: 'value',

           min: 0.00,
            max: 120.00,
            interval:40.00,
       
            axisLabel: {
                formatter: '{value} %'
            },
			 axisLine: {
                show: true,
                onZero: true,
                lineStyle: {
                    color: '#899098',
                    width: 0,
                },
            },
			 splitLine: {
				  show: true,
				  interval: 'auto',
				  lineStyle: {
				  color: ['#ccc'],
				  width: 1,
				  type: 'dashed',
				  
				  shadowOffsetX: 0,
				  shadowOffsetY: 0,
				  opacity:0.3,
				  },
				  },
			
        },
        {
            type: 'value',
            min: 0.00,
            max: 120.00,
            interval:40.00,
            axisLabel: {
                formatter: '{value} %',
            },
			 axisLine: {
                show: true,
                onZero: true,
                lineStyle: {
                    color: '#899098',
                    width: 0,
                    
                },
            },
			 splitLine: {
				  show: true,
				  interval: 'auto',
				  lineStyle: {
				  color: ['#ccc'],
				  width: 1,
				  type: 'dashed',
				  
				  shadowOffsetX: 0,
				  shadowOffsetY: 0,
				  opacity:0.3,
				  },
				  },
        }
    ],
	  grid: {
		top:'16%',
        left: '2%',
        right: '2%',
        bottom: '4%',
        containLabel: true
    },
    series: [
	      
	       {
            name: '焊接1',
            type: 'line',
            smooth: true,
            smoothness:0.2,
			yAxisIndex: 1,
           itemStyle: {
					normal: {
					
					color: '#b4fe53',
					borderWidth: 1,
					
					
					},
			   },
			   lineStyle: {
				 normal: { 
				    color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [{
							offset: 1, color: '#b4fe53' // 0% 处的颜色
						}, {
							offset: 0, color: '#07FA6F' // 100% 处的颜色
						}],
						globalCoord: false // 缺省为 false
						  }, 
						  width:4,
						  borderType: 'solid',
						  shadowColor: 'rgba(0, 0, 0, 0.5)',
						  shadowBlur:3,
						   shadowOffsetX: 0,
						  shadowOffsetY: 6,
	  
						  },
						  
						  },
		 
           data:[78.00, 98.00, 100.00, 89.06, 89.00, 90.00],
			 axisLabel: {
                formatter: '{value} %'
            },
			  
            //柱状样式
           
            //显示最大和最小值
           
            //显示平均值横线
           // markLine: {
                //data: [
                   // { type: 'average', name: '平均值' }
               // ]

           // }
        },
		
		 {
            name: '焊接2',
            type: 'line',
            smooth: true,
            smoothness:0.2,
			yAxisIndex: 1,
           itemStyle: {
					normal: {
					
					color: '#1a7dec',
					borderWidth: 1,
					
					
					},
			   },
			   lineStyle: {
				 normal: { 
				    color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [{
							offset: 1, color: '#1a7dec' // 0% 处的颜色
						}, {

							offset: 0, color: '#1a7dec' // 100% 处的颜色
						}],
						globalCoord: false // 缺省为 false
						  }, 
						  width:4,
						  borderType: 'solid',
						  shadowColor: 'rgba(0, 0, 0, 0.5)',
						  shadowBlur:3,
						   shadowOffsetX: 0,
						  shadowOffsetY: 6,
	  
						  },
						  
						  },
            data:[98.00, 68.00, 80.08, 94.06, 78.00, 80.00],
			 axisLabel: {
                formatter: '{value} %'
            },
			
     
            //柱状样式
           
          
        },
	       {
            name: '焊接3',
            type: 'line',
            smooth: true,
            smoothness:0.2,
			yAxisIndex: 1,
           itemStyle: {
					normal: {
					
					color: '#ffcc2f',
					borderWidth: 1,
					
					
					},
			   },
			   lineStyle: {
				 normal: { 
				    color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [{
							offset: 1, color: '#ffcc2f' // 0% 处的颜色
						}, {

							offset: 0, color: '#ffcc2f' // 100% 处的颜色
						}],
						globalCoord: false // 缺省为 false
						  }, 
						  width:4,
						  borderType: 'solid',
						  shadowColor: 'rgba(0, 0, 0, 0.5)',
						  shadowBlur:3,
						   shadowOffsetX: 0,
						  shadowOffsetY: 6,
	  
						  },
						  
						  },
            data:[68.00, 108.00, 50.08, 96.06, 68.00, 83.80],
			 axisLabel: {
                formatter: '{value} %'
            },
			
 
            //柱状样式
           
          
        },
			       {
            name: '焊接4',
            type: 'line',
            smooth: true,
            smoothness:0.2,
			yAxisIndex: 1,
           itemStyle: {
					normal: {
					
					color: '#cdd7dd',
					borderWidth: 1,
					
					
					},
			   },
			   lineStyle: {
				 normal: { 
				    color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [{
							offset: 1, color: '#cdd7dd' // 0% 处的颜色
						}, {

							offset: 0, color: '#cdd7dd' // 100% 处的颜色
						}],
						globalCoord: false // 缺省为 false
						  }, 
						  width:4,
						  borderType: 'solid',
						  shadowColor: 'rgba(0, 0, 0, 0.5)',
						  shadowBlur:3,
						   shadowOffsetX: 0,
						  shadowOffsetY: 6,
	  
						  },
						  
						  },
            data:[98.80, 78.08, 60.88, 106.06, 78.00, 103.80],
			 axisLabel: {
                formatter: '{value} %'
            },
			
   
            //柱状样式
           
          
        },
			 {
            name: '焊接5',
            type: 'line',
            smooth: true,
            smoothness:0.2,
			yAxisIndex: 1,
           itemStyle: {
					normal: {
					
					color: '#ff1811',
					borderWidth: 1,
					
					
					},
			   },
			   lineStyle: {
				 normal: { 
				    color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [{
							offset: 1, color: '#ff1811' // 0% 处的颜色
						}, {

							offset: 0, color: '#ff1811' // 100% 处的颜色
						}],
						globalCoord: false // 缺省为 false
						  }, 
						  width:4,
						  borderType: 'solid',
						  shadowColor: 'rgba(0, 0, 0, 0.5)',
						  shadowBlur:3,
						   shadowOffsetX: 0,
						  shadowOffsetY: 6,
	  
						  },
						  
						  },
            data:[112.80, 118.08, 90.88, 36.06, 68.00, 79.80],
			 axisLabel: {
                formatter: '{value} %'
            },
			
     
            //柱状样式
           
          
        },
		{
            name: '焊接6',
            type: 'line',
            smooth: true,
            smoothness:0.2,
			yAxisIndex: 1,
           itemStyle: {
					normal: {
					
					color: '#f96941',
					borderWidth: 1,
					
					
					},
			   },
			   lineStyle: {
				 normal: { 
				    color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [{
							offset: 1, color: '#f96941' // 0% 处的颜色
						}, {

							offset: 0, color: '#f96941' // 100% 处的颜色
						}],
						globalCoord: false // 缺省为 false
						  }, 
						  width:4,
						  borderType: 'solid',
						  shadowColor: 'rgba(0, 0, 0, 0.5)',
						  shadowBlur:3,
						   shadowOffsetX: 0,
						  shadowOffsetY: 6,
	  
						  },
						  
						  },
            data:[82.80, 98.08, 58.88, 58.06, 110.00, 112.80],
			 axisLabel: {
                formatter: '{value} %'
            },
			
           
            //柱状样式
           
          
        },

       
              
		
    ],

};
myChart5 = echarts.init(document.getElementById('main5'));
myChart5.setOption(option5);
 window.onresize = myChart5.resize; 
option6 = {
xAxis: [
        {
            type: 'category',
		    boundaryGap: false,
            data: ['X9','X7','X9E','X10','X12'],
            axisTick: {
                alignWithLabel: true,
            },
		
        axisLine: {
            show: true,
            onZero: true,
            lineStyle: {
                color: '#899098',
                width: 1,
                type: 'solid',
            },
        },
		
        }
    ],
    yAxis: [

       {
            type: 'value',
            min: 0.00,
            max: 100.00,
            interval:20.00,
            axisLabel: {
                formatter: '{value} %'
            },
			 axisLine: {
                show: true,
                onZero: true,
                lineStyle: {
                    color: '#899098',
                    width: 0,
                    
                },
            },
			 splitLine: {
				  show: true,
				  interval: 'auto',
				  lineStyle: {
				  color: ['#ccc'],
				  width: 1,
				  type: 'dashed',
				  
				  shadowOffsetX: 0,
				  shadowOffsetY: 0,
				  opacity:0.3,
				  },
				  },
        }
    ],
	  grid: {
		top:'18%',
        left: '2%',
        right: '4%',
        bottom: '6%',
        containLabel: true
    },
    series: [
        {
            name: '出货量',
            type: 'line',
            smooth: true,
            smoothness:0.2,
            itemStyle: { normal: { color: '#1883a4', areaStyle: { type: 'default', color: {
			type: 'linear',
			x: 0,
			y: 0,
			x2: 0,
			y2: 1,
			colorStops: [{
				offset: 0, color: '#135f76',// 0% 处的颜色
                }, {
				offset: 1, color: '#1883a4',// 100% 处的颜色
			}],
			globalCoord: false // 缺省为 false
		}
		 } } },
		 
            data: [88, 90, 78, 80, 60],
			
            label: {  //显示参数
                normal: {

                    show: true,
                    position: 'inside',
                    textStyle: {
                        color: '#05afe2',
                        fontStyle: 'normal',
                        fontWeight: 'normal',
                        fontSize: 12,
                    },
                },

            },
            //柱状样式
           
            //显示最大和最小值
           
            //显示平均值横线
           // markLine: {
                //data: [
                   // { type: 'average', name: '平均值' }
               // ]

           // }
        },
		        {
            name: '出货量',
            type: 'line',
            smooth: true,
            smoothness:0.2,
            itemStyle: { normal: { color: '#17fa83', areaStyle: { type: 'default', color: {
			type: 'linear',
			x: 0,
			y: 0,
			x2: 0,
			y2: 1,
			colorStops: [{
				offset: 0, color: '#11bf64',// 0% 处的颜色
                }, {
				offset: 1, color: 'rgba(20,119,67,0.3)',// 100% 处的颜色
			}],
			globalCoord: false // 缺省为 false
		}
		 } } },
		 
            data: [80, 80, 96, 70, 75],
            label: {  //显示参数
                normal: {

                    show: true,
                    position: 'inside',
                    textStyle: {
                        color: '#11ff83',
                        fontStyle: 'normal',
                        fontWeight: 'normal',
                        fontSize: 12,
                    },
                },

            },
            //柱状样式
           
            //显示最大和最小值
           
            //显示平均值横线
           // markLine: {
                //data: [
                   // { type: 'average', name: '平均值' }
               // ]

           // }
        }
    ]
};

myChart6 = echarts.init(document.getElementById('main6'));
myChart6.setOption(option6);
*/