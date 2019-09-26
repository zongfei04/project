;(function($){
	function Dropdown($elem,options){
		//1罗列属性
		this.$elem = $elem;
		this.options = options;
		this.$layer = $elem.find('.dropdown-layer')
		activeClass = $elem.data('active') + "-active";
		this.Timer = 0;

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

			this.$elem.on('show shown hide hiden',function(ev){
				this.$elem.trigger('dropdown-'+ev.type);
			}.bind(this))
			//3绑定事件
			if(this.options.eventName == 'click'){
				this.$elem.on('click',function(ev){
					ev.stopPropagation();
					this.show();
				}.bind(this));
				$(document).on('click',$.proxy(this.hide,this))
			}
			else{
				this.$elem.hover($.proxy(this.show,this),$.proxy(this.hide,this));
			}
			

		},
		show:function(){
			if(this.options.delay){
				this.timer = setTimeout(function(){
					this.$elem.addClass(activeClass);
					this.$layer.showHide('show')
				}.bind(this),this.options.delay)
			}
			else{
				this.$elem.addClass(activeClass);
				this.$layer.showHide('show')
			}
			

		},
		hide:function(){
			clearTimeout(this.timer)
			this.$elem.removeClass(activeClass);
			this.$layer.showHide('hide')
		}
	}
	Dropdown.DEFAULS = {
		js:true,
		mode:'slideDownUp',
		delay:''
	}
	$.fn.extend({
		dropdown:function(options){
			return this.each(function(){
				var $elem = $(this);
				var dropdown = $elem.data('dropdown');
				if(!dropdown){
					options = $elem.extend({},Dropdown.DEFAULS,options)
					dropdown = new Dropdown($elem,options);
					$elem.data('dropdown',dropdown);
				}
				if(typeof dropdown[options] == 'function'){
					dropdown[options]();
				}
				
			})
		}
	})
})(jQuery);