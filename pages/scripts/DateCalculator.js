importScripts("/scripts/Time.js");

onmessage = function(e) {
	Time.calcTime(e.data.startDate, e.data.endDate);
   done();
};

function done() {
	postMessage(Time);
}