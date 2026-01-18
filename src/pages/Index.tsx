import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import Projects from "@/components/Projects";
import SkillsTools from "@/components/SkillsTools";
import Hobbies from "@/components/Hobbies";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Feedback from "@/components/Feedback";
import Robo from "@/components/Robo";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <div id="home">
          <Hero />
        </div>
        <AboutMe />
        <SkillsTools />
        <Projects />
        <Hobbies />
        <Certificates />
        <Contact />
        <Feedback />
      </main>
      <Footer />
      <Robo />
    </div>
  );
};

export default Index;
