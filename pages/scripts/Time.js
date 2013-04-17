var Time = {
   MILLISECONDS: 1,
   SECONDS: 1000,
   MINUTES:  1000 * 60,
   HOURS:  60000 * 60,
   DAYS:  3600000 * 24,
   
   daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
   
   totalYears: 0,
   remainingYears: 0,
   
   totalMonths: 0,
   remainingMonths: 0,
   
   totalDays: 0,
   remainingDays: 0,
   
   totalHours: 0,
   remainingHours: 0,
   
   totalMinutes: 0,
   remainingMinutes: 0,
   
   totalSeconds: 0,
   remainingSeconds: 0,
   
   totalMilliseconds: 0,
   remainingMilliseconds: 0,
   
   calcTime: function (startTime, endTime) {
   	startDate = new Date(startTime);
      endDate = new Date(endTime);
      var diff = endDate.getTime() - startDate.getTime();
      
      Time.totalMilliseconds = diff / Time.MILLISECONDS;
      Time.totalSeconds = diff / Time.SECONDS;
      Time.totalMinutes = diff / Time.MINUTES;
      Time.totalHours = diff / Time.HOURS;
      Time.totalDays = diff / Time.DAYS;
      Time.totalMonths = Time.calcTotalMonths(Time.totalDays, startDate);
      Time.totalYears = Time.totalMonths / 12;
      
      Time.remainingYears = int (Time.totalYears);
      Time.remainingMonths = int (Time.totalMonths - (Time.remainingYears * 12));
      Time.remainingDays = int (Time.totalDays - Time.getDaysFromMonths(startDate, Time.totalMonths));
      Time.remainingHours = int (Time.totalHours - (int(Time.totalDays) * 24));
      Time.remainingMinutes = int (Time.totalMinutes - (int(Time.totalHours) * 60));
      Time.remainingSeconds = int (Time.totalSeconds - (int(Time.totalMinutes) * 60));
      Time.remainingMilliseconds = int (Time.totalMilliseconds - (int(Time.totalSeconds) * 1000));
   },
   
   isLeapYear: function(year){
      return ( ((year)>0) && !((year)%4) && ( ((year)%100) || !((year)%400) ) )
   },
   
   calcTotalMonths: function(totalDays, startDate) {
      var sMonth = startDate.getMonth();
      var sYear = startDate.getFullYear();
      var cMonth = sMonth;
      var cYear = sYear;
      var counter = 0;
      
      while (totalDays > Time.daysInMonth[cMonth]) {
         totalDays -= Time.daysInMonth[cMonth];
         if (cMonth == 2 && Time.isLeapYear(cYear)) {
            totalDays -= 1;
         }
         
         cMonth++;
         
         if (cMonth == 12) {
            cMonth = 0;
            cYear++;
         }
         
         counter++;
      }
      
      var leftOver = totalDays / Time.daysInMonth[cMonth];
      
      return counter + leftOver;
   },
   
   getDaysFromMonths: function(startDate, totalMonths){
      totalMonths = int(totalMonths);
      var sMonth = startDate.getMonth();
      var sYear = startDate.getFullYear();
      var cMonth = sMonth;
      var cYear = sYear;
      var dayCount = 0;
      
      for (var i = 0; i < totalMonths; i++){
         dayCount += Time.daysInMonth[cMonth];
         if (cMonth == 2 && Time.isLeapYear(cYear)){
            dayCount += 1;
         }
         
         cMonth++;
         
         if (cMonth == 12){
            cMonth = 0;
            cYear++;
         }
      }
      
      return dayCount;
   } 
};

function int(number) {
	return Math.floor(number);
}