import React, { useState, useEffect } from 'react';
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';
import ResetIcon from './icons/ResetIcon';

interface TimerProps {
  activeTaskName: string | null;
  onTimerComplete: () => void;
  isStudying: boolean;
  setIsStudying: React.Dispatch<React.SetStateAction<boolean>>;
}

const STUDY_DURATION = 25 * 60; // 25 minutes
const BREAK_DURATION = 5 * 60; // 5 minutes

const Timer: React.FC<TimerProps> = ({ activeTaskName, onTimerComplete, isStudying, setIsStudying }) => {
  const [isBreak, setIsBreak] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(STUDY_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  
  // Main timer logic effect
  useEffect(() => {
    // Don't run interval logic if timer is paused
    if (!isRunning) {
      return;
    }
    
    // If time is up, end the current session
    if (timeRemaining <= 0) {
      setIsRunning(false); // Stop the timer
      new Audio('https://www.soundjay.com/buttons/sounds/button-1.mp3').play().catch(e => console.error("Error playing sound:", e));
      
      if (!isBreak) {
        onTimerComplete(); // Mark task as complete if it was a study session
      }
      
      // Switch to the next session type and reset the clock
      const nextIsBreak = !isBreak;
      setIsBreak(nextIsBreak);
      setTimeRemaining(nextIsBreak ? BREAK_DURATION : STUDY_DURATION);
      return;
    }

    // Otherwise, tick down the timer every second
    const interval = setInterval(() => {
      setTimeRemaining(prev => prev - 1);
    }, 1000);

    // Cleanup interval on re-render or unmount
    return () => clearInterval(interval);

  }, [isRunning, timeRemaining, isBreak, onTimerComplete]);

  // Update the visual studying state for the pixel art
  useEffect(() => {
    setIsStudying(isRunning && !isBreak);
  }, [isRunning, isBreak, setIsStudying]);

  const toggleTimer = () => {
    if (!activeTaskName && !isBreak) {
        alert("Please select a task to focus on first!");
        return;
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeRemaining(STUDY_DURATION);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const duration = isBreak ? BREAK_DURATION : STUDY_DURATION;
  const progress = duration > 0 ? ((duration - timeRemaining) / duration) * 100 : 0;

  return (
    <div className="w-full max-w-md mx-auto bg-slate-800 p-6 rounded-xl shadow-2xl border-2 border-slate-700">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-pixel text-cyan-400">
          {isBreak ? "Break Time!" : (activeTaskName ? "Focus Mode" : "Select a Task")}
        </h2>
        {activeTaskName && !isBreak && <p className="text-slate-400 mt-1 truncate">Task: {activeTaskName}</p>}
      </div>
      
      <div className="relative w-48 h-48 mx-auto mb-6">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle className="text-slate-700" strokeWidth="7" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
          <circle
            className={isBreak ? "text-green-500" : "text-fuchsia-500"}
            strokeWidth="7"
            strokeDasharray="283"
            strokeDashoffset={283 - (progress / 100) * 283}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-slate-100 font-mono tracking-wider">{formatTime(timeRemaining)}</span>
        </div>
      </div>
      
      <div className="flex justify-center items-center space-x-4">
        <button 
          onClick={resetTimer} 
          className="p-3 rounded-full bg-slate-700 text-slate-300 hover:bg-slate-600 transition-all duration-200"
          aria-label="Reset timer"
        >
          <ResetIcon className="w-6 h-6" />
        </button>
        <button 
          onClick={toggleTimer} 
          className="w-20 h-20 rounded-full bg-cyan-500 text-slate-900 flex items-center justify-center text-4xl hover:bg-cyan-400 transition-all duration-200 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
          aria-label={isRunning ? "Pause timer" : "Start timer"}
        >
          {isRunning ? <PauseIcon className="w-10 h-10" /> : <PlayIcon className="w-10 h-10" />}
        </button>
        <div className="w-12 h-12" aria-hidden="true"></div>
      </div>
    </div>
  );
};

export default Timer;
