import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChatInterface } from "@/components/ChatInterface";
import { Bot, MessageSquare, Sparkles, Users } from "lucide-react";

const Index = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="glass fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white font-poppins">EduBot</h1>
          </div>
          <Button 
            variant="secondary" 
            onClick={() => setShowChat(!showChat)}
            className="bg-white/20 text-white border-white/30 hover:bg-white/30"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            {showChat ? "Hide Chat" : "Start Chat"}
          </Button>
        </div>
      </nav>

      {showChat ? (
        <ChatInterface onClose={() => setShowChat(false)} />
      ) : (
        <HeroSection onStartChat={() => setShowChat(true)} />
      )}
    </div>
  );
};

const HeroSection = ({ onStartChat }: { onStartChat: () => void }) => {
  return (
    <main className="pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Content */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full mb-8 animate-pulse-glow">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">24/7 Study Companion</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-poppins animate-fade-in-up">
            EduBot – Your 24/7 Study Buddy
            <span className="inline-block ml-2 animate-float">🤖✨</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto font-inter">
            Ask me anything, I promise I won't judge 😎
            <br />
            Learning never stops! 🚀
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={onStartChat}
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 font-poppins font-semibold shadow-glow"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Start Chatting Now!
            </Button>
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white/20 text-white border-white/30 hover:bg-white/30 text-lg px-8 py-6 font-poppins"
            >
              <Users className="w-5 h-5 mr-2" />
              Join 10k+ Students
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard 
            icon={<Bot className="w-8 h-8" />}
            title="Smart AI Assistant"
            description="Get instant answers to your academic questions with AI-powered responses."
            delay="0ms"
          />
          <FeatureCard 
            icon={<MessageSquare className="w-8 h-8" />}
            title="Interactive Chat"
            description="Natural conversation flow that makes learning feel like talking to a friend."
            delay="200ms"
          />
          <FeatureCard 
            icon={<Sparkles className="w-8 h-8" />}
            title="24/7 Availability"
            description="Never get stuck again - EduBot is always ready to help you succeed."
            delay="400ms"
          />
        </div>

        {/* Motivational Quote */}
        <div className="text-center">
          <blockquote className="text-white/80 text-lg italic max-w-2xl mx-auto font-inter">
            "You ask, I answer – teamwork makes the dream work 💡"
          </blockquote>
        </div>
      </div>
    </main>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  delay 
}: { 
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}) => {
  return (
    <div 
      className="glass p-6 rounded-2xl hover:bg-white/20 transition-all duration-300 animate-fade-in-up"
      style={{ animationDelay: delay }}
    >
      <div className="text-white mb-4">{icon}</div>
      <h3 className="text-white text-xl font-semibold mb-3 font-poppins">{title}</h3>
      <p className="text-white/80 font-inter">{description}</p>
    </div>
  );
};

export default Index;