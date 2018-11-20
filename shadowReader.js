var pace = 500;

for (var i=0; i<document.getElementsByClassName('shadowReader').length; i++) {
}
for (var i=0; i<stories.length; i++) {
	document.getElementsByClassName('shadowReader')[i].text=stories[i];
	document.getElementsByClassName('shadowReader')[i].current=0;
}
function read(i){
	if(document.getElementById('shadowSpeed') != undefined) {
		pace = document.getElementById('shadowSpeed').value;
	}
	if(document.getElementById('speedLabel') != undefined) {
		document.getElementById('speedLabel').innerHTML = pace;
		
	}
	console.log("read");
	var current = document.getElementsByClassName('shadowReader')[i].current;
	var text = document.getElementsByClassName('shadowReader')[i].text.split(" ");
	document.getElementsByClassName('shadowReader')[i].innerHTML=text[current];
	document.getElementsByClassName('shadowReader')[i].current+=1;
	if(current>=text.length-1) {
		document.getElementsByClassName('shadowReader')[i].current=0;
		setTimeout(function() {
			for (var i=0; i<stories.length; i++) {
				read(i);
			}
		},2000);
	} else {
		setTimeout(function() {
			for (var i=0; i<stories.length; i++) {
				read(i);
			}
		},60000/pace);
	}	
}

setTimeout(function() {
	for (var i=0; i<stories.length; i++) {
		read(i);
	}
},1000);