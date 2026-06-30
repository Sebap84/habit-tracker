import type { HabitStats } from '../types';
import '../styles/habit-card.css';

interface HabitCardProps {
  stats: HabitStats;
  onToggleToday: (id: string) => void;
  onDelete: (id: string) => void;
}

export function HabitCard({ stats, onToggleToday, onDelete }: HabitCardProps) {
  const { habit, completedToday, currentStreak, bestStreak, totalCompletions } = stats;

  return (
    <div
      className={`habit-card${completedToday ? ' completed' : ''}`}
      style={{ '--habit-color': habit.color } as React.CSSProperties}
    >
      <button
        className="habit-toggle"
        onClick={() => onToggleToday(habit.id)}
        title={completedToday ? 'Marcar como pendiente' : 'Marcar como completado'}
        aria-label={completedToday ? 'Desmarcar hábito' : 'Completar hábito hoy'}
      >
        {completedToday ? '✓' : habit.emoji}
      </button>

      <div className="habit-info">
        <div className="habit-name">{habit.name}</div>
        {habit.description && (
          <div className="habit-desc">{habit.description}</div>
        )}
      </div>

      <div className="habit-stats">
        <span className="badge badge-streak" title="Racha actual">
          🔥 {currentStreak}
        </span>
        <span className="badge badge-best" title="Mejor racha">
          ⭐ {bestStreak}
        </span>
        <span className="badge badge-total" title="Total completados">
          ✓ {totalCompletions}
        </span>
      </div>

      <button
        className="habit-delete"
        onClick={() => onDelete(habit.id)}
        title="Eliminar hábito"
        aria-label="Eliminar hábito"
      >
        ✕
      </button>
    </div>
  );
}
