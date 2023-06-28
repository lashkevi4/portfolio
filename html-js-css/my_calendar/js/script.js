// 1. Получаем текущую дату
let currentDay = new Date();

// 2. Массив с названиями месяцев
let monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
let currentMonthName = monthNames[currentDay.getMonth()];

// 3. Получаем ссылки на каждую секцию недели в HTML
let week1 = document.getElementById('week1');
let week2 = document.getElementById('week2');
let week3 = document.getElementById('week3');
let week4 = document.getElementById('week4');
let week5 = document.getElementById('week5');
let week6 = document.getElementById('week6');

// 4. Функция для заполнения календаря
function fillCalendar(daysInMonth, firstDayOfMonth) {
  let dayCounter = 1;
  let week = [week1, week2, week3, week4, week5, week6];
  let today = new Date();

  // Заполняем календарь числами
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < firstDayOfMonth) || dayCounter > daysInMonth) {
        week[i].children[j].innerText = "";
        week[i].children[j].classList.remove('current-day');
        week[i].children[j].classList.remove('current-month');
      } else {
        week[i].children[j].innerText = dayCounter;
        week[i].children[j].classList.add('current-month');
        if (currentDay.getFullYear() === today.getFullYear() && currentDay.getMonth() === today.getMonth() && today.getDate() === dayCounter) {
          week[i].children[j].classList.add('current-day');
        } else {
          week[i].children[j].classList.remove('current-day');
        }

        // Обработчик событий для открытия модального окна
        week[i].children[j].addEventListener('click', function () {
          modal.style.display = "block";
        });

        dayCounter++;
      }
    }
  }
}


// 5. Вычисляем первый день месяца и заполняем календарь
let firstDay = new Date(currentDay.getFullYear(), currentDay.getMonth(), 1).getDay();
firstDay = firstDay === 0 ? 6 : firstDay - 1;
fillCalendar(new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, 0).getDate(), firstDay);

// 6. Отображаем текущий месяц и год
document.getElementById('currentMonthDisplay').textContent = `${currentMonthName} ${currentDay.getFullYear()}`;

// 7. Функция для изменения месяца
function changeMonth(increment) {
  currentDay.setMonth(currentDay.getMonth() + increment);
  let firstDay = new Date(currentDay.getFullYear(), currentDay.getMonth(), 1).getDay();
  firstDay = firstDay === 0 ? 6 : firstDay - 1;
  fillCalendar(new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, 0).getDate(), firstDay);

  currentMonthName = monthNames[currentDay.getMonth()];
  document.getElementById('currentMonthDisplay').textContent = `${currentMonthName} ${currentDay.getFullYear()}`;
}

// 8. Обработчики событий для кнопок навигации по месяцам
document.getElementById('prevMonth').addEventListener('click', function () { changeMonth(-1); });
document.getElementById('nextMonth').addEventListener('click', function () { changeMonth(1); });

// 9. Обработчик событий для закрытия модального окна
var modal = document.getElementById('modal');

// 10. Получаем ссылки на кнопки в модальном окне
var saveBtn = document.getElementById('save-event');
var cancelBtn = document.getElementById('cancel');

// 11. Добавляем обработчик событий для кнопки 'Сохранить'
saveBtn.addEventListener('click', function () {
  console.log('Save button clicked');
  modal.style.display = "none";
});


// 12. Добавляем обработчик событий для кнопки 'Отмена'
cancelBtn.addEventListener('click', function () {
  console.log('Cancel button clicked');
  modal.style.display = "none";
});


// 13. Динамически заполняем промежутки времени в селекторе времени
var eventList = document.getElementById('event-list');

for (let i = 8; i < 20; i++) {
  let eventItem = document.createElement('label');
  eventItem.classList.add('event-item');

  let time = document.createElement('time');
  let timeText = i < 10 ? '0' + i : i;
  let nextTimeText = i + 1 < 10 ? '0' + (i + 1) : i + 1;
  time.textContent = `${timeText}:00 - ${nextTimeText}:00`;
  time.classList.add('event-time');

  let input = document.createElement('input');
  input.type = 'text';
  input.classList.add('event-input');

  eventItem.appendChild(time);
  eventItem.appendChild(input);

  eventList.appendChild(eventItem);
}

// 14. Добавляем обработчики событий для выбора даты
let days = document.querySelectorAll('.day');

days.forEach(day => {
  day.addEventListener('click', function () {
    // Обновляем номер выбранного дня
    document.getElementById('selectedDay').textContent = day.textContent;

    // Отображаем модальное окно
    modal.style.display = "block";
  });
});
