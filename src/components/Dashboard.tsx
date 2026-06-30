import type { HabitStats } from '../types';
import { HabitCard } from './HabitCard';
import '../styles/dashboard.css';

interface DashboardProps {
  habitStats: HabitStats[];
  onToggleToday: (id: string) => void;
  onDelete: (id: string) => void;
}

export function Dashboard({ habitStats, onToggleToday, onDelete }: DashboardProps) {
  const today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const completedCount = habitStats.filter(s => s.completedToday).length;
  const totalCount = habitStats.length;
  const bestStreakOverall = habitStats.reduce((max, s) => Math.max(max, s.currentStreak), 0);

  if (totalCount === 0) {
    return (
      <div className="dashboard-empty">
        <h3>Sin hábitos todavía</h3>
        <p>Pulsa "Nuevo hábito" para empezar a registrar tus hábitos diarios.</p>
      </div>
    );
  }

  return (
    <div>
      <p className="dashboard-heading">{today}</p>

      <div className="dashboard-summary">
        <div className="summary-card">
          <div className="summary-card-value">{completedCount}/{totalCount}</div>
          <div className="summary-card-label">Completados hoy</div>
        </div>
        <div className="summary-card">
          <div className="summary-card-value">{bestStreakOverall}</div>
          <div className="summary-card-label">Mejor racha activa</div>
        </div>
        <div className="summary-card">
          <div className="summary-card-value">
            {totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%
          </div>
          <div className="summary-card-label">Tasa de hoy</div>
        </div>
      </div>

      <div className="dashboard-list">
        {habitStats.map(stats => (
          <HabitCard
            key={stats.habit.id}
            stats={stats}
            onToggleToday={onToggleToday}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
