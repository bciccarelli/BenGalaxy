canvas = document.getElementById("wave");
ctx = canvas.getContext("2d");
offset = canvas.height/2;
var vel1 = 2*Math.E;
var vel2 = 2*Math.PI;
var vel3 = 2*Math.sqrt(2);
var x1,x2,x3;
x1=x2=x3=0;
var stretch=10;
var stretchVel=0;
//ctx.filter = 'blur(1px)';
function drawWave() {
	canvas.width=canvas.parentElement.clientWidth;
	ctx.lineCap = "round";
	ctx.lineWidth = 30;
	ctx.clearRect(0,0,canvas.width,canvas.height)
	x3+=vel3;
	ctx.beginPath();
	ctx.moveTo(-10,offset+10*Math.sin((0+x3)/100));
	for (var x=-10; x < canvas.width+10; x+=10){
		ctx.lineTo(x,offset+stretch*Math.sin((x+x3)/100));
	}
	ctx.strokeStyle = "#392fba";
	ctx.stroke();


	x1+=vel1;
	ctx.beginPath();
	ctx.moveTo(-10,offset+10*Math.sin((0+x1)/100));
	for (var x=-10; x < canvas.width+10; x+=10){
		ctx.lineTo(x,offset+stretch*Math.sin((x+x1)/100));
	}
	ctx.strokeStyle = "#9219c8";
	ctx.stroke();
	x2+=vel2;
	ctx.beginPath();
	ctx.moveTo(-10,offset+10*Math.sin((0+x2)/100));
	for (var x=-10; x < canvas.width+10; x+=10){
		ctx.lineTo(x,offset+stretch*Math.sin((x+x2)/100));
	}
	ctx.strokeStyle = "#381947";
	ctx.stroke();



	stretchVel+=(Math.random()-1/2)/10;
	stretch+=stretchVel;
	stretch=Math.min(Math.max(stretch,10),20)
	stretchVel=Math.min(Math.max(stretchVel,-.5),.5)

}
setInterval(function(){drawWave()},1000/30)