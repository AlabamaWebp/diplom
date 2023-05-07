from fastapi import APIRouter, Depends
from fastapi_jwt_auth import AuthJWT

from data.BD.b_product import get_prod, create_prod, prod_del, update_prod
from data.SCHEMAS.s_product import ProductModel, ProdCreate

product = APIRouter()
product.prefix = "/prod/"


@product.get("all/")
async def g_all(Authorize: AuthJWT = Depends()) -> list[ProductModel]:
    Authorize.jwt_required()
    return get_prod()


@product.post("create/")
async def g_all(data: ProdCreate, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    create_prod(data)
    return "ok"


@product.post("delete/")
async def g_all(id: int, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    prod_del(id)
    return "ok"


@product.post("update/")
async def g_all(id1: int, data: ProdCreate, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    update_prod(id1, data)
    return "ok"

