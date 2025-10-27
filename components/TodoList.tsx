
import React, { useState } from 'react';
import { Task } from '../types';
import TodoItem from './TodoItem';

interface TodoListProps {
  tasks: Task[];
  onAddTask: (text: string) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onSetActiveTask: (id: string) => void;
  activeTaskId: string | null;
}

const TodoList: React.FC<TodoListProps> = ({ tasks, onAddTask, onToggleTask, onDeleteTask, onSetActiveTask, activeTaskId }) => {
  const [newTaskText, setNewTaskText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      onAddTask(newTaskText.trim());
      setNewTaskText('');
    }
  };

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="w-full max-w-md mx-auto bg-slate-800/50 p-6 rounded-xl shadow-2xl border-2 border-slate-700 backdrop-blur-sm">
      <h2 className="text-2xl font-pixel text-cyan-400 mb-4">Study List</h2>
      <form onSubmit={handleSubmit} className="flex mb-4">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow bg-slate-900 border-2 border-slate-700 rounded-l-md p-2 text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
        />
        <button type="submit" className="bg-cyan-500 text-slate-900 font-bold p-2 rounded-r-md hover:bg-cyan-400 transition-colors duration-200">
          ADD
        </button>
      </form>

      <div className="max-h-80 overflow-y-auto pr-2">
        <h3 className="text-lg font-bold text-slate-400 mt-4 mb-2">To Do</h3>
        <ul className="space-y-2">
          {pendingTasks.length > 0 ? (
            pendingTasks.map(task => (
              <TodoItem 
                key={task.id} 
                task={task} 
                onToggle={onToggleTask} 
                onDelete={onDeleteTask} 
                onSetActive={onSetActiveTask}
                isActive={task.id === activeTaskId}
              />
            ))
          ) : (
            <p className="text-slate-500 italic">No tasks yet. Time to plan!</p>
          )}
        </ul>

        {completedTasks.length > 0 && (
          <>
            <h3 className="text-lg font-bold text-slate-400 mt-6 mb-2">Completed</h3>
            <ul className="space-y-2">
              {completedTasks.map(task => (
                <TodoItem 
                  key={task.id} 
                  task={task} 
                  onToggle={onToggleTask} 
                  onDelete={onDeleteTask} 
                  onSetActive={onSetActiveTask}
                  isActive={task.id === activeTaskId}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoList;
