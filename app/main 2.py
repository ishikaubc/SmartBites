from fastapi import FastAPI, UploadFile, File, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import json
import requests
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
url = "https://ocr.asprise.com/api/v1/receipt"
ALLOWED_FILE_TYPE = {"image/png", "image/jpeg", "application/pdf"}
@app.get("/", status_code=200)
async def root():
    return {"message": "Welcome to SmartBites"}

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
