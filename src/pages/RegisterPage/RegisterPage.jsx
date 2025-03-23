import "./RegisterPage.scss";
import NavBar from "../../components/NavBar/NavBar";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

function RegisterPage() {
  return (
    <div className="register__page">
      <NavBar />
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
