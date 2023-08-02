export function saveToken(tokenText: string) {
  const token = `Bearer ${tokenText}`;
  return fetch("/api/profile", {
    headers: {
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.code === "success") {
        localStorage.setItem("token", token);
        return true;
      }
      alert("保存失败,请检查 token 的有效性");
      return false;
    })
    .catch(() => {
      alert("网络请求错误");
    });
}

export type UploadResult =
  | {
      data: {
        url: string;
      };
    }
  | {
      images: string;
    }
  | {
      error: string;
    };

export function uploadImage(file: File): Promise<UploadResult> {
  const data = new FormData();
  const token = localStorage.getItem("token");
  data.append("smfile", file);
  return fetch("/api/upload", {
    headers: {
      Authorization: token,
    } as any,
    method: "POST",
    body: data,
  }).then((res) => res.json());
}
