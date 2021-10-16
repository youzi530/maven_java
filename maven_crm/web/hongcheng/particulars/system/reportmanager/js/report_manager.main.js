$(document).ready(function() {
	// 初始化柱状图表标签
	crmajax.ajax({
		url:"client.report",
		type:"post",
		data:{

		},
		success:function (data) {
			data  = data.substr(3,data.length);
			if (data != "暂无数据"){
				var myChart1 = echarts.init(document.getElementById('histogram'));
				var clientReport = JSON.parse(data);
				var result = [];
				for (var i = 0; i < clientReport.length; i++) {
					result.push({rank:clientReport[i].rank,num:clientReport[i].num});
				}

				var names = [];
				var values = [];
				for (var i = 0; i < result.length; i++) {
					switch (result[i].rank) {
						case 1:
							names[i] = '潜在客户';
							values[i] = result[i].num;
							break;
						case 2:
							names[i] = '合作伙伴';
							values[i] = result[i].num;
							break;
						case 3:
							names[i] = '忠实客户';
							values[i] = result[i].num;
							break;
						case 4:
							names[i] = '代理商';
							values[i] = result[i].num;
							break;
						case 5:
							names[i] = '战略合作';
							values[i] = result[i].num;
							break;
					}
				}

				var options = {
					// 定义一个标题
					title : {
						text : '客户信息'
					},
					legend : {
						data : [ '客户' ]
					},
					// X轴设置
					xAxis : {
						data : names
					},
					yAxis : {},
					// name=legend.data的时候才能显示图例
					series : [ {
						name : '客户',
						type : 'bar',
						data : values
					} ]

				};
				myChart1.setOption(options);

				// 初始化饼状图表标签
				var myChart2 = echarts.init(document.getElementById('pie'));
				var option = {
					title : {
						text : '客户级别统计',
						subtext : '',
						x : 'center'
					},
					tooltip : {
						trigger : 'item',
						formatter : "{a} <br/>{b} : {c} ({d}%)"
					},
					legend : {
						orient : 'vertical',
						x : 'left',
					},
					toolbox : {
						show : true,
						feature : {
							mark : true,
							dataView : {
								readOnly : false
							},
							restore : true,
							saveAsImage : true
						}
					},
					calculable : true,
					series : [ {
						name : '访问来源',
						type : 'pie',
						radius : '55%',
						center : [ '50%', 225 ],
						data : [ {
							value : values[0],
							name : names[0]
						}, {
							value : values[1],
							name : names[1]
						}, {
							value : values[2],
							name : names[2]
						}, {
							value : values[3],
							name : names[3]
						}, {
							value : values[4],
							name : names[4]
						} ]
					} ]
				};
				myChart2.setOption(option);
			}else {
				sweetAlert.caution("温馨提示",data);
			}
		},
		error:function (data) {

		}
	})





	

});