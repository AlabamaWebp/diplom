import uvicorn
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import RedirectResponse
# from data.BD.base import create_tables_if_not_exists as CTINE
from data.API.Material import material

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# @app.on_event("startup")
# async def create_tables():
#     CTINE()


@app.get("/")
async def main_page():
    return RedirectResponse(url="/docs/", status_code=307)

app.include_router(material)


# uvicorn --reload main:app --host 26.246.185.101 --port 8000
if __name__ == '__main__':
    uvicorn.run("main:app")
