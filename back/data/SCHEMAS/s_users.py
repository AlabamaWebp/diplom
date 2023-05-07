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


class UserCreateModel(BaseModel):
    id: int = 0
    name: str = ""
    surname: str = ""
    patronymic: str = ""
    login: str = ""
    password: str = ""
    role: int = 2
