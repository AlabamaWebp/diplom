from fastapi import APIRouter

from data.BD.b_material import base_material, create_mat, mt_names, mat_del
from data.BD.base import UniversalModel
from data.SCHEMAS.s_material import MaterialModel, MaterialCreateModel

material = APIRouter()
material.prefix = "/mat/"


@material.get("all/")
async def g_all() -> list[MaterialModel]:
    return base_material()


@material.get("prod/")
async def one(
        pr_id: int = 1
) -> list[MaterialModel]:
    return base_material(pr_id)


@material.post("create/")
async def g_all(data: MaterialCreateModel):
    create_mat(data)
    return "ok"


@material.get("types/")
async def g_all() -> list[UniversalModel]:
    return mt_names()


@material.post("delete/")
async def g_all(id: int):
    mat_del(id)
    return "ok"

