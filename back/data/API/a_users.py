from fastapi import APIRouter, Depends
from fastapi_jwt_auth import AuthJWT

from data.BD.b_users import get_users
from data.SCHEMAS.s_users import UserModel

users = APIRouter()
users.prefix = "/users/"


@users.get("")
async def api_users(Authorize: AuthJWT = Depends()) -> list[UserModel]:
    Authorize.jwt_required()
    return get_users()
