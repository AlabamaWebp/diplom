from fastapi import APIRouter

from data.BD.b_product import get_prod, create_prod, prod_del, update_prod
from data.SCHEMAS.s_product import ProductModel, ProdCreate

product = APIRouter()
product.prefix = "/prod/"


@product.get("all/")
async def g_all() -> list[ProductModel]:
    return get_prod()


@product.post("create/")
async def g_all(data: ProdCreate):
    create_prod(data)
    return "ok"


@product.post("delete/")
async def g_all(id: int):
    prod_del(id)
    return "ok"


@product.post("update/")
async def g_all(id1: int, data: ProdCreate):
    update_prod(id1, data)
    return "ok"

