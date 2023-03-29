from sqlalchemy import select

from data.BD.base import Product as pr, engine, Product
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


def prod_del(id):
    query = Product.delete().where(Product.c.Id == id)
    engine.execute(query)
    engine.commit()


def create_prod(data: Product):
    query = Product.insert().values(
        Name=data.Name,
        Count=data.Count
    )
    engine.execute(query)
    engine.commit()


def update_prod(id1: int, data: Product):
    query = Product.update().values(
        Name=data.Name,
        Count=data.Count
    ).where(Product.c.Id == id1)
    engine.execute(query)
    engine.commit()

