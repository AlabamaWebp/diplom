from fastapi import APIRouter

from data.BD.b_postavshik import get_post
from data.SCHEMAS.s_postavshik import PostavhikModel

postavshik = APIRouter()
postavshik.prefix = "/postavshik/"


@postavshik.get("all/")
async def postavshik_all() -> list[PostavhikModel]:
    return get_post()

