from fastapi import APIRouter
from pydantic import BaseModel
from sqlalchemy import select, and_, insert, case, or_, delete

from data.BD.base import engine, MaterialType as mt, Material, UniversalModel
from data.BD.base import Material as m
from data.BD.base import ProductMaterial as prm
from data.SCHEMAS.s_material import MaterialModel, MaterialCreateModel


def base_material(pr_id: int = -1) -> list[MaterialModel]:
    query = select(
        m.c.Id,
        m.c.Name,
        m.c.Purchased,
        m.c.Count,
        mt.c.Name,
        # ct.c.Name,
        # p.c.Name,
        # p.c.Email,
        # p.c.Telephone,
        # p.c.Address
    ).where(mt.c.Id == m.c.TypeId)

    if pr_id != -1:
        query = select(
            m.c.Id,
            m.c.Name,
            m.c.Purchased,
            m.c.Count,
            mt.c.Name,
            prm.c.Count
        ).where(mt.c.Id == m.c.TypeId, and_(pr_id == prm.c.ProductID), and_(m.c.Id == prm.c.MaterialID))

    values = engine.execute(query).fetchall()

    out_values = []

    for item in values:
        if pr_id != -1:
            return_values = MaterialModel(
                mat_id=item[0],
                mat_name=item[1],
                mat_purchased=item[2],
                mat_count=item[3],
                mat_type=item[4],
                count=item[5]
            )
        else:
            return_values = MaterialModel(
                mat_id=item[0],
                mat_name=item[1],
                mat_purchased=item[2],
                mat_count=item[3],
                mat_type=item[4]
            )
        out_values.append(return_values)
    return out_values


def create_mat(data: MaterialCreateModel):
    query = Material.insert().values(
        Name=data.Name,
        Purchased=data.Purchased,
        TypeId=data.TypeId,
        Count=data.Count
    )
    engine.execute(query)
    engine.commit()


def update_mat(id1: int, data: MaterialCreateModel):
    query = Material.update().values(
        Name=data.Name,
        Purchased=data.Purchased,
        TypeId=data.TypeId,
        Count=data.Count
    ).where(Material.c.Id == id1)
    engine.execute(query)
    engine.commit()


def mt_names() -> list[UniversalModel]:
    query = select(
        mt.c.Id,
        mt.c.Name,
    )

    values = engine.execute(query).fetchall()

    out_values = []

    for item in values:
        return_values = UniversalModel(
            id=item[0],
            name=item[1]
        )
        out_values.append(return_values)
    return out_values


def mat_del(id):
    query = Material.delete().where(Material.c.Id == id)
    engine.execute(query)
    engine.commit()

