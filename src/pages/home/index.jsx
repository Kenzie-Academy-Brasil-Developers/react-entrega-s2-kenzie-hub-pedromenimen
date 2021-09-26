import { Button } from "@material-ui/core";
import { useHistory } from "react-router";
import "./style.css";

const Home = ({ authenticated }) => {
  const history = useHistory();
  return (
    <div className="homeContainer">
      <div className="homeTitle">
        <h1>Conecte-se aos devs da Kenzie aqui!</h1>
      </div>
      <div className="homeButtonList">
         
        {!authenticated && <div>
          <Button
            onClick={() => history.push("/users")}
            variant="contained"
            color="secondary"
          >
            Cadastrar
          </Button>
          <Button
            onClick={() => history.push("/sessions")}
            variant="contained"
            color="secondary"
          >
            Login
          </Button>
        </div>}
        {authenticated && <div>
          <Button
            onClick={() => history.push("/dashboard")}
            variant="contained"
            color="secondary"
          >
            Dashboard
          </Button>
        </div>}
      </div>
    </div>
  );
};

export default Home;
