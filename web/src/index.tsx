import { createRoot } from "react-dom/client";
import { useState } from "react";
import { Upload } from "./components/Upload";
import { ImageList } from "./components/ImageList";
import "./index.css";

function App() {
  const [files, setFiles] = useState<FileList>();

  return (
    <div className="flex items-center justify-center flex-col h-full">
      <div className="mx-auto w-[90%] h-[90%] grid  gap-3 grid-rows-[20vh_10vh]">
        <Upload
          onUpload={(files) => {
            setFiles(files);
          }}
        />
        {files && <ImageList files={files} />}
      </div>
    </div>
  );
}

const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "/config.html";
} else {
  const root = createRoot(document.getElementById("app")!);
  root.render(<App />);
}
