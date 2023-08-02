import { useEffect, useState } from "react";
import { UploadResult, uploadImage } from "../core/service";

export function ImageList(props: { files: FileList }) {
  return (
    <ul className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {Array.from(props.files)
        .filter((file) => file.type.indexOf("image") > -1)
        .map((file) => (
          <FileItem file={file} key={file.name}></FileItem>
        ))}
    </ul>
  );
}

export function FileItem(props: { file: File }) {
  const [result, setResult] = useState<UploadResult | null>(null);
  const { file } = props;

  useEffect(() => {
    console.log("update url");
    uploadImage(file)
      .then((result) => {
        setResult(result);
      })
      .catch(() => {
        setResult(null);
      });
  }, [file]);

  return (
    <li key={file.name}>
      <img
        className="aspect-[3/2] w-full rounded-2xl object-cover"
        src={URL.createObjectURL(file)}
        alt=""
      />
      {result === null ? <Loading /> : <UploadResultView result={result} />}
    </li>
  );
}

export function Loading() {
  return (
    <div className="animate-pulse flex space-x-4">
      <div className="flex-1 space-y-6 py-1">
        <div className="h-6 bg-slate-200 rounded"></div>
      </div>
    </div>
  );
}

function UploadResultView(props: { result: UploadResult }) {
  const { result } = props;
  if ("error" in result) {
    return <div className="text-red-600">{result.error}</div>;
  }
  const url = "images" in result ? result.images : result.data.url;
  return (
    <div className="mt-2 flex rounded-md shadow-sm">
      <div className="relative flex flex-grow items-stretch focus-within:z-10">
        <input
          disabled
          className="block w-full rounded-none rounded-l-md py-0 px-1 border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={url}
        />
      </div>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(url);
        }}
        className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
          />
        </svg>
      </button>
    </div>
  );
}
