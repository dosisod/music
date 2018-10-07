window.onload=function() {
	time=document.getElementById("time")
	music=document.getElementById("music")
	cycle=document.getElementById("cycle")
	state=0
	states=["img/normal.png", "img/loop.png", "img/shuffle.png"]

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
	document.getElementById("toggle").src="img/pause.png"
}
function pause() {
	music.pause()
	document.getElementById("toggle").src="img/play.png"
}
function toggle() { //switches which icon is to be displayed for play/pause
	if (!played) { load(songs[0]) }
	if (music.paused) { play() }
	else { pause() }
}
function next(n) { //shifts current index by N, can be any integer
	if (state==1) { //if loop mode is on
		load(songs[current])
	}
	else if (state==2) { //if shuffle is on
		tmp=current
		while (tmp==current) { //dont want to play the same song
			current=(current+Math.floor(Math.random()*Math.floor(songs.length-1)))%songs.length
		}
		load(songs[current])
	}
	else { //normal mode
		if (n<0) {
			n=songs.length+n
		}
		current=(current+n)%songs.length
		load(songs[current])
	}
}
function mode() { //changes between play modes
	state=(state+1)%states.length
	cycle.src=states[state]
}
function load(s) { //loads a song and resets title, bar etc
	music.src="/music/"+s
	music.onloadedmetadata=function() {
		time.max=music.duration
		play()
		document.title=s
		document.getElementById("name").innerHTML=s
	}
}
function song(e) { //handles when song container is clicked
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
