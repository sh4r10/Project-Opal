
function setTime(){
  var date = new Date()
  var hours = date.getHours();
  var minutes = date.getMinutes()
  if(minutes < 10){
    minutes = "0"+minutes;
  }
  else{$(".thetime").html(hours+":"+minutes);}
}

function setDate(){
  var date = new Date();

  var numdate = getOrdinalNum(date.getDate());
  $(".date").html(numdate);

  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  $(".month").html(months[date.getMonth()]);

  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var today =  days[date.getDay()];
  $(".day").html(today);
  $(".week").html(date.getWeek());
}

Date.prototype.getWeek = function() {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  var week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                        - 3 + (week1.getDay() + 6) % 7) / 7);
}

function getOrdinalNum(n) {
  return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
}
setTime();
setInterval(setTime, 999);
setDate();
