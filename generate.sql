CREATE DATABASE db;

CREATE TABLE `administrators` (`id` int(12) NOT NULL,
 `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
 `Surname` varchar(255) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
 `Salary` double NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `cars` (`Registration_number` varchar(255) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
 `Year_of_production` int(11) NOT NULL,
 `Technical_condition` enum('good','broken') NOT NULL DEFAULT 'good',
 `Type` varchar(255) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
 PRIMARY KEY (`Registration_number`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `clients` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `Name` varchar(255) NOT NULL,
 `Surname` varchar(255) NOT NULL,
 `Adress` varchar(255) NOT NULL,
 `Packages_received` int(11) NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

CREATE TABLE `couriers` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
 `Surname` varchar(255) CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
 `Salary` double NOT NULL,
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
 `Salary` double NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `orders` (
 `Package_id` int(11) NOT NULL,
 `Client_id` int(11) NOT NULL,
 `Courier_id` int(11) NOT NULL,
 PRIMARY KEY (`Package_id`,`Client_id`,`Courier_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `package` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `Weight` double NOT NULL,
 `Value` double NOT NULL,
 `Size` double NOT NULL,
 `State` enum('in magazine','translate','delivered') NOT NULL DEFAULT 'in magazine',
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
 `Login` varchar(255) NOT NULL,
 `Password` varchar(255) NOT NULL,
 `Email` varchar(255) NOT NULL,
 PRIMARY KEY (`Login`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


INSERT INTO administrators(id,Name, Surname, Salary) VALUES (1,'Admin1', 'Admin1', 1000);
INSERT INTO administrators(id,Name, Surname, Salary) VALUES (2,'Admin2', 'Admin2', 2000);

INSERT INTO cars(Registration_number, Year_of_production, Technical_condition, Type) VALUES ('ABCDE 57', 2005, 'good','Ford');
INSERT INTO cars(Registration_number, Year_of_production, Technical_condition, Type) VALUES ('25 EFR 07', 2014, 'good','Ford');
INSERT INTO cars(Registration_number, Year_of_production, Technical_condition, Type) VALUES ('ABGBH E4', 2014, 'good','Ford');

INSERT INTO clients(id,Name,Surname,Adress, Packages_received) VALUES (1,"Adam","Abacki","Stalowa 17", 3);
INSERT INTO clients(id,Name,Surname,Adress, Packages_received) VALUES (2,"Bartek","Babacki","Miedziana 33", 3);
INSERT INTO clients(id,Name,Surname,Adress, Packages_received) VALUES (3,"Czarek","Cabacki","Aluminiowa 24", 3);
INSERT INTO clients(id,Name,Surname,Adress, Packages_received) VALUES (4,"Dariusz","Dabacki","�elazna 86", 3);

INSERT INTO couriers (id, Name,Surname,Salary) VALUES (1,'Kurier1','Kurierowy',2200 );
INSERT INTO couriers (id, Name,Surname,Salary) VALUES (2,'Kurier2','Dor�czyciel',1700 );
INSERT INTO couriers (id, Name,Surname,Salary) VALUES (3,'Kurier3','B�yskawica',1950 );

INSERT INTO managers (id, Name,Surname,Salary) VALUES (1,'Manager1','Zarz�dca',3500 );
INSERT INTO managers (id, Name,Surname,Salary) VALUES (2,'Manager2','Prezes',1600 );

INSERT INTO package (id, Weight, Value, Size, State) VALUES (1,3.5,53,67,'In magazine');
INSERT INTO package (id, Weight, Value, Size, State) VALUES (2,5,100,42,'In magazine');
INSERT INTO package (id, Weight, Value, Size, State) VALUES (3,80,87,400,'In magazine');
INSERT INTO package (id, Weight, Value, Size, State) VALUES (4,9.7,23,97,'In magazine');
INSERT INTO package (id, Weight, Value, Size, State) VALUES (5,16,68,61,'In magazine');

INSERT INTO users (Login, Password, Email) VALUES ('User1','haslo','testmail@test.test');
INSERT INTO users (Login, Password, Email) VALUES ('User2','wd40','zapytaj@test.test');
INSERT INTO users (Login, Password, Email) VALUES ('User3','amarena','zgadnij@test.test');
