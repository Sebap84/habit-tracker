import { useState } from 'react';
import { useHabits } from './hooks/useHabits';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { AddHabitForm } from './components/AddHabitForm';
import './styles/app.css';

type View = 'dashboard' | 'add';

function App() {
  const [view, setView] = useState<View>('dashboard');
  const { habitStats, addHabit, deleteHabit, toggleToday } = useHabits();

  function handleToggleView() {
    setView(v => (v === 'dashboard' ? 'add' : 'dashboard'));
  }

  return (
    <div className="app">
      <Header view={view} onToggleView={handleToggleView} />
      <main className="app-content">
        {view === 'dashboard' ? (
          <Dashboard
            habitStats={habitStats}
            onToggleToday={toggleToday}
            onDelete={deleteHabit}
          />
        ) : (
          <AddHabitForm onAdd={addHabit} onViewChange={setView} />
        )}
      </main>
    </div>
  );
}

export default App;
