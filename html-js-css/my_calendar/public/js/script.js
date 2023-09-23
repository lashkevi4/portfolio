// --------- проверить не конфликтуют ли 8 9 и 19 20 ----------

// 1 Объявляем переменную на глобальном уровне
let database;

// 2 Инициализация Firebase при загрузке страницы / Firebase Initialization on Page Load
window.onload = function () {
  const firebaseConfig = {
    apiKey: "AIzaSyAnxFwT75ER7eH-t7AosrupsqBrr63iPtw",
    authDomain: "finn-calendar.firebaseapp.com",
    databaseURL: "https://finn-calendar-default-rtdb.firebaseio.com",
    projectId: "finn-calendar",
    storageBucket: "finn-calendar.appspot.com",
    messagingSenderId: "247106375727",
    appId: "1:247106375727:web:cc7ae66bc609d1d427b6da"
  };

  firebase.initializeApp(firebaseConfig);

  database = firebase.database();
}

// 3 Заполнить Календарь Днями - fillCalendarWithDays
function fillCalendar(daysInMonth, firstDayOfMonth) {
  let dayCounter = 1;
  let today = new Date();

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < firstDayOfMonth) || dayCounter > daysInMonth) {
        weeks[i].children[j].innerText = "";
        weeks[i].children[j].classList.remove('current-day');
        weeks[i].children[j].classList.remove('current-month');
        weeks[i].children[j].removeEventListener('click', clickOnDay); // удаляем обработчик события, если он уже был установлен
      } else {
        weeks[i].children[j].innerText = dayCounter;
        weeks[i].children[j].classList.add('current-month');
        if (currentDay.getFullYear() === today.getFullYear() && currentDay.getMonth() === today.getMonth() && today.getDate() === dayCounter) {
          weeks[i].children[j].classList.add('current-day');
        } else {
          weeks[i].children[j].classList.remove('current-day');
        }

        weeks[i].children[j].addEventListener('click', clickOnDay); // добавляем обработчик события

        dayCounter++;
      }
    }
  }
}



// 4 Изменить Месяц - changeMonth
function changeMonth(increment) {
  currentDay.setMonth(currentDay.getMonth() + increment);
  let firstDay = new Date(currentDay.getFullYear(), currentDay.getMonth(), 1).getDay();
  firstDay = firstDay === 0 ? 6 : firstDay - 1;
  fillCalendar(new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, 0).getDate(), firstDay);

  currentMonthName = monthNames[currentDay.getMonth()];
  document.getElementById('currentMonthDisplay').textContent = `${currentMonthName} ${currentDay.getFullYear()}`;
}

// 5 Открытие модального окна
function openModal() {
  modal.style.display = "block";
}

// 6 Закрытие модального окна
function closeModal() {
  modal.style.display = "none";
}

// 7 Сброс данных модального окна
function resetModal() {
  console.log("resetModal called");

  // Получаем все элементы ввода в модальном окне
  const eventInputs = document.querySelectorAll('.event-input');

  // Очищаем каждое поле ввода
  eventInputs.forEach(input => {
    input.value = '';
  });
}

// 8 Обработка нажатия кнопки SAVE / Handle Save Button Click
function saveEvent() {
  console.log('saveEvent called');

  const selectedDay = document.getElementById('selectedDay').textContent;
  const eventItems = document.querySelectorAll('.event-item');

  eventItems.forEach((eventItem, i) => {
    const timeSlot = eventItem.children[0].textContent;
    const eventDescription = eventItem.children[1].value;

    const path = `events/${currentDay.getFullYear()}/${currentDay.getMonth() + 1}/${selectedDay}/${i}`;
    const eventRef = database.ref(path);

    if (eventDescription && eventDescription.trim() !== '') {
      eventRef.set({
        timeSlot: timeSlot,
        description: eventDescription
      })
        .then(() => console.log(`Данные успешно записаны в: ${path}`))
        .catch((error) => console.log(`Ошибка при записи данных: ${error}, Не удалось записать данные в: ${path}`));
    } else {
      eventRef.remove()
        .then(() => console.log(`Данные успешно удалены из: ${path}`))
        .catch((error) => console.log(`Ошибка при удалении данных: ${error}, Не удалось удалить данные из: ${path}`));
    }
  });

  console.log('saveEvent finished');
  closeModal();
}

// 9 Обработка нажатия кнопки CANCEL / Handle Cancel Button Click
function cancelEvent() {
  console.log('Cancel button clicked');
  closeModal();
}

// 10 Загрузка событий в модальное окно / Load Events Into Modal
function getEvents(year, month, day) {
  let dayRef = database.ref(`events/${year}/${month}/${day}`);

  dayRef.once('value', (snapshot) => {
    const data = snapshot.val();

    // Очищаем поля ввода в модальном окне
    // resetModal();

    if (data) {
      // Заполняем модальное окно данными из Firebase
      let eventItems = document.querySelectorAll('.event-item');

      for (let index in data) {
        if (eventItems[index]) {
          let eventDescription = eventItems[index].children[1];
          if (eventDescription) {
            eventDescription.value = data[index].description;
          } else {
            console.error('eventDescription is undefined or null');
          }
        } else {
          console.error(`eventItem at index ${index} is undefined or null`);
        }
      }
    }
  });
}

// 11 Получаем текущую дату
let currentDay = new Date();

// 12 Массив с названиями месяцев и дней недели
let monthNames = ["ЯНВАРЬ", "ФЕВРАЛЬ", "МАРТ", "АПРЕЛЬ", "МАЙ", "ИЮНЬ", "ИЮЛЬ", "АВГУСТ", "СЕНТЯБРЬ", "ОКТЯБРЬ", "НОЯБРЬ", "ДЕКАБРЬ"];
let currentMonthName = monthNames[currentDay.getMonth()];

