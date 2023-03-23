--drop database [diplom1];
--go

create database [diplom1];
go

use [diplom1];
go


create table Product 
(
	Id INT PRIMARY KEY IDENTITY,
	[Name] nvarchar(20),
	[count] int
)

create table MaterialType
(
	Id INT PRIMARY KEY IDENTITY,
	[Name] nvarchar(20)
)

create table Postavshik
(
	Id INT PRIMARY KEY IDENTITY,
	[Name] nvarchar(20),
	email varchar(30),
	telephone char(11),
	address nvarchar(30)
)

create table Material
(
	Id INT PRIMARY KEY IDENTITY, 
	[Name] nvarchar(20),
	Purchased bit default 0,
	PostavshikId int NULL,
	TypeId int,
	[count] int,
	FOREIGN KEY (TypeId) REFERENCES MaterialType(Id),
	FOREIGN KEY (PostavshikId) REFERENCES Postavshik(Id)
)

create table ProductMaterial
(
	Id INT PRIMARY KEY IDENTITY,
	ProductId int,
	MaterialId int,
	FOREIGN KEY (ProductId) REFERENCES Product(Id),
	FOREIGN KEY (MaterialId) REFERENCES Material(Id)
)

create table [Role]
(
	Id INT PRIMARY KEY IDENTITY,
	[Name] nvarchar(20)
)

create table [User]
(
	Id INT PRIMARY KEY IDENTITY,
	[Login] varchar(20),
	[Password] varchar(20),
	[Name] nvarchar(20),
	Surname nvarchar(20),
	Patronymic nvarchar(20),
	RoleId int,
	LoginDate DATETIME DEFAULT SYSDATETIME(),
	RegistrationDate DATETIME DEFAULT SYSDATETIME(),
	FOREIGN KEY (RoleId) REFERENCES [Role](Id)
)
insert into [Role] ([Name]) values ('Админ'),('Оператор')
insert into [User]([Login],[Password],[Name],Surname,Patronymic,RoleId,LoginDate,RegistrationDate) 
values ('admin', '123', 'admin', 'admin','adminovich',1,SYSDATETIME(),SYSDATETIME())