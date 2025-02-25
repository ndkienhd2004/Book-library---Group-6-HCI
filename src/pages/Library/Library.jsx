import NavBar from "../../components/NavigationBar";
import PATH from "../../constants/path";
const Library = () => {
  return (
    <div>
      <NavBar currentPage={PATH.library} />
      <h1 style={{ color: "black" }}>Library screen</h1>
    </div>
  );
};
export default Library;
