import { WeatherData } from './types/weather';
export const localStorageKey = 'defaultCity';
export const localStorageKeyHistory = 'keyhistories';

export const groupByDay = (list: WeatherData[]) => {
  return list.reduce(
    (acc, item) => {
      const date = item.dt_txt.split(' ')[0]; // Extract the date part
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    },
    {} as Record<string, WeatherData[]>
  );
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return 'Today';
  }
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
};
export const formatFullDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};
export const capitalizeWords = (str: string): string => {
  return str
    .split(' ') // Split the string into an array of words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter of each word and convert the rest to lowercase
    .join(' '); // Join the words back into a string
};

export const addToHistory = (stringSearch: string) => {
  const listHistoryKey = localStorageKeyHistory;
  let listHistory = JSON.parse(localStorage.getItem(listHistoryKey) || '[]');
  if (!Array.isArray(listHistory)) {
    listHistory = [];
  }
  const listHistorySet = new Set(listHistory);
  listHistorySet.add(stringSearch);
  localStorage.setItem(
    listHistoryKey,
    JSON.stringify(Array.from(listHistorySet))
  );
};

// Function to get the history from localStorage
export const getHistory = (): string[] => {
  const listHistoryKey = localStorageKeyHistory;
  const listHistory = JSON.parse(localStorage.getItem(listHistoryKey) || '[]');
  return Array.isArray(listHistory) ? listHistory : [];
};
export const removeFromHistory = (stringSearch: string) => {
  const listHistoryKey = localStorageKeyHistory;
  let listHistory = JSON.parse(localStorage.getItem(listHistoryKey) || '[]');
  if (Array.isArray(listHistory)) {
    listHistory = listHistory.filter((item) => item !== stringSearch);
    localStorage.setItem(listHistoryKey, JSON.stringify(listHistory));
  }
};
