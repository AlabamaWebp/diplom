from sqlalchemy import select, insert
from data.BD.base import Postavshik as p, engine, CompanyType as ct, Postavshik
from data.SCHEMAS.s_postavshik import PostavhikModel, PostavshikInsert, OnlyTypes


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


def create_post(data: PostavshikInsert):
    query = insert(Postavshik).values(
        Type=data.type,
        Name=data.name,
        Email=data.email,
        Telephone=data.telephone,
        Address=data.address
    )
    value = engine.connect().execute(query)
    return value


def get_type():
    query = select(
        ct.c.Id,
        ct.c.Name
    )
    values = engine.connect().execute(query).fetchall()

    out_values = []

    for item in values:
        return_values = OnlyTypes(
            id=item[0],
            name=item[1]
        )
        out_values.append(return_values)
    return out_values
