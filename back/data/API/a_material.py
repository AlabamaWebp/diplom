from fastapi import APIRouter

from data.BD.b_material import base_material
from data.SCHEMAS.s_material import TestMat

material = APIRouter()
material.prefix = "/mat/"


@material.get("test/")
async def test() -> list[TestMat]:
    return base_material()
