;(function($){
	function init($elem,hidenCb){
		if($elem.is(":hidden")){
				$elem.data('status','hiden');
				typeof hidenCb == 'function' && hidenCb()
		}
		else{
			$elem.data('status','shown')
		}
	}
	function show($elem,cb){
		if($elem.data('status') == 'shown') return;
		if($elem.data('status') == 'show') return;
		$elem.data('status','show').trigger('show');
		cb();
	}
	function hide($elem,cb){
		if($elem.data('status') == 'hiden') return;
		if($elem.data('status') == 'hide') return;
		$elem.data('status','hide').trigger('hide');
		cb();
	}
	
	var slient = {
		init:init,
		show:function($elem){
			show($elem,function(){
				$elem.show();
				$elem.trigger('shown').data('status','shown')
			})
		},
		hide:function($elem){
			hide($elem,function(){
				$elem.hide()
				$elem.trigger('hiden').data('status','hiden')
			})
		}
	}
	
	var js = {
		fade:{
			init:function($elem){
				js._init($elem)
			},
			show:function($elem){
				js._show($elem,'fadeIn')
			},
			hide:function($elem){
				js._hide($elem,'fadeOut')

			}
		},
		slideDownUp:{
			init:function($elem){
			 js._init($elem)
			},
			show:function($elem){
				js._show($elem,'slideDown')
			},
			hide:function($elem){
				js._hide($elem,'slideUp')

			}
		},
		slideLeftRight:{
			init:function($elem){
				
				js.customInit($elem,{
						borderLeftWidth:0,
						paddingLeft:0,
						width:0,
						paddingRight:0,
						borderRightWidth:0,
				})

			},
			show:function($elem){
				js.customShow($elem)
			},
			hide:function($elem){
				js.customHide($elem,{
					borderLeftWidth:0,
					paddingLeft:0,
					width:0,
					paddingRight:0,
					borderRightWidth:0,
				})
			}
		},
		fadeSlideLeftRight:{
			init:function($elem){
				js.customInit($elem,{
						borderLeftWidth:0,
						paddingLeft:0,
						width:0,
						paddingRight:0,
						borderRightWidth:0,
						opacity:0
				})
			},
			show:function($elem){
				js.customShow($elem);
			},
			hide:function($elem){
				/*
				hide($elem,function(){
					$elem.stop();
					$elem.animate({
						borderLeftWidth:0,
						paddingLeft:0,
						width:0,
						paddingRight:0,
						borderRightWidth:0,
						opacity:0
					},function(){
						$elem.hide();//把diaplay有block变成none
						$elem.trigger('hiden').data('status','hiden');
					})
				})*/
				js.customHide($elem,{
					borderLeftWidth:0,
					paddingLeft:0,
					width:0,
					paddingRight:0,
					borderRightWidth:0,
					opacity:0
				})
			}
		}

	}
	js._init = function($elem){
		$elem.removeClass('transition')
		init($elem);
	}
	js._show = function($elem,mode){
		show($elem,function(){
			$elem.stop();
			$elem[mode]();
			$elem.trigger('shown').data('status','shown');
		})
	}
	js._hide = function($elem,mode){
		hide($elem,function(){
			$elem.stop();
			$elem[mode]();
			$elem.trigger('hiden').data('status','hiden');
		})
	}

	js.customInit = function($elem,options){
		$elem.removeClass('transition')
			//1.存值，把隐藏之前的状态（水平方向的值存起来）
			//borderLeftWidth,paddingLeft,width,paddingRight,borderRightWidth
			var styles = {}
			for(key in options){
				styles[key] = $elem.css(key);
			}
			$elem.data('styles',styles);
			//如果是隐藏的话
			init($elem,function(){
				$elem.css(options)
				
			})
	}
	js.customShow = function($elem){
		show($elem,function(){
			 $elem.show();//把display有none变成block
			$elem.stop();
			 $elem.animate($elem.data('styles'),function(){
			 	$elem.trigger('shown').data('status','shown')
			 })

		})
	}
	js.customHide = function($elem,options){
		hide($elem,function(){
			$elem.stop();
			$elem.animate(options,function(){
				$elem.hide();//把diaplay有block变成none
				$elem.trigger('hiden').data('status','hiden');
			})
		})
	}

	function getShowHide($elem,options){
		var showHideFn = slient;
		if(options.js){
			showHideFn = js[options.mode]
		}
		showHideFn.init($elem)
		return{
			show:showHideFn.show,
			hide:showHideFn.hide
		}
	}
	var DAFAULTS = {
		js:true,
		mode:'fade'
	}


	//注册插件
	$.fn.extend({
		showHide:function(options){
			this.each(function(){
				var $elem = $(this);
				var showHideObj = $elem.data('showHideObj')
				if(!$elem.data('showHideObj')){
					options = $.extend({},DAFAULTS,options)
					 showHideObj = getShowHide($elem,options);
					 $elem.data('showHideObj',showHideObj)
				}
				if(typeof showHideObj[options] == 'function'){
					showHideObj[options]($elem)
				}
				
			})
			
		}
	})
})(jQuery)