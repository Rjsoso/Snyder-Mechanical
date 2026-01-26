import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const ChatbotPlaceholder = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="bg-primary-600 text-white p-4 flex items-center justify-between">
            <h3 className="font-semibold">Chat with us</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="hover:bg-primary-700 p-1 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 h-96 flex items-center justify-center bg-secondary-50">
            <div className="text-center text-secondary-600">
              <MessageCircle className="w-16 h-16 mx-auto mb-4 text-secondary-400" />
              <p className="mb-2">AI Chatbot Coming Soon!</p>
              <p className="text-sm">For now, please call us or use our contact form.</p>
            </div>
          </div>
        </div>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
        aria-label="Chat"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default ChatbotPlaceholder;
