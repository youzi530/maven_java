/*!
 * 非模态层，可拖拽
 * wangbt
 */
;(function($) {
	'usr strict';

	var sprintf = function(str) {
		var args = arguments,
			flag = true,
			i = 1;

		str = str.replace(/%s/g, function() {
			var arg = args[i++];

			if (typeof arg === 'undefined') {
				flag = false;
				return '';
			}
			return arg;
		});
		return flag ? str : '';
	};

	/*****NoModel Begin****/
	var NoModel = function(element, options) {
		this.$content = $(options["content"]);
		this.$content_ = this.$content.clone();
		this.$option = options;

		this.init();
	};

	NoModel.DEFAULTS = {
		id: "noModel",
		zIndex: 1024,
		title: "",
		content: "",
		width: 500,
		height: 400,
		isDragable: true,
		isHideBut: false,
		isDisabled: false,
		singleButtons: [{
			id: "closeBtnId",
			name: "关闭",
			order: 1,
			halign: "right",
			isDisabled: false,
			params: 'undefined',
			callback: function(btnObj) {
				return true;
			}
		}, {
			id: "surceBtnId",
			name: "确定",
			order: 2,
			halign: "right",
			isDisabled: false,
			params: 'undefined',
			callback: function(btnObj) {
				return true;
			}
		}]

	};

	NoModel.prototype.init = function() {
		this.initModelTitle();
		this.initModelContent();
		var $that = this;
		this.initModelFooter();
		
		this.initModel();
	};

	NoModel.prototype.initModelTitle = function() {
		var w = this.$option.width - 50;
		this.$titleObj = $([
			'<div class="model-title">',
				'<div class="title-text" style="width: ' + w + 'px;">' + this.$option.title + '</div>',
				'<div class="title-close"><button title="关闭">X</button></div>',
			'</div>'
		].join(''));
	};

	NoModel.prototype.initModelContent = function() {
		var heightCss = "";
		if(!this.$option.isHideBut) {
			heightCss = "height: " + Number(this.$option.height - 100) + "px;"
		} else {
			heightCss = "height: " + Number(this.$option.height - 55) + "px;"
		}
		var style = sprintf("style='%s'", heightCss);
		this.$contentObj = $([
			'<div class="model-content" ' + style + '>',
				'<div class="content-body">',
				'</div>',
			'</div>'
		].join(''));
		this.$content.appendTo(this.$contentObj.find(".content-body"));
	};

	NoModel.prototype.initModelFooter = function() {
		var $that = this;
		this.$footerObj = $(['<div class="model-footer">', '</div>'].join(''));
		/*this.$footerObj.css({"height": "50px"});*/
		var $source = $('<div></div>');
		var btns = $that.$option.singleButtons;
		if (btns instanceof Array && btns.length > 0) {
			btns.sort(function(obj1, obj2) {
				var order1 = typeof obj1['order'] == 'undefined' ? 0 : obj1['order'];
				var order2 = typeof obj2['order'] == 'undefined' ? 0 : obj2['order'];
				if (order1 < order2) {
					return -1;
				} else if (order1 > order2) {
					return 1;
				}
				return 0;
				//等同上面效果
				//return obj1['order'] - obj2['order'];
			});
			$.each(btns, function(k, v) {
				var $btn = $('<button type="button"></button>');
				$btn.attr("id", $that.$option.id + '_' + v['id']);
				$btn.text(v['name']);
				$btn.addClass('btn btn-info');
				if (v['halign'] != 'undefined'){
					$btn.css({
						"float": v['halign'],
						"margin-top": "5px",
						"margin-right": "10px"
					});
				}
				$btn.attr("disabled", v['isDisabled']);
				$btn.click("click", function() {
					var isHand = true;
					if (v["callback"]) {
						isHand = v.callback(v.params);
					}
					if (isHand) {
						$that.$model.remove();
					}
				});

				$btn.appendTo($source)
			});
		}
		$source.appendTo(this.$footerObj);
	};

	NoModel.prototype.initModel = function() {
		var $that = this;
		var marginLeft = -(this.$option.width / 2),
			marginTop = -(this.$option.height / 2);
		this.$model = null;
		if($(window.document).find("#" + this.$option.id).length <= 0){
			this.$model = $("<div class='no-model' no-model='nomodel'></div>");
			this.$model.attr("id", this.$option.id);
			this.$model.css({
				'margin-left': marginLeft + 'px',
				"margin-top": marginTop + "px",
				"width": $that.$option.width,
				"height": $that.$option.height,
				"position": "fixed"
			});
		}else{
			this.$model = $("#"+this.$option.id);
		}
		
		this.$model.html("");

		this.$titleObj.appendTo(this.$model);
		this.$contentObj.appendTo(this.$model);
		if(!this.$option.isHideBut) {
			this.$footerObj.appendTo(this.$model);
		}
		this.$model.appendTo($("body"));//isDragable
		this.$model.fadeIn(1000);
		
		if(this.$option.isDragable) {
			this.$model.draggable({
				handle: ".model-title, .model-footer",
				containment: "html",
				scroll: false,
				cursor: "move"
			});
		}
		this.$contentObj.find(".content-body").mCustomScrollbar({
			theme: "minimal-dark"
		});
		this.$titleObj.find(".title-close button").off("click").on("click", function(){
			$that.$model.remove();
		});
	};
	
	NoModel.prototype.showModel = function(){
		
	};
	
	NoModel.prototype.hiddenModel = function(){
		
	};
	
	NoModel.prototype.closeModel = function(modelId){
		return $("#" + modelId).remove();
	};

	/***NoModel End***/
	
	var allMethods = ['showModel','hiddenModel', 'closeModel'];

	$.fn.noModel = function(option, _query){
		var value;
		this.each(function(){
			var $this = $(this),
				data = $this.data('no.model'),
				options = $.extend({}, NoModel.DEFAULTS, typeof option == "object" && option);
			if(typeof option == "string"){
				if($.isArray(option, allMethods) < 0){
					throw new Error("Unknown method: " + option);
				}
				
				if(!data) return;
				
				value = data[option](_query);
				if(option == 'destroy'){
					$this.removeData("no.model");
				}
			}
			if(typeof option != 'string') {
				$this.data("no.model", new NoModel(this, options));
			}
		});
		return typeof value === 'undefined' ? this : value;
	};
	
	$.fn.noModel.Constructor = NoModel;
	$.fn.noModel.defaults = NoModel.DEFAULTS;
	$.fn.noModel.methods = allMethods;
	
	
	jQuery.extend({
		noModel: function(option, _query){
			$(window).noModel(option, _query);
		}
	});
	
	$(function(){
		$("[no-model='nomodel']").noModel();
	});
})(jQuery);