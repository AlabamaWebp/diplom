from fastapi import APIRouter, Depends, HTTPException
from fastapi_jwt_auth import AuthJWT
from sqlalchemy import select

from data.BD.b_users import get_users, create_user, update_user, del_user, get_roles
from data.BD.base import UniversalModel, User, engine
from data.SCHEMAS.s_users import UserModel, UserCreateModel

users = APIRouter()
users.prefix = "/users/"


@users.get("")
async def api_users(Authorize: AuthJWT = Depends()) -> list[UserModel]:
    Authorize.jwt_required()
    if check_rights():
        raise HTTPException(status_code=401, detail="Нет прав на выполнение операции")
    return get_users()


@users.get("roles/")
async def get_all_users(Authorize: AuthJWT = Depends()) -> list[UniversalModel]:
    Authorize.jwt_required()
    if check_rights():
        raise HTTPException(status_code=401, detail="Нет прав на выполнение операции")
    return get_roles()


@users.post("create/")
async def c_u(data: UserCreateModel, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    if check_rights():
        raise HTTPException(status_code=401, detail="Нет прав на выполнение операции")
    create_user(data)
    return "ok"


@users.post("update/")
async def u_u(id: int, data: UserCreateModel, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    if check_rights():
        raise HTTPException(status_code=401, detail="Нет прав на выполнение операции")
    update_user(id, data)
    return "ok"


@users.post("delete/")
async def d_u(id: int, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    if check_rights():
        raise HTTPException(status_code=401, detail="Нет прав на выполнение операции")
    del_user(id)
    return "ok"


def check_rights(Authorize: AuthJWT = Depends()):
    current_user = Authorize.get_jwt_subject()
    query = select(User.c.RoleId).where(User.c.Login == current_user)
    values = engine.execute(query).fetchone()
    return_values = []
    for i in values:
        return_values.append(i)
    if return_values[0] == 1:
        return True
    else:
        return False
