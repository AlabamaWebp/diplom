from fastapi import APIRouter

from data.BD.b_users import get_users
from data.SCHEMAS.s_users import UserModel

users = APIRouter()
users.prefix = "/users/"


@users.get("")
async def api_users() -> list[UserModel]:
    return get_users()
