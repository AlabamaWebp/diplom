from fastapi import APIRouter
from pydantic import BaseModel
from sqlalchemy import select

from data.BD.base import MaterialType, engine
from data.SCHEMAS.Material import MaterialModel


# def get_mat_list(mat: list) -> MaterialModel:
#     if mat is None:
#         return None
#     return MaterialModel(
#         mat_id=mat[0],
#         mat_name=mat[1],
#         mat_purchased=mat[2],
#         mat_count=mat[3],
#         mat_type=mat[4],
#         p_name=mat[5],
#         p_email=mat[6],
#         p_address=mat[7],
#         p_telephone=mat[8],
#     )


class TestMat(BaseModel):
    Id: int
    Name: str


def base_material() -> list[TestMat]:
    query = select(
        MaterialType.c.Id,
        MaterialType.c.Name)

    values = engine.connect().execute(query).fetchall()

    out_values = []

    for item in values:
        print(item)
        return_values = TestMat(
            Id=item[0],
            Name=item[1]
        )
        out_values.append(return_values)
    return out_values


mat_router = APIRouter()


@mat_router.get("/test/")
async def test_get() -> list[TestMat]:
    return base_material()
