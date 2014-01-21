<?php
$error = "none";
$useSequence = false;
$origTime = $_GET["t"];
$ztime = $_GET["t"];

if (is_numeric($ztime))
{
   $ztime .= "seconds";
}

$ztime = str_replace("and", "", $ztime);
$startTime = time();
$endTime = strtotime($ztime);
$soundType = "beep";
$soundVolume = "1";
$alertBox = "true";

if ($endTime == -1)
{
   $error = "fail";
   $endTime = startTime;
}

if (isset($_GET["l"]))
{
   $label = $_GET["l"];
   $useSequence = true;
   $sequence = str_replace(":", "-", $_GET["l"]) . ":" . ($endTime - $startTime);
}

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
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
   <!-- <?php echo date("Y-m-d-H-i-s", $startTime); ?> -->
   <!-- <?php echo date("Y-m-d-H-i-s", $endTime); ?> -->
   <!-- <?php print_r(localtime()); ?> -->
   <!-- <?php echo $_COOKIE["soundType"]; ?> -->
   <!-- <?php echo $_COOKIE["soundVolume"]; ?> -->
   <!-- <?php echo $_COOKIE["alertBox"]; ?> -->
   <head>
      <title>Timer - E.ggTimer.com</title>

      <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
      <meta name="Description" content="E.ggTimer.com is a simple, easy-to-use online countdown timer, or egg timer. Just set a time and bookmark it for repeated use. You can also create a count down to a specific date or time.">
      <meta name="keywords" content="countdown, count, down, egg timer, timer, productivity, time, online countdown, online timer">
      
      <link rel="shortcut icon" href="/images/favicon.ico">
      <link title="EggTimer" type="application/opensearchdescription+xml" rel="search" href="/pages/opensearch.xml">
      
      <script src="/scripts/jquery.min.js" type="text/javascript"></script>
      <script type="text/javascript" src="/timer/swfobject.js"></script>
      <script type="text/javascript" src="/scripts/Egg.js"></script>

      <style type="text/css">
         /* hide from ie on mac \*/
      	html {
      		height: 100%;
      		overflow: hidden;
      	}
         
        #eggtimer {
      		height: 100%;
      	}
      	/* end hide */
         
      	body {
      		height: 100%;
      		margin: 0;
      		padding: 0;
      	}
      </style>
   </head>
   <body>
      <div id="eggtimer">
         <p>Counting down to <?php echo $origTime; ?>.</p>
         <p>E.ggTimer is an online countdown timer, or online egg timer, that is easy to use. Create a simple countdown and bookmark it for later.</p>
      </div>
      <div id="noflash" style="display:none;">
         <p>E.ggtimer.com is an online countdown timer (or egg timer). To see the timer you need Adobe Flash Player.
         <a href="http://www.adobe.com/go/getflashplayer">
            <img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" />
         </a></p>
         <p>If you don't want to use Flash you can try our HTML-Only version: <a href="http://e.ggtimer.com/m/<?php echo $origTime; ?>">E.ggTimer.com/m/<?php echo $origTime; ?></a></p>
      </div>
      <script type="text/javascript">
         // <![CDATA[
         var eggTimer = new SWFObject("/timer/e.ggtimer.swf?v=4", "eggtimer", "100%", "100%", "9", "#FFFFFF");
         eggTimer.addParam("wmode", "transparent");
         eggTimer.addParam("allowscriptaccess", "always");
         eggTimer.addVariable("soundType", "<?php echo $soundType; ?>");
         eggTimer.addVariable("soundVolume", "<?php echo $soundVolume; ?>");
         eggTimer.addVariable("startTime", "<?php echo $startTime; ?>");
         <?php if ($useSequence): ?>
            eggTimer.addVariable("sequence", "<?php echo $sequence; ?>");
         <?php else : ?>
            eggTimer.addVariable("endTime", "<?php echo $endTime; ?>");
         <? endif; ?>
         eggTimer.addVariable("error", "<?php echo $error; ?>");

         if (!eggTimer.write("eggtimer")) {
            document.getElementById("eggtimer").style.height = "0px";
            document.getElementById("noflash").style.display = "";
         }
         // ]]>
      </script>
   </body>
</html>

