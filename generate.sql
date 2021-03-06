﻿CREATE DATABASE db;

use db;

CREATE TABLE `administrators` (`id` int(12) NOT NULL,
 `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
 `Surname` varchar(255) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `cars` (`Registration_number` varchar(255) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL UNIQUE,
 `Year_of_production` int(11) NOT NULL,
 `Technical_condition` enum('good','broken') NOT NULL DEFAULT 'good',
 `Type` varchar(255) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
 PRIMARY KEY (`Registration_number`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `clients` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `Name` varchar(255) NOT NULL,
 `Surname` varchar(255) NOT NULL,
 `Adress` varchar(255) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
 `Packages_received` int(11) NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

CREATE TABLE `couriers` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
 `Surname` varchar(255) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

CREATE TABLE `couriers_in_work` (
 `registration_number` varchar(255) NOT NULL,
 `empleyee_id` int(11) NOT NULL,
 PRIMARY KEY (`registration_number`,`empleyee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `managers` (
 `id` int(11) NOT NULL,
 `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
 `Surname` varchar(255) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `orders` (
 `Package_id` int(11) NOT NULL,
 `Client_id` int(11) NOT NULL,
 `Courier_id` int(11),
 PRIMARY KEY (`Package_id`,`Client_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `package` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `Weight` double NOT NULL,
 `Value` double NOT NULL,
 `Size` double NOT NULL,
 `State` enum( 'taken_from_client','in magazine','waiting for courier', 'in_delivery' ,'delivered' ) NOT NULL DEFAULT 'waiting for courier',
 `Delivery_Address` varchar(255) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
 `Delivery_Person` varchar(255) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

CREATE TABLE `packages_by_courier` (
 `courier_id` int(11) NOT NULL,
 `package_id` int(11) NOT NULL,
 PRIMARY KEY (`courier_id`,`package_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `packages_in_car` (
 `registration_number` varchar(255) NOT NULL,
 `package_id` int(11) NOT NULL,
 PRIMARY KEY (`registration_number`,`package_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `users` (
 `id` int AUTO_INCREMENT NOT NULL,
 `user_type` enum('client','manager','admin', 'courier') NOT NULL,
 `login` varchar(255) NOT NULL,
 `password` varchar(255) NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


INSERT INTO administrators(id,Name, Surname) VALUES (1,'Admin1', 'Admin1');
INSERT INTO administrators(id,Name, Surname) VALUES (2,'Admin2', 'Admin2');

INSERT INTO cars(Registration_number, Year_of_production, Technical_condition, Type) VALUES ('ABCDE 57', 2005, 'good','Ford');
INSERT INTO cars(Registration_number, Year_of_production, Technical_condition, Type) VALUES ('25 EFR 07', 2014, 'good','Ford');
INSERT INTO cars(Registration_number, Year_of_production, Technical_condition, Type) VALUES ('ABGBH E4', 2014, 'good','Ford');

INSERT INTO clients(id,Name,Surname,Adress, Packages_received) VALUES (8,"Adam","Abacki","Stalowa 17", 3);
INSERT INTO clients(id,Name,Surname,Adress, Packages_received) VALUES (9,"Bartek","Babacki","Miedziana 33", 3);
INSERT INTO clients(id,Name,Surname,Adress, Packages_received) VALUES (10,"Czarek","Cabacki","Aluminiowa 24", 3);
INSERT INTO clients(id,Name,Surname,Adress, Packages_received) VALUES (11,"Dariusz","Dabacki","Żelazna 86", 3);

INSERT INTO couriers (id, Name,Surname) VALUES (3,'Kurier1','Kurierowy');
INSERT INTO couriers (id, Name,Surname) VALUES (4,'Kurier2','Doręczyciel');
INSERT INTO couriers (id, Name,Surname) VALUES (5,'Kurier3','Błyskawica');

INSERT INTO managers (id, Name,Surname) VALUES (6,'Manager1','Zarządca');
INSERT INTO managers (id, Name,Surname) VALUES (7,'Manager2','Prezes');

INSERT INTO package (id, Weight, Value, Size, State, Delivery_Address, Delivery_Person) VALUES (1,3.5,53,67,'In magazine' , 'ul. Zielona 12, 02-222 Warszawa', 'Jan Kowalski');
INSERT INTO package (id, Weight, Value, Size, State, Delivery_Address, Delivery_Person) VALUES (2,5,100,42,'In magazine' , 'ul. Czerwona 30, 01-111 Gdańsk', 'Martin Smith');
INSERT INTO package (id, Weight, Value, Size, State, Delivery_Address, Delivery_Person) VALUES (3,80,87,400,'In magazine', 'ul. Szara 4, 08-888 Toruń', 'Piotr Nowak');
INSERT INTO package (id, Weight, Value, Size, State, Delivery_Address, Delivery_Person) VALUES (4,2,3000,50,'In magazine', 'ul. Tęczowa 31, 03-333 Wrocław', 'Krzysztof Turek');

INSERT INTO users ( id, user_type, login, password) VALUES (1, 'admin', 'Admin1', 'haslo');
INSERT INTO users ( id, user_type, login, password) VALUES (2, 'admin', 'Admin2', 'wd40');
INSERT INTO users ( id, user_type, login, password) VALUES (3, 'courier', 'Kurier1','amarena');
INSERT INTO users ( id, user_type, login, password) VALUES (4, 'courier', 'Kurier2','amarena2');
INSERT INTO users ( id, user_type, login, password) VALUES (5, 'courier', 'Kurier3','amarena3');
INSERT INTO users ( id, user_type, login, password) VALUES (6, 'manager', 'Manager1','water1');
INSERT INTO users ( id, user_type, login, password) VALUES (7, 'manager', 'Manager2','water2');
INSERT INTO users ( id, user_type, login, password) VALUES (8, 'client', 'User1','abc1');
INSERT INTO users ( id, user_type, login, password) VALUES (9, 'client', 'User2','clientTest2');
INSERT INTO users ( id, user_type, login, password) VALUES (10, 'client', 'User3','clientTest3');
INSERT INTO users ( id, user_type, login, password) VALUES (11, 'client', 'User4','clientTest4');

INSERT INTO orders (Package_id, Client_id, Courier_id) VALUES (1, 8, 3);
INSERT INTO orders (Package_id, Client_id, Courier_id) VALUES (2, 8, 3);
INSERT INTO orders (Package_id, Client_id, Courier_id) VALUES (3, 9, 3);
INSERT INTO orders (Package_id, Client_id) VALUES (4, 10);
