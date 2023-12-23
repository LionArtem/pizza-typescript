import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function FullPizza() {
  const [pizza, setPizza] = React.useState<{ title: string }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fechPizza() {
      try {
        const { data } = await axios.get(
          "https://63c844465c0760f69ac8e732.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        //alert(error.message);
        navigate("/");
      }
    }
    fechPizza();
  }, []);

  if (!pizza) {
    return <>'loading...'</>;
  }
  return (
    <div>
      <h1>FullPizza</h1>
      <h2>{pizza.title}</h2>
    </div>
  );
}
