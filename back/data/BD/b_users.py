from sqlalchemy import select

from data.BD.base import User, engine, Role, UniversalModel
from data.SCHEMAS.s_users import UserModel, UserCreateModel


def get_users() -> list[UserModel]:
    query = select(
        User.c.Id,
        User.c.Name,
        User.c.Surname,
        User.c.Patronymic,
        User.c.LoginDate,
        User.c.RegistrationDate,
        select(Role.c.Name).where(Role.c.Id == User.c.RoleId).label("role")
    )
    values = engine.execute(query).fetchall()

    out_values = []

    for item in values:
        return_values = UserModel(
            id=item[0],
            name=item[1],
            surname=item[2],
            patronymic=item[3],
            login=item[4],
            registration=item[5],
            role=item[6]
        )
        out_values.append(return_values)
    return out_values


def get_roles() -> list[UniversalModel]:
    query = select(
        Role.c.Id,
        Role.c.Name,
    )
    values = engine.execute(query).fetchall()

    out_values = []

    for item in values:
        return_values = UniversalModel(
            id=item[0],
            name=item[1],
        )
        out_values.append(return_values)
    return out_values



def create_user(data: UserCreateModel):
    query = User.insert().values(
        Name=data.name,
        Surname=data.surname,
        Patronymic=data.patronymic,
        Login=data.login,
        Password=data.password,
        RoleId=data.role
    )
    engine.execute(query)
    engine.commit()


def update_user(id: int, data: UserCreateModel):
    query = User.insert().values(
        Name=data.name,
        Surname=data.surname,
        Patronymic=data.patronymic,
        Login=data.login,
        Password=data.password,
        RoleId=data.role
    ).where(User.c.Id == id)
    engine.execute(query)
    engine.commit()


def del_user(id: int):
    query = User.delete().where(User.c.Id == id)
    engine.execute(query)
    engine.commit()
