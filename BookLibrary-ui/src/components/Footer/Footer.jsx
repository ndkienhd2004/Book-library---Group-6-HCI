const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Left Section - Brand & Description */}
        <div style={styles.brand}>
          <h2 style={styles.logo}>BookWormHub</h2>
          <p style={styles.description}>
            A platform designed for readers to discover, organize, and enjoy
            books, while also enabling authors to publish, showcase, and track
            the performance of their works.
          </p>
        </div>

        {/* Links Section */}
        <div style={styles.linksContainer}>
          <div style={styles.linksColumn}>
            <h4>About & Information</h4>
            <ul>
              <li>About Us</li>
              <li>How It Works</li>
              <li>Blog</li>
              <li>Careers</li>
            </ul>
          </div>
          <div style={styles.linksColumn}>
            <h4>User Resources</h4>
            <ul>
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Community Guidelines</li>
              <li>Sitemap</li>
            </ul>
          </div>
          <div style={styles.linksColumn}>
            <h4>For Readers</h4>
            <ul>
              <li>Browse Books</li>
              <li>Library</li>
              <li>Recommendations</li>
            </ul>
          </div>
          <div style={styles.linksColumn}>
            <h4>For Authors</h4>
            <ul>
              <li>Publish Your Work</li>
              <li>Author Dashboard</li>
              <li>Pricing & Plans</li>
            </ul>
          </div>
        </div>

        {/* Social Media Section */}
        <div style={styles.socialMedia}>
          <h4>Follow Us On</h4>
          <div style={styles.icons}>
            <span>🔵</span> {/* Replace with actual icons */}
            <span>⚫</span>
            <span>⚪</span>
            <span>🔴</span>
          </div>
        </div>
      </div>

      {/* Copyright Text */}
      <div style={styles.copyright}>&copy; 2024 BookWormHub</div>
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
    maxWidth: "1200px",
    margin: "auto",
  },
  brand: {
    flex: "1",
    minWidth: "250px",
  },
  logo: {
    fontSize: "22px",
    fontWeight: "bold",
  },
  description: {
    maxWidth: "300px",
  },
  linksContainer: {
    display: "flex",
    justifyContent: "space-between",
    flex: "2",
    minWidth: "500px",
  },
  linksColumn: {
    minWidth: "120px",
  },
  socialMedia: {
    textAlign: "center",
    marginTop: "20px",
  },
  icons: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  copyright: {
    textAlign: "center",
    marginTop: "20px",
    borderTop: "1px solid rgba(255,255,255,0.2)",
    paddingTop: "10px",
  },
};

export default Footer;
