import "./LoginPage.scss";
import NavBar from "../../components/NavBar/NavBar";
import LoginForm from "../../components/LoginForm/LoginForm";

function LoginPage() {
  return (
    <div className="login__page">
      <NavBar />
      <LoginForm />
    </div>
  );
}

export default LoginPage;
