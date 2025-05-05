import json
import os
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

DATA_FILE = 'repertoire.json'

def load_contacts():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as f:
            return json.load(f)
    return []

def save_contacts(contacts):
    with open(DATA_FILE, 'w') as f:
        json.dump(contacts, f, indent=2)

@app.route('/api/contacts', methods=['POST'])
def add_contact():
    data = request.get_json()
    name = data.get('name')
    phone = data.get('phone')
    
    if not name or not phone:
        return jsonify({'error': 'Name and phone are required'}), 400
    
    contacts = load_contacts()
    contacts.append({'name': name, 'phone': phone})
    save_contacts(contacts)
    
    return jsonify({'message': 'Contact added successfully'}), 201

@app.route('/api/contacts/search', methods=['GET'])
def search_contact():
    name = request.args.get('name')
    if not name:
        return jsonify({'error': 'Name is required'}), 400
    
    contacts = load_contacts()
    for contact in contacts:
        if contact['name'].lower() == name.lower():
            return jsonify({'name': contact['name'], 'phone': contact['phone']})
    
    return jsonify({'error': 'Contact not found'}), 404

if __name__ == '__main__':
    app.run()