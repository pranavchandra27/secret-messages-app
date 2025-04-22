// app/types.ts
export interface Message {
  id: number;
  type: string;
  title: string;
  content: string;
  emoji: string;
  // if you ever add audio later, make it optional:
  audio?: string | null;
}
