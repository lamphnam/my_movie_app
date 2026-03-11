// src/hooks/useLocalStorage.ts
import { useState, useRef, useCallback } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Always-current ref so setValue never reads a stale closure
  const storedValueRef = useRef(storedValue);
  storedValueRef.current = storedValue;

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Use ref to get latest value, fixes stale closure bug in production
        const valueToStore =
          value instanceof Function ? value(storedValueRef.current) : value;
        setStoredValue(valueToStore);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key],
  );

  return [storedValue, setValue] as const;
}

export default useLocalStorage;
