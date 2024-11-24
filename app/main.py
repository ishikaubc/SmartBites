from fastapi import FastAPI, UploadFile, File, HTTPException, status, Depends, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
import json
import requests
from pydantic import BaseModel
import os


app = FastAPI()

SUPABASE_URL = 'https://xnfdhvtpulfyldqlyvel.supabase.co/'
SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuZmRodnRwdWxmeWxkcWx5dmVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIzNjIwODAsImV4cCI6MjA0NzkzODA4MH0.sAIGWof7P58i2FZ-U9ORL1QHmPzr0O9BRknfHIEqBDU'

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
url = "https://ocr.asprise.com/api/v1/receipt"
ALLOWED_FILE_TYPE = {"image/png", "image/jpeg", "application/pdf"}

class UpdatePointsRequest(BaseModel):
    user_id: int
    new_points: int

class UpdatePointsResponse(BaseModel):
    message: str

@app.get("/", status_code=200)
async def root():
    return {"message": "Welcome to SmartBites"}

@app.get("/get_users", status_code=200)
async def read_users(requests: Request):
    response = supabase.table('wallet').select('*').execute()
    users = response.data
    return JSONResponse(content={"data": users})


@app.post("/update_points", status_code=200, response_model=UpdatePointsResponse)
async def update_user_points(payload: UpdatePointsRequest):
    user = supabase.table('wallet').select("*").eq("user_id", payload.user_id).execute()
    print(f"User:{user}")
    if not user.data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    response = supabase.table('wallet').update({'total_points': payload.new_points}).eq("user_id", payload.user_id).execute()
    print(f"Response: {response}")
    return UpdatePointsResponse(message="Points updated successfully")
   


@app.post("/receipt_calc", status_code=200)
async def calc_pts(file: UploadFile = File(...)):
    if file.content_type not in ALLOWED_FILE_TYPE:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail="Invalid file format."
        )
    else:
        file_content = await file.read()
        res = requests.post(
            url, 
            data={
                'api_key': 'TEST',
                'recognizer': 'auto',
                'ref_no': 'oct_python_123'
            },
            files={'file': ('receipt.jpg', file_content, file.content_type)} 
        )

        if res.status_code != 200:
            raise HTTPException(
                status_code=res.status_code,
                detail="Error processing the receipt"
            )
        data = res.json()
        try:
            subtotal = data['receipts'][0]['subtotal']
            points = int(subtotal)  
        except KeyError:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Subtotal not found in the response"
            )
        return JSONResponse(content={"Points": points})
