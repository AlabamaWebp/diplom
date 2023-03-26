from fastapi import APIRouter
from pydantic import BaseModel
from sqlalchemy import select, and_

from data.BD.base import engine, CompanyType as ct, MaterialType as mt
from data.BD.base import Material as m
from data.BD.base import Postavshik as p
from data.BD.base import ProductMaterial as prm
from data.SCHEMAS.s_material import MaterialModel


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

# mat_id: int = -1

def base_material(pr_id: int = -1) -> list[MaterialModel]:
    query = select(
        m.c.Id,
        m.c.Name,
        m.c.Purchased,
        m.c.Count,
        mt.c.Name,
        ct.c.Name,
        p.c.Name,
        p.c.Email,
        p.c.Telephone,
        p.c.Address
    ).where(and_(p.c.Id == m.c.Id), and_(p.c.Type == ct.c.Id), and_(m.c.TypeId == mt.c.Id))

    if pr_id != -1:
        query = query.where(and_(pr_id == prm.c.ProductID), and_(m.c.Id == prm.c.MaterialID))

    values = engine.execute(query).fetchall()

    out_values = []

    for item in values:
        return_values = MaterialModel(
            mat_id=item[0],
            mat_name=item[1],
            mat_purchased=item[2],
            mat_count=item[3],
            mat_type=item[4],
            p_name=item[5] + " " + item[6],
            p_email=item[7],
            p_telephone=item[8],
            p_address=item[9],
        )
        out_values.append(return_values)
    return out_values

