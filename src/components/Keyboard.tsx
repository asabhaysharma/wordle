import React from 'react';
import { getKeyboardStatus } from '../utils/wordUtils';

interface KeyboardProps {
  guesses: string[];
  secretWord: string;
  onKeyPress: (key: string) => void;
  onEnter: () => void;
  onBackspace: () => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ 
  guesses, 
  secretWord, 
  onKeyPress, 
  onEnter, 
  onBackspace 
}) => {
  const keyboardStatus = getKeyboardStatus(guesses, secretWord);
  
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
  ];

  const getKeyClass = (key: string) => {
    const baseClasses = 'px-3 py-4 rounded-md font-bold text-sm transition-all duration-200 transform hover:scale-105 active:scale-95';
    const status = keyboardStatus.get(key) || 'unused';
    
    if (key === 'ENTER' || key === 'BACKSPACE') {
      return `${baseClasses} bg-gray-400 hover:bg-gray-500 text-white px-4`;
    }
    
    switch (status) {
      case 'correct':
        return `${baseClasses} bg-green-500 hover:bg-green-600 text-white`;
      case 'present':
        return `${baseClasses} bg-yellow-500 hover:bg-yellow-600 text-white`;
      case 'absent':
        return `${baseClasses} bg-gray-600 hover:bg-gray-700 text-white`;
      default:
        return `${baseClasses} bg-gray-200 hover:bg-gray-300 text-gray-800`;
    }
  };

  const handleKeyClick = (key: string) => {
    if (key === 'ENTER') {
      onEnter();
    } else if (key === 'BACKSPACE') {
      onBackspace();
    } else {
      onKeyPress(key);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1 mb-2">
          {row.map((key) => (
            <button
              key={key}
              className={getKeyClass(key)}
              onClick={() => handleKeyClick(key)}
            >
              {key === 'BACKSPACE' ? '⌫' : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;