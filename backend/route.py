from fastapi import APIRouter,status
from models import info,Login,Otp
from database import collection_name
from schemas import information_info
from passlib.context import CryptContext
from pymongo.mongo_client import MongoClient
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
import jwt
import random
import requests

router=APIRouter()

SECRET_KEY="farmstacklogin123456789"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=800


db=MongoClient("mongodb://localhost:27017")
pxt_cd=CryptContext(schemes=["bcrypt"],deprecated="auto")

otp_storage={"mobile":0,
             "otp":0}

@router.get("/")
async def get(Name:str):
    conn=information_info(collection_name.find({'name':Name}))
    for x in conn:
        return x
    else:
        return "User Not Found"
@router.post("/post",status_code=status.HTTP_201_CREATED)
async def post(user:info):
    hashedpassword=pxt_cd.hash(user.password)
    conn=collection_name.insert_one(
        {'name':user.name,
         "email":user.email,
         "mobile":user.mobile,
         "password":hashedpassword})
    if conn:
        return "Username Created Successfully"
    else:
        return "Username not created"
# @router.post("/login",status_code=status.HTTP_200_OK)
# async def login(login:Login):
#     conn=information_info(collection_name.find({'mobile':login.mobile}))
#     for user in conn:
#         verify_password=pxt_cd.verify(login.password,user["password"])
#         if verify_password and login.mobile==user["mobile"]:
#             # return { "name":user['name'] ,"email":user['email'],"mobile":user['mobile']}
#             return "LOGIN SUCCESSFUL"
#     else:
#         return "User Not Found/Invalid credentials"
# @router.post("/login",status_code=status.HTTP_200_OK)
# async def login(user:Login):
#     data=jsonable_encoder(user)
#     conn = information_info(collection_name.find({'mobile': user.mobile}))
#     for x in conn:
#         verify_password=pxt_cd.verify(data["password"],x["password"])
#         if x["mobile"]==data["mobile"] and verify_password:
#             encoded_jwt=jwt.encode(data,SECRET_KEY,algorithm=ALGORITHM)
#             return {
#                 "token":encoded_jwt,
#                 "name":x["name"]
#             }
#         else:
#             return {"message":"login failed"}
@router.post("/login",status_code=status.HTTP_200_OK)
async def login(user:Login):
    data=jsonable_encoder(user)
    conn = information_info(collection_name.find({'mobile': user.mobile}))
    for x in conn:
        if x["mobile"]==data["mobile"]:
            OTP=random.randint(1000,9999)
            otp_storage["mobile"]=x["mobile"]
            otp_storage["otp"]=OTP
            print(otp_storage)
            OYP=str(otp_storage["otp"])
            NUMBER=str(otp_storage["mobile"])
            url = "<ENTER FAST2SMS URL>"
            querystring = {
                "authorization": "<ENTER YOUR AUTHORIZATION KEY>",
                "variables_values": OYP, "route": "otp", "numbers": NUMBER}
            headers = {
                'cache-control': "no-cache"
            }
            response = requests.request("GET", url, headers=headers, params=querystring)
            print(response.text)
            return {
                'message':"Username Exists",
                'name':x["name"],
            }
    return "User not found"

@router.post("/otp",status_code=status.HTTP_202_ACCEPTED)
async def otp(user:Otp):
    data=jsonable_encoder(user)
    conn = information_info(collection_name.find({'mobile': otp_storage["mobile"]}))
    for x in conn:
        if data["otp"] == otp_storage["otp"]:
            return {"message": "Login Successful",
                    "mobile": otp_storage["mobile"],
                    "name": x["name"]}
        else:
            return "Invalid OTP"