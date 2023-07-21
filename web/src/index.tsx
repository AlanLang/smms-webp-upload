import { createRoot } from "react-dom/client";
import React from "react";
import { Upload } from "./components/Upload";
import "./index.css";

function App() {
  return (
    <div className="flex items-center justify-center flex-col h-full">
      <div className="mx-auto w-1/2 h-80 flex items-center justify-center">
        <Upload />
      </div>
    </div>
  );
}

const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "/config.html";
} else {
  const root = createRoot(document.getElementById("app")!);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
