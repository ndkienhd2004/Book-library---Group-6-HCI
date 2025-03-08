import { data } from "react-router-dom";
import http from "../utils/http";

export const getLibrary = async () => {
  try {
    const respond = await http.post("/list-book");
    return respond.data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    return [];
  }
};

export const getExplain = async (data) => {
  return http.post("/book/explain", { content: data });
};

export const getSummary = async (data) => {
  return http.post("/book/summary", { content: data });
};

export const updateProgress = async (data) => {
  return http.post("/book/update-progress", data);
};

export const uploadBook = async ({ file, title, author, numPages }) => {
  const formData = new FormData();
  formData.append("book", file);
  formData.append("title", title);
  formData.append("author", author);
  formData.append("numPages", numPages);

  try {
    const respond = await http.post("/book/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(formData.headers);
    return respond.data;
  } catch (error) {
    console.error("Lỗi khi tải sách:", error);
    throw error;
  }
};
