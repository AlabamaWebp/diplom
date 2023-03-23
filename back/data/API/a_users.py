from fastapi import APIRouter

from data.BD.b_users import get_users
from data.SCHEMAS.Users import UserModel

users = APIRouter()
users.prefix = "/users/"


@users.get("test1/")
async def api_users() -> list[UserModel]:
    return get_users()
