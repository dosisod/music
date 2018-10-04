window.onload=function() {
	time=document.getElementById("time")
	music=document.getElementById("music")
	setInterval(bar, 60/1000)
	played=false
	current=0
	songs=[]
	tmp=document.getElementsByClassName("song")
	for (i=0; i<tmp.length; i++) {
		songs.push(tmp[i].innerHTML)
	}
	document.getElementById("name").innerHTML=songs[0]
}
function bar() {
	time.value=music.currentTime
}
function play() {
	played=true
	music.play()
	document.getElementById("toggle").src="pause.png"
}
function pause() {
	music.pause()
	document.getElementById("toggle").src="play.png"
}
function toggle() {
	if (!played) { load(songs[0]) }
	if (music.paused) { play() }
	else { pause() }
}
function next(n) {
	if (n<0) {
		n=songs.length+n
	}
	current=(current+n)%songs.length
	load(songs[current])
}
function load(s) {
	music.src=s
	music.onloadedmetadata=function() {
		time.max=music.duration
		play()
		document.title=s
		document.getElementById("name").innerHTML=s
	}
}
function song(e) {
	if (e.target.tagName.toLowerCase() == "p") {
		load(e.target.innerHTML)
		for (i=0; i<songs.length; i++) {
			if (songs[i]==e.target.innerHTML) {
				current=i
				break
			}
		}
	}
}
