// Centralized data for Skills & Tools section
// Curated & optimized for AI / ML / GenAI Engineer role

import {
    Brain,
    Cpu,
    Code2,
    Database,
    BarChart3,
    MessageSquare,
    Globe,
    GitBranch,
    Server,
    FileCode,
    Video,
    Sparkles,
    Layers,
    Monitor,
    Network,
    Wand2,
    BrainCircuit,
    Palette,
    FileText,
    BrainCog,
    Workflow,
    Braces
} from "lucide-react";

export interface Skill {
    name: string;
    description: string;
    level: string;
    relatedProject: string;
    icon: any;
    shortDesc: string;
}

/* =========================
   CORE SKILLS (HIGH PRIORITY)
========================= */
export const skills: Skill[] = [
    {
        name: "Machine Learning",
        description:
            "Designing, training, and evaluating ML models including regression, classification, clustering, and pipelines with real-world datasets.",
        level: "Advanced",
        relatedProject: "AI-Powered Code-to-Diagram Converter, Analytics Systems",
        icon: Brain,
        shortDesc: "End-to-end ML model development"
    },
    {
        name: "Deep Learning",
        description:
            "Hands-on experience with neural networks, CNNs, RNNs, attention mechanisms, and transformer-based architectures.",
        level: "Advanced",
        relatedProject: "GenAI & Neural Network Projects",
        icon: Cpu,
        shortDesc: "Neural networks & advanced AI"
    },
    {
        name: "Generative AI",
        description:
            "Building GenAI applications using LLMs, prompt design, chaining, and AI agent workflows.",
        level: "Advanced",
        relatedProject: "AI Code-to-Diagram Converter, AI Agents",
        icon: Sparkles,
        shortDesc: "LLMs, agents & prompt-driven systems"
    },
    {
        name: "Python",
        description:
            "Primary programming language for AI/ML, data analysis, automation, and backend logic.",
        level: "Expert",
        relatedProject: "All AI & ML Projects",
        icon: Code2,
        shortDesc: "Core language for AI & data"
    },
    {
        name: "Data Analysis",
        description:
            "Data cleaning, EDA, feature engineering, and visualization to extract actionable insights.",
        level: "Advanced",
        relatedProject: "Analytics & ML Projects",
        icon: BarChart3,
        shortDesc: "Insights from real-world data"
    },
    {
        name: "Natural Language Processing (NLP)",
        description:
            "Text preprocessing, embeddings, LLM-based NLP pipelines, and conversational AI systems.",
        level: "Intermediate",
        relatedProject: "Chatbots & GenAI Systems",
        icon: MessageSquare,
        shortDesc: "Text understanding & language AI"
    },
    {
        name: "Frontend Development (React)",
        description:
            "Building responsive, modern UI for AI tools and dashboards using React, Tailwind, and Vite.",
        level: "Intermediate",
        relatedProject: "Portfolio Website, AI Dashboards",
        icon: Globe,
        shortDesc: "Modern UI for AI products"
    },
    {
        name: "MLOps Fundamentals",
        description:
            "Understanding end-to-end ML lifecycle including model versioning, experiment tracking, deployment pipelines, and monitoring.",
        level: "Intermediate",
        relatedProject: "AI-Powered Code-to-Diagram Converter",
        icon: Workflow,
        shortDesc: "ML lifecycle, deployment & monitoring"
    },
    {
        name: "Data Structures & Algorithms",
        description:
            "Strong foundation in core data structures and algorithmic problem-solving for efficient and scalable systems.",
        level: "Intermediate",
        relatedProject: "Problem Solving & ML Pipelines",
        icon: Braces,
        shortDesc: "Efficient problem solving & optimization"
    },

];

