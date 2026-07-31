import { Link } from "react-router-dom"
import { FacebookIcon, GithubIcon, InstagramIcon, LinkedinIcon } from "./BrandIcons.jsx"

const socials = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/anuz_ghimire_/",
    color: "#E4405F",
    Icon: InstagramIcon,
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/anuj.ghimire.12",
    color: "#1877F2",
    Icon: FacebookIcon,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/anuj-ghimire-788279348/",
    color: "#0A66C2",
    Icon: LinkedinIcon,
  },
  {
    name: "GitHub",
    url: "https://github.com/anujghimire07",
    color: "#e6e6e6",
    Icon: GithubIcon,
  },
]

const productLinks = ["Features", "Integrations", "Changelog", "Roadmap", "API"]
const supportLinks = ["Help Center", "Contact", "FAQ", "Status", "Privacy"]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ backgroundColor: "#2B2D2A" }} className="text-[#a0a69e]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-2xl font-bold">
              <span className="text-white">KI</span>
              <span style={{ color: "#7a9e7e" }}>VO</span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              A calm, minimal task manager that helps you organize your day, set
              priorities, and stay on top of your workflow.
            </p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-widest">
              Connect
            </p>
            <div className="mt-3 flex gap-4">
              {socials.map(({ name, url, color, Icon }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                  className="transition-colors duration-200 hover:text-[color:var(--social-hover)]"
                  style={{ "--social-hover": color }}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white">
              Product
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {productLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="cursor-pointer transition-colors hover:text-white">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white">
              Support
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {supportLinks.map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Contact" ? "/contact" : "#"}
                    className="cursor-pointer transition-colors hover:text-white"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm md:flex-row">
          <p>© {year} KIVO. All rights reserved.</p>
          <div className="flex gap-6">
            {["Terms", "Privacy", "Cookies"].map((item) => (
              <a key={item} href="#" className="transition-colors hover:text-white">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
