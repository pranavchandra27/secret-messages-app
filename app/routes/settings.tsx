import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { fadeInUp } from "~/animations";
import { useAudio } from "~/context/AudioContext";
import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";
import { ActionFunction } from "@remix-run/node";
import { langCookie } from "~/utils/cookies";

type LanguageChangeResponse = { lng: string };

export default function SettingsPage() {
  const { t, i18n } = useTranslation();
  const { enabled, toggle } = useAudio();

  const fetcher = useFetcher<LanguageChangeResponse>();

  useEffect(() => {
    if (fetcher.data?.lng) {
      i18n.changeLanguage(fetcher.data.lng);
      localStorage.setItem("language", fetcher.data.lng);
    }
  }, [fetcher.data, i18n]);

  const switchLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    fetcher.submit({ language: e.target.value }, { method: "post" });
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto p-6">
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

        <fetcher.Form method="post" action="/settings">
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
        </fetcher.Form>
      </div>
    </div>
  );
}

export let action: ActionFunction = async ({ request }) => {
  let form = await request.formData();
  let lng = form.get("language");
  if (typeof lng !== "string") {
    return new Response(JSON.stringify({ error: "Invalid language" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  let cookieHeader = await langCookie.serialize(lng);
  return new Response(JSON.stringify({ lng }), {
    status: 200,
    headers: {
      "Set-Cookie": cookieHeader,
      "Content-Type": "application/json",
    },
  });
};
