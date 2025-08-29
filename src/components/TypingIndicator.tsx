import { Bot } from "lucide-react";

export const TypingIndicator = () => {
  return (
    <div className="flex gap-3 justify-start animate-fade-in-up">
      <div className="bg-gradient-primary p-2 rounded-full h-fit animate-pulse-glow">
        <Bot className="w-4 h-4 text-white" />
      </div>
      
      <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-chat">
        <div className="flex items-center gap-1">
          <span className="text-muted-foreground font-inter">EduBot is thinking</span>
          <div className="flex gap-1 ml-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-typing" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-typing" style={{ animationDelay: '200ms' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-typing" style={{ animationDelay: '400ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};