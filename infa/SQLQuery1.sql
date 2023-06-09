--drop database [diplom1];
--go

create database [diplom1];
go

use [diplom1];
go


create table Product 
(
	Id INT PRIMARY KEY IDENTITY,
	[Name] nvarchar(100),
	[Count] int
)

create table MaterialType
(
	Id INT PRIMARY KEY IDENTITY,
	[Name] nvarchar(100)
)

--create table CompanyType
--(
--	Id INT PRIMARY KEY IDENTITY,
--	Name varchar(20)
--)

--create table Postavshik
--(
--	Id INT PRIMARY KEY IDENTITY,
--	[Type] int,
--	[Name] nvarchar(100),
--	Email varchar(30),
--	Telephone char(11),
--	[Address] nvarchar(30)
--	FOREIGN KEY ([Type]) REFERENCES CompanyType(Id)
--)


create table Material
(
	Id INT PRIMARY KEY IDENTITY, 
	[Name] nvarchar(100),
	Purchased bit default 0,
	--PostavshikId int NULL,
	TypeId int,
	[Count] int,
	FOREIGN KEY (TypeId) REFERENCES MaterialType(Id) ON DELETE CASCADE
	--FOREIGN KEY (PostavshikId) REFERENCES Postavshik(Id)
)

create table ProductMaterial
(
	Id INT PRIMARY KEY IDENTITY,
	ProductId int,
	MaterialId int,
	FOREIGN KEY (ProductId) REFERENCES Product(Id) ON DELETE CASCADE, 
	FOREIGN KEY (MaterialId) REFERENCES Material(Id) ON DELETE CASCADE
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
	FOREIGN KEY (RoleId) REFERENCES [Role](Id) ON DELETE CASCADE
)
insert into [Role] ([Name]) values ('admin'),('operator')
insert into [User]([Login],[Password],[Name],Surname,Patronymic,RoleId,LoginDate,RegistrationDate) 
values ('admin', '123', 'admin', 'admin','adminovich',1,SYSDATETIME(),SYSDATETIME())

insert into [MaterialType](Name) values ('��������'),('������'),('�����'),('�������'),('������'),('������');

--insert into CompanyType(Name) values ('���'),('���')

--insert into [Postavshik] (Name,Email,Telephone,[Address],[Type]) 
--values ('��������','agrosroy@mail.ru','88005553535','������-���',1),
--('���������','sroyagro@mail.ru','89132421351','������-���',1)

insert into Material(Name, Purchased,TypeId,[Count]) 
values ('���� �������',1,3,3),
('���� �����������',0,3,5)

insert into Product(Name,[Count]) values ('��������� ������', 78), ('��������� ���������',56)

insert into ProductMaterial(ProductId, MaterialId) values (1, 1), (1,2), (2,1)