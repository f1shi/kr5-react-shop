import { useEffect, useState } from 'react';

function readStoredValue(key, initialValue) {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : initialValue;
  } catch {
    return initialValue;
  }
}

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readStoredValue(key, initialValue));

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.warn(`Не удалось сохранить ${key} в localStorage`);
    }
  }, [key, value]);

  return [value, setValue];
}
