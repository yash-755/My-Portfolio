// Centralized data for Hobbies section
// To add a new hobby, simply add a new object to the hobbies array below

export interface Hobby {
    name: string;
    description: string;
}

export const hobbies: Hobby[] = [

    {
        name: "Editing",
        description: "I work on editing technical content and presentations to make them precise, visually clean, and easy to follow. I focus on improving flow, structure, and clarity while preserving technical accuracy."
    },
    {
        name: "Gaming",
        description: "I enjoy strategy and competitive games, particularly those involving decision-making and optimization. Gaming has helped me develop analytical thinking and an interest in how intelligent systems model behavior and adapt to constraints."
    },
    {
        name: "Content Creation",
        description: "I create technical and educational content focused on AI, machine learning, and software engineering. My approach emphasizes clarity, practical understanding, and real-world relevance rather than surface-level explanations."
    },
    {
        name: "Problem Solving",
        description: "I actively practice problem-solving through coding challenges and algorithmic exercises. This helps me strengthen logical reasoning, improve implementation skills, and approach complex problems with structured thinking."
    },
    {
        name: "Technology Awareness",
        description: "I actively stay updated with emerging technologies, especially in AI and software engineering. I enjoy exploring new tools, frameworks, and innovations, understanding their real-world impact, and evaluating how they can be applied to solve practical problems."
    },
    {
        name: "Research & Experiment",
        description: "I enjoy exploring research papers, technical blogs, and new ideas in AI and machine learning. I regularly experiment with concepts by building small prototypes to understand trade-offs, limitations, and real-world applicability."
    },
];
