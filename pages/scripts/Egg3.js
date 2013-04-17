//Egg Timer
var Egg = {
	name : "EggTimer",
   defaultText : "",
   expiredMessage : "Time Expired!",
   title : "",
   label : "",
	progress: 0,
	startTime: 0,
	endTime: 0,
   totalTime: 0,
	parseError: "",
   progressBar: null,
   progressText: null,
   staticArea: null,
   beep: null,
   currDate: null,
   endDate: null,
   ticker: null,
   useWorker: false,
   worker: null,
   workerLock: false,
   startButton: null,
   volume : 1,
   start : function() {
      if (Egg.parseError !== "" && Egg.parseError !== "none") {
      	Egg.progressText.html(Egg.defaultText);
         Egg.updateText(Egg.defaultText);
         return;
      }
      
      if (Egg.useWorker) {
      	Egg.worker = new Worker("/scripts/DateCalculator.js");
      	Egg.worker.onmessage = Egg.workerUpdate;
      }
   	Egg.endDate = new Date(new Date().getTime() + (Egg.endTime - Egg.startTime));
      Egg.currDate = new Date();
      Egg.totalTime = Egg.endTime - Egg.startTime;
      Egg.update();
      Egg.ticker = setInterval(Egg.update, 1000 / 12);
   },
   update : function() {
      if (Egg.useWorker && !Egg.workerLock) {
      	Egg.workerLock = true;
         Egg.worker.postMessage({startDate: Egg.currDate.getTime(), endDate: Egg.endDate.getTime()});
      } else if (!Egg.useWorker) {
      	Time.calcTime(Egg.currDate.getTime(), Egg.endDate.getTime());
         Egg.updateParts(Time);
      }              
   },
   workerUpdate: function(e) {
      var Time = e.data;
      Egg.updateParts(Time);
      Egg.workerLock = false;      
   },
   updateParts: function(Time) {
   	if (Time.totalSeconds < 0) {
      	clearInterval(Egg.ticker);
         Egg.onTimeComplete();
         return;
      }
      
      var yearText = (Time.remainingYears <= 0) ? "" : Time.remainingYears + " year";
      var yS = getSModifier(Time.remainingYears);
      
      var monthText = (Time.remainingMonths <= 0) ? "" : Time.remainingMonths + " month";
      var mS = getSModifier(Time.remainingMonths);
      
      var dayText = (Time.remainingDays <= 0) ? "" : Time.remainingDays + " day";
      var dS = getSModifier(Time.remainingDays);
      
      var hourText = (Time.remainingHours <= 0) ? "" : Time.remainingHours + " hour";
      var hS = getSModifier(Time.remainingHours);
      
      var minText = (Time.remainingMinutes <= 0) ? "" : Time.remainingMinutes + " minute";
      var nS = getSModifier(Time.remainingMinutes);
      
      var secText = (Time.remainingSeconds <= 0) ? "0 seconds" : Time.remainingSeconds + " second";
      var sS = getSModifier(Time.remainingSeconds);
      
      var slabel = (Egg.label && Egg.label != "") ? Egg.label + "<br />" : ""; //(mSequenceLabel != "") ? mSequenceLabel + "\n" : "";
      
      var timeText = slabel + yearText + yS + monthText + mS + 
                     dayText + dS + hourText + hS + 
                     minText + nS + secText + sS;
                                                    
      Egg.updateTitle(timeText);
      Egg.updateText(timeText);      
      
      Egg.progress = ((Egg.totalTime - Time.totalMilliseconds) / Egg.totalTime);
      Egg.updateProgressBar();
      
   	Egg.currDate = new Date();
   },
	updateTitle : function (time) {
      var title = (Egg.title && Egg.title !== "") ? Egg.title : time.split("<br />").join(" - ");
		document.title = title + " - E.ggtimer";
	},
	updateProgressBar : function () {
   	var wWidth = $(window).width();
      var wHeight = $(window).height();
		if (Egg.progressBar) {
         Egg.progressBar.width(wWidth * Egg.progress);
      }	
	},
   updateText: function(text) {
      //Egg.progressText.width($(window).width() - 60);
   	if (text) Egg.progressText.html(text);
      //Egg.progressText.css("top", $(window).height() / 2 - Egg.progressText.height() / 2 + 10);      
      //Egg.progressText.css("left", $(window).width() / 2 - Egg.progressText.width() / 2);
   },
	onTimeComplete : function () {
		Egg.progress = 1;
      Egg.updateTitle(Egg.expiredMessage);
      Egg.updateText(Egg.expiredMessage);
      Egg.updateProgressBar();
      
      if (Egg.beep && Egg.beep.play) {
         Egg.beep.volume = Egg.volume;
         Egg.beep.play();
      }
      
      Egg.showAlert();
	},
   showAlert : function() {
      alert (Egg.expiredMessage);
   }
};

function getSModifier(value) {
   var mod;
   if (value == 0){
      mod = "";
   }
   else if (value == 1){
      mod = " ";
   }
   else{
      mod = "s ";
   }
   
   return mod;
}

//DOM is ready
$(function() {   
   Egg.progressBar = $("#progress");
   Egg.staticArea = $("#static");
   Egg.staticArea.width($(window).width() - 20);
   Egg.staticArea.height($(window).height() - 20);
   Egg.progressText = $("#progressText");
   Egg.startButton = $("#progressText");
   Egg.updateText("");
   Egg.beep = document.getElementById("beepbeep");
   
   Egg.useWorker = false;
   
   /*(!!window.Worker && 
                   (!navigator.userAgent.match(/safari/i) && 
                    !navigator.userAgent.match(/opera/i)));*/
   
   $(window).bind("resize", window_RESIZE);
   window_RESIZE();
   
	if (navigator.userAgent.match(/iphone/i) || navigator.userAgent.match(/ipad/i)) {
      //Tap to enable sound
      Egg.updateText("Tap to Start");
      Egg.startButton.click(function() {
         if(Egg.beep && Egg.beep.load) {
            Egg.beep.load();
         }
         Egg.start();
         Egg.startButton.unbind("click");
      });
      Egg.startButton.show();
   } else {
      if (Egg.beep && Egg.beep.load) {
         Egg.beep.load();
      }
      Egg.start();
   }
});

//Window Resize
function window_RESIZE(e) {
	//Move stuff around
	Egg.staticArea.width($(window).width() - 20);
   Egg.staticArea.height($(window).height() - 20);
   Egg.updateText();
   Egg.updateProgressBar();   
}