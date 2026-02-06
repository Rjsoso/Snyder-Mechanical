import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const webhookUrl = import.meta.env.VITE_N8N_CHATBOT_WEBHOOK;

// Simple **bold** rendering for bot messages (no full markdown dependency)
const BoldText = ({ text }) => {
  if (!text) return null;
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <span>
      {parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))}
    </span>
  );
};

const ChatbotPlaceholder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Get or create session ID
  const sessionId = useRef(
    localStorage.getItem("chat_session") ??
      (() => {
        const id = crypto.randomUUID();
        localStorage.setItem("chat_session", id);
        return id;
      })()
  ).current;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading || !webhookUrl) return;

    const userMessage = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: trimmed,
          sessionId,
          session_id: sessionId // Send both formats for n8n compatibility
        }),
      });
      
      // Handle streaming response from n8n
      const text = await res.text();
      const lines = text.trim().split("\n").filter(line => line);
      
      // Collect all content chunks from streaming response
      let fullContent = "";
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          if (parsed.type === "item" && parsed.content) {
            fullContent += parsed.content;
          }
        } catch (e) {
          // Skip invalid JSON lines
        }
      }
      
      const data = { reply: fullContent || "Sorry, I didn't get a response." };

      if (!res.ok) {
        throw new Error(data?.message || "Something went wrong");
      }

      const reply = data.reply ?? data.message ?? "Sorry, I didn’t get a response.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      const fallback = err.message || "Connection error. Please try again or call us.";
      setError(fallback);
      setMessages((prev) => [...prev, { role: "assistant", content: fallback }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // No webhook configured: keep "Coming Soon" behavior
  if (!webhookUrl) {
    return (
      <div className="fixed bottom-20 right-6 z-50 lg:bottom-6 flex items-center gap-3">
        {!isOpen && <FloatingBubble />}
        <div className="flex flex-col items-end">
          {isOpen && (
            <div className="mb-4 w-80 md:w-96 bg-white rounded-lg shadow-2xl overflow-hidden">
              <ChatHeader onClose={() => setIsOpen(false)} />
              <div className="p-6 h-96 flex items-center justify-center bg-secondary-50">
                <div className="text-center text-secondary-600">
                  <MessageCircle className="w-16 h-16 mx-auto mb-4 text-secondary-400" />
                  <p className="mb-2">AI Chatbot Coming Soon!</p>
                  <p className="text-sm">For now, please call us or use our contact form.</p>
                </div>
              </div>
            </div>
          )}
          <ChatButton isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-20 right-6 z-50 lg:bottom-6 flex items-center gap-3">
      {!isOpen && <FloatingBubble />}
      <div className="flex flex-col items-end">
        {isOpen && (
          <div className="mb-4 w-[calc(100vw-3rem)] max-w-sm md:w-96 bg-white rounded-xl shadow-2xl overflow-hidden border border-secondary-200 flex flex-col max-h-[32rem]">
            <div className="bg-primary-600 text-white p-4 flex items-center justify-between flex-shrink-0">
              <h3 className="font-semibold">Chat with us</h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="hover:bg-primary-700 p-1 rounded transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto min-h-0 bg-secondary-50 p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-secondary-500 text-sm py-4">
                  Ask about our services, hours, or how we can help.
                </div>
              )}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                      msg.role === "user"
                        ? "bg-primary-600 text-white"
                        : "bg-white text-secondary-900 border border-secondary-200 shadow-sm"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="whitespace-pre-wrap">
                        <BoldText text={msg.content} />
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-secondary-200 rounded-2xl px-4 py-2 shadow-sm">
                    <Loader2 className="w-5 h-5 text-primary-600 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-3 border-t border-secondary-200 bg-white flex-shrink-0">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  className="flex-1 rounded-lg border border-secondary-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="bg-primary-600 text-white rounded-lg p-2 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Send"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
              {error && (
                <p className="text-red-600 text-xs mt-2" role="alert">
                  {error}
                </p>
              )}
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
};

// Floating bubble component
function FloatingBubble() {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="bg-white shadow-lg rounded-full px-4 py-2 text-sm font-medium text-secondary-700 whitespace-nowrap flex items-center gap-2">
        Have a question? →
      </div>
    </motion.div>
  );
}

// Reusable pieces for "no webhook" branch
function ChatHeader({ onClose }) {
  return (
    <div className="bg-primary-600 text-white p-4 flex items-center justify-between">
      <h3 className="font-semibold">Chat with us</h3>
      <button type="button" onClick={onClose} className="hover:bg-primary-700 p-1 rounded transition-colors">
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}

function ChatButton({ isOpen, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
      aria-label={isOpen ? "Close chat" : "Open chat"}
    >
      {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
    </button>
  );
}

export default ChatbotPlaceholder;
