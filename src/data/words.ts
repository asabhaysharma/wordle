// Array to store valid words
let VALID_WORDS: string[] = [];
let IS_LOADED = false;

export const loadValidWords = async () => {
  try {
    const res = await fetch('/wordle/words.txt');
    const text = await res.text();
    VALID_WORDS = text
      .split('\n')
      .map(w => w.trim().toUpperCase())
      .filter(w => w.length === 5);
    IS_LOADED = true;
  } catch (error) {
    console.error('Error loading words:', error);
    VALID_WORDS = []; // Set empty array as fallback
  }
};

export const getRandomWord = (): string => {
  if (!IS_LOADED || VALID_WORDS.length === 0) {
    console.error('Trying to get random word before words are loaded');
    return 'WORDS'; // Fallback word
  }
  const randomIndex = Math.floor(Math.random() * VALID_WORDS.length);
  return VALID_WORDS[randomIndex];
};

export const isValidWord = (word: string): boolean => {
  if (!IS_LOADED) {
    console.error('Trying to validate word before words are loaded');
    return false;
  }
  return VALID_WORDS.includes(word.toUpperCase());
};
