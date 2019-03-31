//2d array containing song playlists
lists=[]

if (lists.length>0) { //only do this if at least one playlist is here
	lists.forEach((e, i)=>{
		nu("span", {
			"onclick": ()=>playlist(lists[i]),
			"innerText": i+1,
			"className": "playlist"
		}, "bar")
	})
	
	nu("span", {
		"onclick": ()=>{
			state=2 //switch to shuffle
			playlist(old)
		},
		"innerText": "R",
		"className": "playlist"
	}, "bar")
}