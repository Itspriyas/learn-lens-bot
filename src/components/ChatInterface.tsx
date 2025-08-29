import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, X, Bot, User, RotateCcw } from "lucide-react";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatInterfaceProps {
  onClose: () => void;
}

export const ChatInterface = ({ onClose }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey there! 👋 I'm EduBot, your friendly study companion! Ask me anything about your studies - from math problems to essay help. I'm here 24/7 and I promise I won't judge! 😊",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const motivationalQuotes = [
    "Great question! Let me help you with that 🚀",
    "You're doing amazing! Keep those questions coming! 💪",
    "I love your curiosity! Here's what I think... 🤔",
    "No question is too small! Let's figure this out together 🧠",
    "You're on fire with these questions! 🔥",
    "Knowledge is power, and you're gaining superpowers! ⚡",
  ];

  const responses = {
    greeting: [
      "Hello! I'm so excited to help you learn today! What would you like to explore? 🌟",
      "Hi there, brilliant student! What can I help you understand better? 📚",
      "Hey! Ready for some awesome learning? Ask me anything! 🎯",
    ],
    math: [
      "Math can be tricky, but you've got this! Let me break it down step by step... 📐",
      "Numbers are my friends! Here's how to tackle this problem... 🔢",
      "Mathematical thinking is like solving puzzles - let's solve this together! 🧮",
    ],
    science: [
      "Science is absolutely fascinating! Here's what's happening... 🔬",
      "I love science questions! The answer lies in understanding the concept... ⚛️",
      "Let's explore the wonderful world of science together! 🌍",
    ],
    history: [
      "History is full of amazing stories! Here's what happened... 📜",
      "Time travel through knowledge! Let me tell you about... ⏳",
      "The past shapes our present - here's the fascinating story... 🏛️",
    ],
    english: [
      "Language is beautiful! Here's how to improve your writing... ✍️",
      "Grammar doesn't have to be scary! Let me explain... 📖",
      "Words have power - let's make yours shine! 💫",
    ],
    general: [
      "That's a fantastic question! Here's my take on it... 💡",
      "I'm glad you asked! This is something many students wonder about... 🤓",
      "Great thinking! Let me help you understand this better... 🎓",
    ],
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getResponseType = (text: string): keyof typeof responses => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes("hello") || lowerText.includes("hi") || lowerText.includes("hey")) {
      return "greeting";
    }
    if (lowerText.includes("math") || lowerText.includes("calculate") || lowerText.includes("equation")) {
      return "math";
    }
    if (lowerText.includes("science") || lowerText.includes("physics") || lowerText.includes("chemistry")) {
      return "science";
    }
    if (lowerText.includes("history") || lowerText.includes("historical") || lowerText.includes("past")) {
      return "history";
    }
    if (lowerText.includes("english") || lowerText.includes("grammar") || lowerText.includes("writing")) {
      return "english";
    }
    return "general";
  };

  const generateResponse = (userMessage: string): string => {
    const responseType = getResponseType(userMessage);
    const responseList = responses[responseType];
    const randomResponse = responseList[Math.floor(Math.random() * responseList.length)];
    
    // Add some contextual content based on the question
    const baseResponse = randomResponse;
    const motivationalStart = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    
    return `${motivationalStart}\n\n${baseResponse}\n\nRemember: Every expert was once a beginner. You're doing great by asking questions! 🌟`;
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputText),
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        text: "Fresh start! 🎉 I'm here and ready to help you learn something amazing today! What would you like to explore? 🚀",
        isBot: true,
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="fixed inset-0 bg-gradient-chat pt-24 z-40">
      <div className="h-full max-w-4xl mx-auto p-4 flex flex-col">
        {/* Chat Header */}
        <div className="glass rounded-t-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-primary p-2 rounded-full animate-pulse-glow">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-primary font-poppins">EduBot</h2>
              <p className="text-sm text-muted-foreground">Your AI Study Buddy</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={clearChat}>
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 bg-white/50 backdrop-blur-sm p-6 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="glass rounded-b-2xl p-4">
          <div className="flex gap-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask me anything! I'm here to help... 😊"
              className="flex-1 bg-white/70 border-white/30 focus:bg-white"
              disabled={isTyping}
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className="bg-gradient-primary hover:opacity-90 px-4"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            💡 Tip: Be specific with your questions for better answers!
          </p>
        </div>
      </div>
    </div>
  );
};