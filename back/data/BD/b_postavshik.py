from sqlalchemy import select
from data.BD.base import Postavshik as p, engine, CompanyType as ct
from data.SCHEMAS.s_postavshik import PostavhikModel


def get_post():
    query = select(
        p.c.Id,
        p.c.Name,
        p.c.Email,
        p.c.Telephone,
        p.c.Address,
        ct.c.Name
    ).where(ct.c.Id == p.c.Type)
    values = engine.connect().execute(query).fetchall()

    out_values = []

    for item in values:
        return_values = PostavhikModel(
            id=item[0],
            name=item[5] + " " + item[1],
            email=item[2],
            telephone=item[3],
            address=item[4]
        )
        out_values.append(return_values)
    return out_values
