import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import PromptList from "~/components/PromptList";
import { couple } from "~/config";

export default function Home() {
  const { t } = useTranslation();

  const title = t(couple.titleKey, {
    me: t(`${couple.meKey}.nickname`),
    her: t(`${couple.herKey}.nickname`),
  });

  return (
    <div className="text-center space-y-6">
      <motion.h1
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-brown mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {title}
      </motion.h1>

      <motion.p
        className="text-gray-700 max-w-xl sm:max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {t("home.subtitle")}
      </motion.p>

      <div className="bg-cream p-6">
        <PromptList />
      </div>
    </div>
  );
}
