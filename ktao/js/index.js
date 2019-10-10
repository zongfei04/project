// 我的跨淘下拉列表的实现
;(function($){
	function handleDropDown(){
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
	}
	handleDropDown();
	function handleSearch(){
		$('.search').search();
		$('.search').on('getData',function(ev,data){
			//1.将数据包装成html代码
				var html = addLayerHtml(data,10)

				//2.将html代码放到下拉列表中
				//this.addHtml(html);
				$('.search').search('addHtml',html);
				//3.将下拉列表显示出来
				//this.showLayer();
				$('.search').search('showLayer');
		})
		$('.search').on('getErro',function(){
			$('.search').search('addHtml');
			$('.search').search('hideLayer');
		})
		function addLayerHtml(data,isNum){
			var html = '';
			for(var i = 0;i<data.result.length;i++){
				if(i>=isNum) break;
				html+= '<li class="search-item">'+data.result[i][0]+'</li>'
			}
			return html
		}
	}
	handleSearch();
	
})(jQuery);