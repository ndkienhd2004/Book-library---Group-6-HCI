export const getLibrary = async (data) => {
  return http.post < Books > ("/me/library", data);
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
