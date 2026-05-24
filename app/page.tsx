import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { CredibilityBar } from "@/components/CredibilityBar";
import { About } from "@/components/About";
import { ToolsShowcase } from "@/components/ToolsShowcase";
import { FeaturedProject } from "@/components/FeaturedProject";
import { Publications } from "@/components/Publications";
import { Education } from "@/components/Education";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ScrollAnimator } from "@/components/ScrollAnimator";

export default function Home() {
  return (
    <>
      <Nav />
      <ScrollAnimator />
      <Hero />
      <CredibilityBar />
      <About />
      <ToolsShowcase />
      <FeaturedProject />
      <Publications />
      <Education />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