let monthNamesGenitive = ['ЯНВАРЯ', 'ФЕВРАЛЯ', 'МАРТА', 'АПРЕЛЯ', 'МАЯ', 'ИЮНЯ', 'ИЮЛЯ', 'АВГУСТА', 'СЕНТЯБРЯ', 'ОКТЯБРЯ', 'НОЯБРЯ', 'ДЕКАБРЯ'];

let daysOfWeek = ['ВОСКРЕСЕНЬЕ', 'ПОНЕДЕЛЬНИК', 'ВТОРНИК', 'СРЕДА', 'ЧЕТВЕРГ', 'ПЯТНИЦА', 'СУББОТА'];

// 13 Получаем ссылки на каждую секцию недели в HTML
let weeks = Array.from({ length: 6 }, (_, i) => document.getElementById(`week${i + 1}`));

// 14 Вычисление и установка начала месяца /Calculate and Set Start of Month
let firstDay = new Date(currentDay.getFullYear(), currentDay.getMonth(), 1).getDay();
firstDay = firstDay === 0 ? 6 : firstDay - 1;
fillCalendar(new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, 0).getDate(), firstDay);

// 15 Обновление отображаемого месяца и года / Update Displayed Month and Year
document.getElementById('currentMonthDisplay').textContent = `${currentMonthName} ${currentDay.getFullYear()}`;

// 16 Навигация по месяцам / Month Navigation
document.getElementById('prevMonth').addEventListener('click', function () { changeMonth(-1); });
document.getElementById('nextMonth').addEventListener('click', function () { changeMonth(1); });

// 17 Обработчик событий для закрытия модального окна
let modal = document.getElementById('modal');

// 18 Получаем ссылки на кнопки в модальном окне
const saveBtn = document.getElementById('save-event');
const cancelBtn = document.getElementById('cancel');

// 19 Обработчик событий для кнопки 'Сохранить'
saveBtn.addEventListener('click', saveEvent);

// 20 Обработчик событий для кнопки 'Отмена'
cancelBtn.addEventListener('click', cancelEvent);

// 21 Генерация промежутков времени в модальном окне
let eventList = document.getElementById('event-list');

for (let i = 8; i < 20; i++) {
  let timeText = i < 10 ? '0' + i : i;
  let nextTimeText = i + 1 < 10 ? '0' + (i + 1) : i + 1;

  eventList.innerHTML += `
      <label class="event-item">
        <time class="event-time">${timeText}:00 - ${nextTimeText}:00</time>
        <input type="text" class="event-input">
      </label>
    `;
}

// 22 Обработка событий всей недели
weeks.forEach(week => {
  Array.from(week.children).forEach(day => {
    day.addEventListener('click', function () {
      // Проверяем, не пустой ли элемент, прежде чем продолжать.
      if (day.textContent.trim() === '') {
        return;
      }

      console.log('Day clicked');

      currentDay.setDate(parseInt(day.textContent));

      let fullDate = getFullDate(currentDay);

      document.getElementById('modalDateDisplay').textContent = fullDate;

      document.getElementById('selectedDay').textContent = day.textContent;

      resetModal();

      getEvents(currentDay.getFullYear(), currentDay.getMonth() + 1, parseInt(day.textContent));

      openModal();
    });
  });
});



// функция для получения полной даты
function getFullDate(date) {
  let dayOfWeek = daysOfWeek[date.getDay()];
  let day = date.getDate();
  let month = monthNamesGenitive[date.getMonth()];
  return `${dayOfWeek}, ${day} ${month}`;
}

// 23 Обработчики событий для изменения иконки при наведении мыши
let homeButton = document.querySelector("#home .navigation-item-button");

let prevMonthButton = document.querySelector("#prevMonth .navigation-item-button");

let nextMonthButton = document.querySelector("#nextMonth .navigation-item-button");

let infoButton = document.querySelector("#info .navigation-item-button");


homeButton.addEventListener('mouseover', function () {
  this.querySelector('img').src = "./img/home-w.png";
});

homeButton.addEventListener('mouseout', function () {
  this.querySelector('img').src = "./img/home.png";
});


prevMonthButton.addEventListener('mouseover', function () {
  this.querySelector('img').src = "./img/left-w.png";
});

prevMonthButton.addEventListener('mouseout', function () {
  this.querySelector('img').src = "./img/left.png";
});


nextMonthButton.addEventListener('mouseover', function () {
  this.querySelector('img').src = "./img/right-w.png";
});

nextMonthButton.addEventListener('mouseout', function () {
  this.querySelector('img').src = "./img/right.png";
});


infoButton.addEventListener('mouseover', function () {
  this.querySelector('img').src = "./img/info-w.png";
});

infoButton.addEventListener('mouseout', function () {
  this.querySelector('img').src = "./img/info.png";
});




// 24 обработчик кликов по дням в календаре
function clickOnDay() {
  console.log('Day clicked');

  if (this.textContent.trim() === '') { // проверяем, является ли день пустым
    return; // если да, то не делаем ничего
  }

  currentDay.setDate(parseInt(this.textContent));

  let fullDate = getFullDate(currentDay);

  document.getElementById('modalDateDisplay').textContent = fullDate;

  document.getElementById('selectedDay').textContent = this.textContent;

  resetModal();

  getEvents(currentDay.getFullYear(), currentDay.getMonth() + 1, parseInt(this.textContent));

  openModal();
}

weeks.forEach(week => {
  Array.from(week.children).forEach(day => {
    day.addEventListener('click', clickOnDay);
  });
});
