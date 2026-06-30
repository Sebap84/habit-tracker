import { useState, useEffect, useMemo } from 'react';
import type { Habit, HabitStats } from '../types';
import { computeStats, todayISO } from '../utils/streaks';

const STORAGE_KEY = 'habit-tracker-habits';

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: Partial<Habit>[] = raw ? JSON.parse(raw) : [];
    return parsed.map(h => ({ emoji: '✅', color: '#6366f1', ...h })) as Habit[];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  }, [habits]);

  const habitStats: HabitStats[] = useMemo(
    () => habits.map(computeStats),
    [habits]
  );

  function addHabit(name: string, emoji: string, color: string, description?: string) {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name: name.trim(),
      emoji,
      color,
      description: description?.trim() || undefined,
      createdAt: todayISO(),
      completions: [],
    };
    setHabits(prev => [...prev, newHabit]);
  }

  function deleteHabit(id: string) {
    setHabits(prev => prev.filter(h => h.id !== id));
  }

  function toggleToday(id: string) {
    const today = todayISO();
    setHabits(prev =>
      prev.map(h => {
        if (h.id !== id) return h;
        const has = h.completions.includes(today);
        return {
          ...h,
          completions: has
            ? h.completions.filter(d => d !== today)
            : [...h.completions, today],
        };
      })
    );
  }

  return { habits, habitStats, addHabit, deleteHabit, toggleToday };
}
