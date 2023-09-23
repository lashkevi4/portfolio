mysql - P 3306 - h bestfruit.ru - u bestfruit_mycalendar - p bestfruit_mycalendar;
--
show databases;
--
use bestfruit_mycalendar;
--
CREATE TABLE events (
id INT PRIMARY KEY AUTO_INCREMENT,
event_day DATE NOT NULL,
start_time TIME NOT NULL,
description VARCHAR(40)
);
--
show tables;
--
INSERT INTO events (event_day, start_time, description) VALUES ('2023-07-01', '10:00:00', 'Пример события');
--
SELECT * FROM events;