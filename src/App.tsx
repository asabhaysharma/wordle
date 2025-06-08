import React, { useEffect, useState } from 'react';
import { useWordle } from './hooks/useWordle';
import GameBoard from './components/GameBoard';
import Keyboard from './components/Keyboard';
import GameStats from './components/GameStats';
import { RotateCcw } from 'lucide-react';
import { loadValidWords } from './data/words'; // 🔁 Update with your actual path

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  const {
    gameState,
    invalidWord,
    animatingRow,
    resetGame,
    addLetter,
    removeLetter,
    submitGuess,
  } = useWordle();

  useEffect(() => {
    loadValidWords().then(() => setIsLoaded(true));
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Loading words...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Wordle</h1>
          <button
            onClick={resetGame}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            title="New Game"
          >
            <RotateCcw size={18} />
            <span className="hidden sm:inline">New Game</span>
          </button>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full px-4">
        <div className="text-center mb-6">
          <p className="text-gray-600 text-sm">
            Guess the 5-letter word in 5 tries or fewer
          </p>
          {invalidWord && (
            <p className="text-red-500 text-sm mt-2 font-semibold animate-pulse">
              Not a valid word!
            </p>
          )}
        </div>

        <div className="mb-8">
          <GameBoard 
            gameState={gameState}
            invalidWord={invalidWord}
            animatingRow={animatingRow}
          />
        </div>

        <div className="w-full">
          <Keyboard
            guesses={gameState.guesses}
            secretWord={gameState.secretWord}
            onKeyPress={addLetter}
            onEnter={submitGuess}
            onBackspace={removeLetter}
          />
        </div>
      </main>

      <GameStats gameState={gameState} onRestart={resetGame} />

      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>Use your keyboard or click the letters above</p>
      </footer>
    </div>
  );
}

export default App;
