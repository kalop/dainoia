from fastapi import FastAPI

# app/middleware/strip_trailing_slash.py
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request

from app.api.routes_auth import router as auth_router
from app.api.routes_users import router as users_router


class StripTrailingSlashMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        scope_path = request.scope["path"]
        # If not root and ends with a slash, redirect to the version without slash
        if scope_path != "/" and scope_path.endswith("/"):
            request.scope["path"] = scope_path.rstrip("/")
        return await call_next(request)


app = FastAPI()
app.add_middleware(StripTrailingSlashMiddleware)

app.include_router(users_router)
app.include_router(auth_router)
