<?php

$soundType = "beep";
$soundVolume = "1";
$alertBox = "true";
if (isset($_COOKIE["soundType"])) {
   $soundType = $_COOKIE["soundType"];
}
if (isset($_COOKIE["soundVolume"])) {
   $soundVolume = $_COOKIE["soundVolume"];
}

if (isset($_COOKIE["alertBox"])) {
   $alertBox = $_COOKIE["alertBox"];
}
?>
<!doctype html>
<html> <!-- manifest="/egg404.manifest" -->
<head>
    <title>Timer - E.ggTimer</title>

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="Description" content="E.ggTimer.com is a simple, easy-to-use online countdown timer." />
    <meta name="keywords" content="countdown, count, down, egg timer, timer, productivity, time, online countdown, online timer" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
    <meta name="mobileoptimized" content="0" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="title" content="Timer - Pomodoro" />

    <link rel="alternate" type="application/json+oembed" href="http://e.ggtimer.com/oembed?format=json&url=<?php echo urlencode("http://e.ggtimer.com" . $_SERVER['REQUEST_URI']); ?>" title="Timer - E.ggTimer" />
    <link rel="alternate" type="application/xml+oembed" href="http://e.ggtimer.com/oembed?format=xml&url=<?php echo urlencode("http://e.ggtimer.com" . $_SERVER['REQUEST_URI']); ?>" title="Timer - E.ggTimer" />
    <link rel="search" href="/pages/opensearch.xml" type="application/opensearchdescription+xml" title="EggTimer" />
    <link rel="stylesheet" href="/styles/timer.css" type="text/css" media="screen" title="Normal"/>
    <link rel="shortcut icon" href="/images/favicon.ico" />
    <link rel="apple-touch-icon" href="/images/apple-touch-icon.png"/>
</head>
<body>
<div id="wrapper">
    <div id="progress"></div>
    <div id="static"></div>
</div>
<div id="textWrapper">
    <h2 id="progressText"></h2>
</div>

<audio id="beepbeep" style="display:none;" preload="auto" autobuffer>
    <?php if ($soundType === "ring") : ?>
    <source src="/styles/ringring.mp3" type="audio/mpeg" />
    <source src="/styles/ringring.ogg" type="audio/ogg" />
    <?php else: ?>
    <source src="/styles/beepbeep.mp3" type="audio/mpeg" />
    <source src="/styles/beepbeep.ogg" type="audio/ogg" />
    <?php endif; ?>
</audio>

<script src="/scripts/jquery.min.js" type="text/javascript"></script>
<script src="/scripts/min/Time.min.js" type="text/javascript"></script>
<script src="/scripts/min/Egg3.min.js" type="text/javascript"></script>
<script type="text/javascript">
    Egg.defaultText = "Morning Routine";
    Egg.expiredMessage = "You are ready for the day!";
    Egg.sequence = [
    	{label:"Morning warm up - let's go!", duration: 6},
    	{label:"Get ready to run in place", duration: 12},
    	{label:"Run in place", duration: 60},
    	{label:"Sweet! Get ready for jumping jacks", duration: 6},
    	{label:"Jumping jacks", duration: 60},
    	{label:"Good! Get ready for situps", duration: 6},
    	{label:"As many situps as you can", duration: 60},
    	{label:"Doing great! Here comes pushups", duration: 6},
    	{label:"Pushups", duration: 60},
    	{label:"Awesome! Stand back up", duration: 6},
    	{label:"Squats!", duration: 60},
    	{label:"Super! get set for lunges", duration: 6},
    	{label:"Lunges", duration: 60},
    	{label:"Okay - one more thing...", duration: 6},
    	{label:"Have a great day!", duration: 30}
    ];
    Egg.volume = <?php echo $soundVolume; ?>;
    Egg.canAlert = <?php echo $alertBox; ?>;
</script>
</body>
</html>                                                                                                                           