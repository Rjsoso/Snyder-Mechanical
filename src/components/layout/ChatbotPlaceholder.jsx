import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Use internal API proxy to avoid CORS issues with n8n
const webhookUrl = '/api/chatbot/chat';

// Max messages to keep in memory and send as history (last N for context, avoid huge payloads)
const MAX_HISTORY_MESSAGES = 30;

const CHAT_MESSAGES_KEY = (sessionId) => `chat_messages_${sessionId}`;

const WELCOME_MESSAGE =
  "Hi! I'm here to help, to get started:\n\nAsk about our services, hours, or how we can assist you with a project!";

const QUICK_REPLIES = ["Plumbing", "HVAC", "Get a quote"];

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

// Typing indicator: three bouncing dots in assistant-style bubble
function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-white border border-secondary-200 rounded-2xl px-4 py-2.5 shadow-sm">
        <div className="flex gap-1 items-center">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-2 h-2 rounded-full bg-secondary-400"
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

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

  // Rehydrate thread from localStorage on mount; show welcome when no history
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CHAT_MESSAGES_KEY(sessionId));
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      }
      setMessages([{ role: "assistant", content: WELCOME_MESSAGE }]);
    } catch (_) {
      setMessages([{ role: "assistant", content: WELCOME_MESSAGE }]);
    }
  }, [sessionId]);

  // Persist last N messages to localStorage when messages change
  useEffect(() => {
    if (messages.length > 0) {
      try {
        const toStore = messages.slice(-MAX_HISTORY_MESSAGES);
        localStorage.setItem(CHAT_MESSAGES_KEY(sessionId), JSON.stringify(toStore));
      } catch (_) {
        // Ignore quota or other storage errors
      }
    }
  }, [messages, sessionId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (optionalText) => {
    const trimmed = (optionalText ?? input.trim()).trim();
    if (!trimmed || loading || !webhookUrl) return;

    const userMessage = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    if (optionalText == null) setInput("");
    setError(null);
    setLoading(true);

    try {
      const history = [...messages, userMessage].slice(-MAX_HISTORY_MESSAGES);
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          sessionId,
          session_id: sessionId, // Send both formats for n8n compatibility
          messages: history,
          history: history, // Some n8n nodes expect "history"
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

  const showQuickReplies =
    messages.length === 1 &&
    messages[0].role === "assistant" &&
    !loading;

  return (
    <div className="fixed bottom-20 right-6 z-50 lg:bottom-6 flex items-center gap-3">
      {!isOpen && <FloatingBubble />}
      <div className="flex flex-col items-end">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="chat-panel"
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mb-4 w-[calc(100vw-3rem)] max-w-sm md:max-w-md bg-white rounded-2xl shadow-xl ring-1 ring-black/5 overflow-hidden border border-secondary-200 flex flex-col max-h-[36rem]"
            >
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <MessageCircle className="w-6 h-6 flex-shrink-0" aria-hidden />
                <div className="min-w-0">
                  <h3 className="font-semibold">Chat with us</h3>
                  <p className="text-primary-100 text-xs font-medium mt-0.5 flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    Online · We&apos;re here to help
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-1.5 rounded-lg transition-colors flex-shrink-0"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto min-h-0 bg-secondary-50 p-5 space-y-4">
              {messages.map((msg, i) => {
                const isLast = i === messages.length - 1;
                const wrapper = isLast ? (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
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
                  </motion.div>
                ) : (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
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
                );
                return <div key={i}>{wrapper}</div>;
              })}
              {showQuickReplies && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {QUICK_REPLIES.map((label) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => sendMessage(label)}
                      className="rounded-full bg-white border border-secondary-200 shadow-sm px-4 py-2 text-sm font-medium text-secondary-700 hover:bg-secondary-50 hover:border-primary-300 transition-colors"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
              {loading && <TypingIndicator />}
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
                  onClick={() => sendMessage()}
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
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg ring-2 ring-primary-200 focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 flex items-center justify-center transition-colors hover:shadow-xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </motion.button>
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
        Ask us anything →
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
