import React from "react";

const FeatureCard = ({ title, description, imageUrl, imagePosition }) => {
  const styles = {
    container: {
      position: "relative",
      display: "flex",
      flexDirection: imagePosition === "left" ? "row" : "row-reverse",
      alignItems: "center",
      justifyContent: "space-between",
      margin: "2rem 0",
      padding: "2rem",
      maxWidth: "80vw",
      backgroundColor: "#F8F5A6",
      borderRadius: "20px",
    },
    imageWrapper: {
      flex: 1,
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    textSection: {
      flex: 1,
      padding: "1rem",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "1rem",
      lineHeight: "1.2",
      color: "black",
    },
    description: {
      fontSize: "1.2rem",
      lineHeight: "1.6",
      color: "#555",
    },
    image: {
      width: "80%",
      height: "auto",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)",
    },
    decoration: {
      position: "absolute",
      top: "10%",
      left: "5%",
      fontSize: "4rem",
      color: "#D4C900",
    },
    swirl: {
      position: "absolute",
      bottom: "-10px",
      left: "40%",
      fontSize: "2rem",
      color: "#333",
    },
  };

  return (
    <div style={styles.container}>
      {/* Image */}
      <div style={styles.imageWrapper}>
        <span style={styles.decoration}>✧</span>
        <img loading="lazy" src={imageUrl} alt={title} style={styles.image} />
      </div>
      {/* Text Content */}
      <div style={styles.textSection}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.description}>{description}</p>
      </div>
      <span style={styles.swirl}>~</span>
    </div>
  );
};

export default FeatureCard;
