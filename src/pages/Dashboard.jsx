// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useJournalStore } from "../store/journalStore";

// Dashboard: main journaling page where users pick a mood, write, and save entries
export default function Dashboard() {
  // Grab the `addEntry` action from our global Zustand store
  const addEntry = useJournalStore((s) => s.addEntry);

  // Local state to track the mood, text input, and save status
  const [selectedMood, setSelectedMood] = useState(null);
  const [content, setContent] = useState(""); // journal entry text
  const [saving, setSaving] = useState(false); // whether save is in progress
  const [saved, setSaved] = useState(false); // whether a save was successful

  // State for the motivational extras (quote + background image)
  const [quote, setQuote] = useState({ text: "", author: "" });
  const [imageUrl, setImageUrl] = useState("");

  // Unsplash API key - stored in `.env`)
  const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  // Mood selector options (Likert scale style, from very sad → very happy)
  const moods = [
    { key: "very-sad", emoji: "😢", label: "Very low" },
    { key: "sad", emoji: "🙁", label: "Low" },
    { key: "neutral", emoji: "😐", label: "Neutral" },
    { key: "happy", emoji: "🙂", label: "Good" },
    { key: "great", emoji: "😄", label: "Great" },
  ];

  // QUOTE FETCHING LOGIC
  // We use ZenQuotes API, but since it doesn’t have CORS enabled,
  // we wrap the request in the `allorigins.win` proxy to bypass restrictions.
  const fetchQuote = async () => {
    try {
      const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
        `https://zenquotes.io/api/random?t=${Date.now()}`
      )}`;
      const res = await fetch(url);
      const data = await res.json();
      const parsed = JSON.parse(data.contents);
      setQuote({ text: parsed[0].q, author: parsed[0].a });
    } catch (err) {
      console.error("Error fetching quote:", err);
      // Fallback in case the API fails
      setQuote({ text: "Keep going, you're doing great!", author: "Reflectly" });
    }
  };

  // IMAGE FETCHING LOGIC
  // Pulls a random inspirational background from Unsplash API
  const fetchImage = async () => {
    if (!UNSPLASH_ACCESS_KEY) {
      console.warn("Unsplash Access Key is missing!");
      return;
    }
    try {
      const res = await fetch(
        `https://api.unsplash.com/photos/random?query=peace&client_id=${UNSPLASH_ACCESS_KEY}&t=${Date.now()}`
      );
      const data = await res.json();
      setImageUrl(data.urls?.regular || "");
    } catch (err) {
      console.error("Error fetching image:", err);
    }
  };

  // On mount, load a quote + image once
  useEffect(() => {
    fetchQuote();
    fetchImage();
  }, []);

  // SAVE ENTRY HANDLER
  // When the user hits "Save Entry":
  // 1. Validate there’s content
  // 2. Construct an entry object
  // 3. Save it into Zustand (and therefore localStorage)
  // 4. Reset states + show a success toast
  const handleSave = async () => {
    if (!content.trim()) return;
    setSaving(true);

    const entry = {
      id: Date.now(),
      mood: selectedMood?.emoji || "😐", // fallback mood = neutral
      content: content.trim(),
      date: new Date().toISOString(),
    };

    addEntry(entry); // global store handles persistence

    setSaving(false);
    setSaved(true);
    setContent(""); // clear textarea
    // Hide success toast after 1.6s
    setTimeout(() => setSaved(false), 1600);
  };

  return (
    <main className="bg-[#1E3523] min-h-screen text-[#E4E8D5]">
      <div className="container mx-auto px-4 pt-16 pb-12 font-inter max-w-3xl">
        
        {/* HERO SECTION 
            Displays a background image (Unsplash) with a motivational quote overlay */}
        <section className="relative w-full overflow-hidden rounded-2xl shadow-lg">
          {/* Background image (or fallback loader) */}
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Inspirational"
              className="w-full h-48 sm:h-56 md:h-64 object-cover align-middle"
            />
          ) : (
            <div className="w-full h-48 sm:h-56 md:h-64 bg-gray-700 flex items-center justify-center text-white">
              Loading image...
            </div>
          )}

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-[#1E3523]/20" />

          {/* Quote (centered overlay) */}
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <div>
              <p className="font-poppins text-lg sm:text-xl md:text-2xl font-semibold text-[#EAFE45] drop-shadow-md">
                {quote.text || "Loading quote..."}
              </p>
              <p className="mt-1 text-sm text-[#E4E8D5]/90">
                — {quote.author || "Unknown"}
              </p>
            </div>
          </div>
        </section>

        {/*MOOD SELECTOR 
            Lets the user pick an emoji to log their current feeling */}
        <section className="mt-8 text-center">
          <h3 className="font-poppins text-lg font-semibold mb-4">
            How are you feeling right now?
          </h3>
          <div className="flex justify-center gap-4 flex-wrap">
            {moods.map((m) => {
              const active = selectedMood?.key === m.key;
              return (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => setSelectedMood(m)}
                  aria-label={m.label}
                  className={[
                    "h-12 w-12 rounded-full border flex items-center justify-center text-2xl transition",
                    active
                      ? "bg-[#EAFE45] text-[#1E3523] border-[#EAFE45]"
                      : "bg-[#2B4731] text-[#E4E8D5] border-[#3A5B41] hover:bg-[#3A5B41]",
                  ].join(" ")}
                >
                  {m.emoji}
                </button>
              );
            })}
          </div>
        </section>

        {/*JOURNAL INPUT
            Main text area where users write their thoughts */}
        <section className="mt-8 text-center">
          <h3 className="font-poppins text-xl font-semibold mb-3">
            Your Thoughts, Your Space
          </h3>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write freely here..."
            className="
              w-full min-h-[180px] md:min-h-[220px] rounded-xl
              bg-[#0F1F14] text-[#E4E8D5] placeholder:text-[#E4E8D5]/60
              border border-[#2B4731] focus:outline-none focus:ring-2 focus:ring-[#EAFE45]
              p-4 leading-relaxed
            "
          />

          {/* Save button */}
          <div className="mt-5 flex justify-center">
            <button
              onClick={handleSave}
              disabled={saving || !content.trim()}
              className={[
                "px-6 py-3 rounded-lg font-poppins font-semibold transition-all",
                "bg-[#EAFE45] text-[#1E3523] shadow",
                "hover:bg-transparent hover:text-[#EAFE45] hover:border-2 hover:border-[#EAFE45]",
                (saving || !content.trim()) && "opacity-60 cursor-not-allowed",
              ].join(" ")}
            >
              {saving ? "Saving..." : "Save Entry"}
            </button>
          </div>

          {/* Success Toast (appears briefly after saving) */}
          {saved && (
            <div className="mt-4 inline-block bg-[#2B4731] border border-[#EAFE45] text-[#E4E8D5] px-4 py-2 rounded-lg shadow">
              <span role="img" aria-label="success" className="mr-1">
                ✅
              </span>
              Entry saved successfully
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
