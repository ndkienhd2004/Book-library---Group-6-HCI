import { useNavigate } from "react-router-dom";
import ContactButtons from "./contactButton";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Left Section - Brand & Description */}
        <div style={styles.brand}>
          <h2 style={styles.logo}>BookLibrary</h2>
          <p style={styles.description}>
            A platform designed for readers to discover, organize, and enjoy
            books, while also enabling authors to publish, showcase, and track
            the performance of their works.
          </p>
        </div>

        {/* Links Section */}
        <div style={styles.linksContainer}>
          <div style={styles.linksColumn}>
            <h4 style={styles.linksTitle}>About & Information</h4>
            <ul style={styles.ul}>
              <li onClick={() => navigate("/about-us")}>About Us</li>
            </ul>
          </div>
          <div style={styles.linksColumn}>
            <h4 style={styles.linksTitle}>User Resources</h4>
            <ul style={styles.ul}>
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Community Guidelines</li>
              <li>Sitemap</li>
            </ul>
          </div>
          <div style={styles.linksColumn}>
            <h4 style={styles.linksTitle}>For Readers</h4>
            <ul style={styles.ul}>
              <li>Browse Books</li>
              <li onClick={() => navigate("/library")}>Library</li>
              <li onClick={() => navigate("/uploading")}>Upload Books</li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div style={styles.linksColumn}>
            <h4 style={styles.linksTitle}>Follow Us On</h4>
            <div style={styles.icons}>
              <ContactButtons />
            </div>
          </div>
        </div>
      </div>

      <div style={styles.copyright}>&copy; 2025 BookLibrary</div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#2d2520",
    color: "white",
    padding: "40px 20px",
    fontSize: "14px",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    maxWidth: "80vw",
    margin: "auto",
    alignItems: "flex-start",
  },
  brand: {
    display: "flex",
    flexDirection: "column",
    flex: "1",
    minWidth: "250px",
    alignItems: "flex-start",
  },
  logo: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  description: {
    maxWidth: "300px",
    marginLeft: "0px",
    textAlign: "left",
  },
  linksContainer: {
    display: "flex",
    flex: "2",
    minWidth: "500px",
    justifyContent: "space-between",
  },
  linksColumn: {
    display: "flex",
    flexDirection: "column",
    minWidth: "150px",
  },
  linksTitle: {
    marginBottom: "10px",
  },
  ul: {
    listStyleType: "disc",
    paddingLeft: "20px",
    margin: 0,
  },

  icons: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "10px",
  },
  copyright: {
    textAlign: "center",
    marginTop: "20px",
    borderTop: "1px solid rgba(255,255,255,0.2)",
    paddingTop: "10px",
  },
};

export default Footer;
