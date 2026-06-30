import { useState } from 'react';
import '../styles/add-habit-form.css';

const EMOJI_OPTIONS = [
  '🏃', '💪', '🧘', '🚴', '🏊', '🥗', '💤', '🚶',
  '📚', '🎯', '🧠', '✍️', '🎨', '🎵', '💻', '🌱',
  '💧', '☀️', '🙏', '❤️', '🌟', '✅', '🔥', '🎉',
];

const COLOR_OPTIONS = [
  '#6366f1',
  '#3b82f6',
  '#14b8a6',
  '#22c55e',
  '#f59e0b',
  '#f97316',
  '#ec4899',
  '#ef4444',
];

interface AddHabitFormProps {
  onAdd: (name: string, emoji: string, color: string, description?: string) => void;
  onViewChange: (view: 'dashboard' | 'add') => void;
}

export function AddHabitForm({ onAdd, onViewChange }: AddHabitFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [emoji, setEmoji] = useState('🎯');
  const [color, setColor] = useState('#6366f1');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError('El nombre del hábito es obligatorio.');
      return;
    }
    onAdd(name.trim(), emoji, color, description.trim() || undefined);
    onViewChange('dashboard');
  }

  return (
    <form className="add-habit-form" onSubmit={handleSubmit} noValidate>
      <h2 className="form-title">Nuevo hábito</h2>

      <div className="form-group">
        <label className="form-label" htmlFor="habit-name">
          Nombre
        </label>
        <input
          id="habit-name"
          type="text"
          className="form-input"
          placeholder="ej. Meditar 10 minutos"
          value={name}
          onChange={e => {
            setName(e.target.value);
            if (error) setError('');
          }}
          autoFocus
        />
        {error && <p className="form-error">{error}</p>}
      </div>

      <div className="form-group">
        <span className="form-label">Emoji</span>
        <div
          className="emoji-picker"
          style={{ '--picker-color': color } as React.CSSProperties}
        >
          {EMOJI_OPTIONS.map(e => (
            <button
              key={e}
              type="button"
              className={`emoji-btn${emoji === e ? ' selected' : ''}`}
              onClick={() => setEmoji(e)}
              aria-label={e}
            >
              {e}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <span className="form-label">Color</span>
        <div className="color-picker">
          {COLOR_OPTIONS.map(c => (
            <button
              key={c}
              type="button"
              className={`color-swatch${color === c ? ' selected' : ''}`}
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
              aria-label={`Color ${c}`}
            >
              {color === c ? '✓' : ''}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="habit-desc">
          Descripción <span>(opcional)</span>
        </label>
        <textarea
          id="habit-desc"
          className="form-textarea"
          placeholder="ej. Cada mañana antes del desayuno"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="btn-secondary"
          onClick={() => onViewChange('dashboard')}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn-primary"
          style={{ backgroundColor: color }}
        >
          Crear hábito
        </button>
      </div>
    </form>
  );
}
