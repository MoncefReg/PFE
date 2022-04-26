from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

from app.constants import DEBUG


def get_application():
    _app = FastAPI(title="stream-api",
                   version="1.0",
                   docs_url="/api/v1/stream/docs",
                   openapi_url="/api/v1/stream/openapi.json",
                   debug=DEBUG, )

    _app.add_middleware(
        CORSMiddleware,
        allow_origins=['*'],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return _app


app = get_application()
