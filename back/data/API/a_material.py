from fastapi import APIRouter, Depends
from fastapi_jwt_auth import AuthJWT

from data.BD.b_material import base_material, create_mat, mt_names, mat_del, update_mat
from data.BD.base import UniversalModel
from data.SCHEMAS.s_material import MaterialModel, MaterialCreateModel

material = APIRouter()
material.prefix = "/mat/"


@material.get("all/")
async def g_all(Authorize: AuthJWT = Depends()) -> list[MaterialModel]:
    Authorize.jwt_required()
    return base_material()


@material.get("prod/")
async def one(
        pr_id: int = 1,
        Authorize: AuthJWT = Depends()
) -> list[MaterialModel]:
    Authorize.jwt_required()
    return base_material(pr_id)


@material.post("create/")
async def c_all(data: MaterialCreateModel, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    create_mat(data)
    return "ok"


@material.post("update/")
async def u_all(id1: int, data: MaterialCreateModel, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    update_mat(id1, data)
    return "ok"


@material.get("types/")
async def g_t(Authorize: AuthJWT = Depends()) -> list[UniversalModel]:
    Authorize.jwt_required()
    return mt_names()


@material.post("delete/")
async def g_d(id: int, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    mat_del(id)
    return "ok"

