function detectOrientation() {
	if(window.innerWidth<window.innerHeight) {
		for (i=0;i<document.getElementsByClassName("project").length;i++) {
			document.getElementsByClassName("project")[i].style.height = window.innerHeight/6+"px";
			document.getElementsByClassName("project")[i].style.width = "48%"
		} 
	} else {
		for (i=0;i<document.getElementsByClassName("project").length;i++) {
			document.getElementsByClassName("project")[i].style.height = 100+"px";
			//document.getElementsByClassName("project")[i].style.width = "15%";
		}
	}
}
setTimeout(function() {
	os = getOS();
	if(os<2) {
		document.getElementById("vidSrc").src="";
	}
	detectOrientation();
},10);
function pageOnLoad() {
    console.log("page loaded")
    setupCanvas();
    detectOrientation();
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
function sideBarClick() {
    console.log("click");
    document.getElementById("sideBar").style.width="95%";
    document.getElementById("sideBar").disabled=true;
    document.getElementById("clickAway").style.display="block";
    console.log(document.getElementById("sideBar"));
    for (var i = document.getElementsByClassName("sideButton").length - 1; i >= 0; i--) {
      document.getElementsByClassName("sideButton")[i].style.fontSize="10vh";
      document.getElementsByClassName("sideButton")[i].style.padding="10px";
    }
}
function clickAway() {

    document.getElementById("sideBar").style.width="4%";
    document.getElementById("sideBar").disabled=false;
    document.getElementById("clickAway").style.display="none";
    for (var i = document.getElementsByClassName("sideButton").length - 1; i >= 0; i--) {
      document.getElementsByClassName("sideButton")[i].style.fontSize="0vh";
      document.getElementsByClassName("sideButton")[i].style.padding="0";
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
var canvas;
var ctx;
var pointRadius = 10;
var numpoints = 100;
var points = [];
var depth=3;
var d=0;
var frame = 0
function setupCanvas() {

    canvas = document.getElementById("bgcanvas");
    ctx = canvas.getContext("2d");
    for(var i = 0; i < numpoints; i++) {
        points[i]=new point();
    }
    setInterval(function(){
     drawSpace();
    } ,1000/20)
}

function drawSpace() {
    frame++;
    b=Math.floor((Math.sin(frame/40+2*Math.PI/3)+1)*128);
    r=Math.floor((Math.sin(frame/40+4*Math.PI/3)+1)*128);
    g=Math.floor((Math.sin(frame/40+2*Math.PI)+1)*128);
    color="rgb("+r+", "+g+", "+b+")";
    if (d > 10) {
      d=0;
      points.splice(Math.floor(Math.random()*points.length),1);
      points[points.length]=new point();
    } else {
      d++
    }

    ctx.fillStyle="#000000";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    for(var i = 0; i < numpoints; i++) {
        
        points[i].draw();

        for(var j = 0; j < numpoints; j ++) {
            if(distance(points[i],points[j])<150){
              ctx.strokeStyle=color;
              ctx.beginPath();
              ctx.moveTo(points[i].x,points[i].y);
              ctx.lineTo(points[j].x,points[j].y);
              ctx.stroke();
            }
        }       
    }
}
function threeToTwo(object) {
    let x=object.x;
    let y=object.y;
    x=((x)+object.z*canvas.width/2)/(object.z+1);
    y=((y)+object.z*canvas.height/2)/(object.z+1);
    return ({x:x,y:y})
}
function distance(obj1,obj2) {
    return Math.sqrt(Math.pow(obj1.x-obj2.x,2)+Math.pow(obj1.y-obj2.y,2))
}
function point() {
  this.vely=(Math.random()-.5)/10;
  this.velx=(Math.random()-.5)/10;
  this.x=Math.random()*canvas.width;
  this.y=Math.random()*canvas.height;
  this.draw = function() {
    this.velx += (Math.random()-.5)/10;
    this.vely += (Math.random()-.5)/10;
    this.x+=this.velx;
    this.y+=this.vely;
    
  }
}