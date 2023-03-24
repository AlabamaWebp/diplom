from fastapi import APIRouter
from pydantic import BaseModel
from sqlalchemy import select

from data.BD.base import engine, CompanyType as ct, MaterialType as mt
from data.BD.base import Material as m
from data.BD.base import Postavshik as p
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


def base_material() -> list[MaterialModel]:
    query = select(
        m.c.Id,
        m.c.Name,
        m.c.Purchased,
        m.c.Count,
        select(mt.c.Name).where(m.c.TypeId == mt.c.Id).label("1"),
        select(select(ct.c.Name).where(p.c.Type == ct.c.Id).label("2")).where(m.c.PostavshikId == p.c.Id).label("3"),
        select(p.c.Name).where(m.c.PostavshikId == p.c.Id).label("3"),
        select(p.c.Email).where(m.c.PostavshikId == p.c.Id).label("4"),
        select(p.c.Telephone).where(m.c.PostavshikId == p.c.Id).label("5"),
        select(p.c.Address).where(m.c.PostavshikId == p.c.Id).label("6"),
    )

    values = engine.connect().execute(query).fetchall()

    out_values = []

    for item in values:
        return_values = MaterialModel(
            mat_id=item[0],
            mat_name=item[1],
            mat_purchased=item[2],
            mat_count=item[3],
            mat_type=item[4],
            ct_name=item[5],
            p_name=item[6],
            p_email=item[7],
            p_telephone=item[8],
            p_address=item[9],
        )
        out_values.append(return_values)
    return out_values
