// src/pages/Insights.jsx
import React, { useMemo } from "react";
import { useJournalStore } from "../store/journalStore"; // fixed: named import
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";
import { Card, CardContent } from "../components/Ui/card"; // relative path

const moodColors = {
  happy: "#FFD700",
  sad: "#4682B4",
  calm: "#98FB98",
  angry: "#FF4500",
  anxious: "#9370DB",
  neutral: "#A9A9A9",
};

export default function Insights() {
  const entries = useJournalStore((state) => state.entries);

  // Format data for line chart
  const moodTrend = useMemo(() => {
    return entries.map((entry) => ({
      date: entry.date,
      moodScore: moodToScore(entry.mood),
    }));
  }, [entries]);

  // Count moods for pie chart
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
    <div className="container mx-auto px-4 pt-24 pb-8 text-white">
      {/* Top: Mood Trend */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Mood Trend</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={moodTrend}>
            <XAxis dataKey="date" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Line type="monotone" dataKey="moodScore" stroke="#FFD700" />
          </LineChart>
        </ResponsiveContainer>
      </section>

      {/* Middle: Mood Breakdown */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Mood Breakdown</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={moodCounts}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {moodCounts.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={moodColors[entry.name] || "#ccc"}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </section>

      {/* Bottom: Reflections */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Your Reflections</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {entries.slice(-6).map((entry) => (
            <Card key={entry.id} className="bg-[#2A4C37] text-white">
              <CardContent className="p-4">
                <p className="text-sm text-gray-400">{entry.date}</p>
                <p className="font-medium capitalize">{entry.mood}</p>
                <p className="mt-2">{entry.reflection}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

// Utility: assign numeric score to moods for trend line
function moodToScore(mood) {
  const scores = {
    happy: 5,
    calm: 4,
    neutral: 3,
    anxious: 2,
    sad: 1,
    angry: 0,
  };
  return scores[mood] ?? 3;
}
