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
	[Count] int
)

create table MaterialType
(
	Id INT PRIMARY KEY IDENTITY,
	[Name] nvarchar(20)
)

create table CompanyType
(
	Id INT PRIMARY KEY IDENTITY,
	Name varchar(20)
)

create table Postavshik
(
	Id INT PRIMARY KEY IDENTITY,
	[Type] int,
	[Name] nvarchar(20),
	Email varchar(30),
	Telephone char(11),
	[Address] nvarchar(30)
	FOREIGN KEY ([Type]) REFERENCES CompanyType(Id)
)


create table Material
(
	Id INT PRIMARY KEY IDENTITY, 
	[Name] nvarchar(20),
	Purchased bit default 0,
	PostavshikId int NULL,
	TypeId int,
	[Count] int,
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
insert into [Role] ([Name]) values ('admin'),('operator')
insert into [User]([Login],[Password],[Name],Surname,Patronymic,RoleId,LoginDate,RegistrationDate) 
values ('admin', '123', 'admin', 'admin','adminovich',1,SYSDATETIME(),SYSDATETIME())

insert into [MaterialType](Name) values ('Аллюминий'),('Сталь')

insert into CompanyType(Name) values ('ООО'),('ОАО')

insert into [Postavshik] (Name,Email,Telephone,[Address],[Type]) 
values ('АгроСтой','agrosroy@mail.ru','88005553535','Йошкар-Ола',1),
('СтройАгро','sroyagro@mail.ru','89132421351','Йошкар-Ола',1)

insert into Material(Name, Purchased,PostavshikId,TypeId,[Count]) 
values ('Гайка М8',1,1,1,3),
('Гайка М3',1,null,2,5)

insert into Product(Name,[Count]) values ('Танк', 500), ('Шпилька',228)

insert into ProductMaterial(ProductId, MaterialId) values (1, 1), (1,2), (2,1)