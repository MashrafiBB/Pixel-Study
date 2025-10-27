
import React from 'react';

interface PixelArtProps {
  isStudying: boolean;
}

const PixelArt: React.FC<PixelArtProps> = ({ isStudying }) => {
  return (
    <div className="bg-slate-800 p-4 rounded-lg shadow-lg aspect-video w-full max-w-lg mx-auto overflow-hidden relative border-4 border-slate-700">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 to-slate-800"></div>

      {/* Window */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-32 h-32 bg-black border-4 border-yellow-900 rounded-sm">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-indigo-600"></div>
        {/* Stars */}
        <div className="absolute w-1 h-1 bg-white rounded-full top-4 left-6"></div>
        <div className="absolute w-0.5 h-0.5 bg-white rounded-full top-12 left-12"></div>
        <div className="absolute w-1 h-1 bg-white rounded-full top-8 right-8"></div>
        <div className="absolute w-0.5 h-0.5 bg-white rounded-full top-20 right-4"></div>
        {/* Moon */}
        <div className="absolute w-6 h-6 bg-yellow-100 rounded-full top-4 right-4 shadow-[0_0_8px_2px_rgba(254,249,195,0.7)]"></div>
      </div>

      {/* Floor */}
      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-yellow-900/50"></div>
      
      {/* Desk */}
      <div className="absolute bottom-[24%] left-1/2 -translate-x-1/2 w-4/5 h-2 bg-yellow-800 border-t-2 border-yellow-700"></div>
      <div className="absolute bottom-0 left-[25%] w-2 h-[25%] bg-yellow-800 border-r-2 border-yellow-700"></div>
      <div className="absolute bottom-0 right-[25%] w-2 h-[25%] bg-yellow-800 border-l-2 border-yellow-700"></div>

      {/* Chair */}
      <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-16 h-2 bg-gray-700"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-[20%] bg-gray-700"></div>

      {/* Character */}
      <div className="absolute bottom-[20%] left-1/2 -translate-x-[45%] w-14 h-24">
        {/* Torso */}
        <div className="absolute bottom-0 w-full h-16 bg-red-700 rounded-t-sm"></div>
        {/* Head */}
        <div className="absolute top-0 w-12 h-12 left-1/2 -translate-x-1/2 bg-yellow-300 rounded-sm"></div>
        {/* Hair */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-4 bg-gray-900 rounded-t-sm"></div>
      </div>
      
      {/* Laptop */}
      <div className="absolute bottom-[25%] left-1/2 -translate-x-[60%] w-20 h-14">
        <div className={`absolute bottom-2 w-full h-full rounded-t-sm bg-gray-800 border-2 border-gray-600 transition-colors duration-500 ${isStudying ? 'shadow-[0_0_15px_5px_rgba(107,114,128,0.5)]' : ''}`}>
           <div className={`absolute inset-1.5 rounded-sm transition-colors duration-500 ${isStudying ? 'bg-blue-400' : 'bg-black'}`}>
              {isStudying && <div className="absolute top-2 left-2 w-1 h-8 bg-white animate-pulse"></div>}
           </div>
        </div>
        <div className="absolute bottom-0 w-full h-2 bg-gray-700 rounded-b-sm"></div>
      </div>

      {/* Plant */}
      <div className="absolute bottom-[25%] right-10 w-8 h-8 bg-orange-800 rounded-t-sm"></div>
      <div className="absolute bottom-[calc(25%+2rem)] right-10 w-2 h-6 bg-green-600"></div>
      <div className="absolute bottom-[calc(25%+2rem)] right-[calc(2.5rem+0.25rem)] w-6 h-6 bg-green-700 rounded-full"></div>

      {/* Lamp */}
      <div className="absolute bottom-[calc(25%+1.25rem)] left-10 w-10 h-6 bg-gray-500 rounded-t-full">
         {isStudying && <div className="absolute top-full left-1/2 -translate-x-1/2 w-20 h-20 bg-yellow-200/20 rounded-full blur-lg"></div>}
      </div>
      <div className="absolute bottom-[25%] left-[calc(2.5rem+0.75rem)] w-2 h-5 bg-gray-400"></div>
    </div>
  );
};

export default PixelArt;
