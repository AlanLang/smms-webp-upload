import { useEffect } from "react";

export const Upload = (props: { onUpload: (files: FileList) => void }) => {
  const { onUpload } = props;
  useEffect(() => {
    const oDragWrap = document.body;
    //拖进
    oDragWrap.addEventListener(
      "dragenter",
      (e) => {
        e.preventDefault();
      },
      false
    );

    oDragWrap.addEventListener(
      "dragover",
      (e) => {
        e.preventDefault();
      },
      false
    );

    //扔
    oDragWrap.addEventListener(
      "drop",
      (e) => {
        dropHandler(e);
      },
      false
    );

    document.addEventListener(
      "paste",
      (event: any) => {
        const { items } =
          event.clipboardData || event.originalEvent.clipboardData;
        for (const item of items) {
          if (item.kind === "file") {
            const blob = item.getAsFile();
            onUpload(blob);
          }
        }
      },
      false
    );

    const dropHandler = function (e: any) {
      e.preventDefault(); //获取文件列表
      const fileList = e.dataTransfer.files as FileList;
      //检测是否是拖拽文件到页面的操作
      if (fileList.length === 0) {
        return;
      }
      onUpload(fileList);
    };
  }, [onUpload]);

  return (
    <label
      id="upload-container"
      className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300 h-full"
    >
      <div className="space-y-1 text-center">
        <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
        </div>
        <div className="text-gray-600">
          <span className="font-medium text-primary-500 hover:text-primary-700 pr-1">
            Click to upload
          </span>
          or drag and drop
        </div>
      </div>
      <input
        id="file-uploader"
        type="file"
        multiple
        className="sr-only"
        accept="image/*"
        onChange={(e) => {
          props.onUpload(e.target.files!);
        }}
      />
    </label>
  );
};
