// Storage utility functions for browser local storage

const STORAGE_PREFIX = 'image-resizer:';

/**
 * Store value in localStorage
 */
export const setStorageValue = <T>(
  key: string,
  value: T
): void => {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, serialized);
  } catch (error) {
    console.error(`Error storing value for key "${key}":`, error);
  }
};

/**
 * Get value from localStorage
 */
export const getStorageValue = <T>(
  key: string,
  defaultValue?: T
): T | undefined => {
  try {
    const item = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error retrieving value for key "${key}":`, error);
    return defaultValue;
  }
};

/**
 * Remove value from localStorage
 */
export const removeStorageValue = (key: string): void => {
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
  } catch (error) {
    console.error(`Error removing value for key "${key}":`, error);
  }
};

/**
 * Clear all app storage
 */
export const clearStorage = (): void => {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
};

/**
 * Check if storage is available
 */
export const isStorageAvailable = (): boolean => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};