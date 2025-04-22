// app/components/Navbar.tsx
import { Link, useLocation } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
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
      <div className="container relative mx-auto flex items-center justify-between px-4 py-3">
        {logo}

        {/* hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6 text-brown" />
        </button>

        {/* animated mobile menu & static desktop menu */}
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="
                absolute top-full left-0 w-full bg-cream border-b border-brown
                md:static md:flex md:space-x-4 md:border-0 md:bg-transparent
              "
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
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        {/* on desktop, always show links even if open===false */}
        <ul className="hidden md:flex md:space-x-4">
          {links.map(({ to, label }) => (
            <motion.li
              key={to}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm"
            >
              <Link
                to={to}
                className={`
                  px-3 py-1 rounded-lg transition
                  ${
                    pathname === to
                      ? "bg-accent text-cream"
                      : "text-brown hover:bg-accent hover:text-cream"
                  }
                `}
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
