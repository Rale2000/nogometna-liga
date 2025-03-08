
SELECT name, collation_name FROM sys.databases;
GO
ALTER DATABASE db_ab61af_football SET SINGLE_USER WITH
ROLLBACK IMMEDIATE;
GO
ALTER DATABASE db_ab61af_football COLLATE Croatian_CI_AS;
GO
ALTER DATABASE db_ab61af_football SET MULTI_USER;
GO
SELECT name, collation_name FROM sys.databases;
GO

create table klub(
sifra int not null primary key identity(1,1),
naziv varchar(50) not null,
osnovan datetime,
stadion varchar(40)	
);

create table utakmica(
sifra int not null primary key identity(1,1),
datum datetime,
gosti int not null references klub(sifra),
domaci int not null references klub(sifra),
golovidomaci varchar(10),
golovigosti varchar(10)  
);

create table igrac(
sifra int not null primary key identity(1,1),
ime varchar(50) not null,
prezime varchar(50) not null,
podrijetlo varchar(70) not null,
pozicija varchar(11),
vrijednost decimal(18,2),
klub int not null references klub(sifra)
);

insert into klub (naziv,osnovan,stadion)
values ('FC Barcelona','1899-11-29','Camp Nou'),
('Real Madrid','1902-3-6','Santiago Bernabeu'),('Manchester United', '1878-03-05', 'Old Trafford'),
('Liverpool FC', '1892-06-03', 'Anfield'),
('Bayern Munich', '1900-02-27', 'Allianz Arena'),
('Juventus', '1897-11-01', 'Allianz Stadium'),
('AC Milan', '1899-12-16', 'San Siro'),
('Inter Milan', '1908-03-09', 'San Siro'),
('Arsenal', '1886-12-01', 'Emirates Stadium'),
('Chelsea', '1905-03-10', 'Stamford Bridge'),
('Tottenham Hotspur', '1882-09-05', 'Tottenham Hotspur Stadium'),
('Manchester City', '1880-11-13', 'Etihad Stadium'),
('Paris Saint-Germain', '1970-08-12', 'Parc des Princes'),
('Borussia Dortmund', '1909-12-19', 'Signal Iduna Park'),
('Atletico Madrid', '1903-04-26', 'Wanda Metropolitano'),
('FC Porto', '1893-09-28', 'Estádio do Dragão'),
('Benfica', '1904-02-28', 'Estádio da Luz'),
('Ajax', '1900-03-18', 'Johan Cruijff Arena'),
('PSV Eindhoven', '1913-08-31', 'Philips Stadion'),
('Celtic', '1887-11-06', 'Celtic Park'),
('Rangers', '1872-03-01', 'Ibrox Stadium'),
('AS Roma', '1927-07-07', 'Stadio Olimpico'),
('Lazio', '1900-01-09', 'Stadio Olimpico'),
('Napoli', '1926-08-01', 'Stadio Diego Armando Maradona'),
('Fiorentina', '1926-08-29', 'Stadio Artemio Franchi'),
('Valencia CF', '1919-03-18', 'Mestalla'),
('Sevilla FC', '1890-01-25', 'Ramón Sánchez Pizjuán'),
('Athletic Bilbao', '1898-04-03', 'San Mamés'),
('Real Sociedad', '1909-09-07', 'Reale Arena'),
('Sporting CP', '1906-07-01', 'Estádio José Alvalade'),
('FC Schalke 04', '1904-05-04', 'Veltins-Arena'),
('Bayer Leverkusen', '1904-07-01', 'BayArena'),
('Borussia Mönchengladbach', '1900-08-01', 'Borussia-Park'),
('VfB Stuttgart', '1893-09-09', 'Mercedes-Benz Arena'),
('Werder Bremen', '1899-02-04', 'Wohninvest Weserstadion'),
('Hamburger SV', '1887-06-02', 'Volksparkstadion'),
('Olympique Lyonnais', '1899-08-03', 'Groupama Stadium'),
('Olympique de Marseille', '1899-08-31', 'Orange Vélodrome'),
('AS Monaco', '1924-08-23', 'Stade Louis II'),
('Lille OSC', '1944-09-23', 'Stade Pierre-Mauroy'),
('FC Nantes', '1943-04-21', 'Stade de la Beaujoire'),
('Galatasaray', '1905-10-01', 'Nef Stadium'),
('Fenerbahçe', '1907-05-03', 'Şükrü Saracoğlu Stadium'),
('Beşiktaş', '1903-03-03', 'Vodafone Park'),
('Trabzonspor', '1967-08-02', 'Şenol Güneş Sports Complex'),
('FC Basel', '1893-11-15', 'St. Jakob-Park'),
('Red Bull Salzburg', '1933-09-13', 'Red Bull Arena'),
('Shakhtar Donetsk', '1936-05-24', 'Donbass Arena'),
('Dynamo Kyiv', '1927-05-13', 'NSC Olimpiyskiy');


