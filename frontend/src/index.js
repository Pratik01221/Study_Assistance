// index.js — The Entry Point of React App
// This file mounts our entire React app into the <div id="root"> in index.html

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Create a React root and render the App component
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
