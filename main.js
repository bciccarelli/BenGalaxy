var acceptsCookies;

function detectOrientation() {
	if(window.innerWidth<window.innerHeight) {
		for (i=0;i<document.getElementsByClassName("project").length;i++) {
      document.getElementsByClassName("project")[i].style.height = window.innerHeight/6+"px";
      document.getElementsByClassName("project")[i].style.width = "48%"
    }
    for (i=0;i<document.getElementsByClassName("project2").length;i++) {
      document.getElementsByClassName("project2")[i].style.height = window.innerHeight/6+"px";
      document.getElementsByClassName("project2")[i].style.width = "48%"
    } 
	} else {
		for (i=0;i<document.getElementsByClassName("project").length;i++) {
			document.getElementsByClassName("project")[i].style.height = 100+"px";
			document.getElementsByClassName("project")[i].style.width = "16%";
		}
    for (i=0;i<document.getElementsByClassName("project2").length;i++) {
      document.getElementsByClassName("project2")[i].style.height = 100+"px";
      document.getElementsByClassName("project2")[i].style.width = "16%";
    }
	}
}
setTimeout(function() {
	os = getOS();
	if(os<2) {
		detectOrientation();
	}
},10);
function pageOnLoad() {
    detectOrientation();
    var d = new Date();
    ifOnline();
    console.log("page loaded in: " + (d.getTime()-time) + "ms");
}
function ifOnline() {

  if(window.location.host.length) {
    document.getElementsByTagName("body")[0].innerHTML+="<!-- Global site tag (gtag.js) - Google Analytics -->\n<script async src='https://www.googletagmanager.com/gtag/js?id=UA-117084699-1'></script>\n<script>window.dataLayer = window.dataLayer || [];\nfunction gtag(){\ndataLayer.push(arguments);\n}\ngtag('js', new Date());\ngtag('config', 'UA-117084699-1');</script>"
    console.log("success");
  }
}
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
function aboutClick() {
    console.log("click");
    document.getElementById("about").style.width="96%";
    document.getElementById("about").style.height="96%";
    //document.getElementById("about").style.top="10%";
    document.getElementById("about").style.bottom="2%";
    document.getElementById("about").style.color="grey";
    document.getElementById("about").style.backgroundColor="rgba(255,255,255,1)";
    document.getElementById("about").disabled=true;

    document.getElementById("clickAway").style.backgroundColor="rgba(0,0,0,.3)";
    document.getElementById("clickAway").style.visibility="visible";

    document.getElementById("aboutP").style.fontSize=".4em";
}
function clickAway() {

    document.getElementById("about").style.bottom="20%";
    document.getElementById("about").style.width="10%";
    document.getElementById("about").style.height="20%";
    document.getElementById("about").style.color="rgba(255,255,255,.1)";
    document.getElementById("about").style.backgroundColor="rgba(255,255,255,.1)";
    document.getElementById("about").disabled=false;

    document.getElementById("clickAway").style.backgroundColor="rgba(0,0,0,0)";
    document.getElementById("clickAway").style.visibility="hidden";

    document.getElementById("aboutP").style.fontSize="0em";
}