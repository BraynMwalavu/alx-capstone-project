Reflectly Journal
Tagline: "Write. Reflect. Grow."

Project Description
Reflectly Journal is a modern, minimalist web application designed to help users practice daily mindfulness and personal growth through journaling. Inspired by a calm and grounded brand identity, the app provides a clean and focused space for users to capture their thoughts, track their moods, and review their journey over time. The project emphasizes simplicity and a distraction-free user experience.

Features
Dashboard: A clean and inviting starting point with an inspirational quote to encourage journaling.

Journal Entry: A simple and intuitive interface to write new entries, tag them with a mood, and save them.

History View: A two-column layout for browsing and reviewing past journal entries.

Edit & Delete Entries: Functionality to modify or remove existing entries with a confirmation prompt.

Responsive Design: A fully adaptive layout that provides an optimal experience on both desktop and mobile devices.

Technology Stack
React: Used as the core JavaScript library for building a dynamic and component-based user interface.

Vite: Provides a fast and efficient development environment with a lightning-fast hot module replacement (HMR) for a smooth developer experience.

Tailwind CSS: A utility-first CSS framework for rapidly building custom designs directly in the markup, ensuring the app is highly-customizable and adheres to the brand guide.

Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
You need to have Node.js and npm installed on your system.

Installation
Clone the repository to your local machine:

git clone [repository-url]

Navigate to the project directory:

cd reflectly-app

Install the project dependencies:

npm install

Start the development server:

npm run dev

The application will be available at http://localhost:5173.

Design & Brand Guide
This project is built following a specific brand guide to maintain a cohesive and professional look. Key design principles include:

Color Palette: A calming palette of Lemon Lime, Deep Green Matte, and Beige.

Typography: A combination of Poppins for headings and Inter for body text.

UI Elements: Custom-styled buttons, hover effects, and responsive layouts.

Folder Structure
/reflectly-app
├── node_modules/
├── public/
├── src/
│ ├── assets/
│ ├── components/
│ │ ├── Button.jsx
│ │ ├── Navbar.jsx
│ │ └── ...
│ ├── pages/
│ │ ├── Dashboard.jsx
│ │ ├── History.jsx
│ │ └── ...
│ ├── utils/
│ │ └── api.js
│ ├── App.jsx
│ ├── index.css
│ └── main.jsx
├── .gitignore
├── package.json
└── tailwind.config.js

Roadmap
Future enhancements for this project may include:

User Authentication: Allow users to create accounts and securely store their journals.

Insights Page: A dedicated view to visualize mood trends and journaling habits over time.

Export Functionality: The ability to export journal entries in various formats (e.g., PDF, TXT).

Acknowledgements
A special thanks to the Mentara team for the inspiration behind the brand guide.
