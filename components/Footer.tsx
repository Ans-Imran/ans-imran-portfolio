export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
          <div className="text-sm text-text-secondary text-center sm:text-left">
            <span className="font-semibold text-text-main">Ans Imran Shahid</span>
            {" · "}LCA Specialist{" · "}Gothenburg, Sweden
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com/in/ans-imran" target="_blank" rel="noopener noreferrer"
              className="text-text-secondary hover:text-primary transition-colors text-sm">LinkedIn</a>
            <a href="https://orcid.org/0009-0009-0434-7988" target="_blank" rel="noopener noreferrer"
              className="text-text-secondary hover:text-primary transition-colors text-sm">ORCID</a>
            <a href="mailto:ansimran300@gmail.com"
              className="text-text-secondary hover:text-primary transition-colors text-sm">Email</a>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mb-4 text-xs text-text-secondary">
          <a href="https://carbon-hotspot-finder.vercel.app" target="_blank" rel="noopener noreferrer"
            className="hover:text-primary transition-colors">Carbon Hotspot Finder</a>
          <span className="text-gray-200">·</span>
          <a href="https://scope3-simulator.vercel.app" target="_blank" rel="noopener noreferrer"
            className="hover:text-primary transition-colors">Scope 3 Simulator</a>
          <span className="text-gray-200">·</span>
          <a href="https://csrd-compliance-checker.vercel.app" target="_blank" rel="noopener noreferrer"
            className="hover:text-primary transition-colors">CSRD Checker</a>
          <span className="text-gray-200">·</span>
          <a href="https://lca-project-planner.vercel.app" target="_blank" rel="noopener noreferrer"
            className="hover:text-primary transition-colors">LCA Planner</a>
        </div>

        <div className="text-center text-xs text-gray-400">
          © 2026 · Built with purpose
        </div>
      </div>
    </footer>
  );
}

export default Footer;
