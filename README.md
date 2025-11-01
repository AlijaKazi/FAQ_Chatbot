This guide explains how to set up the Python backend and Node.js frontend, install all necessary libraries, and run the project.
# Clone the repository : git clone https://github.com/AlijaKazi/FAQ_Chatbot.git
# Open Folder 
   cd FAQ_Chatbot
```FOR BACKEND```
# Create virtual environment :
   cd backend
   python -m venv venv
# Activate virtual environment
   venv\Scripts\Activate 
# Upgrade pip
   python.exe -m pip install --upgrade pip
# Install required Python libraries
   pip install -r requirements.txt
   pip install numpy 
   pip install tensorflow
   pip install scikit-learn
# Train the model
   python train_model.py
# Run the backend
   python app.py

```for frontend```
# Open folder
   cd faq-chatbot
# Install node modules
   npm install
# Run frontend
   npm start
