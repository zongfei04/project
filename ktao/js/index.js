// 我的跨淘下拉列表的实现
;(function($){
	$('.dropdown').dropdown({js:true,mode:"slideDownUp",delay:200,eventName:'click'});
	$('.dropdown').on('dropdown-show dropdown-shown dropdown-hide dropdown-hiden',function(ev){
		console.log(ev.type)
	})
	$('button').on('click',function(ev){
		ev.stopPropagation();
		$('.nav-side .dropdown').dropdown('show')
	})
})(jQuery);