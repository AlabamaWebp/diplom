from pydantic import BaseModel
from pydantic.schema import datetime


class UserModel(BaseModel):
    u_id: int = 0
    u_name: str = ""
    u_surname: str = ""
    u_patronymic: str = ""
    u_role: str = ""
    u_login: datetime
    u_registration: datetime
