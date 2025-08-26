// src/store/journalStore.js
// This is a Zustand store for managing journal entries in the app.
// It handles CRUD operations (Create, Read, Update, Delete) and persists data to localStorage.

// Import Zustand's `create` function to make a global store
import { create } from "zustand";

// Key used to store/retrieve data in localStorage
const LOCAL_STORAGE_KEY = "reflectly-journal-entries";

// Load data from localStorage
  
const loadFromStorage = () => {
  try {
    // Try to get previously saved journal entries
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    // If data exists, parse JSON → array; otherwise return empty array
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    // Catch errors (e.g., corrupted JSON or storage issues)
    console.error("⚠️ Failed to parse localStorage", err);
    return [];
  }
};

// Save data to localStorage
  
const saveToStorage = (entries) => {
  try {
    // Convert array of entries → JSON string and save it
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries));
  } catch (err) {
    console.error("⚠️ Failed to save to localStorage", err);
  }
};

// Zustand Store Setup
   
export const useJournalStore = create((set, get) => ({
  // State: entries array, initialized from localStorage
  entries: loadFromStorage(),

  /* Add a new journal entry: Creates an object with id, date, mood, and content, Adds it to the array, saves to storage, updates state */
  addEntry: (entry) => {
    const newEntry = {
      id: Date.now(), // Unique ID based on timestamp
      date: new Date().toISOString(), // Auto-generate current date
      mood: entry.mood, // Mood passed from form
      content: entry.content, // User’s text content
    };

    // Add to existing entries
    const newEntries = [...get().entries, newEntry];

    // Save + update
    saveToStorage(newEntries);
    set({ entries: newEntries });
  },

  /* Delete an entry: Filters out the entry by id, Saves updated array + updates state */
  deleteEntry: (id) => {
    const newEntries = get().entries.filter((e) => e.id !== id);
    saveToStorage(newEntries);
    set({ entries: newEntries });
  },

  /* Update an entry:Finds the matching entry by id and replaces it, Saves updated array + updates state */
  updateEntry: (updated) => {
    const newEntries = get().entries.map((e) =>
      e.id === updated.id ? updated : e
    );
    saveToStorage(newEntries);
    set({ entries: newEntries });
  },
}));
