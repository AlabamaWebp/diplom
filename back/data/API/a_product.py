from fastapi import APIRouter

from data.BD.b_product import get_prod
from data.SCHEMAS.s_product import ProductModel

product = APIRouter()
product.prefix = "/prod/"


@product.get("all/")
async def g_all() -> list[ProductModel]:
    return get_prod()

