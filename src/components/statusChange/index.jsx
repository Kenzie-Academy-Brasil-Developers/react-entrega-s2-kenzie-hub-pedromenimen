import { Button } from "@material-ui/core";
import { useState } from "react";
import api from "../../services/api";

const StatusChange = ({ tech }) => {
  const token = JSON.parse(localStorage.getItem("@Kenziehub:token"));
  const [input, setInput] = useState("");
  const handlerButton = () => {
    api
      .put(
        `/users/techs/${tech.id}`,
        { status: input },
        { headers: { Authorization: `Bearer: ${token}` } }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <span>
      <input
        value={input}
        onChange={(evt) => setInput(evt.target.value)}
        type="text"
        placeholder="Digite o novo status"
      />
      <Button onClick={handlerButton}>Concluir</Button>
    </span>
  );
};

export default StatusChange;
