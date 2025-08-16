import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Landing from "./pages/Landing.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import History from "./pages/History.jsx"; // ✅ Import History page

function App() {
  return (
    <Router>
      <div className="font-inter">
        {/* Navbar fixed at top */}
        <Navbar />

        <Routes>
          {/* Landing */}
          <Route path="/" element={<Landing />} />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              <main className="bg-[#1E3523] min-h-screen container mx-auto px-4 pt-24 pb-8">
                <Dashboard />
              </main>
            }
          />

          {/* History */}
          <Route
            path="/history"
            element={
              <main className="bg-[#1E3523] min-h-screen container mx-auto px-4 pt-24 pb-8">
                <History />
              </main>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
