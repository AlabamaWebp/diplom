from fastapi import APIRouter, Depends
from fastapi_jwt_auth import AuthJWT

from data.BD.b_users import get_users, create_user, update_user, del_user, get_roles
from data.BD.base import UniversalModel
from data.SCHEMAS.s_users import UserModel, UserCreateModel

users = APIRouter()
users.prefix = "/users/"


@users.get("")
async def api_users(Authorize: AuthJWT = Depends()) -> list[UserModel]:
    Authorize.jwt_required()
    return get_users()


@users.get("roles/")
async def get_all_users() -> list[UniversalModel]:
    return get_roles()


@users.post("create/")
async def c_u(data: UserCreateModel):
    create_user(data)
    return "ok"


@users.post("update/")
async def u_u(id: int, data: UserCreateModel):
    update_user(id, data)
    return "ok"


@users.post("delete/")
async def d_u(id: int):
    del_user(id)
    return "ok"
