CREATE DATABASE bazodanowe

CREATE TABLE administrators;
CREATE TABLE cars;
CREATE TABLE clients;
CREATE TABLE couriers;
CREATE TABLE couriers_in_work;
CREATE TABLE managers;
CREATE TABLE orders;
CREATE TABLE package;
CREATE TABLE packages_by_courier;
CREATE TABLE packages_in_car;
CREATE TABLE users;

INSERT INTO administrators(id,Name, Surname, Salary) VALUES (1,'Admin1', 'Admin1', 1000);
INSERT INTO administrators(id,Name, Surname, Salary) VALUES (2,'Admin2', 'Admin2', 2000);

INSERT INTO cars(Registration_number, Year_of_production, Technical_condition, Type) VALUES ('ABCDE 57', 2005, 'good','Ford');
INSERT INTO cars(Registration_number, Year_of_production, Technical_condition, Type) VALUES ('25 EFR 07', 2014, 'good','Ford');
INSERT INTO cars(Registration_number, Year_of_production, Technical_condition, Type) VALUES ('ABGBH E4', 2014, 'good','Ford');

INSERT INTO clients(id,Name,Surname,Adress, Packages_received) VALUES (1,"Adam","Abacki","Stalowa 17", 3);
INSERT INTO clients(id,Name,Surname,Adress, Packages_received) VALUES (2,"Bartek","Babacki","Miedziana 33", 3);
INSERT INTO clients(id,Name,Surname,Adress, Packages_received) VALUES (3,"Czarek","Cabacki","Aluminiowa 24", 3);
INSERT INTO clients(id,Name,Surname,Adress, Packages_received) VALUES (4,"Dariusz","Dabacki","¯elazna 86", 3);

INSERT INTO couriers (id, Name,Surname,Salary) VALUES (1,'Kurier1','Kurierowy',2200 );
INSERT INTO couriers (id, Name,Surname,Salary) VALUES (2,'Kurier2','Dorêczyciel',1700 );
INSERT INTO couriers (id, Name,Surname,Salary) VALUES (3,'Kurier3','B³yskawica',1950 );

INSERT INTO managers (id, Name,Surname,Salary) VALUES (1,'Manager1','Zarz¹dca',3500 );
INSERT INTO managers (id, Name,Surname,Salary) VALUES (2,'Manager2','Prezes',1600 );

INSERT INTO package (id, Weight, Value, Size, State) VALUES (1,3.5,53,67,'In magazine');
INSERT INTO package (id, Weight, Value, Size, State) VALUES (2,5,100,42,'In magazine');
INSERT INTO package (id, Weight, Value, Size, State) VALUES (3,80,87,400,'In magazine');
INSERT INTO package (id, Weight, Value, Size, State) VALUES (4,9.7,23,97,'In magazine');
INSERT INTO package (id, Weight, Value, Size, State) VALUES (5,16,68,61,'In magazine');

INSERT INTO users (Login, Password, Email) VALUES ('User1','haslo','testmail@test.test');
INSERT INTO users (Login, Password, Email) VALUES ('User2','wd40','zapytaj@test.test');
INSERT INTO users (Login, Password, Email) VALUES ('User3','amarena','zgadnij@test.test');
