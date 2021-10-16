var daterange = {
		/**
		 * 时间段公共函数
		 * @param that 触发对象
		 * @param opens 显示位置（left, right, center）
		 * @param isRanges 是否显示快捷键
		 * @param format 日期显示格式（默认：YYYY-MM-DD）
		 * @param showDropdowns 是否下拉选择日期
		 */
		dateRange: function(that, opens, isRanges, format, showDropdowns) {
			var ranges = {
					'今日' : [ moment().startOf('day'), moment() ],
					'昨日' : [moment().subtract('days', 1).startOf('day'),moment().subtract('days', 1).endOf('day') ],
					'最近7日' : [ moment().subtract('days', 6),moment() ],
					'最近30日' : [ moment().subtract('days', 29),moment() ]
				};
			if (opens == null || opens == 'undefined')
				opens = 'right';
			if (!isRanges) {
				ranges = undefined;
			}
			if (format == null || format == 'undefined')
				format = 'YYYY-MM-DD';
			that.daterangepicker({
				maxDate : moment(), // 最大时间
				/*
				 * dateLimit : { days : 30 }, //起止时间的最大间隔
				 */
				opens : "right",
				showDropdowns : (showDropdowns == undefined || showDropdowns == null) ? false : true,
				buttonClasses : [ 'btn btn-info' ],
				applyClass : 'btn-small blue',
				cancelClass : 'btn-small',
				separator : ' - ',
				ranges : ranges,
				locale : {
					format : format,
					separator : ' - ',
					applyLabel : '确定',
					cancelLabel : '取消',
					fromLabel : '起始日期',
					toLabel : '结束日期',
					customRangeLabel : '自定义',
					daysOfWeek : [ '日', '一', '二', '三', '四', '五','六' ],
					monthNames : [ '一月', '二月', '三月', '四月', '五月','六月', '七月', '八月', '九月', '十月', '十一月','十二月' ],
					firstDay : 1
				}
			},
			function(start, end, label) {
				console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
			});
		}
}