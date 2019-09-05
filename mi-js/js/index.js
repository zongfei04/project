
handleCart();
handleNavcontent();
handleCarousel()


//购物车交互功能
function handleCart(){
	//1、获取元素
	var oCart = document.querySelector('.top .cart');
	var oCartBox = document.querySelector('.top .cart a');
	var oCartContent = document.querySelector('.top .cart .cart-content');
	var oLoader = oCartContent.querySelector('.loader');
	var oSpan = oCartContent.querySelector('span');
	


	//2.绑定事件 
	oCart.onmouseenter = function(){
		oLoader.style.display = 'block';
		oCartBox.style.backgroundColor = '#fff';
		oCartBox.style.color = '#ff6700';
		//oCartContent.style.height = '100px';
		animation(oCartContent,{height:100},true,function(){
			oSpan.style.display = 'block';
			oLoader.style.display = 'none';
		});
		
	}
	oCart.onmouseleave = function(){
		oCartBox.style.backgroundColor = '#424242';
		oCartBox.style.color = '#b0b0b0';
		//oCartContent.style.height = '100px';
		animation(oCartContent,{height:0},true,function(){
			oSpan.style.display = 'none';
			oLoader.style.display = 'none';
		});
		
	}
}
//下拉手机菜单列表交互功能
function handleNavcontent(){
	//获取元素
	var aNavitem = document.querySelectorAll('.header .header-nav-item');
	var aNavContent = document.querySelector('.header .header-nav-content');
	console.log(aNavContent);

	for(var i = 0;i < aNavitem.length;i++){
		aNavitem[i].onmouseenter = function(){
			
		}
	}
}


//轮播图的交互功能
function handleCarousel(){
	new Carousel({
		id:'carousel',
		aImg:['images/carousel1.jpg','images/carousel2.jpg','images/carousel3.jpg'],
		width:1226,
		height:460,
		autoPlayTime:1000
	})

}
