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
    return respond.data;
  } catch (error) {
    throw error;
  }
};

export const getBookById = async (bookId) => {
  try {
    console.log("Requesting:", `http://localhost:8080/book/${bookId}`);
    const response = await http.get(`/book/${bookId}`, {
      responseType: "blob",
    });
    const bookMetadata = {
      _id: response.headers.get("X-Book-Id"),
      title: response.headers.get("X-Book-Title"),
      author: response.headers.get("X-Book-Author"),
      time_reading: response.headers.get("X-Book-Reading-Time"),
      last_read_page: response.headers["x-book-last_read_page"], // sửa ở đây
    };
    console.log("Book Metadata:", bookMetadata);
    const fileURL = URL.createObjectURL(
      new Blob([response.data], { type: "application/pdf" })
    );
    return {
      metadata: bookMetadata,
      fileUrl: fileURL,
    };
  } catch (error) {
    throw error;
  }
};

export const getImage = async (bookImg) => {
  try {
    const response = await http.get(`/public/img/${bookImg}`, {
      responseType: "blob",
    });

    const imageURL = URL.createObjectURL(
      new Blob([response.data], { type: "image/jpeg" })
    );

    return imageURL;
  } catch (error) {
    throw error;
  }
};

export const getAudio = async (text) => {
  try {
    const response = await http.post(
      "/book/tts",
      { text },
      { responseType: "blob" }
    );

    if (response.data.size === 0) {
      throw new Error("Received empty audio file.");
    }

    const url = URL.createObjectURL(
      new Blob([response.data], { type: "audio/mpeg" })
    );
    return url;
  } catch (err) {
    console.error("Error fetching audio:", err);
    throw err;
  }
};

export const summaryBook = async (text) => {
  try {
    const respond = await http.post("/book/summary", { content: text });
    return respond.data.summary;
  } catch (error) {
    throw error;
  }
};

export const explainBook = async (text) => {
  try {
    const respond = await http.post("/book/explain", { content: text });
    return respond.data.explain;
  } catch (error) {
    throw error;
  }
};

export const searchBook = async (data) => {
  try {
    const respond = await http.post("/book/search", { query: data });
    return respond;
  } catch (error) {
    throw error;
  }
};

export const updateProgress = async ({ bookID, readingTime, pageNumber }) => {
  const formData = new FormData();
  formData.append("book_id", bookID.current);
  formData.append("reading_time", readingTime);
  formData.append("last_read_page", pageNumber);
  try {
    const respond = await http.post("/book/update-progress", formData);
    return respond;
  } catch (err) {
    throw err;
  }
};
