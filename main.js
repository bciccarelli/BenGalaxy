
function detectOrientation() {
	if(window.innerWidth<window.innerHeight) {
		console.log("less");
		for (i=0;i<document.getElementsByClassName("project").length;i++) {
			document.getElementsByClassName("project")[i].style.height = window.innerHeight/6+"px";
			document.getElementsByClassName("project")[i].style.width = "48%"
		} 
	} else {
		for (i=0;i<document.getElementsByClassName("project").length;i++) {
 			document.getElementById("issVid").style.display="block";
			document.getElementsByClassName("project")[i].style.height = 100+"px";
		} 
	}
}
function toggleMute() {

  var video=document.getElementById("issVid");

  if(video.muted){
  	document.getElementById("volume").innerText = "Mute";
    video.muted = false;
  } else {
  	document.getElementById("volume").innerText = "Unmute";
    video.muted = true;

  }


}