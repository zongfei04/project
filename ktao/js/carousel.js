;(function($){
	function Carousel($elem,options){
		//1罗列属性
		this.$elem = $elem;
		this.options = options;
		this.now = this.options.showindex;
		this.$carouselItem = this.$elem.find('.carousel-item');
		this.$btnItem = this.$elem.find('.btn-item');
		this.$control = this.$elem.find('.control');
		

		//2初识化
		this.init()

	}
	Carousel.prototype = {
		constructor:Carousel,
		init:function(){
			if(this.options.slide){//执行卷入卷出

			}
			else{//执行划入划出
				//将所有图片隐藏
				this.$elem.addClass('fade')
				//默认显示				
				this.$carouselItem.eq(this.now).show();
				this.$btnItem.eq(this.now).addClass('active');
				//将显示隐藏初始化
				this.$carouselItem.showHide({js:true,mode:"fade"});
				//将左右按钮显示(监听事件)
				this.$elem.hover(function(){
					this.$control.show();
				}.bind(this),function(){
					this.$control.hide();
				}.bind(this))
				.on('click','.control-left',function(){
					this._fade(this.now - 1);
				}.bind(this))
				.on('click','.control-right',function(){
					this._fade(this.now + 1);

				}.bind(this))
				
			}
		},
		_fade:function(index){
			//将当前显示的隐藏
			this.$carouselItem.eq(this.now).showHide('hide');
			this.$btnItem.eq(this.now).removeClass('active');
			//让即将显示的出现
			this.$carouselItem.eq(index).showHide('show');
			this.$btnItem.eq(index).addClass('active');
			//把index的值赋给this.now
			this.now = index;

		}
		
	}
	Carousel.DEFAULS = {
		slide:false,
		showindex:0
	}
	$.fn.extend({
		carousel:function(options){
			return this.each(function(){
				var $elem = $(this);
				var carousel = $elem.data('carousel');
				if(!carousel){
					options = $elem.extend({},Carousel.DEFAULS,options)
					carousel = new Carousel($elem,options);
					$elem.data('carousel',carousel);
				}
				if(typeof carousel[options] == 'function'){
					carousel[options]();
				}
				
			})
		}
	})
})(jQuery);