import NavBar from "../../components/NavigationBar";
import PATH from "../../constants/path";

const Login = () => {
  return (
    <div>
      <NavBar currentPage={PATH.login} />
    </div>
  );
};
export default Login;
