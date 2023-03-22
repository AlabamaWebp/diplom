import uvicorn
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import RedirectResponse

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def main_page():
    return RedirectResponse(url="/docs/", status_code=307)

# uvicorn --reload main:app --host 26.246.185.101 --port 8000
if __name__ == '__main__':
    uvicorn.run("main:app")
