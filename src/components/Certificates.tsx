import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "./ui/button";
import { certificates, type Certificate } from "@/content/certificates";

// Auto-playing carousel for valuable certificates
const CertificateCarousel = ({ certificates, currentIndex, onCertificateClick, onPrev, onNext }: { certificates: Certificate[]; currentIndex: number; onCertificateClick: (cert: Certificate) => void; onPrev: () => void; onNext: () => void }) => {
  return (
    <div className="relative mb-8" style={{ contain: 'layout paint', overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-4 sm:p-6 cursor-pointer min-h-[300px] md:min-h-[420px]"
          onClick={() => onCertificateClick(certificates[currentIndex])}
        >
          <img
            src={certificates[currentIndex].imageUrl}
            alt={certificates[currentIndex].title}
            className="w-full h-64 sm:h-80 md:h-96 object-contain rounded-lg mb-3 sm:mb-4 bg-background/5"
          />
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-primary mb-2">
            {certificates[currentIndex].title}
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-1 sm:mb-2">
            {certificates[currentIndex].issuer} • {certificates[currentIndex].date}
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
            {certificates[currentIndex].description}
          </p>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 glass-card p-2 hover:neon-border transition-all"
      >
        <ChevronLeft className="w-6 h-6 text-primary" />
      </button>
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 glass-card p-2 hover:neon-border transition-all"
      >
        <ChevronRight className="w-6 h-6 text-primary" />
      </button>
    </div>
  );
};

// Dot indicators for carousel navigation
const CarouselDots = ({ total, currentIndex, onDotClick }: { total: number; currentIndex: number; onDotClick: (index: number) => void }) => {
  return (
    <div className="flex justify-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === index
            ? "bg-primary w-8"
            : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
        />
      ))}
    </div>
  );
};

// Category selection tabs
const CategoryTabs = ({ selectedCategory, onCategoryChange }: { selectedCategory: string; onCategoryChange: (category: "valuable" | "skill" | "tool") => void }) => {
  return (
    <div className="flex justify-center gap-4 mb-12">
      {["valuable", "skill", "tool"].map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category as any)}
          className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full capitalize transition-all duration-300 text-sm sm:text-base touch-target ${selectedCategory === category
            ? "glass-card neon-border text-primary"
            : "bg-muted/20 hover:bg-muted/40 text-muted-foreground"
            }`}
        >
          {category === "valuable" ? "Valuable" : category === "skill" ? "Skill-Based" : "Tool-Based"}
        </button>
      ))}
    </div>
  );
};

// Grid layout showing all certificates
const CertificatesGrid = ({ certificates, onCertificateClick }: { certificates: Certificate[]; onCertificateClick: (cert: Certificate) => void }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
      {certificates.map((certificate, index) => (
        <motion.div
          key={certificate.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-card-hover p-4 cursor-pointer"
          onClick={() => onCertificateClick(certificate)}
        >
          <img
            src={certificate.imageUrl}
            alt={certificate.title}
            className="w-full h-40 sm:h-48 object-cover rounded-lg mb-3 sm:mb-4"
          />
          <h3 className="text-base sm:text-lg font-semibold text-primary mb-1 sm:mb-2 line-clamp-2">{certificate.title}</h3>
          <p className="text-xs sm:text-sm text-muted-foreground truncate">{certificate.issuer} • {certificate.date}</p>
        </motion.div>
      ))}
    </div>
  );
};

// Fullscreen certificate preview modal
const CertificateModal = ({ certificate, onClose }: { certificate: Certificate; onClose: () => void }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 md:backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          className="relative max-w-4xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 text-foreground hover:text-primary transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={certificate.imageUrl}
            alt={certificate.title}
            className="w-full rounded-lg neon-border"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Certificates = () => {
  const [selectedCategory, setSelectedCategory] = useState<"valuable" | "skill" | "tool">("valuable");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [enlargedCert, setEnlargedCert] = useState<Certificate | null>(null);

  const valuableCerts = certificates.filter(c => c.category === "valuable");
  const filteredCerts = certificates.filter(c => c.category === selectedCategory);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (enlargedCert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [enlargedCert]);

  // Auto-play carousel - DESKTOP ONLY
  // Disabled on mobile to prevent GPU repaints causing flickering
  useEffect(() => {
    if (enlargedCert) return;

    // Detect mobile/touch devices using pointer media query
    // pointer: coarse = touch devices (mobile, tablets)
    // pointer: fine = mouse devices (desktop, laptops)
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    // CRITICAL: Disable autoplay on mobile/touch devices to prevent:
    // - GPU repaints on every slide change
    // - Navbar flickering
    // - Chatbot FAB flickering
    // - Global layout recalculation
    if (isTouchDevice) {
      return; // No autoplay on mobile - manual swipe only
    }

    // Desktop only: Auto-advance carousel every 3 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % valuableCerts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, enlargedCert, valuableCerts.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % valuableCerts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + valuableCerts.length) % valuableCerts.length);
  };

  if (showAll) {
    return (
      <section id="certificates" className="py-20 px-4 bg-gradient-to-b from-transparent to-secondary/5">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold neon-text">All Certificates</h2>
            <Button variant="outline" onClick={() => setShowAll(false)}>
              Back
            </Button>
          </div>

          <CategoryTabs selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
          <CertificatesGrid certificates={filteredCerts} onCertificateClick={setEnlargedCert} />

          {enlargedCert && (
            <CertificateModal certificate={enlargedCert} onClose={() => setEnlargedCert(null)} />
          )}
        </div>
      </section>
    );
  }

  return (
    <section id="certificates" className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-transparent to-secondary/5">
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center mb-3 sm:mb-4 neon-text"
        >
          Valuable Certifications
        </motion.h2>

        <CertificateCarousel
          certificates={valuableCerts}
          currentIndex={currentIndex}
          onCertificateClick={setEnlargedCert}
          onPrev={prevSlide}
          onNext={nextSlide}
        />

        <CarouselDots
          total={valuableCerts.length}
          currentIndex={currentIndex}
          onDotClick={setCurrentIndex}
        />

        <div className="text-center">
          <Button
            onClick={() => setShowAll(true)}
            className="glass-card hover:neon-border"
          >
            View All Certificates
          </Button>
        </div>
      </div>

      {enlargedCert && (
        <CertificateModal certificate={enlargedCert} onClose={() => setEnlargedCert(null)} />
      )}
    </section>
  );
};

export default Certificates;
