import React, { useState } from "react";
import { useJournalStore } from "../store/journalStore";

// History Page: lets users browse, view, edit, and delete past journal entries
export default function History() {
  // Pull journal data + store methods from Zustand global store
  const { entries, deleteEntry, updateEntry } = useJournalStore();

  // Local state to manage the currently opened journal entry
  const [selectedEntry, setSelectedEntry] = useState(null);

  // Whether the opened entry is in "edit mode" or "view mode"
  const [isEditing, setIsEditing] = useState(false);

  // Holds the text content while editing an entry
  const [editedContent, setEditedContent] = useState("");

  // When a user clicks on an entry in the list:
  // - Store it in `selectedEntry`
  // - Pre-fill the edit state with its content
  // - Reset `isEditing` back to false (so it shows in read-only mode first)
  const handleOpen = (entry) => {
    setSelectedEntry(entry);
    setEditedContent(entry.content);
    setIsEditing(false);
  };

  // Save changes made to the selected entry
  const handleSave = () => {
    if (!editedContent.trim()) return; // prevent empty saves
    // Update entry inside the global store
    updateEntry({ ...selectedEntry, content: editedContent });
    // Also update the local selectedEntry so UI reflects changes immediately
    setSelectedEntry({ ...selectedEntry, content: editedContent });
    setIsEditing(false); // exit edit mode
  };

  // Close the right-hand panel (clear selection + exit edit mode)
  const handleClose = () => {
    setSelectedEntry(null);
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full p-6 font-sans">
      {/* Page Title */}
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Your Journal History</h2>

      {/* Case 1: No journal entries yet */}
      {entries.length === 0 ? (
        <p className="text-gray-600 text-lg">No entries yet. Start journaling today!</p>
      ) : (
        // Case 2: There are journal entries to display
        // Layout changes depending on whether an entry is opened:
        // - Flex column (stacked) if none is selected
        // - Flex row (side-by-side list + details) if one is selected
        <div className={`flex gap-6 ${selectedEntry ? "flex-row" : "flex-col"}`}>
          
          {/*Left Column - List of entries */}
          <div className={`flex-1 ${selectedEntry ? "max-w-xs" : ""} space-y-4`}>
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-[#D6E8D4] border rounded-xl p-5 shadow hover:shadow-lg transition cursor-pointer"
                onClick={() => handleOpen(entry)} // clicking opens entry in right panel
              >
                {/* Entry metadata (date + mood) */}
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>{entry.date}</span>
                  <span>{entry.mood}</span>
                </div>
                {/* Entry preview (truncate long content) */}
                <p className="text-gray-800 truncate font-medium">{entry.content}</p>
              </div>
            ))}
          </div>

          {/* Right Column - Selected Entry Details */}
          {selectedEntry && (
            <div className="flex-1 border border-[#C7D9C4] rounded-xl p-6 shadow-lg bg-[#EAF3EA] overflow-auto">
              
              {/* If editing, show a textarea + Save/Cancel buttons */}
              {isEditing ? (
                <div className="flex flex-col">
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full p-3 border rounded-lg mb-4 font-sans text-gray-900 resize-none"
                    // Auto-size textarea rows between 5 and 20 based on text length
                    rows={Math.min(Math.max(editedContent.split("\n").length, 5), 20)}
                  />
                  <div className="flex justify-between mt-2">
                    {/* Save changes */}
                    <button
                      onClick={handleSave}
                      className="px-5 py-2 bg-[#1E3523] text-white font-semibold rounded-lg hover:bg-[#28472F] transition"
                    >
                      Save
                    </button>
                    {/* Cancel editing (return to view mode) */}
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-5 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // Otherwise, show entry in read-only mode
                <>
                  {/* Entry metadata */}
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{selectedEntry.date}</span>
                    <span>{selectedEntry.mood}</span>
                  </div>

                  {/* Entry content */}
                  <p className="text-gray-800 mb-4 font-medium">{selectedEntry.content}</p>

                  {/* Action buttons for this entry */}
                  <div className="flex justify-center space-x-4">
                    {/* Switch to edit mode */}
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-5 py-2 bg-[#1E3523] text-white font-semibold rounded-lg hover:bg-[#28472F] transition"
                    >
                      Edit
                    </button>

                    {/* Delete entry from store + close panel */}
                    <button
                      onClick={() => {
                        deleteEntry(selectedEntry.id);
                        handleClose();
                      }}
                      className="px-5 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
                    >
                      Delete
                    </button>

                    {/* Close panel without deleting */}
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
