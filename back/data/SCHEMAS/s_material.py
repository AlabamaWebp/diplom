from pydantic import BaseModel
from pydantic.class_validators import Optional


class MaterialModel(BaseModel):
    mat_id: int = 0
    mat_name: str = ""
    mat_purchased: int = 0
    mat_count: int = 0
    mat_type: str = ""
    count: int = -1


class MaterialCreateModel(BaseModel):
    Name: str = ""
    Purchased: int = 0
    TypeId: int = 0
    Count: int = 0


