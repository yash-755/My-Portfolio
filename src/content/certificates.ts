// ================================
// Certificates Data (FINAL)
// ================================
  
export interface Certificate {
    id: string;
    title: string;
    issuer: string;
    date: string;
    category: "valuable" | "skill" | "tool";
    description: string;
    imageUrl: string;
    featured?: boolean; // for auto-swipe
}

export const certificates: Certificate[] = [
    // ================================
    // 🌟 FEATURED / AUTO-SWIPE (TOP 5)
    // ================================

    {
        id: "cert-1",
        title: "Gemini Certified Student",
        issuer: "Google",
        date: "2025",
        category: "valuable",
        description: "Recognition for hands-on experience with Google Gemini and generative AI capabilities.",
        imageUrl: "/certificates/gemini-certified-student.png",
        featured: true
    },
    {
        id: "cert-2",
        title: "Data Analytics Job Simulation",
        issuer: "Deloitte (Forage)",
        date: "2025",
        category: "valuable",
        description: "Industry-style job simulation focused on data analysis and professional reporting.",
        imageUrl: "/certificates/deloitte-data-analytics-job-simulation.png"
    },
    {
        id: "cert-3",
        title: "SQL and Relational Databases 101",
        issuer: "IBM (Cognitive Class)",
        date: "2025",
        category: "valuable",
        description: "Strong foundation in SQL queries, relational database design, and data handling.",
        imageUrl: "/certificates/ibm-sql-and-relational-databases-101.png",
        featured: true
    },
    {
        id: "cert-4",
        title: "Introduction to Generative AI",
        issuer: "Google Cloud",
        date: "2025",
        category: "valuable",
        description: "Core concepts of generative AI, large language models, and real-world use cases.",
        imageUrl: "/certificates/introduction-to-generative-ai-google-cloud.png",
        featured: true
    },
    {
        id: "cert-5",
        title: "Startup School: Prompt to Prototype",
        issuer: "Google for Startups",
        date: "2025",
        category: "valuable",
        description: "Product thinking and rapid prototyping using AI-driven ideation and execution.",
        imageUrl: "/certificates/startup-school-prompt-to-prototype.png",
        featured: true
    },

    // ================================
    // 🎓 INTERNSHIPS & PROGRAMS
    // ================================

    {
        id: "cert-6",
        title: "AI-ML Virtual Internship",
        issuer: "EduSkills (AICTE)",
        date: "2025",
        category: "skill",
        description: "Hands-on internship covering machine learning fundamentals and AI workflows.",
        imageUrl: "/certificates/ai_ml_virtual_internship_eduskills.png"
    },
    {
        id: "cert-7",
        title: "AWS Gen-AI Virtual Internship",
        issuer: "AWS Academy & EduSkills",
        date: "2025",
        category: "skill",
        description: "Practical exposure to generative AI concepts and AWS cloud-based AI services.",
        imageUrl: "/certificates/aws-genai-virtual-internship-eduskills.png"
    },

    // ================================
    // 🧠 SKILL CERTIFICATIONS
    // ================================

    {
        id: "cert-8",
        title: "Python (Basic)",
        issuer: "HackerRank",
        date: "2025",
        category: "skill",
        description: "Core Python programming concepts including data types, loops, and functions.",
        imageUrl: "/certificates/python-basic-skill-certification.png"
    },
    {
        id: "cert-9",
        title: "SQL (Basic)",
        issuer: "HackerRank",
        date: "2025",
        category: "skill",
        description: "Fundamentals of SQL queries, filtering, and basic joins.",
        imageUrl: "/certificates/sql-basic-skill-certification.png"
    },
    {
        id: "cert-10",
        title: "SQL (Intermediate)",
        issuer: "HackerRank",
        date: "2025",
        category: "skill",
        description: "Advanced joins, subqueries, and complex SQL problem-solving.",
        imageUrl: "/certificates/sql-intermediate-skill-certification.png"
    },
    {
        id: "cert-11",
        title: "Gen Ai",
        issuer: "Outskill",
        date: "2025",
        category: "skill",
        description: "Gen Ai concepts and applications, LLMs, and AI tools, and real-world use cases.",
        imageUrl: "/certificates/outskill_gen_ai_engineering.png"
    },

    // ================================
    // 🛠️ TOOLS & PLATFORMS
    // ================================

    {
        id: "cert-12",
        title: "Prompt Engineering for Everyone",
        issuer: "IBM Skills Network",
        date: "2025",
        category: "tool",
        description: "Designing effective prompts for large language models and AI assistants.",
        imageUrl: "/certificates/ibm-prompt-engineering-for-everyone.png"
    },
    {
        id: "cert-13",
        title: "MongoDB Atlas Search",
        issuer: "MongoDB",
        date: "2025",
        category: "tool",
        description: "Implementing full-text search and indexing using MongoDB Atlas.",
        imageUrl: "/certificates/mongodb-atlas-search.png"
    },
    {
        id: "cert-14",
        title: "Introduction to MongoDB",
        issuer: "MongoDB",
        date: "2025",
        category: "tool",
        description: "NoSQL fundamentals, document modeling, and MongoDB basics.",
        imageUrl: "/certificates/introduction-to-mongodb-students.png"
    },
    {
        id: "cert-15",
        title: "AI Tools Workshop",
        issuer: "be10X",
        date: "2025",
        category: "tool",
        description: "Hands-on workshop exploring modern AI tools and productivity workflows.",
        imageUrl: "/certificates/be10x_ai_tools_workshop.png"
    }
];
