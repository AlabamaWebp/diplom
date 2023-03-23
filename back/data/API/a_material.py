from fastapi import APIRouter

from data.BD.base_methods import base_material
from data.SCHEMAS.Material import TestMat

material = APIRouter()
material.prefix = "/mat/"


@material.get("test/")
async def test() -> list[TestMat]:
    return base_material()
