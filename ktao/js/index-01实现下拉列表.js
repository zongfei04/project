// 我的跨淘下拉列表的实现
;(function($){
	$('.dropdown').hover(function(){
		var activeClass = $('.dropdown').data('active') + "-active";
		$('.dropdown').addClass(activeClass);
		$('.dropdown-layer').show();
	},function(){
		var activeClass = $('.dropdown').data('active') + "-active";
		$('.dropdown').removeClass(activeClass);
		$('.dropdown-layer').hide();
	})
})(jQuery);