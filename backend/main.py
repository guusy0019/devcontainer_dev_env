from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import models
from database import engine, get_db

# データベーステーブルを作成
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORSの設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],  # フロントエンドのオリジン
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/users/", response_model=List[dict])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = db.query(models.User).offset(skip).limit(limit).all()
    return [{"id": user.id, "name": user.name, "email": user.email} for user in users]


@app.post("/users/")
def create_user(name: str, email: str, db: Session = Depends(get_db)):
    db_user = models.User(name=name, email=email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"id": db_user.id, "name": db_user.name, "email": db_user.email}
