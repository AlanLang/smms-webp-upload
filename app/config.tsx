import { createRoot } from "react-dom/client";
import React, { useState } from "react";
import { saveToken } from "./core/service";
import "./index.css";

function App() {
  const [tokenText, setToken] = useState("");

  const handleSave = () => {
    saveToken(tokenText).then((success) => {
      if (success) {
        window.location.href = "/";
      }
    });
  };

  return (
    <div className="flex items-center justify-center flex-col h-full">
      <div className="mx-auto w-1/2 h-80 flex items-center justify-center">
        <div className="mx-auto w-1/2">
          <div className="relative overflow-hidden rounded-md border border-gray-300 shadow-sm focus-within:border-primary-300 focus-within:ring focus-within:ring-primary-200 focus-within:ring-opacity-50">
            <textarea
              id="token-input"
              className="block w-full p-1 border-0 focus:border-0 focus:ring-0 resize-none"
              rows={5}
              placeholder="请输入 sm.ms 的 API Token"
              onChange={(e) => setToken(e.target.value)}
            ></textarea>
            <div className="flex w-full items-center justify-between bg-white p-2">
              <div className="flex space-x-1">
                <a
                  className="rounded p-1.5 text-secondary-400 hover:bg-primary-50 hover:text-primary-400 cursor-pointer"
                  href="https://sm.ms/home/apitoken"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 18"
                  >
                    <path d="M17 0h-5.768a1 1 0 1 0 0 2h3.354L8.4 8.182A1.003 1.003 0 1 0 9.818 9.6L16 3.414v3.354a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1Z"></path>
                    <path d="m14.258 7.985-3.025 3.025A3 3 0 1 1 6.99 6.768l3.026-3.026A3.01 3.01 0 0 1 8.411 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V9.589a3.011 3.011 0 0 1-1.742-1.604Z"></path>
                  </svg>
                </a>
              </div>
              <button
                id="save-btn"
                type="button"
                className="rounded border border-primary-500 bg-primary-500 px-2 py-1.5 text-center text-xs font-medium text-white shadow-sm transition-all hover:bg-primary-700 focus:ring focus:ring-primary-100"
                onClick={handleSave}
              >
                保存
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById("app")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
