export interface RawMessage {
  id: number;
  type: string;
  emoji: string;
  title: string;
  content_en: string;
  content_hu: string;
}

export interface Message {
  id: number;
  type: string;
  emoji: string;
  title: string;
  content: string;
}