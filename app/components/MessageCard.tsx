import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { fadeInUp } from "~/animations";
import type { Message } from "~/types";

interface Props {
  message: Message;
  unlocked: boolean;
  onUnlock: (id: number) => void;
}

export default function MessageCard({ message, unlocked, onUnlock }: Props) {
  const { t } = useTranslation();

  const idKey = String(message.id);
  const title = t(`messages.${idKey}.title`);
  const content = t(`messages.${idKey}.content`);

  const handleClick = () => {
    if (!unlocked) onUnlock(message.id);
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="whileHover"
      variants={fadeInUp}
      className="bg-cream shadow-lg rounded-2xl p-6 cursor-pointer text-center flex flex-col gap-4"
      onClick={handleClick}
    >
      <h3 className="text-2xl font-semibold mb-2">
        {message.emoji} {title}
      </h3>
      {unlocked ? (
        <p className="text-gray-700">{content}</p>
      ) : (
        <p className="mt-auto italic text-gray-400">{t("tapReveal")}</p>
      )}
    </motion.div>
  );
}
