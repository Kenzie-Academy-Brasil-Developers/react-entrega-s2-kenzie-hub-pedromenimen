import { Button } from "@material-ui/core";
import { Redirect, useHistory } from "react-router";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TechList from "../../components/techList";
import { useState } from "react";
import api from "../../services/api";
import "./style.css"

const Dashboard = ({ authenticated }) => {
  const history = useHistory()
  const [techList, setTechList] = useState([]);
  const token = JSON.parse(localStorage.getItem("@Kenziehub:token"));
  const id = JSON.parse(localStorage.getItem("@Kenziehub:id"));
  const dashboardSchema = yup.object().shape({
    title: yup.string().required(),
    status: yup.string().required(),
  });

  api
    .get(`/users/${id}`)
    .then((res) => setTechList(res.data.techs))
    .catch((err) => console.log(`erro ${err}`));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(dashboardSchema) });
  const handleButton = (data) => {
    console.log(data);
    api
      .post(
        "users/techs",
         data ,
        { headers: { Authorization: `Bearer: ${token}` } }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  if (!authenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div className="dashboardContainer">
      <i onClick={() => history.push("/")} className="fas fa-home"></i>
      <form onSubmit={handleSubmit(handleButton)}>
        <input
          {...register("title")}
          type="text"
          placeholder="Adicionar nova tecnologia"
        />
        <input
          {...register("status")}
          type="text"
          placeholder="Adicionar descrição"
        />
        <Button type="submit">Adcionar</Button>
        <TechList techList={techList}></TechList>
      </form>
    </div>
  );
};

export default Dashboard;
