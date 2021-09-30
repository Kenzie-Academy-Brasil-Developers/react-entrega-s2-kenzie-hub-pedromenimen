import { Button } from "@material-ui/core";
import api from "../../services/api";
import BasicPopover from "../popover";
import "./style.css";

const TechList = ({ techList }) => {
  const token = JSON.parse(localStorage.getItem("@Kenziehub:token"));
  const handleButton = (tech) => {
    api
      .delete(`/users/techs/${tech.id}`, 
        {headers: { Authorization: `Bearer: ${token}` }},
      )
      .then()
      .catch((err) => console.log(err));
  };
  if (techList.length === 0) {
    return (
      <div>
        <h1>Você ainda não possu tecnologias cadastradas</h1>
      </div>
    );
  } else {
    return techList.map((item, index) => (
      <div className="techList" key={index}>
        <h1>Tecnologia: {item.title}</h1>
        <p>Status: {item.status}</p>
        <BasicPopover tech={item}/>
        <Button
        variant="contained"
        color="secondary"
        type="button" onClick={() => handleButton(item)}>
          Deletar
        </Button>
      </div>
    ));
  }
};

export default TechList;
