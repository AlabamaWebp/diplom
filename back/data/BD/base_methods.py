from fastapi import APIRouter
from sqlalchemy import select

from data.BD.base import Material, MaterialType
from data.SCHEMAS.Material import MaterialModel


def get_mat_list(mat: list) -> MaterialModel:
    if mat is None:
        return None
    return MaterialModel(
        mat_id=mat[0],
        mat_name=mat[1],
        mat_purchased=mat[2],
        mat_count=mat[3],
        mat_type=mat[4],
        p_name=mat[5],
        p_email=mat[6],
        p_address=mat[7],
        p_telephone=mat[8],
    )


class TestMat:
    Id: int = 0
    Name: str = ""


def base_material(page: int, filters: dict) -> list[TestMat]:
    query = select(
        Material.c.Id,
        Material.c.Name)

    query = query.offset(page*10-10).limit(10)

    values = query.execute(query).fetchall()

    out_values = []

    for item in values:

        return_values = TestMat(
            Id=item[0],
            Name=item[1]
        )
        out_values.append(return_values)

    return out_values


mat_router = APIRouter()


@mat_router.get("/test/{page}/")
async def test_get(
        page: int = 1
    ) -> list[TestMat]:

    return base_material(page)
