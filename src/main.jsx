// Importing StrictMode from React. 
// Using strictmode to catch potential problems early. 
import { StrictMode } from 'react'

// Importing createRoot for app initialization. 
import { createRoot } from 'react-dom/client'

// Importing the global stylesheet(Tailwind and custom css) for our app. 
import './index.css'

// Importing the main App component(houses all components), which contains our app's structure and routes. 
import App from './App.jsx'

// Accessing the root element in the HTML (<div id="root"></div> in index.html) to enable React to render the app. 
const rootElement = document.getElementById('root')

// Create a React root (new API). 
const root = createRoot(rootElement)

// Render the application inside the root. 
// We wrap <App /> inside <StrictMode> for development checks. 

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
