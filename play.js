window.onload=function() {
	time=document.getElementById("time")
	music=document.getElementById("music")
	setInterval(bar, 60/1000) //updates progress bar
	played=false //loads first song on first load
	current=0
	songs=[]
	tmp=document.getElementsByClassName("song") //loads all songs into array
	for (i=0; i<tmp.length; i++) {
		songs.push(tmp[i].innerHTML)
	}
	document.getElementById("name").innerHTML=songs[0]
}
function bar() {
	time.value=music.currentTime
	if (music.currentTime==music.duration) { next(1) } //plays next song after its done
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
function toggle() { //switches which icon is to be displayed
	if (!played) { load(songs[0]) }
	if (music.paused) { play() }
	else { pause() }
}
function next(n) { //shifts current index by N, can be any integer
	if (n<0) {
		n=songs.length+n
	}
	current=(current+n)%songs.length
	load(songs[current])
}
function load(s) {
	music.src="/music/"+s
	music.onloadedmetadata=function() {
		time.max=music.duration
		play()
		document.title=s
		document.getElementById("name").innerHTML=s
	}
}
function song(e) {
	if (e.target.tagName.toLowerCase() == "p") { //dont load song if div is clicked
		load(e.target.innerHTML)
		for (i=0; i<songs.length; i++) {
			if (songs[i]==e.target.innerHTML) {
				current=i
				break
			}
		}
	}
}
