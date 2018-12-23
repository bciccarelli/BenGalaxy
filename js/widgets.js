//document.getElementsByTagName('contentRight')[0].style.top=100-document.getElementsByTagName('contentRight')[0].clientHeight+"px";
function aboutBar() {
	if(document.getElementsByTagName('contentRight')[0].style.top=="0px"){
		document.getElementsByTagName('contentRight')[0].style.top=100-document.getElementsByTagName('contentRight')[0].clientHeight+"px";
	} else {
		document.getElementsByTagName('contentRight')[0].style.top="0";
	}
}