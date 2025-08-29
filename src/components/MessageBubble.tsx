import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      className={cn(
        "flex gap-3 animate-fade-in-up",
        message.isBot ? "justify-start" : "justify-end"
      )}
    >
      {message.isBot && (
        <div className="bg-gradient-primary p-2 rounded-full h-fit animate-pulse-glow">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}
      
      <div
        className={cn(
          "max-w-[70%] rounded-2xl px-4 py-3 shadow-chat",
          message.isBot
            ? "bg-white text-foreground rounded-tl-sm"
            : "bg-gradient-primary text-white rounded-tr-sm"
        )}
      >
        <p className="whitespace-pre-wrap font-inter leading-relaxed">
          {message.text}
        </p>
        <div
          className={cn(
            "text-xs mt-2 opacity-70",
            message.isBot ? "text-muted-foreground" : "text-white/70"
          )}
        >
          {formatTime(message.timestamp)}
        </div>
      </div>

      {!message.isBot && (
        <div className="bg-muted p-2 rounded-full h-fit">
          <User className="w-4 h-4 text-muted-foreground" />
        </div>
      )}
    </div>
  );
};