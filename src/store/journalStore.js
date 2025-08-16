// src/store/journalStore.js
import { create } from "zustand";

const LOCAL_STORAGE_KEY = "reflectly-journal-entries";

// Load from localStorage safely
const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    console.error("Failed to parse localStorage", err);
    return [];
  }
};

// Save to localStorage safely
const saveToStorage = (entries) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries));
  } catch (err) {
    console.error("Failed to save to localStorage", err);
  }
};

export const useJournalStore = create((set, get) => ({
  entries: loadFromStorage(),

  addEntry: (entry) => {
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      mood: entry.mood,
      content: entry.content,
    };
    const newEntries = [...get().entries, newEntry];
    saveToStorage(newEntries);
    set({ entries: newEntries });
  },

  deleteEntry: (id) => {
    const newEntries = get().entries.filter((e) => e.id !== id);
    saveToStorage(newEntries);
    set({ entries: newEntries });
  },

  updateEntry: (updated) => {
    const newEntries = get().entries.map((e) =>
      e.id === updated.id ? updated : e
    );
    saveToStorage(newEntries);
    set({ entries: newEntries });
  },
}));
