// 我的跨淘下拉列表的实现
;(function($){
	var $dropdown = $('.nav-side .dropdown');
	$dropdown.dropdown({js:true,mode:"slideDownUp",delay:200});
	$dropdown.on('dropdown-show',function(ev){
		var $elem = $(this)
		var JSONurl = $elem.data('url');
		if(!JSONurl) return;
		if($elem.data('isLoaded')) return;
			$.getJSON(JSONurl,function(data){
				$elem.data('isLoaded',true)
				var html = ''
				for(var i = 0;i<data.length;i++){
					html+='<li class="menu-item"><a href="'+data[i].url+'">'+data[i].name+'</a></li>'
				}
				//模仿数据加载
				setTimeout(function(){
					$dropdown.find('.dropdown-layer').html(html)
				},1000)
				
			})
		
	})
	/*处理点击事件
	$('button').on('click',function(ev){
		ev.stopPropagation();
		$('.nav-side .dropdown').dropdown('show')
	})*/
})(jQuery);