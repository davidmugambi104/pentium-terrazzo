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
      { id: 2, text: "Welcome to Terrazzo Experts. How may we assist you today?", type: "received", time: "10:02 AM", read: true },
      { id: 3, text: "Hi, I'm interested in terrazzo flooring for my home.", type: "sent", time: "10:03 AM", read: true },
      { id: 4, text: "That's great! Are you looking for terrazzo for indoor spaces, outdoor, or both?", type: "received", time: "10:03 AM", read: true },
      { id: 5, text: "Mostly indoor—living room and kitchen.", type: "sent", time: "10:04 AM", read: true },
      { id: 6, text: "Perfect choice. Terrazzo works beautifully indoors, especially in high-traffic areas like kitchens and living rooms.", type: "received", time: "10:04 AM", read: true },
      { id: 7, text: "Nice! Can you tell me about your pricing per square meter?", type: "sent", time: "10:05 AM", read: true },
      { id: 8, text: "Sure. Our terrazzo installation starts from Ksh 2,500 per square meter, depending on design, finish, and aggregate type.", type: "received", time: "10:05 AM", read: true },
      { id: 9, text: "Do you also provide custom designs?", type: "sent", time: "10:06 AM", read: true },
      { id: 10, text: "Yes, absolutely. We offer custom patterns, colors, and even logo inlays for clients who want a unique touch.", type: "received", time: "10:07 AM", read: true },
      { id: 11, text: "That sounds amazing! How durable is terrazzo?", type: "sent", time: "10:07 AM", read: true },
      { id: 12, text: "Terrazzo is extremely durable—lasting 40+ years with minimal maintenance. It's resistant to scratches, stains, and heavy traffic.", type: "received", time: "10:08 AM", read: true },
      { id: 13, text: "Great! What's the maintenance like?", type: "sent", time: "10:09 AM", read: true },
      { id: 14, text: "Very simple. Just regular sweeping and occasional mopping with mild detergent. No harsh chemicals needed.", type: "received", time: "10:09 AM", read: true },
      { id: 15, text: "Do you handle both supply and installation?", type: "sent", time: "10:10 AM", read: true },
      { id: 16, text: "Yes, we supply high-quality terrazzo materials and provide professional installation with a full warranty.", type: "received", time: "10:10 AM", read: true },
      { id: 17, text: "How long does installation usually take?", type: "sent", time: "10:11 AM", read: true },
      { id: 18, text: "It depends on the area size. A standard living room (about 30 sq meters) takes 4–5 days including polishing.", type: "received", time: "10:12 AM", read: true },
      { id: 19, text: "That's manageable. Do you charge separately for site preparation?", type: "sent", time: "10:12 AM", read: true },
      { id: 20, text: "Yes, if the site requires extra work like leveling or removing old flooring, we include that in the quotation.", type: "received", time: "10:13 AM", read: true },
      { id: 21, text: "Understood. Do you also install terrazzo countertops?", type: "sent", time: "10:14 AM", read: true },
      { id: 22, text: "Yes, terrazzo countertops are one of our specialties. They're stylish, durable, and heat-resistant.", type: "received", time: "10:14 AM", read: true },
      { id: 23, text: "What colors are available?", type: "sent", time: "10:15 AM", read: true },
      { id: 24, text: "We have a wide range—white, grey, black, beige, and custom color mixes with marble or glass chips.", type: "received", time: "10:15 AM", read: true },
      { id: 25, text: "Do you provide samples before installation?", type: "sent", time: "10:16 AM", read: true },
      { id: 26, text: "Yes, we bring samples during consultation so you can pick the exact design you like.", type: "received", time: "10:16 AM", read: true },
      { id: 27, text: "That's very helpful. Do you travel outside Nairobi?", type: "sent", time: "10:17 AM", read: true },
      { id: 28, text: "Yes, we serve clients all over Kenya—Nairobi, Mombasa, Kisumu, Eldoret, and beyond.", type: "received", time: "10:18 AM", read: true },
      { id: 29, text: "Do you require a deposit before starting?", type: "sent", time: "10:18 AM", read: true },
      { id: 30, text: "Yes, we require a 50% deposit to secure materials, and the balance is paid after installation is complete.", type: "received", time: "10:19 AM", read: true },
      { id: 31, text: "Makes sense. Do you also repair old terrazzo floors?", type: "sent", time: "10:20 AM", read: true },
      { id: 32, text: "Yes, we provide terrazzo restoration, polishing, and crack repair services.", type: "received", time: "10:20 AM", read: true },
      { id: 33, text: "How about outdoor terrazzo—like patios?", type: "sent", time: "10:21 AM", read: true },
      { id: 34, text: "Absolutely. We install outdoor terrazzo with special sealants to withstand weather conditions.", type: "received", time: "10:21 AM", read: true },
      { id: 35, text: "This is really good info. How soon can I book a consultation?", type: "sent", time: "10:22 AM", read: true },
      { id: 36, text: "You can book right away! We have an opening this Thursday afternoon. Would that work for you?", type: "received", time: "10:23 AM", read: true },
      { id: 37, text: "Thursday works perfectly.", type: "sent", time: "10:23 AM", read: true },
      { id: 38, text: "Great! We'll schedule our team to visit and take measurements.", type: "received", time: "10:24 AM", read: true },
      { id: 39, text: "Thank you for your assistance. Looking forward!", type: "sent", time: "10:25 AM", read: true },
      { id: 40, text: "It's our pleasure! 🙏 We look forward to transforming your space with terrazzo.", type: "received", time: "10:25 AM", read: true }
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
  const [responseCount, setResponseCount] = useState(0);
  
  const chatMessagesRef = useRef(null);
  const chatInputRef = useRef(null);
  const widgetRef = useRef(null);
  const emojiPickerRef = useRef(null);
  
  const whatsappNumber = "+254726740469";
  const supportHours = "8:00 AM - 8:00 PM (GMT+3)";
  const supportEmail = "support@company.com";
  
  // Expanded predefined responses with variety
  const predefinedResponses = [
    { 
      keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon'], 
      responses: [
        "Hello! How can I help you today?",
        "Hi there! Thanks for reaching out. How can we assist?",
        "Hello! Welcome to Terrazzo Experts. What can we do for you?",
        "Hi! Great to hear from you. How may we help?",
        "Hello! Ready to transform your space with beautiful terrazzo?"
      ] 
    },
    { 
      keywords: ['pricing', 'price', 'cost', 'how much', 'rate', 'rates'], 
      responses: [
        "Our terrazzo installation starts from Ksh 1500 per square meter, depending on design and finish.",
        "Pricing varies based on design complexity, but our standard terrazzo starts at Ksh 1500 per square meter.",
        "We offer competitive pricing starting at Ksh 1500 per square meter. Would you like a detailed quote?",
        "For a basic terrazzo installation, we charge from Ksh 1500 per square meter. Custom designs may vary.",
        "Our rates begin at Ksh 1500 per square meter. The final cost depends on your specific requirements."
      ] 
    },
    { 
      keywords: ['design', 'custom', 'pattern', 'color', 'colors'], 
      responses: [
        "We offer custom patterns, colors, and even logo inlays for a unique look.",
        "Yes! We can create custom designs with various colors and aggregates to match your vision.",
        "Absolutely! We work with clients to create custom terrazzo designs with a wide color palette.",
        "We specialize in custom terrazzo with various patterns and color options to suit your style.",
        "Custom designs are our specialty! We can incorporate different aggregates for unique patterns."
      ] 
    },
    { 
      keywords: ['durable', 'durability', 'long lasting', 'strength'], 
      responses: [
        "Terrazzo is extremely durable—lasting 40+ years with minimal maintenance.",
        "Terrazzo is one of the most durable flooring options, resistant to scratches, stains, and heavy traffic.",
        "Our terrazzo floors are built to last decades with proper care, making them very durable.",
        "You'll find terrazzo exceptionally durable—it withstands heavy foot traffic and requires little maintenance.",
        "Terrazzo's durability is unmatched! It can last a lifetime with basic care."
      ] 
    },
    { 
      keywords: ['maintenance', 'clean', 'care', 'mop'], 
      responses: [
        "Maintenance is simple: regular sweeping and occasional mopping with mild detergent.",
        "Terrazzo is low maintenance—just sweep regularly and mop with pH-neutral cleaner occasionally.",
        "Caring for terrazzo is easy! Simple sweeping and occasional mopping keep it looking new.",
        "You'll love how easy terrazzo is to maintain. No special chemicals needed—just mild detergent.",
        "Maintenance requires only basic cleaning. We provide care instructions after installation."
      ] 
    },
    { 
      keywords: ['install', 'installation', 'time', 'how long', 'duration'], 
      responses: [
        "Installation time varies, but a standard room (30 sq meters) takes 4-5 days including polishing.",
        "Most installations take 4-5 days for a typical room size, depending on preparation needed.",
        "We usually complete terrazzo installation in 4-5 days for average-sized rooms.",
        "The installation process typically takes 4-5 days from start to finish for most projects.",
        "You can expect your terrazzo installation to be completed within 4-5 days for standard areas."
      ] 
    },
    { 
      keywords: ['sample', 'samples', 'see examples', 'view'], 
      responses: [
        "Yes, we bring samples during consultation so you can see and feel the quality.",
        "We'd be happy to show you samples during our consultation visit.",
        "Absolutely! We bring a variety of samples to help you choose the perfect terrazzo.",
        "We have sample kits available that we can bring to your location for selection.",
        "During our consultation, we'll bring samples so you can visualize the final result."
      ] 
    },
    { 
      keywords: ['thanks', 'thank you', 'appreciate', 'grateful'], 
      responses: [
        "You're welcome! Happy to help with your terrazzo needs.",
        "Our pleasure! Let us know if you need anything else.",
        "You're most welcome! We're here to help transform your space.",
        "Glad we could assist! Don't hesitate to reach out with more questions.",
        "Thank you for considering us! We look forward to working with you."
      ] 
    },
    { 
      keywords: ['bye', 'goodbye', 'see you', 'talk later'], 
      responses: [
        "Thanks for chatting! We look forward to assisting with your terrazzo project.",
        "Have a great day! Reach out anytime for terrazzo solutions.",
        "Goodbye! We're excited about the possibility of working with you.",
        "Talk to you soon! Contact us whenever you're ready to proceed.",
        "Take care! We'll be here when you need expert terrazzo services."
      ] 
    }
  ];
  
  // Default responses when no keywords match
  const defaultResponses = [
    "Thanks for your message! I'd be happy to help with your terrazzo needs.",
    "I appreciate your question! Our team can provide detailed information about terrazzo.",
    "That's a great question! Let me connect you with our terrazzo specialists.",
    "Thank you for your interest! We have extensive experience with terrazzo installations.",
    "I'd love to help! Our experts can answer all your terrazzo-related questions."
  ];
  
  // Redirect messages with variety
  const redirectMessages = [
    "To continue our conversation and get personalized assistance, let's move to WhatsApp where our team can help you better.",
    "For more detailed information and faster response, let's continue this conversation on WhatsApp.",
    "Our terrazzo specialists are available on WhatsApp to provide you with expert advice and quotes.",
    "To get personalized assistance with your specific terrazzo needs, let's connect on WhatsApp.",
    "For the best service and detailed answers to your questions, our team is ready to help you on WhatsApp."
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
  
  const getRandomResponse = (responsesArray) => {
    const randomIndex = Math.floor(Math.random() * responsesArray.length);
    return responsesArray[randomIndex];
  };
  
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
    setResponseCount(prev => prev + 1);
    
    setTimeout(() => {
      setIsTyping(false);
      
      // Check for predefined responses
      const userMessage = messageInput.toLowerCase();
      let response = null;
      let matchedCategory = null;
      
      for (const item of predefinedResponses) {
        if (item.keywords.some(keyword => userMessage.includes(keyword))) {
          matchedCategory = item;
          response = getRandomResponse(item.responses);
          break;
        }
      }
      
      // If no keyword matches, use a default response
      if (!response) {
        response = getRandomResponse(defaultResponses);
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
      
      // After the third response, suggest moving to real WhatsApp
      if (responseCount >= 2) {
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            const redirectMessage = getRandomResponse(redirectMessages);
            setMessages(prev => [
              ...prev,
              { 
                id: prev.length + 1, 
                text: redirectMessage, 
                type: "received", 
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                read: false
              }
            ]);
            
            setTimeout(() => {
              sendMessageToWhatsApp(messageInput);
            }, 2000);
          }, 1500);
        }, 1000);
      }
    }, 2000);
  }, [messageInput, messages, responseCount, sendMessageToWhatsApp]);
  
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
          text: "Welcome to Terrazzo Experts. How may we assist you today?", 
          type: "received", 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: true 
        }
      ]);
      setResponseCount(0);
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