const API_URL = "http://127.0.0.1:5000/chat";

export const sendMessageToBot = async (message) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error sending message:", error);
    return "Sorry, I couldn’t connect to the chatbot server.";
  }
};
