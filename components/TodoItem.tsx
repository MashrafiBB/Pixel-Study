
import React from 'react';
import { Task } from '../types';
import TrashIcon from './icons/TrashIcon';
import CheckIcon from './icons/CheckIcon';

interface TodoItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onSetActive: (id: string) => void;
  isActive: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, onToggle, onDelete, onSetActive, isActive }) => {
  return (
    <li className={`flex items-center p-3 rounded-lg transition-all duration-200 group ${isActive ? 'bg-cyan-500/20' : 'bg-slate-800 hover:bg-slate-700/50'}`}>
      <button 
        onClick={() => onToggle(task.id)} 
        className={`w-6 h-6 rounded-md border-2 flex-shrink-0 mr-4 flex items-center justify-center transition-all duration-200 ${task.completed ? 'bg-green-500 border-green-500' : 'border-slate-500'}`}
      >
        {task.completed && <CheckIcon className="w-4 h-4 text-white" />}
      </button>
      <span className={`flex-grow text-slate-300 ${task.completed ? 'line-through text-slate-500' : ''}`}>
        {task.text}
      </span>
      {!task.completed && (
        <button 
          onClick={() => onSetActive(task.id)} 
          className={`px-3 py-1 text-xs font-bold rounded-full transition-all duration-200 ml-2 ${isActive ? 'bg-cyan-500 text-slate-900' : 'bg-slate-700 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-900'}`}
        >
          FOCUS
        </button>
      )}
      <button 
        onClick={() => onDelete(task.id)} 
        className="ml-2 p-1 text-slate-500 hover:text-red-500 transition-colors duration-200 opacity-0 group-hover:opacity-100"
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </li>
  );
};

export default TodoItem;
