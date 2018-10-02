window.onload=function() {
	//bar=document.getElementById("bar")
	time=document.getElementById("time")
	music=document.getElementById("music")
	setInterval(bar, 60/1000)
}
function bar() {
	//bar.style.width="100px"
	time.value=music.currentTime
}
function play() {
	music.play()
}
function pause() {
	music.pause()
}
function song(e) {
	music.src=e.target.innerHTML
	music.onloadedmetadata=function() {
		time.max=music.duration
		music.play()
	}
}

//myaudio.duration
//myaudio.currentTime
