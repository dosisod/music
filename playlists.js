//2d array containing song playlists
const playlists=[]

if (playlists.length>0) {
	playlists.forEach((e, i)=>{
		nu("span", {
			"onclick": ()=>playlist(playlists[i], 0),
			"innerText": i+1,
			"className": "playlist"
		}, "bar")
	})
	
	nu("span", {
		"onclick": ()=>playlist(allSongs, 2),
		"innerText": "R",
		"className": "playlist"
	}, "bar")
}