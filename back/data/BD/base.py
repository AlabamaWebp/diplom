from pydantic import BaseModel
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, Boolean, ForeignKey, DateTime

from ..SCHEMAS.s_material import MaterialModel
from ..settings import con_str


engine = create_engine(con_str).connect()
meta = MetaData()


Material = Table(
    "Material", meta,
    Column("Id", Integer, primary_key=True, autoincrement=True),
    Column("Name", String(20), nullable=False),
    Column("Purchased", Boolean, nullable=False),
    # Column("PostavshikId", Integer, ForeignKey("Postavshik.Id"), nullable=False),
    Column("TypeId", Integer, ForeignKey("Type.Id"), nullable=False),
    Column("Count", Integer)
)
Product = Table(
    "Product", meta,
    Column("Id", Integer, primary_key=True, autoincrement=True),
    Column("Name", String(20), nullable=False),
    Column("Count", Integer, nullable=False)
)
# CompanyType = Table(
#     "CompanyType", meta,
#     Column("Id", Integer, primary_key=True, autoincrement=True),
#     Column("Name", String(20), nullable=False),
# )
# Postavshik = Table(
#     "Postavshik", meta,
#     Column("Id", Integer, primary_key=True, autoincrement=True),
#     Column("Type", Integer, ForeignKey("CompanyType.Id")),
#     Column("Name", String(20), nullable=False),
#     Column("Email", String(30)),
#     Column("Telephone", String(11)),
#     Column("Address", String(30)),
# )

MaterialType = Table(
    "MaterialType", meta,
    Column("Id", Integer, primary_key=True, autoincrement=True),
    Column("Name", String, nullable=False)
)
ProductMaterial = Table(
    "ProductMaterial", meta,
    Column("Id", Integer, primary_key=True, autoincrement=True),
    Column("ProductID", Integer, ForeignKey("Product.Id"), nullable=False),
    Column("MaterialID", Integer, ForeignKey("Material.Id"), nullable=False)
)

User = Table(
    "User", meta,
    Column("Id", Integer, primary_key=True, autoincrement=True),
    Column("Login", String(20), nullable=False),
    Column("Password", String(20), nullable=False),
    Column("Name", String(20), nullable=False),
    Column("Surname", String(20), nullable=False),
    Column("Patronymic", String(20), nullable=False),
    Column("RoleId", Integer, ForeignKey("Role.Id"), nullable=False),
    Column("LoginDate", DateTime, nullable=False),
    Column("RegistrationDate", DateTime, nullable=False),
)
Role = Table(
    "Role", meta,
    Column("Id", Integer, primary_key=True, autoincrement=True),
    Column("Name", String, nullable=False)
)
#
#
# def create_tables_if_not_exists():
#     meta.create_all()


class UniversalModel(BaseModel):
    id: int = 0
    name: str = ""

