import React, { useState } from "react";
import { useJournalStore } from "../store/journalStore";

export default function History() {
  const { entries, deleteEntry, updateEntry } = useJournalStore();
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");

  const handleOpen = (entry) => {
    setSelectedEntry(entry);
    setEditedContent(entry.content);
    setIsEditing(false);
  };

  const handleSave = () => {
    if (!editedContent.trim()) return;
    updateEntry({ ...selectedEntry, content: editedContent });
    setSelectedEntry({ ...selectedEntry, content: editedContent });
    setIsEditing(false);
  };

  const handleClose = () => {
    setSelectedEntry(null);
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 font-sans">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Your Journal History</h2>

      {entries.length === 0 ? (
        <p className="text-gray-600 text-lg">No entries yet. Start journaling today!</p>
      ) : (
        <div className={`flex gap-6 ${selectedEntry ? "flex-row" : "flex-col"}`}>
          
          {/* Left Column - Entries List */}
          <div className={`flex-1 ${selectedEntry ? "max-w-xs" : ""} space-y-4`}>
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-[#D6E8D4] border rounded-xl p-5 shadow hover:shadow-lg transition cursor-pointer"
                onClick={() => handleOpen(entry)}
              >
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>{entry.date}</span>
                  <span>{entry.mood}</span>
                </div>
                <p className="text-gray-800 truncate font-medium">{entry.content}</p>
              </div>
            ))}
          </div>

          {/* Right Column - Selected Entry */}
          {selectedEntry && (
            <div className="flex-1 border border-[#C7D9C4] rounded-xl p-6 shadow-lg bg-[#EAF3EA] overflow-auto">
              {isEditing ? (
                <div className="flex flex-col">
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full p-3 border rounded-lg mb-4 font-sans text-gray-900 resize-none"
                    rows={Math.min(Math.max(editedContent.split("\n").length, 5), 20)}
                  />
                  <div className="flex justify-between mt-2">
                    <button
                      onClick={handleSave}
                      className="px-5 py-2 bg-[#1E3523] text-white font-semibold rounded-lg hover:bg-[#28472F] transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-5 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{selectedEntry.date}</span>
                    <span>{selectedEntry.mood}</span>
                  </div>
                  <p className="text-gray-800 mb-4 font-medium">{selectedEntry.content}</p>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-5 py-2 bg-[#1E3523] text-white font-semibold rounded-lg hover:bg-[#28472F] transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        deleteEntry(selectedEntry.id);
                        handleClose();
                      }}
                      className="px-5 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                    <button
                      onClick={handleClose}
                      className="px-5 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition"
                    >
                      Close
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
