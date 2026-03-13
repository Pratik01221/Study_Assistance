// ============================================================
// App.js — Root Component
// ============================================================
// This is the top-level component that renders everything.
// In React, components are like LEGO bricks — we assemble
// smaller pieces to build the full UI.
// ============================================================

import React from "react";
import StudyAssistant from "./components/StudyAssistant";

// App just renders our main StudyAssistant component
function App() {
  return <StudyAssistant />;
}

export default App;
