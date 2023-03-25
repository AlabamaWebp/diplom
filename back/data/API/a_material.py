from fastapi import APIRouter

from data.BD.b_material import base_material
from data.SCHEMAS.s_material import MaterialModel

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
