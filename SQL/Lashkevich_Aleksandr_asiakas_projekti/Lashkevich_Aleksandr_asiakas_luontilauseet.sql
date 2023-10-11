CREATE DATABASE asiakastietokanta;
USE pelitietokanta;
CREATE TABLE asiakas (
  asiakasnumero INT PRIMARY KEY,
  etunimi VARCHAR(6) NOT NULL,
  sukunimi VARCHAR(11) NOT NULL,
  tyyppi VARCHAR(19) NOT NULL,
  osoite VARCHAR(14) NOT NULL
);
GRANT ALL PRIVILEGES ON asiakastietokanta.* TO 'daniel' @'localhost' IDENTIFIED BY 'j8mYEs5B';
INSERT INTO asiakas (asiakasnumero, etunimi, sukunimi, tyyppi, osoite)
VALUES (
    6,
    'Pirkko',
    'Aakkonen',
    'kierrettävä kaukaa',
    'Maantie 1234'
  );
SELECT *
FROM asiakas;
INSERT INTO asiakas (asiakasnumero, etunimi, sukunimi, tyyppi, osoite)
VALUES (
    3,
    'Matti',
    'Jokinen',
    'välteltävä',
    'Datatie 56'
  );
SELECT *
FROM asiakas;
INSERT INTO asiakas (asiakasnumero, etunimi, sukunimi, tyyppi, osoite)
VALUES (2, 'Meri', 'Rantala', 'VIP', 'Datatie 35');
SELECT *
FROM asiakas;
INSERT INTO asiakas (asiakasnumero, etunimi, sukunimi, tyyppi, osoite)
VALUES (
    5,
    'Tuuli',
    'Hökki',
    'kultakimpale',
    'Koodipolku 200'
  );
SELECT *
FROM asiakas;
INSERT INTO asiakas (asiakasnumero, etunimi, sukunimi, tyyppi, osoite)
VALUES (
    7,
    'Rauha',
    'Puro',
    'edustava asiakas',
    'Rantakatu 3'
  );
SELECT *
FROM asiakas;
INSERT INTO asiakas (asiakasnumero, etunimi, sukunimi, tyyppi, osoite)
VALUES (
    1,
    'Aapeli',
    'Nieminen',
    'superbonus',
    'Korvenperä 9'
  );
SELECT *
FROM asiakas;
INSERT INTO asiakas (asiakasnumero, etunimi, sukunimi, tyyppi, osoite)
VALUES (
    4,
    'Leila',
    'Virtanen',
    'tavallinen tallaaja',
    'Koodipolku 2'
  );
SELECT *
FROM asiakas;
SELECT sukunimi,
  etunimi,
  asiakasnumero
FROM asiakas;
SELECT *
FROM asiakas
WHERE sukunimi = 'Aakkonen';
SELECT *
FROM asiakas
WHERE osoite = 'Koodipolku 200';
SELECT *
FROM asiakas
WHERE sukunimi = 'Virtanen';
UPDATE asiakas
SET sukunimi = 'Puro',
  etunimi = 'Meri'
WHERE asiakasnumero = 7;
SELECT *
FROM asiakas;
UPDATE asiakas
SET etunimi = 'Leila',
  osoite = 'Datatie 56'
WHERE asiakasnumero = 2;
SELECT *
FROM asiakas;
UPDATE asiakas
SET etunimi = 'Pirkko',
  tyyppi = 'tavallinen tallaaja',
  sukunimi = 'Jokinen'
WHERE asiakasnumero = 3;
SELECT *
FROM asiakas;
UPDATE asiakas
SET etunimi = 'Matti',
  tyyppi = 'edustava asiakas',
  sukunimi = 'Jokinen'
WHERE asiakasnumero = 7;
SELECT *
FROM asiakas;
DELETE FROM asiakas
WHERE asiakasnumero = 6;
SELECT *
FROM asiakas;
DELETE FROM asiakas
WHERE asiakasnumero = 1;
SELECT *
FROM asiakas;
DELETE FROM asiakas
WHERE tyyppi = 'kultakimpale';
SELECT *
FROM asiakas;
DELETE FROM asiakas
WHERE osoite = 'Maantie 1234'
  AND sukunimi = 'Jokinen';
SELECT *
FROM asiakas;
DELETE FROM asiakas
WHERE etunimi = 'Rauha'
  OR etunimi = 'Meri'
  OR osoite = 'Maantie 1234';
SELECT *
FROM asiakas;