window.addEventListener("load", function() {
	time=nu("time")
	music=nu("music")
	cycle=nu("cycle")

	var showRGB=true
	var doAutoplay=true

	currentState=2
	states=["normal.png", "loop.png", "shuffle.png"]
	isPlaying=false

	controlPressed=false
	const controlPressTimeout=10000

	queue=[]

	setInterval(updateBar, 60/1000)

	songElements=document.getElementsByClassName("song")

	songs=[]
	for (const song of songElements) {
		songs.push(song.innerText)
	}

	//when a playlist is selected, allow for switching back later
	allSongs=songs

	startedPlaying=false
	currentIndex=getRandomIndex()

	nu("name").innerText=songs[currentIndex]

	document.onkeydown=(e)=> {
		const key=e.key
		const num=Number(key) - 1

		//same key layout as desktop youtube
		if (key=="k" || key==" ") {
			e.preventDefault()
			toggle()
		}
		else if (key=="j") shiftBy(-1)
		else if (key=="l") shiftBy(1)
		else if (key=="m") nextMode()

		else if (key=="ArrowLeft") seek(-5)
		else if (key=="ArrowRight") seek(5)

		//volume control ( < and > keys)
		else if (key==",") volume(-0.1)
		else if (key==".") volume(0.1)

		else if (key=="Control" || e.ctrlKey) {
			controlPressed=true

			//unset potentially stuck control key
			setTimeout(function() {
				controlPressed=false
			}, controlPressTimeout)
		}

		//number keys 1-9 load playlists
		else if (playlists[num]) {
			playlist(playlists[num], 0)
		}

		else if (key=="r") {
			playlist(old, 2)
		}
	}

	document.onkeyup=(e)=> {
		if (e.key=="Control" || e.ctrlKey) {
			controlPressed=false
		}
	}

	errorcount=0

	//prevents 404 from killing the music
	music.onerror=(e)=> {
		if (errorcount < 10) {
			shiftBy(1)
			errorcount++
		}
	}

	var timer=Date.now()

	if (showRGB) {
		setInterval(function() {
			nu("songs").style.backgroundColor="hsl(" + (timer/50)%360 + ",50%,50%)"
			timer=Date.now()
		}, 50)
	}

	if (doAutoplay) {
		shiftBy(1)
	}
})

function updateBar() {
	time.value=music.currentTime

	if (music.currentTime==music.duration) {
		shiftBy(1)
	}
}

function play() {
	isPlaying=true
	startedPlaying=true
	music.play()

	nu("toggle").src="img/pause.png"
}

function pause() {
	isPlaying=false
	music.pause()

	nu("toggle").src="img/play.png"
}

function toggle() {
	if (startedPlaying) {
		music.paused ? play() : pause()
	}
	else {
		loadIndex(currentIndex)
	}
}

function shiftBy(amount) {
	if (queue.length > 0) {
		loadName(queue[0])
		queue.shift()

		if (queue[0]) {
			displayQueue()
		}
		else {
			nu("queue").innerHTML=""
		}

		return
	}

	//shuffle
	else if (currentState==2) {
		const lastIndex=currentIndex

		while (lastIndex==currentIndex) {
			currentIndex=(
				currentIndex +
				getRandomIndex()
			) % songs.length
		}
	}

	//normal
	else if (currentState==0) {
		currentIndex=(currentIndex + amount) % songs.length
	}

	loadIndex(currentIndex)
}

function nextMode() {
	currentState=(currentState + 1) % states.length
	cycle.src="img/" + states[currentState]
}

function loadIndex(index) {
	loadName(songs[index])
}

//loads a song and resets title, bar etc
function loadName(songName) {
	for (var song of songElements) {
		if (song.innerText==songName) {
			song.scrollIntoView()
			break
		}
	}

	music.onloadedmetadata=()=>{
		time.max=music.duration
		document.title=nu("name").innerText=songName

		if (isPlaying || !startedPlaying) {
			play()
		}
	}
	music.src="/music/"+songName
}

function handle(e) {
	if (e.target.tagName!=="DIV") {
		if (controlPressed) {
			queue.push(e.target.innerText)
			displayQueue()
		}
		else {
			loadName(e.target.innerText)
			currentIndex=songs.indexOf(e.target.innerText)
		}
	}
}

function volume(delta) {
	if (music.volume+delta >= 0 && music.volume+delta <= 1) {
		music.volume+=delta
	}
}

function seek(delta) {
	music.currentTime+=delta
}

function playlist(arr, state) {
	nu("songs").innerHTML=""
	currentState=state
	songs=arr

	songs.forEach(e=> {
		nu("p", {
			"className": "song",
			"innerText": e
		}, "songs")
	})

	nu("div", {"className": "spacer"}, "songs")

	loadIndex(0)

	if (state==2) {
		shiftBy(1)
	}
}

function getRandomIndex() {
	return Math.floor(Math.random() * songs.length)
}

function displayQueue() {
	nu("queue").innerHTML="&nbsp;&nbsp; Next: "+queue.join(", ")
}