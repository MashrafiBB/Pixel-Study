
import React, { useState, useMemo } from 'react';
import { Task } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import TodoList from './components/TodoList';
import Timer from './components/Timer';
import PixelArt from './components/PixelArt';

const App: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [isStudying, setIsStudying] = useState(false);

  const handleAddTask = (text: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    if (id === activeTaskId) {
      setActiveTaskId(null);
    }
  };
  
  const handleTimerComplete = () => {
    if (activeTaskId) {
      handleToggleTask(activeTaskId);
    }
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    if (id === activeTaskId) {
      setActiveTaskId(null);
    }
  };

  const handleSetActiveTask = (id: string) => {
    setActiveTaskId(id);
  };
  
  const activeTask = useMemo(() => {
    return tasks.find(task => task.id === activeTaskId) || null;
  }, [tasks, activeTaskId]);


  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-pixel text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]">
            Pixel Study Pal
          </h1>
          <p className="text-slate-400 mt-2">Your cozy corner for focused work.</p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="flex flex-col gap-8">
            <PixelArt isStudying={isStudying} />
            <Timer 
              activeTaskName={activeTask?.text || null} 
              onTimerComplete={handleTimerComplete}
              isStudying={isStudying}
              setIsStudying={setIsStudying}
            />
          </div>
          
          <div className="lg:mt-0">
             <TodoList
              tasks={tasks}
              onAddTask={handleAddTask}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
              onSetActiveTask={handleSetActiveTask}
              activeTaskId={activeTaskId}
            />
          </div>
        </main>
        
        <footer className="text-center mt-12 text-slate-500 text-sm">
            <p>Made with focus by your friendly AI engineer.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
