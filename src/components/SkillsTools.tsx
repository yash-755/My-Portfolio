import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { skills, tools, other, type Skill } from "@/content/skills";

// Tabs for switching between skills, tools, and other categories
const CategoryTabs = ({ activeTab, onTabChange }: { activeTab: "skills" | "tools" | "other"; onTabChange: (tab: "skills" | "tools" | "other") => void }) => {
  return (
    <div className="flex justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12 flex-wrap">
      <button
        onClick={() => onTabChange("skills")}
        className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-all duration-300 text-sm sm:text-base touch-target ${activeTab === "skills"
          ? "glass-card neon-border text-primary font-semibold"
          : "bg-muted/20 hover:bg-muted/40 text-muted-foreground"
          }`}
      >
        Skills
      </button>
      <button
        onClick={() => onTabChange("tools")}
        className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-all duration-300 text-sm sm:text-base touch-target ${activeTab === "tools"
          ? "glass-card neon-border text-primary font-semibold"
          : "bg-muted/20 hover:bg-muted/40 text-muted-foreground"
          }`}
      >
        Tools
      </button>
      <button
        onClick={() => onTabChange("other")}
        className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-all duration-300 text-sm sm:text-base touch-target ${activeTab === "other"
          ? "glass-card neon-border text-primary font-semibold"
          : "bg-muted/20 hover:bg-muted/40 text-muted-foreground"
          }`}
      >
        Other
      </button>
    </div>
  );
};

// Grid displaying skill/tool cards
const SkillsGrid = ({ skills, activeTab, onSkillClick }: { skills: Skill[]; activeTab: string; onSkillClick: (skill: Skill) => void }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      >
        {skills.map((skill, index) => {
          const SkillIcon = skill.icon;
          return (
            <motion.button
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSkillClick(skill)}
              className="glass-card-hover p-4 sm:p-6 text-left cursor-pointer group touch-target"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="mt-1 text-primary group-hover:scale-110 transition-transform flex-shrink-0">
                  <SkillIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-1 sm:mb-2">
                    {skill.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                    {skill.shortDesc}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
};

// Modal showing detailed skill information
const SkillDetailModal = ({ skill, onClose }: { skill: Skill; onClose: () => void }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="glass-card p-6 sm:p-8 max-w-md w-full relative mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            {skill.icon && <skill.icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary flex-shrink-0" />}
            <h3 className="text-xl sm:text-2xl font-bold neon-text">{skill.name}</h3>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Description</p>
              <p className="text-foreground">{skill.description}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Proficiency Level</p>
              <span className="inline-block px-4 py-1 bg-primary/20 rounded-full text-primary font-medium">
                {skill.level}
              </span>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Related Project</p>
              <p className="text-foreground">{skill.relatedProject}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const SkillsTools = () => {
  const [activeTab, setActiveTab] = useState<"skills" | "tools" | "other">("skills");
  const [selectedItem, setSelectedItem] = useState<Skill | null>(null);

  const currentItems = activeTab === "skills" ? skills : activeTab === "tools" ? tools : other;

  return (
    <section id="skills" className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-transparent to-primary/5">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-10 md:mb-12 neon-text"
        >
          Skills & Tools
        </motion.h2>

        <CategoryTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <SkillsGrid skills={currentItems} activeTab={activeTab} onSkillClick={setSelectedItem} />

        {selectedItem && (
          <SkillDetailModal skill={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </div>
    </section>
  );
};

export default SkillsTools;
