import { useNavigate } from "react-router-dom";
import "./SearchResult.css";

export const SearchResult = ({ result }) => {
  const navigate = useNavigate();
  return (
    <div
      className="search-result"
      onClick={() => navigate(`/books/${result.filename}`)}
    >
      {result.name}
    </div>
  );
};
