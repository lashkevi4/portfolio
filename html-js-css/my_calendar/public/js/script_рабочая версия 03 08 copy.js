let database;

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

function fillCalendar(daysInMonth, firstDayOfMonth) {
  let dayCounter = 1;
  let today = new Date();

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

        weeks[i].children[j].addEventListener('click', function () {
          openModal();
        });

        dayCounter++;
      }
    }
  }
}

function changeMonth(increment) {
  currentDay.setMonth(currentDay.getMonth() + increment);
  let firstDay = new Date(currentDay.getFullYear(), currentDay.getMonth(), 1).getDay();
  firstDay = firstDay === 0 ? 6 : firstDay - 1;
  fillCalendar(new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, 0).getDate(), firstDay);

  currentMonthName = monthNames[currentDay.getMonth()];
  document.getElementById('currentMonthDisplay').textContent = `${currentMonthName} ${currentDay.getFullYear()}`;
}

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

function resetModal() {
  console.log("resetModal called");

  const eventInputs = document.querySelectorAll('.event-input');

  eventInputs.forEach(input => {
    input.value = '';
  });
}

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

function cancelEvent() {
  console.log('Cancel button clicked');
  closeModal();
}

function getEvents(year, month, day) {
  let dayRef = database.ref(`events/${year}/${month}/${day}`);

  dayRef.once('value', (snapshot) => {
    const data = snapshot.val();


    if (data) {
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

let currentDay = new Date();

let monthNames = ["ЯНВАРЬ", "ФЕВРАЛЬ", "МАРТ", "АПРЕЛЬ", "МАЙ", "ИЮНЬ", "ИЮЛЬ", "АВГУСТ", "СЕНТЯБРЬ", "ОКТЯБРЬ", "НОЯБРЬ", "ДЕКАБРЬ"];
let currentMonthName = monthNames[currentDay.getMonth()];

let monthNamesGenitive = ['ЯНВАРЯ', 'ФЕВРАЛЯ', 'МАРТА', 'АПРЕЛЯ', 'МАЯ', 'ИЮНЯ', 'ИЮЛЯ', 'АВГУСТА', 'СЕНТЯБРЯ', 'ОКТЯБРЯ', 'НОЯБРЯ', 'ДЕКАБРЯ'];

let daysOfWeek = ['ВОСКРЕСЕНЬЕ', 'ПОНЕДЕЛЬНИК', 'ВТОРНИК', 'СРЕДА', 'ЧЕТВЕРГ', 'ПЯТНИЦА', 'СУББОТА'];

let weeks = Array.from({ length: 6 }, (_, i) => document.getElementById(`week${i + 1}`));

let firstDay = new Date(currentDay.getFullYear(), currentDay.getMonth(), 1).getDay();
firstDay = firstDay === 0 ? 6 : firstDay - 1;
fillCalendar(new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, 0).getDate(), firstDay);

document.getElementById('currentMonthDisplay').textContent = `${currentMonthName} ${currentDay.getFullYear()}`;

document.getElementById('prevMonth').addEventListener('click', function () { changeMonth(-1); });
document.getElementById('nextMonth').addEventListener('click', function () { changeMonth(1); });

let modal = document.getElementById('modal');

const saveBtn = document.getElementById('save-event');
const cancelBtn = document.getElementById('cancel');

saveBtn.addEventListener('click', saveEvent);

cancelBtn.addEventListener('click', cancelEvent);

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

weeks.forEach(week => {
  Array.from(week.children).forEach(day => {
    day.addEventListener('click', function () {
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

function getFullDate(date) {
  let dayOfWeek = daysOfWeek[date.getDay()];
  let day = date.getDate();
  let month = monthNamesGenitive[date.getMonth()];
  return `${dayOfWeek}, ${day} ${month}`;
}

