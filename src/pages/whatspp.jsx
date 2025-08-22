import React, { useState, useEffect, useRef, useCallback } from 'react';
import './whatsapp.css';

const FloatingWhatsApp = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('whatsappMessages');
    if (savedMessages) {
      return JSON.parse(savedMessages);
    }
    return [
      { id: 1, text: "Hello there! 👋", type: "received", time: "10:02 AM", read: true },
      { id: 2, text: "Welcome to our support channel. How can I assist you today?", type: "received", time: "10:02 AM", read: true },
      { id: 3, text: "Hi, I have a question about your services", type: "sent", time: "10:03 AM", read: true },
      { id: 4, text: "Sure, I'd be happy to help! What would you like to know?", type: "received", time: "10:03 AM", read: true },
      { id: 5, text: "Can you tell me about your pricing plans?", type: "sent", time: "10:04 AM", read: true },
      { id: 6, text: "We offer three flexible pricing tiers: Basic, Pro, and Enterprise. Each comes with different features tailored to business needs.", type: "received", time: "10:05 AM", read: true },
      { id: 7, text: "Great! Can you send me more details?", type: "sent", time: "10:05 AM", read: true }
    ];
  });
  const [messageInput, setMessageInput] = useState("");
  const [status, setStatus] = useState("Checking status...");
  const [isOnline, setIsOnline] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [activeAttachmentMenu, setActiveAttachmentMenu] = useState(false);
  const [chatTheme, setChatTheme] = useState('default');
  
  const chatMessagesRef = useRef(null);
  const chatInputRef = useRef(null);
  const widgetRef = useRef(null);
  const emojiPickerRef = useRef(null);
  
  const whatsappNumber = "+254726740469";
  const supportHours = "8:00 AM - 8:00 PM (GMT+3)";
  const supportEmail = "support@company.com";
  
  const predefinedResponses = [
    { keywords: ['hello', 'hi', 'hey'], response: "Hello! How can I help you today?" },
    { keywords: ['pricing', 'price', 'cost'], response: "Our pricing starts at $29/month for the Basic plan. Would you like details on our packages?" },
    { keywords: ['trial', 'free'], response: "Yes, we offer a 14-day free trial with full features. No credit card required!" },
    { keywords: ['demo', 'show'], response: "I can schedule a personalized demo for you. When would be a good time?" },
    { keywords: ['contact', 'phone', 'email'], response: `You can reach us at ${supportEmail} or call +1-800-SUPPORT during our business hours: ${supportHours}` },
    { keywords: ['thanks', 'thank you', 'appreciate'], response: "You're welcome! Is there anything else I can help with?" },
    { keywords: ['bye', 'goodbye'], response: "Thank you for chatting with us! Feel free to reach out anytime." }
  ];
  
  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('whatsappMessages', JSON.stringify(messages));
  }, [messages]);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages, isTyping]);
  
  // Handle clicks outside to close emoji picker and attachment menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setActiveAttachmentMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Check online status when chat opens
  useEffect(() => {
    if (isChatOpen) {
      checkOnlineStatus();
    }
  }, [isChatOpen]);
  
  // Simulate initial bot messages
  useEffect(() => {
    const simulateInitialMessages = () => {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { 
            id: prev.length + 1, 
            text: "Is there a free trial available?", 
            type: "sent", 
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            read: true
          }
        ]);
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [
              ...prev,
              { 
                id: prev.length + 1, 
                text: "Yes, we offer a 14-day free trial with full access to all features. No credit card required!", 
                type: "received", 
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                read: true
              }
            ]);
          }, 2000);
        }, 1500);
      }, 1000);
    };
    
    simulateInitialMessages();
  }, []);
  
  // Track unread messages
  useEffect(() => {
    if (!isChatOpen) {
      const unread = messages.filter(msg => !msg.read && msg.type === 'received').length;
      setUnreadCount(unread);
    } else {
      // Mark all as read when chat is opened
      const updatedMessages = messages.map(msg => ({ ...msg, read: true }));
      setMessages(updatedMessages);
      setUnreadCount(0);
    }
  }, [isChatOpen, messages]);
  
  const checkOnlineStatus = useCallback(() => {
    setStatus("Checking status...");
    setIsTyping(true);
    
    setTimeout(() => {
      const online = Math.random() < 0.8;
      setIsOnline(online);
      setStatus(online ? "Online" : "Offline");
      
      if (!online) {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [
            ...prev,
            { 
              id: prev.length + 1, 
              text: "Our support team is currently offline. You can still send a message and we'll respond as soon as we're back.", 
              type: "received", 
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              read: false
            }
          ]);
        }, 1500);
      } else {
        setIsTyping(false);
      }
    }, 1500);
  }, []);
  
  const sendMessageToWhatsApp = useCallback((message) => {
    try {
      const encodedMessage = encodeURIComponent(message);
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      // Try to open in new tab
      const newWindow = window.open(whatsappURL, '_blank');
      
      if (!newWindow) {
        // Fallback to redirect in current tab if popup blocked
        window.location.href = whatsappURL;
      }
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { 
          id: prev.length + 1, 
          text: "An error occurred while trying to redirect to WhatsApp. Please try again.", 
          type: "received", 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: false
        }
      ]);
    }
  }, [whatsappNumber]);
  
  const handleSendMessage = useCallback(() => {
    if (!messageInput.trim()) {
      setMessages(prev => [
        ...prev,
        { 
          id: prev.length + 1, 
          text: "Please enter a message to send.", 
          type: "received", 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: false
        }
      ]);
      return;
    }
    
    const newMessage = {
      id: messages.length + 1,
      text: messageInput,
      type: "sent",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true
    };
    
    setMessages(prev => [...prev, newMessage]);
    setIsTyping(true);
    setMessageInput("");
    
    setTimeout(() => {
      setIsTyping(false);
      
      // Check for predefined responses
      const userMessage = messageInput.toLowerCase();
      let response = null;
      
      for (const item of predefinedResponses) {
        if (item.keywords.some(keyword => userMessage.includes(keyword))) {
          response = item.response;
          break;
        }
      }
      
      if (!response) {
        response = "Thanks for your message! I'll redirect you to WhatsApp for further assistance.";
      }
      
      setMessages(prev => [
        ...prev,
        { 
          id: prev.length + 1, 
          text: response, 
          type: "received", 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: false
        }
      ]);
      
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { 
            id: prev.length + 1, 
            text: "Your message has been sent. Redirecting to WhatsApp...", 
            type: "received", 
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            read: false
          }
        ]);
        
        setTimeout(() => {
          sendMessageToWhatsApp(messageInput);
        }, 1500);
      }, 1000);
    }, 2000);
  }, [messageInput, messages, predefinedResponses, sendMessageToWhatsApp]);
  
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);
  
  const addEmoji = useCallback((emoji) => {
    setMessageInput(prev => prev + emoji);
    setShowEmojiPicker(false);
    chatInputRef.current.focus();
  }, []);
  
  const clearChat = useCallback(() => {
    if (window.confirm("Are you sure you want to clear the chat history?")) {
      setMessages([
        { 
          id: 1, 
          text: "Hello there! 👋", 
          type: "received", 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: true 
        },
        { 
          id: 2, 
          text: "Welcome to our support channel. How can I assist you today?", 
          type: "received", 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: true 
        }
      ]);
    }
  }, []);
  
  const toggleNotification = useCallback(() => {
    setNotificationEnabled(prev => !prev);
    if (!notificationEnabled) {
      // Request notification permission
      if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification("WhatsApp Chat Enabled", {
              body: "You'll receive notifications for new messages"
            });
          }
        });
      }
    }
  }, [notificationEnabled]);
  
  const toggleAttachmentMenu = useCallback(() => {
    setActiveAttachmentMenu(prev => !prev);
    setShowEmojiPicker(false);
  }, []);
  
  const handleAttachment = useCallback((type) => {
    setMessages(prev => [
      ...prev,
      { 
        id: prev.length + 1, 
        text: `[${type.charAt(0).toUpperCase() + type.slice(1)} attachment]`, 
        type: "sent", 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: true
      }
    ]);
    
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        { 
          id: prev.length + 1, 
          text: "I've received your attachment. To share files directly, please continue the conversation on WhatsApp.", 
          type: "received", 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: false
        }
      ]);
    }, 2000);
    
    setActiveAttachmentMenu(false);
  }, []);
  
  const renderEmojiPicker = () => {
    const emojis = ['😀', '😂', '😍', '😎', '👍', '❤️', '🙏', '👋', '🎉', '💯', '✨', '🚀'];
    
    return (
      <div className="emoji-picker" ref={emojiPickerRef}>
        <div className="emoji-header">
          <span>Emojis</span>
          <button onClick={() => setShowEmojiPicker(false)}>×</button>
        </div>
        <div className="emoji-grid">
          {emojis.map((emoji, index) => (
            <button 
              key={index} 
              className="emoji-item" 
              onClick={() => addEmoji(emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  const renderAttachmentMenu = () => {
    return (
      <div className="attachment-menu">
        <button onClick={() => handleAttachment('image')}>
          <i className="fas fa-image"></i> Image
        </button>
        <button onClick={() => handleAttachment('document')}>
          <i className="fas fa-file-alt"></i> Document
        </button>
        <button onClick={() => handleAttachment('video')}>
          <i className="fas fa-video"></i> Video
        </button>
        <button onClick={() => handleAttachment('audio')}>
          <i className="fas fa-microphone-alt"></i> Audio
        </button>
      </div>
    );
  };
  
  const renderChatHeader = () => {
    return (
      <div className="chat-header">
        <div className="profile-info">
          <img 
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='12' fill='%234CAF50'/%3E%3Cpath fill='%23fff' d='M16.75 13.96c.33.73.33 1.52 0 2.25-.15.36-.41.65-.75.85-1.45.86-3.43.92-4.79.18-1.33-.71-2.18-2.08-2.18-3.56 0-1.48.85-2.85 2.18-3.56 1.36-.74 3.34-.68 4.79.18.34.2.6.49.75.85.33.73.33 1.52 0 2.25-.14.31-.35.59-.62.81.27.12.52.29.73.50.54.54.83 1.24.83 1.97 0 .73-.29 1.43-.83 1.97-.54.54-1.24.83-1.97.83-.73 0-1.43-.29-1.97-.83-.21-.21-.38-.46-.50-.73-.22.27-.50.48-.81.62z'/%3E%3C/svg%3E" 
            alt="Support Team" 
          />
          <div className="contact-info">
            <h3>Support Team</h3>
            <p>Typically replies instantly</p>
          </div>
        </div>
        
        <div className="header-actions">
          <div className={`online-indicator ${!isOnline ? 'offline' : ''}`}>
            <i className="fas fa-circle"></i>
            <span>{status}</span>
          </div>
          <button className="header-btn" onClick={checkOnlineStatus}>
            <i className="fas fa-sync-alt"></i>
          </button>
          <button className="header-btn" onClick={clearChat}>
            <i className="fas fa-trash-alt"></i>
          </button>
          <button className="header-btn" onClick={() => setIsChatOpen(false)}>
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
    );
  };
  
  const renderMessage = (msg) => {
    return (
      <div key={msg.id} className={`message ${msg.type}`}>
        <div className="message-content">
          {msg.text}
          <div className="message-time">{msg.time}</div>
        </div>
        {msg.type === 'sent' && (
          <div className="message-status">
            <i className={`fas fa-${msg.read ? 'check-double' : 'check'}`}></i>
          </div>
        )}
      </div>
    );
  };
  
  const renderChatInput = () => {
    return (
      <div className="chat-input">
        <div className="input-actions">
          <button 
            className="emoji-btn" 
            onClick={() => {
              setShowEmojiPicker(prev => !prev);
              setActiveAttachmentMenu(false);
            }}
          >
            <i className="far fa-smile"></i>
          </button>
          
          <button 
            className="attachment-btn"
            onClick={toggleAttachmentMenu}
          >
            <i className="fas fa-paperclip"></i>
          </button>
        </div>
        
        <textarea
          ref={chatInputRef}
          placeholder="Type a message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={handleKeyPress}
          rows={1}
        />
        
        <button 
          className="send-btn" 
          onClick={handleSendMessage}
          disabled={!messageInput.trim()}
        >
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    );
  };
  
  const renderChatFooter = () => {
    return (
      <div className="chat-footer">
        <div className="notification-toggle">
          <label>
            <input 
              type="checkbox" 
              checked={notificationEnabled} 
              onChange={toggleNotification} 
            />
            Notifications
          </label>
        </div>
        <div className="theme-selector">
          <label>Theme:</label>
          <select value={chatTheme} onChange={(e) => setChatTheme(e.target.value)}>
            <option value="default">Default</option>
            <option value="dark">Dark</option>
            <option value="blue">Blue</option>
            <option value="purple">Purple</option>
          </select>
        </div>
      </div>
    );
  };

  return (
    <div className={`whatsapp-widget ${chatTheme}`} ref={widgetRef}>
      <div 
        className="whatsapp-button" 
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <i className="fab fa-whatsapp"></i>
        {unreadCount > 0 && (
          <span className="unread-count">{unreadCount}</span>
        )}
      </div>
      
      <div className={`chat-container ${isChatOpen ? 'active' : ''}`}>
        {renderChatHeader()}
        
        <div className="chat-messages" ref={chatMessagesRef}>
          <div className="welcome-message">
            <p>Welcome to our WhatsApp support!</p>
            <p>Our team is ready to assist you with any questions.</p>
            <p>Business hours: {supportHours}</p>
          </div>
          
          {messages.map(renderMessage)}
          
          {isTyping && (
            <div className="typing-indicator">
              <span>Support is typing</span>
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
        </div>
        
        {showEmojiPicker && renderEmojiPicker()}
        {activeAttachmentMenu && renderAttachmentMenu()}
        
        {renderChatInput()}
        {renderChatFooter()}
      </div>
    </div>
  );
};

export default FloatingWhatsApp;