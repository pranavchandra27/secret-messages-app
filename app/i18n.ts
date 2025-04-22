import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      couple: {
        me: { name: "Rishu", emoji: '🍫', nickname: "Chocolate" },
        her: { name: "Nóra", emoji: "🥛", nickname: "Milk" },
        title: "Secret Message Unlocker"
      },
      nav: {
        home: "Home",
        messages: "Messages",
        progress: "Progress",
        settings: "Settings"
      },
      home: {
        subtitle:
          "Welcome to our secret space—tap on the treats below to reveal heartfelt messages and playful surprises curated just for us."
      },
      messages: {
        "1": { title: "Sensual Message 1", content: "If my hands could speak, they'd tell you everything I feel for you. #1" },
        "2": { title: "Poetic Message 2", content: "You’re a soft song in the middle of my noise. #2" },
        "3": { title: "Romantic Message 3", content: "With you, love feels like breathing—natural and necessary. #3" },
        "4": { title: "Sweet Message 4", content: "Just thinking of you makes everything better. #4" },
        "5": { title: "Playful Message 5", content: "Bet I could make you laugh in less than 10 seconds. #5" },
        "6": { title: "Funny Message 6", content: "You must be tired—running through my mind all day. #6" },
        "7": { title: "Flirty Message 7", content: "You’re trouble, and I like it. #7" },
        "8": { title: "Curious Message 8", content: "What would you do if we had just 24 hours together? #8" },
        "9": { title: "Naughty Message 9", content: "If I had you here, I’d show you what 'good trouble' feels like. #9" },
        "10": { title: "Comforting Message 10", content: "You’re safe with me. Always. #10" }
      },
      prompts: {
        categories: {
          "All": "All",
          "Daily Love Notes": "Daily Love Notes",
          "Playful Challenges": "Playful Challenges",
          "Secret Reminders": "Secret Reminders",
          "Milestone Unlocks": "Milestone Unlocks"
        },
        items: {
          "1": "Remember, your smile lights up my day.",
          "2": "Every moment with you feels like magic.",
          "3": "Thinking of you makes any day brighter.",
          "4": "Send me a selfie with your goofiest face!",
          "5": "Whisper a secret in the next voice note you send.",
          "6": "Your courage inspires me every single day.",
          "7": "Congrats! You’ve unlocked our very first shared memory.",
          "8": "Halfway there—50% of secrets revealed!"
        }
      },
      tapReveal: "Tap to reveal!",
      surprise: "Surprise Me",
      settings: {
        audio: "Audio Feedback",
        language: "Language"
      },
      progress: {
        unlocked: "You’ve unlocked {{count}} of {{total}} messages.",
        percent: "{{percent}}% complete"
      }
    }
  },
  hu: {
    translation: {
      couple: {
        me: { name: "Rishu", nickname: "Csokolade" },
        her: { name: "Nóra", nickname: "Tej" },
        title: "Titkos Üzenet Feloldó"
      },
      nav: {
        home: "Kezdőlap",
        messages: "Üzenetek",
        progress: "Előrehaladás",
        settings: "Beállítások"
      },
      home: {
        subtitle:
          "Üdv titkos világunkban—érintsd meg az édességeket a szívből jövő üzenetek és meglepetések feloldásához."
      },
      messages: {
        "1": { title: "Szenzuális Üzenet 1", content: "Ha a kezeim beszélni tudnának, mindent elmondanának, amit érzek irántad. #1" },
        "2": { title: "Poétikus Üzenet 2", content: "Te vagy a lágy dal a zajom közepén. #2" },
        "3": { title: "Romantikus Üzenet 3", content: "Veled a szerelem olyan, mint a lélegzés—természetes és nélkülözhetetlen. #3" },
        "4": { title: "Édes Üzenet 4", content: "Ha rád gondolok, minden jobb lesz. #4" },
        "5": { title: "Játékos Üzenet 5", content: "Fogadok, hogy kevesebb mint 10 másodperc alatt megnevettetlek. #5" },
        "6": { title: "Vicces Üzenet 6", content: "Biztosan fáradt vagy—egész nap az eszemben jársz. #6" },
        "7": { title: "Flörtölős Üzenet 7", content: "Baj vagy, és tetszik. #7" },
        "8": { title: "Kíváncsi Üzenet 8", content: "Mit tennél, ha csak 24 óránk lenne együtt? #8" },
        "9": { title: "Csintalan Üzenet 9", content: "Ha itt lennél, megmutatnám, milyen a 'jó baj'. #9" },
        "10": { title: "Vigasztaló Üzenet 10", content: "Biztonságban vagy velem. Mindig. #10" }
      },
      prompts: {
        categories: {
          "All": "Mind",
          "Daily Love Notes": "Napi Szerelmi Jegyzetek",
          "Playful Challenges": "Játékos Kihívások",
          "Secret Reminders": "Titkos Emlékeztetők",
          "Milestone Unlocks": "Mérföldkő Üzenetek"
        },
        items: {
          "1": "Emlékezz, a mosolyod ragyogóvá teszi a napomat.",
          "2": "Minden pillanat veled olyan, mint a varázslat.",
          "3": "Rád gondolva minden nap világosabbá válik.",
          "4": "Küldj egy szelfit a legbolondosabb arcoddal!",
          "5": "Súgj el egy titkot a következő hangüzenetedben.",
          "6": "A bátorságod napról napra inspirál.",
          "7": "Gratulálok! Feloldottad az első közös emlékünket.",
          "8": "A felénél jársz – 50% titok feloldva!"
        }
      },
      tapReveal: "Érints a feloldáshoz!",
      surprise: "Meglepetés",
      settings: {
        audio: "Hangjelzés",
        language: "Nyelv"
      },
      progress: {
        unlocked: "{{count}} üzenetet nyitottál ki a(z) {{total}} közül.",
        percent: "{{percent}}% kész"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    lng:
      typeof window !== "undefined"
        ? localStorage.getItem("language") || "en"
        : "en",
    interpolation: { escapeValue: false }
  });
export default i18n;
