import { useEffect, useState } from "react";
import HomePageHeaderBackground from "../../assets/images/HomePageHeaderBackground.png";
import BookList from "../../components/BookCard/BookList";
import Footer from "../../components/Footer/Footer";
import { getLibrary } from "../../apis/book";
const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const book = await getLibrary("");
        setBooks(book);
        console.log(book);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.leftHeader}>
          <h1 style={styles.headerText}>
            Read, Share, and Discover – Your Gateway to Endless Stories!
          </h1>
          <p style={styles.quote}>
            "A reader lives a thousand lives before he dies." <br />— George
            R.R. Martin
          </p>
        </div>
        <div style={styles.rightHeader}>
          <img
            src={HomePageHeaderBackground}
            style={styles.image}
            alt="Book Illustration"
          />
        </div>
      </div>
      {/* Body */}
      <div style={styles.bodyContainer}>
        <div style={styles.bodyTitle}>
          <h1 style={{ color: "black", marginBottom: "5px" }}>
            Discover our book
          </h1>
          <p style={{ color: "black", marginTop: "0px" }}>
            Explore a carefully curated selection of bestselling books across
            diverse genres. Whether you're drawn to heart-racing thrillers,
            enchanting fantasies, timeless romances, or thought-provoking
            nonfiction, these beloved titles are sure to captivate and inspire
            readers of all tastes
          </p>
        </div>
        <BookList books={books} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;

const styles = {
  header: {
    backgroundColor: "#f6f6f6",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90vw",
    height: "60vh",
    borderRadius: 10,
    padding: "0 5vw",
    marginTop: "5vh",
  },
  leftHeader: {
    flex: 1,
    textAlign: "left",
    marginLeft: "5vw",
  },
  headerText: {
    color: "#34312D",
    fontSize: "48px",
    fontWeight: "semibold",
    marginBottom: "10px",
    fontStyle: "Garamond",
  },
  quote: {
    color: "#555",
    fontSize: "16px",
    fontStyle: "italic",
  },
  rightHeader: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  image: {
    width: "90%",
    maxWidth: "400px",
  },
  bodyContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  bodyTitle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    width: "70vw",
    marginTop: "5vh",
    marginBottom: "5vh",
    justifyContent: "center",
  },
};
