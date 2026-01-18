import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navItems = [
  { name: "About Me", href: "#about" },
  { name: "Skills & Tools", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Hobbies & Activities", href: "#hobbies" },
  { name: "Certificates", href: "#certificates" },
  { name: "Contact", href: "#contact" },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "glass-card py-2 md:py-3 shadow-lg"
        : "bg-transparent py-3 md:py-4"
        }`}
    >
      <div className="px-4 sm:px-6 lg:px-6">
        <div className="flex items-center">
          {/* Logo - Left Edge */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => handleNavClick("#home")}
            className="text-lg sm:text-xl font-bold neon-text cursor-pointer z-50"
          >
            YU
          </motion.div>

          {/* Navigation - Right Edge */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4 ml-auto">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="text-sm lg:text-base font-medium transition-all duration-300 hover:text-primary relative group text-muted-foreground touch-target flex items-center px-2"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </a>
            ))}

            {/* Connect Button */}
            <motion.a
              href="https://linktree-4djtpxz0d-yash-uttams-projects.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 lg:px-5 py-2.5 text-sm lg:text-base font-medium text-primary bg-primary/10 backdrop-blur-md border border-primary/30 rounded-lg hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-primary/20 touch-target"
            >
              Connect
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary z-50 relative touch-target flex items-center justify-center p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 glass-card rounded-lg p-4 overflow-hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="block py-4 px-2 text-base font-medium text-muted-foreground hover:text-primary transition-colors border-b border-border/30 last:border-0 touch-target"
              >
                {item.name}
              </a>
            ))}

            {/* Connect Button - Mobile */}
            <motion.a
              href="https://linktree-4djtpxz0d-yash-uttams-projects.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.98 }}
              onClick={() => setMobileMenuOpen(false)}
              className="block mt-4 px-4 py-4 text-base font-medium text-center text-primary bg-primary/10 backdrop-blur-md border border-primary/30 rounded-lg hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 touch-target"
            >
              Connect
            </motion.a>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navigation;