/* =========================
   TOOLS & FRAMEWORKS
========================= */
export const tools: Skill[] = [
    {
        name: "TensorFlow",
        description:
            "Deep learning framework for training, experimenting, and deploying neural networks.",
        level: "Advanced",
        relatedProject: "Deep Learning Models",
        icon: Layers,
        shortDesc: "DL framework for production AI"
    },
    {
        name: "PyTorch",
        description:
            "Flexible research-focused deep learning framework for rapid experimentation.",
        level: "Advanced",
        relatedProject: "Research & Prototyping",
        icon: Network,
        shortDesc: "Research-first DL framework"
    },
    {
        name: "Scikit-learn",
        description:
            "Classical machine learning algorithms, pipelines, and evaluation utilities.",
        level: "Advanced",
        relatedProject: "ML Pipelines & Analytics",
        icon: Brain,
        shortDesc: "Classical ML toolkit"
    },
    {
        name: "Pandas & NumPy",
        description:
            "Efficient data manipulation, numerical computing, and preprocessing.",
        level: "Expert",
        relatedProject: "Data Analysis & ML",
        icon: FileCode,
        shortDesc: "Data processing backbone"
    },
    {
        name: "VS Code",
        description:
            "Primary development environment for coding, debugging, and building AI & web applications.",
        level: "Advanced",
        relatedProject: "All Projects",
        icon: Code2,
        shortDesc: "Daily driver code editor"
    },
    {
        name: "Jupyter Notebook",
        description:
            "Interactive environment for data analysis, experimentation, and ML model prototyping.",
        level: "Advanced",
        relatedProject: "ML Experiments & Data Analysis",
        icon: FileCode,
        shortDesc: "Interactive ML experimentation"
    },
    {
        name: "LangChain",
        description:
            "Building LLM pipelines, prompt chains, tools, and AI agents.",
        level: "Advanced",
        relatedProject: "AI Agents & GenAI Systems",
        icon: Wand2,
        shortDesc: "LLM orchestration framework"
    },
    {
        name: "OpenAI & Gemini APIs",
        description:
            "Integrating LLM APIs for text generation, reasoning, and AI automation.",
        level: "Advanced",
        relatedProject: "GenAI Applications",
        icon: BrainCircuit,
        shortDesc: "LLM APIs & AI services"
    },
    {
        name: "Streamlit",
        description:
            "Rapid development of interactive AI demos and ML dashboards.",
        level: "Intermediate",
        relatedProject: "AI Prototypes",
        icon: Monitor,
        shortDesc: "AI demo & dashboard builder"
    },
    {
        name: "Git & GitHub",
        description:
            "Version control, collaboration, and open-source workflow management.",
        level: "Advanced",
        relatedProject: "All Projects",
        icon: GitBranch,
        shortDesc: "Collaboration & version control"
    },
    {
        name: "Docker",
        description:
            "Containerization for deploying and scaling AI applications.",
        level: "Intermediate",
        relatedProject: "Deployment Pipelines",
        icon: Server,
        shortDesc: "Containerized deployments"
    },
    {
        name: "Databases (MongoDB, SQL)",
        description:
            "Designing and querying relational and NoSQL databases.",
        level: "Intermediate",
        relatedProject: "Full-Stack AI Projects",
        icon: Database,
        shortDesc: "Structured & unstructured data"
    }
];

/* =========================
   OTHER / NON-TECHNICAL
========================= */
export const other: Skill[] = [
    {
        name: "Prompt Engineering",
        description:
            "Designing structured prompts for reliable, controllable, and high-quality LLM outputs.",
        level: "Advanced",
        relatedProject: "GenAI & AI Agents",
        icon: Sparkles,
        shortDesc: "Optimizing LLM behavior"
    },
    {
        name: "UI / UX Design",
        description:
            "Designing clean, intuitive interfaces for AI products and tools.",
        level: "Intermediate",
        relatedProject: "Portfolio & AI Tools",
        icon: Palette,
        shortDesc: "User-centric AI interfaces"
    },
    {
        name: "Video Editing",
        description:
            "Editing technical and creative content using Adobe Premiere Pro, After Effects, CapCut, and Photoshop.",
        level: "Advanced",
        relatedProject: "Tech Content & Demos",
        icon: Video,
        shortDesc: "Professional video & motion editing"
    },
    {
        name: "Technical Writing",
        description:
            "Clear documentation, README files, and technical explanations for complex systems.",
        level: "Intermediate",
        relatedProject: "Open-Source & AI Docs",
        icon: FileText,
        shortDesc: "Clear technical communication"
    },
    {
        name: "AI Tools User",
        description:
            "Hands-on experience using modern AI tools for development, research, productivity, and content creation.",
        level: "Advanced",
        relatedProject: "Portfolio, AI Projects & Daily Workflow",
        icon: Sparkles,
        shortDesc: "User of modern AI tools"
    },
    {
        name: "Problem Solving",
        description:
            "Strong analytical mindset for breaking down complex engineering problems.",
        level: "Advanced",
        relatedProject: "All Major Projects",
        icon: BrainCog,
        shortDesc: "Analytical & logical thinking"
    }
];
