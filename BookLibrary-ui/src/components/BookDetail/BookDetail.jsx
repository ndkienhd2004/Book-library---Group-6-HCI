import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const BookDetails = () => {
  const { bookid } = useParams();
  const navigate = useNavigate();
  console.log(bookid);
  return (
    <section className="book-details">
      <div className="container">
        <button
          type="button"
          className="flex flex-c back-btn"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft size={22} />
          <span className="fs-18 fw-6">Go Back</span>
        </button>
        <h1>Book Detail</h1>
        <p style={{ color: "black" }}>Book ID: {bookid}</p>
      </div>
    </section>
  );
};
export default BookDetails;

const styles = {};
