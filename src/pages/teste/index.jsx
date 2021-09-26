import api from "../../services/api";

const StudentsList = () => {
  const token = JSON.parse(localStorage.getItem("@Kenziehub:token"));
  const id = JSON.parse(localStorage.getItem("@Kenziehub:id"))
  const handleButton = () => {
    api
      .get("/users")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
      console.log(`token: ${token}`)
      console.log(`id: ${id}`)
  };
  return <button onClick={handleButton}>sasasa</button>;
};

export default StudentsList;
