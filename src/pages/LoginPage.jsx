import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import "./util.css";

export default function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const onChangeLogin = ({ target: { value } }) => {
    setLogin(value);
  };
  const onChangePassword = ({ target: { value } }) => {
    setPassword(value);
  };

  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", login);
    formData.append("password", password);
    const response = await fetch(`https://diploma-be.onrender.com/api/login?name=${login}&password=${password}`, {});
    const data = await response.json();
    if (data.name) {
      localStorage.setItem("user", JSON.stringify(data));
      setLogin("");
      setPassword("");
      navigate("/");
    } else {
      alert("Ошибка авторизации");
    }
  };

  const showPassword = () => {
    alert("admin/admin vova/pup1234 petya/sid1234 ivan/lom1234 pavel/pas1234 kolya/mis1234")
  }

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 p-t-85 p-b-20">
          <form className="login100-form validate-form" onSubmit={handleSubmit}>
            <span className="login100-form-title p-b-70"> Кого сегодня подключает Белтелеком? </span>
            <div className="wrap-input100 validate-input m-t-85 m-b-35" data-validate="Enter username">
              <input className={`input100 ${login ? "has-val" : ""}`} type="text" value={login} required onChange={onChangeLogin} />
              <span className="focus-input100" data-placeholder="Логин"></span>
            </div>
            <div className="wrap-input100 validate-input m-b-50" data-validate="Enter password">
              <input className={`input100 ${password ? "has-val" : ""}`} type="password" value={password} required onChange={onChangePassword} />
              <span className="focus-input100" data-placeholder="Пароль"></span>
            </div>
            <div className="container-login100-form-btn">
              <button className="login100-form-btn">Войти</button>
            </div>  
            <ul className="login-more p-t-190">
              <li className="m-b-8">
                <span className="txt1"> Забыли </span>
                <a href="#" className="txt2" onClick={showPassword}>
                  {" "}
                  Логин / Пароль?{" "}
                </a>
                <span className="txt1"> Тренируйте память. </span>
              </li>
              <li>
                <span className="txt1"> Нет аккаунта? </span>
                <span className="txt1"> Закройте эту вкладку. </span>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
}
