<html>
<head>
<title>MP3 Player</title>
<script src="nu.min.js"></script>
<script src="play.js"></script>
<link rel="stylesheet" href="styles.css">

</head>
<body>

<div class="container">
	<span class="name">
		<span class="name" id="name"></span>
		<span class="name" id="queue"></span>
	</span>
	<div id="songs" onclick="handle(event)">

<?php
foreach (glob("./music/*.mp3", GLOB_MARK) as $item) { 
	echo "<p class='song'><span class='wrapper'>".basename($item)."</span></p>";
}
?>
	<div class="spacer"></div>
	</div>
	<progress value="0" max="1" id="time"></progress>
	<audio id="music"></audio>
	<div class="buttonbar" id="bar">
		<img src="img/last.png" onclick="next(-1)">
		<img src="img/play.png" onclick="toggle()" id="toggle">
		<img src="img/next.png" onclick="next(1)">
		<img src="img/shuffle.png" onclick="mode()" id="cycle">
	</div>
</div>
<script src="playlists.js"></script>
</body>
</html>