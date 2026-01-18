import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import { Button } from "./ui/button";
import { projects, type Project } from "@/content/projects";

// Filter buttons for project categories
const CategoryFilter = ({ selectedCategory, onCategoryChange }: { selectedCategory: string; onCategoryChange: (category: "all" | "evolving" | "prototype") => void }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12">
      {["all", "evolving", "prototype"].map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat as any)}
          className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-300 text-sm sm:text-base touch-target ${selectedCategory === cat
            ? "glass-card neon-border text-primary"
            : "bg-muted/20 hover:bg-muted/40 text-muted-foreground"
            }`}
        >
          {cat === "all" ? "All" : cat === "evolving" ? "Evolving Builds" : "Prototype Lab"}
        </button>
      ))}
    </div>
  );
};

// Grid displaying project cards
const ProjectsGrid = ({ projects, onProjectClick }: { projects: Project[]; onProjectClick: (project: Project) => void }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="glass-card-hover p-4 sm:p-6 group relative cursor-pointer touch-target"
          onClick={() => onProjectClick(project)}
        >
          <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-primary">
            {project.title}
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 line-clamp-3">
            {project.description}
          </p>

          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-3 mt-4">
            <Button
              variant="outline"
              size="sm"
              className="neon-border"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.demo, "_blank");
              }}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.github, "_blank");
              }}
            >
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Modal showing detailed project information
const ProjectDetailModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
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
          className="glass-card p-4 sm:p-6 md:p-8 max-w-3xl w-full max-h-[90vh] sm:max-h-[80vh] overflow-y-auto relative mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 neon-text pr-8">
            {project.title}
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">• About Project</h3>
              <p className="text-muted-foreground">{project.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">• Timeline</h3>
              <p className="text-muted-foreground">{project.timeline}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">• Skills Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.skills.map(skill => (
                  <span key={skill} className="px-2 sm:px-3 py-1 bg-primary/20 rounded-full text-xs sm:text-sm text-primary">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">• Tools Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.tools.map(tool => (
                  <span key={tool} className="px-2 sm:px-3 py-1 bg-secondary/20 rounded-full text-xs sm:text-sm text-secondary">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">• Challenges</h3>
              <p className="text-muted-foreground">{project.challenges}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">• Outcomes</h3>
              <p className="text-muted-foreground">{project.outcomes}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">• Future Scope</h3>
              <p className="text-muted-foreground">{project.futureScope}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "evolving" | "prototype">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter(
    p => selectedCategory === "all" || p.category === selectedCategory
  );

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center mb-3 sm:mb-4 neon-text"
        >
          Major Projects
        </motion.h2>

        <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
        <ProjectsGrid projects={filteredProjects} onProjectClick={setSelectedProject} />

        {selectedProject && (
          <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </div>
    </section>
  );
};

export default Projects;
