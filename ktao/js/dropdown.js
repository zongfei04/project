;(function($){
	function Dropdown($elem,options){
		//1罗列属性
		this.$elem = $elem;
		this.options = options;
		this.$layer = $elem.find('.dropdown-layer')
		activeClass = $elem.data('active') + "-active";

		//2初识化
		this.init()

	}
	Dropdown.prototype = {
		constructor:Dropdown,
		init:function(){
			//实现下拉列表的功能
			//1初识化显示隐藏插件
			this.$layer.showHide(this.options);
			//2.绑定显示隐藏事件

			/*this.$elem.on('show shown hide hiden',function(ev){
				this.$elem.trigger('dropdown-'+ev.type);
			}.bind(this))*/
			//3绑定事件
			this.$elem.hover($.proxy(this.show,this),$.proxy(this.hide,this));

		},
		show:function(){
			this.$elem.addClass(activeClass);
			this.$layer.showHide('show')
		},
		hide:function(){
			this.$elem.removeClass(activeClass);
			this.$layer.showHide('hide')
		}
	}
	$.fn.extend({
		dropdown:function(options){
			return this.each(function(){
				var $elem = $(this);
				new Dropdown($elem,options);
			})
		}
	})
})(jQuery);