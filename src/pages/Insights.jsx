// src/pages/Insights.jsx
import React, { useMemo } from "react";
import { useJournalStore } from "../store/journalStore"; // Zustand store: holds all journal entries

// Import Recharts components to build interactive data visualizations
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";

// Import UI building blocks for consistent card layouts
import { Card, CardContent } from "../components/Ui/card"; 

// Define custom colors for each mood (used in pie chart slices)
const moodColors = {
  happy: "#FFD700",
  sad: "#4682B4",
  calm: "#98FB98",
  angry: "#FF4500",
  anxious: "#9370DB",
  neutral: "#A9A9A9",
};

// Insights page: gives users a visual breakdown of their journaling data
export default function Insights() {
  // Pull entries (list of all journal logs) from global state
  const entries = useJournalStore((state) => state.entries);

  // Prepare mood trend data (line chart)
  // useMemo ensures this only recalculates when `entries` changes
  // Each entry is mapped to { date, moodScore }
  const moodTrend = useMemo(() => {
    return entries.map((entry) => ({
      date: entry.date,
      moodScore: moodToScore(entry.mood), // convert mood label → numeric score
    }));
  }, [entries]);

  // pie chart shows mood breakdown and results are converted into an array format for Recharts

  const moodCounts = useMemo(() => {
    const counts = {};
    entries.forEach((entry) => {
      counts[entry.mood] = (counts[entry.mood] || 0) + 1;
    });
    return Object.entries(counts).map(([mood, value]) => ({
      name: mood,
      value,
    }));
  }, [entries]);

  return (
    // Outer container: centers content with padding and white text
    <div className="container mx-auto px-4 pt-24 pb-8 text-white">
      
      {/* Mood Trend (Line Chart) */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Mood Trend</h2>
        {/* ResponsiveContainer makes the chart scale to screen size */}
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={moodTrend}>
            {/* X-axis: dates from journal entries */}
            <XAxis dataKey="date" stroke="#fff" />
            {/* Y-axis: numeric mood scores */}
            <YAxis stroke="#fff" />
            {/* Tooltip shows details on hover */}
            <Tooltip />
            {/* Line graph connecting mood scores over time */}
            <Line type="monotone" dataKey="moodScore" stroke="#FFD700" />
          </LineChart>
        </ResponsiveContainer>
      </section>

      {/* Mood Breakdown (Pie Chart) */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Mood Breakdown</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={moodCounts}
              cx="50%" cy="50%"            // center the pie
              labelLine={false}           // remove outer lines for cleaner look
              outerRadius={100}           // size of pie chart
              fill="#8884d8"              // default slice color
              dataKey="value"             // determines slice size
            >
              {/* Each slice gets its custom mood color */}
              {moodCounts.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={moodColors[entry.name] || "#ccc"} 
                />
              ))}
            </Pie>
            <Tooltip /> {/* Show mood + count on hover */}
          </PieChart>
        </ResponsiveContainer>
      </section>

      {/* Reflections (Recent Journal Entries) */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Your Reflections</h2>
        {/* Grid layout: responsive (2 columns on small screens, 3 on large) */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Only show the latest 6 entries */}
          {entries.slice(-6).map((entry) => (
            <Card key={entry.id} className="bg-[#2A4C37] text-white">
              <CardContent className="p-4">
                {/* Entry metadata */}
                <p className="text-sm text-gray-400">{entry.date}</p>
                <p className="font-medium capitalize">{entry.mood}</p>
                {/* The user’s reflection text */}
                <p className="mt-2">{entry.reflection}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

// Convert a mood string into a numeric score to plot moods (0-5) for the line chart
function moodToScore(mood) {
  const scores = {
    happy: 5,
    calm: 4,
    neutral: 3,
    anxious: 2,
    sad: 1,
    angry: 0,
  };
  return scores[mood] ?? 3; // default to neutral if unknown mood
}
