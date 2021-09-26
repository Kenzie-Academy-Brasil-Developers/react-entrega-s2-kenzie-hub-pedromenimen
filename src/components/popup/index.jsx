import api from "../../services/api";

const PopUp = () => {
    api.put("users/techs/")
  return (
    <form onSubmit>
      <input type="text" placeholder="Digite o novo status da tecnologia"/>
      <button type="submit">Atualizar</button>
    </form>
  );
};

export default PopUp;
