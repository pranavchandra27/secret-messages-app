import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import type { RawMessage } from "~/types";
import messages from "~/data/messages.json";
import { useTranslation } from "react-i18next";

export default function ProgressPage() {
  const { t } = useTranslation();
  const all = messages as RawMessage[];
  const total = all.length;

  const [unlocked, setUnlocked] = useState<number[]>([]);
  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? localStorage.getItem("unlockedMessages")
        : null;
    if (saved) {
      try {
        setUnlocked(JSON.parse(saved));
      } catch {
        setUnlocked([]);
      }
    }
  }, []);

  const percent = total > 0 ? (unlocked.length / total) * 100 : 0;

  return (
    <div className="space-y-6 text-center max-w-2xl mx-auto p-6">
      {unlocked.length === total && <Confetti recycle={false} />}

      <motion.h2
        className="text-3xl font-bold text-brown"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {t("nav.progress")}
      </motion.h2>

      <p className="text-lg text-gray-700">
        {t("progress.unlocked", {
          count: unlocked.length,
          total,
        })}
      </p>

      {/* Animated progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <motion.div
          className="h-full bg-accent"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8 }}
        />
      </div>

      <p className="text-gray-600">
        {t("progress.percent", { percent: percent.toFixed(1) })}
      </p>
    </div>
  );
}
