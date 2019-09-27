;(function($){
	function Search($elem,options){
		//1罗列属性
		this.$elem = $elem;
		this.options = options;
		this.$searchBtn = $elem.find('.search-btn');
		this.$searchInput = $elem.find('.search-input');
		this.$searchForm = $elem.find('.search-form');


		//2初识化
		this.init();
		if(this.options.autocomplete){
			this.autocomplete();
		}

	}
	Search.prototype = {
		constructor:Search,
		init:function(){
			this.$searchBtn.on('click',$.proxy(this.submit,this))
		},
		submit:function(){
			var val = this.getValue();
			if(val == ''){
				return false;
			}
			this.$searchForm.trigger('submit')
		},
		getValue:function(){
			return this.$searchInput.val();
		},
		autocomplete:function(){
			//监听输入框的事件
			this.$searchInput.on('input',$.proxy(this.getData,this))	
		},
		getData:function(){
			$.ajax({
			url:this.options.url+this.getValue(),
			dataType:'jsonp',
			jsonp:'callback'
			}).done(function(data){
				//
			}).fail(function(err){
				console.log(err)
			})
		}

	}
	Search.DEFAULS = {
		autocomplete:true,
		url:"https://suggest.taobao.com/sug?q="
	}
	$.fn.extend({
		search:function(options){
			return this.each(function(){
				var $elem = $(this);
				var search = $elem.data('search');
				if(!search){
					options = $elem.extend({},Search.DEFAULS,options)
					search = new Search($elem,options);
					$elem.data('search',search);
				}
				if(typeof search[options] == 'function'){
					search[options]();
				}
				
			})
		}
	})
})(jQuery);