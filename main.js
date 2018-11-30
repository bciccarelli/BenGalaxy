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
			document.getElementsByClassName("project")[i].style.height = window.innerHeight/7+"px";
			document.getElementsByClassName("project")[i].style.width = "16%";
		}
    for (i=0;i<document.getElementsByClassName("project2").length;i++) {
      document.getElementsByClassName("project2")[i].style.height = window.innerHeight/7+"px";
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
var currentProject;
function openProject(name) {
  for (i=0;i<document.getElementsByClassName("bottomLinks").length;i++) {
    document.getElementsByClassName("bottomLinks")[i].style.color = "black";
  } 
  document.getElementById("overlaylink").style.visibility = "visible";
  document.getElementById("overlay").style.visibility="visible";
  document.getElementById("overlay").style.opacity="1";
  switch (name) {
      case "about":
        document.getElementById("overlaytitle").innerHTML = "About"
        document.getElementById("overlayp").innerHTML = "Hello, I'm Ben Ciccarelli from Arizona. I love computer science, programming, math, and chess."
        document.getElementById("overlaylink").style.visibility = "hidden";
        break;
      case "galakshell":
        document.getElementById("overlaytitle").innerHTML = "GalakShell"
        document.getElementById("overlayp").innerHTML = "My shell for creating custom, easily accessible commands."
        document.getElementById("overlaylink").href = "https://github.com/AluminumChassis/galakShell"
        break;
      case "neurogenesis":
        document.getElementById("overlaytitle").innerHTML = "Neurogenesis"
        document.getElementById("overlayp").innerHTML = "A working neural network written with C#. This is the basis for my neural network projects"
        document.getElementById("overlaylink").href = "https://github.com/AluminumChassis/neurogenesis"
        break;
      default:
          console.log("unrecognized project")
  }
}
function hideOverlay(){
  setTimeout(function() {
    for (i=0;i<document.getElementsByClassName("bottomLinks").length;i++) {
      document.getElementsByClassName("bottomLinks")[i].style.color = "white";
    } 
    document.getElementById("overlay").style.visibility="hidden";
    document.getElementById("overlaylink").removeAttribute("href");
    document.getElementById("overlay").style.opacity="0";
  },10)
}