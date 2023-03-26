from pydantic import BaseModel
from pydantic.class_validators import Optional


class MaterialModel(BaseModel):
    mat_id: int = 0
    mat_name: str = ""
    mat_purchased: int = 0
    mat_count: int = 0
    mat_type: str = ""
    p_name: Optional[str] = ""
    p_email: Optional[str] = ""
    p_address: Optional[str] = ""
    p_telephone: Optional[str] = ""
