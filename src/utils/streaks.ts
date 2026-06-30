import type { Habit, HabitStats } from '../types';

export function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function subtractDays(dateStr: string, n: number): string {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() - n);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function computeStats(habit: Habit): HabitStats {
  const today = todayISO();
  const completionSet = new Set(habit.completions);
  const completedToday = completionSet.has(today);

  // Current streak: anchor from today if completed, else from yesterday
  let currentStreak = 0;
  let checkDate = completedToday ? today : subtractDays(today, 1);
  while (completionSet.has(checkDate)) {
    currentStreak++;
    checkDate = subtractDays(checkDate, 1);
  }

  // Best streak: scan sorted completions forward
  const sorted = [...habit.completions].sort();
  let bestStreak = 0;
  let run = 0;
  for (let j = 0; j < sorted.length; j++) {
    if (j === 0) {
      run = 1;
    } else {
      const expected = subtractDays(sorted[j], 1);
      run = sorted[j - 1] === expected ? run + 1 : 1;
    }
    if (run > bestStreak) bestStreak = run;
  }

  return {
    habit,
    completedToday,
    currentStreak,
    bestStreak,
    totalCompletions: habit.completions.length,
  };
}
