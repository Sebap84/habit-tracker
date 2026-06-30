import '../styles/header.css';

interface HeaderProps {
  view: 'dashboard' | 'add';
  onToggleView: () => void;
}

export function Header({ view, onToggleView }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-inner">
        <span className="header-title">
          <span>&#x2713;</span>Habit Tracker
        </span>
        <button className="header-btn" onClick={onToggleView}>
          {view === 'dashboard' ? '+ Nuevo hábito' : '← Volver'}
        </button>
      </div>
    </header>
  );
}
