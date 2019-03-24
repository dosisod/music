<html>
<head>
<title>MP3 Player</title>
<script src="play.js"></script>
<link rel="stylesheet" href="styles.css">

</head>
<body>

<div class="container">
	<p class="name" id="name"></p>
	<div id="songs" onclick="song(event)">

<?php
foreach (glob("./music/*.mp3", GLOB_MARK) as $item) { // */ this comment closes the false comment
	echo "<p class='song'>".basename($item)."</p>";
}
?>
	<div class="spacer"></div>
	</div>
	<progress value="0" max="1" id="time"></progress>
	<audio id="music"></audio>
	<div class="buttonbar">
		<img src="img/last.png" onclick="next(-1)">
		<img src="img/play.png" onclick="toggle()" id="toggle">
		<img src="img/next.png" onclick="next(1)">
		<img src="img/shuffle.png" onclick="mode()" id="cycle">
	</div>
</div>
</body>
</html>