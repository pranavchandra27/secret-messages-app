// app/routes/messages.tsx
import { useLoaderData } from "@remix-run/react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import MessageCard from "~/components/MessageCard";
import type { Message } from "~/types";
import messages from "~/data/messages.json";

import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid as Grid } from "react-window";

export const loader = async () => messages as Message[];

export default function MessagesPage() {
  const data = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  const [unlockedIds, setUnlockedIds] = useState<number[]>([]);

  // Load unlocked IDs
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("unlockedMessages");
      if (saved) setUnlockedIds(JSON.parse(saved));
    }
  }, []);
  // Persist unlocked IDs
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("unlockedMessages", JSON.stringify(unlockedIds));
    }
  }, [unlockedIds]);

  const handleUnlock = (id: number) =>
    setUnlockedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));

  return (
    <div className="space-y-6">
      <motion.h2
        className="text-3xl font-bold text-brown text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {t("nav.messages")}
      </motion.h2>

      {/* Vertical‑only scroll area */}
      <div className="h-[70vh] overflow-y-auto overflow-x-hidden max-w-2xl mx-auto">
        <AutoSizer>
          {({ height, width }) => {
            const columns = width > 1024 ? 3 : width > 640 ? 2 : 1;
            const colWidth = Math.floor(width / columns);
            const rowCount = Math.ceil(data.length / columns);
            const rowHeight = 220; // adjust for your card height + vertical gaps
            const gap = 16;

            return (
              <Grid
                columnCount={columns}
                columnWidth={colWidth}
                height={height}
                rowCount={rowCount}
                rowHeight={rowHeight}
                width={width}
                style={{ overflowX: "hidden" }} // double‑ensure no horizontal scroll
              >
                {({ columnIndex, rowIndex, style }) => {
                  const idx = rowIndex * columns + columnIndex;
                  if (idx >= data.length) return null;

                  // include padding inside the cell but keep it border-box
                  const cellStyle = {
                    ...style,
                    padding: gap / 2,
                    boxSizing: "border-box" as const,
                  };

                  const msg = data[idx];
                  return (
                    <div style={cellStyle}>
                      <MessageCard
                        message={msg}
                        unlocked={unlockedIds.includes(msg.id)}
                        onUnlock={handleUnlock}
                      />
                    </div>
                  );
                }}
              </Grid>
            );
          }}
        </AutoSizer>
      </div>

      <p className="text-center text-lg text-gray-700">
        {t("progress.unlocked", {
          count: unlockedIds.length,
          total: data.length,
        })}
      </p>
    </div>
  );
}
