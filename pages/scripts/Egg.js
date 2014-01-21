var Egg = {
	name : "EggTimer",
	updateTitle : function (time) {
		document.title = time + " : E.gg Timer";
	},
	onTimeComplete : function (label) {
      label = (!label || label === "" || label === "null") ? "E.gg Timer" : label;
		Egg.updateTitle("Time Expired : " + label);
        var alertbool = $.cookie("alertBox");
        if (!alertbool || alertbool === "true") {
            alert ("Time Expired : " + label);
        }
	},
    setSoundType : function(type) {
      type = type.toLowerCase();
      if (type === "beep" || type === "ring") {
         $.cookie("soundType", type, { expires: 730, path: '/' });
      }
    },
    setSoundVolume : function(vol) {
      $.cookie("soundVolume", vol, { expires: 730, path: '/' });
    },
    setAlertBox : function(bool) {
        $.cookie("alertBox", bool, { expires: 730, path: '/' });
    }
};

$(function() {
   $("input[name='soundType']").change(function() {
      Egg.setSoundType($("input[name='soundType']:checked").val());
   });
   
   $("input[name='soundVolume']").change(function() {
      Egg.setSoundVolume($("input[name='soundVolume']:checked").val());
   });

   $("input[name='alertBox']").change(function() {
      Egg.setAlertBox($("input[name='alertBox']:checked").val());
   });
});