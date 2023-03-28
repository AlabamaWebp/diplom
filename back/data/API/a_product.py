from fastapi import APIRouter

from data.BD.b_product import get_prod, create_prod, prod_del
from data.SCHEMAS.s_product import ProductModel

product = APIRouter()
product.prefix = "/prod/"


@product.get("all/")
async def g_all() -> list[ProductModel]:
    return get_prod()


@product.post("create/")
async def g_all(data: ProductModel):
    create_prod(data)
    return "ok"


@product.post("delete/")
async def g_all(id: int):
    prod_del(id)
    return "ok"

