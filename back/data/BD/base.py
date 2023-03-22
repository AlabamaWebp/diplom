from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, Boolean, ForeignKey, DateTime

from ..settings import con_str


engine = create_engine(con_str, echo=False)
meta = MetaData(engine)

Material = Table(
    "Material", meta,
    Column("ID", Integer, primary_key=True, autoincrement=True),
    Column("Name", String(20), nullable=False),
    Column("Purchased", Boolean, nullable=False),
    Column("PostavshikId", Integer, ForeignKey("Postavshik.ID"), nullable=False),
    Column("TypeId", Integer, ForeignKey("Type.ID"), nullable=False),
    Column("count", Integer)
)
Product = Table(
    "Product", meta,
    Column("ID", Integer, primary_key=True, autoincrement=True),
    Column("Name", String(20), nullable=False),
    Column("count", Integer, nullable=False)
)
Postavshik = Table(
    "Postavshik", meta,
    Column("ID", Integer, primary_key=True, autoincrement=True),
    Column("Name", String(20), nullable=False),
    Column("email", String(30)),
    Column("telephone", String(11)),
    Column("address", String(30)),
)
MaterialType = Table(
    "MaterialType", meta,
    Column("ID", Integer, primary_key=True, autoincrement=True),
    Column("Name", String, nullable=False)
)
ProductMaterial = Table(
    "ProductMaterial", meta,
    Column("ID", Integer, primary_key=True, autoincrement=True),
    Column("ProductID", Integer, ForeignKey("Product.ID"), nullable=False),
    Column("MaterialID", Integer, ForeignKey("Material.ID"), nullable=False)
)

User = Table(
    "User", meta,
    Column("ID", Integer, primary_key=True, autoincrement=True),
    Column("Login", String(20), nullable=False),
    Column("Password", String(20), nullable=False),
    Column("Name", String(20), nullable=False),
    Column("Surname", String(20), nullable=False),
    Column("Patronymic", String(20), nullable=False),
    Column("RoleId", Integer),
    Column("LoginDate", DateTime),
    Column("RegistrationDate", DateTime),
)