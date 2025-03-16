const OpenAI = require("openai");

// Initialize OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Store conversation history
const conversationHistory = [
  {
    role: "developer",
    content:
      "You are a helpful assistant. Keep track of previous responses to maintain context.",
  },
];

async function chatAI(content) {
  // Append user message to conversation history
  conversationHistory.push({ role: "user", content });

  try {
    // Send the full conversation history
    const openai = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: conversationHistory,
      stream: true,
    });

    let response = "";

    // Stream the response
    for await (const chunk of openai) {
      const chunkContent = chunk.choices[0]?.delta?.content || "";
      response += chunkContent;
    }

    // Append assistant response to conversation history
    conversationHistory.push({ role: "assistant", content: response });

    return response;
  } catch (error) {
    console.error("Error streaming response:", error);
    return "Internal Server Error";
  }
}

function clearConversation() {
  conversationHistory.length = 0;
  conversationHistory.push({
    role: "developer",
    content:
      "You are a helpful assistant. Keep track of previous responses to maintain context.",
  });
}

module.exports = { chatAI, clearConversation };
