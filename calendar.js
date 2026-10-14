var monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

var yearInput = document.getElementById("year");
var monthSelect = document.getElementById("month");
var message = document.getElementById("message");
var calendarDiv = document.getElementById("calendar");

function generateCalendar() {
  var year = parseInt(yearInput.value, 10);
  var month = monthSelect.value;

  // Validation
  if (isNaN(year) || year < 1 || year > 9999) {
    message.textContent = "Please enter a valid year (1 - 9999).";
    calendarDiv.innerHTML = "";
    return;
  }
  if (month === "") {
    message.textContent = "Please select a month.";
    calendarDiv.innerHTML = "";
    return;
  }

  message.textContent = "";
  month = parseInt(month, 10);

  // Starting day of the month (0 = Sunday ... 6 = Saturday)
  var firstDay = new Date(year, month, 1).getDay();

  // Number of days in the month (day 0 of next month = last day of this month)
  var totalDays = new Date(year, month + 1, 0).getDate();

  // Build the table
  var html = "<h2>" + monthNames[month] + " " + year + "</h2>";
  html += "<table><thead><tr>";
  for (var i = 0; i < 7; i++) {
    html += "<th>" + dayNames[i] + "</th>";
  }
  html += "</tr></thead><tbody><tr>";

  // Empty cells before the 1st
  for (var e = 0; e < firstDay; e++) {
    html += "<td class='empty'></td>";
  }

  // Dates arranged in rows of 7
  var column = firstDay;
  for (var date = 1; date <= totalDays; date++) {
    var cls = column === 0 ? " class='sunday'" : "";
    html += "<td" + cls + ">" + date + "</td>";
    column++;

    if (column === 7 && date !== totalDays) {
      html += "</tr><tr>";
      column = 0;
    }
  }

  // Empty cells after the last date to complete the row
  while (column !== 7 && column !== 0) {
    html += "<td class='empty'></td>";
    column++;
  }

  html += "</tr></tbody></table>";
  calendarDiv.innerHTML = html;
}

function resetCalendar() {
  yearInput.value = "";
  monthSelect.value = "";
  message.textContent = "";
  calendarDiv.innerHTML = "";
}

document.getElementById("generateBtn").addEventListener("click", generateCalendar);
document.getElementById("resetBtn").addEventListener("click", resetCalendar);
