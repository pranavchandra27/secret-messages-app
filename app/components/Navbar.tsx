// app/components/Navbar.tsx
import { Link, useLocation } from "@remix-run/react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { couple } from "~/config";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function Navbar() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const meEmoji = t(`${couple.meKey}.emoji`);
  const meNickname = t(`${couple.meKey}.nickname`);
  const herEmoji = t(`${couple.herKey}.emoji`);
  const herNickname = t(`${couple.herKey}.nickname`);
  const meName = t(`${couple.meKey}.name`);
  const herName = t(`${couple.herKey}.name`);

  const logo = (
    <div className="flex items-center space-x-2 text-brown text-lg font-bold">
      <span className="text-xl">{meEmoji}</span>
      <div className="text-sm">
        <strong className="font-bold">{meNickname}</strong>{" "}
        <span className="italic">({meName})</span>
      </div>
      <span className="hidden md:inline">&</span>
      <span className="text-xl">{herEmoji}</span>
      <div className="text-sm">
        <strong className="font-bold">{herNickname}</strong>{" "}
        <span className="italic">({herName})</span>
      </div>
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
      {/* Make this container relative so the absolute dropdown sits correctly */}
      <div className="container relative mx-auto flex items-center justify-between px-4 py-3">
        {logo}

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6 text-brown" />
        </button>

        {/* 
          On mobile: hidden unless open.
          On md+: always flex 
        */}
        <ul
          className={`
            ${open ? "block" : "hidden"} 
            md:flex md:items-center 
            absolute md:static top-full left-0 w-full md:w-auto 
            bg-cream md:bg-transparent
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
                className={`
                  block px-4 py-2 md:px-3 md:py-0 rounded-lg transition
                  ${
                    pathname === to
                      ? "bg-accent text-cream"
                      : "text-brown hover:bg-accent hover:text-cream"
                  }
                `}
                onClick={() => setOpen(false)} // close menu on link click
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
