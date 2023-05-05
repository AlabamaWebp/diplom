from pydantic import BaseModel


class ProductModel(BaseModel):
    id: int = 0
    name: str = 0
    count: int = 0


class ProdCreate(ProductModel):
    checked = []
