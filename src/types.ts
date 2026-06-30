export interface Habit {
  id: string;
  name: string;
  description?: string;
  emoji: string;
  color: string;
  createdAt: string;
  completions: string[];
}

export interface HabitStats {
  habit: Habit;
  completedToday: boolean;
  currentStreak: number;
  bestStreak: number;
  totalCompletions: number;
}
