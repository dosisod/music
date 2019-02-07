window.onload=()=> {
	time=document.getElementById("time")
	music=document.getElementById("music")
	cycle=document.getElementById("cycle")
	state=2
	states=["img/normal.png", "img/loop.png", "img/shuffle.png"]

	setInterval(bar, 60/1000) //updates progress bar
	
	songs=[]
	raw=document.getElementsByClassName("song") //loads all songs into array
	for (i of raw) songs.push(i.innerText)

	played=false //loads first song on first load
	current=Math.floor(Math.random()*songs.length) //selects a random song to start with

	document.getElementById("name").innerText=songs[current]

	document.onkeydown=(e)=>{
		key=e.which||e.event

		//same key layout at desktop youtube
		if (key==75||key==32) toggle()
		else if (key==74) next(-1)
		else if (key==76) next(1)
		else if (key==77) mode()
		
		else if (key==37) seek(-5)
		else if (key==39) seek(5)

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
	if (played)
		music.paused?play():pause()
	else
		load_index(current)
}
function next(n) { //shifts current index by N, can be any integer
	if (state==2) { //if shuffle is on
		tmp=current
		while (tmp==current) //dont want to play the same song
			current=(current+Math.floor(Math.random()*songs.length))%songs.length
	}
	else if (state==0) { //normal mode
		current=(current+n)%songs.length
	}
	load_index(current) //state 1 will just run the same song again
}
function mode() { //changes between play modes
	state=(state+1)%states.length
	cycle.src=states[state]
}
function load_index(n) {
	load_name(songs[n])
}
function load_name(s) { //loads a song and resets title, bar etc
	for (i of raw) {
		if (i.innerText==s) {
			i.scrollIntoView()
			break
		}
	}
	music.onloadedmetadata=()=>{ //must wait for audio to load before getting timestamps
		time.max=music.duration
		document.title=document.getElementById("name").innerText=s
		play()
	}
	music.src="/music/"+s
}
function song(e) { //handles when song container is clicked
	if (e.target.tagName.toLowerCase()=="p") { //dont load song if div is clicked
		load_name(e.target.innerText)
		current=songs.indexOf(e.targetinnerText)
	}
}
function volume(delta) { //changes volume by n
	//prevents warning
	if (music.volume+delta<=1&&music.volume+delta>=0)
		music.volume+=delta
}
function seek(delta) { //seeks "delta" seconds from current point
	music.currentTime+=delta
}