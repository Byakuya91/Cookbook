// import statements
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

const RecipeCard = (props) => {
  const { user } = useContext(AuthContext);
  const decodedUser = localStorage.getItem("token");
  const baseUrl = "http://localhost:5000/api/";

  //   TODO:
  // Connect API to display all the recipes as a console log.

  //   let imagePath = `http://localhost:5000/${props.friend.image}`;
  return (
    <div id="userCard">
      <img
        id="profileImage"
        src={imagePath}
        alt="Profile"
        height={100}
        width={100}
      />
      <div>
        <p className="text">Name:</p>
        <p className="text">{props.friend.name}</p>
        <p className="text">Email:</p>
        <p className="text">{props.friend.email}</p>
        <label id="deleteFriend" onClick={handleDeleteFriend}>
          Delete Friend
        </label>
      </div>
    </div>
  );
};

export default RecipeCard;
