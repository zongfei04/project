;(function($){

	var cache = {
		data:{},
		acount:0,
		addData:function(key,val){
			this.data[key] = val;
			this.acount++;
		},
		getData:function(){
			return this.data[key]
		}
	}

	function Search($elem,options){
		//1罗列属性
		this.$elem = $elem;
		this.options = options;
		this.$searchBtn = $elem.find('.search-btn');
		this.$searchInput = $elem.find('.search-input');
		this.$searchForm = $elem.find('.search-form');
		this.$searchLayer = $elem.find('.search-layer');
		this.isLoadad = false;
		this.timer = 0;
		this.jqXHR = null;
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
			return $.trim(this.$searchInput.val());
		},
		autocomplete:function(){
			//1.对显示隐藏部分进行初始化
			this.$searchLayer.showHide(this.options)
			//2.监听输入框的oninput事件
			this.$searchInput.on('input',function(){

				if(this.options.getDataDelay){
					clearTimeout(this.timer);
					this.timer = setTimeout(function(){
						this.getData();
					}.bind(this),this.options.getDataDelay)
				}
				else{
					this.getData();
				}
				
			}.bind(this))
			//3.当点击其他部分时让其隐藏起来
			$(document).on('click',$.proxy(this.hideLayer,this))
			//4.当再次获取焦点是让其下拉列表显示
			this.$searchInput.on('focus',$.proxy(this.showLayer,this))
			//5.阻止获取焦点时的冒泡事件
			this.$searchInput.on('click',function(ev){
				ev.stopPropagation();
			})
			var _this = this;
			//6.利用事件委托的方法添加下拉内容
			this.$searchLayer.on('click','.search-item',function(){
				//1.获取具体元素的值
				var elem = $(this);
				var val = elem.html();
				//2.将值放入到输入框中
				_this.$searchInput.val(val);
				//3.触发表单的提交事件
				_this.$searchForm.submit();

			})
		},
		getData:function(){
			var inputVal = this.getValue()
			if(inputVal == ''){
				this.addHtml('');
				//如果输入框内容为空，则下拉列表不显示
				this.hideLayer();
				return;
			}
			if(this.jqXHR){
				jqXHR.abort();
			}
			//判断缓存中有没有值
			if(cache.data[inputVal]){
				this.$elem.trigger('getData',cache.data[inputVal]);
				return
			};
			console.log('发送请求')
			this.jqXHR = $.ajax({
				url:this.options.url+this.getValue(),
				dataType:'jsonp',
				jsonp:'callback'
			})
			.done(function(data){
				//1.将数据包装成html代码
				/*var html = '';
				for(var i = 0;i<data.result.length;i++){
					html+= '<li class="search-item">'+data.result[i][0]+'</li>'
				}

				//2.将html代码放到下拉列表中
				this.addHtml(html);
				//3.将下拉列表显示出来
				this.showLayer();*/
				this.$elem.trigger('getData',[data]);
				var inputVal = this.getValue();
				cache.addData(inputVal,data);
				console.log(cache)
			}.bind(this)).fail(function(err){
				/*this.addHtml('');
				this.hideLayer();*/
				this.$elem.trigger('gerErro',[data]);

			}.bind(this)).always(function(){
				this.jqXHR = null;

			}.bind(this))
		},
		hideLayer:function(){
			this.$searchLayer.showHide('hide');
		},
		addHtml:function(html){
			this.isLoadad = !!html;
			this.$searchLayer.html(html);
		},
		showLayer:function(){
			if(!this.isLoadad) return
				this.$searchLayer.showHide('show');

		}

	}
	Search.DEFAULS = {
		autocomplete:true,
		url:"https://suggest.taobao.com/sug?q=",
		js:true,
		mode:'slideDownUp',
		getDataDelay:200
	}
	$.fn.extend({
		search:function(options,html){
			return this.each(function(){
				var $elem = $(this);
				var search = $elem.data('search');
				if(!search){
					options = $elem.extend({},Search.DEFAULS,options)
					search = new Search($elem,options);
					$elem.data('search',search);
				}
				if(typeof search[options] == 'function'){
					search[options](html);
				}
				
			})
		}
	})
})(jQuery);