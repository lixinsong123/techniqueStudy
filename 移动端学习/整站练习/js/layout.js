function getRem(){
	return document.documentElement.getBoundingClientRect().width;
}
//阻止pc和浏览器默认行为。
function stop(){
	document.addEventListener('touchstart',function(ev){
			ev.preventDefault();
	});
}