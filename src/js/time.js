/**
 * Created by alvinm on 7/11/16.
 */
function getTime() {
  var today = new Date();
  var monthNum = today.getUTCMonth();
  var day = today.getUTCDate();
  var year = today.getUTCFullYear();
  var curTime = today.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});

  var time = document.getElementById('time');
  time.innerHTML = curTime;

  var month = toMonthString(monthNum);

  var date = document.getElementById('date');
  date.innerHTML = month + ' ' + day + ', ' + year;

  setTimeout(getTime, 500);
}

function toMonthString(month) {
  switch(month) {
    case 1:
      return 'January';
    case 2:
      return 'February';
    case 3:
      return 'March';
    case 4:
      return 'April';
    case 5:
      return 'May';
    case 6:
      return 'June';
    case 7:
      return 'July';
    case 8:
      return 'August';
    case 9:
      return 'September';
    case 10:
      return 'October';
    case 11:
      return 'November';
    case 12:
      return 'December';
  }
}