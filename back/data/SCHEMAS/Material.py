from pydantic import BaseModel


class MaterialModel(BaseModel):
    mat_id: int = 0
    mat_name: str = ""
    mat_purchased: int = 0
    mat_count: int = 0
    mat_type: str = ""
    p_name: str = ""
    p_email: str = ""
    p_address: str = ""
    p_telephone: str = ""

