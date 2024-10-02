import React, { useEffect, useState } from "react";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";

const Auth = () => {
  return (
    <div className="Auth">
      <LogIn />
    </div>
  );
};

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      localStorage.removeItem("userId");
    }
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = {
      username: username,
      password: password,
    };
    console.log("FormData", formData);
    try {
      console.log("hello");

      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const resp = await response.json();
        localStorage.setItem("userId", resp.data._id);
        localStorage.setItem("image", resp.data.img);
        localStorage.setItem("followersList", resp.data.followerList);
        localStorage.setItem(
          "name",
          resp.data.firstName + " " + resp.data.lastName
        );
        navigate("/home");

        console.log("User signed up successfully", resp.data);
      } else {
        const errorData = await response.json();
        console.error("Error:login", errorData.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="a-right">
      <form className="infoForm authForm" onSubmit={handleLogin}>
        <h3>Log In</h3>
        <div>
          <input
            type="text"
            placeholder="Username"
            className="infoInput"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            className="infoInput"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <span style={{ fontSize: "12px" }}>
            Don't have an account <Link to={"/signUp"}>Sign up</Link>
          </span>
          <div className="button-container">
            <button className="button infoButton">Login</button>
          </div>
        </div>
      </form>
    </div>
  );
}

const SignUp = () => {
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      localStorage.removeItem("userId");
    }
  }, []);
  return <Authenticate />;
};

function Authenticate() {
  const [username, setUsername] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      console.log("Passwords do not match");

      return; // Prevent form submission if passwords don't match
    }

    const formData = {
      firstName: firstName,
      lastName: lastname,
      username: username,
      password: password,
    };
    console.log("FormData", formData);
    try {
      const response = await fetch("http://localhost:8080/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("User signed up successfully");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setFirstName("");
        setLastname("");

        // Redirect or show success message
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.error);
        // Handle error (e.g., show error message to the user)
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., show error message to the user)
    }
  };
  return (
    <div className="Auth">
      <form className="infoForm authForm" onSubmit={handleSignup}>
        <h3>Sign up</h3>
        <div>
          <input
            type="text"
            placeholder="First Name"
            className="infoInput"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="infoInput"
            name="lastName"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            className="infoInput"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="infoInput"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <span className="Loginbtn" style={{ fontSize: "12px" }}>
            Already have an account.<Link to={"/"}>Login</Link>
          </span>
        </div>
        <div className="button-container">
          <button type="submit" className="button infoButton">
            Signup
          </button>
        </div>
      </form>
    </div>
  );
}

export { Auth, SignUp };
