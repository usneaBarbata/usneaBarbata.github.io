from fastapi import FastAPI
from pydantic import BaseModel
import json

app = FastAPI()

# Simple in-memory "database"
contacts = []

class Contact(BaseModel):
    name: str
    phone: str

@app.post("/api/contacts/add")
async def add_contact(contact: Contact):
    contacts.append(contact.dict())
    return {"success": True}

@app.get("/api/contacts/search")
async def search_contacts(name: str = ''):
    # Search contacts by name
    results = [contact for contact in contacts if name.lower() in contact['name'].lower()]
    return results

