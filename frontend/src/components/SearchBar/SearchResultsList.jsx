import "./SearchResultsList.css";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results }) => {
  if (!Array.isArray(results)) {
    console.error("Expected results to be an array but got:", results);
    return null; // hoặc hiển thị thông báo lỗi
  }

  return (
    <div className="results-list">
      {results.map((result, id) => (
        <SearchResult result={result} key={id} />
      ))}
    </div>
  );
};
