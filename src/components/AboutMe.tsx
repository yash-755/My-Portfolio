import { motion } from "framer-motion";
import { Mail, FileText, Copy, ExternalLink } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import profilePic from "@/assets/profile-pic.jpg";
import { aboutContent } from "@/content/about";

const AboutMe = () => {
  const email = aboutContent.email;

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    toast({
      title: "Email Copied!",
      description: "Email address copied to clipboard",
    });
  };

  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-b from-transparent to-primary/5">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16 neon-text"
        >
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Profile Image - Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center md:justify-start order-1 md:order-1"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-all duration-300" />
              <img
                src={profilePic}
                alt={aboutContent.profileImageAlt}
                className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full object-cover glass-card p-2 shadow-2xl"
                style={{
                  boxShadow: "0 0 40px hsl(var(--neon-blue) / 0.3)",
                }}
              />
            </div>
          </motion.div>

          {/* About Text - Right */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 order-2 md:order-2"
          >
            <div className="glass-card p-6 sm:p-8 space-y-4">
              <p className="text-base sm:text-lg text-foreground leading-relaxed">
                {aboutContent.paragraphs[0]}
              </p>
              <p className="text-sm sm:text-base text-muted-foreground">
                {aboutContent.paragraphs[1]}
              </p>
            </div>

            {/* Contact Links */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyEmail}
                className="glass-card px-4 sm:px-6 py-3 sm:py-3.5 flex items-center justify-center sm:justify-start gap-3 hover:neon-border transition-all duration-300 group touch-target text-sm sm:text-base"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <span className="text-foreground truncate">{email}</span>
                <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/yash-uttam-resume-2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card px-4 sm:px-6 py-3 sm:py-3.5 flex items-center justify-center sm:justify-start gap-3 hover:neon-border transition-all duration-300 group touch-target text-sm sm:text-base"
              >
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <span className="text-foreground">Resume</span>
                <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
