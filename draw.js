var drawPoints = [];
var mousedown=false;
var mousedownlast=false;
var cnvs;
var ctx2;
var strokeWidth=2;
var colorField="white";
var eraser=false;
var mousePos = {
	x: 0,
	y: 0
}
var lastPos = {
	x: 0,
	y: 0
}
function startNotes() {
    cnvs = document.getElementById("bgcanvas");
    cnvs.width=window.innerWidth;
    cnvs.height=window.innerHeight;
    
    ctx2 = cnvs.getContext("2d");
	cnvs.addEventListener('mousedown', function(evt) {
		mousedown=true;
		if(eraser) {
			ctx2.fillStyle="#000";
			ctx2.beginPath();
			ctx2.arc(mousePos.x,mousePos.y,document.getElementById('strokeWidth').value,0,2*Math.PI);
			ctx2.fill();
		} else {
			ctx2.fillStyle=document.getElementById('colorField').value;
			ctx2.beginPath();
			ctx2.arc(mousePos.x,mousePos.y,document.getElementById('strokeWidth').value/2,0,2*Math.PI);
			ctx2.fill();
			ctx2.beginPath();
			ctx2.arc(lastPos.x,lastPos.y,document.getElementById('strokeWidth').value/2,0,2*Math.PI);
			ctx2.fill();
		}
	}, false);
	cnvs.addEventListener('mouseup', function(evt) {
		mousedown=false;
	}, false);

	cnvs.addEventListener("wheel", function(evt) {

		document.getElementById('strokeWidth').value-=(Math.round(evt.deltaY/50));
	});
	cnvs.addEventListener('mousemove', function(evt) {

		mousePos = getMousePos(cnvs, evt);
		if(mousedown){
			if(!eraser) {
				if(mousedownlast) {
					ctx2.lineWidth=document.getElementById('strokeWidth').value;
					ctx2.strokeStyle=document.getElementById('colorField').value;
					ctx2.lineCap="round";
					
					ctx2.beginPath();
					ctx2.moveTo(lastPos.x,lastPos.y);		
					ctx2.lineTo(mousePos.x,mousePos.y)
					ctx2.stroke();
				}
			} else {
				ctx2.lineWidth=document.getElementById('strokeWidth').value*2;
				ctx2.strokeStyle="#000000";
				ctx2.lineCap="round";
				
				ctx2.beginPath();
				ctx2.moveTo(lastPos.x,lastPos.y);		
				ctx2.lineTo(mousePos.x,mousePos.y)
				ctx2.stroke();
			}
		}
		mousedownlast=mousedown;
		lastPos=mousePos;
	}, false);

	ctx2.fillStyle="#000";
	ctx2.fillRect(0,0,cnvs.width,cnvs.height);
    
}

function cookies(accepted) {

  document.getElementsByClassName("cookies")[0].style.display="none";
  if(accepted) {
    document.cookie="cookies=1";
    acceptsCookies=true;
  }
}
function getCookie(c) {
  var cookies = document.cookie.split("; ");
  for (cookie in cookies) {
    if (cookie.substring(0,cookie.indexOf("="))==c) {
      return cookie.substring(cookie.indexOf("="))
    }
    return "0"
  }
}
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

function drawLines() {
	for (var b = 0; b < drawPoints.length; b++) {
		if(drawPoints[b].begin) {
			//console.log("start");
			ctx2.strokeStyle=drawPoints[b].color;
        	
        	ctx2.moveTo(drawPoints[b].x,drawPoints[b].y);
		}
		if(!drawPoints[b].begin) {
        	ctx2.lineTo(drawPoints[b].x,drawPoints[b].y);
        	ctx2.stroke();
		}
	}
	ctx2.stroke()
}
function dot(x,y,begin,end,color) {
	this.x=x;
	this.y=y;
	this.begin=begin;
	this.end=end;
	this.color=color;
}