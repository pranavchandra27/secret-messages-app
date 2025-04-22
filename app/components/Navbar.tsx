import { useState } from "react";
import { Menu } from "lucide-react";
import { Link, useLocation } from "@remix-run/react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { couple } from "~/config";

export default function Navbar() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const meEmoji = t(`${couple.meKey}.emoji`);
  const meName = t(`${couple.meKey}.name`);
  // const meNickname = t(`${couple.meKey}.nickname`);
  const herEmoji = t(`${couple.herKey}.emoji`);
  const herName = t(`${couple.herKey}.name`);
  // const herNickname = t(`${couple.herKey}.nickname`);

  const logo = (
    <div className="flex items-center space-x-2 text-brown text-lg font-bold">
      <span className="text-xl">{meEmoji}</span>
      <span>{meName}</span>
      <span>&</span>
      <span className="text-xl">{herEmoji}</span>
      <span>{herName}</span>
    </div>
  );

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/messages", label: t("nav.messages") },
    { to: "/progress", label: t("nav.progress") },
    { to: "/settings", label: t("nav.settings") },
  ];

  return (
    <nav className="bg-cream border-b border-brown shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {logo}

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6 text-brown" />
        </button>

        {/* Links: hidden on mobile, flex on md+ */}
        <ul
          className={`
            absolute top-full left-0 w-full bg-cream border-brown border-b
            md:static md:flex md:space-x-4 md:border-0 md:bg-transparent justify-end
            ${open ? "block" : "hidden"}
          `}
        >
          {links.map(({ to, label }) => (
            <motion.li
              key={to}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-base md:text-sm"
            >
              <Link
                to={to}
                className={`block px-4 py-2 md:px-3 md:py-0 rounded-lg transition ${
                  pathname === to
                    ? "bg-accent text-cream"
                    : "text-brown hover:bg-accent hover:text-cream"
                }`}
              >
                {label}
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
