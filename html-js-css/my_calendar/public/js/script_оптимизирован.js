window.onload = function () {
  // Инициализация Firebase
  var firebaseConfig = {
    apiKey: "AIzaSyAnxFwT75ER7eH-t7AosrupsqBrr63iPtw",
    authDomain: "finn-calendar.firebaseapp.com",
    databaseURL: "https://finn-calendar-default-rtdb.firebaseio.com",
    projectId: "finn-calendar",
    storageBucket: "finn-calendar.appspot.com",
    messagingSenderId: "247106375727",
    appId: "1:247106375727:web:cc7ae66bc609d1d427b6da"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Get a reference to the database
  var database = firebase.database();
}

// 0. Задаем функции
function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

function saveEvent() {
  // Обрабатываем выбранный день
  const selectedDay = document.getElementById('selectedDay').textContent;
  console.log(`Selected day is: ${selectedDay}`);

  const eventItems = document.querySelectorAll('.event-item');

  eventItems.forEach((eventItem, i) => {
    const timeSlot = eventItem.children[0].textContent;
    const eventDescription = eventItem.children[1].value;
    console.log(`Event ${i}: ${timeSlot}, ${eventDescription}`);

    if (eventDescription) {
      const eventRef = database.ref('events/' + currentDay.getFullYear() + '/' + (currentDay.getMonth() + 1) + '/' + selectedDay + '/' + i);
      eventRef.set({
        timeSlot: timeSlot,
        description: eventDescription
      })
        .then(() => console.log('Data written successfully'))
        .catch((error) => console.log('Error writing data: ', error));
    }
  });

  // Закрываем модальное окно
  closeModal();
}

function cancelEvent() {
  console.log('Cancel button clicked');
  // Закрываем модальное окно
  closeModal();
}




// 1. Получаем текущую дату
let currentDay = new Date();

// 2. Массив с названиями месяцев
let monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
let currentMonthName = monthNames[currentDay.getMonth()];

// 3. Получаем ссылки на каждую секцию недели в HTML
let weeks = Array.from({ length: 6 }, (_, i) => document.getElementById(`week${i + 1}`));


// 4. Функция для заполнения календаря
function fillCalendar(daysInMonth, firstDayOfMonth) {
  let dayCounter = 1;
  let today = new Date();

  // Заполняем календарь числами
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < firstDayOfMonth) || dayCounter > daysInMonth) {
        weeks[i].children[j].innerText = "";
        weeks[i].children[j].classList.remove('current-day');
        weeks[i].children[j].classList.remove('current-month');
      } else {
        weeks[i].children[j].innerText = dayCounter;
        weeks[i].children[j].classList.add('current-month');
        if (currentDay.getFullYear() === today.getFullYear() && currentDay.getMonth() === today.getMonth() && today.getDate() === dayCounter) {
          weeks[i].children[j].classList.add('current-day');
        } else {
          weeks[i].children[j].classList.remove('current-day');
        }

        // Обработчик событий для открытия модального окна
        weeks[i].children[j].addEventListener('click', function () {
          openModal();
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
saveBtn.addEventListener('click', saveEvent); {
  console.log('Save button clicked');  // Старый log

  // Обрабатываем выбранный день
  var selectedDay = document.getElementById('selectedDay').textContent;
  console.log(`Selected day is: ${selectedDay}`);  // Новый log

  var eventItems = document.querySelectorAll('.event-item');

  eventItems.forEach((eventItem, i) => {
    var timeSlot = eventItem.children[0].textContent;
    var eventDescription = eventItem.children[1].value;
    console.log(`Event ${i}: ${timeSlot}, ${eventDescription}`);  // Новый log

    if (eventDescription) {
      var eventRef = database.ref('events/' + currentDay.getFullYear() + '/' + (currentDay.getMonth() + 1) + '/' + selectedDay + '/' + i);
      eventRef.set({
        timeSlot: timeSlot,
        description: eventDescription
      })
        .then(() => console.log('Data written successfully'))  // Новый log
        .catch((error) => console.log('Error writing data: ', error));  // Новый log
    }
  });

  closeModal();
};


// 12. Добавляем обработчик событий для кнопки 'Отмена'
cancelBtn.addEventListener('click', cancelEvent); {
  console.log('Cancel button clicked');
  closeModal();
};


// 13. Динамически заполняем промежутки времени в селекторе времени
var eventList = document.getElementById('event-list');

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


// 14. Add event listeners for day selection
weeks.forEach(week => {
  Array.from(week.children).forEach(day => {
    day.addEventListener('click', function () {
      console.log('Day clicked'); // Добавлено для отладки
      // Обновляем выбранный номер дня
      document.getElementById('selectedDay').textContent = day.textContent;

      // Получаем события для этого дня
      getEvents(currentDay.getFullYear(), currentDay.getMonth() + 1, parseInt(day.textContent));

      // Показываем модальное окно
      openModal();
    });
  });
});



// Function to get the events for a given day
function getEvents(year, month, day) {
  let dayRef = database.ref(`events/${year}/${month}/${day}`);

  dayRef.once('value', (snapshot) => {
    const data = snapshot.val();

    // Очищаем поля ввода в модальном окне
    resetModal();

    if (data) {
      // Заполняем модальное окно данными из Firebase
      for (let index in data) {
        let item = document.getElementById(`timeSlot${index}`);
        if (item && item.children && item.children[1]) {
          item.children[1].value = data[index].description;
        } else {
          console.error('Item or its children are undefined or null');
        }
      }
    }
  });
}


// Function to clear the input fields in the modal window
function resetModal() {
  let eventInputs = document.querySelectorAll('.event-input');
  eventInputs.forEach(input => {
    input.value = '';
  });
}





// let monthRef = database.ref('events/2023/7');

// monthRef.once('value', (snapshot) => {
//   const data = snapshot.val();
//   console.log(data);
// });
