import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, MessageSquarePlus, Paperclip, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Use internal API proxy to avoid CORS issues with n8n
const webhookUrl = '/api/chatbot/chat';

// Max messages to keep in memory and send as history (last N for context, avoid huge payloads)
const MAX_HISTORY_MESSAGES = 30;

const CHAT_MESSAGES_KEY = (sessionId) => `chat_messages_${sessionId}`;

const RELOAD_RESET_THRESHOLD = 3;

const WELCOME_MESSAGE =
  "Hi! I'm here to help, to get started:\n\nAsk about our services, hours, or how we can assist you with a project!";

const QUICK_REPLIES = ["Residential", "Commercial", "Pumps & Equipment", "Request a quote"];

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
      <div className="bg-white/90 border border-secondary-200/80 rounded-2xl px-4 py-3 shadow-sm">
        <div className="flex gap-1.5 items-center">
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
  const [attachedFiles, setAttachedFiles] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Session ID as state so "New conversation" and reload reset can switch threads
  const [sessionId, setSessionId] = useState(() => {
    const stored = localStorage.getItem("chat_session");
    if (stored) return stored;
    const id = crypto.randomUUID();
    localStorage.setItem("chat_session", id);
    return id;
  });

  // After 3 reloads: clear storage and start a new conversation on this load
  useEffect(() => {
    const reloadCount =
      parseInt(sessionStorage.getItem("chat_reload_count") || "0", 10) + 1;
    sessionStorage.setItem("chat_reload_count", String(reloadCount));
    if (reloadCount >= RELOAD_RESET_THRESHOLD) {
      sessionStorage.setItem("chat_reload_count", "0");
      localStorage.removeItem("chat_session");
      try {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key?.startsWith("chat_messages_")) keysToRemove.push(key);
        }
        keysToRemove.forEach((k) => localStorage.removeItem(k));
      } catch (_) {}
      const newId = crypto.randomUUID();
      localStorage.setItem("chat_session", newId);
      setSessionId(newId);
      setMessages([{ role: "assistant", content: WELCOME_MESSAGE }]);
      setError(null);
    }
  }, []);

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

    const hasAttachments = attachedFiles.length > 0;
    const userMessage = { 
      role: "user", 
      content: trimmed,
      hasAttachments,
      attachmentCount: attachedFiles.length,
    };
    setMessages((prev) => [...prev, userMessage]);
    if (optionalText == null) setInput("");
    setError(null);
    setLoading(true);

    try {
      const history = [...messages, userMessage].slice(-MAX_HISTORY_MESSAGES);
      
      // Prepare payload for n8n
      const payload = {
        message: trimmed,
        sessionId,
        session_id: sessionId, // Send both formats for n8n compatibility
        messages: history,
        history: history, // Some n8n nodes expect "history"
      };

      // If files are attached, convert to base64 and include in payload
      if (hasAttachments) {
        const attachments = await convertFilesToBase64(attachedFiles);
        payload.attachments = attachments;
        payload.hasAttachments = true;
        payload.attachmentCount = attachedFiles.length;
        
        // Note: Files stay attached until user manually removes them
        // This allows multi-turn conversations before submitting the quote
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 45000);
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      
      // Handle streaming or single-JSON response from n8n
      const text = await res.text();
      const lines = text.trim().split("\n").filter(line => line);
      let fullContent = "";

      // Try single JSON response (e.g. {"reply":"..."} from n8n webhook)
      try {
        const single = JSON.parse(text.trim());
        if (single.reply != null) fullContent = String(single.reply);
        else if (single.message != null) fullContent = String(single.message);
      } catch (_) {
        // Not single JSON, fall through to streaming
      }

      // If no single-JSON reply, collect from streaming lines
      if (!fullContent) {
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
      }

      const emptyReplyMessage = "The response was empty. Please try again in a moment.";
      const data = { reply: fullContent || emptyReplyMessage };

      if (!res.ok) {
        throw new Error(data?.message || "Something went wrong");
      }

      const reply = data.reply ?? data.message ?? emptyReplyMessage;
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      const isTimeout = err.name === "AbortError";
      const fallback = isTimeout
        ? "The request took too long. Please try again."
        : err.message || "Connection error. Please try again or call us.";
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

  const startNewConversation = () => {
    const oldId = sessionId;
    const newId = crypto.randomUUID();
    localStorage.setItem("chat_session", newId);
    try {
      localStorage.removeItem(CHAT_MESSAGES_KEY(oldId));
    } catch (_) {}
    setSessionId(newId);
    setMessages([{ role: "assistant", content: WELCOME_MESSAGE }]);
    setAttachedFiles([]);
    setError(null);
  };

  // File handling constants
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB per file
  const MAX_FILES = 5;
  const MAX_TOTAL_SIZE = 25 * 1024 * 1024; // 25MB total (Resend limit is 40MB)
  const ALLOWED_FILE_TYPES = {
    // Images
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
    'image/gif': ['.gif'],
    'image/webp': ['.webp'],
    // Documents
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    // Spreadsheets
    'application/vnd.ms-excel': ['.xls'],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    // Text
    'text/plain': ['.txt'],
    'text/csv': ['.csv'],
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const validateFile = (file) => {
    if (!ALLOWED_FILE_TYPES[file.type]) {
      return `File type not allowed: ${file.name}. Please use images, PDFs, documents, or spreadsheets.`;
    }
    if (file.size > MAX_FILE_SIZE) {
      return `File too large: ${file.name}. Maximum size is ${formatFileSize(MAX_FILE_SIZE)}.`;
    }
    return null;
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    // Check max files
    if (attachedFiles.length + files.length > MAX_FILES) {
      setError(`Maximum ${MAX_FILES} files allowed.`);
      return;
    }

    // Validate each file
    const validFiles = [];
    for (const file of files) {
      const error = validateFile(file);
      if (error) {
        setError(error);
        return;
      }
      validFiles.push(file);
    }

    // Check total size
    const currentSize = attachedFiles.reduce((sum, f) => sum + f.size, 0);
    const newSize = validFiles.reduce((sum, f) => sum + f.size, 0);
    if (currentSize + newSize > MAX_TOTAL_SIZE) {
      setError(`Total file size exceeds ${formatFileSize(MAX_TOTAL_SIZE)}.`);
      return;
    }

    setAttachedFiles([...attachedFiles, ...validFiles]);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index) => {
    setAttachedFiles(attachedFiles.filter((_, i) => i !== index));
  };

  const convertFilesToBase64 = async (files) => {
    const filePromises = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result.split(',')[1];
          resolve({
            filename: file.name,
            content: base64,
            contentType: file.type,
            size: file.size,
          });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    return await Promise.all(filePromises);
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
              className="mb-4 w-[calc(100vw-3rem)] max-w-sm md:max-w-md bg-white rounded-2xl shadow-2xl shadow-black/10 overflow-hidden border border-secondary-200/80 flex flex-col max-h-[36rem]"
            >
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-5 py-4 flex items-center justify-between flex-shrink-0 border-b border-primary-500/30">
              <div className="flex items-center gap-3 min-w-0">
                <MessageCircle className="w-6 h-6 flex-shrink-0 opacity-95" aria-hidden />
                <div className="min-w-0">
                  <h3 className="font-semibold text-base tracking-tight">Chat with us</h3>
                  <p className="text-primary-100 text-xs font-medium mt-0.5">
                    We&apos;re here to help
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  type="button"
                  onClick={startNewConversation}
                  className="hover:bg-white/10 active:bg-white/15 p-2 rounded-lg transition-colors"
                  aria-label="Start new conversation"
                  title="New conversation"
                >
                  <MessageSquarePlus className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/10 active:bg-white/15 p-2 rounded-lg transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto min-h-0 bg-secondary-50/80 p-5 space-y-4 scroll-smooth">
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
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary-600 text-white shadow-sm"
                          : "bg-white text-secondary-800 border border-secondary-200/80 shadow-sm"
                      }`}
                    >
                      {msg.role === "assistant" ? (
                        <div className="whitespace-pre-wrap">
                          <BoldText text={msg.content} />
                        </div>
                      ) : (
                        <>
                          {msg.content}
                          {msg.hasAttachments && (
                            <div className="flex items-center gap-1 mt-2 text-xs opacity-90">
                              <Paperclip className="w-3 h-3" />
                              <span>{msg.attachmentCount} file{msg.attachmentCount > 1 ? 's' : ''}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary-600 text-white shadow-sm"
                          : "bg-white text-secondary-800 border border-secondary-200/80 shadow-sm"
                      }`}
                    >
                      {msg.role === "assistant" ? (
                        <div className="whitespace-pre-wrap">
                          <BoldText text={msg.content} />
                        </div>
                      ) : (
                        <>
                          {msg.content}
                          {msg.hasAttachments && (
                            <div className="flex items-center gap-1 mt-2 text-xs opacity-90">
                              <Paperclip className="w-3 h-3" />
                              <span>{msg.attachmentCount} file{msg.attachmentCount > 1 ? 's' : ''}</span>
                            </div>
                          )}
                        </>
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
                      className="rounded-full bg-white border border-secondary-200/80 px-4 py-2.5 text-sm font-medium text-secondary-700 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-700 transition-colors duration-150"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
              {loading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-secondary-200/80 bg-white flex-shrink-0">
              {/* File Preview Area */}
              {attachedFiles.length > 0 && (
                <div className="mb-3 space-y-2">
                  {attachedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-secondary-50 border border-secondary-200 rounded-lg px-3 py-2 text-sm"
                    >
                      <FileText className="w-4 h-4 text-secondary-500 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-secondary-800 font-medium truncate">
                          {file.name}
                        </p>
                        <p className="text-secondary-500 text-xs">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="p-1 hover:bg-secondary-200 rounded transition-colors flex-shrink-0"
                        aria-label={`Remove ${file.name}`}
                      >
                        <X className="w-4 h-4 text-secondary-600" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Input Area */}
              <div className="flex gap-2.5">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.txt,.csv"
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={loading || attachedFiles.length >= MAX_FILES}
                  className="p-2.5 rounded-xl border border-secondary-200 text-secondary-600 hover:bg-secondary-50 hover:border-secondary-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  aria-label="Attach files"
                  title="Attach files"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  className="flex-1 rounded-xl border border-secondary-200 px-4 py-2.5 text-sm placeholder:text-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-400 transition-shadow disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => sendMessage()}
                  disabled={loading || (!input.trim() && attachedFiles.length === 0)}
                  className="bg-primary-600 text-white rounded-xl p-2.5 hover:bg-primary-700 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 transition-all duration-150"
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
          className="w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg shadow-primary-900/20 ring-2 ring-primary-200/50 focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 flex items-center justify-center transition-all duration-200 hover:shadow-xl"
          whileHover={{ scale: 1.05 }}
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
      animate={{ y: [0, -6, 0] }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="bg-white shadow-lg shadow-black/5 rounded-full px-4 py-2.5 text-sm font-medium text-secondary-700 whitespace-nowrap border border-secondary-100">
        Questions? Chat with us
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
