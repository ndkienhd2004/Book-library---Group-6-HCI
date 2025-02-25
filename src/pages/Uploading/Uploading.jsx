import NavBar from "../../components/NavigationBar";
import PATH from "../../constants/path";
const Uploading = () => {
  return (
    <div>
      <NavBar currentPage={PATH.uploading} />
      <h1 style={{ color: "black" }}>Uploading screen</h1>
    </div>
  );
};
export default Uploading;
