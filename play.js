window.onload=()=>{
	time=document.getElementById("time")
	music=document.getElementById("music")
	cycle=document.getElementById("cycle")
	
	state=2 //current state
	states=["img/normal.png", "img/loop.png", "img/shuffle.png"]
	playing=false //stores whether music is playing or not
	control=false
	queue=[]

	setInterval(bar, 60/1000) //updates progress bar
	
	songs=[]
	raw=document.getElementsByClassName("song") //loads all songs into array
	for (i of raw) songs.push(i.innerText)

	old=songs //used when switching back to original playlist

	played=false //loads first song on first load
	current=Math.floor(Math.random()*songs.length) //selects a random song to start with

	document.getElementById("name").innerText=songs[current]

	document.onkeydown=e=>{
		key=e.key

		//same key layout as desktop youtube
		if (key=="k"||key==" ") toggle() //k
		else if (key=="j") next(-1) //j
		else if (key=="l") next(1) //l
		else if (key=="m") mode() //m
		
		else if (key=="ArrowLeft") seek(-5) //left arrow
		else if (key=="ArrowRight") seek(5) //right arrow

		//for volume
		else if (key==",") volume(-0.1) //< key
		else if (key==".") volume(0.1) //> key

		else if (key=="Control") control=true //set control key

		else if (lists[Number(key)-1]) { //if 1-9 key is pressed for playlist
			playlist(lists[Number(key)-1], 0) //play it
		}
		else if (key=="r") playlist(old, 2) //if "r" is pressed, play old songs
	}
	document.onkeyup=e=>{
		if (e.key=="Control") control=false //unset control key
	}
	music.onerror=e=>next(1) //prevents 404 from killing the music
}

function bar() { //updates time that the bar displays
	time.value=music.currentTime
	if (music.currentTime==music.duration) next(1) //plays next song after its done
}

function play() {
	playing=played=true //says that music has been played
	music.play()
	document.getElementById("toggle").src="img/pause.png"
}

function pause() {
	playing=false
	music.pause()
	document.getElementById("toggle").src="img/play.png"
}

function toggle() { //switches which icon is to be displayed for play/pause
	if (played) music.paused?play():pause()
	else load_index(current) //if no songs have been played yet, play current song
}

function next(n) { //shifts current index by N, can be any integer
	if (queue.length) { //if a song is queued play it
		load_name(queue[0])
		queue.shift() //remove most recent song

		//if there are still songs, display them, else nothing
		document.getElementById("queue").innerHTML=(queue[0]?"&nbsp;&nbsp; Next: "+queue.join(", "):"")
		
		return
	}
	else if (state==2) { //if shuffle is on
		tmp=current
		while (tmp==current) { //dont want to play the same song
			current=(current+Math.floor(Math.random()*songs.length))%songs.length
		}
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

function load_index(n) { //load song by index (of array)
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
		
		if (playing||!played) play() //dont play song if music is paused
	}
	music.src="/music/"+s
}

function song(e) { //handles when song container is clicked
	if (e.target.tagName.toLowerCase()=="p") { //dont load song if div is clicked
		if (control) {
			queue.push(e.target.innerText)
			document.getElementById("queue").innerHTML="&nbsp;&nbsp; Next: "+queue.join(", ")
		}
		else {
			load_name(e.target.innerText)
			current=songs.indexOf(e.targetinnerText) //update current value
		}
	}
}

function volume(delta) { //changes volume by n
	//prevents warning
	if (music.volume+delta<=1&&music.volume+delta>=0) {
		music.volume+=delta
	}
}

function seek(delta) { //seeks "delta" seconds from current point
	music.currentTime+=delta
}

function playlist(arr, n) {
	document.getElementById("songs").innerHTML=""
	state=n //switch playlist mode
	songs=arr //load new playlist

	songs.forEach(e=>{ //adds songs from playlist onto screen
		nu("p", {
			"className": "song",
			"innerText": e
		}, "songs")
	})
	
	nu("div", {"className": "spacer"}, "songs") //re-adds spacer at the bottom
	
	load_index(0) //auto-plays first song
	if (n==2) next(1) //if shuffle is on, get random song
}