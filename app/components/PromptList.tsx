import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import promptsData from "~/data/prompts.json";
import { fadeInUp } from "~/animations";

interface Prompt {
  id: number;
  category: string;
}

export default function PromptList() {
  const { t } = useTranslation();
  const [category, setCategory] = useState<string>("All");
  const [randomPrompt, setRandomPrompt] = useState<Prompt | null>(null);

  // structural categories
  const allCats = Array.from(new Set(promptsData.map((p) => p.category)));
  const categories = ["All", ...allCats];

  const filtered =
    category === "All"
      ? promptsData
      : promptsData.filter((p) => p.category === category);

  const handleRandom = () => {
    const pick = filtered[Math.floor(Math.random() * filtered.length)];
    setRandomPrompt(pick);
  };

  return (
    <div className="w-full mx-auto max-w-2xl bg-cream shadow-lg rounded-2xl p-6 space-y-4">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition ${
              category === cat
                ? "bg-accent text-cream"
                : "bg-accent/30 text-brown hover:bg-accent/50"
            }`}
          >
            {t(`prompts.categories.${cat}`)}
          </button>
        ))}
      </div>

      {/* Surprise Me */}
      <button
        onClick={handleRandom}
        className="block mx-auto px-6 py-2 bg-accent text-cream rounded-full shadow-md hover:bg-accent/90 transition"
      >
        {t("surprise")}
      </button>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((prompt) => (
          <motion.div
            key={prompt.id}
            initial="initial"
            animate="animate"
            whileHover="whileHover"
            variants={{
              ...fadeInUp,
              whileHover: { scale: 1.05, transition: { duration: 0.2 } },
            }}
            className="p-4 bg-cream shadow rounded-lg"
          >
            <p className="text-gray-800">{t(`prompts.items.${prompt.id}`)}</p>
          </motion.div>
        ))}
      </div>

      {/* Random Prompt Modal */}
      {randomPrompt && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-cream p-6 rounded-2xl shadow-xl text-center max-w-sm"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-lg text-gray-800 mb-4">
              {t(`prompts.items.${randomPrompt.id}`)}
            </p>
            <button
              onClick={() => setRandomPrompt(null)}
              className="px-4 py-2 bg-accent text-cream rounded-full hover:bg-accent/90 transition"
            >
              {t("close") /* add "close" to your i18n */}
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
