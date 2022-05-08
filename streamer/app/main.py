from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import uvicorn

from constants import *
from utils import *


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


@app.get("/")
async def stream():
    return StreamingResponse(gen_frames(), media_type='multipart/x-mixed-replace; boundary=frame')


# check to see if this is the main thread of execution
if __name__ == '__main__':
    # start the flask app
    uvicorn.run(app, host="0.0.0.0", port=HTTP_PORT, access_log=False)
