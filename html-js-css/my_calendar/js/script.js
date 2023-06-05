// Получаем текущую дату
let currentDay = new Date();

// Массив с названиями месяцев
let monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
let currentMonthName = monthNames[currentDay.getMonth()];

// Получаем ссылки на каждую секцию недели в HTML
let week1 = document.getElementById('week1');
let week2 = document.getElementById('week2');
let week3 = document.getElementById('week3');
let week4 = document.getElementById('week4');
let week5 = document.getElementById('week5');
let week6 = document.getElementById('week6');

function fillCalendar(daysInMonth, firstDayOfMonth) {
  let dayCounter = 1;
  let week = [week1, week2, week3, week4, week5, week6];

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < firstDayOfMonth) || dayCounter > daysInMonth) {
        week[i].children[j].innerText = "";
      } else {
        week[i].children[j].innerText = dayCounter;
        dayCounter++;
      }
    }
  }
}

fillCalendar(new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, 0).getDate(), new Date(currentDay.getFullYear(), currentDay.getMonth(), 1).getDay());

// Отображение текущего месяца и года
document.getElementById('currentMonthDisplay').textContent = `${currentMonthName} ${currentDay.getFullYear()}`;

function changeMonth(increment) {
  currentDay.setMonth(currentDay.getMonth() + increment);
  fillCalendar(new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, 0).getDate(), new Date(currentDay.getFullYear(), currentDay.getMonth(), 1).getDay());
  currentMonthName = monthNames[currentDay.getMonth()];
  document.getElementById('currentMonthDisplay').textContent = `${currentMonthName} ${currentDay.getFullYear()}`;
}

// Обработчики событий для кнопок навигации по месяцам
document.getElementById('prevMonth').addEventListener('click', function () { changeMonth(-1); });
document.getElementById('nextMonth').addEventListener('click', function () { changeMonth(1); });