insert into utakmica (datum,domaci,gosti,golovigosti,golovidomaci)
values ('2024-10-26',2,1,4,0),
('2010-11-29',1,2,0,5),
('2024-04-13', 33, 17, 3, 2),
('2023-02-06', 48, 28, 2, 5),
('2023-08-06', 13, 11, 4, 5),
('2024-04-08', 32, 30, 0, 0),
('2023-02-17', 33, 2, 4, 3),
('2024-07-11', 25, 48, 3, 2),
('2024-03-24', 22, 38, 1, 3),
('2024-07-20', 11, 37, 4, 3),
('2023-05-22', 17, 10, 1, 1),
('2023-11-23', 47, 28, 4, 2),
('2023-07-26', 28, 30, 5, 1),
('2023-03-11', 12, 42, 5, 0),
('2024-03-04', 11, 40, 0, 1),
('2023-05-22', 17, 45, 2, 0),
('2024-10-17', 46, 49, 5, 2),
('2023-12-23', 40, 15, 2, 3),
('2023-03-26', 37, 27, 5, 4),
('2024-02-09', 41, 4, 3, 5),
('2024-06-03', 39, 11, 0, 3),
('2024-04-18', 25, 20, 0, 1),
('2023-08-19', 34, 33, 5, 2),
('2023-01-27', 1, 26, 5, 4),
('2023-03-16', 27, 39, 1, 0),
('2024-04-28', 21, 4, 2, 1)


insert into igrac (ime,prezime,podrijetlo,pozicija,vrijednost,klub)
values ('Lamine','Yamal','Marokanac','RW',150.00,1),
 ('Vinicius','Junior','Brazilac','LW',200.00,2),
 ('Luka', 'Lovrić', 'Hrvatska', 'branič', 3558455.79, 17),
 ('Ana', 'Kovačević', 'Francuska', 'vratar', 37510440.33, 46),
 ('Marko', 'Knežević', 'Španjolska', 'vratar', 73168053.35, 23),
 ('Petar', 'Kovačević', 'Italija', 'vratar', 31083758.78, 10),
 ('Josip', 'Babić', 'Španjolska', 'vezni', 93866351.55, 49),
 ('Filip', 'Horvat', 'Argentina', 'vratar', 97527904.07, 10),
 ('Iva', 'Knežević', 'Argentina', 'branič', 55766513.12, 33),
 ('Mario', 'Kovačić', 'Španjolska', 'napadač', 18635365.63, 48),
 ('Mario', 'Babić', 'Argentina', 'vratar', 21318847.02, 36),
 ('Filip', 'Marić', 'Španjolska', 'vratar', 79697799.5, 11),
 ('Ivan', 'Novak', 'BiH', 'napadač', 93758981.12, 37),
 ('David', 'Babić', 'Portugal', 'vratar', 81756180.57, 10),
 ('Luka', 'Babić', 'Italija', 'vezni', 19947263.12, 11);