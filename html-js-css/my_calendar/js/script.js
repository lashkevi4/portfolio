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
  let today = new Date(); // текущая дата

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < firstDayOfMonth) || dayCounter > daysInMonth) {
        week[i].children[j].innerText = "";
        week[i].children[j].classList.remove('current-day');  // Удаляем класс 'current-day', если он был присвоен
        week[i].children[j].classList.remove('current-month');  // Удаляем класс 'current-month', если он был присвоен
      } else {
        week[i].children[j].innerText = dayCounter;
        week[i].children[j].classList.add('current-month');  // Добавляем класс 'current-month', так как все эти даты принадлежат текущему месяцу
        // Если текущий месяц и год совпадают с отображаемыми в календаре, и текущий день совпадает с dayCounter, добавить класс "current-day"
        if (currentDay.getFullYear() === today.getFullYear() && currentDay.getMonth() === today.getMonth() && today.getDate() === dayCounter) {
          week[i].children[j].classList.add('current-day');
        } else {
          week[i].children[j].classList.remove('current-day');  // Удаляем класс 'current-day', если он был присвоен
        }
        dayCounter++;
      }
    }
  }
}



let firstDay = new Date(currentDay.getFullYear(), currentDay.getMonth(), 1).getDay();
firstDay = firstDay === 0 ? 6 : firstDay - 1; // Воскресенье становится 6 (суббота), а остальные дни сдвигаются на 1
fillCalendar(new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, 0).getDate(), firstDay);


// Отображение текущего месяца и года
document.getElementById('currentMonthDisplay').textContent = `${currentMonthName} ${currentDay.getFullYear()}`;

function changeMonth(increment) {
  currentDay.setMonth(currentDay.getMonth() + increment);
  let firstDay = new Date(currentDay.getFullYear(), currentDay.getMonth(), 1).getDay();
  firstDay = firstDay === 0 ? 6 : firstDay - 1; // Воскресенье становится 6 (суббота), а остальные дни сдвигаются на 1
  fillCalendar(new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, 0).getDate(), firstDay);

  currentMonthName = monthNames[currentDay.getMonth()];
  document.getElementById('currentMonthDisplay').textContent = `${currentMonthName} ${currentDay.getFullYear()}`;
}

// Обработчики событий для кнопок навигации по месяцам
document.getElementById('prevMonth').addEventListener('click', function () { changeMonth(-1); });
document.getElementById('nextMonth').addEventListener('click', function () { changeMonth(1); });
