<html>
<head>
<title>MP3</title>
<script src="play.js"></script>
<link rel="stylesheet" href="styles.css">

</head>
<body>
<!-- <audio src="" controls></audio> -->

<progress value="0" max="1" id="time"></progress>

<audio id="music" src="car.mp3"></audio>
<div>
	<button onclick="play()">Play</button>
	<button onclick="pause()">Pause</button>
</div>

<div id="songs" onclick="song(event)">
<?php

foreach (glob("./*.mp3", GLOB_MARK) as $item) {
	//echo "<a href=".$item.">".basename($item)."</a></br>";
	echo "<span>".basename($item)."</span></br>";
}
//die();
?>
</div>

</body>
</html>
