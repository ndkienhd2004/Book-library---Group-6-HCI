import LibraryNavBar from "../../components/LibraryNavBar/LibraryNavBar";
import LibraryImage from "../../assets/images/MyLibrary.jpg";
import ProfileImage from "../../assets/images/profile.png";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/context";

const Library = () => {
  const { name, userImage } = useContext(AppContext);
  const [avatar, setAvatar] = useState(ProfileImage);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await getImage(userImage);
        setAvatar(response);
      } catch (error) {
        setAvatar(ProfileImage);
      }
    };

    fetchImages();
  }, [userImage]);
  return (
    <div style={styles.container}>
      <div
        style={{ ...styles.header, backgroundImage: `url(${LibraryImage})` }}
      >
        <div style={styles.profileContainer}>
          <div style={styles.profileImageContainer}>
            <img src={avatar} alt="Profile" style={styles.profileImage} />
          </div>
          <span style={styles.profileName}>{String(name) || "Guest"}</span>
        </div>
      </div>
      <div style={styles.body}>
        <LibraryNavBar />
        <Outlet />
      </div>
      <div style={{ width: "100%", marginTop: "5vh" }}>
        <Footer />
      </div>
    </div>
  );
};

export default Library;

// Styles
const styles = {
  container: {
    width: "100vw",
    textAlign: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    overflowX: "hidden",
    overflowY: "auto",
  },
  header: {
    width: "100vw",
    height: "36vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
    backgroundColor: "#f6f6f6",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  profileContainer: {
    position: "absolute",
    bottom: "-50px",
    left: "10vw",
    display: "flex",
    alignItems: "center",
  },
  profileImageContainer: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    overflow: "hidden",
    border: "4px solid white",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  profileName: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "white",
    marginLeft: "10px",
    marginBottom: "10px",
    textShadow: "1px 1px 4px rgba(0,0,0,0.5)",
  },
  body: {
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    marginTop: "8vh",
    width: "80%",
    flexDirection: "row",
    gap: "5%",
  },
};
