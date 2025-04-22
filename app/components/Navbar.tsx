import { Link, useLocation } from "@remix-run/react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { couple } from "~/config";

export default function Navbar() {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const meEmoji = t(`${couple.meKey}.emoji`);
  const meName = t(`${couple.meKey}.name`);
  const meNickname = t(`${couple.meKey}.nickname`);
  const herEmoji = t(`${couple.herKey}.emoji`);
  const herName = t(`${couple.herKey}.name`);
  const herNickname = t(`${couple.herKey}.nickname`);

  const logo = (
    <div className="flex items-center space-x-2 text-brown text-xl font-bold">
      <span className="text-2xl">{meEmoji}</span>
      <span>{`${meNickname} (${meName})`}</span>
      <span>&</span>
      <span className="text-2xl">{herEmoji}</span>
      <span>{`${herNickname} (${herName})`}</span>
    </div>
  );

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/messages", label: t("nav.messages") },
    { to: "/progress", label: t("nav.progress") },
    { to: "/settings", label: t("nav.settings") },
  ];

  return (
    <nav className="bg-cream border-b border-b-brown shadow-sm">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-6 py-4">
        {logo}
        <ul className="flex space-x-4">
          {links.map(({ to, label }) => (
            <motion.li
              key={to}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm font-medium"
            >
              <Link
                to={to}
                className={`px-3 py-1 rounded-lg transition ${
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
