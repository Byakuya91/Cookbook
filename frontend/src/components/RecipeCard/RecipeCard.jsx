// import statements
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

const RecipeCard = (props) => {
  const { user } = useContext(AuthContext);
  const decodedUser = localStorage.getItem("token");
  const baseUrl = "http://localhost:5000/api/";

  //   TODO:
  // Connect API to display all the recipes from a user.
  //   Figure out a way to map it.

  //   let recipePath = `http://localhost:5000/${props.user.recipes}`;

  return (
    <div id="userCard">
      <div>
        <label className="text">Name:</label>
        <p className="text">Chicken Tikka</p>
        <label className="text">Author:</label>
        <p className="text">Arnold Patel</p>
        <label className="text">ingredients:</label>
        <p className="text"> 1.skinned chicken, Spices </p>
        <label className="text">Prep_Time:</label>
        <p className="text">20 minutes</p>
        <label className="text">Cook_Time:</label>
        <p className="text"> 1 hhour </p>
        <label className="text">serving_size:</label>
        <p className="text"> 3</p>
        <label className="text">Yield:</label>
        <p className="text">2</p>
      </div>
    </div>
  );
};

export default RecipeCard;
