import React, { useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import ProfileSide from "./../../components/ProfileSide/ProfileSide";
import PostSide from "./../../components/PostSide/PostSide";
import RightSide from "./../../components/RightSide/RightSide";
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      navigate("/");
    }
  }, []);
  return (
    <div className="Home">
      <ProfileSide />
      <PostSide />
      <RightSide />
    </div>
  );
};
export default Home;
