function detectOrientation() {
	if(window.innerWidth<window.innerHeight) {
		for (i=0;i<document.getElementsByClassName("project").length;i++) {
			document.getElementsByClassName("project")[i].style.height = window.innerHeight/6+"px";
			document.getElementsByClassName("project")[i].style.width = "48%"
		} 
	} else {
		for (i=0;i<document.getElementsByClassName("project").length;i++) {
			document.getElementsByClassName("project")[i].style.height = 100+"px";
			document.getElementsByClassName("project")[i].style.width = "15%";
		} 
	}
}
setTimeout(function() {
	os = getOS();
	if(os<2) {
		document.getElementById("vidSrc").src="";
		document.getElementById("output").innerText="done.";
	}
	detectOrientation();
},10);

function getOS() {
  var userAgent = window.navigator.userAgent,
  platform = window.navigator.platform,
  macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
  windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
  iosPlatforms = ['iPhone', 'iPad', 'iPod'],
  os = null;

  if (macosPlatforms.indexOf(platform) > -1) {
    os = 'Mac OS';
  } else if (iosPlatforms.indexOf(platform) > -1) {
    os = 0;
  } else if (windowsPlatforms.indexOf(platform) > -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 1;
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }

  return os;
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