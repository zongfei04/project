
;(function($){
	//只加载一次html共通
	function loadHtmlOnce($elem,cb){
		var $layer = $elem.find('.dropdown-layer');
		var JSONurl = $elem.data('url');
		if(!JSONurl) return;
		if($elem.data('isLoaded')) return;
			$.getJSON(JSONurl,function(data){
				$elem.data('isLoaded',true)
				/*
				var html = ''
				for(var i = 0;i<data.length;i++){
					html+='<li class="menu-item"><a href="'+data[i].url+'">'+data[i].name+'</a></li>'
				}
				//模仿数据加载
				setTimeout(function(){
					$layer.html(html)
				},1000)*/
				typeof cb == 'function' && cb(data,$layer)
			})
	}
	//头部下拉列表区域
	function handleDropDown(){
		var $dropdown = $('.nav-side .dropdown');
		$dropdown.dropdown({js:true,mode:"slideDownUp",delay:200});
		$dropdown.on('dropdown-show',function(ev){
			loadHtmlOnce($(this),createMenuHtml)
			function createMenuHtml(data,$layer){
				var html = ''
				for(var i = 0;i<data.length;i++){
					html+='<li class="menu-item"><a href="'+data[i].url+'">'+data[i].name+'</a></li>'
				}
				//模仿数据加载
				setTimeout(function(){
					$layer.html(html)
				},1000)
			}
			/*var $elem = $(this)
			var $layer = $elem.find('.dropdown-layer');
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
						$layer.html(html)
					},1000)
					
				})*/

			
		})
		/*处理点击事件
		$('button').on('click',function(ev){
			ev.stopPropagation();
			$('.nav-side .dropdown').dropdown('show')
		})*/
	}
	handleDropDown();
	//头部搜索区域
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
	//焦点图左侧部分区域
	function handleCategory(){
		var $dropdown = $('.category .dropdown');
		$dropdown.dropdown({js:true,mode:"slideDownUp",delay:200});
		$dropdown.on('dropdown-show',function(ev){
			/*var $elem = $(this)
			var $layer = $elem.find('.dropdown-layer')
			var JSONurl = $elem.data('url');
			if(!JSONurl) return;
			if($elem.data('isLoaded')) return;
				$.getJSON(JSONurl,function(data){
					$elem.data('isLoaded',true)
					var html = ''

					
					<dl class="category-details">
								<dt class="category-details-title fl">
									<a href="#" class="category-details-title-link">电视</a>
								</dt>
								<dd class="category-details-item fl">
									<a href="#" class="link">曲面电视</a>
									<a href="#" class="link">超薄电视</a>
								</dd>
							</dl>
					
					
					for(var i = 0;i<data.length;i++){
						html+= '<dl class="category-details"><dt class="category-details-title fl"><a href="#" class="category-details-title-link">'+data[i].title+'</a></dt><dd class="category-details-item fl">'
						for(var j = 0;j<data[i].items.length;j++){
							html+= '<a href="#" class="link">'+data[i].items[j]+'</a>'
						}
						html+='</dd></dl>'
					}
					
					
					//模仿数据加载
					setTimeout(function(){
						$layer.html(html)
					},1000)
					
				})*/
				loadHtmlOnce($(this),createCategoryHtml)
			function createCategoryHtml(data,$layer){
				var html = ''
				for(var i = 0;i<data.length;i++){
						html+= '<dl class="category-details"><dt class="category-details-title fl"><a href="#" class="category-details-title-link">'+data[i].title+'</a></dt><dd class="category-details-item fl">'
						for(var j = 0;j<data[i].items.length;j++){
							html+= '<a href="#" class="link">'+data[i].items[j]+'</a>'
						}
						html+='</dd></dl>'
				}
				//模仿数据加载
				setTimeout(function(){
					$layer.html(html)
				},1000)
			}
			
		})
	}
	handleCategory();
})(jQuery);