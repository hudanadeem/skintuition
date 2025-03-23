import "./LoginPage.scss";
import NavBar from "../../components/NavBar/NavBar";
import LoginForm from "../../components/LoginForm/LoginForm";

function LoginPage() {
  return (
    <div className="page__container--login">
      <NavBar />
      <LoginForm />
    </div>
  );
}

export default LoginPage;
