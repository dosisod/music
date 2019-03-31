//2d array containing song playlists
lists=[]

if (lists.length>0) { //only do this if at least one playlist is here
	lists.forEach((e, i)=>{
		nu("span", {
			"onclick": ()=>playlist(lists[i], 0),
			"innerText": i+1,
			"className": "playlist"
		}, "bar")
	})
	
	nu("span", {
		"onclick": ()=>playlist(old, 2), //switch to old song list
		"innerText": "R",
		"className": "playlist"
	}, "bar")
}