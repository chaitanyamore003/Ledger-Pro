import { FaGithub, FaLinkedin } from "react-icons/fa6";
import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
} from "react-icons/si";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const navigation = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#features" },
      { name: "Dashboard", href: "#dashboard" },
      { name: "Security", href: "#security" },
      { name: "Technology", href: "#technology" },
    ],
  },
  {
    title: "Resources",
    links: [
      {
        name: "GitHub Repository",
        href: "https://github.com/chaitanyamore003/Ledger-Flow",
      },
      {
        name: "Portfolio",
        href: "https://yourportfolio.com",
      },
      {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/chaitanya-more-472203244/",
      },
    ],
  },
];

const technologies = [
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
];

function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white dark:border-white/10 dark:bg-black">
      <div className="mx-auto max-w-7xl px-8 py-20">
        <div className="grid gap-16 lg:grid-cols-[2fr_1fr_1fr]">
          {/* Brand */}

          <div>
            <Link
              to="/"
              className="text-3xl font-bold tracking-tight text-black dark:text-white"
            >
              LEDGER<span className="text-[#FFBA7D]">PRO</span>
            </Link>

            <p className="mt-6 max-w-md text-lg leading-8 text-neutral-600 dark:text-neutral-400">
              A modern banking platform built with security, scalability and
              performance at its core.
            </p>

            {/* Social Links */}

            <div className="mt-8 flex gap-4">
              <a
                href="https://github.com/chaitanyamore003"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-black/10 p-3 transition-all hover:border-[#FFBA7D] hover:text-[#FFBA7D] dark:border-white/10"
              >
                <FaGithub size={20} />
              </a>

              <a
                href="https://www.linkedin.com/in/chaitanya-more-472203244/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-black/10 p-3 transition-all hover:border-[#FFBA7D] hover:text-[#FFBA7D] dark:border-white/10"
              >
                <FaLinkedin size={20} />
              </a>

              <a
                href="mailto:chaitanyamore003@gmail.com"
                className="rounded-xl border border-black/10 p-3 transition-all hover:border-[#FFBA7D] hover:text-[#FFBA7D] dark:border-white/10"
              >
                <MdEmail size={20} />
              </a>
            </div>

            {/* Technologies */}

            <div className="mt-10">
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-neutral-500">
                Built With
              </p>

              <div className="flex flex-wrap gap-4">
                {technologies.map((Icon, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-black/10 p-3 transition-all hover:border-[#FFBA7D] hover:text-[#FFBA7D] dark:border-white/10"
                  >
                    <Icon size={22} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}

          {navigation.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold uppercase tracking-wider text-black dark:text-white">
                {section.title}
              </h3>

              <ul className="mt-6 space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target={
                        link.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        link.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="text-neutral-600 transition hover:text-[#FFBA7D] dark:text-neutral-400"
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

        <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-black/10 pt-8 text-sm text-neutral-500 dark:border-white/10 md:flex-row">
          <p>© {new Date().getFullYear()} LedgerPro. All rights reserved.</p>

          <p>
            Designed & Developed by{" "}
            <span className="font-semibold text-black dark:text-white">
              Chaitanya More
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
