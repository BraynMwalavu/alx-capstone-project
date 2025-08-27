// Importing React to enable JSX syntax and component definitions
import React from "react";

// Importing React Router tools for client-side routing
// - BrowserRouter (aliased as Router) sets up the routing context for the whole app
// - Routes groups together all our route definitions
// - Route maps a URL path to a specific component/page
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing custom components/pages used in the app
import Navbar from "./components/Navbar.jsx";       // Navigation bar (always visible at the top)
import Landing from "./pages/Landing.jsx";          // Landing (home) page
import Dashboard from "./pages/Dashboard.jsx";      // Dashboard page
import History from "./pages/History.jsx";          // History page
import Insights from "./pages/Insights.jsx";        // Insights page

// The App component is the "root" of our React app
function App() {
  return (
    // Router wraps our whole app, enabling navigation without full page reloads
    <Router>
      {/* Using Inter font (applied globally here for consistency across all pages) */}
      <div className="font-inter">

        {/* Navbar is always displayed, no matter which route is active */}
        <Navbar />

        {/* Routes block defines all the possible pages in our app */}
        <Routes>
          {/* Landing page: when user visits "/" (root), show Landing component */}
          <Route path="/" element={<Landing />} />

          {/* Dashboard route:
              - path "/dashboard" means this page is accessible via that URL
              - We wrap the <Dashboard /> component inside a <main> tag
                so we can apply shared layout styling (background, spacing.)
              - Tailwind classes here:
                  bg-[#1E3523]   = brand green background
                  min-h-screen  = make sure it always fills the screen height
                  px-4          = horizontal padding
                  pt-24 pb-8    = space for fixed navbar + bottom padding
          */}
          <Route
            path="/dashboard"
            element={
              <main className="bg-[#1E3523] min-h-screen px-4 pt-24 pb-8">
                <Dashboard />
              </main>
            }
          />

          {/* History route: exact same layout approach as Dashboard,
              just swapping in the History component
          */}
          <Route
            path="/history"
            element={
              <main className="bg-[#1E3523] min-h-screen px-4 pt-24 pb-8">
                <History />
              </main>
            }
          />

          {/* Insights route: again same consistent layout wrapper,
              but rendering the Insights page inside it
          */}
          <Route
            path="/insights"
            element={
              <main className="bg-[#1E3523] min-h-screen px-4 pt-24 pb-8">
                <Insights />
              </main>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

// Export App so it can be rendered by ReactDOM in main.jsx 
export default App;
