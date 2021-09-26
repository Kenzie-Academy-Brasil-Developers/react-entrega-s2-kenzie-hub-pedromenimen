import { Button } from "@material-ui/core";
import { Redirect, useHistory } from "react-router";
import "./style.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";

const Login = ({ setAuthenticated, authenticated }) => {
  const history = useHistory();
  const loginSchema = yup.object().shape({
    email: yup.string().matches(
      "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
      "Campo inválido"
    ).required("Campo requerido"),
    password: yup.string().required("Campo requerido"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });
  const handleButton = (data) => {
    api
      .post("/sessions", data)
      .then((res) => {
        const { token } = res.data;
        localStorage.setItem("@Kenziehub:id", JSON.stringify(res.data.user.id))
        localStorage.setItem("@Kenziehub:token", JSON.stringify(token));
        setAuthenticated(true);
        return history.push("/");
      })
      .catch((err) => console.log(err));
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div className="loginContainer">
      <form onSubmit={handleSubmit(handleButton)}>
        <div className="inputListLogin">
          <input {...register("email")} placeholder="E-mail" type="text" />
          <input
            {...register("password")}
            placeholder="Senha"
            type="password"
          />
        </div>
        <div className="buttonLogin">
          <Button
            type="submit"
            fullWidth={true}
            variant="contained"
            color="secondary"
          >
            Entrar
          </Button>
        </div>
      </form>
      <div className="homeIconLogin">
        <i onClick={() => history.push("/")} className="fas fa-home"></i>
      </div>
    </div>
  );
};

export default Login;
