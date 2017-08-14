//封装一个代替getElementById()的方法
function byId(id){
	return typeof(id) ==="string"?document.getElementById(id):id;
}

//声明全局变量
var index = 0,
	timer = null,
	pics = byId("banner").getElementsByTagName("div");
	dots = byId("dots").getElementsByTagName("span");
	prev = byId("prev")
	next =byId("next")
	len = pics.length;

function slideImg(){
	var main = byId("main");
	//滑过清除定时器，离开继续
	main.onmouseover = function(){
		//滑过清除计时器
		if(timer) clearInterval(timer);
	}

	main.onmouseout = function(){
		timer = setInterval(function(){
			index++; //len = 3 0 1 2
			if(index >= len){
				index = 0;
			}
			//切换图片
			changeImg();
			console.log(index);
		},3000)
	}
	//自动在main上触发鼠标离开的事件
	main.onmouseout();
	//遍历所有点击，且绑定点击事件，点击圆点切换图片
	for(var d=0;d<len;d++){
		//给所有span添加一个id属性，值为d作为当前span的索引
		dots[d].id=d;
		dots[d].onclick = function(){
			//改变index为当前span的id值
			index = this.id;
			this.className="active";
			//调用changeImg,实现切换图片
			changeImg();
		}
	}
	//下一张
	next.onclick = function(){
		index++;
		if(index>=len) index=0;
		changeImg();
	}
	//上一张
	prev.onclick = function(){
		index--;
		if (index<0) index=len-1;
		changeImg();
	}

}

function changeImg(){
	//不能用className，因为className会重写标签上所有的类
	//遍历banner下所有的div及dits下所有的span,将div隐藏，将所有的span清除类。
	for(var i=0;i<len;i++){
		pics[i].style.display='none';
		dots[i].className="";
	}
	//根据index索引找到当前div和当前span，将其显示出来和设为当前。
	pics[index].style.display='block';
	dots[index].className='active';
}


//一进去就执行
slideImg();