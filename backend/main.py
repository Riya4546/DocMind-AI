import pdfplumber
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "DocMind AI Backend Running"
    }

@app.post("/process-document")
async def process_document(file: UploadFile = File(...)):

    contents = await file.read()

    with open("temp.pdf", "wb") as f:
        f.write(contents)

    extracted_text = ""

    with pdfplumber.open("temp.pdf") as pdf:

        for page in pdf.pages:

            text = page.extract_text()

            if text:
                extracted_text += text + "\n"

    lines = extracted_text.split("\n")

    important_lines = []

    for line in lines:

        cleaned = line.strip()

        if len(cleaned) > 5:
            important_lines.append(cleaned)

    return {
        "filename": file.filename,
        "important_data": important_lines[:10],
        "text": extracted_text[:3000]
    }