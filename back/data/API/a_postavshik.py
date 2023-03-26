from fastapi import APIRouter

from data.BD.b_postavshik import get_post, get_type, create_post
from data.SCHEMAS.s_postavshik import PostavhikModel, PostavshikInsert, OnlyTypes

postavshik = APIRouter()
postavshik.prefix = "/postavshik/"


@postavshik.get("all/")
async def postavshik_all() -> list[PostavhikModel]:
    return get_post()


@postavshik.get("types/")
async def types_all() -> list[OnlyTypes]:
    return get_type()


@postavshik.post("create/")
async def postavshik_all(
    data: PostavshikInsert
) -> list[PostavshikInsert]:
    return create_post(data)
