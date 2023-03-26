from sqlalchemy import select

from data.BD.base import Product as pr, engine
from data.SCHEMAS.s_product import ProductModel


def get_prod():
    query = select(
        pr.c.Id,
        pr.c.Name,
        pr.c.Count
    )
    values = engine.execute(query).fetchall()

    out_values = []

    for item in values:
        return_values = ProductModel(
            id=item[0],
            name=item[1],
            count=item[2],

        )
        out_values.append(return_values)
    return out_values
