const SupportReadingTools = ({ explainText, summaryText }) => {
  return (
    <div style={styles.container}>
      <div style={styles.toolContainer}>
        <div style={styles.header}>
          <h1>Summary</h1>
        </div>
        <div style={styles.content}>
          <p>{summaryText ? summaryText : "Summary Text"}</p>
        </div>
      </div>
      <div style={styles.toolContainer}>
        <div style={styles.header}>
          <h1>Explanation</h1>
        </div>
        <div style={styles.content}>
          <p>{explainText ? explainText : "Explain Text"}</p>
        </div>
      </div>
    </div>
  );
};

export default SupportReadingTools;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    color: "black",
    width: "30vw",
    gap: "5vh",
  },
  toolContainer: {
    width: "24vw",
    height: "36vh",
    backgroundColor: "white",
    borderRadius: "20px",
    border: "2px solid #ccc",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    backgroundColor: "#c8a17a",
    width: "100%",
    height: "20%",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    color: "#fff",
  },
  content: {
    flex: 1,
    padding: "10px 15px",
    textAlign: "justify",
    overflowY: "auto",
    fontSize: "14px",
    lineHeight: "1.5",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
};
