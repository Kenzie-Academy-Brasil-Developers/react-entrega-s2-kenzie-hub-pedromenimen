import api from "../../services/api";
import "./style.css";

const TechList = ({ techList }) => {
  const token = JSON.parse(localStorage.getItem("@Kenziehub:token"));
  const handleButton = (tech) => {
    api
      .delete(`/users/techs/${tech.id}`, 
        {tech: { Authentication: `Bearer: ${token}` }},
      )
      .then((res) => console.log(res))
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
        <h1>{item.title}</h1>
        <p>{item.status}</p>
        <button type="button" onClick={() => handleButton(item)}>
          Deletar
        </button>
      </div>
    ));
  }
};

export default TechList;
