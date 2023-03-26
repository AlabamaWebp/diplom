from pydantic.main import BaseModel


class PostavhikModel(BaseModel):
    id: int = 0
    name: str = ""
    email: str = ""
    telephone: str = ""
    address: str = ""
