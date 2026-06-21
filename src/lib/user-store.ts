import { useState, useEffect } from 'react';
import { Tool } from '../types';
import { tools } from '../data/tools';

export interface UsageHistoryEntry {
  id: string;
  toolId: string;
  toolName: string;
  toolPath: string;
  toolIcon: string;
  detail: string;
  timestamp: string;
}

const STORAGE_FAVORITES = 'utilityhub-favorites';
const STORAGE_VIEWED = 'utilityhub-viewed';
const STORAGE_USED = 'utilityhub-used'; // recently used (distinct from history)
const STORAGE_HISTORY = 'utilityhub-usage-history';

const EVENT_NAME = 'utilityhub-store-update';

// Dispatch a global event to notify all components using this store to update their local states
function notify() {
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
}

// Low-level helper getters/setters
export function getFavoritesFromStorage(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_FAVORITES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function isFavorite(toolId: string): boolean {
  return getFavoritesFromStorage().includes(toolId);
}

export function toggleFavorite(toolId: string): boolean {
  const current = getFavoritesFromStorage();
  let next: string[];
  let isFav = false;
  if (current.includes(toolId)) {
    next = current.filter(id => id !== toolId);
    isFav = false;
  } else {
    next = [...current, toolId];
    isFav = true;
  }
  localStorage.setItem(STORAGE_FAVORITES, JSON.stringify(next));
  notify();
  return isFav;
}

export function getRecentlyViewedFromStorage(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_VIEWED);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addRecentlyViewed(toolId: string) {
  const current = getRecentlyViewedFromStorage().filter(id => id !== toolId);
  current.unshift(toolId);
  const next = current.slice(0, 10); // Keep last 10 viewed
  localStorage.setItem(STORAGE_VIEWED, JSON.stringify(next));
  notify();
}

export function clearRecentlyViewed() {
  localStorage.removeItem(STORAGE_VIEWED);
  notify();
}

export function removeSingleRecentlyViewed(toolId: string) {
  const current = getRecentlyViewedFromStorage().filter(id => id !== toolId);
  localStorage.setItem(STORAGE_VIEWED, JSON.stringify(current));
  notify();
}

export function getRecentlyUsedFromStorage(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_USED);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addRecentlyUsed(toolId: string) {
  const current = getRecentlyUsedFromStorage().filter(id => id !== toolId);
  current.unshift(toolId);
  const next = current.slice(0, 10); // Keep last 10 used
  localStorage.setItem(STORAGE_USED, JSON.stringify(next));
  notify();
}

export function clearRecentlyUsed() {
  localStorage.removeItem(STORAGE_USED);
  notify();
}

export function removeSingleRecentlyUsed(toolId: string) {
  const current = getRecentlyUsedFromStorage().filter(id => id !== toolId);
  localStorage.setItem(STORAGE_USED, JSON.stringify(current));
  notify();
}

export function getUsageHistoryFromStorage(): UsageHistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addUsageHistory(toolId: string, detail: string) {
  const tool = tools.find(t => t.id === toolId);
  if (!tool) return;

  const entry: UsageHistoryEntry = {
    id: `hist-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    toolId,
    toolName: tool.name,
    toolPath: tool.path,
    toolIcon: tool.icon,
    detail,
    timestamp: new Date().toISOString()
  };

  const current = getUsageHistoryFromStorage();
  current.unshift(entry);
  const next = current.slice(0, 30); // Keep last 30 history logs
  localStorage.setItem(STORAGE_HISTORY, JSON.stringify(next));
  
  // Also add it to recently used list automatically!
  addRecentlyUsed(toolId);
}

export function clearUsageHistory() {
  localStorage.removeItem(STORAGE_HISTORY);
  notify();
}

export function removeSingleUsageHistory(id: string) {
  const current = getUsageHistoryFromStorage().filter(entry => entry.id !== id);
  localStorage.setItem(STORAGE_HISTORY, JSON.stringify(current));
  notify();
}

// --- React Hooks ---

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(getFavoritesFromStorage());

  useEffect(() => {
    const handleUpdate = () => {
      setFavorites(getFavoritesFromStorage());
    };
    window.addEventListener(EVENT_NAME, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener(EVENT_NAME, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return {
    favorites,
    favoriteTools: favorites.map(id => tools.find(t => t.id === id)).filter((t): t is Tool => !!t),
    toggleFavorite: (id: string) => toggleFavorite(id),
    isFavorite: (id: string) => favorites.includes(id)
  };
}

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(getRecentlyViewedFromStorage());

  useEffect(() => {
    const handleUpdate = () => {
      setRecentlyViewed(getRecentlyViewedFromStorage());
    };
    window.addEventListener(EVENT_NAME, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener(EVENT_NAME, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return {
    recentlyViewedIds: recentlyViewed,
    recentlyViewed: recentlyViewed.map(id => tools.find(t => t.id === id)).filter((t): t is Tool => !!t),
    addRecentlyViewed,
    clearRecentlyViewed,
    removeSingleRecentlyViewed
  };
}

export function useRecentlyUsed() {
  const [recentlyUsed, setRecentlyUsed] = useState<string[]>(getRecentlyUsedFromStorage());

  useEffect(() => {
    const handleUpdate = () => {
      setRecentlyUsed(getRecentlyUsedFromStorage());
    };
    window.addEventListener(EVENT_NAME, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener(EVENT_NAME, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return {
    recentlyUsedIds: recentlyUsed,
    recentlyUsed: recentlyUsed.map(id => tools.find(t => t.id === id)).filter((t): t is Tool => !!t),
    addRecentlyUsed,
    clearRecentlyUsed,
    removeSingleRecentlyUsed
  };
}

export function useUsageHistory() {
  const [history, setHistory] = useState<UsageHistoryEntry[]>(getUsageHistoryFromStorage());

  useEffect(() => {
    const handleUpdate = () => {
      setHistory(getUsageHistoryFromStorage());
    };
    window.addEventListener(EVENT_NAME, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener(EVENT_NAME, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return {
    history,
    addUsageHistory,
    clearUsageHistory,
    removeSingleUsageHistory
  };
}
