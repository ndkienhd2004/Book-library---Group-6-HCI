const SupportReadingTools = () => {
  return (
    <div style={styles.container}>
      <div style={styles.toolContainer}>
        <div style={styles.header}>
          <h1>Summary</h1>
        </div>
        <div>
          <p>aaaa</p>
        </div>
      </div>
      <div style={styles.toolContainer}>
        <div style={styles.header}>
          <h1>Explantation</h1>
        </div>
        <div>
          <p>aaaa</p>
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
  },
  header: {
    display: "flex",
    justifyContent: "center",
    fontWeight: "bold",
    backgroundColor: "#c8a17a",
    width: "100%",
    height: "24%",
    alignItems: "center",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
  },
};
