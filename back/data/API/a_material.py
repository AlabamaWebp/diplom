from fastapi import APIRouter

from data.BD.b_material import base_material
from data.SCHEMAS.s_material import MaterialModel

material = APIRouter()
material.prefix = "/mat/"


@material.get("all/")
async def test() -> list[MaterialModel]:
    return base_material()


@material.get("one/")
async def test(
        mat_id: int = 1
) -> list[MaterialModel]:
    return base_material(mat_id)
