// Centralized data for Projects section
// To add a new project, simply add a new object to the projects array below

export interface Project {
    id: string;
    title: string;
    category: "evolving" | "prototype";
    description: string;
    timeline: string;
    skills: string[];
    tools: string[];
    challenges: string;
    outcomes: string;
    futureScope: string;
    github: string;
    demo: string;
}

export const projects: Project[] = [
    {
        id: "1",
        title: "Green AI – Energy-Aware Model Selector",
        category: "evolving",
        description:
            "An energy-aware machine learning system that evaluates multiple models and recommends the optimal one by balancing accuracy, training cost, and energy consumption to promote sustainable AI.",
        timeline: "2025 – Present",
        skills: [
            "Machine Learning",
            "Model Evaluation",
            "Sustainable AI",
            "Performance Optimization"
        ],
        tools: [
            "Python",
            "Scikit-learn",
            "NumPy",
            "Pandas"
        ],
        challenges:
            "Quantifying energy consumption and fairly comparing models across accuracy, efficiency, and computational cost.",
        outcomes:
            "Implemented a comparative framework that highlights trade-offs between performance and energy efficiency in ML models.",
        futureScope:
            "Carbon-aware scheduling, hardware-level profiling, and integration with large-scale ML pipelines.",
        github: "https://github.com/yash-755/green-ai-energy-aware-model-selector",
        demo: "https://github.com/yash-755/green-ai-energy-aware-model-selector"
    },
    {
        id: "2",
        title: "Elystrix – AI-Powered Learning Platform",
        category: "evolving",
        description:
            "An AI-powered EdTech platform that converts publicly available YouTube educational content into structured learning paths with progress tracking, quizzes, certifications, and an intelligent AI assistant.",
        timeline: "Sep – Dec 2025",
        skills: [
            "System Design",
            "Machine Learning",
            "AI Assistants",
            "Full-Stack Development",
            "EdTech Architecture"
        ],
        tools: [
            "Next.js",
            "TypeScript",
            "MongoDB",
            "Prisma",
            "Stripe",
            "YouTube API"
        ],
        challenges:
            "Designing a scalable learning architecture while ensuring legal use of public content, accurate progress tracking, and seamless AI-assisted guidance.",
        outcomes:
            "Built a production-ready learning platform with structured courses, certification workflows, and an AI-powered assistant for learner support.",
        futureScope:
            "Creator dashboards, adaptive learning paths, AI-driven recommendations, and large-scale user analytics.",
        github: "https://github.com/yash-755/Elystrix",
        demo: "https://www.elystrix.tech"
    },
    {
        id: "3",
        title: "Personal Portfolio – AI Engineer Showcase",
        category: "evolving",
        description:
            "A high-performance, modern personal portfolio website designed to showcase my projects, skills, certifications, and professional journey with an interactive UI and AI-powered features.",
        timeline: "2025 – Present",
        skills: [
            "Frontend Engineering",
            "UI/UX Design",
            "System Architecture",
            "Performance Optimization"
        ],
        tools: [
            "React",
            "TypeScript",
            "Vite",
            "Tailwind CSS",
            "Framer Motion"
        ],
        challenges:
            "Balancing advanced visuals, animations, and interactivity while maintaining performance, scalability, and clean architecture.",
        outcomes:
            "Built a production-ready portfolio with modular content, project categorization, AI chatbot integration, and seamless navigation.",
        futureScope:
            "Custom domain deployment, blog & case-study sections, analytics integration, and deeper AI-driven personalization.",
        github: "https://github.com/yash-755/My-Portfolio",
        demo: "https://github.com/yash-755/My-Portfolio"
    },

    {
        id: "4",
        title: "TransVerse-ML – Multilingual Conversation Translator",
        category: "evolving",
        description:
            "A real-time, bidirectional multilingual conversation translation engine using transformer-based neural models, designed for low-latency and context-aware communication across messaging platforms.",
        timeline: "Jan - Present 2026",
        skills: [
            "Natural Language Processing",
            "Transformers",
            "Deep Learning",
            "Real-Time Systems"
        ],
        tools: [
            "Python",
            "Transformer Models",
            "NLP Libraries"
        ],
        challenges:
            "Maintaining conversational context while ensuring low-latency translation for real-time communication.",
        outcomes:
            "Developed a modular ML-centric translation system focused on accuracy, speed, and contextual understanding.",
        futureScope:
            "Speech-to-text integration, mobile clients, and on-device inference optimization.",
        github: "https://github.com/yash-755/transverse-ml-conversation-translator",
        demo: "https://github.com/yash-755/transverse-ml-conversation-translator"
    },
    {
        id: "5",
        title: "House Price Prediction – ML Pipeline",
        category: "prototype",
        description:
            "An end-to-end machine learning pipeline for predicting house prices, covering data preprocessing, exploratory data analysis, feature engineering, model training, and evaluation.",
        timeline: "Aug - Nov 2025",
        skills: [
            "Machine Learning",
            "Data Analysis",
            "Feature Engineering"
        ],
        tools: [
            "Python",
            "Jupyter Notebook",
            "Scikit-learn",
            "Pandas"
        ],
        challenges:
            "Handling non-linear relationships in real estate data and selecting appropriate regression models.",
        outcomes:
            "Built a clean, reproducible ML pipeline demonstrating strong fundamentals in applied machine learning.",
        futureScope:
            "Deployment as a web service and integration with real-time housing datasets.",
        github: "https://github.com/yash-755/house-price-prediction-ml-pipeline",
        demo: "https://github.com/yash-755/house-price-prediction-ml-pipeline"
    },
    {
        id: "6",
        title: "Linktree – Personal Portfolio Hub",
        category: "prototype",
        description:
            "A modern Linktree-style personal portfolio hub designed to centralize professional profiles, resume access, and social links with a clean UI and smooth animations.",
        timeline: "May - June 2025",
        skills: [
            "Frontend Development",
            "UI/UX Design",
            "Web Performance"
        ],
        tools: [
            "Vite",
            "TypeScript",
            "CSS Animations"
        ],
        challenges:
            "Designing a visually appealing yet lightweight interface with fast load times and responsive behavior.",
        outcomes:
            "Created a deployable personal hub now integrated into the main portfolio via the Connect section.",
        futureScope:
            "Custom domain integration and deeper portfolio-to-social linking.",
        github: "https://github.com/yash-755/Linktree",
        demo: "https://linktree-4djtpxz0d-yash-uttams-projects.vercel.app"
    }
];
