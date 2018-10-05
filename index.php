<html>
<head>
<title>MP3</title>
<script src="play.js"></script>
<link rel="stylesheet" href="styles.css">

</head>
<body>

<div class="container">
	<p class="name" id="name">BLAH</p>
	<!-- <input class="search" placeholder="Search Songs" /> -->
	<div id="songs" onclick="song(event)">

<?php
foreach (glob("./music/*.mp3", GLOB_MARK) as $item) {
	echo "<p class='song'>".basename($item)."</p>";
}
?>
	</div>
	<progress value="0" max="1" id="time"></progress>
	<audio id="music" src=""></audio>
	<div class="buttonbar">
		<img class="control" src="last.png" onclick="next(-1)">
		<img id="toggle" class="control" src="play.png" onclick="toggle()">
		<img class="control" src="next.png" onclick="next(1)">
	</div>
</div>
</body>
</html>
