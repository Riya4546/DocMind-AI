from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend to talk to backend
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
def process_document():
    return {
        "vendor": "Amazon",
        "amount": "₹2500",
        "date": "10/05/2026"
    }