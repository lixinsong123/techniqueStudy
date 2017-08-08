window.onload= function(){
	var bar_parent = getObject("bar_link");
	cosole.log(bar_parent);
}

function getObject(id){
	return  document.getElementById(id);
}