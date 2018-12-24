var currentPage=0;
var maxPage=3;
var auto = false;
function pageSwitch(num) {
	console.log(num)
	currentPage=num;
	if(currentPage<1){
		document.getElementById("switchLeft").disabled=true;
	} else {

		document.getElementById("switchLeft").disabled=false;
	}
	if(currentPage>maxPage-1){
		document.getElementById("switchRight").disabled=true;
	} else {

		document.getElementById("switchRight").disabled=false;
	}
	window.scrollTo(screen.width*num,0);
	setTimeout(function(){auto=false},2000) 
}
function right(){
	if(currentPage<maxPage){
		auto = true;
		pageSwitch(currentPage+1)	
	}
}
function left(){
	if(currentPage>0){
		auto = true;
		pageSwitch(currentPage-1)
	}
}

window.addEventListener("keydown", function(e){
	if(e.keyCode==37){left();e.preventDefault();}
	if(e.keyCode==39){right();e.preventDefault();}
})

var n;
setInterval(function(){
	if(!auto){
		pageSwitch(Math.round(window.scrollX/screen.width))
	}},1000);
window.onscroll = function(){
	var d = new Date();
	n = d.getTime();
	setTimeout(function(){
		var d = new Date();
		if(d.getTime()-n>180){
			console.log("here")
			if(!auto){
				pageSwitch(Math.round(window.scrollX/screen.width))
			}
		}
	},200)
};