<html>
<head>
    <title>Pizza Any Time!</title>
    <link rel="shortcut icon" href="/images/favicon.ico">
    <style type="text/css">
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            color: #FFF;
        }

        #pizzabagel {
            width: 100%;
            height: 100%;
            background: #333 url("/images/PizzaBagel.gif") no-repeat center center;
        }

        #marq {
            position: fixed;
            bottom: 30px;
            left: 0;
            width: 100%;
            font-size: 20px;
        }
    </style>
</head>
<body>
<div id="pizzabagel"></div>
<audio autoplay loop hidden>
    <source src="/images/PizzaAnytime.ogg" type="audio/ogg">
    <source src="/images/PizzaAnytime.mp3" type="audio/mpeg">
</audio>
<marquee id="marq">When pizza is on a bagel you can eat pizza any time!</marquee>
<script type="text/javascript">
    var chart = document.getElementById("pizzabagel");
    var count = 0;
    chart.onclick = function() {
        count ++;
        if (count >= 5) {
            window.location.href = "/images/Pizza-Chart.jpg";
        }
    }
</script>
</body>
</html>