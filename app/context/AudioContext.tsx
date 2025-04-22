import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AudioContextType {
  enabled: boolean;
  toggle: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [enabled, setEnabled] = useState(true);

  // Load saved preference
  useEffect(() => {
    const saved = localStorage.getItem("audioEnabled");
    if (saved !== null) {
      setEnabled(JSON.parse(saved));
    }
  }, []);

  // Persist on change
  useEffect(() => {
    localStorage.setItem("audioEnabled", JSON.stringify(enabled));
  }, [enabled]);

  const toggle = () => setEnabled((prev) => !prev);

  return (
    <AudioContext.Provider value={{ enabled, toggle }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const ctx = useContext(AudioContext);
  if (!ctx)
    throw new Error("useAudio must be used within an AudioProvider");
  return ctx;
};
