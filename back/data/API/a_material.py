from fastapi import APIRouter

from data.BD.b_material import base_material
from data.SCHEMAS.s_material import MaterialModel

material = APIRouter()
material.prefix = "/mat/"


@material.get("")
async def test() -> list[MaterialModel]:
    return base_material()
