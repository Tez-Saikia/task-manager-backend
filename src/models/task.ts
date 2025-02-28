export interface Task {
    id: string;
    title: string;
    description: string;
    status: "To Do" | "In Progress" | "Done" | "Timeout";
    createdAt: Date;
    duration: number; // in milliseconds
    streamId?: string; // Optional Twitch Stream ID
  }
  