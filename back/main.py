import datetime

import uvicorn
# from fastapi import FastAPI
from sqlalchemy import select
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import RedirectResponse
# from data.BD.base import create_tables_if_not_exists as CTINE
from data.API.a_material import material
from data.API.a_product import product
from data.API.a_users import users
from data.BD.base import User as bdUser, engine

# jwt
from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.responses import JSONResponse
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException
from pydantic import BaseModel
# jwt

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# jwt
class User(BaseModel):
    username: str
    password: str


class UserChange(User):
    new_password: str


class Settings(BaseModel):
    authjwt_secret_key: str = "secret1"
    # authjwt_access_token_expires: int = 5


# callback to get your configuration
@AuthJWT.load_config
def get_config():
    return Settings()


@app.exception_handler(AuthJWTException)
def authjwt_exception_handler(request: Request, exc: AuthJWTException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.message}
    )


@app.post('/login')
def login(user: User, Authorize: AuthJWT = Depends()):
    query = select(
        bdUser.c.Id,
        bdUser.c.Login,
        bdUser.c.Password,
        bdUser.c.ChangePassword
    ).where(bdUser.c.Login == user.username)
    values = engine.execute(query).fetchone()
    if user.username != values.Login or user.password != values.Password:
        raise HTTPException(status_code=401, detail="Логин или пароль не верны")

    query = bdUser.update().values(
        LoginDate=datetime.datetime.now()
    ).where(bdUser.c.Id == values.Id)
    engine.execute(query)
    engine.commit()
    # subject identifier for who this token is for example id or username from database
    access_token = Authorize.create_access_token(subject=user.username)
    refresh_token = Authorize.create_refresh_token(subject=user.username)
    return {"access_token": access_token, "refresh_token": refresh_token, "change": values.ChangePassword}


@app.post('/refresh')
def refresh(Authorize: AuthJWT = Depends()):
    Authorize.jwt_refresh_token_required()

    current_user = Authorize.get_jwt_subject()
    new_access_token = Authorize.create_access_token(subject=current_user)
    new_refresh_token = Authorize.create_refresh_token(subject=current_user)
    return {"access_token": new_access_token, "refresh_token": new_refresh_token}


@app.get('/protected')
def protected(Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()

    current_user = Authorize.get_jwt_subject()
    query = select(
        bdUser.c.Name,
        bdUser.c.Surname,
        bdUser.c.Patronymic,
        bdUser.c.RoleId,
        bdUser.c.ChangePassword,
    ).where(bdUser.c.Login == current_user)
    values = engine.execute(query).fetchone()
    return_values = []
    for i in values:
        return_values.append(i)
    return {"user": current_user, "info": return_values}
# jwt
# changePass


@app.post('/changePass')
def refresh(user: UserChange):
    query = select(
        bdUser.c.Id,
        bdUser.c.Login,
        bdUser.c.Password,
    ).where(bdUser.c.Login == user.username)
    values = engine.execute(query).fetchone()
    if user.username != values.Login or user.password != values.Password:
        raise HTTPException(status_code=401, detail="Неправильный логин или пароль")
    query = bdUser.update().values(
        Password=user.new_password,
        ChangePassword=0
    ).where(bdUser.c.Id == values.Id)
    engine.execute(query)
    engine.commit()
    return "ok"
# changePass


@app.get("/")
async def main_page():
    return RedirectResponse(url="/docs/", status_code=307)

app.include_router(material, tags=["material"])
app.include_router(users, tags=["users"])
app.include_router(product, tags=["product"])


# uvicorn --reload main:app --host 26.246.185.101 --port 8000
if __name__ == '__main__':
    uvicorn.run("main:app")
