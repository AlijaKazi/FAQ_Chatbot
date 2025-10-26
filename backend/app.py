from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import random
import pickle
import json
import re
from tensorflow.keras.preprocessing.sequence import pad_sequences

app = Flask(__name__)
CORS(app)

# Load model and tokenizer
model = tf.keras.models.load_model("model/chatbot_model.h5")
tokenizer = pickle.load(open("model/tokenizer.pkl", "rb"))
labels = pickle.load(open("model/labels.pkl", "rb"))

with open("data/intents.json", "r", encoding="utf-8") as f:
    intents = json.load(f)

max_len = 20

def clean_input(text):
    text = text.lower().strip()
    text = re.sub(r"[^\w\s]", "", text)
    return text

def predict_class(sentence):
    cleaned = clean_input(sentence)
    seq = tokenizer.texts_to_sequences([cleaned])
    padded = pad_sequences(seq, maxlen=max_len, padding="post")
    preds = model.predict(padded)
    tag_index = np.argmax(preds)
    confidence = preds[0][tag_index]

    # Debug logs BEFORE return
    print("Input:", sentence)
    print("Cleaned:", cleaned)
    print("Prediction vector:", preds[0])
    print("Predicted tag:", labels[tag_index])
    print("Confidence:", confidence)

    if confidence < 0.1:
        return None
    return labels[tag_index]



def get_response(tag):
    for intent in intents["intents"]:
        if intent["tag"] == tag:
            return random.choice(intent["responses"])
    return "I'm not sure I understand. Could you rephrase that?"

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_msg = data.get("message", "")
    if not user_msg:
        return jsonify({"response": "Please type a message."})
    
    intent = predict_class(user_msg)
    if intent:
        response = get_response(intent)
    else:
        response = "I'm not sure I understand. Can you try again with a different phrasing?"
    
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
