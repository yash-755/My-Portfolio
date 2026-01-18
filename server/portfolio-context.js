/**
 * Portfolio Context Builder
 * Compiles comprehensive information about Yash Uttam for the AI assistant
 * Uses actual data from the portfolio content files
 */

export function getPortfolioContext() {
    // PERSONAL INFORMATION
    const personal = `
===== PERSONAL INFORMATION =====
Name: Yash Uttam
Title: Computer Science (AIML) Student
Role: AI & Machine Learning Engineer
Current Focus: GATE CSE & DA Aspirant

Bio: I'm a passionate Computer Science student specializing in AI and Machine Learning, dedicated to building intelligent systems that solve real-world problems. With expertise in deep learning, data analysis, and modern web technologies, I strive to create innovative solutions at the intersection of AI and software engineering. Currently preparing for GATE CSE & DA while working on cutting-edge AI projects and expanding my knowledge in machine learning engineering.

Contact: yashuttam@example.com
LinkedIn: https://linkedin.com/in/yashuttam
`;

    // SKILLS & EXPERTISE
    const skills = `
===== SKILLS & EXPERTISE =====

Core Technical Skills:
1. Machine Learning (Advanced)
   - Building and deploying intelligent ML models
   - Experienced in various algorithms and frameworks
   - Related Project: AI Analytics Dashboard

2. Deep Learning (Advanced)
   - Neural networks and advanced AI architectures
   - Proficient in CNNs, RNNs, and transformers
   - Related Project: Neural Network Visualizer

3. Python (Expert)
   - Expert programming for AI and data science
   - Used across multiple projects

4. Data Analysis (Advanced)
   - Statistical analysis and data visualization
   - Strong analytical skills
   - Related Project: Analytics Platform

5. React (Intermediate)
   - Modern web development and UI design
   - Frontend development expertise
   - Related Projects: Portfolio & Dashboards

6. NLP (Intermediate)
   - Text analysis and language processing
   - Natural Language Processing applications
   - Related Project: Chatbot Systems

Tools & Frameworks:
1. TensorFlow (Advanced) - Deep learning framework for AI models
2. PyTorch (Advanced) - Research-focused deep learning framework
3. Scikit-learn (Expert) - Classical ML algorithms library
4. Pandas (Expert) - Data manipulation and analysis
5. Git (Advanced) - Version control and collaboration
6. Docker (Intermediate) - Containerization and deployment

Other Competencies:
1. Leadership (Advanced) - Team leadership and mentorship
2. Technical Writing (Intermediate) - Documentation and content creation
3. Problem Solving (Advanced) - Analytical thinking and algorithms
`;

    // PROJECTS
    const projects = `
===== PROJECTS =====

1. AI-Powered Analytics Dashboard
   Category: Evolving (Active Development)
   Timeline: Jan 2024 - Present
   Description: A comprehensive analytics platform using machine learning to provide real-time insights and predictive analytics for business intelligence.
   
   Technologies Used:
   - Skills: Machine Learning, Data Analysis, Python, React
   - Tools: TensorFlow, Scikit-learn, Pandas, D3.js
   
   Key Achievements:
   - Successfully deployed with 95% accuracy in predictions
   - Processing 10K+ data points per second
   
   Challenges: Handling large-scale data processing while maintaining real-time performance and accuracy
   
   Future Scope: Integration with cloud services, advanced NLP features, and mobile app development
   
   Links: GitHub - https://github.com, Demo - https://demo.com

2. Neural Network Visualizer
   Category: Prototype
   Timeline: Sep 2023 - Dec 2023
   Description: An interactive tool to visualize and understand neural network architectures and their training processes.
   
   Technologies Used:
   - Skills: Deep Learning, JavaScript, Data Visualization
   - Tools: PyTorch, Three.js, WebGL
   
   Key Achievements:
   - Used by 500+ students for learning neural networks
   - Featured in university AI courses
   
   Challenges: Creating intuitive visualizations for complex mathematical concepts while maintaining performance
   
   Future Scope: Support for more architectures, collaborative features, and export functionality
   
   Links: GitHub - https://github.com, Demo - https://demo.com
`;

    // CERTIFICATIONS
    const certifications = `
===== CERTIFICATIONS =====

Valuable Certifications:
1. Machine Learning Specialization
   Issuer: Stanford University
   Date: 2024
   Description: Comprehensive ML course covering supervised & unsupervised learning algorithms

2. Deep Learning Specialization
   Issuer: DeepLearning.AI
   Date: 2024
   Description: Advanced deep learning covering CNNs, RNNs, and attention mechanisms

3. AWS Machine Learning
   Issuer: Amazon Web Services
   Date: 2023
   Description: Cloud-based ML deployment and MLOps best practices

4. Neural Networks & Deep Learning
   Issuer: Coursera
   Date: 2023
   Description: Foundations of neural networks and backpropagation algorithms

Tool Certifications:
1. TensorFlow Developer Certificate
   Issuer: Google
   Date: 2023
   Description: Professional certification in TensorFlow for ML model development

Skill Certifications:
1. Python for Data Science
   Issuer: IBM
   Date: 2023
   Description: Advanced Python programming for data analysis and visualization
`;

    // HOBBIES & INTERESTS
    const hobbies = `
===== HOBBIES & INTERESTS =====

1. Book Writing
   Passionate about documenting technical knowledge and creative stories. Currently working on an AI-focused guide for beginners, aiming to make complex concepts accessible and engaging for aspiring machine learning engineers.

2. Content Creation
   Creating educational content about AI, ML, and tech trends on various platforms. Focused on breaking down complex algorithms into digestible formats through tutorials, articles, and visual explainers for the developer community.

3. Editing
   Video and content editing for technical presentations and educational materials. Skilled in creating polished, professional content that combines technical accuracy with engaging storytelling to maximize viewer retention and learning.

4. Gaming
   Strategy and competitive gaming enthusiast. Enjoy analyzing game mechanics and AI behaviors in modern games. Interest in how gaming AI can inform real-world machine learning applications and decision-making systems.

5. Travelling
   Exploring new places and cultures while seeking inspiration for creative and technical projects. Documenting experiences through photography and writing, finding connections between diverse perspectives and innovative problem-solving approaches.
`;

    // Combine all sections
    return `${personal}\n${skills}\n${projects}\n${certifications}\n${hobbies}`.trim();
}
