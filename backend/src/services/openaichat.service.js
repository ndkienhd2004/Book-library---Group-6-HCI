const OpenAI = require("openai");
const openai = require("../config/openai.config.js");

// Store conversation history
const conversationHistory = [
  {
    role: "developer",
    content:
      "Bạn là một trợ lý hữu ích. Theo dõi các câu trả lời trước đó để tiếp diễn cuộc hội thoại.",
  },
];

async function chatAI(content) {
  // Append user message to conversation history
  conversationHistory.push({ role: "user", content });

  try {
    // Send the full conversation history
    const AIrespone = openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: conversationHistory,
      stream: true,
    });

    let response = "";

    // Stream the response
    for await (const chunk of AIrespone) {
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
      "Bạn là một trợ lý hữu ích. Theo dõi các câu trả lời trước đó để tiếp diễn cuộc hội thoại.",
  });
}

module.exports = { chatAI, clearConversation };
