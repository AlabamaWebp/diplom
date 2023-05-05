from pydantic import BaseModel
from pydantic.schema import datetime


class UserModel(BaseModel):
    id: int = 0
    name: str = ""
    surname: str = ""
    patronymic: str = ""
    role: str = ""
    login: datetime
    registration: datetime
