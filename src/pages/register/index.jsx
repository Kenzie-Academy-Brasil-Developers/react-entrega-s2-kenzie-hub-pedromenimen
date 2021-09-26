import { Button } from "@material-ui/core";
import { Redirect, useHistory } from "react-router";
import "./style.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";

const Register = ({ authenticated }) => {
  const registerSchema = yup.object().shape({
    email: yup.string().matches(
      "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
      "Campo inválido"
    ).required("Campo requerido"),
    password: yup.string().matches(
      "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",
      "Campo inválido"
    ).required("Campo requerido"),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password")], "As senhas não coincidem")
      .required("Campo requerido"),
    name: yup.string().matches("^[A-Za-z\\s]+$", "Campo inválido").required("Campo requerido"),
    bio: yup.string().matches("^[A-Za-z\\s]+$", "Campo inválido").required("Campo requerido"),
    contact: yup.string().matches("^[A-Za-z\\s]+$", "Campo inválido").required("Campo requerido"),
    course_module: yup.string().matches("^[A-Za-z\\s]+$", "Campo inválido").required("Campo requerido"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });
  const handleButton = (data) => {
    const { bio, contact, course_module, email, name, password } = data;
    const user = {
      bio: bio,
      contact: contact,
      course_module: course_module,
      email: email,
      name: name,
      password: password,
    };
    api
      .post("/users", user)
      .then((res) => console.log(res))
      .catch((err) => console.log(`Erro: ${err}`));
      <Redirect to="/"/>};

  const history = useHistory();

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="registerContainer">
      <form onSubmit={handleSubmit(handleButton)} className="inputListRegister">
        <input placeholder="E-mail" {...register("email")} />
        <p>{errors.email?.message}</p>
        <input placeholder="Senha" {...register("password")} />
        <p>{errors.password?.message}</p>
        <input
          placeholder="Confirmação de senha"
          {...register("passwordConfirmation")}
        />
        <p>{errors.passwordConfirmation?.message}</p>
        <input placeholder="Nome" {...register("name")} />
        <p>{errors.name?.message}</p>
        <input placeholder="Bio" {...register("bio")} />
        <p>{errors.bio?.message}</p>
        <input placeholder="Contato" {...register("contact")} />
        <p>{errors.contact?.message}</p>
        <input placeholder="Módulo do curso" {...register("course_module")} />
        <p>{errors.course_module?.message}</p>
        <div className="registerButon">
          <Button
            fullWidth={true}
            type="submit"
            variant="contained"
            color="secondary"
          >
            Cadastrar
          </Button>
        </div>
        <div className="homeIconRegister">
          <i onClick={() => history.push("/")} className="fas fa-home"></i>
        </div>
      </form>
    </div>
  );
};

export default Register;
