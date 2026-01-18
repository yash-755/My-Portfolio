import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { projects } from "../content/projects";
import { skills, tools, other } from "../content/skills";
import { certificates } from "../content/certificates";
import { contactContent } from "../content/contact";
import { aboutContent } from "../content/about";
import { hobbies } from "../content/hobbies";

interface Message {
  id: string;
  text: string;
  sender: "user" | "robo";
  timestamp: Date;
}

const Robo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addRoboMessage("Hi, I'm Robo — your virtual assistant! Ask me about Yash's projects, skills, certificates, or how to contact him.");
      }, 500);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addRoboMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "robo",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const generateResponse = (input: string) => {
    const lowerInput = input.toLowerCase();

    // Friendly greetings
    if (lowerInput.match(/^(hi|hello|hey|greetings)/)) {
      return "Hello! I'm here to help you explore Yash's portfolio. What would you like to know?";
    }

    // Projects
    if (lowerInput.includes("project") || lowerInput.includes("work") || lowerInput.includes("built")) {
      const projectList = projects.map(p => `• ${p.title}: ${p.description}`).join("\n");
      return `Here are some of Yash's key projects:\n\n${projectList}\n\nWould you like to know more about a specific project?`;
    }

    // Skills & Technologies
    if (lowerInput.includes("skill") || lowerInput.includes("tech") || lowerInput.includes("stack") || lowerInput.includes("tool")) {
      const topSkills = skills.slice(0, 5).map(s => s.name).join(", ");
      const topTools = tools.slice(0, 5).map(t => t.name).join(", ");
      return `Yash is proficient in:\n\nSkills: ${topSkills}\nTools: ${topTools}\n\nAsk me about a specific skill for more details!`;
    }

    // Certificates
    if (lowerInput.includes("certificat") || lowerInput.includes("qualification") || lowerInput.includes("course")) {
      const certList = certificates.slice(0, 3).map(c => `• ${c.title} (${c.issuer})`).join("\n");
      return `Yash holds several valuable certifications:\n\n${certList}\n\n...and more! Check the Certificates section for the full list.`;
    }

    // Contact
    if (lowerInput.includes("contact") || lowerInput.includes("email") || lowerInput.includes("reach") || lowerInput.includes("hire")) {
      return `You can reach Yash at: ${aboutContent.email}\nOr connect on LinkedIn: ${aboutContent.linkedinUrl}\n\nAlternatively, use the Contact form below!`;
    }

    // Hobbies
    if (lowerInput.includes("hobby") || lowerInput.includes("interest") || lowerInput.includes("fun")) {
      const hobbyList = hobbies.map(h => h.name).join(", ");
      return `When not coding, Yash enjoys: ${hobbyList}.`;
    }

    // Default Fallback
    return "I can tell you about Yash's projects, skills, certificates, or hobbies. What are you interested in?";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");

    // Show typing indicator
    setIsTyping(true);

    // Simulate network delay for natural feel
    setTimeout(() => {
      const responseText = generateResponse(currentInput);
      setIsTyping(false);
      addRoboMessage(responseText);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-4 right-8 z-50 flex flex-col items-center gap-2"
        initial={{ scale: 0 }}
        animate={{
          scale: 1,
          y: [0, -8, 0]
        }}
        transition={{
          scale: { duration: 0.3 },
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full glass-card flex items-center justify-center animate-pulse-glow"
        >
          <Bot className="w-8 h-8 text-primary" />
        </motion.button>

      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-28 right-8 z-50 w-96 max-w-[calc(100vw-2rem)] glass-card overflow-hidden"
            style={{ height: "500px" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-primary/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary">Robo</h3>
                  <p className="text-xs text-muted-foreground">Virtual Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ height: "360px" }}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50 text-foreground"
                      }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-primary/20">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about projects, skills, or contact..."
                  className="bg-background/50 border-border/50 focus:border-primary"
                />
                <Button
                  onClick={handleSend}
                  size="icon"
                  className="neon-border"
                  disabled={!input.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Robo;
