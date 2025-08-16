import React, { useState } from "react";
import { useJournalStore } from "../store/journalStore";
import heroImage from "../assets/images/hero-image.jpeg"; // placeholder image for now

export default function Dashboard() {
  const addEntry = useJournalStore((s) => s.addEntry);

  const [selectedMood, setSelectedMood] = useState(null);
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Likert-style mood options
  const moods = [
    { key: "very-sad", emoji: "😢", label: "Very low" },
    { key: "sad", emoji: "🙁", label: "Low" },
    { key: "neutral", emoji: "😐", label: "Neutral" },
    { key: "happy", emoji: "🙂", label: "Good" },
    { key: "great", emoji: "😄", label: "Great" },
  ];

  const handleSave = async () => {
    if (!content.trim()) return;
    setSaving(true);

    const entry = {
      id: Date.now(),
      mood: selectedMood?.emoji || "😐",
      content: content.trim(),
      date: new Date().toISOString(),
    };

    addEntry(entry);

    setSaving(false);
    setSaved(true);
    setContent("");
    // setSelectedMood(null); // uncomment if you want to reset mood
    setTimeout(() => setSaved(false), 1600);
  };

  return (
    <main className="bg-[#1E3523] min-h-screen text-[#E4E8D5]">
      <div className="container mx-auto px-4 pt-16 pb-12 font-inter max-w-3xl">
        {/* HERO (Image + Quote overlay) */}
        <section className="relative w-full overflow-hidden rounded-2xl shadow-lg">
          <img
            src={heroImage}
            alt="Inspirational"
            className="w-full h-48 sm:h-56 md:h-64 object-cover align-middle"
          />
          <div className="absolute inset-0 bg-[#1E3523]/20" />
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <div>
              <p className="font-poppins text-lg sm:text-xl md:text-2xl font-semibold text-[#EAFE45] drop-shadow-md">
                “Wherever you go, go with all your heart.”
              </p>
              <p className="mt-1 text-sm text-[#E4E8D5]/90">— Confucius</p>
            </div>
          </div>
        </section>

        {/* MOOD SELECTOR */}
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

        {/* JOURNAL INPUT */}
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

          {/* SUCCESS TOAST (appears under Save button) */}
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
