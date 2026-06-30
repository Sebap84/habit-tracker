# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos

```bash
npm run dev       # servidor de desarrollo con HMR
npm run build     # compila TypeScript y genera el bundle de producción
npm run lint      # ejecuta ESLint
npm run preview   # previsualiza el build de producción localmente
```

No hay suite de tests configurada.

## Arquitectura

Aplicación SPA de seguimiento de hábitos diarios. Sin backend: todo el estado persiste en `localStorage` bajo la clave `habit-tracker-habits`.

### Flujo de datos

```
localStorage
    └─> useHabits (src/hooks/useHabits.ts)
            ├─ habits[]        → estado bruto de hábitos
            ├─ habitStats[]    → derivado via computeStats() (memoizado)
            ├─ addHabit()
            ├─ deleteHabit()
            └─ toggleToday()   → agrega/quita la fecha ISO de hoy en habit.completions
                        │
                        ▼
App.tsx  (gestiona vista: 'dashboard' | 'add')
    ├─ Dashboard → HabitCard (lista de hábitos con estadísticas)
    └─ AddHabitForm (formulario de creación)
```

### Tipos clave (`src/types.ts`)

- `Habit`: entidad persistida. Las completaciones se guardan como array de fechas ISO (`YYYY-MM-DD`) en `completions[]`.
- `HabitStats`: `Habit` + estadísticas calculadas (`completedToday`, `currentStreak`, `bestStreak`, `totalCompletions`). Se calcula en `src/utils/streaks.ts` mediante `computeStats()`.

## Flujo de trabajo Git

Después de cada tarea que modifique archivos, confirmar y subir los cambios:

```bash
git add <archivos modificados>
git commit -m "descripción clara del cambio"
git push
```

Los mensajes de confirmación deben explicar qué cambió y por qué. El objetivo es mantener siempre una copia de seguridad completa en GitHub (`Sebap84/habit-tracker`).

### Convenciones

- **CSS**: cada componente tiene su archivo CSS en `src/styles/` (plain CSS, sin módulos). Las tarjetas usan la propiedad personalizada `--habit-color` para el color temático por hábito.
- **Idioma de la UI**: español (locale `es-ES`). Todo texto visible al usuario debe estar en español.
- **Fechas**: siempre como string `YYYY-MM-DD`. Usar `todayISO()` de `src/utils/streaks.ts` para obtener la fecha actual, nunca construirla manualmente.
