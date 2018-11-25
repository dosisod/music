<html>
<head>
<title>MP3</title>
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
	</div>
	<progress value="0" max="1" id="time"></progress>
	<audio id="music" src=""></audio>
	<div class="buttonbar">
		<img class="control" src="img/last.png" onclick="next(-1)">
		<img class="control" src="img/play.png" onclick="toggle()" id="toggle">
		<img class="control" src="img/next.png" onclick="next(1)">
		<img class="control" src="img/shuffle.png" onclick="mode()" id="cycle">
	</div>
</div>
</body>
</html>
