from sqlalchemy import select, func, and_

from data.BD.base import Product as pr, engine, Product, ProductMaterial
from data.SCHEMAS.s_product import ProductModel, ProdCreate


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


def create_prod(data: ProdCreate):
    query = Product.insert().values(
        Name=data.name,
        Count=data.count
    )
    engine.execute(query)
    q2 = engine.execute(select(func.max(Product.c.Id))).fetchone()
    for i in data.checked:
        query = ProductMaterial.insert().values(
            ProductID=q2[0],
            MaterialID=i["mat_id"],
            Count=i["count"]
        )
        engine.execute(query)
    engine.commit()


def update_prod(id1: int, data: ProdCreate):
    query = Product.update().values(
        Name=data.name,
        Count=data.count
    ).where(Product.c.Id == id1)
    engine.execute(query)
    for i in data.checked:
        print(i["checked"])
        if i["checked"]:
            # print(len(engine.execute(ProductMaterial.select().where(ProductMaterial.c.ProductID == id1)).fetchall()))
            if len(engine.execute(select(ProductMaterial.c.ProductID)
                                  .where(and_(ProductMaterial.c.ProductID == id1),
                                  and_(ProductMaterial.c.MaterialID == i["mat_id"])))
                                  .fetchall()) == 0:
                query = ProductMaterial.insert().values(
                    ProductID=id1,
                    MaterialID=i["mat_id"],
                    Count=i["count"]
                )
            else:
                query = ProductMaterial.update().values(
                    MaterialID=i["mat_id"],
                    Count=i["count"]
                ).where(
                    ProductMaterial.c.MaterialID == i["mat_id"]
                )
        else:
            query = ProductMaterial.delete().where(
                ProductMaterial.c.MaterialID == i["mat_id"],
                and_(ProductMaterial.c.ProductID == id1)
            )
        engine.execute(query)
    engine.commit()
