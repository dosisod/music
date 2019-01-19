window.onload=function() {
	time=document.getElementById("time")
	music=document.getElementById("music")
	cycle=document.getElementById("cycle")
	state=2
	states=["img/normal.png", "img/loop.png", "img/shuffle.png"]

	setInterval(bar, 60/1000) //updates progress bar

	played=false //loads first song on first load
	current=0
	
	songs=[]
	raw=document.getElementsByClassName("song") //loads all songs into array
	for (i in raw) songs.push(raw[i].innerHTML)
	
	document.getElementById("name").innerHTML=songs[0]

	document.onkeydown=(e)=>{
		key=e.which||e.event

		//same key layout at desktop youtube
		if (key==75) toggle()
		else if (key==74) next(-1)
		else if (key==76) next(1)
		else if (key==77) mode()

		//for volume
		else if (key==188) volume(-0.1)
		else if (key==190) volume(0.1)
	}
}
function bar() {
	time.value=music.currentTime
	if (music.currentTime==music.duration) next(1) //plays next song after its done
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
	(!played)?load(songs[0]):music.paused?play():pause()
}
function next(n) { //shifts current index by N, can be any integer
	if (state==1) load(songs[current]) //if loop mode is on
	else if (state==2) { //if shuffle is on
		tmp=current
		while (tmp==current) { //dont want to play the same song
			current=(current+Math.floor(Math.random()*Math.floor(songs.length-1)))%songs.length
		}
		load(songs[current])
	}
	else { //normal mode
		if (n<0) n=songs.length+n
		current=(current+n)%songs.length
		load(songs[current])
	}
}
function mode() { //changes between play modes
	state=(state+1)%states.length
	cycle.src=states[state]
}
function load(s) { //loads a song and resets title, bar etc
	for (i in raw) {
		if (raw[i].innerHTML==s) {
			raw[i].scrollIntoView()
			break
		}
	}
	music.onloadedmetadata=()=>{ //must wait for audio to load before getting timestamps
		time.max=music.duration
		document.title=document.getElementById("name").innerHTML=s
		play()
	}
	music.src="/music/"+s
}
function song(e) { //handles when song container is clicked
	if (e.target.tagName.toLowerCase()=="p") { //dont load song if div is clicked
		load(e.target.innerHTML)
		for (i in songs) {
			if (songs[i]==e.target.innerHTML) {
				current=i
				break
			}
		}
	}
}
function volume(delta) { //changes volume by n
	music.volume+=delta
}