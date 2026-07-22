import { Link } from "react-router-dom";

const navigation = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#features" },
      { name: "Security", href: "#" },
      { name: "Pricing", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Contact", href: "#" },
      { name: "Support", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
    ],
  },
];

function Footer() {
  return (
    <footer
      id="footer"
      className="border-t border-slate-200 bg-white transition-colors dark:border-slate-800 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}

          <div>
            <Link
              to="/"
              className="text-2xl font-bold text-indigo-700 dark:text-indigo-300"
            >
              LedgerFlow
            </Link>

            <p className="mt-4 max-w-xs leading-7 text-slate-500 dark:text-slate-400">
              A modern enterprise banking ledger management platform built with
              security, scalability and performance in mind.
            </p>
          </div>

          {/* Navigation */}

          {navigation.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {section.title}
              </h3>

              <ul className="mt-5 space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-500 transition hover:text-indigo-700 dark:text-slate-400 dark:hover:text-indigo-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400 md:flex-row">
          <p>© {new Date().getFullYear()} LedgerFlow. All rights reserved.</p>

          <p>Built with React, Node.js, Express and MongoDB.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
