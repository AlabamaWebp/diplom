from sqlalchemy import select

from data.BD.base import User, engine, Role
from data.SCHEMAS.s_users import UserModel


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
