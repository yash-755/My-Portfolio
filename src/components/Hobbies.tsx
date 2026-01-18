import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { hobbies, type Hobby } from "@/content/hobbies";

const Hobbies = () => {
  const [expandedHobby, setExpandedHobby] = useState<string | null>(null);

  return (
    <section id="hobbies" className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-primary/5 to-transparent">
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-10 md:mb-12 neon-text"
        >
          Hobbies & Activities
        </motion.h2>

        <div className="space-y-1">
          {hobbies.map((hobby, index) => (
            <div key={hobby.name}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => setExpandedHobby(expandedHobby === hobby.name ? null : hobby.name)}
                  className="w-full py-4 text-left group touch-target"
                >
                  <span className="text-lg sm:text-xl font-medium text-foreground group-hover:text-primary transition-colors">
                    {hobby.name}
                  </span>
                </button>

                <AnimatePresence>
                  {expandedHobby === hobby.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-muted-foreground pb-4 pl-4">
                        {hobby.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {index < hobbies.length - 1 && (
                <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hobbies;
