import NavBar from "../../components/NavigationBar";
import PATH from "../../constants/path";
const Home = () => {
  return (
    <div>
      <NavBar currentPage={PATH.home} />
      <h1 style={{ color: "black" }}>home screen</h1>
    </div>
  );
};
export default Home;
