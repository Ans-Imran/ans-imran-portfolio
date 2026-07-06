import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { CredibilityBar } from "@/components/CredibilityBar";
import { About } from "@/components/About";
import { ToolsShowcase } from "@/components/ToolsShowcase";
import { FeaturedProject } from "@/components/FeaturedProject";
import { Publications } from "@/components/Publications";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ScrollAnimator } from "@/components/ScrollAnimator";
import { getToolsRegistry } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { rows: registry } = await getToolsRegistry();
  return (
    <>
      <Nav />
      <ScrollAnimator />
      <Hero />
      <CredibilityBar />
      <About />
      <ToolsShowcase registry={registry} />
      <FeaturedProject />
      <Publications />
      <Education />
      <Contact />
      <Footer />
    </>
  );
}
