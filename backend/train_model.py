import json
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, Embedding, GlobalAveragePooling1D
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from sklearn.utils import shuffle
import pickle
import os

# Load intents
with open("data/intents.json", "r", encoding="utf-8") as file:
    data = json.load(file)

texts, labels, classes = [], [], []

for intent in data["intents"]:
    for pattern in intent["patterns"]:
        texts.append(pattern)
        labels.append(intent["tag"])
    if intent["tag"] not in classes:
        classes.append(intent["tag"])

# Tokenize
tokenizer = Tokenizer(oov_token="<OOV>")
tokenizer.fit_on_texts(texts)
sequences = tokenizer.texts_to_sequences(texts)
max_len = 20
padded = pad_sequences(sequences, maxlen=max_len, padding="post")

# Encode labels
label_index = {tag: i for i, tag in enumerate(classes)}
y_train = np.array([label_index[label] for label in labels])

# Shuffle data
padded, y_train = shuffle(padded, y_train, random_state=42)

# Build model
vocab_size = len(tokenizer.word_index) + 1

model = Sequential([
    Embedding(vocab_size, 64, input_length=max_len),
    GlobalAveragePooling1D(),
    Dense(128, activation='relu'),
    Dropout(0.3),
    Dense(64, activation='relu'),
    Dropout(0.3),
    Dense(len(classes), activation='softmax')
])

model.compile(
    loss='sparse_categorical_crossentropy',
    optimizer=Adam(learning_rate=0.001),
    metrics=['accuracy']
)

# Train model
model.fit(padded, y_train, epochs=100, validation_split=0.2, verbose=1)

# Save assets
os.makedirs("model", exist_ok=True)
model.save("model/chatbot_model.h5")
pickle.dump(tokenizer, open("model/tokenizer.pkl", "wb"))
pickle.dump(classes, open("model/labels.pkl", "wb"))
pickle.dump(label_index, open("model/label_index.pkl", "wb"))

print("✅ Model trained and saved successfully!")
