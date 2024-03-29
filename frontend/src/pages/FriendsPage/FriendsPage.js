import React, { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import "./FriendsPage.css";
import UserMapper from "../../components/UserMapper/UserMapper";
import FriendMapper from "../../components/FriendMapper/FriendMapper";
import FriendReqRecMapper from "../../components/FriendReqRecMapper/FriendReqRecMapper";
import FriendReqSentMapper from "../../components/FriendReqSentMapper/FriendReqSentMapper";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import RecipeMapper from "../../components/RecipeMapper/RecipeMapper";
// Material UI imports
import { Grid, Container } from "@mui/material";
import { ListItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const FriendsPage = () => {
  const { user } = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState([]);
  // const [friends, setFriends] = useState(null);
  // const [friendReqReceived, setFriendReqReceived] = useState(null);
  // const [friendReqSent, setFriendReqSent] = useState(null);
  const decodedUser = localStorage.getItem("token");
  const baseUrl = "http://localhost:5000/api/";

  useEffect(() => {
    handleGetAllUsers();
    // console.log(friends);
  }, []);

  const handleGetAllUsers = async () => {
    let allUsers = await axios.get(
      `${baseUrl}friends/${user._id}/notCurrentUserNotFriends`,
      { headers: { "x-auth-token": decodedUser } }
    );

    // setAllUsers(allUsers.data);

    // let friends = await axios.get(`${baseUrl}friends/${user._id}/allFriends/`, {
    //   headers: { "x-auth-token": decodedUser },
    // });

    // setFriends(friends.data);

    // let friendRequestsReceived = await axios.get(
    //   `${baseUrl}friends/${user._id}/allFriendRequestsReceived/`,
    //   { headers: { "x-auth-token": decodedUser } }
    // );

    // setFriendReqReceived(friendRequestsReceived.data);

    let friendRequestsSent = await axios.get(
      `${baseUrl}friends/${user._id}/allFriendRequestsSent/`,
      { headers: { "x-auth-token": decodedUser } }
    );

    // setFriendReqSent(friendRequestsSent.data);
  };

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: 220,
      }}
    >
      <RecipeMapper />
    </Container>
  );
};

export default FriendsPage;
