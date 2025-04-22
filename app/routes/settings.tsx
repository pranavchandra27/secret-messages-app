import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { fadeInUp } from "~/animations";
import { useAudio } from "~/context/AudioContext";

export default function SettingsPage() {
  const { t, i18n } = useTranslation();
  const { enabled, toggle } = useAudio();

  const switchLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lng = e.target.value;
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  return (
    <div className="space-y-6">
      <motion.h2
        className="text-3xl font-bold text-brown mb-6 text-center"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        {t("nav.settings")}
      </motion.h2>

      <div className="bg-cream shadow-md rounded-2xl p-6 space-y-6">
        {/* Audio Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-lg text-gray-800">{t("settings.audio")}</span>
          <button
            onClick={toggle}
            className={`px-4 py-2 rounded-lg transition ${
              enabled ? "bg-accent text-cream" : "bg-gray-300 text-brown"
            }`}
          >
            {enabled ? "On" : "Off"}
          </button>
        </div>

        {/* Language Selector */}
        <div className="flex items-center justify-between">
          <label htmlFor="language" className="text-lg text-gray-800">
            {t("settings.language")}
          </label>
          <select
            id="language"
            value={i18n.language}
            onChange={switchLang}
            className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-800"
          >
            <option value="en">English</option>
            <option value="hu">Magyar</option>
          </select>
        </div>
      </div>
    </div>
  );
}
