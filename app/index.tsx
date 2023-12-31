import { createRoot } from "react-dom/client";
import { useState } from "react";
import { Upload } from "./components/Upload";
import { ImageList } from "./components/ImageList";
import "./index.css";

function App() {
  const [files, setFiles] = useState<File[]>();

  return (
    <div className="flex items-center justify-center flex-col h-full">
      <div className="mx-auto w-[90%] h-[90%] grid  gap-4 grid-rows-[20vh_10vh]">
        <Upload
          onUpload={(fs) => {
            const allFiles = files
              ? [
                  ...fs.filter(
                    (f) => !files.some((item) => item.name === f.name)
                  ),
                  ...files,
                ]
              : fs;
            setFiles(allFiles);
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
