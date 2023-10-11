CREATE DATABASE mopotietokanta;
USE mopotietokanta;
CREATE TABLE mopo (
  mopoId INT PRIMARY KEY,
  merkki VARCHAR(21) NOT NULL,
  arvostelu VARCHAR(7) NOT NULL,
  vuosimalli INT NOT NULL,
  varastoLkm INT NOT NULL
);
CREATE USER 'marjut' @'localhost' IDENTIFIED BY 'H4kM8iI2';
GRANT ALL PRIVILEGES ON mopotietokanta.* TO 'marjut' @'localhost';
INSERT INTO mopo (
    mopoId,
    merkki,
    arvostelu,
    vuosimalli,
    varastoLkm
  )
VALUES (5, 'Pappa 1', '*', 2011, 150);
INSERT INTO mopo (
    mopoId,
    merkki,
    arvostelu,
    vuosimalli,
    varastoLkm
  )
VALUES (3, 'Max Meteli', '*****', 1995, 350);
INSERT INTO mopo (
    mopoId,
    merkki,
    arvostelu,
    vuosimalli,
    varastoLkm
  )
VALUES (2, 'Mamma 10', '****', 2005, 70);
INSERT INTO mopo (
    mopoId,
    merkki,
    arvostelu,
    vuosimalli,
    varastoLkm
  )
VALUES (6, 'Xrossi 3', '***', 2000, 100);
INSERT INTO mopo (
    mopoId,
    merkki,
    arvostelu,
    vuosimalli,
    varastoLkm
  )
VALUES (7, 'Pärrä', '**', 1990, 130);
INSERT INTO mopo (
    mopoId,
    merkki,
    arvostelu,
    vuosimalli,
    varastoLkm
  )
VALUES (1, 'MotoX 2000', '*', 2017, 30);
INSERT INTO mopo (
    mopoId,
    merkki,
    arvostelu,
    vuosimalli,
    varastoLkm
  )
VALUES (4, 'Skooteri 95', '**', 2015, 50);
SELECT *
FROM mopo;
SELECT merkki,
  varastoLkm,
  mopoId
FROM mopo;
UPDATE mopo
SET merkki = 'Xrossi 3',
  vuosimalli = 1995
WHERE mopoId = 5;
UPDATE mopo
SET varastoLkm = 70,
  vuosimalli = 2010
WHERE mopoId = 7;
UPDATE mopo
SET arvostelu = '*',
  merkki = 'Max Meteli',
  varastoLkm = 100
WHERE mopoId = 6;
UPDATE mopo
SET arvostelu = '***',
  vuosimalli = 2012,
  varastoLkm = 50
WHERE mopoId = 1;
DELETE FROM mopo
WHERE mopoId = 3;
DELETE FROM mopo
WHERE mopoId = 5;
DELETE FROM mopo
WHERE vuosimalli = 2012;
DELETE FROM mopo
WHERE arvostelu = '*'
  OR arvostelu = '**';
DELETE FROM mopo
WHERE varastoLkm = 350
  OR vuosimalli = 2012
  OR varastoLkm = 100;